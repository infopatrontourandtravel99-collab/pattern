import SmartImage from "./SmartImage";
import Breadcrumbs from "./Breadcrumbs";

// Compact inner-page hero with H1 and breadcrumbs.
export default function PageHero({ title, subtitle, image, crumbs }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pt-32 pb-16 text-white sm:pt-40 sm:pb-24">
      <div className="absolute inset-0 -z-10">
        <SmartImage src={image} alt="" sizes="100vw" priority />
        <div className="absolute inset-0 bg-ink/55" />
      </div>
      <div className="container-x">
        <Breadcrumbs items={crumbs} light />
        <h1 className="mt-5 max-w-3xl font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
