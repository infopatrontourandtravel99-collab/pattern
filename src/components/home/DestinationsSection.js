import SectionHeading from "@/components/common/SectionHeading";
import { slider4, slide } from "@/lib/slider";
import DestinationCard from "@/components/destinations/DestinationCard";
import Button from "@/components/common/Button";
import { getDestinations } from "@/lib/content";

export default async function DestinationsSection() {
  const destinations = await getDestinations();
  return (
    <section className="py-10 sm:py-14">
      <div className="container-x">
        <SectionHeading eyebrow="Destinations" title="Explore Kashmir Destinations"  />
        <div className={slider4}>
          {destinations.map((d, i) => <DestinationCard key={d.slug} destination={d} index={i} className={slide} />)}
        </div>
        <div className="mt-8 text-center">
          <Button href="/destinations" variant="outline">All Destinations</Button>
        </div>
      </div>
    </section>
  );
}
