import { NextResponse } from "next/server";
import { credentialsValid, createSession } from "@/lib/auth";

export async function POST(req) {
  const { email, password } = await req.json().catch(() => ({}));
  if (!credentialsValid(email ?? "", password ?? "")) {
    return NextResponse.json({ error: "Wrong email or password (or .env.local not set up)." }, { status: 401 });
  }
  await createSession();
  return NextResponse.json({ ok: true });
}
