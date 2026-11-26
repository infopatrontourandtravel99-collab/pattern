import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { isAdmin } from "@/lib/auth";
import { adminSections } from "@/lib/adminSchema";
import { siteConfig } from "@/config/site";
import { getPhotos } from "@/lib/content";
import AdminNav from "@/components/admin/AdminNav";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata = { title: "Admin panel", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const footLink = "flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white";

export default async function PanelLayout({ children }) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { logo } = await getPhotos();
  const items = [
    { key: "dashboard", title: "Dashboard", href: "/admin" },
    ...Object.entries(adminSections).map(([key, s]) => ({ key, title: s.title, href: `/admin/${key}` })),
  ];
  return (
    <div className="min-h-screen bg-[#f2f4f8] text-[#1c2a3a] md:flex">
      <aside className="sticky top-0 z-30 flex flex-col bg-[#14284b] md:h-screen md:w-64 md:shrink-0">
        <div className="flex items-center justify-between gap-3 px-4 py-3 md:py-5">
          <Link href="/admin" className="flex min-w-0 items-center gap-3">
            <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-white">
              <Image src={logo} alt="" fill sizes="40px" unoptimized={logo.startsWith("/api/files/")} className="object-contain" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block text-sm font-semibold leading-snug text-white">{siteConfig.logo.text}</span>
              <span className="block text-xs text-[#e7c27d]">Admin panel</span>
            </span>
          </Link>
          <div className="flex shrink-0 gap-1 md:hidden">
            <Link href="/" target="_blank" aria-label="View website" className={footLink}><ExternalLink size={18} /></Link>
            <LogoutButton className={footLink} compact />
          </div>
        </div>
        <AdminNav items={items} />
        <div className="hidden space-y-1 border-t border-white/10 p-3 md:block">
          <Link href="/" target="_blank" className={footLink}><ExternalLink size={18} /> View website</Link>
          <LogoutButton className={`${footLink} w-full`} />
        </div>
      </aside>
      <div className="min-w-0 flex-1 p-4 sm:p-8">{children}</div>
    </div>
  );
}
