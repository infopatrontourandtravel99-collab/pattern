import { siteConfig } from "@/config/site";
import { absoluteUrl } from "./utils";

export function buildMetadata({ title, description, path = "/", image, type = "website", keywords }) {
  const url = absoluteUrl(path);
  const img = absoluteUrl(image || "/images/dal-lake-sunrise.png");
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_IN",
      type,
      images: [{ url: img, width: 1600, height: 900, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [img] },
  };
}

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.href),
  })),
});

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl("/images/logo.jpg"),
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Urdu"],
    },
  ],
  sameAs: Object.values(siteConfig.social),
});

export const travelAgencySchema = () => ({
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Narayan Bagh",
    addressLocality: "Ganderbal",
    addressRegion: "Jammu & Kashmir",
    postalCode: "193501",
    addressCountry: "IN",
  },
  areaServed: "Kashmir, India",
});

export const destinationSchema = (d) => ({
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: d.name,
  description: d.summary,
  url: absoluteUrl(`/destinations/${d.slug}`),
  image: absoluteUrl(d.image),
  touristType: ["Couples", "Families", "Adventure travellers"],
  containedInPlace: { "@type": "AdministrativeArea", name: "Jammu & Kashmir, India" },
});

export const packageSchema = (p) => ({
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: p.title,
  description: p.description,
  url: absoluteUrl(`/packages/${p.slug}`),
  image: absoluteUrl(p.image),
  touristType: p.category,
  provider: { "@type": "TravelAgency", name: siteConfig.name, url: siteConfig.url },
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    price: p.price,
    availability: "https://schema.org/InStock",
    url: absoluteUrl(`/packages/${p.slug}`),
  },
});

export const articleSchema = (b) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: b.title,
  description: b.excerpt,
  image: absoluteUrl(b.image),
  datePublished: b.date,
  dateModified: b.date,
  author: { "@type": "Organization", name: siteConfig.name },
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo.jpg") },
  },
  mainEntityOfPage: absoluteUrl(`/blog/${b.slug}`),
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
