import { ShieldCheck, UserCheck, Route, Headset, Phone, Check, Send, ReceiptText, CircleCheck } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SmartImage from "@/components/common/SmartImage";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import FinalCTA from "@/components/common/FinalCTA";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import FleetGrid from "@/components/vehicles/FleetGrid";
import { siteConfig } from "@/config/site";
import { getVehicles, getPhotos } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";
import { slider4, slider3, slide } from "@/lib/slider";

export async function generateMetadata() {
  return buildMetadata({
    title: "Kashmir Taxi & Cab Service – Sedan, Innova, Tempo Traveller on Rent",
    description: "Book clean, air-conditioned vehicles with experienced local drivers for Srinagar, Gulmarg, Pahalgam and Sonamarg: sedan, Innova, luxury SUV, Tempo Traveller and mini coach.",
    path: "/vehicles",
    image: (await getPhotos()).vehiclesBanner,
  });
}

const reasons = [
  { Icon: UserCheck, title: "Experienced local drivers", text: "Drivers who know the mountain roads, weather and the best stops." },
  { Icon: ShieldCheck, title: "Clean, well-kept vehicles", text: "Air-conditioned, regularly serviced and cleaned before every trip." },
  { Icon: Route, title: "Flexible routes", text: "Airport transfers, sightseeing, outstation and multi-day tours." },
  { Icon: Headset, title: "24/7 support", text: "Reach us any time during your trip if you need help or a change." },
];

const steps = [
  { Icon: Send, title: "Share your trip", text: "Tell us your dates, route and number of travellers on WhatsApp or the enquiry form." },
  { Icon: ReceiptText, title: "Get a clear quote", text: "We suggest the right vehicle and send a transparent rate with no hidden charges." },
  { Icon: CircleCheck, title: "Confirm and travel", text: "Confirm the booking and your driver meets you on time at the airport or hotel." },
];

export default async function VehiclesPage() {
  const [vehicles, photos] = await Promise.all([getVehicles(), getPhotos()]);
  const quote = whatsappLink(`Hello ${siteConfig.name}, I need a vehicle for my Kashmir trip. Please share the options and rates.`);
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#14284b] pb-14 pt-24 text-white sm:pb-20 sm:pt-28">
        <div className="absolute inset-0 -z-10">
          <SmartImage src={photos.vehiclesBanner} alt="" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#14284b]/95 via-[#14284b]/80 to-[#14284b]/40" />
        </div>
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Vehicles", href: "/vehicles" }]} light />
          <div className="mt-6 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-orange-300">Cabs &amp; Coaches</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Travel Kashmir in comfort</h1>
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
              Clean, air-conditioned vehicles with experienced local drivers, for airport transfers, sightseeing and multi-day tours.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={quote} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#22a45d] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1b8a4d]">
                <WhatsAppIcon size={19} /> Get a Quote on WhatsApp
              </a>
              <a href={`tel:${siteConfig.contact.phoneHref}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-[#14284b]">
                <Phone size={17} /> {siteConfig.contact.phone}
              </a>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
              {["Air conditioned", "Local drivers", "Airport pickup", "Transparent rates"].map((t) => (
                <li key={t} className="flex items-center gap-1.5"><Check size={16} className="text-orange-300" /> {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="py-10 sm:py-14">
        <div className="container-x">
          <SectionHeading eyebrow="Our fleet" title="Pick the right vehicle" text="From a private sedan for two to a coach for large groups. Filter by group size, then ask for a quote." />
          <FleetGrid vehicles={vehicles} />
        </div>
      </section>

      {/* Comparison */}
      <section className="pb-10 sm:pb-14">
        <div className="container-x">
          <SectionHeading eyebrow="Compare" title="Quick comparison" />
          <Reveal>
            <div className="overflow-x-auto rounded-3xl border border-line bg-white shadow-sm">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="bg-[#14284b] text-white">
                  <tr>
                    <th className="px-5 py-3.5 font-semibold">Vehicle</th>
                    <th className="px-5 py-3.5 font-semibold">Seats</th>
                    <th className="px-5 py-3.5 font-semibold">Luggage</th>
                    <th className="px-5 py-3.5 font-semibold">Best for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {vehicles.map((v) => (
                    <tr key={v.slug} className="transition-colors hover:bg-orange-50/40">
                      <td className="px-5 py-3.5"><span className="font-semibold">{v.name}</span><span className="block text-xs text-muted">{v.type}</span></td>
                      <td className="px-5 py-3.5">{v.seats}</td>
                      <td className="px-5 py-3.5">{v.luggage}</td>
                      <td className="px-5 py-3.5 text-muted">{v.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="pb-10 sm:pb-14">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title="Book a vehicle in three steps" />
          <div className={slider3}>
            {steps.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08} className={slide}>
                <div className="lift relative h-full rounded-3xl border border-line bg-white p-6 shadow-sm">
                  <span className="absolute right-5 top-4 text-5xl font-bold text-orange-100">{i + 1}</span>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#14284b] text-white"><Icon size={22} /></span>
                  <h3 className="relative mt-4 text-base font-semibold">{title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="pb-10 sm:pb-14">
        <div className="container-x">
          <SectionHeading eyebrow="Why ride with us" title="A comfortable journey, start to finish" />
          <div className={slider4}>
            {reasons.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.07} className={slide}>
                <div className="lift h-full rounded-3xl border border-line bg-white p-6 shadow-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-600"><Icon size={22} /></span>
                  <h3 className="mt-4 text-base font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA heading="Need a vehicle for your Kashmir trip?" text="Share your dates, route and group size and we will send the best option and rate." />
    </>
  );
}
