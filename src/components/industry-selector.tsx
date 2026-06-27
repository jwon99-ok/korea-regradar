"use client";

import type { Industry, IndustryCode } from "@/types";
import { cn } from "@/lib/utils";

export function IndustrySelector({
  industries,
  selected,
  onSelect,
}: {
  industries: Industry[];
  selected: IndustryCode;
  onSelect: (code: IndustryCode) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {industries.map((ind) => {
        const active = ind.code === selected;
        return (
          <button
            key={ind.code}
            type="button"
            onClick={() => onSelect(ind.code)}
            aria-pressed={active}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              active
                ? "border-accent/60 bg-accent/15 text-text"
                : "border-border bg-surface text-muted hover:border-border hover:bg-surface-2 hover:text-text",
            )}
          >
            {ind.name_en}
          </button>
        );
      })}
    </div>
  );
}
