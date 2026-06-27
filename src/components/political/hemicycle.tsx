"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { PoliticalSeat } from "@/types";
import { ASSEMBLY } from "@/lib/political";
import { assignParties, hemicycleSeats } from "@/lib/hemicycle";

export function Hemicycle({ seats }: { seats: PoliticalSeat[] }) {
  const total = seats.reduce((sum, p) => sum + p.seats, 0);
  const [hovered, setHovered] = useState<string | null>(null);

  // Layout is deterministic — only recompute if the seat data changes.
  const placed = useMemo(() => {
    const points = hemicycleSeats(total, { rings: 11 });
    return assignParties(points, seats);
  }, [seats, total]);

  return (
    <div className="relative">
      <svg
        viewBox="-260 -260 520 290"
        className="h-auto w-full"
        role="img"
        aria-label={`National Assembly seat distribution, ${total} seats`}
      >
        {placed.map((s, i) => {
          const dim = hovered !== null && hovered !== s.party.party_en;
          return (
            <motion.circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={6}
              fill={s.party.color}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: dim ? 0.22 : 1, scale: 1 }}
              transition={{
                opacity: { duration: 0.18 },
                scale: { duration: 0.3, delay: Math.min(i * 0.0012, 0.4) },
              }}
              onMouseEnter={() => setHovered(s.party.party_en)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            />
          );
        })}

        {/* Center total */}
        <text x="0" y="-8" textAnchor="middle" className="fill-text" style={{ fontSize: 38, fontWeight: 700 }}>
          {total}
        </text>
        <text x="0" y="14" textAnchor="middle" className="fill-muted" style={{ fontSize: 13, letterSpacing: 1 }}>
          SEATS · 22ND ASSEMBLY
        </text>
      </svg>

      {/* Legend doubles as hover target highlight */}
      <div className="mt-1 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {seats.map((p) => {
          const active = hovered === null || hovered === p.party_en;
          return (
            <button
              key={p.party_en}
              type="button"
              onMouseEnter={() => setHovered(p.party_en)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center gap-2 text-sm transition-opacity"
              style={{ opacity: active ? 1 : 0.4 }}
            >
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
              <span className="text-text">{p.party_en}</span>
              <span className="tabular text-muted">
                {p.seats}
                <span className="ml-1 text-[11px]">
                  · {((p.seats / total) * 100).toFixed(0)}%
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="tabular mt-3 text-center text-[11px] text-muted">
        Majority {ASSEMBLY.majority} · Fast-track {ASSEMBLY.fastTrack} · Amendment{" "}
        {ASSEMBLY.amendment}
      </p>
    </div>
  );
}
