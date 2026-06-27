"use client";

import { motion } from "framer-motion";

// Inline SVG sparkline (oldest → newest). Auto-scales to the data range so the
// actual movement is visible instead of a flat line floating over a filled block.
export function RiskSparkline({
  data,
  color,
}: {
  data: number[];
  color: string;
}) {
  const W = 100;
  const H = 36;
  const n = data.length;
  if (n < 2) return <div className="h-16 w-full" />;

  // Scale Y to the series' own range (with padding) — not a fixed 0–100 axis.
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pad = Math.max((max - min) * 0.3, 3);
  const lo = min - pad;
  const hi = max + pad;

  const x = (i: number) => (i / (n - 1)) * W;
  const y = (v: number) => H - ((v - lo) / (hi - lo)) * H;

  const pts = data.map((v, i) => `${x(i).toFixed(2)},${y(v).toFixed(2)}`);
  const line = `M ${pts.join(" L ")}`;
  const area = `M 0,${H} L ${pts.join(" L ")} L ${W},${H} Z`;
  const gid = `spark-${color.replace(/[^a-z0-9]/gi, "")}`;

  // Endpoint markers as HTML overlays — circles stay round (the stretched SVG
  // would squash them into ellipses).
  const firstTop = (y(data[0]) / H) * 100;
  const lastTop = (y(data[n - 1]) / H) * 100;

  return (
    <div className="relative h-16 w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.22} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Per-period guide ticks — make the "8 readings" legible */}
        {data.map((_, i) => (
          <line
            key={i}
            x1={x(i)}
            x2={x(i)}
            y1={0}
            y2={H}
            stroke="var(--border)"
            strokeWidth={0.5}
            vectorEffect="non-scaling-stroke"
            opacity={0.5}
          />
        ))}

        <motion.path
          key={`area-${gid}-${data.join()}`}
          d={area}
          fill={`url(#${gid})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.path
          key={`line-${gid}-${data.join()}`}
          d={line}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      {/* Start (muted) marker */}
      <span
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted"
        style={{ left: "0%", top: `${firstTop}%` }}
      />
      {/* Current (bright, glowing) marker */}
      <span
        className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: "100%",
          top: `${lastTop}%`,
          backgroundColor: color,
          boxShadow: `0 0 0 3px color-mix(in srgb, ${color} 22%, transparent)`,
        }}
      />
    </div>
  );
}
