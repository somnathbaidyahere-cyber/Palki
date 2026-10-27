// Web Animations API choreography. No dependencies.
import { birdPoly, BIRD_WIDTH } from "./fragments";

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const TINTS = ["#D8B56E", "#EAD9B2", "#B8924F"]; // gold / ivory-gold / antique gold

/**
 * Phase 1 + 2: the frame falls with gravity, hits the floor, squashes,
 * bounces ONCE and settles. Squash is anchored to the bottom edge.
 * Returns the Animation objects (cancel them on cleanup).
 */
export function playDrop(box, shadow, { fromTop, startDeg, restDeg }) {
  const H = box.offsetHeight;
  const startY = -Math.max(240, fromTop);
  const T1 = clamp(Math.round(34 * Math.sqrt(Math.abs(startY))), 650, 1150); // fall time ~ sqrt(distance)
  const apex = Math.min(H * 0.065, 26); // a modest rebound
  const total = T1 + 860;
  const t = (ms) => ms / total;
  const f = (y, sx, sy, rot) => `translateY(${y}px) rotate(${rot}deg) scale(${sx}, ${sy})`;

  const frame = box.animate(
    [
      { offset: 0, transform: f(startY, 1, 1, startDeg), easing: "cubic-bezier(0.55, 0, 1, 0.45)" }, // accelerate
      { offset: t(T1), transform: f(0, 1, 1, restDeg), easing: "cubic-bezier(0.2, 0.8, 0.3, 1)" }, // impact
      { offset: t(T1 + 130), transform: f(0, 1.05, 0.92, restDeg), easing: "cubic-bezier(0.2, 0.6, 0.4, 1)" }, // squash
      { offset: t(T1 + 390), transform: f(-apex, 0.985, 1.02, restDeg + (restDeg - startDeg) * 0.04), easing: "cubic-bezier(0.55, 0, 1, 0.45)" }, // the one bounce
      { offset: t(T1 + 610), transform: f(0, 1.025, 0.965, restDeg), easing: "ease-out" }, // soft second contact
      { offset: 1, transform: f(0, 1, 1, restDeg) }, // settle
    ],
    { duration: total, fill: "forwards" }
  );

  const floor = shadow?.animate(
    [
      { offset: 0, opacity: 0, transform: "scaleX(0.6)" },
      { offset: t(T1 - 80), opacity: 0, transform: "scaleX(0.6)" },
      { offset: t(T1 + 130), opacity: 1, transform: "scaleX(1.08)" },
      { offset: t(T1 + 390), opacity: 0.55, transform: "scaleX(0.9)" },
      { offset: t(T1 + 610), opacity: 1, transform: "scaleX(1.03)" },
      { offset: 1, opacity: 1, transform: "scaleX(1)" },
    ],
    { duration: total, fill: "both" }
  );

  return [frame, floor].filter(Boolean);
}

/**
 * Phases 3 + 4: each torn piece cracks away, morphs into a small bird
 * (clip-path morph + gold tint), then flaps away on its own wavy path and fades out.
 * Departures are staggered.
 */
export function playBreak(box, shadow, frags, parts, { compact }) {
  const W = box.offsetWidth;
  const ratio = W / box.offsetHeight;
  const D = compact ? 2800 : 3200;
  const maxDelay = compact ? 450 : 650;
  const birdPx = compact ? 36 : 46;
  const anims = [];

  frags.forEach((fr, i) => {
    const p = parts[i];
    if (!p) return;
    const rnd = Math.random;

    // crack apart: push outward from the card centre
    const vx = fr.cx - 50;
    const vy = fr.cy - 50;
    const vl = Math.hypot(vx, vy) || 1;
    const push = 16 + rnd() * 20;
    const ex = (vx / vl) * push + (rnd() - 0.5) * 8;
    const ey = (vy / vl) * push + (rnd() - 0.5) * 8 + 4;
    const r1 = (rnd() - 0.5) * 34;

    // bird size, and the scale that shrinks the piece to ~birdPx wide
    const k = 0.85 + rnd() * 0.4;
    const b0 = birdPx / (((BIRD_WIDTH * k) / 100) * W);
    const bx = ex * 1.15;
    const by = ey * 1.15 - 14;

    // flight: up and away, with a gentle wave and bank
    const a = ((compact ? 20 + rnd() * 70 : 25 + rnd() * 75) * Math.PI) / 180;
    const dist = compact ? 260 + rnd() * 220 : 700 + rnd() * 450;
    const dx = Math.cos(a), dy = -Math.sin(a);
    const px = Math.sin(a), py = Math.cos(a); // perpendicular
    const amp = 18 + rnd() * 22;
    const ph = rnd() * 6.28;
    const wave = (s) => amp * Math.sin(s * 7 + ph) * Math.min(1, s * 2);
    const bank = (s) => Math.cos(s * 7 + ph) * 9;
    const at = (s, off, sc, op) => ({
      offset: off,
      transform: `translate(${bx + dx * dist * s + px * wave(s)}px, ${by + dy * dist * s + py * wave(s)}px) rotate(${bank(s)}deg) scale(${sc})`,
      opacity: op,
    });

    const delay = rnd() * maxDelay;
    const opts = { duration: D, delay, fill: "both" };

    anims.push(
      p.wrap.animate(
        [
          { offset: 0, transform: "translate(0px,0px) rotate(0deg) scale(1)", opacity: 1, easing: "ease-out" },
          { offset: 0.06, transform: `translate(${ex * 0.18}px, ${ey * 0.18}px) rotate(${r1 * 0.25}deg) scale(1)`, opacity: 1, easing: "cubic-bezier(0.2,0.7,0.3,1)" },
          { offset: 0.17, transform: `translate(${ex}px, ${ey}px) rotate(${r1}deg) scale(1)`, opacity: 1, easing: "ease-in-out" },
          { offset: 0.4, transform: `translate(${bx}px, ${by}px) rotate(${-r1 * 0.2}deg) scale(${b0})`, opacity: 1 },
          at(0.25, 0.55, b0 * 0.9, 1),
          at(0.5, 0.7, b0 * 0.75, 1),
          at(0.75, 0.85, b0 * 0.6, 1),
          at(1, 1, b0 * 0.45, 0),
        ],
        opts
      )
    );

    const frag = fr.poly;
    const up = birdPoly(fr.cx, fr.cy, ratio, k, true);
    const dn = birdPoly(fr.cx, fr.cy, ratio, k, false);
    anims.push(
      p.clip.animate(
        [
          { offset: 0, clipPath: `polygon(${frag})` },
          { offset: 0.17, clipPath: `polygon(${frag})` },
          { offset: 0.4, clipPath: `polygon(${up})` },
          { offset: 0.5, clipPath: `polygon(${dn})` },
          { offset: 0.6, clipPath: `polygon(${up})` },
          { offset: 0.7, clipPath: `polygon(${dn})` },
          { offset: 0.8, clipPath: `polygon(${up})` },
          { offset: 0.9, clipPath: `polygon(${dn})` },
          { offset: 1, clipPath: `polygon(${up})` },
        ].map((kf) => ({ ...kf, easing: "ease-in-out" })),
        opts
      )
    );

    // photo -> solid gold so the birds read as delicate gold silhouettes
    p.tint.style.background = TINTS[i % TINTS.length];
    anims.push(
      p.tint.animate(
        [
          { offset: 0, opacity: 0 },
          { offset: 0.2, opacity: 0 },
          { offset: 0.38, opacity: 1 },
          { offset: 1, opacity: 1 },
        ],
        opts
      )
    );
  });

  if (shadow) anims.push(shadow.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700, fill: "forwards" }));
  return anims;
}
