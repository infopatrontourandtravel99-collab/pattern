import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

// items: [{ name, href }] — the last item is the current page.
export default function Breadcrumbs({ items, light = false }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <nav aria-label="Breadcrumb" className={`text-sm ${light ? "text-white/80" : "text-muted"}`}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((it, i) => (
            <li key={it.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={14} aria-hidden />}
              {i === all.length - 1 ? (
                <span aria-current="page" className={light ? "text-white" : "text-ink"}>{it.name}</span>
              ) : (
                <Link href={it.href} className="hover:underline">{it.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
