// Pure geometry helpers. No DOM, no React.

const toPoly = (pts) => pts.map(([x, y]) => `${x.toFixed(2)}% ${y.toFixed(2)}%`).join(", ");

// Splits a card into cols x rows irregular, torn-edged pieces.
// Every piece is an 8-vertex polygon (4 corners + 1 jagged mid-point per edge).
// Neighbouring pieces share the exact same corners and mid-points, so they tile with no gaps.
export function makeFragments(cols = 4, rows = 3, rnd = Math.random) {
  const pts = [];
  for (let r = 0; r <= rows; r++) {
    pts.push([]);
    for (let c = 0; c <= cols; c++) {
      let x = (c / cols) * 100;
      let y = (r / rows) * 100;
      const interior = c > 0 && c < cols && r > 0 && r < rows;
      const onHEdge = (r === 0 || r === rows) && c > 0 && c < cols;
      const onVEdge = (c === 0 || c === cols) && r > 0 && r < rows;
      if (interior) {
        x += (rnd() - 0.5) * (100 / cols) * 0.55;
        y += (rnd() - 0.5) * (100 / rows) * 0.55;
      }
      if (onHEdge) x += (rnd() - 0.5) * (100 / cols) * 0.4; // outer edges only slide along themselves
      if (onVEdge) y += (rnd() - 0.5) * (100 / rows) * 0.4;
      pts[r].push([x, y]);
    }
  }

  // jagged mid-point of an edge (outer edges of the card stay straight)
  const mid = (a, b, outer) => {
    const mx = (a[0] + b[0]) / 2;
    const my = (a[1] + b[1]) / 2;
    if (outer) return [mx, my];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    const d = (rnd() - 0.5) * 0.32 * len;
    return [mx + (-dy / len) * d, my + (dx / len) * d];
  };

  const h = []; // h[r][c]: edge from pts[r][c] to pts[r][c+1]
  for (let r = 0; r <= rows; r++) {
    h.push([]);
    for (let c = 0; c < cols; c++) h[r].push(mid(pts[r][c], pts[r][c + 1], r === 0 || r === rows));
  }
  const v = []; // v[r][c]: edge from pts[r][c] to pts[r+1][c]
  for (let r = 0; r < rows; r++) {
    v.push([]);
    for (let c = 0; c <= cols; c++) v[r].push(mid(pts[r][c], pts[r + 1][c], c === 0 || c === cols));
  }

  const out = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const TL = pts[r][c], TR = pts[r][c + 1], BR = pts[r + 1][c + 1], BL = pts[r + 1][c];
      // clockwise from top-left: TL, top, TR, right, BR, bottom, BL, left
      const ring = [TL, h[r][c], TR, v[r][c + 1], BR, h[r + 1][c], BL, v[r][c]];
      out.push({
        poly: toPoly(ring),
        cx: (TL[0] + TR[0] + BR[0] + BL[0]) / 4,
        cy: (TL[1] + TR[1] + BR[1] + BL[1]) / 4,
      });
    }
  }
  return out;
}

// Bird silhouettes: 8 vertices, same vertex order as a fragment so clip-path can interpolate.
// Units are % of the card WIDTH, centred on (0,0).
export const BIRD_WIDTH = 52;
const BIRD_UP = [[-14, -10], [0, -3], [14, -10], [26, -4], [13, -6], [0, 2], [-13, -6], [-26, -4]];
const BIRD_DOWN = [[-13, -4], [0, -6], [13, -4], [24, 5], [12, 0], [0, 1], [-12, 0], [-24, 5]];

// `ratio` = card width / card height, so the bird isn't squashed by percentage units.
export function birdPoly(cx, cy, ratio, k, flapUp) {
  const shape = flapUp ? BIRD_UP : BIRD_DOWN;
  return toPoly(shape.map(([ux, uy]) => [cx + ux * k, cy + uy * k * ratio]));
}
