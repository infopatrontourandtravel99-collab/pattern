import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
  return process.env.AUTH_SECRET || "";
}
const sign = (v) => crypto.createHmac("sha256", secret()).update(v).digest("hex");

export function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

export function credentialsValid(email, password) {
  const e = process.env.ADMIN_EMAIL, p = process.env.ADMIN_PASSWORD;
  if (!e || !p || !secret()) return false;
  return safeEqual(String(email).trim().toLowerCase(), e.trim().toLowerCase()) && safeEqual(password, p);
}

export async function createSession() {
  const exp = Date.now() + MAX_AGE * 1000;
  const value = `${exp}.${sign(String(exp))}`;
  (await cookies()).set(COOKIE, value, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: MAX_AGE });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  if (!secret()) return false;
  const v = (await cookies()).get(COOKIE)?.value;
  if (!v) return false;
  const [exp, sig] = v.split(".");
  return Boolean(exp && sig && Number(exp) > Date.now() && safeEqual(sig, sign(exp)));
}
