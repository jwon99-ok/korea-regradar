import { ArrowUpRight } from "lucide-react";
import type { FdiLimit, Regulation } from "@/types";
import { FDI_META } from "@/lib/fdi";
import { VerificationBadge } from "@/components/verification-badge";

const REG_TYPE_LABEL: Record<Regulation["reg_type"], string> = {
  law: "Law",
  bill: "Bill",
  decree: "Decree",
  ministerial: "Ministerial",
  restriction: "Restriction",
};

const STATUS_META: Record<
  Regulation["status"],
  { label: string; color: string }
> = {
  pending: { label: "Pending", color: "var(--regcon-3)" },
  passed: { label: "Passed", color: "var(--regcon-5)" },
  in_force: { label: "In force", color: "var(--accent)" },
  withdrawn: { label: "Withdrawn", color: "var(--muted)" },
};

export function RegulationCard({
  reg,
  fdi,
}: {
  reg: Regulation;
  fdi?: FdiLimit;
}) {
  const status = STATUS_META[reg.status];
  const fdiMeta = fdi ? FDI_META[fdi.regime] : null;

  return (
    <article className="flex h-full flex-col gap-3 rounded-xl border border-border bg-surface/50 p-5 transition-colors hover:border-accent/40">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded border border-border bg-surface-2 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted">
            {REG_TYPE_LABEL[reg.reg_type]}
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
            style={{
              color: status.color,
              backgroundColor: `color-mix(in srgb, ${status.color} 12%, transparent)`,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: status.color }}
            />
            {status.label}
          </span>
          <span className="tabular text-[11px] text-muted">{reg.stage_en}</span>
        </div>

        {/* Foreign-ownership cap for this card's industry — big number */}
        {fdi && fdiMeta && (
          <div className="flex shrink-0 items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: fdiMeta.hex,
                boxShadow: `0 0 6px ${fdiMeta.hex}`,
              }}
            />
            <span
              className="tabular text-2xl font-semibold leading-none"
              style={{ color: fdiMeta.hex }}
            >
              {fdi.cap_pct}%
            </span>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-text">{reg.title_en}</h3>
        {/* Korean source title */}
        <p className="tabular mt-0.5 text-xs text-muted" lang="ko">
          {reg.title_ko}
        </p>
      </div>

      <p className="text-sm text-muted">{reg.summary_en}</p>

      {/* Korean source quote */}
      <p className="border-l-2 border-kr/50 pl-2.5 text-sm text-kr" lang="ko">
        {reg.source_ko}
      </p>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-2">
          <VerificationBadge needsVerification={reg.needs_verification} />
          <span className="tabular text-xs text-muted">
            {reg.introduced_date}
          </span>
        </div>
        <a
          href={reg.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-0.5 text-xs text-accent hover:underline"
        >
          {/* Honest labels: verified = a real legal deep link; otherwise the portal home. */}
          {reg.needs_verification ? "Portal" : "Legal basis"}
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}
