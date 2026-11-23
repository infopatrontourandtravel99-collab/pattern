import Link from "next/link";
import PageHero from "@/components/common/PageHero";
import PackageCard from "@/components/packages/PackageCard";
import FinalCTA from "@/components/common/FinalCTA";

const related = [
  { href: "/kashmir-tour-packages", label: "All Kashmir Tour Packages" },
  { href: "/kashmir-honeymoon-packages", label: "Kashmir Honeymoon Packages" },
  { href: "/kashmir-family-packages", label: "Kashmir Family Tour Packages" },
  { href: "/kashmir-luxury-packages", label: "Kashmir Luxury Tour Packages" },
];

export default function PackageListPage({ h1, subtitle, image, crumbName, path, items, intro, currentHref }) {
  return (
    <>
      <PageHero title={h1} subtitle={subtitle} image={image} crumbs={[{ name: crumbName, href: path }]} />
      <section className="py-10 sm:py-14">
        <div className="container-x">
          <p className="mx-auto mb-8 max-w-3xl text-center text-base leading-relaxed text-muted">{intro}</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => <PackageCard key={p.slug} pkg={p} index={i} />)}
          </div>
          <nav aria-label="Related package collections" className="mt-16 flex flex-wrap justify-center gap-3">
            {related.filter((r) => r.href !== currentHref).map((r) => (
              <Link key={r.href} href={r.href} className="rounded-full border border-line bg-white px-5 py-2.5 text-sm transition-colors hover:border-gold hover:text-gold-dark">
                {r.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
