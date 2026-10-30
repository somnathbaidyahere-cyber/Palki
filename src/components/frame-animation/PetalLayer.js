"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { makePool, playShower, playDisperse } from "./petalAnimations";

// Natural rose petal with an irregular, softly scalloped upper edge.
// Asymmetrical, naturally curved rose petal.
const PETAL = `
  M43 97
  C34 92 24 85 17 75
  C9 64 4 53 5 41
  C5 29 11 18 21 12
  C30 6 40 10 48 17
  C53 21 56 26 59 23
  C65 15 72 8 81 11
  C91 14 96 25 94 37
  C93 48 88 59 82 69
  C76 80 67 88 58 93
  C52 96 48 98 43 97
  Z
`;
const VEIN = `
  M50 92
  C48 75 49 57 50 42
  C51 32 52 24 54 18
`;
const SHEEN = `
  M17 36
  C19 24 28 14 37 15
  C43 16 46 20 48 24
  C37 22 28 29 23 43
  C20 42 18 40 17 36
  Z
`;

const TONES = {
  red: ["#B04462", "#84213F", "#570F27"],
  rose:   ["#E2557B", "#C23460", "#8E1A3E"],
  pink:   ["#FBDDE5", "#F2B2C5", "#DD8AA6"],
  yellow: ["#FBE88A", "#F1C93B", "#D79F1B"],
};

// Defined once; each petal is just a <use> of one of these four symbols.
function PetalDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        {Object.entries(TONES).map(([name, [a, b, c]]) => (
          <radialGradient key={name} id={`pk-g-${name}`} cx="0.42" cy="0.3" r="0.85">
            <stop offset="0" stopColor={a} />
            <stop offset="0.55" stopColor={b} />
            <stop offset="1" stopColor={c} />
          </radialGradient>
        ))}
        {Object.keys(TONES).map((name) => (
          <symbol key={name} id={`pk-${name}`} viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d={PETAL} fill={`url(#pk-g-${name})`} />
            <path d={VEIN} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.4" strokeLinecap="round" />
            <path d={SHEEN} fill="rgba(255,255,255,0.16)" />
          </symbol>
        ))}
      </defs>
    </svg>
  );
}

/**
 * A fixed pool of petal nodes + an imperative API for the sequence:
 *   whenClear()  -> promise that resolves when the previous round's petals are gone
 *   shower(L)    -> start the shower; resolves when the frame is completely concealed
 *   disperse()   -> swirl the covering petals away; resolves when they have disappeared
 * Renders client-side only (random pool), mounted after hydration by the parent.
 */
const PetalLayer = forwardRef(function PetalLayer(_, ref) {
  const [pool] = useState(() => makePool(window.matchMedia("(max-width: 1023px)").matches));
  const els = useRef({ cover: [], fg: [], bg: [] });
  const plan = useRef(null);
  const clear = useRef(Promise.resolve());

  useImperativeHandle(
    ref,
    () => ({
      whenClear: () => clear.current,
      shower: (L) => {
        const grab = (g) => pool[g].map((desc, i) => ({ desc, el: els.current[g][i] })).filter((x) => x.el);
        const r = playShower({ covers: grab("cover"), fg: grab("fg"), bg: grab("bg") }, L);
        plan.current = r;
        return r.done;
      },
      disperse: () => {
        if (!plan.current) return Promise.resolve();
        const p = playDisperse(plan.current);
        clear.current = p.catch(() => {});
        return p;
      },
    }),
    [pool]
  );

  const petal = (group, d, i) => (
    <svg
      key={`${group}-${i}`}
      ref={(el) => {
        els.current[group][i] = el;
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute left-0 top-0 opacity-0"
      style={{ width: d.size, height: d.size * d.aspect, filter: d.blur ? `blur(${d.blur.toFixed(1)}px)` : undefined }}
    >
      <use href={`#pk-${d.color}`} />
    </svg>
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      <PetalDefs />
      {pool.bg.map((d, i) => petal("bg", d, i))}
      {pool.cover.map((d, i) => petal("cover", d, i))}
      {pool.fg.map((d, i) => petal("fg", d, i))}
    </div>
  );
});

export default PetalLayer;
