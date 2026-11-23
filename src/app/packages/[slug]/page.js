import { notFound } from "next/navigation";
import { Check, X, MapPin, Clock, Phone, ShieldCheck, Headset, CarFront, SlidersHorizontal, ChevronDown, BedDouble, Utensils, Camera, Users } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SmartImage from "@/components/common/SmartImage";
import Reveal from "@/components/common/Reveal";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import PackageCard from "@/components/packages/PackageCard";
import SectionTabs from "@/components/packages/SectionTabs";
import Itinerary from "@/components/packages/Itinerary";
import EnquiryForm from "@/components/forms/EnquiryForm";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { images } from "@/data/images";
import { destinations } from "@/data/destinations";
import { packages, getPackage } from "@/data/packages";
import { buildMetadata, packageSchema, faqSchema } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";
import { whatsappLink, packageMessage } from "@/lib/whatsapp";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPackage(slug);
  if (!p) return {};
  return buildMetadata({
    title: `${p.title} – ${p.duration} Kashmir Tour Package`,
    description: `${p.description} ${p.duration} from ${formatPrice(p.price)} per person.`,
    path: `/packages/${p.slug}`,
    image: p.image,
  });
}

const trust = [
  { Icon: SlidersHorizontal, text: "Fully customisable itinerary" },
  { Icon: CarFront, text: "Private vehicle with local driver" },
  { Icon: ShieldCheck, text: "Verified hotels and stays" },
  { Icon: Headset, text: "24/7 travel assistance" },
];

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "inclusions", label: "Inclusions" },
  { id: "faq", label: "FAQ" },
  { id: "enquire", label: "Enquire" },
];

export default async function PackagePage({ params }) {
  const { slug } = await params;
  const p = getPackage(slug);
  if (!p) notFound();

  const places = p.route.split(" · ");
  const others = packages.filter((x) => x.slug !== p.slug).slice(0, 3);

  // Gallery: main package photo + photos of the places on the route, padded with extras.
  const placeShots = places
    .map((pl) => destinations.find((d) => d.name.startsWith(pl)))
    .filter(Boolean)
    .map((d) => ({ src: d.image, alt: `${d.name}, Kashmir – ${p.title}` }));
  const extras = [...new Set(Object.values(images))].map((src) => ({ src, alt: `${p.title} – Kashmir scenery` }));
  const seen = new Set([p.image]);
  const gallery = [{ src: p.image, alt: `${p.title} – ${p.route}` }];
  for (const g of [...placeShots, ...extras]) {
    if (gallery.length >= 5) break;
    if (!seen.has(g.src)) { seen.add(g.src); gallery.push(g); }
  }

  const faqs = [
    { q: "Can this itinerary be customised?", a: `Yes. The ${p.title} plan is a starting point. We can add nights, change hotels or swap destinations to suit your dates, budget and group.` },
    { q: "What is included in the price?", a: `${p.inclusions.join(", ")}. Items listed under "Not included" are paid separately.` },
    { q: "Is the price per person?", a: `The starting price of ${formatPrice(p.price)} is per person and depends on season, hotel category and group size. Message us for an exact quote for your dates.` },
    { q: "How do I book this package?", a: "Send an enquiry or message us on WhatsApp with your travel dates and number of travellers. We will share a detailed quote and confirm once you approve." },
  ];
  const highlights = [
    { Icon: Clock, label: "Duration", value: p.duration },
    { Icon: BedDouble, label: "Stay", value: "Verified hotels" },
    { Icon: Utensils, label: "Meals", value: "Breakfast & dinner" },
    { Icon: CarFront, label: "Transfers", value: "Private vehicle" },
  ];

  return (
    <>
      <JsonLd data={packageSchema(p)} />
      <JsonLd data={faqSchema(faqs)} />

      {/* Title + gallery */}
      <section className="container-x pb-4 pt-22 sm:pt-26">
        <Breadcrumbs items={[{ name: "Tour Packages", href: "/kashmir-tour-packages" }, { name: p.title, href: `/packages/${p.slug}` }]} />
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-xl font-bold leading-tight sm:text-2xl lg:text-3xl">{p.title}</h1>
            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[13px]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#14284b] px-3 py-1.5 font-medium text-white"><Clock size={14} /> {p.duration}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 font-medium"><MapPin size={14} className="text-orange-500" /> {places.join(" • ")}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-muted"><Users size={14} /> {p.category.join(", ")}</span>
            </div>
          </div>
          <div className="lg:text-right">
            <span className="block text-xs text-muted">Starting from</span>
            <span className="text-2xl font-bold text-[#c2540a]">{formatPrice(p.price)}</span>
            <span className="text-sm text-muted"> / person</span>
          </div>
        </div>

        <div className="mt-5 grid h-[13rem] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl sm:h-[17rem] lg:h-[19rem]">
          {gallery.map((g, i) => (
            <div key={g.src} className={`relative overflow-hidden ${i === 0 ? "col-span-4 row-span-2 sm:col-span-2" : "hidden sm:block"}`}>
              <SmartImage src={g.src} alt={g.alt} priority={i === 0} sizes={i === 0 ? "(min-width: 640px) 50vw, 100vw" : "25vw"} className="transition-transform duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      <SectionTabs tabs={tabs} />

      <div className="container-x grid gap-8 py-6 lg:grid-cols-[1.7fr_1fr] lg:py-8">
        <div className="min-w-0 space-y-10">
          {/* Overview */}
          <section id="overview" className="scroll-mt-32" aria-labelledby="overview-h">
            <Reveal>
              <h2 id="overview-h" className="text-xl font-semibold">Overview</h2>
              <p className="mt-3 leading-relaxed text-muted">
                {p.description} This {p.duration.toLowerCase()} journey covers {places.join(", ")}, with comfortable stays, private transport and a pace that leaves time to enjoy each place.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {highlights.map(({ Icon, label, value }) => (
                  <li key={label} className="rounded-2xl border border-line bg-white p-4 text-center shadow-sm">
                    <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-orange-600"><Icon size={20} /></span>
                    <span className="mt-2.5 block text-xs text-muted">{label}</span>
                    <span className="mt-0.5 block text-sm font-semibold leading-snug">{value}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {/* Itinerary */}
          <section id="itinerary" className="scroll-mt-32" aria-labelledby="itinerary-h">
            <h2 id="itinerary-h" className="text-xl font-semibold">Day-by-day itinerary</h2>
            <p className="mt-1 text-sm text-muted">Tap a day to see the plan.</p>
            <div className="mt-2"><Itinerary days={p.itinerary} /></div>
          </section>

          {/* Inclusions */}
          <section id="inclusions" className="scroll-mt-32" aria-labelledby="incl-h">
            <h2 id="incl-h" className="text-xl font-semibold">Inclusions &amp; exclusions</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white"><Check size={16} /></span>
                  What&apos;s included
                </h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {p.inclusions.map((i) => (
                    <li key={i} className="flex gap-2.5"><Check size={16} className="mt-0.5 shrink-0 text-emerald-600" />{i}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-line bg-white p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600/90 text-white"><X size={16} /></span>
                  Not included
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  {p.exclusions.map((i) => (
                    <li key={i} className="flex gap-2.5"><X size={16} className="mt-0.5 shrink-0 text-red-600/80" />{i}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-32" aria-labelledby="faq-h">
            <h2 id="faq-h" className="text-xl font-semibold">Frequently asked questions</h2>
            <div className="mt-5 space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-line bg-white px-5 py-4 open:shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium">
                    {f.q}
                    <ChevronDown size={18} className="shrink-0 transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* Booking sidebar */}
        <aside id="enquire" className="scroll-mt-32 space-y-5 lg:sticky lg:top-32 lg:self-start">
          <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_12px_36px_-14px_rgba(28,42,58,0.3)]">
            <div className="flex items-end justify-between gap-3 bg-gradient-to-br from-[#14284b] to-[#1d3866] p-5 text-white">
              <div>
                <p className="text-xs text-white/70">Starting from</p>
                <p className="text-3xl font-bold">{formatPrice(p.price)}</p>
              </div>
              <p className="pb-1 text-xs text-white/70">per person</p>
            </div>
            <div className="space-y-3 p-5">
              <a
                href={whatsappLink(packageMessage(p))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#22a45d] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1b8a4d]"
              >
                <WhatsAppIcon size={20} /> WhatsApp Enquiry
              </a>
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-white"
              >
                <Phone size={17} /> Call {siteConfig.contact.phone}
              </a>
              <ul className="space-y-2.5 border-t border-line pt-4 text-sm">
                {trust.map(({ Icon, text }) => (
                  <li key={text} className="flex items-center gap-2.5 text-[#2f3d4d]">
                    <Icon size={16} className="shrink-0 text-orange-500" /> {text}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-muted">Sample price. Final quote depends on dates, hotels and group size.</p>
            </div>
          </div>
          <EnquiryForm pkg={p} title="Send a package enquiry" compact dense />
        </aside>
      </div>

      {/* Related */}
      <section className="pb-14">
        <div className="container-x">
          <h2 className="mb-5 text-xl font-semibold">You may also like</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((o, i) => <PackageCard key={o.slug} pkg={o} index={i} />)}
          </div>
        </div>
      </section>
    </>
  );
}
