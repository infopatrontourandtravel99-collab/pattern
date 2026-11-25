import { getPackages, getDestinations } from "@/lib/content";
import { posts } from "@/data/blog";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap() {
  const [packages, destinations] = await Promise.all([getPackages(), getDestinations()]);
  const now = new Date();
  const fixed = ["/", "/about", "/destinations", "/kashmir-tour-packages", "/kashmir-honeymoon-packages", "/kashmir-family-packages", "/kashmir-luxury-packages", "/experiences", "/vehicles", "/contact", "/blog", "/privacy-policy", "/terms"];
  return [
    ...fixed.map((p) => ({ url: absoluteUrl(p), lastModified: now, changeFrequency: "weekly", priority: p === "/" ? 1 : 0.8 })),
    ...destinations.map((d) => ({ url: absoluteUrl(`/destinations/${d.slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.7 })),
    ...packages.map((p) => ({ url: absoluteUrl(`/packages/${p.slug}`), lastModified: now, changeFrequency: "weekly", priority: 0.8 })),
    ...posts.map((b) => ({ url: absoluteUrl(`/blog/${b.slug}`), lastModified: new Date(b.date), changeFrequency: "monthly", priority: 0.6 })),
  ];
}
