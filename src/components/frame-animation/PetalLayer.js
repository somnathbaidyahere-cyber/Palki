"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { makePool, playShower, playDisperse } from "./petalAnimations";

// One rose-petal outline (with the small notch at the top), reused by every petal.
const PETAL = "M50 98 C34 94 10 74 6 48 C3 26 18 8 36 8 C42 8 46 12 50 15 C54 12 58 8 64 8 C82 8 97 26 94 48 C90 74 66 94 50 98Z";
const VEIN = "M50 92 C49 70 50 48 50 24";
const SHEEN = "M22 34 C26 20 38 13 48 18 C38 24 30 32 26 46 C22 44 20 40 22 34Z";

const TONES = {
  red:    ["#D8344F", "#B01B35", "#7C0C22"],
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
