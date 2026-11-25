import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { adminSections } from "@/lib/adminSchema";
import { saveContent } from "@/lib/content";

export async function PUT(req) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const { key, data } = await req.json().catch(() => ({}));
  if (!adminSections[key] || typeof data !== "object" || data === null) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  if (key === "packages") {
    const slugify = (t) => String(t).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const used = new Set();
    data.items = (data.items ?? []).map((p) => {
      let slug = slugify(p.slug || p.title) || "package";
      for (let n = 2; used.has(slug); n++) slug = slugify(p.slug || p.title) + "-" + n;
      used.add(slug);
      return { ...p, slug, price: Number(p.price) || 0, tags: p.tags ?? [], category: p.category ?? [], inclusions: p.inclusions ?? [], exclusions: p.exclusions ?? [], itinerary: p.itinerary ?? [] };
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
