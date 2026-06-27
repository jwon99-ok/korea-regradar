import type { FdiRegime } from "@/types";

// Foreign-ownership regime → traffic-light color + label + lamp position.
// Colorblind-safe: every use also carries an icon + text label + lamp slot.
export const FDI_META: Record<
  FdiRegime,
  { label: string; token: string; hex: string; lamp: "green" | "yellow" | "red" }
> = {
  open_100: {
    label: "Open",
    token: "var(--regcon-5)",
    hex: "#2ECC71",
    lamp: "green",
  },
  capped: {
    label: "Capped",
    token: "var(--regcon-3)",
    hex: "#F1C40F",
    lamp: "yellow",
  },
  prohibited: {
    label: "Restricted",
    token: "var(--regcon-1)",
    hex: "#E74C3C",
    lamp: "red",
  },
};
