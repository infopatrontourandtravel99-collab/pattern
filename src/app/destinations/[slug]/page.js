import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, Mountain } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import PageHero from "@/components/common/PageHero";
import Button from "@/components/common/Button";
import DestinationCard from "@/components/destinations/DestinationCard";
import PackageCard from "@/components/packages/PackageCard";
import EnquiryForm from "@/components/forms/EnquiryForm";
import JsonLd from "@/components/seo/JsonLd";
import { getPackages, getDestinations, getDestinationBySlug } from "@/lib/content";
import { buildMetadata, destinationSchema, faqSchema } from "@/lib/seo";
import { whatsappLink, destinationMessage } from "@/lib/whatsapp";

export async function generateStaticParams() {
  return (await getDestinations()).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const d = await getDestinationBySlug(slug);
  if (!d) return {};
  return buildMetadata({
    title: `${d.name} Tour Packages & Travel Guide – Best Time, Things to Do`,
    description: `${d.summary} Best time to visit: ${d.bestTime}.`,
    path: `/destinations/${d.slug}`,
    image: d.image,
  });
}

export default async function DestinationPage({ params }) {
  const { slug } = await params;
  const d = await getDestinationBySlug(slug);
  if (!d) notFound();
  const relatedPkgs = (await getPackages()).filter((p) => (p.route ?? "").includes(d.name.split(" ")[0])).slice(0, 2);
  const more = (await getDestinations()).filter((x) => x.slug !== d.slug).slice(0, 4);

  return (
    <>
      <JsonLd data={destinationSchema(d)} />
      {d.faqs.length > 0 && <JsonLd data={faqSchema(d.faqs)} />}
      <PageHero title={d.name} subtitle={d.tagline} image={d.image} crumbs={[{ name: "Destinations", href: "/destinations" }, { name: d.name, href: `/destinations/${d.slug}` }]} />

      <div className="container-x grid gap-10 py-10 lg:grid-cols-[1.6fr_1fr]">
        <article>
          <h2 className="font-serif text-2xl font-semibold">About {d.name}</h2>
          <p className="mt-4 leading-relaxed text-muted">{d.summary}</p>
          <p className="mt-4 leading-relaxed text-muted">{d.overview}</p>

          {d.highlights.length > 0 && (
            <>
            <h2 className="mt-12 font-serif text-2xl font-semibold">Highlights in {d.name}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {d.highlights.map((h) => (
                <li key={h} className="rounded-2xl border border-line bg-white px-5 py-3.5 text-sm">{h}</li>
              ))}
            </ul>
            </>
          )}

          {d.faqs.length > 0 && (
            <>
            <h2 className="mt-12 font-serif text-2xl font-semibold">Frequently asked questions</h2>
            <div className="mt-5 space-y-3">
              {d.faqs.map((f) => (
                <div key={f.q} className="rounded-2xl border border-line bg-white p-5">
                  <h3 className="font-serif text-lg">{f.q}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.a}</p>
                </div>
              ))}
            </div>
            </>
          )}
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-line bg-white p-6 card-shadow">
            <h2 className="font-serif text-2xl">Travel essentials</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-3"><CalendarDays size={17} className="mt-0.5 text-gold-dark" /><span><strong>Best time:</strong> {d.bestTime}</span></li>
              <li className="flex gap-3"><Clock size={17} className="mt-0.5 text-gold-dark" /><span><strong>Ideal stay:</strong> {d.idealStay}</span></li>
              <li className="flex gap-3"><Mountain size={17} className="mt-0.5 text-gold-dark" /><span><strong>Altitude:</strong> {d.altitude}</span></li>
            </ul>
            <Button href={whatsappLink(destinationMessage(d))} external variant="whatsapp" className="mt-6 w-full">
              <WhatsAppIcon size={18} /> Plan {d.name} on WhatsApp
            </Button>
          </div>
          <EnquiryForm defaults={{ destination: d.name }} title={`Enquire about ${d.name}`} compact />
        </aside>
      </div>

      {relatedPkgs.length > 0 && (
        <section className="pb-10">
          <div className="container-x">
            <h2 className="mb-8 font-serif text-2xl font-semibold">{d.name} tour packages</h2>
            <div className="grid gap-7 md:grid-cols-2">{relatedPkgs.map((p, i) => <PackageCard key={p.slug} pkg={p} index={i} />)}</div>
            <p className="mt-6 text-sm text-muted">See all <Link href="/kashmir-tour-packages" className="text-gold-dark underline">Kashmir tour packages</Link>.</p>
          </div>
        </section>
      )}

      <section className="pb-12">
        <div className="container-x">
          <h2 className="mb-8 font-serif text-2xl font-semibold">More places to explore</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{more.map((m, i) => <DestinationCard key={m.slug} destination={m} index={i} />)}</div>
        </div>
      </section>
    </>
  );
}
