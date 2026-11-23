import PageHero from "@/components/common/PageHero";
import SmartImage from "@/components/common/SmartImage";
import WhyChoose from "@/components/home/WhyChoose";
import FinalCTA from "@/components/common/FinalCTA";
import { images } from "@/data/images";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us – Local Kashmir Travel Experts",
  description: `${siteConfig.name} is a Ganderbal-based travel company designing private, thoughtfully paced Kashmir holidays with local knowledge and transparent pricing.`,
  path: "/about",
  image: images.about,
});

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Patron Tour And Travels" subtitle="Local people. Honest planning. Beautifully paced journeys." image={images.about} crumbs={[{ name: "About Us", href: "/about" }]} />
      <section className="py-10 sm:py-14">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold-dark">Our story</p>
            <h2 className="mt-3 font-serif text-2xl font-semibold sm:text-4xl">Born in the Valley, built around your journey</h2>
            <p className="mt-5 leading-relaxed text-muted">
              {siteConfig.name} was created by Kashmir locals who wanted visitors to experience Kashmir the way it deserves: slowly, comfortably and with genuine hospitality. We handle everything from hotel selection to private transport, so you can focus on the view.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Whether you are planning a honeymoon, a family holiday or an offbeat adventure, our team tailors each trip to your pace and budget, and stays reachable throughout your travels.
            </p>
            <p className="mt-4 text-xs text-muted">Edit this page copy with your real company story, founding year and team details.</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] card-shadow">
            <SmartImage src={images.about} alt="Dal Lake at sunrise in Kashmir" />
          </div>
        </div>
      </section>
      <WhyChoose />
      <FinalCTA />
    </>
  );
}
