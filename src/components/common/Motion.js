"use client";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

// Plays once on mount (use for above-the-fold content).
export function FadeIn({ children, delay = 0, y = 24, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

// Counts "10K+", "4.8", "200+" up from zero when scrolled into view.
export function CountUp({ value }) {
  const match = /^([\d.]+)(.*)$/.exec(value);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const target = match ? parseFloat(match[1]) : 0;
  const decimals = match ? (match[1].split(".")[1] || "").length : 0;
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!match || reduce || !inView) return;
    const controls = animate(0, target, { duration: 1.8, ease: "easeOut", onUpdate: setN });
    return () => controls.stop();
  }, [inView, target, reduce]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return value;
  return <span ref={ref}>{n.toFixed(decimals)}{match[2]}</span>;
}
