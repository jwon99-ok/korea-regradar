"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Industry, IndustryCode, IndustryRisk } from "@/types";
import { REGCON_HEX, REGCON_STATUS } from "@/lib/regcon";
import { cn } from "@/lib/utils";
import { GlobalDisclaimer } from "@/components/global-disclaimer";
import { IndustrySelector } from "@/components/industry-selector";
import { RegconGauge } from "@/components/gauge/regcon-gauge";
import { RegconBadge } from "@/components/regcon-badge";
import { RiskSparkline } from "@/components/risk-sparkline";
import { TriggerFeed } from "@/components/trigger-feed";
import { ScoreBreakdown } from "@/components/score-breakdown";

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

  const byCode = useMemo(
    () => new Map(risks.map((r) => [r.industry, r])),
    [risks],
  );
  const risk = byCode.get(selected) ?? risks[0];
  const industry =
    industries.find((i) => i.code === selected)?.name_en ?? selected;
  const color = REGCON_HEX[risk.regcon];
  const asOf = risk.triggers[0]?.date;

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
          Korean industry — sourced from primary Korean filings.
        </p>
      </header>

      <IndustrySelector
        industries={industries}
        selected={selected}
        onSelect={setSelected}
      />

      <div className="grid gap-5 lg:grid-cols-5">
        {/* Hero gauge */}
        <Panel className="lg:col-span-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">
                Industry
              </p>
              <h2 className="text-lg font-semibold text-text">{industry}</h2>
            </div>
            <RegconBadge regcon={risk.regcon} />
          </div>

          <RegconGauge
            score={risk.score}
            regcon={risk.regcon}
            className="my-2"
          />

          <p className="mb-4 text-center text-sm text-muted">
            {REGCON_STATUS[risk.regcon]}
          </p>

          <div className="space-y-1.5 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-muted">
                8-period trend
              </span>
              <span className="tabular text-xs text-muted">
                model estimate · needs verification
              </span>
            </div>
            <RiskSparkline data={risk.sparkline} color={color} />
          </div>
        </Panel>

        {/* Explanations */}
        <div className="space-y-5 lg:col-span-2">
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
