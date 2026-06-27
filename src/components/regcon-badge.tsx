import type { Regcon } from "@/types";
import { REGCON_HEX, regconText, REGCON_STATUS } from "@/lib/regcon";
import { cn } from "@/lib/utils";

export function RegconBadge({
  regcon,
  withStatus = false,
  className,
}: {
  regcon: Regcon;
  withStatus?: boolean;
  className?: string;
}) {
  const color = REGCON_HEX[regcon];
  return (
    <div className={cn("space-y-1.5", className)}>
      <span
        className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium"
        style={{
          color,
          borderColor: `color-mix(in srgb, ${color} 45%, transparent)`,
          backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
        }}
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
        />
        <span className="tabular">{regconText(regcon)}</span>
      </span>
      {withStatus && (
        <p className="text-sm text-muted">{REGCON_STATUS[regcon]}</p>
      )}
    </div>
  );
}
