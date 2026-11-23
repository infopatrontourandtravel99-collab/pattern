import PageHero from "@/components/common/PageHero";
import { images } from "@/data/images";

export default function LegalPage({ title, path, sections }) {
  return (
    <>
      <PageHero title={title} image={images.mountains} crumbs={[{ name: title, href: path }]} />
      <article className="container-x max-w-3xl py-16">
        <p className="text-sm text-muted">Last updated: November 2026. This is template text — have it reviewed by a legal professional before launch.</p>
        {sections.map((s) => (
          <section key={s.h} className="mt-8">
            <h2 className="font-serif text-2xl">{s.h}</h2>
            <p className="mt-2 leading-relaxed text-muted">{s.p}</p>
          </section>
        ))}
      </article>
    </>
  );
}
