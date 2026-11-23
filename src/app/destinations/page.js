import PageHero from "@/components/common/PageHero";
import DestinationCard from "@/components/destinations/DestinationCard";
import FinalCTA from "@/components/common/FinalCTA";
import { destinations } from "@/data/destinations";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kashmir Destinations – Srinagar, Gulmarg, Pahalgam & More",
  description: "Explore Kashmir destinations including Srinagar, Gulmarg, Pahalgam, Sonamarg, Doodhpathri, Gurez, Bangus Valley and Yusmarg with our Kashmir travel guide.",
  path: "/destinations",
  image: images.gulmarg,
});

export default function DestinationsPage() {
  return (
    <>
      <PageHero title="Kashmir Destinations" subtitle="A travel guide to the valleys, lakes and meadows we love most." image={images.gulmarg} crumbs={[{ name: "Destinations", href: "/destinations" }]} />
      <section className="py-10 sm:py-14">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d, i) => <DestinationCard key={d.slug} destination={d} index={i} />)}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
