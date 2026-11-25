"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export default function LoginForm() {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const f = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: f.get("email"), password: f.get("password") }),
    });
    if (res.ok) {
      router.replace("/admin");
      router.refresh();
    } else {
      setErr((await res.json().catch(() => ({}))).error || "Login failed");
      setBusy(false);
    }
  }

  const input = "mt-1 w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-[#14284b]";
  return (
    <form onSubmit={submit} className="w-full max-w-sm rounded-3xl border border-line bg-white p-7 shadow-lg">
      <span className="relative block h-14 w-14 overflow-hidden rounded-2xl border border-line">
        <Image src={siteConfig.logo.src} alt="" fill sizes="56px" className="object-contain" />
      </span>
      <h1 className="mt-4 text-xl font-bold text-[#14284b]">Admin login</h1>
      <p className="mt-1 text-sm text-muted">{siteConfig.name}</p>
      <label className="mt-5 block text-sm font-medium">Email<input name="email" type="email" required autoComplete="username" className={input} /></label>
      <label className="mt-4 block text-sm font-medium">Password<input name="password" type="password" required autoComplete="current-password" className={input} /></label>
      {err && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
      <button disabled={busy} className="mt-6 w-full rounded-full bg-[#14284b] py-3 text-sm font-semibold text-white disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
