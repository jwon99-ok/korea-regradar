import { BadgeCheck, ShieldAlert } from "lucide-react";

// Every data card carries a provenance badge (BUILD §0 fact labeling).
export function VerificationBadge({
  needsVerification,
}: {
  needsVerification: boolean;
}) {
  if (needsVerification) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-regcon-3/40 bg-regcon-3/10 px-2 py-0.5 text-[11px] font-medium text-regcon-3">
        <ShieldAlert className="h-3 w-3" />
        Needs verification
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-regcon-5/40 bg-regcon-5/10 px-2 py-0.5 text-[11px] font-medium text-regcon-5">
      <BadgeCheck className="h-3 w-3" />
      Verified source
    </span>
  );
}
