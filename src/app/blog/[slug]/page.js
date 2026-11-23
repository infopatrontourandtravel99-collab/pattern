import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/common/PageHero";
import Button from "@/components/common/Button";
import JsonLd from "@/components/seo/JsonLd";
import FinalCTA from "@/components/common/FinalCTA";
import { posts, getPost } from "@/data/blog";
import { buildMetadata, articleSchema } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return { ...buildMetadata({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}`, image: p.image, type: "article" }) };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const more = posts.filter((x) => x.slug !== p.slug);
  return (
    <>
      <JsonLd data={articleSchema(p)} />
      <PageHero title={p.title} subtitle={`${new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · ${p.readTime}`} image={p.image} crumbs={[{ name: "Blog", href: "/blog" }, { name: p.title, href: `/blog/${p.slug}` }]} />
      <article className="container-x max-w-3xl py-16">
        <p className="text-lg leading-relaxed text-muted">{p.excerpt}</p>
        {p.body.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="font-serif text-2xl font-semibold">{s.h}</h2>
            <p className="mt-3 leading-relaxed text-muted">{s.p}</p>
          </section>
        ))}
        <div className="mt-14 rounded-3xl bg-sand p-8 text-center">
          <h2 className="font-serif text-2xl">Planning your Kashmir trip?</h2>
          <p className="mt-2 text-sm text-muted">Browse our <Link href="/kashmir-tour-packages" className="text-gold-dark underline">Kashmir tour packages</Link> or talk to a local expert.</p>
          <Button href="/contact" className="mt-5">Plan Your Trip</Button>
        </div>
        <h2 className="mt-14 font-serif text-2xl">More from the blog</h2>
        <ul className="mt-4 space-y-2">
          {more.map((m) => <li key={m.slug}><Link href={`/blog/${m.slug}`} className="text-gold-dark underline">{m.title}</Link></li>)}
        </ul>
      </article>
      <FinalCTA />
    </>
  );
}
