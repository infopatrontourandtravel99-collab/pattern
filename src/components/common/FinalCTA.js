import {  } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import SmartImage from "@/components/common/SmartImage";
import Button from "@/components/common/Button";
import { images } from "@/data/images";
import { whatsappLink, generalMessage } from "@/lib/whatsapp";

export default function FinalCTA({ heading = "Ready to Discover the Magic of Kashmir?", text = "Let us create a beautiful Kashmir journey designed around your travel style." }) {
  return (
    <section className="py-10 sm:py-14">
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-[2.25rem] bg-ink px-6 py-16 text-center text-white sm:px-12 sm:py-24">
          <div className="absolute inset-0 -z-10">
            <SmartImage src={images.lakes} alt="" sizes="100vw" />
            <div className="absolute inset-0 bg-ink/65" />
          </div>
          <h2 className="mx-auto max-w-3xl font-serif text-2xl font-bold leading-tight sm:text-4xl">{heading}</h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/85 sm:text-lg">{text}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" variant="light">Plan Your Trip</Button>
            <Button href={whatsappLink(generalMessage())} external variant="whatsapp"><WhatsAppIcon size={18} /> Chat on WhatsApp</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
