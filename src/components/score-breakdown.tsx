"use client";

import { motion } from "framer-motion";
import type { RiskBreakdownItem } from "@/types";

// One- to two-word plain meaning per component (descriptive, not asserted fact).
const MEANING: Record<string, string> = {
  "Pending bills": "bills in committee",
  "Ownership-cap changes": "foreign-equity limits",
  "Political events": "assembly & policy moves",
  "Media sentiment": "press & public tone",
};

export function ScoreBreakdown({
  items,
  total,
  color,
}: {
  items: RiskBreakdownItem[];
  total: number;
  color: string;
}) {
  // Components are points out of the full 0–100 scale and sum to the score —
  // scale every bar to 100 so the shared axis (and the subtotal) is honest.
  const SCALE = 100;
  const sum = items.reduce((acc, i) => acc + i.value, 0);

  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-medium text-text">Score breakdown</h3>
        <span className="tabular text-xs text-muted">
          contribution to {total} / 100
        </span>
      </div>

      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.label_en} className="space-y-1">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="min-w-0 truncate">
                <span className="text-muted">{item.label_en}</span>
                {MEANING[item.label_en] && (
                  <span className="ml-1.5 text-[11px] text-muted/70">
                    · {MEANING[item.label_en]}
                  </span>
                )}
              </span>
              <span className="tabular shrink-0 text-text">
                {item.value}
                <span className="text-[11px] text-muted"> / 100</span>
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-2">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / SCALE) * 100}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Subtotal — make the components-sum-to-score relationship explicit */}
      <div className="flex items-baseline justify-between border-t border-border pt-2 text-sm">
        <span className="text-muted">Sum of components</span>
        <span className="tabular font-semibold text-text">
          {sum}
          <span className="text-[11px] font-normal text-muted"> / 100</span>
        </span>
      </div>
      <p className="text-[11px] text-muted">
        Model estimate — the four components are weighted and sum to the score.
        Needs verification.
      </p>
    </section>
  );
}
