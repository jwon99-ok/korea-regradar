"use client";

import { Search } from "lucide-react";
import type { Industry, IndustryCode, RegType } from "@/types";
import { cn } from "@/lib/utils";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
        active
          ? "border-accent/60 bg-accent/15 text-text"
          : "border-border bg-surface text-muted hover:border-accent/40 hover:bg-surface-2 hover:text-text",
      )}
    >
      {children}
    </button>
  );
}

export type IndustryFilterValue = IndustryCode | "all";
export type RegTypeFilterValue = RegType | "all";

export function IndustryFilter({
  industries,
  value,
  onChange,
}: {
  industries: Industry[];
  value: IndustryFilterValue;
  onChange: (v: IndustryFilterValue) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Chip active={value === "all"} onClick={() => onChange("all")}>
        All industries
      </Chip>
      {industries.map((ind) => (
        <Chip
          key={ind.code}
          active={value === ind.code}
          onClick={() => onChange(ind.code)}
        >
          {ind.name_en}
        </Chip>
      ))}
    </div>
  );
}

const REG_TYPES: { value: RegTypeFilterValue; label: string }[] = [
  { value: "all", label: "All types" },
  { value: "law", label: "Law" },
  { value: "bill", label: "Bill" },
  { value: "decree", label: "Decree" },
  { value: "ministerial", label: "Ministerial" },
  { value: "restriction", label: "Restriction" },
];

export function RegTypeChips({
  value,
  onChange,
}: {
  value: RegTypeFilterValue;
  onChange: (v: RegTypeFilterValue) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {REG_TYPES.map((t) => (
        <Chip
          key={t.value}
          active={value === t.value}
          onClick={() => onChange(t.value)}
        >
          {t.label}
        </Chip>
      ))}
    </div>
  );
}

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search regulations…"
        className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-text placeholder:text-muted focus:border-accent/60 focus:outline-none"
      />
    </div>
  );
}
