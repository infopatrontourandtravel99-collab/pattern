import { Mail, MapPin, Phone, Clock } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import PageHero from "@/components/common/PageHero";
import EnquiryForm from "@/components/forms/EnquiryForm";
import Button from "@/components/common/Button";
import { getSiteConfig, getPhotos } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { whatsappLink, generalMessage } from "@/lib/whatsapp";

export async function generateMetadata() {
  return buildMetadata({
    title: "Contact Us – Plan Your Kashmir Trip",
    description: "Contact Patron Tour And Travels on WhatsApp, phone or email to plan your Kashmir trip. Get a free itinerary and quote within hours.",
    path: "/contact",
    image: (await getPhotos()).contactBanner,
  });
}

export default async function ContactPage({ searchParams }) {
  const sp = await searchParams;
  const defaults = {
    destination: typeof sp?.destination === "string" ? sp.destination : "",
    date: typeof sp?.date === "string" ? sp.date : "",
    travelers: typeof sp?.travelers === "string" ? sp.travelers : "",
  };
  const [siteConfig, photos] = await Promise.all([getSiteConfig(), getPhotos()]);
  const c = siteConfig.contact;
  const rows = [
    ...c.phones.map((p, i) => ({ Icon: Phone, label: i === 0 ? "Call us" : "Call us (alternate)", value: p.display, href: `tel:${p.href}` })),
    { Icon: Mail, label: "Email", value: c.email, href: `mailto:${c.email}` },
    ...c.addresses.map((a) => ({ Icon: MapPin, label: a.label, value: a.text })),
    { Icon: Clock, label: "Hours", value: c.hours },
  ];
  return (
    <>
      <PageHero title="Contact Us" subtitle="Tell us about your dream Kashmir trip and we will reply with a tailored itinerary." image={photos.contactBanner} crumbs={[{ name: "Contact", href: "/contact" }]} />
      <section className="py-10 sm:py-14">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div id="enquiry" className="scroll-mt-28">
            <EnquiryForm defaults={defaults} title="Send us an enquiry" dense />
          </div>
          <div className="space-y-5">
            <div className="rounded-3xl border border-line bg-white p-7 card-shadow">
              <h2 className="font-serif text-2xl">Get in touch</h2>
              <ul className="mt-5 space-y-5 text-sm">
                {rows.map(({ Icon, label, value, href }) => (
                  <li key={label + value} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand text-gold-dark"><Icon size={18} /></span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-muted">{label}</span>
                      {href ? <a href={href} className="hover:text-gold-dark">{value}</a> : value}
                    </span>
                  </li>
                ))}
              </ul>
              <Button href={whatsappLink(generalMessage())} external variant="whatsapp" className="mt-7 w-full">
                <WhatsAppIcon size={18} /> Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
