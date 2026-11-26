import { MapPin, Users, Star, Building2 } from "lucide-react";
import { FadeIn, CountUp } from "@/components/common/Motion";
import SmartImage from "@/components/common/SmartImage";
import Button from "@/components/common/Button";
import SearchPanel from "@/components/forms/SearchPanel";
import { images } from "@/data/images";

import { getContent, getPackages, getDestinations, getExperiences } from "@/lib/content";
import { siteConfig } from "@/config/site";

const statIcons = { trips: MapPin, travelers: Users, rating: Star, hotels: Building2 };

const buildGroups = (destinations, packages, experiences) => [
  { id: "destinations", label: "Destinations", placeholder: "Where do you want to go?", options: destinations.map((d) => d.name) },
  { id: "packages", label: "Packages", placeholder: "Choose a package", options: packages.map((p) => p.title) },
  { id: "experiences", label: "Experiences", placeholder: "Choose an experience", options: experiences.map((e) => e.title) },
];

export default async function Hero() {
  const [home, destinations, packages, experiences] = await Promise.all([getContent("home"), getDestinations(), getPackages(), getExperiences()]);
  const groups = buildGroups(destinations, packages, experiences);
  return (
    <>
    <section className="relative isolate overflow-hidden pb-6 pt-24 text-center sm:pb-8 sm:pt-28">
      <div className="absolute inset-0 -z-10">
        <div className="animate-kenburns absolute inset-0">
        <SmartImage src={home.heroImage || images.hero} alt="Shikara boat on Dal Lake with snow-capped Kashmir mountains at sunrise" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-white/0 sm:from-white/80 sm:via-white/30" />
      </div>

      <div className="container-x">
        <FadeIn><h1 className="mx-auto max-w-4xl font-serif text-[1.7rem] font-bold leading-[1.15] text-[#14284b] sm:text-4xl lg:text-5xl">
          {home.heroTitle}
        </h1></FadeIn>
        <FadeIn delay={0.15}><p className="mx-auto mt-3 max-w-2xl px-1 text-sm font-medium leading-relaxed text-[#1c2a3a] sm:mt-4 sm:text-lg">
          {home.heroText}
        </p></FadeIn>
        <FadeIn delay={0.3}><div className="mt-5 flex items-center justify-center gap-2.5 sm:gap-3">
          <Button href="/kashmir-tour-packages" className="!bg-[#14284b] !px-4 !py-2.5 !text-[13px] hover:!bg-[#0d1d38] sm:!px-6 sm:!py-3 sm:!text-sm">Explore Packages</Button>
          <Button href="/contact" variant="light" className="!px-4 !py-2.5 !text-[13px] shadow-sm sm:!px-6 sm:!py-3 sm:!text-sm">Plan Your Journey</Button>
        </div></FadeIn>

        <FadeIn delay={0.5} y={40}><div className="mt-8 sm:mt-14">
          <SearchPanel groups={groups} />
        </div></FadeIn>

      </div>
    </section>

    <section aria-label="Our numbers" className="container-x pt-8">
      <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-5 rounded-3xl bg-gradient-to-br from-[#14284b] to-[#1d3866] px-4 py-5 text-white sm:px-6 sm:py-6 shadow-[0_18px_40px_-16px_rgba(20,40,75,0.6)] sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-white/15 sm:px-4 sm:py-5">
        {siteConfig.stats.map((s) => {
          const Icon = statIcons[s.icon] || Star;
          return (
            <li key={s.label} className="flex flex-col items-center gap-3 px-2 text-center sm:flex-row sm:justify-center sm:text-left">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                <Icon size={22} className="text-[#e7c27d]" />
              </span>
              <span>
                <span className="block font-sans text-2xl font-bold leading-none tracking-tight"><CountUp value={s.value} /></span>
                <span className="mt-1 block text-sm text-white/75">{s.label}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
    </>
  );
}
