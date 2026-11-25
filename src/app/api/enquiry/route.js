import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getDb } from "@/lib/mongo";
import { getSiteConfig } from "@/lib/content";

const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const clean = (v, n = 1000) => String(v ?? "").slice(0, n).trim();

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const e = {
    name: clean(body?.name, 100),
    phone: clean(body?.phone, 30),
    email: clean(body?.email, 120),
    date: clean(body?.date, 20),
    travelers: clean(body?.travelers, 5),
    destination: clean(body?.destination, 120),
    message: clean(body?.message, 2000),
    package: clean(body?.package, 150),
    source: clean(body?.source, 100),
  };
  if (!e.name || !e.phone) return NextResponse.json({ ok: false, error: "Name and phone are required" }, { status: 422 });

  let saved = false;
  let mailed = false;

  // 1) Keep a copy in the database.
  try {
    const db = await getDb();
    if (db) {
      await db.collection("enquiries").insertOne({ ...e, createdAt: new Date() });
      saved = true;
    }
  } catch (err) {
    console.error("[enquiry] save failed:", err.message);
  }

  // 2) Email it to the company Gmail.
  try {
    const user = process.env.SMTP_USER, pass = process.env.SMTP_PASS;
    if (user && pass) {
      const cfg = await getSiteConfig();
      const to = process.env.ENQUIRY_TO || cfg.contact.email;
      const rows = [
        ["Name", e.name], ["Phone / WhatsApp", e.phone], ["Email", e.email], ["Travel date", e.date],
        ["Travelers", e.travelers], ["Destination", e.destination], ["Package", e.package], ["Message", e.message], ["Form", e.source],
      ].filter(([, v]) => v);
      const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
      await transporter.sendMail({
        from: `"${cfg.name} Website" <${user}>`,
        to,
        replyTo: e.email || undefined,
        subject: `New enquiry: ${e.name}${e.package ? ` – ${e.package}` : e.destination ? ` – ${e.destination}` : ""}`,
        text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
        html: `<h2 style="margin:0 0 12px">New website enquiry</h2><table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
          .map(([k, v]) => `<tr><td style="color:#667;border-bottom:1px solid #eee"><b>${esc(k)}</b></td><td style="border-bottom:1px solid #eee">${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
          .join("")}</table>`,
      });
      mailed = true;
    }
  } catch (err) {
    console.error("[enquiry] email failed:", err.message);
  }

  if (!saved && !mailed) console.log("[enquiry] (not stored)", { name: e.name, source: e.source });
  return NextResponse.json({ ok: true, saved, mailed });
}
