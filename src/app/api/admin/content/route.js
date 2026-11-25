import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { adminSections } from "@/lib/adminSchema";
import { saveContent } from "@/lib/content";

const slugify = (t) => String(t).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const arr = (v) => v ?? [];

// Sections that are lists of pages/cards: each item needs a unique slug and complete fields.
const slugLists = {
  packages: {
    from: "title",
    fallback: "package",
    clean: (p) => ({ price: Number(p.price) || 0, tags: arr(p.tags), category: arr(p.category), inclusions: arr(p.inclusions), exclusions: arr(p.exclusions), itinerary: arr(p.itinerary) }),
  },
  destinations: { from: "name", fallback: "destination", clean: (d) => ({ highlights: arr(d.highlights), faqs: arr(d.faqs) }) },
  vehicles: { from: "name", fallback: "vehicle", clean: (v) => ({ price: Number(v.price) || "", features: arr(v.features) }) },
};

export async function PUT(req) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const { key, data } = await req.json().catch(() => ({}));
  if (!adminSections[key] || typeof data !== "object" || data === null) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const list = slugLists[key];
  if (list) {
    const used = new Set();
    data.items = (data.items ?? []).map((item) => {
      const base = slugify(item.slug || item[list.from] || "") || list.fallback;
      let slug = base;
      for (let n = 2; used.has(slug); n++) slug = base + "-" + n;
      used.add(slug);
      return { ...item, ...list.clean(item), slug };
    });
  }
  try {
    await saveContent(key, data);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
