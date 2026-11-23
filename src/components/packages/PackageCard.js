import Link from "next/link";
import { ArrowRight, BedDouble, CalendarDays, Car, MapPin, Utensils } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import SmartImage from "@/components/common/SmartImage";
import Reveal from "@/components/common/Reveal";
import { formatPrice } from "@/lib/utils";
import { whatsappLink, packageMessage } from "@/lib/whatsapp";

const features = [
  { Icon: BedDouble, label: "Hotel Stay" },
  { Icon: Utensils, label: "Meals" },
  { Icon: Car, label: "Transfers" },
];

export default function PackageCard({ pkg, index = 0 }) {
  const href = `/packages/${pkg.slug}`;
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <article className="lift group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-white from-70% to-[#f1f1f1] shadow-[0_6px_24px_-6px_rgba(28,42,58,0.25)] ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_14px_34px_-8px_rgba(28,42,58,0.35)]">
        {/* Photo with curved bottom edge */}
        <Link href={href} className="relative block aspect-[2/1] shrink-0 overflow-hidden" aria-label={pkg.title}>
          <SmartImage
            src={pkg.image}
            alt={`${pkg.title} – ${pkg.route}`}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            className="transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#1c2a3a] shadow-md">
            <CalendarDays size={16} /> {pkg.duration}
          </span>
          <span aria-hidden className="absolute -bottom-4 left-[-8%] h-8 w-[116%] rounded-[50%] bg-white" />
        </Link>

        <div className="flex flex-1 flex-col px-4 pb-5 pt-2 sm:px-5">
          <h3 className="font-sans text-lg font-bold leading-tight tracking-tight text-[#1c2a3a] sm:text-xl">
            <Link href={href}>{pkg.title}</Link>
          </h3>

          <p className="mt-2 inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-[#fdeee3] px-3 py-1 text-xs font-semibold text-[#1c2a3a]">
            <MapPin size={17} className="shrink-0 fill-orange-500 text-orange-500" />
            <span className="truncate">{pkg.route.replaceAll(" · ", " • ")}</span>
          </p>

          <p className="mt-2.5 line-clamp-2 text-[15px] leading-snug text-[#2f3d4d]">{pkg.description}</p>

          <ul className="mb-auto mt-4 flex items-center justify-around rounded-xl bg-[#f3f4f6] px-2 py-3">
            {features.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-[13px] font-medium text-[#1c2a3a]">
                <Icon size={18} className="shrink-0" /> {label}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between gap-2 border-t border-black/5 pt-4">
            <div className="min-w-0">
              <span className="block text-xs text-[#4b5968]">Starting from</span>
              <span className="font-sans text-lg font-bold leading-none text-[#c2540a] sm:text-xl">{formatPrice(pkg.price)}</span>
              <span className="text-sm text-[#2f3d4d]"> / person</span>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <a
                href={whatsappLink(packageMessage(pkg))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Enquire about ${pkg.title} on WhatsApp`}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#22a45d] text-white shadow-sm transition-colors hover:bg-[#1b8a4d]"
              >
                <WhatsAppIcon size={24} />
              </a>
              <Link href={href} className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-gradient-to-b from-[#d4600f] to-[#b84a07] px-3.5 sm:px-5 text-[15px] font-bold text-white shadow-sm transition-opacity hover:opacity-90">
                View Details <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
