import { notFound } from "next/navigation";
import { adminSections } from "@/lib/adminSchema";
import { getContent } from "@/lib/content";
import SectionEditor from "@/components/admin/SectionEditor";

export default async function SectionPage({ params }) {
  const { section } = await params;
  const def = adminSections[section];
  if (!def) notFound();
  const data = await getContent(section);
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-[#14284b]">{def.title}</h1>
      <p className="mt-1 text-sm text-muted">{def.desc}</p>
      <SectionEditor sectionKey={section} fields={def.fields} initial={data} />
    </div>
  );
}
