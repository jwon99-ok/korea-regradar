"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

// Counts from the previous value up to `value` whenever it changes.
export function AnimatedNumber({
  value,
  duration = 1.1,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    const controls = animate(fromRef.current, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    fromRef.current = value;
    return () => controls.stop();
  }, [value, duration]);

  return <span className={className}>{Math.round(display)}</span>;
}
