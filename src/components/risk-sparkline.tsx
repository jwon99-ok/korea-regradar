"use client";

import { motion } from "framer-motion";

// Lightweight inline SVG sparkline (oldest → newest). Crisp on the dark
// OSINT panels and fully controllable vs. a chart lib's container quirks.
export function RiskSparkline({
  data,
  color,
}: {
  data: number[];
  color: string;
}) {
  const W = 100;
  const H = 32;
  const n = data.length;
  if (n < 2) return <div className="h-20 w-full" />;

  const x = (i: number) => (i / (n - 1)) * W;
  const y = (v: number) => H - (v / 100) * H;

  const pts = data.map((v, i) => `${x(i).toFixed(2)},${y(v).toFixed(2)}`);
  const line = `M ${pts.join(" L ")}`;
  const area = `M 0,${H} L ${pts.join(" L ")} L ${W},${H} Z`;
  const last = { x: x(n - 1), y: y(data[n - 1]) };
  const gid = `spark-${color.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <div className="h-20 w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
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
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <circle cx={last.x} cy={last.y} r={2.5} fill={color} />
      </svg>
    </div>
  );
}
