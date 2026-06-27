// Parliament-arc seat layout (Wikipedia-style hemicycle).
// Pure trig — deterministic so the chart is stable across renders.
// Seats are distributed across concentric rings, then ordered left→right
// by angle so party blocs render as contiguous wedges.

export interface SeatPoint {
  x: number;
  y: number; // SVG space, y negative = up
  angle: number; // π (left) → 0 (right)
  ring: number;
}

export function hemicycleSeats(
  total: number,
  {
    rings = 10,
    innerRadius = 120,
    outerRadius = 235,
  }: { rings?: number; innerRadius?: number; outerRadius?: number } = {},
): SeatPoint[] {
  // Radius per ring, evenly spaced inner→outer.
  const radii = Array.from({ length: rings }, (_, i) =>
    rings === 1 ? innerRadius : innerRadius + (outerRadius - innerRadius) * (i / (rings - 1)),
  );

  // Capacity per ring ∝ its radius (arc length of a semicircle = π·r).
  const sumR = radii.reduce((a, b) => a + b, 0);
  const counts = radii.map((r) => Math.round((total * r) / sumR));

  // Fix rounding drift, adjusting outer rings first (more room there).
  let drift = total - counts.reduce((a, b) => a + b, 0);
  let i = rings - 1;
  while (drift !== 0) {
    const step = Math.sign(drift);
    if (counts[i] + step >= 0) {
      counts[i] += step;
      drift -= step;
    }
    i = (i - 1 + rings) % rings;
  }

  const seats: SeatPoint[] = [];
  radii.forEach((radius, ring) => {
    const n = counts[ring];
    for (let j = 0; j < n; j++) {
      // Spread seats from 180° (left) to 0° (right); pad ends slightly.
      const t = n === 1 ? 0.5 : j / (n - 1);
      const angle = Math.PI * (1 - t);
      seats.push({
        angle,
        ring,
        x: radius * Math.cos(angle),
        y: -radius * Math.sin(angle),
      });
    }
  });

  // Order left→right (angle π first) for contiguous party wedges.
  seats.sort((a, b) => b.angle - a.angle);
  return seats;
}

// Assign each ordered seat a party, filling left→right in the given order.
export function assignParties<T extends { seats: number }>(
  seats: SeatPoint[],
  parties: T[],
): (SeatPoint & { party: T })[] {
  const out: (SeatPoint & { party: T })[] = [];
  let idx = 0;
  for (const party of parties) {
    for (let k = 0; k < party.seats && idx < seats.length; k++, idx++) {
      out.push({ ...seats[idx], party });
    }
  }
  // Any leftover seats (rounding) get the last party.
  while (idx < seats.length) {
    out.push({ ...seats[idx], party: parties[parties.length - 1] });
    idx++;
  }
  return out;
}
