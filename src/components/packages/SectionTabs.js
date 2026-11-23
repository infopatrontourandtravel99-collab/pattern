"use client";
import { useEffect, useState } from "react";

// Sticky in-page tab bar with scroll-spy. tabs: [{ id, label }]
export default function SectionTabs({ tabs }) {
  const [active, setActive] = useState(tabs[0].id);

  useEffect(() => {
    const els = tabs.map((t) => document.getElementById(t.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [tabs]);

  return (
    <div className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur">
      <nav aria-label="Package sections" className="container-x no-scrollbar flex gap-1 overflow-x-auto">
        {tabs.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            aria-current={active === t.id ? "true" : undefined}
            className={`relative shrink-0 px-4 py-3.5 text-sm font-medium transition-colors ${active === t.id ? "text-[#14284b]" : "text-muted hover:text-ink"}`}
          >
            {t.label}
            <span className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-orange-500 transition-opacity ${active === t.id ? "opacity-100" : "opacity-0"}`} />
          </a>
        ))}
      </nav>
    </div>
  );
}
