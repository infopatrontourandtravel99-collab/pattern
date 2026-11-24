"use client";
import { motion, useReducedMotion } from "framer-motion";

const offsets = { up: { y: 32 }, left: { x: -40 }, right: { x: 40 }, scale: { scale: 0.94 }, none: {} };

export default function Reveal({ children, delay = 0, className = "", from = "up" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, ...offsets[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -70px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
