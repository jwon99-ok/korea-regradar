"use client";

import { motion } from "framer-motion";
import { scaleLinear } from "d3-scale";
import type { PoliticalBloc } from "@/types";
import { ASSEMBLY } from "@/lib/political";

export function BlocPowerBars({ blocs }: { blocs: PoliticalBloc[] }) {
  const x = scaleLinear().domain([0, ASSEMBLY.total]).range([0, 100]);
  const sorted = [...blocs].sort((a, b) => b.power - a.power);

  const thresholds = [
    { at: ASSEMBLY.majority, label: "Majority 151" },
    { at: ASSEMBLY.fastTrack, label: "Fast-track 180" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-text">Bloc power on the floor</h3>
        <span className="tabular text-xs text-muted">of {ASSEMBLY.total} seats</span>
      </div>

      <div className="relative space-y-3">
        {/* Threshold guide lines spanning the bar stack */}
        <div className="pointer-events-none absolute inset-0">
          {thresholds.map((t, ti) => (
            <div
              key={t.at}
              className="absolute top-0 bottom-5 border-l border-dashed border-muted/50"
              style={{ left: `${x(t.at)}%` }}
            >
              {/* Stagger labels vertically — 151 and 180 sit close together */}
              <span
                className="tabular absolute left-1 whitespace-nowrap text-[10px] text-muted"
                style={{ top: ti % 2 === 0 ? "-2px" : "12px" }}
              >
                {t.label}
              </span>
            </div>
          ))}
        </div>

        {sorted.map((b, i) => (
          <div key={b.name_en} className="relative space-y-1 pt-4 first:pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text">{b.name_en}</span>
              <span className="tabular text-muted">
                {b.power}
                <span className="ml-1 text-[11px]">
                  · {((b.power / ASSEMBLY.total) * 100).toFixed(0)}%
                </span>
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-surface-2">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: b.color }}
                initial={{ width: 0 }}
                animate={{ width: `${x(b.power)}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
