"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VehicleCard from "./VehicleCard";

const filters = [
  { id: "all", label: "All vehicles" },
  { id: "small", label: "Couples (2–4)" },
  { id: "family", label: "Family (5–8)" },
  { id: "group", label: "Groups (9+)" },
];

export default function FleetGrid({ vehicles }) {
  const [active, setActive] = useState("all");
  const list = active === "all" ? vehicles : vehicles.filter((v) => v.group === active);

  return (
    <div>
      <div role="tablist" aria-label="Filter by group size" className="no-scrollbar -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:justify-center sm:px-0">
        {filters.map((f) => (
          <button
            key={f.id}
            role="tab"
            type="button"
            aria-selected={active === f.id}
            onClick={() => setActive(f.id)}
            className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${active === f.id ? "border-[#14284b] bg-[#14284b] text-white" : "border-line bg-white text-ink hover:border-ink"}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((v) => (
            <motion.div key={v.slug} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35 }}>
              <VehicleCard vehicle={v} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
