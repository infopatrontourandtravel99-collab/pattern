import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { adminSections } from "@/lib/adminSchema";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata = { title: "Admin panel", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }) {
  if (!(await isAdmin())) redirect("/admin/login");
  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <aside className="border-b border-line bg-white p-4 md:min-h-screen md:w-60 md:border-b-0 md:border-r">
        <Link href="/admin" className="block text-lg font-bold text-[#14284b]">Admin panel</Link>
        <nav className="mt-4 flex gap-2 overflow-x-auto md:flex-col">
          {Object.entries(adminSections).map(([key, s]) => (
            <Link key={key} href={`/admin/${key}`} className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-[#1c2a3a] hover:bg-slate-100">{s.title}</Link>
          ))}
        </nav>
        <div className="mt-4 flex gap-3 text-sm md:flex-col">
          <Link href="/" target="_blank" className="text-muted hover:text-[#14284b]">View website ↗</Link>
          <LogoutButton />
        </div>
      </aside>
      <div className="flex-1 p-4 sm:p-8">{children}</div>
    </div>
  );
}
