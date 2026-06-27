import type { Political, Regulation } from "@/types";
import politicalData from "@/data/political.json";
import regulationsData from "@/data/regulations.json";
import { PoliticalScreen } from "@/components/political/political-screen";

const political = politicalData as Political;
const regulations = regulationsData as Regulation[];

// Bills still moving through the Assembly — the ones the majority math acts on.
const pendingBills = regulations.filter(
  (r) => r.reg_type === "bill" && r.status === "pending",
);

export default function PoliticalPage() {
  return <PoliticalScreen political={political} pendingBills={pendingBills} />;
}
