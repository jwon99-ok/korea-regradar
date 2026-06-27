import { scaleLinear } from "d3-scale";
import type { Regcon } from "@/types";
import { REGCON_META } from "@/types";

// REGCON level → CSS token color (defined in globals.css).
export function regconColor(level: Regcon): string {
  return REGCON_META[level].token;
}

// Concrete hex values (for SVG glow/animation where CSS vars can't interpolate).
export const REGCON_HEX: Record<Regcon, string> = {
  5: "#2ECC71",
  4: "#A3CB38",
  3: "#F1C40F",
  2: "#E67E22",
  1: "#E74C3C",
};

export function regconLabel(level: Regcon): string {
  return REGCON_META[level].label_en;
}

// "2 · Elevated"
export function regconText(level: Regcon): string {
  return `${level} · ${REGCON_META[level].label_en}`;
}

// One-line status sentence per level (shown under the badge).
export const REGCON_STATUS: Record<Regcon, string> = {
  5: "Stable regulatory environment — low legislative activity.",
  4: "Worth watching — early-stage activity in this sector.",
  3: "Caution — active proposals could shift the rules.",
  2: "Elevated — significant pending changes; monitor closely.",
  1: "Critical — high-impact restrictions in motion.",
};

// ── Gauge geometry ──────────────────────────────────────────────────
// Value 0–100 maps across a top semicircle: 0 = west (left), 100 = east.
// Angle θ measured from straight up (north), positive clockwise.
export const scoreToAngle = scaleLinear().domain([0, 100]).range([-90, 90]);

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
}

// SVG path (stroked arc) along radius r, from value v1 to v2 (v2 >= v1).
export function arcPath(
  cx: number,
  cy: number,
  r: number,
  v1: number,
  v2: number,
): string {
  const a1 = scoreToAngle(v1);
  const a2 = scoreToAngle(v2);
  const p1 = polar(cx, cy, r, a1);
  const p2 = polar(cx, cy, r, a2);
  const largeArc = a2 - a1 > 180 ? 1 : 0;
  return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
}

// Point on the centerline arc at value v (for the tip marker / ticks).
export function arcPoint(cx: number, cy: number, r: number, v: number) {
  return polar(cx, cy, r, scoreToAngle(v));
}
