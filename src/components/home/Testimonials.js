import { Star, Quote, MapPin } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import { testimonials } from "@/data/testimonials";
import { slider3, slide } from "@/lib/slider";

export default function Testimonials() {
  return (
    <section className="py-10 sm:py-14">
      <div className="container-x">
        <SectionHeading eyebrow="Testimonials" title="Words from our travellers" text="Sample reviews shown below — replace with genuine customer reviews before launch." />
        <div className={slider3}>
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className={slide}>
              <figure className="lift group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-[0_6px_24px_-8px_rgba(28,42,58,0.18)] transition-shadow duration-300 hover:shadow-[0_14px_34px_-10px_rgba(28,42,58,0.28)]">
                <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-[#e7c27d] to-gold" />
                <Quote size={64} aria-hidden className="absolute -right-2 top-3 rotate-180 fill-gold/10 text-gold/10" />

                <div className="relative flex items-center gap-2.5">
                  <div className="flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, n) => (
                      <Star key={n} size={16} className={n < t.rating ? "fill-[#f5a623] text-[#f5a623]" : "fill-line text-line"} />
                    ))}
                  </div>
                  <span className="rounded-full bg-sand px-2 py-0.5 text-xs font-semibold text-ink">{t.rating}.0</span>
                </div>

                <blockquote className="relative mt-4 flex-1 text-[15px] leading-relaxed text-[#2f3d4d]">“{t.text}”</blockquote>

                <figcaption className="relative mt-6 flex items-center gap-3 border-t border-line pt-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#14284b] text-base font-semibold text-white">
                    {t.name.split(" ").pop().charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <strong className="block truncate text-sm font-semibold text-ink">{t.name}</strong>
                    <span className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                      <MapPin size={12} className="text-gold-dark" /> {t.location}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
