"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Soft fade between pages (skipped in the admin panel so it appears immediately).
export default function Template({ children }) {
  if (usePathname()?.startsWith("/admin")) return children;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
