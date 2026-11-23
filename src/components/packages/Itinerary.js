"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Collapsible day-by-day itinerary. First day open by default.
export default function Itinerary({ days }) {
  const [open, setOpen] = useState(new Set([0]));
  const allOpen = open.size === days.length;

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(days.map((_, i) => i)))}
          className="text-sm font-medium text-orange-600 hover:underline"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <ol className="space-y-3">
        {days.map((d, i) => {
          const isOpen = open.has(i);
          return (
            <li key={d.day} className={`overflow-hidden rounded-2xl border bg-white transition-shadow ${isOpen ? "border-orange-200 shadow-md" : "border-line"}`}>
              <h3>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`day-${i}`}
                  className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5"
                >
                  <span className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl text-white transition-colors ${isOpen ? "bg-orange-500" : "bg-[#14284b]"}`}>
                    <span className="text-[9px] font-medium uppercase leading-none tracking-wider opacity-80">Day</span>
                    <span className="text-base font-bold leading-none">{d.day.replace(/\D/g, "")}</span>
                  </span>
                  <span className="min-w-0 flex-1 text-[15px] font-semibold sm:text-base">{d.title}</span>
                  <ChevronDown size={20} className={`shrink-0 text-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
              </h3>
              <div id={`day-${i}`} className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-4 pb-5 pl-[4.75rem] text-sm leading-relaxed text-muted sm:pl-[5.25rem] sm:pr-5">{d.text}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
