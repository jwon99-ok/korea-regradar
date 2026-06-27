import { cn } from "@/lib/utils";

export function ScreenStub({
  kicker,
  title,
  blurb,
  className,
}: {
  kicker: string;
  title: string;
  blurb: string;
  className?: string;
}) {
  return (
    <section className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <p className="tabular text-xs uppercase tracking-[0.2em] text-accent">
          {kicker}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm text-muted">{blurb}</p>
      </div>

      <div className="grid h-64 place-items-center rounded-xl border border-dashed border-border bg-surface/40">
        <p className="tabular text-xs uppercase tracking-widest text-muted">
          Module pending build
        </p>
      </div>
    </section>
  );
}
