"use client";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { siteConfig } from "@/config/site";
import { whatsappLink, packageMessage, generalMessage } from "@/lib/whatsapp";

const inputBase =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25";
const inputDense =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-[13px] text-ink placeholder:text-muted/70 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25";

// pkg: optional package object. defaults: { destination, date, travelers } from search panel.
export default function EnquiryForm({ pkg, defaults = {}, title = "Plan your journey", compact = false, dense = false }) {
  const input = dense ? inputDense : inputBase;
  const [state, setState] = useState("idle"); // idle | sending | done
  const [error, setError] = useState("");
  const [values, setValues] = useState({});

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    if (data.company) return; // honeypot
    if (!/^[0-9+()\-\s]{8,18}$/.test(data.phone || "")) {
      setError("Please enter a valid phone number.");
      return;
    }
    setState("sending");
    const payload = { ...data, source: pkg ? `package:${pkg.slug}` : "contact", package: pkg?.title || "", createdAt: new Date().toISOString() };
    delete payload.company;
    try {
      const url = siteConfig.phpApiBase ? `${siteConfig.phpApiBase}/enquiries` : "/api/enquiry";
      await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } catch {
      // Enquiry still continues on WhatsApp, so a network failure must not block the lead.
    }
    setValues(data);
    setState("done");
  }

  if (state === "done") {
    const msg = pkg ? packageMessage(pkg, values) : generalMessage(values);
    return (
      <div className="rounded-3xl border border-line bg-white p-8 text-center card-shadow" role="status">
        <CheckCircle2 className="mx-auto text-[#1f9d57]" size={40} />
        <h3 className="mt-4 font-serif text-2xl">Thank you{values.name ? `, ${values.name.split(" ")[0]}` : ""}</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          We have received your enquiry. For the fastest reply, continue the conversation on WhatsApp with your details pre-filled.
        </p>
        <a href={whatsappLink(msg)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1f9d57] px-6 py-3 text-sm font-medium text-white hover:bg-[#188047]">
          <WhatsAppIcon size={18} /> Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`rounded-3xl border border-line bg-white card-shadow ${dense ? "p-5" : "p-6 sm:p-8"}`} noValidate={false}>
      <h2 className={dense ? "pr-10 font-serif text-xl font-semibold" : "font-serif text-2xl"}>{title}</h2>
      {pkg && <p className="mt-1 text-sm text-muted">Enquiring about: <strong className="text-ink">{pkg.title}</strong> ({pkg.duration})</p>}
      <div className={`grid sm:grid-cols-2 ${dense ? "mt-4 gap-2.5" : "mt-6 gap-4"}`}>
        <label className="text-sm">
          <span className={`block font-medium ${dense ? "mb-1 text-xs" : "mb-1.5"}`}>Full name</span>
          <input name="name" required autoComplete="name" className={input} placeholder="Your name" />
        </label>
        <label className="text-sm">
          <span className={`block font-medium ${dense ? "mb-1 text-xs" : "mb-1.5"}`}>Phone / WhatsApp</span>
          <input name="phone" required type="tel" autoComplete="tel" className={input} placeholder="+91 …" />
        </label>
        <label className="text-sm">
          <span className={`block font-medium ${dense ? "mb-1 text-xs" : "mb-1.5"}`}>Email</span>
          <input name="email" type="email" autoComplete="email" className={input} placeholder="you@example.com" />
        </label>
        <label className="text-sm">
          <span className={`block font-medium ${dense ? "mb-1 text-xs" : "mb-1.5"}`}>Travel date</span>
          <input name="date" type="date" defaultValue={defaults.date || ""} className={input} />
        </label>
        {!pkg && (
          <label className="text-sm">
            <span className={`block font-medium ${dense ? "mb-1 text-xs" : "mb-1.5"}`}>Destination</span>
            <input name="destination" defaultValue={defaults.destination || ""} className={input} placeholder="e.g. Gulmarg, Pahalgam" />
          </label>
        )}
        <label className="text-sm">
          <span className={`block font-medium ${dense ? "mb-1 text-xs" : "mb-1.5"}`}>Travelers</span>
          <input name="travelers" type="number" min="1" max="50" defaultValue={defaults.travelers || 2} className={input} />
        </label>
        {!compact && (
          <label className="text-sm sm:col-span-2">
            <span className={`block font-medium ${dense ? "mb-1 text-xs" : "mb-1.5"}`}>Message</span>
            <textarea name="message" rows={dense ? 2 : 4} className={input} placeholder="Tell us about your preferences, budget or special occasions" />
          </label>
        )}
        <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      </div>
      {error && <p className="mt-3 text-sm text-red-700" role="alert">{error}</p>}
      <button type="submit" disabled={state === "sending"} className={`inline-flex w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-ivory transition-colors hover:bg-black disabled:opacity-60 ${dense ? "mt-4 py-2.5" : "mt-6 py-3.5"}`}>
        {state === "sending" ? "Sending…" : "Send Enquiry"}
      </button>
      <p className={`text-center text-xs text-muted ${dense ? "mt-2" : "mt-3"}`}>We reply within a few hours. No spam, ever.</p>
    </form>
  );
}
