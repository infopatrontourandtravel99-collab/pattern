import SectionHeading from "@/components/common/SectionHeading";
import { slider4, slide } from "@/lib/slider";
import SmartImage from "@/components/common/SmartImage";
import Reveal from "@/components/common/Reveal";
import Button from "@/components/common/Button";
import { experiences } from "@/data/experiences";

export function ExperienceGrid({ items = experiences }) {
  return (
    <div className={slider4}>
      {items.map((e, i) => (
        <Reveal key={e.title} delay={(i % 4) * 0.06} className={slide}>
          <article className="lift group overflow-hidden rounded-[1.5rem] border border-line bg-white card-shadow">
            <div className="relative aspect-[16/10] overflow-hidden">
              <SmartImage src={e.image} alt={`${e.title} in Kashmir`} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <h3 className="font-serif text-base font-semibold">{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{e.text}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export default function ExperiencesSection() {
  return (
    <section className="py-10 sm:py-14">
      <div className="container-x">
        <SectionHeading eyebrow="Experiences" title="Moments worth travelling for"  />
        <ExperienceGrid />
        <div className="mt-8 text-center">
          <Button href="/experiences" variant="outline">All Experiences</Button>
        </div>
      </div>
    </section>
  );
}
