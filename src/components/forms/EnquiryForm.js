"use client";
import { useState } from "react";
import { CheckCircle2, User, Phone, Mail, CalendarDays, MapPin, Users, MessageSquare, Send, ShieldCheck } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { siteConfig } from "@/config/site";
import { whatsappLink, packageMessage, generalMessage } from "@/lib/whatsapp";

// pkg: optional package object. defaults: { destination, date, travelers } from search panel.
export default function EnquiryForm({ pkg, defaults = {}, title = "Plan your journey", compact = false, dense = false }) {
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

  const input = "w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-9 pr-3 text-[13px] text-ink placeholder:text-slate-400 transition focus:border-[#14284b] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#14284b]/10 sm:text-sm";

  return (
    <form onSubmit={onSubmit} className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_10px_40px_-12px_rgba(20,40,75,0.25)]">
      <div className="bg-gradient-to-br from-[#14284b] to-[#2a4a80] px-5 py-4 text-white sm:px-7 sm:py-5">
        <h2 className="pr-10 text-lg font-semibold leading-tight sm:text-xl">{title}</h2>
        <p className="mt-1 text-xs text-white/75 sm:text-[13px]">
          {pkg ? <>Enquiring about <strong className="text-white">{pkg.title}</strong> ({pkg.duration})</> : "Free quote within a few hours. No obligation."}
        </p>
      </div>

      <div className="px-5 pb-5 pt-4 sm:px-7 sm:pb-7 sm:pt-5">
        <div className="grid grid-cols-2 gap-x-2.5 gap-y-3 sm:gap-x-4 sm:gap-y-4">
          <Field label="Full name" Icon={User}>
            <input name="name" required autoComplete="name" className={input} placeholder="Your name" />
          </Field>
          <Field label="Phone / WhatsApp" Icon={Phone}>
            <input name="phone" required type="tel" autoComplete="tel" className={input} placeholder="+91 …" />
          </Field>
          <Field label="Email" Icon={Mail}>
            <input name="email" type="email" autoComplete="email" className={input} placeholder="you@example.com" />
          </Field>
          <Field label="Travel date" Icon={CalendarDays}>
            <input name="date" type="date" defaultValue={defaults.date || ""} className={input} />
          </Field>
          {!pkg && (
            <Field label="Destination" Icon={MapPin}>
              <input name="destination" defaultValue={defaults.destination || ""} className={input} placeholder="e.g. Gulmarg" />
            </Field>
          )}
          <Field label="Travelers" Icon={Users} className={pkg ? "col-span-2 sm:col-span-1" : ""}>
            <input name="travelers" type="number" min="1" max="50" defaultValue={defaults.travelers || 2} className={input} />
          </Field>
          {!compact && (
            <Field label="Message" Icon={MessageSquare} className="col-span-2" top>
              <textarea name="message" rows={dense ? 2 : 3} className={input + " resize-none"} placeholder="Preferences, budget or special occasions" />
            </Field>
          )}
          <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        </div>

        {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 sm:text-sm" role="alert">{error}</p>}

        <button type="submit" disabled={state === "sending"} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#14284b] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#0d1d38] hover:shadow-lg disabled:opacity-60">
          <Send size={16} /> {state === "sending" ? "Sending…" : "Send Enquiry"}
        </button>
        <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-muted sm:text-xs">
          <ShieldCheck size={13} className="text-[#1f9d57]" /> We reply within a few hours. No spam, ever.
        </p>
      </div>
    </form>
  );
}

function Field({ label, Icon, children, className = "", top = false }) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">{label}</span>
      <span className="relative block">
        <Icon size={15} className={`pointer-events-none absolute left-3 text-slate-400 ${top ? "top-3" : "top-1/2 -translate-y-1/2"}`} />
        {children}
      </span>
    </label>
  );
}
