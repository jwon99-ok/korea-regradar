"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type {
  AgentResponse,
  Industry,
  IndustryCode,
  IndustryRisk,
} from "@/types";
import { REGCON_HEX, REGCON_STATUS, regconFromScore } from "@/lib/regcon";
import { cn } from "@/lib/utils";
import { GlobalDisclaimer } from "@/components/global-disclaimer";
import { IndustrySelector } from "@/components/industry-selector";
import { RegconGauge } from "@/components/gauge/regcon-gauge";
import { RegconBadge } from "@/components/regcon-badge";
import { RegconLadder } from "@/components/regcon-ladder";
import { RiskSparkline } from "@/components/risk-sparkline";
import { TriggerFeed } from "@/components/trigger-feed";
import { ScoreBreakdown } from "@/components/score-breakdown";
import { RunAgentButton } from "@/components/agent/run-agent-button";
import { AgentBrief } from "@/components/agent/agent-brief";

function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface/50 p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function RiskIndexScreen({
  industries,
  risks,
  initial = "telecom",
}: {
  industries: Industry[];
  risks: IndustryRisk[];
  initial?: IndustryCode;
}) {
  const [selected, setSelected] = useState<IndustryCode>(initial);
  const [agent, setAgent] = useState<AgentResponse | null>(null);

  const byCode = useMemo(
    () => new Map(risks.map((r) => [r.industry, r])),
    [risks],
  );
  const risk = byCode.get(selected) ?? risks[0];
  const industry =
    industries.find((i) => i.code === selected)?.name_en ?? selected;

  // Agent result applies only to the industry it was run for.
  const agentActive = agent?.brief.industry === selected;
  const delta = agentActive ? agent!.brief.impact.delta : 0;
  const displayScore = Math.max(0, Math.min(100, risk.score + delta));
  const displayRegcon = regconFromScore(displayScore);
  const color = REGCON_HEX[displayRegcon];
  const asOf = risk.triggers[0]?.date;

  // Trend = movement across the recent model readings (oldest → newest).
  const spark = risk.sparkline;
  const trendStart = spark[0];
  const trendNow = spark[spark.length - 1];
  const trendDelta = trendNow - trendStart;
  const trendColor =
    trendDelta > 0 ? REGCON_HEX[2] : trendDelta < 0 ? REGCON_HEX[5] : "var(--muted)";

  function selectIndustry(code: IndustryCode) {
    setSelected(code);
    setAgent(null); // previous brief no longer applies
  }

  return (
    <div className="space-y-6">
      <GlobalDisclaimer asOf={asOf} />

      <header className="space-y-2">
        <p className="tabular text-xs uppercase tracking-[0.2em] text-accent">
          REGCON · Regulatory Risk Index
        </p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          How hot is regulation, right now?
        </h1>
        <p className="max-w-2xl text-sm text-muted">
          A single DEFCON-style gauge of legislative and regulatory risk per
          Korean industry — sourced from primary Korean filings and re-scored
          live by an AI agent.
        </p>
      </header>

      <IndustrySelector
        industries={industries}
        selected={selected}
        onSelect={selectIndustry}
      />

      <div className="grid gap-5 lg:grid-cols-5">
        {/* Hero gauge */}
        <Panel className="flex flex-col lg:col-span-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">
                Industry
              </p>
              <h2 className="text-lg font-semibold text-text">{industry}</h2>
            </div>
            <div className="flex flex-col items-end gap-1">
              <RegconBadge regcon={displayRegcon} />
              {agentActive && delta !== 0 && (
                <span className="tabular text-[11px] text-accent">
                  agent {delta > 0 ? "+" : ""}
                  {delta} · was {risk.score}
                </span>
              )}
            </div>
          </div>

          <RegconGauge
            score={displayScore}
            regcon={displayRegcon}
            className="my-2"
          />

          <p className="mb-4 text-center text-sm text-muted">
            {REGCON_STATUS[displayRegcon]}
          </p>

          <div className="mb-4">
            <RunAgentButton industry={selected} onResult={setAgent} />
          </div>

          <div className="space-y-2 border-t border-border pt-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted">
                  Risk-score trend
                </p>
                <p className="text-[11px] text-muted">
                  last {spark.length} model readings · needs verification
                </p>
              </div>
              <div className="text-right">
                <span
                  className="tabular inline-flex items-center gap-0.5 text-sm font-semibold"
                  style={{ color: trendColor }}
                >
                  {trendDelta > 0 ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : trendDelta < 0 ? (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  ) : (
                    <Minus className="h-3.5 w-3.5" />
                  )}
                  {trendDelta > 0 ? "+" : ""}
                  {trendDelta} pts
                </span>
                <p className="tabular text-[11px] text-muted">
                  {trendStart} → {trendNow} / 100
                </p>
              </div>
            </div>
            <RiskSparkline data={spark} color={color} />
            <div className="tabular flex justify-between text-[10px] text-muted">
              <span>~8 periods ago</span>
              <span>now</span>
            </div>
          </div>

          {/* Fills the lower half + explains the scale, balancing the right column */}
          <div className="mt-auto border-t border-border pt-4">
            <RegconLadder current={displayRegcon} />
          </div>
        </Panel>

        {/* Agent brief + explanations */}
        <div className="space-y-5 lg:col-span-2">
          <AnimatePresence>
            {agentActive && agent && (
              <motion.div
                key="brief"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <AgentBrief data={agent} />
              </motion.div>
            )}
          </AnimatePresence>

          <Panel>
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <TriggerFeed triggers={risk.triggers} />
              </motion.div>
            </AnimatePresence>
          </Panel>
          <Panel>
            <ScoreBreakdown
              items={risk.breakdown}
              total={risk.score}
              color={color}
            />
          </Panel>
        </div>
      </div>
    </div>
  );
}
