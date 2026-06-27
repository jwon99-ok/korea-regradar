import { Info } from "lucide-react";

export function GlobalDisclaimer({ asOf }: { asOf?: string }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-border bg-surface/60 px-3 py-2 text-xs text-muted">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
      <p>
        <span className="text-text">Not legal advice.</span> Analytical
        interpretation of public Korean sources, translated to English.
        {asOf ? (
          <>
            {" "}
            Data as-of <span className="tabular">{asOf}</span>.
          </>
        ) : null}{" "}
        Each card links its primary source.
      </p>
    </div>
  );
}
