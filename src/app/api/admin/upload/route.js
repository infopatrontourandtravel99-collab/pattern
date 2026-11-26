import { NextResponse } from "next/server";
import { Binary } from "mongodb";
import { isAdmin } from "@/lib/auth";
import { getDb } from "@/lib/mongo";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX = 2 * 1024 * 1024;

export async function POST(req) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!file || typeof file === "string") return NextResponse.json({ error: "No file" }, { status: 400 });
  if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: "Only JPG, PNG, WEBP, GIF or AVIF images" }, { status: 400 });
  if (file.size > MAX) return NextResponse.json({ error: "Image must be under 2 MB (it is auto-shrunk, so try a smaller photo)" }, { status: 400 });
  const db = await getDb();
  if (!db) return NextResponse.json({ error: "Not uploaded: the website cannot connect to the database." }, { status: 500 });
  const buf = Buffer.from(await file.arrayBuffer());
  const { insertedId } = await db.collection("files").insertOne({ type: file.type, name: file.name, data: new Binary(buf), createdAt: new Date() });
  return NextResponse.json({ url: `/api/files/${insertedId}` });
}
