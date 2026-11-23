import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import PopularPackages from "@/components/home/PopularPackages";
import DestinationsSection from "@/components/home/DestinationsSection";
import ExperiencesSection from "@/components/home/ExperiencesSection";
import WhyChoose from "@/components/home/WhyChoose";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/common/FinalCTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kashmir Tour Packages & Holiday Planner | Patron Tour And Travels",
  description: "Plan your Kashmir trip with curated tour packages for Srinagar, Gulmarg and Pahalgam. Private transport, verified hotels and local experts.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <PopularPackages />
      <DestinationsSection />
      <ExperiencesSection />
      <WhyChoose />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
