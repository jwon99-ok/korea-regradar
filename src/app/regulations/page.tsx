import type { FdiLimit, Industry, Regulation } from "@/types";
import industriesData from "@/data/industries.json";
import fdiData from "@/data/fdi_limits.json";
import regulationsData from "@/data/regulations.json";
import { ExplorerScreen } from "@/components/explorer-screen";

const industries = industriesData as Industry[];
const fdiLimits = fdiData as FdiLimit[];
const regulations = regulationsData as Regulation[];

export default function RegulationsPage() {
  return (
    <ExplorerScreen
      industries={industries}
      fdiLimits={fdiLimits}
      regulations={regulations}
    />
  );
}
