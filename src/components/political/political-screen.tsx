import type { Political, Regulation } from "@/types";
import { GlobalDisclaimer } from "@/components/global-disclaimer";
import { Hemicycle } from "@/components/political/hemicycle";
import { BlocPowerBars } from "@/components/political/bloc-power-bars";
import { RegulationOutlook } from "@/components/political/regulation-outlook";

export function PoliticalScreen({
  political,
  pendingBills,
}: {
  political: Political;
  pendingBills: Regulation[];
}) {
  return (
    <div className="space-y-6">
      <GlobalDisclaimer />

      <header className="space-y-2">
        <p className="tabular text-xs uppercase tracking-[0.2em] text-accent">
          Political Landscape
        </p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Who can change the rules — and how easily?
        </h1>
        <p className="max-w-2xl text-sm text-muted">
          The 22nd National Assembly&apos;s 300-seat composition, read as a
          regulatory-risk signal: which bloc controls the floor, and what that
          means for the foreign-ownership bills now in committee.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-5">
        {/* Hemicycle */}
        <div className="rounded-xl border border-border bg-surface/50 p-5 lg:col-span-3">
          <div className="mb-2">
            <p className="text-xs uppercase tracking-widest text-muted">Assembly</p>
            <h2 className="text-lg font-semibold text-text">
              {political.assembly_en}
            </h2>
          </div>
          <Hemicycle seats={political.seats} />
          <div className="mt-4 border-t border-border pt-4">
            <BlocPowerBars blocs={political.blocs} />
          </div>
        </div>

        {/* Regulation outlook */}
        <div className="rounded-xl border border-accent/40 bg-accent/[0.06] p-5 lg:col-span-2">
          <RegulationOutlook
            blocs={political.blocs}
            pendingBills={pendingBills}
          />
        </div>
      </div>

      {/* Source / provenance */}
      <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface/40 p-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl">{political.disclaimer_en}</p>
        <a
          href={political.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 text-accent hover:underline"
        >
          Open Assembly API
        </a>
      </div>
    </div>
  );
}
