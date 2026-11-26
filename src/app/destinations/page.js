import PageHero from "@/components/common/PageHero";
import DestinationCard from "@/components/destinations/DestinationCard";
import FinalCTA from "@/components/common/FinalCTA";
import { getDestinations, getPhotos } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "Kashmir Destinations – Srinagar, Gulmarg, Pahalgam & More",
    description: "Explore Kashmir destinations including Srinagar, Gulmarg, Pahalgam, Sonamarg, Doodhpathri, Gurez, Bangus Valley and Yusmarg with our Kashmir travel guide.",
    path: "/destinations",
    image: (await getPhotos()).destinationsBanner,
  });
}

export default async function DestinationsPage() {
  const [destinations, photos] = await Promise.all([getDestinations(), getPhotos()]);
  return (
    <>
      <PageHero title="Kashmir Destinations" subtitle="A travel guide to the valleys, lakes and meadows we love most." image={photos.destinationsBanner} crumbs={[{ name: "Destinations", href: "/destinations" }]} />
      <section className="py-10 sm:py-14">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d, i) => <DestinationCard key={d.slug} destination={d} index={i} />)}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
