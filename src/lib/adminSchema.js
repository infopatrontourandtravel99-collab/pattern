import { teamGroups } from "@/data/team";
import { images } from "@/data/images";
import { packages as defaultPackages } from "@/data/packages";

// Describes every editable section of the admin panel.
// field types: text | textarea | image | list (items = nested fields)
export const adminSections = {
  settings: {
    title: "Contact & Social",
    desc: "Phone, email, addresses and social links (footer, contact page, call button).",
    fields: [
      { name: "phone1", label: "Phone 1", type: "text" },
      { name: "phone2", label: "Phone 2", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "headOffice", label: "Head office address", type: "textarea" },
      { name: "branchOffice", label: "Branch office address", type: "textarea" },
      { name: "hours", label: "Working hours", type: "text" },
      { name: "instagram", label: "Instagram link", type: "text" },
      { name: "facebook", label: "Facebook link", type: "text" },
      { name: "google", label: "Google link", type: "text" },
    ],
    defaults: {
      phone1: "+91 60059 28022",
      phone2: "+91 95962 79731",
      email: "infopatrontourandtravel99@gmail.com",
      headOffice: "Narayan Bagh, Ganderbal, Jammu & Kashmir 193501",
      branchOffice: "Naseem Bagh, Sopore, Jammu & Kashmir 193201",
      hours: "Daily, 8:00 AM – 10:00 PM IST",
      instagram: "https://www.instagram.com/patron_tour_and_travel",
      facebook: "https://www.facebook.com/share/1AVXT6ZVSy/",
      google: "https://share.google/WTCEcmdPGk4WruvJ5",
    },
  },
  home: {
    title: "Home page",
    desc: "Main banner heading, text, image and the 'Complete Kashmir' text.",
    fields: [
      { name: "heroImage", label: "Banner image", type: "image" },
      { name: "heroTitle", label: "Banner heading", type: "text" },
      { name: "heroText", label: "Banner text", type: "textarea" },
    ],
    defaults: {
      heroImage: images.hero,
      heroTitle: "Discover Kashmir, Beautifully",
      heroText: "Curated journeys through breathtaking landscapes, serene lakes and unforgettable mountain experiences.",
    },
  },
  about: {
    title: "About page",
    desc: "Our story text and image.",
    fields: [
      { name: "heroTitle", label: "Page title", type: "text" },
      { name: "heroSubtitle", label: "Page subtitle", type: "text" },
      { name: "heroImage", label: "Banner image", type: "image" },
      { name: "storyTitle", label: "Story heading", type: "text" },
      { name: "story1", label: "Story paragraph 1", type: "textarea" },
      { name: "story2", label: "Story paragraph 2", type: "textarea" },
      { name: "storyImage", label: "Story image", type: "image" },
    ],
    defaults: {
      heroTitle: "About Patron Tour And Travels",
      heroSubtitle: "Local people. Honest planning. Beautifully paced journeys.",
      heroImage: images.about,
      storyTitle: "Born in the Valley, built around your journey",
      story1: "Patron Tour And Travels was created by Kashmir locals who wanted visitors to experience Kashmir the way it deserves: slowly, comfortably and with genuine hospitality. We handle everything from hotel selection to private transport, so you can focus on the view.",
      story2: "Whether you are planning a honeymoon, a family holiday or an offbeat adventure, our team tailors each trip to your pace and budget, and stays reachable throughout your travels.",
      storyImage: images.about,
    },
  },
  team: {
    title: "Team",
    desc: "Add, remove or edit team members and their photos.",
    fields: [
      {
        name: "members",
        label: "Team members",
        type: "list",
        itemLabel: "name",
        items: [
          { name: "name", label: "Name", type: "text" },
          { name: "role", label: "Role", type: "text" },
          { name: "image", label: "Photo", type: "image" },
        ],
      },
    ],
    defaults: { members: teamGroups.flatMap((g) => g.members) },
  },
  packages: {
    title: "Tour Packages",
    desc: "Add, edit or delete tour packages: name, price, photo, itinerary, inclusions and more.",
    fields: [
      {
        name: "items",
        label: "Packages",
        type: "list",
        itemLabel: "title",
        items: [
          { name: "title", label: "Package name", type: "text" },
          { name: "slug", label: "Web address (auto-filled from the name if empty, e.g. kashmir-5-days)", type: "text" },
          { name: "duration", label: "Duration (e.g. 4 Nights / 5 Days)", type: "text" },
          { name: "price", label: "Starting price per person (₹)", type: "number" },
          { name: "route", label: "Route (places separated by · )", type: "text" },
          { name: "image", label: "Main photo", type: "image" },
          { name: "description", label: "Short description", type: "textarea" },
          { name: "tags", label: "Show in lists (comma separated: family, honeymoon, luxury)", type: "csv" },
          { name: "category", label: "Labels (comma separated: Family, Couples, Adventure…)", type: "csv" },
          { name: "inclusions", label: "Inclusions (one per line)", type: "lines" },
          { name: "exclusions", label: "Exclusions (one per line)", type: "lines" },
          {
            name: "itinerary",
            label: "Day-by-day itinerary",
            type: "list",
            itemLabel: "title",
            items: [
              { name: "day", label: "Day (e.g. Day 1)", type: "text" },
              { name: "title", label: "Title", type: "text" },
              { name: "text", label: "Details", type: "textarea" },
            ],
          },
        ],
      },
    ],
    defaults: { items: defaultPackages },
  },
};
