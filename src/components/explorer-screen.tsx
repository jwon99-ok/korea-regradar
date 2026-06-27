"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { FdiLimit, Industry, IndustryCode, Regulation } from "@/types";
import { GlobalDisclaimer } from "@/components/global-disclaimer";
import { OwnershipSignalLight } from "@/components/ownership-signal-light";
import { RegulationCard } from "@/components/regulation-card";
import {
  IndustryFilter,
  RegTypeChips,
  SearchBar,
  type IndustryFilterValue,
  type RegTypeFilterValue,
} from "@/components/explorer-filters";

export function ExplorerScreen({
  industries,
  fdiLimits,
  regulations,
}: {
  industries: Industry[];
  fdiLimits: FdiLimit[];
  regulations: Regulation[];
}) {
  const [industry, setIndustry] = useState<IndustryFilterValue>("all");
  const [regType, setRegType] = useState<RegTypeFilterValue>("all");
  const [query, setQuery] = useState("");

  const nameOf = useMemo(
    () => new Map(industries.map((i) => [i.code, i.name_en])),
    [industries],
  );
  const fdiOf = useMemo(
    () => new Map(fdiLimits.map((f) => [f.industry, f])),
    [fdiLimits],
  );

  // Signal lights: all 12, or just the selected industry (larger).
  const signals =
    industry === "all"
      ? fdiLimits
      : fdiLimits.filter((f) => f.industry === industry);

  // Regulation cards: filter by industry, type, and free-text search.
  const q = query.trim().toLowerCase();
  const cards = regulations.filter((r) => {
    if (industry !== "all" && !r.industries.includes(industry)) return false;
    if (regType !== "all" && r.reg_type !== regType) return false;
    if (q) {
      const hay =
        `${r.title_en} ${r.summary_en} ${r.title_ko} ${r.source_ko}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const filterKey = `${industry}-${regType}-${q}`;

  return (
    <div className="space-y-6">
      <GlobalDisclaimer />

      <header className="space-y-2">
        <p className="tabular text-xs uppercase tracking-[0.2em] text-accent">
          Foreign Investment Explorer
        </p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          What can a foreign company actually own here?
        </h1>
        <p className="max-w-2xl text-sm text-muted">
          Industry-by-industry foreign-ownership limits as a traffic-light
          signal — green, capped, or restricted — each backed by its Korean
          legal basis.
        </p>
      </header>

      <IndustryFilter
        industries={industries}
        value={industry}
        onChange={setIndustry}
      />

      {/* Ownership signal lights — the killer feature */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-text">
          Foreign-ownership limit{industry === "all" ? "s · at a glance" : ""}
        </h2>
        <motion.div
          key={`sig-${industry}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={
            industry === "all"
              ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "grid gap-4 md:grid-cols-2"
          }
        >
          {signals.map((f) => (
            <OwnershipSignalLight
              key={f.industry}
              fdi={f}
              industryName={nameOf.get(f.industry) ?? f.industry}
              size={industry === "all" ? "md" : "lg"}
            />
          ))}
        </motion.div>
      </section>

      {/* Regulations & pending bills */}
      <section className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-medium text-text">
            Regulations &amp; pending bills
            <span className="tabular ml-2 text-xs text-muted">
              {cards.length}
            </span>
          </h2>
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <RegTypeChips value={regType} onChange={setRegType} />

        <motion.div
          key={filterKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {cards.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {cards.map((r) => (
                <RegulationCard
                  key={r.id}
                  reg={r}
                  fdi={fdiOf.get(r.industries[0] as IndustryCode)}
                />
              ))}
            </div>
          ) : (
            <div className="grid place-items-center rounded-xl border border-dashed border-border bg-surface/40 py-12 text-center">
              <p className="text-sm text-muted">
                No filings match these filters.
                {industry !== "all" && (
                  <>
                    {" "}
                    <span className="text-text">
                      {nameOf.get(industry as IndustryCode)}
                    </span>{" "}
                    has no tracked bills right now — see its ownership signal
                    above.
                  </>
                )}
              </p>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
