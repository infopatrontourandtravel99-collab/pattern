import Link from "next/link";
import { Mail, MapPin, Phone, Camera, Share2, PlayCircle } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { siteConfig } from "@/config/site";
import { destinations } from "@/data/destinations";
import { packages } from "@/data/packages";
import { whatsappLink, generalMessage } from "@/lib/whatsapp";
import Logo from "./Logo";

const quick = [
  ...siteConfig.nav.filter((n) => n.href !== "/"),
  { label: "Blog", href: "/blog" },
];

export default function Footer() {
  const c = siteConfig.contact;
  const socials = [
    { label: "Instagram", href: siteConfig.social.instagram, Icon: Camera },
    { label: "Facebook", href: siteConfig.social.facebook, Icon: Share2 },
    { label: "YouTube", href: siteConfig.social.youtube, Icon: PlayCircle },
  ];
  return (
    <footer className="mt-10 bg-ink text-ivory/80">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            {siteConfig.name} designs private, thoughtfully paced journeys through the valleys, lakes and mountains of Kashmir.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-gold hover:text-gold">
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-lg text-white">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            {quick.map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:text-gold">{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-lg text-white">Destinations</h3>
          <ul className="space-y-2.5 text-sm">
            {destinations.slice(0, 6).map((d) => (
              <li key={d.slug}><Link href={`/destinations/${d.slug}`} className="hover:text-gold">{d.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-lg text-white">Tour Packages</h3>
          <ul className="space-y-2.5 text-sm">
            {packages.slice(0, 5).map((p) => (
              <li key={p.slug}><Link href={`/packages/${p.slug}`} className="hover:text-gold">{p.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-lg text-white">Contact</h3>
          <ul className="space-y-3 text-sm">
            {c.addresses.map((a) => (
              <li key={a.label} className="flex gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-gold" /><span><strong className="block font-medium text-white">{a.label}</strong>{a.text}</span></li>
            ))}
            {c.phones.map((p) => (
              <li key={p.href} className="flex gap-3"><Phone size={17} className="shrink-0 text-gold" /><a href={`tel:${p.href}`} className="hover:text-gold">{p.display}</a></li>
            ))}
            <li className="flex gap-3"><Mail size={17} className="shrink-0 text-gold" /><a href={`mailto:${c.email}`} className="hover:text-gold">{c.email}</a></li>
            <li className="flex gap-3"><WhatsAppIcon size={17} className="shrink-0 text-gold" /><a href={whatsappLink(generalMessage())} target="_blank" rel="noopener noreferrer" className="hover:text-gold">Chat on WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-gold">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
