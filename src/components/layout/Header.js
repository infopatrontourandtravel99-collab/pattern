"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import EnquiryModal from "@/components/forms/EnquiryModal";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const home = pathname === "/";
  const solid = scrolled || open || !home;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <motion.header
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        "border-b border-line bg-white/95 shadow-sm backdrop-blur"
      }`}
    >
      <div className={`container-x flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-16 sm:h-20"}`}>
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex xl:gap-8">
          {siteConfig.nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-[13px] tracking-wide transition-colors xl:text-sm ${
                "text-ink hover:text-gold-dark"
              } ${isActive(n.href) ? "font-semibold" : ""}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="hidden rounded-full bg-[#14284b] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0d1d38] sm:inline-flex"
          >
            Get in Touch
          </button>
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden text-ink`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-ivory lg:hidden">
          <ul className="container-x flex flex-col py-4">
            {siteConfig.nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={`block border-b border-line/60 py-3.5 text-base ${isActive(n.href) ? "font-semibold text-gold-dark" : ""}`}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <button type="button" onClick={() => { setOpen(false); setFormOpen(true); }} className="inline-flex w-full justify-center rounded-full bg-[#14284b] py-3 text-sm font-medium text-white">
                Get in Touch
              </button>
            </li>
          </ul>
        </nav>
      )}
      <EnquiryModal open={formOpen} onClose={() => setFormOpen(false)} />
    </motion.header>
  );
}
