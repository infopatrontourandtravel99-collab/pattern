import PageHero from "@/components/common/PageHero";
import { ExperienceGrid } from "@/components/home/ExperiencesSection";
import FinalCTA from "@/components/common/FinalCTA";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kashmir Experiences – Shikara, Houseboats, Gondola & Local Cuisine",
  description: "Signature Kashmir experiences: Dal Lake shikara rides, luxury houseboat stays, the Gulmarg Gondola, snow adventures, Mughal Gardens and Kashmiri cuisine.",
  path: "/experiences",
  image: images.shikara,
});

export default function ExperiencesPage() {
  return (
    <>
      <PageHero title="Kashmir Experiences" subtitle="The moments that make a Kashmir journey unforgettable." image={images.shikara} crumbs={[{ name: "Experiences", href: "/experiences" }]} />
      <section className="py-10 sm:py-14">
        <div className="container-x"><ExperienceGrid /></div>
      </section>
      <FinalCTA />
    </>
  );
}
