import { images } from "./images";

export const posts = [
  {
    slug: "best-time-to-visit-kashmir",
    title: "Best Time to Visit Kashmir: A Season-by-Season Travel Guide",
    excerpt: "Spring tulips, summer meadows, golden autumn or winter snow — here is how to choose the right season for your Kashmir trip.",
    date: "2026-03-10",
    readTime: "6 min read",
    image: images.mountains,
    body: [
      { h: "Spring (March – May)", p: "Tulip gardens bloom in Srinagar from late March to April and the valley turns green. Days are mild, making this a lovely time for sightseeing." },
      { h: "Summer (June – August)", p: "Meadows in Gulmarg, Pahalgam and Sonamarg are at their best. It is the busiest season, so book hotels and gondola tickets early." },
      { h: "Autumn (September – November)", p: "Chinar leaves turn gold and red, skies are clear and crowds are thinner. A favourite among photographers." },
      { h: "Winter (December – February)", p: "Gulmarg becomes a snow destination for skiing and sledding. Pack heavy woollens and allow flexibility for weather." },
    ],
  },
  {
    slug: "kashmir-trip-planner",
    title: "Kashmir Trip Planner: How Many Days Do You Need?",
    excerpt: "A practical planner for 4, 6 and 8-day Kashmir itineraries with realistic travel times between valleys.",
    date: "2026-04-02",
    readTime: "5 min read",
    image: images.lakes,
    body: [
      { h: "4–5 days", p: "Cover Srinagar, Gulmarg and Pahalgam at a comfortable pace." },
      { h: "6–7 days", p: "Add Sonamarg or Doodhpathri and allow a full day on Dal Lake and in the old city." },
      { h: "8+ days", p: "Include offbeat valleys like Gurez or Bangus, or add slow luxury stays." },
    ],
  },
  {
    slug: "kashmir-travel-guide",
    title: "Kashmir Travel Guide: Getting There, Staying Comfortable, Eating Well",
    excerpt: "Practical advice on flights, local transport, what to pack and which Kashmiri dishes to try.",
    date: "2026-05-18",
    readTime: "7 min read",
    image: images.cuisine,
    body: [
      { h: "Getting there", p: "Srinagar International Airport has direct flights from major Indian cities. Road and rail links connect via Jammu and Udhampur." },
      { h: "Getting around", p: "A private vehicle with a local driver is the most comfortable way to travel between valleys." },
      { h: "What to eat", p: "Try Wazwan, Rogan Josh, Yakhni, Dum Aloo and a warm cup of Kahwa or Noon Chai." },
    ],
  },
];

export const getPost = (slug) => posts.find((p) => p.slug === slug);
