import type { PoliticalBloc, Regulation } from "@/types";

// National Assembly vote thresholds (factual, constitutional/procedural).
export const ASSEMBLY = {
  total: 300,
  majority: 151, // simple majority (> half)
  fastTrack: 180, // 신속처리안건 / filibuster-resistant (3/5)
  amendment: 200, // constitutional amendment (2/3)
} as const;

export interface MajorityRead {
  bloc: PoliticalBloc;
  share: number; // 0–100
  clearsMajority: boolean;
  clearsFastTrack: boolean;
  clearsAmendment: boolean;
}

export function readMajority(blocs: PoliticalBloc[]): MajorityRead {
  const bloc = [...blocs].sort((a, b) => b.power - a.power)[0];
  return {
    bloc,
    share: (bloc.power / ASSEMBLY.total) * 100,
    clearsMajority: bloc.power >= ASSEMBLY.majority,
    clearsFastTrack: bloc.power >= ASSEMBLY.fastTrack,
    clearsAmendment: bloc.power >= ASSEMBLY.amendment,
  };
}

export type BillDirection = "easing" | "restrictive" | "mixed";

// Classify a bill's regulatory direction from its English summary.
// Structural only — says nothing about any party's position.
export function billDirection(reg: Regulation): BillDirection {
  const s = `${reg.summary_en} ${reg.title_en}`.toLowerCase();
  const easing = /\b(eas|loosen|relax|lift|raise the cap|abolish|deregulat|liberaliz|remove the)/.test(s);
  const restrictive =
    /\b(tighten|strengthen|safeguard|registration|register|mandat|require|prohibit|restrict|impose)/.test(s);
  if (easing && !restrictive) return "easing";
  if (restrictive && !easing) return "restrictive";
  if (easing && restrictive) return "mixed";
  return "mixed";
}

export interface OutlookRead {
  label: string;
  tone: "favorable" | "uncertain" | "passable";
  color: string;
  rationale_en: string;
}

// Structural passage outlook given a unified majority bloc. Interpretation,
// not a prediction of any member's vote — always carries needs_verification.
export function billOutlook(dir: BillDirection, m: MajorityRead): OutlookRead {
  if (dir === "restrictive") {
    return {
      label: "Passable on bloc lines",
      tone: "passable",
      color: "#E67E22",
      rationale_en: m.clearsMajority
        ? `A restrictive measure can clear the floor on the ${m.bloc.power}-seat bloc's votes alone — no cross-party support required.`
        : "No single bloc holds a majority, so passage needs negotiated support.",
    };
  }
  if (dir === "easing") {
    return {
      label: "Uncertain",
      tone: "uncertain",
      color: "#F1C40F",
      rationale_en:
        "Liberalizing a foreign-ownership cap typically needs cross-party economic consensus; a one-bloc majority does not by itself guarantee passage.",
    };
  }
  return {
    label: "Uncertain",
    tone: "uncertain",
    color: "#F1C40F",
    rationale_en:
      "Mixed effects — passage depends on which provisions dominate in committee, which is not yet settled.",
  };
}
