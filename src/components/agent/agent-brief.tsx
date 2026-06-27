"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, ExternalLink, Minus } from "lucide-react";
import type { AgentResponse } from "@/types";

function SourceBadge({ source }: { source: AgentResponse["meta"]["source"] }) {
  const map = {
    live: { label: "LIVE", color: "var(--regcon-5)" },
    cache: { label: "CACHED", color: "var(--regcon-3)" },
    fallback: { label: "SEED", color: "var(--muted)" },
  } as const;
  const { label, color } = map[source];
  return (
    <span
      className="tabular rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wider"
      style={{
        color,
        backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)`,
      }}
    >
      {label}
    </span>
  );
}

export function AgentBrief({ data }: { data: AgentResponse }) {
  const { brief, meta } = data;
  const dirIcon =
    brief.impact.direction === "up" ? (
      <ArrowUpRight className="h-3.5 w-3.5 text-regcon-1" />
    ) : brief.impact.direction === "down" ? (
      <ArrowDownRight className="h-3.5 w-3.5 text-regcon-5" />
    ) : (
      <Minus className="h-3.5 w-3.5 text-muted" />
    );
  const deltaText =
    brief.impact.delta > 0
      ? `+${brief.impact.delta}`
      : `${brief.impact.delta}`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-3 rounded-xl border border-accent/40 bg-accent/[0.06] p-4"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-accent">
            Agent updated just now
          </span>
        </div>
        <SourceBadge source={meta.source} />
      </div>

      <h3 className="text-sm font-semibold text-text">{brief.headline_en}</h3>

      <ul className="space-y-1 text-sm text-muted">
        {brief.summary_en.map((line, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-accent">›</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      {/* Impact classification → reflected on the gauge */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full border border-border bg-surface px-2 py-1 text-muted">
          {brief.impact.risk_component}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-1">
          {dirIcon}
          <span className="tabular text-text">{deltaText} score</span>
        </span>
      </div>

      {/* Korean source quote — provenance, not inference */}
      {brief.korean_quote.text_ko && (
        <blockquote className="border-l-2 border-kr/60 pl-3">
          <p className="text-sm text-kr" lang="ko">
            “{brief.korean_quote.text_ko}”
          </p>
          {brief.korean_quote.source_url && (
            <a
              href={brief.korean_quote.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-xs text-accent hover:underline"
            >
              {brief.korean_quote.source_title || "Source"}
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </blockquote>
      )}

      {brief.sources.length > 0 && (
        <div className="space-y-1 border-t border-border pt-2">
          <p className="text-[11px] uppercase tracking-wider text-muted">
            Sources discovered by Exa
          </p>
          <ul className="space-y-1">
            {brief.sources.map((s, i) => (
              <li key={i}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-1 text-xs text-muted hover:text-accent"
                >
                  <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" />
                  <span className="line-clamp-1">{s.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="tabular text-[10px] text-muted">
        {meta.source === "live"
          ? `Exa + OpenAI${meta.model ? ` · ${meta.model}` : ""} · ${meta.elapsed_ms}ms`
          : meta.note ?? "served from cache"}
      </p>
    </motion.section>
  );
}
