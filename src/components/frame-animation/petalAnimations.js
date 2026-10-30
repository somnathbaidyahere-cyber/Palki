// Rose-petal shower + swirl. Pure Web Animations API, transform and opacity only.
// Petals come from a fixed pool of DOM nodes that is reused every round.

const TAU = Math.PI * 2;
const rand = (a, b) => a + Math.random() * (b - a);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export const RAMP = 2800; // ms over which the shower thickens (density ramps up)
const K_FALL = 18; // keyframe samples per fall
const K_DISP = 22; // keyframe samples per swirl

const COLORS = [["red", 0.3], ["rose", 0.28], ["pink", 0.24], ["yellow", 0.18]];
function pickColor() {
  let r = Math.random();
  for (const [c, w] of COLORS) {
    if ((r -= w) < 0) return c;
  }
  return "red";
}

/** Descriptors for the petal pool (client-only; called once on mount). */
export function makePool(compact) {
  const mk = (group, n, fn) =>
    Array.from({ length: n }, () => ({ group, color: pickColor(), aspect: rand(0.82, 1), ...fn() }));
  return {
    // cover petals are sized per round to the frame; they land and conceal it
    cover: mk("cover", compact ? 36 : 48, () => ({ size: 100, blur: 0, maxOp: 0.985 })),
    // large, slightly blurred foreground petals: fast, close to the viewer
    fg: mk("fg", compact ? 6 : 10, () => ({ size: rand(compact ? 70 : 92, compact ? 104 : 140), blur: rand(1.4, 2.4), maxOp: 0.92 })),
    // small background petals: slow, far away, softer
    bg: mk("bg", compact ? 10 : 18, () => ({ size: rand(20, 36), blur: 0, maxOp: 0.72 })),
  };
}

const xf = (x, y, w, h, rx, ry, rz, s = 1) =>
  `translate3d(${(x - w / 2).toFixed(1)}px, ${(y - h / 2).toFixed(1)}px, 0) perspective(600px) rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg) rotateZ(${rz.toFixed(1)}deg) scale(${s.toFixed(3)})`;

// A petal drifting down: damped sway, a slow tumble, and (for cover petals) a soft settle.
function fallFrames(p) {
  const out = [];
  for (let k = 0; k < K_FALL; k++) {
    const t = k / (K_FALL - 1);
    const e = p.settle ? 0.5 * t + 0.5 * (1 - (1 - t) * (1 - t)) : Math.pow(t, 1.08); // brisk start, soft landing
    const damp = p.settle ? Math.pow(1 - t, 0.8) : 1;
    const x = p.x0 + (p.xr - p.x0) * e + p.sway * Math.sin(TAU * p.n * t + p.ph) * damp;
    const y = p.y0 + (p.yr - p.y0) * e + p.bob * Math.sin(TAU * p.n * 1.3 * t + p.ph) * damp;
    const rz = p.rz0 + (p.rzr - p.rz0) * e + 26 * Math.sin(TAU * p.n * t + p.ph + 1.2) * damp;
    const rx = p.rxr * e + p.flutter * Math.sin(TAU * p.n * 0.9 * t + p.ph + 0.6) * damp;
    const ry = p.ryr * e + p.flutter * 0.6 * Math.sin(TAU * p.n * 1.1 * t + p.ph + 2.1) * damp;
    let op = p.maxOp;
    if (t < p.fadeIn) op *= t / p.fadeIn;
    if (p.fadeOut && t > 1 - p.fadeOut) op *= (1 - t) / p.fadeOut;
    out.push({ offset: t, transform: xf(x, y, p.w, p.h, rx, ry, rz), opacity: +op.toFixed(3) });
  }
  return out;
}

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * Starts the shower. Density ramps up; a coverage grid of large "cover" petals lands over the
 * whole frame so it ends up completely hidden. Resolves once the last cover petal has settled.
 * L = { fx, fy, fw, fh (frame centre/size), sh (stage height), heroOffset, compact }
 */
export function playShower({ covers, fg, bg }, L) {
  [...covers, ...fg, ...bg].forEach(({ el }) => el.getAnimations().forEach((a) => a.cancel()));
  const { fx, fy, fw, fh, sh, heroOffset, compact } = L;
  const topOf = (h) => (compact ? -h - rand(0, 60) : -(heroOffset + h * 0.6 + rand(0, 120)));

  // ---- coverage grid: petal centres spread edge to edge over the frame, spacing ~ cell,
  // petal size ~ 1.7-2.1 x cell, so neighbours always overlap and nothing shows through.
  let cell = compact ? 54 : 70;
  let cols, rows;
  for (;;) {
    cols = Math.max(2, Math.round(fw / cell) + 1);
    rows = Math.max(2, Math.round(fh / cell) + 1);
    if (cols * rows <= covers.length) break;
    cell += 4;
  }
  const slots = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      slots.push({
        x: fx - fw / 2 + (c / (cols - 1)) * fw + rand(-0.2, 0.2) * cell,
        y: fy - fh / 2 + (r / (rows - 1)) * fh + rand(-0.2, 0.2) * cell,
      });
  shuffle(slots);

  const plan = [];
  const coverAnims = [];
  slots.forEach((s, j) => {
    const { el, desc } = covers[j];
    const w = cell * rand(1.7, 2.1);
    const h = w * desc.aspect;
    el.style.width = `${w}px`;
    el.style.height = `${h}px`;
    const rzr = rand(-180, 180);
    const p = {
      x0: s.x + rand(-110, 110), y0: topOf(h), xr: s.x, yr: s.y, w, h,
      rz0: rzr + rand(-220, 220), rzr, rxr: rand(0, 14), ryr: rand(-8, 8),
      sway: rand(16, 36), bob: rand(4, 10), n: rand(1, 1.8), ph: rand(0, TAU), flutter: rand(35, 65),
      fadeIn: 0.12, fadeOut: 0, maxOp: desc.maxOp, settle: true,
    };
    // stratified, skewed delays: sparse at first, dense at the end
    const delay = RAMP * Math.pow((j + Math.random()) / slots.length, 1.6);
    const a = el.animate(fallFrames(p), { duration: rand(1700, 2500), delay, fill: "both", easing: "linear" });
    coverAnims.push(a);
    plan.push({ el, p, desc });
  });

  // ---- ambient petals: fall past the frame and out of the bottom, for depth
  const ambient = (group, durRange, sway, maxFlutter) =>
    group.forEach(({ el, desc }) => {
      const w = desc.size, h = w * desc.aspect;
      const x0 = rand(fx - fw * 0.9 - 40, fx + fw * 0.9 + 40);
      const p = {
        x0, y0: topOf(h), xr: x0 + rand(-60, 60), yr: sh + 160, w, h,
        rz0: rand(-180, 180), rzr: rand(-180, 180) + rand(-200, 200), rxr: 0, ryr: 0,
        sway: rand(sway[0], sway[1]), bob: 6, n: rand(1, 2), ph: rand(0, TAU), flutter: rand(30, maxFlutter),
        fadeIn: 0.1, fadeOut: 0.12, maxOp: desc.maxOp, settle: false,
      };
      el.animate(fallFrames(p), {
        duration: rand(durRange[0], durRange[1]),
        delay: RAMP * 0.72 * Math.pow(Math.random(), 0.75),
        fill: "both",
        easing: "linear",
      });
    });
  ambient(fg, [2100, 3000], [40, 90], 70);
  ambient(bg, [3200, 4400], [18, 40], 55);

  const done = Promise.all(coverAnims.map((a) => a.finished)).then(() => wait(150));
  return { plan, done, L };
}

/**
 * The covering petals lift off the (now hidden) frame and swirl outward, sideways and upward,
 * receding and fading until the hero is clear. Resolves when the last petal has gone.
 */
export function playDisperse({ plan, L }) {
  const { fx: cx, fy: cy, compact } = L;
  const anims = [];
  plan.forEach(({ el, p, desc }) => {
    const dx = p.xr - cx, dy = p.yr - cy;
    const R0 = Math.hypot(dx, dy), a0 = Math.atan2(dy, dx);
    const sign = Math.random() < 0.85 ? 1 : -1; // mostly one graceful vortex direction
    const da = sign * rand(0.9, 1.6);
    const R1 = R0 + (compact ? rand(240, 420) : rand(430, 820));
    const lift = compact ? rand(80, 200) : rand(150, 360);
    const spin = sign * rand(140, 340);
    const s1 = rand(0.55, 0.8);
    const ph = rand(0, TAU);

    const kf = [];
    for (let k = 0; k < K_DISP; k++) {
      const t = k / (K_DISP - 1);
      const r = R0 + (R1 - R0) * Math.pow(t, 1.4); // slow lift-off, then it accelerates
      const a = a0 + da * Math.pow(t, 0.9);
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a) - lift * t * t;
      const rx = p.rxr + 38 * Math.sin(TAU * 1.3 * t + ph) * Math.min(1, t * 3);
      const ry = p.ryr + 24 * Math.sin(TAU * 1.1 * t + ph + 1.4) * Math.min(1, t * 3);
      const op = t < 0.66 ? desc.maxOp : desc.maxOp * ((1 - t) / 0.34);
      kf.push({ offset: t, transform: xf(x, y, p.w, p.h, rx, ry, p.rzr + spin * t, 1 + (s1 - 1) * t), opacity: +op.toFixed(3) });
    }
    // replace the landing animation with the swirl in the same task, so there is no visible gap
    el.getAnimations().forEach((a) => a.cancel());
    anims.push(el.animate(kf, { duration: rand(2400, 3000), delay: rand(0, 450), fill: "both", easing: "linear" }));
  });
  return Promise.all(anims.map((a) => a.finished));
}
