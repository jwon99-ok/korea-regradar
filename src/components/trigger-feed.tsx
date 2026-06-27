import { ArrowUpRight } from "lucide-react";
import type { RiskTrigger } from "@/types";
import { VerificationBadge } from "@/components/verification-badge";

export function TriggerFeed({ triggers }: { triggers: RiskTrigger[] }) {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-medium text-text">
        Why is it at this level now?
      </h3>
      <ul className="space-y-2">
        {triggers.map((t, i) => (
          <li
            key={i}
            className="rounded-lg border border-border bg-surface/60 p-3 transition-colors hover:border-accent/40"
          >
            <p className="text-sm text-text">{t.title_en}</p>
            {/* Korean source quote — provenance, not inference */}
            <p className="mt-1 text-sm text-kr" lang="ko">
              {t.source_ko}
            </p>
            <div className="mt-2 flex items-center justify-between gap-2 text-xs text-muted">
              <div className="flex flex-wrap items-center gap-2">
                <VerificationBadge needsVerification={t.needs_verification} />
                <span className="tabular">{t.date}</span>
              </div>
              <a
                href={t.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-0.5 text-accent hover:underline"
              >
                {/* Be honest: a home-page link is the publisher, not the article. */}
                {t.needs_verification ? "Publisher" : "Source"}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
