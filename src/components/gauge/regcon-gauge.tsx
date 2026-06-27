"use client";

import { motion } from "framer-motion";
import type { Regcon } from "@/types";
import {
  arcPath,
  arcPoint,
  REGCON_HEX,
  regconLabel,
} from "@/lib/regcon";
import { AnimatedNumber } from "@/components/animated-number";
import { cn } from "@/lib/utils";

const CX = 160;
const CY = 164;
const R = 120; // centerline radius of the band
const BAND = 30; // stroke width of the band

const EASE = [0.22, 1, 0.36, 1] as const;

export function RegconGauge({
  score,
  regcon,
  className,
}: {
  score: number;
  regcon: Regcon;
  className?: string;
}) {
  const color = REGCON_HEX[regcon];
  const tip = arcPoint(CX, CY, R, score);
  // Boundaries between REGCON bands (visual ticks at 20/40/60/80).
  const ticks = [20, 40, 60, 80];

  return (
    <div className={cn("relative mx-auto w-full max-w-[420px]", className)}>
      <svg viewBox="0 0 320 200" className="w-full overflow-visible">
        <defs>
          <linearGradient id="regcon-spectrum" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--regcon-5)" />
            <stop offset="25%" stopColor="var(--regcon-4)" />
            <stop offset="50%" stopColor="var(--regcon-3)" />
            <stop offset="75%" stopColor="var(--regcon-2)" />
            <stop offset="100%" stopColor="var(--regcon-1)" />
          </linearGradient>
          <filter id="gauge-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Faint full-spectrum scale arc (green → red) */}
        <path
          d={arcPath(CX, CY, R + 26, 0, 100)}
          fill="none"
          stroke="url(#regcon-spectrum)"
          strokeWidth={4}
          strokeLinecap="round"
          opacity={0.45}
        />

        {/* Track */}
        <path
          d={arcPath(CX, CY, R, 0, 100)}
          fill="none"
          stroke="var(--surface-2)"
          strokeWidth={BAND}
          strokeLinecap="round"
        />

        {/* Band boundary ticks */}
        {ticks.map((t) => {
          const a = arcPoint(CX, CY, R + BAND / 2 + 3, t);
          const b = arcPoint(CX, CY, R - BAND / 2 - 3, t);
          return (
            <line
              key={t}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="var(--bg)"
              strokeWidth={2}
            />
          );
        })}

        {/* Animated value arc — refills on every industry change (key) */}
        <motion.path
          key={`${score}-${regcon}`}
          d={arcPath(CX, CY, R, 0, score)}
          fill="none"
          stroke={color}
          strokeWidth={BAND}
          strokeLinecap="round"
          filter="url(#gauge-glow)"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: EASE }}
        />

        {/* Tip marker — lands when the fill completes */}
        <motion.circle
          key={`tip-${score}`}
          cx={tip.x}
          cy={tip.y}
          r={7}
          fill="#fff"
          stroke={color}
          strokeWidth={3}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.95, ease: EASE }}
          style={{ transformOrigin: `${tip.x}px ${tip.y}px` }}
        />

        {/* Scale end labels */}
        <text x="20" y="192" className="tabular" fontSize="11" fill="var(--muted)">
          0
        </text>
        <text
          x="300"
          y="192"
          textAnchor="end"
          className="tabular"
          fontSize="11"
          fill="var(--muted)"
        >
          100
        </text>
      </svg>

      {/* Center readout overlaid on the arc */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 flex flex-col items-center">
        <div className="flex items-end gap-1">
          <AnimatedNumber
            value={score}
            className="tabular text-6xl font-semibold leading-none tracking-tight"
          />
          <span className="tabular mb-1 text-sm text-muted">/100</span>
        </div>
        <span
          className="mt-1 text-xs font-medium uppercase tracking-[0.22em]"
          style={{ color }}
        >
          REGCON {regcon} · {regconLabel(regcon)}
        </span>
      </div>
    </div>
  );
}
