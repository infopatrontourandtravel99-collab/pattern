import Link from "next/link";
import { slider4, slide } from "@/lib/slider";
import { ArrowRight } from "lucide-react";
import SmartImage from "@/components/common/SmartImage";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import { images } from "@/data/images";

const categories = [
  { title: "Mountains", sub: "Peaks & alpine valleys", href: "/destinations/gulmarg", image: images.mountains, alt: "Snow-capped Himalayan peaks above a turquoise Kashmir river" },
  { title: "Lakes & Houseboats", sub: "Shikaras & lake stays", href: "/destinations/srinagar", image: images.lakes, alt: "Yellow shikara and houseboats on Dal Lake" },
  { title: "Adventure", sub: "Skiing, gondola & treks", href: "/destinations/sonamarg", image: images.adventure, alt: "Red gondola and skiers on snowy slopes in Gulmarg" },
  { title: "Honeymoon", sub: "Romantic escapes", href: "/kashmir-honeymoon-packages", image: images.categoryHoneymoon, alt: "Couple watching the sunset over a Kashmir lake" },
];

export default function Categories() {
  return (
    <section className="py-10 sm:py-14" aria-labelledby="cat-h">
      <div className="container-x">
        <SectionHeading eyebrow="Explore by category" title="Find the Kashmir that suits you" text="From alpine peaks to tranquil lakes, choose the kind of journey that calls to you." />
        <div className={slider4}>
          {categories.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.07} className={slide}>
              <Link href={c.href} className="lift group block rounded-3xl border border-line bg-white p-2.5 card-shadow transition-shadow duration-300 hover:shadow-xl">
                <div className="relative aspect-[4/3.2] overflow-hidden rounded-2xl">
                  <SmartImage src={c.image} alt={c.alt} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between gap-3 px-2 pb-1.5 pt-3.5">
                  <div className="min-w-0">
                    <h3 className="truncate font-serif text-base font-bold leading-tight">{c.title}</h3>
                    <p className="truncate text-xs text-muted">{c.sub}</p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-ivory transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
