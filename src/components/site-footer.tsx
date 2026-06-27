import { Radar } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border bg-bg/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-7 text-xs text-muted sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-surface-2 ring-1 ring-border">
              <Radar className="h-3.5 w-3.5 text-accent" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-text">
              Korea<span className="text-kr">Reg</span>Radar
            </span>
          </div>
          <p className="max-w-md">
            Regulatory intelligence for foreign founders — Korean filings,
            ownership limits, and the political landscape, decoded into English.
          </p>
        </div>

        <div className="space-y-1 sm:text-right">
          <p className="tabular text-text">© 2026 Juwon Ock · Korea RegRadar</p>
          <p className="max-w-md">
            Not legal advice — analytical interpretation of public Korean
            sources. Verify against primary sources before relying.
          </p>
        </div>
      </div>
    </footer>
  );
}
