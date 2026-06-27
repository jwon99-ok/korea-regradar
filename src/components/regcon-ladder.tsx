import type { Regcon } from "@/types";
import { REGCON_HEX } from "@/lib/regcon";
import { cn } from "@/lib/utils";

// REGCON scale reference — bands mirror regconFromScore() exactly.
const LEVELS: { level: Regcon; label: string; band: string }[] = [
  { level: 1, label: "Critical", band: "80–100" },
  { level: 2, label: "Elevated", band: "60–79" },
  { level: 3, label: "Caution", band: "45–59" },
  { level: 4, label: "Watch", band: "25–44" },
  { level: 5, label: "Stable", band: "0–24" },
];

export function RegconLadder({ current }: { current: Regcon }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <h3 className="text-xs uppercase tracking-widest text-muted">
          REGCON scale
        </h3>
        <span className="tabular text-[11px] text-muted">
          model estimate · needs verification
        </span>
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {LEVELS.map(({ level, label, band }) => {
          const active = level === current;
          const hex = REGCON_HEX[level];
          return (
            <div
              key={level}
              className={cn(
                "rounded-lg border p-1.5 text-center transition-colors",
                active
                  ? "border-transparent bg-surface-2"
                  : "border-border bg-surface/40",
              )}
              style={
                active
                  ? { boxShadow: `inset 0 0 0 1px ${hex}` }
                  : undefined
              }
            >
              <span
                className="mx-auto block h-1 w-full rounded-full"
                style={{ backgroundColor: hex, opacity: active ? 1 : 0.55 }}
              />
              <p
                className="tabular mt-1 text-sm font-semibold"
                style={{ color: active ? hex : "var(--text)" }}
              >
                {level}
              </p>
              <p
                className={cn(
                  "text-[10px] leading-tight",
                  active ? "text-text" : "text-muted",
                )}
              >
                {label}
              </p>
              <p className="tabular text-[9px] text-muted">{band}</p>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-muted">
        Score (0–100) = a model blend of pending bills, ownership-cap changes,
        political events, and media sentiment. Higher = hotter regulatory risk.
      </p>
    </div>
  );
}
