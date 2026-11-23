import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";
import SmartImage from "@/components/common/SmartImage";
import Reveal from "@/components/common/Reveal";
import WishlistButton from "./WishlistButton";

export default function DestinationCard({ destination: d, index = 0, className = "" }) {
  return (
    <Reveal delay={(index % 4) * 0.06} className={className}>
      <article className="lift group relative rounded-3xl border border-line bg-white p-2.5 card-shadow transition-shadow duration-300 hover:shadow-xl">
        <Link href={`/destinations/${d.slug}`} className="block" aria-label={`${d.name} – ${d.tagline}`}>
          <div className="relative aspect-[4/3.1] overflow-hidden rounded-2xl">
            <SmartImage
              src={d.image}
              alt={`${d.name}, Kashmir – ${d.tagline}`}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="transition-transform duration-700 group-hover:scale-105"
            />
            {d.badge && (
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm">
                <Star size={12} className="fill-white" /> {d.badge}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 px-2 pb-1.5 pt-3.5">
            <MapPin size={20} className="shrink-0 text-orange-500" />
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-serif text-base font-semibold leading-tight">{d.name}</h3>
              <p className="truncate text-xs text-muted">{d.tagline}</p>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-ivory text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
              <ArrowRight size={16} />
            </span>
          </div>
        </Link>
        <WishlistButton slug={d.slug} name={d.name} />
      </article>
    </Reveal>
  );
}
