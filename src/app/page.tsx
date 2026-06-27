import type { Industry, IndustryRisk } from "@/types";
import industriesData from "@/data/industries.json";
import riskData from "@/data/risk.json";
import { RiskIndexScreen } from "@/components/risk-index-screen";

const industries = industriesData as Industry[];
const risks = riskData as IndustryRisk[];

export default function HomePage() {
  return <RiskIndexScreen industries={industries} risks={risks} />;
}
