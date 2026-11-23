import { Check, Users, Briefcase, Snowflake } from "lucide-react";
import SmartImage from "@/components/common/SmartImage";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import VehicleArt from "./VehicleArt";
import { formatPrice } from "@/lib/utils";
import { whatsappLink, vehicleMessage } from "@/lib/whatsapp";

export default function VehicleCard({ vehicle: v }) {
  return (
    <article className="lift group flex h-full flex-col rounded-3xl border border-line bg-white p-2.5 shadow-[0_6px_24px_-8px_rgba(28,42,58,0.2)] hover:shadow-xl">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br from-[#14284b] via-[#1d3866] to-[#2a4a80]">
        {v.image ? (
          <SmartImage src={v.image} alt={`${v.name} for Kashmir tours`} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <>
            <span aria-hidden className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/5" />
            <span aria-hidden className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-white/5" />
            <span aria-hidden className="absolute inset-x-0 bottom-[14%] h-px bg-white/15" />
            <VehicleArt kind={v.art} className="absolute inset-0 m-auto h-[78%] w-[80%] transition-transform duration-500 group-hover:translate-x-2" />
          </>
        )}
        {v.badge && <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm">{v.badge}</span>}
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
        <h3 className="text-lg font-bold leading-tight text-[#1c2a3a]">{v.name}</h3>
        <p className="mt-0.5 text-xs text-muted">{v.type}</p>

        <ul className="mt-4 grid grid-cols-3 divide-x divide-line rounded-xl bg-[#f3f4f6] py-2.5 text-center text-xs font-medium text-[#1c2a3a]">
          <li className="flex flex-col items-center gap-1 px-1"><Users size={16} /> {v.seats}</li>
          <li className="flex flex-col items-center gap-1 px-1"><Briefcase size={16} /> {v.luggage}</li>
          <li className="flex flex-col items-center gap-1 px-1"><Snowflake size={16} /> AC</li>
        </ul>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-orange-600">Best for</p>
        <p className="mt-0.5 text-sm text-[#2f3d4d]">{v.bestFor}</p>

        <ul className="mb-auto mt-3 space-y-1.5 text-sm text-[#2f3d4d]">
          {v.features.map((f) => (
            <li key={f} className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0 text-emerald-600" />{f}</li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          <div>
            <span className="block text-[11px] text-muted">{v.price ? "Starting from" : "Rates"}</span>
            <span className="text-base font-bold text-[#c2540a]">{v.price ? `${formatPrice(v.price)} / day` : "On request"}</span>
          </div>
          <a
            href={whatsappLink(vehicleMessage(v))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#22a45d] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1b8a4d]"
          >
            <WhatsAppIcon size={18} /> Get a Quote
          </a>
        </div>
      </div>
    </article>
  );
}
