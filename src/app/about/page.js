import PageHero from "@/components/common/PageHero";
import SmartImage from "@/components/common/SmartImage";
import WhyChoose from "@/components/home/WhyChoose";
import FinalCTA from "@/components/common/FinalCTA";
import SectionHeading from "@/components/common/SectionHeading";
import TeamCard from "@/components/team/TeamCard";
import { getContent } from "@/lib/content";
import { slider5, slide } from "@/lib/slider";
import { images } from "@/data/images";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us – Local Kashmir Travel Experts",
  description: `${siteConfig.name} is a Ganderbal-based travel company designing private, thoughtfully paced Kashmir holidays with local knowledge and transparent pricing.`,
  path: "/about",
  image: images.about,
});

export default async function AboutPage() {
  const about = await getContent("about");
  const { members } = await getContent("team");
  return (
    <>
      <PageHero title={about.heroTitle} subtitle={about.heroSubtitle} image={about.heroImage || images.about} crumbs={[{ name: "About Us", href: "/about" }]} />
      <section className="py-10 sm:py-14">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold-dark">Our story</p>
            <h2 className="mt-3 font-serif text-2xl font-semibold sm:text-4xl">{about.storyTitle}</h2>
            {about.story1 && <p className="mt-5 leading-relaxed text-muted">{about.story1}</p>}
            {about.story2 && <p className="mt-4 leading-relaxed text-muted">{about.story2}</p>}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] card-shadow">
            <SmartImage src={about.storyImage || images.about} alt="Our story" />
          </div>
        </div>
      </section>
      <WhyChoose />

      <section id="team" className="scroll-mt-24 py-10 sm:py-14">
        <div className="container-x">
          <SectionHeading eyebrow="Our team" title="Meet the people behind your trip" text="The team that plans, books and drives your Kashmir journey." />
          <div className={slider5}>
            {members.map((m, i) => (
              <div key={`${m.name}-${i}`} className={slide}>
                <TeamCard member={m} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
