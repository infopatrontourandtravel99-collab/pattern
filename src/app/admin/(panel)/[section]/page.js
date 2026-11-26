import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { adminSections } from "@/lib/adminSchema";
import { getContent } from "@/lib/content";
import { getDb } from "@/lib/mongo";
import SectionEditor from "@/components/admin/SectionEditor";
import SectionIcon from "@/components/admin/SectionIcon";

export default async function SectionPage({ params }) {
  const { section } = await params;
  const def = adminSections[section];
  if (!def) notFound();
  const [db, saved] = await Promise.all([getDb(), getContent(section)]);
  // Fields added after the last save start with their built-in value.
  const data = { ...def.defaults, ...saved };
  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#14284b] text-[#e7c27d]">
            <SectionIcon name={section} size={22} />
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-[#14284b]">{def.title}</h1>
            <p className="text-sm text-[#6b7688]">{def.desc}</p>
          </div>
        </div>
        <Link href={def.path} target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-[#d5dbe5] bg-white px-4 py-2 text-sm font-medium text-[#14284b] transition hover:border-[#14284b]">
          <ExternalLink size={16} /> View on website
        </Link>
      </div>
      {!db && (
        <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          The website cannot connect to the database. What you see below is the built-in content, and saving or uploading will not work. Fix the connection, then reload this page.
        </p>
      )}
      <SectionEditor key={section} sectionKey={section} fields={def.fields} initial={data} />
    </div>
  );
}
