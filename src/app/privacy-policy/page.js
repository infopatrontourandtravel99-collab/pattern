import LegalPage from "@/components/common/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Patron Tour And Travels collects, uses and protects your personal information when you enquire or book.",
  path: "/privacy-policy",
});

const sections = [
  { h: "Information we collect", p: "When you submit an enquiry we collect your name, phone number, email, travel dates, group size and any message you provide." },
  { h: "How we use it", p: "We use your details only to respond to your enquiry, prepare quotes, arrange bookings and provide travel support." },
  { h: "Sharing", p: "We share necessary details with hotels, drivers and activity providers to fulfil your booking. We do not sell personal data." },
  { h: "WhatsApp", p: "Choosing to message us on WhatsApp is subject to WhatsApp's own privacy policy." },
  { h: "Your rights", p: "You may request access, correction or deletion of your data by contacting us at the email listed on the contact page." },
];

export default function Page() {
  return <LegalPage title="Privacy Policy" path="/privacy-policy" sections={sections} />;
}
