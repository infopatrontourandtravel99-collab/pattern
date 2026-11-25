import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongo";

export async function GET(_req, { params }) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) return new Response("Not found", { status: 404 });
  const db = await getDb();
  const doc = db && (await db.collection("files").findOne({ _id: new ObjectId(id) }));
  if (!doc) return new Response("Not found", { status: 404 });
  return new Response(doc.data.buffer, {
    headers: { "Content-Type": doc.type, "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable" },
  });
}
