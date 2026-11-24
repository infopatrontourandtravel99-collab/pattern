// Central site configuration — change brand, contact and API details here only.
export const siteConfig = {
  name: "Patron Tour And Travels",
  tagline: "Discover Kashmir, Beautifully.",
  description:
    "Curated Kashmir tour packages, private chauffeured journeys and handpicked stays across Srinagar, Gulmarg, Pahalgam and beyond.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.kashmirholidays.example",
  logo: { src: "/images/logo.jpg", text: "Patron Tour & Travels", sub: "Kashmir Specialists" },
  currency: "₹",
  contact: {
    // WhatsApp number: country code + number, digits only (no + or spaces)
    whatsapp: "916005928022",
    phone: "+91 60059 28022",
    phoneHref: "+916005928022",
    phones: [
      { display: "+91 60059 28022", href: "+916005928022" },
      { display: "+91 95962 79731", href: "+919596279731" },
    ],
    email: "infopatrontourandtravel99@gmail.com",
    address: "Head Office: Narayan Bagh, Ganderbal, Jammu & Kashmir 193501",
    addresses: [
      { label: "Head Office", text: "Narayan Bagh, Ganderbal, Jammu & Kashmir 193501" },
      { label: "Branch Office", text: "Naseem Bagh, Sopore, Jammu & Kashmir 193201" },
    ],
    hours: "Daily, 8:00 AM – 10:00 PM IST",
  },
  social: {
    instagram: "https://www.instagram.com/patron_tour_and_travel",
    facebook: "https://www.facebook.com/share/1AVXT6ZVSy/",
    google: "https://share.google/WTCEcmdPGk4WruvJ5",
  },
  // Homepage stats bar. SAMPLE FIGURES — replace with your real numbers before launch.
  stats: [
    { icon: "trips", value: "10K+", label: "Trips Planned" },
    { icon: "travelers", value: "50K+", label: "Happy Travelers" },
    { icon: "rating", value: "4.8", label: "Average Rating" },
    { icon: "hotels", value: "200+", label: "Partner Hotels" },
  ],
  // Future PHP/MySQL backend. Leave empty to use the built-in /api/enquiry route.
  // Example: "https://api.kashmirholidays.example/v1"
  phpApiBase: process.env.NEXT_PUBLIC_PHP_API_BASE || "",
  nav: [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: "Tour Packages", href: "/kashmir-tour-packages" },
    { label: "Vehicles", href: "/vehicles" },
    { label: "Experiences", href: "/experiences" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};
