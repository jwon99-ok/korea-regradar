// One-off: pre-warm src/data/agent_cache.json by calling the live agent
// route (Exa + OpenAI) once per industry. Run with the dev server up:
//   pnpm dev &  then  node scripts/build-agent-cache.mjs
// Re-run anytime to refresh the demo fallback.

import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = path.resolve("src/data/agent_cache.json");

const INDUSTRIES = [
  "telecom",
  "broadcasting",
  "aviation",
  "news_media",
  "power",
  "defense",
  "fintech",
  "ecommerce",
  "gaming",
  "biotech",
  "semiconductor",
  "logistics",
];

const existing = fs.existsSync(OUT)
  ? JSON.parse(fs.readFileSync(OUT, "utf8"))
  : {};
const cache = { ...existing };

for (const industry of INDUSTRIES) {
  process.stdout.write(`• ${industry} … `);
  try {
    const res = await fetch(`${BASE}/api/agent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ industry, forceLive: true }),
    });
    const json = await res.json();
    if (!res.ok) {
      console.log(`SKIP (${json.error || res.status}) — keeping existing`);
      continue;
    }
    cache[industry] = json.brief;
    console.log(
      `ok · ${json.meta?.elapsed_ms}ms · "${json.brief.headline_en}"`,
    );
  } catch (e) {
    console.log(`SKIP (${e.message}) — keeping existing`);
  }
}

fs.writeFileSync(OUT, JSON.stringify(cache, null, 2) + "\n");
console.log(
  `\nWrote ${Object.keys(cache).length}/${INDUSTRIES.length} industries → ${OUT}`,
);
