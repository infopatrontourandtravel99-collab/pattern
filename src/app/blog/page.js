import { getPhotos, getPosts } from "@/lib/content";
import Link from "next/link";
import PageHero from "@/components/common/PageHero";
import SmartImage from "@/components/common/SmartImage";
import Reveal from "@/components/common/Reveal";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "Kashmir Travel Blog – Guides, Tips & Trip Planning",
    description: "Kashmir travel guide articles: best time to visit, trip planning, itineraries and local tips from Patron Tour And Travels.",
    path: "/blog",
    image: (await getPhotos()).blogBanner,
  });
}

export default async function BlogPage() {
  const [posts, photos] = await Promise.all([getPosts(), getPhotos()]);
  return (
    <>
      <PageHero title="Kashmir Travel Blog" subtitle="Guides, tips and stories to help you plan your trip." image={photos.blogBanner} crumbs={[{ name: "Blog", href: "/blog" }]} />
      <section className="py-10 sm:py-14">
        <div className="container-x grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.07}>
              <article className="group overflow-hidden rounded-[1.75rem] border border-line bg-white card-shadow">
                <Link href={`/blog/${p.slug}`} className="relative block aspect-[16/10] overflow-hidden" aria-label={p.title}>
                  <SmartImage src={p.image} alt={p.title} sizes="(min-width: 1024px) 33vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
                </Link>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-wider text-gold-dark">
                    <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</time> · {p.readTime}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl leading-snug"><Link href={`/blog/${p.slug}`}>{p.title}</Link></h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
