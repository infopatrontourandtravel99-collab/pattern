import { NextResponse } from "next/server";

// Placeholder enquiry endpoint. Replace with the PHP/MySQL REST API by setting
// NEXT_PUBLIC_PHP_API_BASE (the form then POSTs to `${base}/enquiries`).
// Expected JSON body: { name, phone, email, date, travelers, destination, message, source, package }
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  if (!body?.name || !body?.phone) {
    return NextResponse.json({ ok: false, error: "Name and phone are required" }, { status: 422 });
  }
  console.log("[enquiry]", { name: body.name, source: body.source, package: body.package });
  return NextResponse.json({ ok: true });
}
