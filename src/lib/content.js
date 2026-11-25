import { cache } from "react";
import { getDb } from "@/lib/mongo";
import { siteConfig } from "@/config/site";
import { teamGroups } from "@/data/team";
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
  if (!db) throw new Error("Database is not configured (MONGODB_URI).");
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
  return (c?.items ?? []).filter((p) => p.slug && p.title);
}
export const getPackageBySlug = async (slug) => (await getPackages()).find((p) => p.slug === slug);
export const packagesByTag = async (tag) => (await getPackages()).filter((p) => (p.tags ?? []).includes(tag));
