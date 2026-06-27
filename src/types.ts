// ── Korea RegRadar — shared data types (DATA.md schema) ─────────────
// Static JSON seed in src/data/*.json. No backend; the front end imports
// these directly. Every record carries source_url + needs_verification.

export type IndustryCode =
  | "telecom"
  | "broadcasting"
  | "aviation"
  | "news_media"
  | "power"
  | "defense"
  | "fintech"
  | "ecommerce"
  | "gaming"
  | "biotech"
  | "semiconductor"
  | "logistics";

export interface Industry {
  code: IndustryCode;
  name_en: string;
}

// ── Foreign-ownership limits (the traffic-light killer feature) ─────
export type FdiRegime = "open_100" | "capped" | "prohibited";

export interface FdiLimit {
  industry: IndustryCode;
  regime: FdiRegime; // open_100 = green · capped = yellow · prohibited = red
  cap_pct: number; // max foreign ownership (%)
  note_en: string;
  source_ko: string; // Korean source phrasing, shown alongside the English
  legal_basis: string;
  source_url: string;
  as_of: string;
  needs_verification: boolean;
}

// ── Regulations / pending bills ─────────────────────────────────────
export type RegType = "law" | "bill" | "decree" | "ministerial" | "restriction";
export type RegStatus = "pending" | "passed" | "in_force" | "withdrawn";

export interface Regulation {
  id: string;
  title_en: string;
  title_ko: string; // Korean source title
  summary_en: string;
  source_ko: string; // Korean source quote
  reg_type: RegType;
  status: RegStatus;
  stage_en: string;
  industries: IndustryCode[];
  introduced_date: string;
  source_url: string;
  needs_verification: boolean;
}

// ── Regulatory Risk Index (REGCON gauge) ────────────────────────────
// regcon 5→1: 5 Stable · 4 Watch · 3 Caution · 2 Elevated · 1 Critical
export type Regcon = 1 | 2 | 3 | 4 | 5;

export interface RiskBreakdownItem {
  label_en: string;
  value: number; // contribution points; the four sum to `score`
}

export interface RiskTrigger {
  title_en: string;
  source_ko: string;
  date: string;
  source_url: string;
  needs_verification: boolean; // true when the link is a publisher home page, not a verified article
}

export interface IndustryRisk {
  industry: IndustryCode;
  score: number; // 0–100, pre-computed static value
  regcon: Regcon;
  sparkline: number[]; // recent trend, oldest → newest
  breakdown: RiskBreakdownItem[];
  triggers: RiskTrigger[];
  needs_verification: boolean; // scores are an analytical model, not fact
}

// ── Political landscape (stretch) ───────────────────────────────────
export interface PoliticalBloc {
  name_en: string;
  power: number;
  color: string;
  needs_verification: boolean;
}

export interface PoliticalSeat {
  party_en: string;
  seats: number;
  color: string;
}

export interface Political {
  assembly_en: string;
  as_of: string;
  blocs: PoliticalBloc[];
  seats: PoliticalSeat[];
  disclaimer_en: string;
  source_url: string;
  needs_verification: boolean;
}

// ── AI compliance agent (Exa + OpenAI) ──────────────────────────────
export type RiskComponent =
  | "Pending bills"
  | "Ownership-cap changes"
  | "Political events"
  | "Media sentiment";

export interface AgentSource {
  title: string;
  url: string;
}

export interface AgentBrief {
  industry: IndustryCode;
  headline_en: string;
  summary_en: string[]; // ~3 lines
  impact: {
    risk_component: RiskComponent;
    direction: "up" | "down" | "flat";
    delta: number; // suggested score change, -8..8
    rationale_en: string;
  };
  korean_quote: {
    text_ko: string;
    text_en?: string; // faithful English translation of the quote itself
    source_title: string;
    source_url: string;
  };
  sources: AgentSource[];
}

export interface AgentResponse {
  brief: AgentBrief;
  meta: {
    source: "live" | "cache" | "fallback";
    elapsed_ms: number;
    model?: string;
    note?: string;
  };
}

// REGCON level metadata (labels + token colors) for the gauge/badges.
export const REGCON_META: Record<
  Regcon,
  { label_en: string; token: string }
> = {
  5: { label_en: "Stable", token: "var(--regcon-5)" },
  4: { label_en: "Watch", token: "var(--regcon-4)" },
  3: { label_en: "Caution", token: "var(--regcon-3)" },
  2: { label_en: "Elevated", token: "var(--regcon-2)" },
  1: { label_en: "Critical", token: "var(--regcon-1)" },
};
