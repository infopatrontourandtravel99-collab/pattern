import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, text, align = "center", as: Tag = "h2" }) {
  const center = align === "center";
  return (
    <Reveal className={`mb-8 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-gold-dark">{eyebrow}</p>}
      <Tag className="font-serif text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">{title}</Tag>
      {text && <p className="mt-4 text-base leading-relaxed text-muted">{text}</p>}
    </Reveal>
  );
}
