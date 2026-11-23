import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Logo({ light = false }) {
  const { src, text, sub } = siteConfig.logo;
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
      <span className={`relative block h-10 w-10 shrink-0 sm:h-12 sm:w-12 overflow-hidden ${light ? "rounded-xl bg-white" : ""}`}>
        <Image src={src} alt={`${siteConfig.name} logo`} fill sizes="48px" priority className="object-contain" />
      </span>
      <span className="leading-tight">
        <span className={`block font-serif text-base font-bold sm:text-xl ${light ? "text-white" : "text-ink"}`}>{text}</span>
        <span className={`hidden text-[10px] uppercase tracking-[0.22em] sm:block ${light ? "text-white/70" : "text-muted"}`}>{sub}</span>
      </span>
    </Link>
  );
}
