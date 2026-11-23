import SectionHeading from "@/components/common/SectionHeading";
import PackageCard from "@/components/packages/PackageCard";
import Button from "@/components/common/Button";
import { packages } from "@/data/packages";

export default function PopularPackages() {
  return (
    <section className="py-10 sm:py-14">
      <div className="container-x">
        <SectionHeading eyebrow="Tour packages" title="Popular Kashmir Tour Packages"  />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p, i) => <PackageCard key={p.slug} pkg={p} index={i} />)}
        </div>
        <div className="mt-8 text-center">
          <Button href="/kashmir-tour-packages" variant="outline">View All Kashmir Holiday Packages</Button>
        </div>
      </div>
    </section>
  );
}
