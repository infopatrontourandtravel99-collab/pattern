import SmartImage from "@/components/common/SmartImage";
import Reveal from "@/components/common/Reveal";

function initials(name) {
  const parts = name.replace(/^(mr|mrs|miss|ms|dr)\.?\s+/i, "").split(/\s+/).filter(Boolean);
  return (parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0][0]).toUpperCase();
}

export default function TeamCard({ member: m, index = 0 }) {
  return (
    <Reveal delay={(index % 4) * 0.07}>
      <article className="lift group h-full overflow-hidden rounded-3xl border border-line bg-white text-center shadow-[0_6px_24px_-8px_rgba(28,42,58,0.2)] hover:shadow-xl">
        {/* Banner */}
        <div className="relative h-20 bg-gradient-to-br from-[#14284b] via-[#1d3866] to-[#2a4a80]">
          <span aria-hidden className="absolute -right-6 -top-8 h-28 w-28 rounded-full bg-white/5" />
          <span aria-hidden className="absolute -bottom-10 left-4 h-24 w-24 rounded-full bg-white/5" />
        </div>

        {/* Avatar */}
        <div className="relative z-10 mx-auto -mt-12 h-24 w-24 overflow-hidden rounded-full bg-white p-1 shadow-md ring-1 ring-line">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-orange-400 to-orange-600">
            {m.image ? (
              <SmartImage src={m.image} alt={`${m.name}, ${m.role}`} sizes="96px" className="transition-transform duration-700 group-hover:scale-110" />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-2xl font-semibold text-white">{initials(m.name)}</span>
            )}
          </div>
        </div>

        <div className="px-5 pb-6 pt-4">
          <h3 className="text-base font-bold leading-tight text-[#1c2a3a]">{m.name}</h3>
          <p className="mt-2 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">{m.role}</p>
        </div>
      </article>
    </Reveal>
  );
}
