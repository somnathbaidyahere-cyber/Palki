// Web Animations API choreography for the frame itself. No dependencies.

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

/**
 * The frame falls with gravity, lands, squashes against its bottom edge,
 * bounces ONCE, and settles. A soft ground shadow reacts to the landing.
 * Returns the Animation objects (cancel them on cleanup).
 */
export function playDrop(box, shadow, { fromTop, startDeg, restDeg }) {
  const H = box.offsetHeight;
  const startY = -Math.max(240, fromTop);
  const T1 = clamp(Math.round(34 * Math.sqrt(Math.abs(startY))), 650, 1150); // fall time ~ sqrt(distance)
  const apex = Math.min(H * 0.05, 20); // gentle rebound
  const total = T1 + 860;
  const t = (ms) => ms / total;
  const f = (y, sx, sy, rot) => `translateY(${y}px) rotate(${rot}deg) scale(${sx}, ${sy})`;

  const frame = box.animate(
    [
      { offset: 0, transform: f(startY, 1, 1, startDeg), easing: "cubic-bezier(0.55, 0, 1, 0.45)" }, // accelerate
      { offset: t(T1), transform: f(0, 1, 1, restDeg), easing: "cubic-bezier(0.2, 0.8, 0.3, 1)" }, // touchdown
      { offset: t(T1 + 130), transform: f(0, 1.04, 0.94, restDeg), easing: "cubic-bezier(0.2, 0.6, 0.4, 1)" }, // soft squash
      { offset: t(T1 + 390), transform: f(-apex, 0.99, 1.015, restDeg + (restDeg - startDeg) * 0.03), easing: "cubic-bezier(0.55, 0, 1, 0.45)" }, // the one bounce
      { offset: t(T1 + 610), transform: f(0, 1.02, 0.975, restDeg), easing: "ease-out" }, // soft second contact
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
 * The finished frame leaves with a short fade. This only runs once the petals have
 * hidden it completely, so the viewer never sees the frame disappear.
 * The frame itself is never altered, cut or distorted.
 */
export function playFrameExit(box) {
  return box.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 360, easing: "ease-in", fill: "forwards" });
}
