import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { adminSections } from "@/lib/adminSchema";
import { getContent } from "@/lib/content";
import { getDb } from "@/lib/mongo";
import { siteConfig } from "@/config/site";
import { images } from "@/data/images";
import SectionIcon from "@/components/admin/SectionIcon";

// "8 destinations" for list sections, nothing for single-form sections.
async function countLabel(key, section) {
  const list = section.fields.find((f) => f.type === "list");
  if (!list) return null;
  const n = (await getContent(key))?.[list.name]?.length ?? 0;
  return `${n} ${list.itemName}${n === 1 ? "" : "s"}`;
}

export default async function Dashboard() {
  const [db, sections] = await Promise.all([
    getDb(),
    Promise.all(Object.entries(adminSections).map(async ([key, s]) => ({ key, ...s, count: await countLabel(key, s) }))),
  ]);
  return (
    <div className="mx-auto max-w-4xl">
      <div className="relative isolate overflow-hidden rounded-3xl bg-[#14284b] px-6 py-10 text-white sm:px-10 sm:py-14">
        <Image src={images.hero} alt="" fill priority sizes="(min-width: 768px) 56rem, 100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#14284b] via-[#14284b]/85 to-[#14284b]/20" />
        <h1 className="max-w-md text-2xl font-bold sm:text-3xl">{siteConfig.name}</h1>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/85">Choose a section to edit. Your changes appear on the website after you save.</p>
      </div>
      {!db && (
        <p className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
          Database not connected. Add MONGODB_URI to .env.local and restart the server. Until then you can look around, but saving will not work.
        </p>
      )}
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {sections.map((s) => (
          <li key={s.key}>
            <Link href={`/admin/${s.key}`} className="group flex h-full items-center gap-4 rounded-2xl border border-[#e1e6ee] bg-white p-4 transition hover:border-[#14284b] hover:shadow-md">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eef1f6] text-[#14284b] transition group-hover:bg-[#14284b] group-hover:text-[#e7c27d]">
                <SectionIcon name={s.key} size={22} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-[#14284b]">{s.title}</span>
                <span className="block text-xs leading-relaxed text-[#6b7688]">{s.count || s.desc}</span>
              </span>
              <ChevronRight size={18} className="shrink-0 text-[#9aa5b5]" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
