import { ArrowUpRight, Ban, CircleCheck, TriangleAlert } from "lucide-react";
import type { FdiLimit } from "@/types";
import { FDI_META } from "@/lib/fdi";
import { VerificationBadge } from "@/components/verification-badge";
import { cn } from "@/lib/utils";

// Three-lamp stoplight; the active lamp glows (position is itself a
// colorblind-safe signal, reinforced by the icon + label elsewhere).
function TrafficLight({ active }: { active: "green" | "yellow" | "red" }) {
  const lamps = [
    { key: "red", hex: "#E74C3C" },
    { key: "yellow", hex: "#F1C40F" },
    { key: "green", hex: "#2ECC71" },
  ] as const;
  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-bg/70 p-1.5">
      {lamps.map((l) => {
        const on = l.key === active;
        return (
          <span
            key={l.key}
            className="h-3 w-3 rounded-full transition-all"
            style={{
              backgroundColor: on ? l.hex : `color-mix(in srgb, ${l.hex} 16%, transparent)`,
              boxShadow: on ? `0 0 8px ${l.hex}` : "none",
            }}
          />
        );
      })}
    </div>
  );
}

export function OwnershipSignalLight({
  fdi,
  industryName,
  size = "md",
}: {
  fdi: FdiLimit;
  industryName: string;
  size?: "md" | "lg";
}) {
  const meta = FDI_META[fdi.regime];
  const Icon =
    fdi.regime === "open_100"
      ? CircleCheck
      : fdi.regime === "capped"
        ? TriangleAlert
        : Ban;

  return (
    <div className="flex h-full flex-col gap-3 rounded-xl border border-border bg-surface/50 p-5 transition-colors hover:border-accent/40">
      <div className="flex items-start gap-4">
        <TrafficLight active={meta.lamp} />

        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-widest text-muted">
            {industryName}
          </p>
          <div className="flex items-end gap-2">
            <span
              className={cn(
                "tabular font-semibold leading-none tracking-tight",
                size === "lg" ? "text-6xl" : "text-4xl",
              )}
              style={{ color: meta.hex }}
            >
              {fdi.cap_pct}%
            </span>
            <span className="mb-1 text-xs text-muted">max foreign</span>
          </div>
          <span
            className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium"
            style={{ color: meta.hex }}
          >
            <Icon className="h-4 w-4" />
            {meta.label}
            {fdi.regime === "capped" ? ` at ${fdi.cap_pct}%` : ""}
          </span>
        </div>
      </div>

      <p className="text-sm text-text">{fdi.note_en}</p>

      {/* Korean legal basis — primary source, not inference */}
      <div className="rounded-lg border border-border bg-bg/40 p-2.5">
        <p className="text-sm text-kr" lang="ko">
          {fdi.source_ko}
        </p>
        <p className="tabular mt-1 text-xs text-muted">{fdi.legal_basis}</p>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-2">
          <VerificationBadge needsVerification={fdi.needs_verification} />
          <span className="tabular text-xs text-muted">as-of {fdi.as_of}</span>
        </div>
        <a
          href={fdi.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-0.5 text-xs text-accent hover:underline"
        >
          {/* Be honest: an unverified link is the portal home, not the primary text. */}
          {fdi.needs_verification ? "Portal" : "Source"}
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
