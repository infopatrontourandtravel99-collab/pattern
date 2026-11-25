import Link from "next/link";
import { adminSections } from "@/lib/adminSchema";
import { getDb } from "@/lib/mongo";

export default async function Dashboard() {
  const db = await getDb();
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-[#14284b]">Dashboard</h1>
      {!db && (
        <p className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
          Database not connected. Add MONGODB_URI to .env.local and restart the server — until then you can look around but saving will not work.
        </p>
      )}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {Object.entries(adminSections).map(([key, s]) => (
          <Link key={key} href={`/admin/${key}`} className="rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:shadow-md">
            <h2 className="font-semibold text-[#14284b]">{s.title}</h2>
            <p className="mt-1 text-sm text-muted">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
