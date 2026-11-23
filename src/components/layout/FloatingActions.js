import { Phone } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { siteConfig } from "@/config/site";
import { whatsappLink, generalMessage } from "@/lib/whatsapp";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-3 z-40 flex flex-col gap-3 sm:right-6">
      <a
        href={`tel:${siteConfig.contact.phoneHref}`}
        aria-label="Call us"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-ivory shadow-lg transition-transform hover:scale-105 lg:hidden"
      >
        <Phone size={20} />
      </a>
      <a
        href={whatsappLink(generalMessage())}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#1f9d57] sm:h-14 sm:w-14 text-white shadow-lg transition-transform hover:scale-105"
      >
        <span aria-hidden className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1f9d57] opacity-30" />
        <WhatsAppIcon size={26} className="relative" />
      </a>
    </div>
  );
}
