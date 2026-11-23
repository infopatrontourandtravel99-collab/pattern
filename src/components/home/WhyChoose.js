import { Compass, BadgeCheck, Users, Car, Headset, ReceiptText } from "lucide-react";
import { slider3, slide } from "@/lib/slider";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";

const items = [
  { Icon: Compass, title: "Customized Kashmir Tours", text: "Every itinerary is tailored to your pace, interests and budget." },
  { Icon: BadgeCheck, title: "Verified Hotels", text: "Stays are personally checked for comfort, cleanliness and location." },
  { Icon: Users, title: "Experienced Local Travel Experts", text: "Planned by people who live in the Valley and know it deeply." },
  { Icon: Car, title: "Private Transportation", text: "Clean, comfortable vehicles with professional, courteous drivers." },
  { Icon: Headset, title: "24/7 Travel Assistance", text: "Reach a real person at any hour of your journey." },
  { Icon: ReceiptText, title: "Transparent Pricing", text: "Clear inclusions and no hidden charges after you confirm." },
];

export default function WhyChoose() {
  return (
    <section className="py-10 sm:py-14">
      <div className="container-x">
        <SectionHeading eyebrow="Why choose us" title="Travel with people you can trust" />
        <div className={slider3}>
          {items.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.07} className={slide}>
              <div className="lift h-full rounded-[1.5rem] border border-line bg-white p-7 card-shadow">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-gold-dark">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-serif text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
