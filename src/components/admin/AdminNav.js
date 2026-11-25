"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SectionIcon from "./SectionIcon";

export default function AdminNav({ items }) {
  const pathname = usePathname();
  const activeRef = useRef(null);

  // On phones the menu scrolls sideways; keep the current section in view.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [pathname]);

  return (
    <nav aria-label="Admin" className="no-scrollbar flex gap-1.5 overflow-x-auto px-3 pb-3 md:flex-1 md:flex-col md:overflow-y-auto md:pb-0">
      {items.map(({ key, title, href }) => {
        const active = pathname === href;
        return (
          <Link
            key={key}
            href={href}
            ref={active ? activeRef : null}
            aria-current={active ? "page" : undefined}
            className={`flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-[#e7c27d] ${
              active ? "bg-[#e7c27d] text-[#14284b]" : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            <SectionIcon name={key} size={18} />
            {title}
          </Link>
        );
      })}
    </nav>
  );
}
