import { cache } from "react";
import { getDb } from "@/lib/mongo";
import { siteConfig } from "@/config/site";
import { teamGroups } from "@/data/team";
import { images } from "@/data/images";
import { adminSections } from "@/lib/adminSchema";

// Read editable content from MongoDB; fall back to the built-in defaults.
// cache() = one database query per key per request, however many components ask.
export const getContent = cache(async (key) => {
  const def = adminSections[key]?.defaults ?? null;
  const db = await getDb();
  if (!db) return def;
  try {
    const doc = await db.collection("content").findOne({ _id: key });
    return doc?.data ?? def;
  } catch {
    return def;
  }
});

export async function saveContent(key, data) {
  const db = await getDb();
  if (!db) throw new Error("Not saved: the website cannot connect to the database.");
  await db.collection("content").updateOne({ _id: key }, { $set: { data, updatedAt: new Date() } }, { upsert: true });
}

const telHref = (s) => "+" + String(s).replace(/\D/g, "");

// siteConfig with admin "Settings" applied on top (server components only).
export async function getSiteConfig() {
  const s = await getContent("settings");
  const phones = [s.phone1, s.phone2].filter(Boolean).map((d) => ({ display: d, href: telHref(d) }));
  const addresses = [
    s.headOffice && { label: "Head Office", text: s.headOffice },
    s.branchOffice && { label: "Branch Office", text: s.branchOffice },
  ].filter(Boolean);
  return {
    ...siteConfig,
    contact: {
      ...siteConfig.contact,
      phones: phones.length ? phones : siteConfig.contact.phones,
      phone: phones[0]?.display ?? siteConfig.contact.phone,
      phoneHref: phones[0]?.href ?? siteConfig.contact.phoneHref,
      email: s.email || siteConfig.contact.email,
      addresses: addresses.length ? addresses : siteConfig.contact.addresses,
      hours: s.hours || siteConfig.contact.hours,
    },
    social: { instagram: s.instagram || siteConfig.social.instagram, facebook: s.facebook || siteConfig.social.facebook, google: s.google || siteConfig.social.google },
  };
}

export async function getTeam() {
  const t = await getContent("team");
  return t.members;
}

export const defaultTeam = teamGroups.flatMap((g) => g.members);

// ---- Packages (editable in admin) ----
export async function getPackages() {
  const c = await getContent("packages");
  return (c?.items ?? []).filter((p) => p.slug && p.title).map((p) => ({ ...p, image: p.image || images.hero }));
}
export const getPackageBySlug = async (slug) => (await getPackages()).find((p) => p.slug === slug);
export const packagesByTag = async (tag) => (await getPackages()).filter((p) => (p.tags ?? []).includes(tag));

// ---- Destinations and vehicles (editable in admin) ----
export async function getDestinations() {
  const c = await getContent("destinations");
  return (c?.items ?? [])
    .filter((d) => d.slug && d.name)
    .map((d) => ({ ...d, image: d.image || images.hero, highlights: d.highlights ?? [], faqs: (d.faqs ?? []).filter((x) => x.q && x.a) }));
}
export const getDestinationBySlug = async (slug) => (await getDestinations()).find((d) => d.slug === slug);

export async function getVehicles() {
  const c = await getContent("vehicles");
  return (c?.items ?? [])
    .filter((v) => v.slug && v.name)
    .map((v) => ({ ...v, art: v.art || "sedan", group: v.group || "small", features: v.features ?? [] }));
}

// ---- Logo, banners, home cards, experiences and blog ----
export async function getPhotos() {
  const saved = (await getContent("photos")) ?? {};
  // A removed photo falls back to the built-in one.
  return Object.fromEntries(Object.entries(adminSections.photos.defaults).map(([k, v]) => [k, saved[k] || v]));
}

export async function getCategories() {
  const c = await getContent("categories");
  return (c?.items ?? [])
    .filter((x) => x.title)
    .map((x) => ({ ...x, image: x.image || images.hero, href: x.href?.startsWith("/") ? x.href : "/kashmir-tour-packages" }));
}

export async function getExperiences() {
  const c = await getContent("experiences");
  return (c?.items ?? []).filter((x) => x.title).map((x) => ({ ...x, image: x.image || images.hero }));
}

export async function getPosts() {
  const c = await getContent("blog");
  const today = new Date().toISOString().slice(0, 10);
  return (c?.items ?? [])
    .filter((p) => p.slug && p.title)
    .map((p) => ({ ...p, image: p.image || images.hero, date: Date.parse(p.date) ? p.date : today, body: (p.body ?? []).filter((s) => s.h || s.p) }));
}
export const getPostBySlug = async (slug) => (await getPosts()).find((p) => p.slug === slug);
