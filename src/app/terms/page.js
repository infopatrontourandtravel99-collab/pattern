import LegalPage from "@/components/common/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Booking, payment, cancellation and travel terms for Patron Tour And Travels tour packages.",
  path: "/terms",
});

const sections = [
  { h: "Bookings", p: "A booking is confirmed once we receive the agreed advance payment and send written confirmation." },
  { h: "Pricing", p: "Package prices are per person and may change with season, availability and group size. The final quote is what applies." },
  { h: "Cancellations", p: "Cancellation charges depend on how close to departure you cancel and on hotel and supplier policies, shared at the time of booking." },
  { h: "Weather and road conditions", p: "Itineraries may be adjusted for safety due to snow, landslides or other conditions outside our control." },
  { h: "Liability", p: "We act as an intermediary for third-party service providers and are not liable for events beyond our reasonable control." },
];

export default function Page() {
  return <LegalPage title="Terms & Conditions" path="/terms" sections={sections} />;
}
