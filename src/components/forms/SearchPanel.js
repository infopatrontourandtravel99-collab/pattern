"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, CalendarDays, Users, Search, Map, BedDouble, Compass } from "lucide-react";

// groups: [{ id, label, options: [string] }]
export default function SearchPanel({ groups }) {
  const router = useRouter();
  const [active, setActive] = useState(groups[0].id);
  const group = groups.find((g) => g.id === active);
  const icons = { destinations: Map, packages: BedDouble, experiences: Compass };

  function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    for (const k of ["destination", "date", "travelers"]) if (f.get(k)) params.set(k, f.get(k));
    router.push(`/contact?${params.toString()}#enquiry`);
  }

  const box = "flex items-center gap-2.5 rounded-xl border border-[#dfe3ea] bg-white px-3 py-2 sm:gap-3 sm:px-4 sm:py-2.5";
  const ctl = "w-full bg-transparent text-sm text-[#1c2a3a] focus:outline-none";

  return (
    <div className="mx-auto w-full max-w-4xl rounded-3xl bg-white p-3 text-left shadow-[0_18px_50px_-14px_rgba(20,40,75,0.35)] sm:p-5">
      <div role="tablist" aria-label="Search type" className="no-scrollbar mb-3 flex gap-0.5 overflow-x-auto border-b border-[#e8ebf0] sm:mb-4 sm:gap-1">
        {groups.map((g) => {
          const Icon = icons[g.id] || Map;
          const on = g.id === active;
          return (
            <button
              key={g.id}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => setActive(g.id)}
              className={`-mb-px inline-flex shrink-0 items-center gap-1.5 border-b-2 px-2.5 pb-2 pt-1 text-[13px] font-medium sm:gap-2 sm:px-3 sm:pb-2.5 sm:text-sm transition-colors ${on ? "border-[#14284b] text-[#14284b]" : "border-transparent text-muted hover:text-[#14284b]"}`}
            >
              <Icon size={16} /> {g.label}
            </button>
          );
        })}
      </div>
      <form onSubmit={onSubmit} aria-label="Search Kashmir trips" className="grid grid-cols-2 gap-2.5 md:grid-cols-[1.3fr_1fr_1fr_auto] md:gap-3">
        <label className={`${box} col-span-2 md:col-span-1`}>
          <MapPin size={18} className="shrink-0 text-[#14284b]" />
          <span className="w-full">
            <span className="block text-[10px] uppercase tracking-widest text-muted">{group.label.replace(/s$/, "")}</span>
            <select key={group.id} name="destination" className={ctl} defaultValue="">
              <option value="">{group.placeholder}</option>
              {group.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </span>
        </label>
        <label className={box}>
          <CalendarDays size={18} className="shrink-0 text-[#14284b]" />
          <span className="w-full">
            <span className="block text-[10px] uppercase tracking-widest text-muted">Travel date</span>
            <input type="date" name="date" className={ctl} />
          </span>
        </label>
        <label className={box}>
          <Users size={18} className="shrink-0 text-[#14284b]" />
          <span className="w-full">
            <span className="block text-[10px] uppercase tracking-widest text-muted">Travelers</span>
            <input type="number" name="travelers" min="1" max="50" defaultValue="2" className={ctl} />
          </span>
        </label>
        <button type="submit" className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#14284b] px-8 py-3 md:col-span-1 md:py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0d1d38]">
          <Search size={16} /> Explore Now
        </button>
      </form>
    </div>
  );
}
