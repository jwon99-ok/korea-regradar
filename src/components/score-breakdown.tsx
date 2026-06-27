"use client";

import { motion } from "framer-motion";
import type { RiskBreakdownItem } from "@/types";

export function ScoreBreakdown({
  items,
  total,
  color,
}: {
  items: RiskBreakdownItem[];
  total: number;
  color: string;
}) {
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-medium text-text">Score breakdown</h3>
        <span className="tabular text-xs text-muted">
          contribution to {total}
        </span>
      </div>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.label_en} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">{item.label_en}</span>
              <span className="tabular text-text">{item.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-2">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / max) * 100}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
