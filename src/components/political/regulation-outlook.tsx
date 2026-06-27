import { ArrowUpRight, Scale } from "lucide-react";
import type { PoliticalBloc, Regulation } from "@/types";
import { billDirection, billOutlook, readMajority } from "@/lib/political";
import { VerificationBadge } from "@/components/verification-badge";

function OutlookChip({ color, label }: { color: string; label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
      style={{
        color,
        backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)`,
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

export function RegulationOutlook({
  blocs,
  pendingBills,
}: {
  blocs: PoliticalBloc[];
  pendingBills: Regulation[];
}) {
  const m = readMajority(blocs);
  const sharePct = m.share.toFixed(0);

  const tier = m.clearsAmendment
    ? "a two-thirds supermajority"
    : m.clearsFastTrack
      ? "past the 180-seat fast-track line, short of the 200-seat supermajority"
      : m.clearsMajority
        ? "a simple floor majority"
        : "a plurality but not a majority";

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Scale className="h-4 w-4 text-accent" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
            What this means for regulation
          </h2>
        </div>

        {/* Structural read — arithmetic is fact; the implication is labeled */}
        <p className="text-sm leading-relaxed text-text">
          The{" "}
          <span className="font-semibold" style={{ color: m.bloc.color }}>
            {m.bloc.name_en}
          </span>{" "}
          holds{" "}
          <span className="tabular font-semibold">{m.bloc.power}</span> of 300
          seats ({sharePct}%) — {tier}.
        </p>
        <p className="text-sm leading-relaxed text-muted">
          Structurally, legislation aligned with the majority bloc can advance{" "}
          {m.clearsFastTrack ? "and resist a filibuster " : ""}without cross-party
          support, while bills it opposes face long odds regardless of merit. This
          is a read of seat arithmetic, not of any member&apos;s declared position.
        </p>

        <div className="flex items-center gap-2">
          <VerificationBadge needsVerification />
          <span className="text-[11px] text-muted">
            analytical interpretation — not a vote prediction
          </span>
        </div>
      </div>

      {/* Pending bills, scored for structural passage outlook */}
      {pendingBills.length > 0 && (
        <div className="space-y-3 border-t border-border pt-4">
          <h3 className="text-sm font-medium text-text">
            Pending bills in this Assembly
            <span className="tabular ml-2 text-xs text-muted">
              {pendingBills.length}
            </span>
          </h3>

          <ul className="space-y-3">
            {pendingBills.map((bill) => {
              const dir = billDirection(bill);
              const outlook = billOutlook(dir, m);
              return (
                <li
                  key={bill.id}
                  className="space-y-2 rounded-lg border border-border bg-surface/60 p-3 transition-colors hover:border-accent/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-text">{bill.title_en}</p>
                    <OutlookChip color={outlook.color} label={outlook.label} />
                  </div>
                  {/* Korean source title — provenance */}
                  <p className="tabular text-xs text-muted" lang="ko">
                    {bill.title_ko}
                  </p>
                  <p className="text-sm text-muted">{outlook.rationale_en}</p>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted"
                      >
                        {dir}
                      </span>
                      <span className="tabular text-muted">{bill.stage_en}</span>
                    </div>
                    <a
                      href={bill.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-0.5 text-accent hover:underline"
                    >
                      {bill.needs_verification ? "Portal" : "Bill text"}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
