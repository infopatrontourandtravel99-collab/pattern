import { images } from "./images";

export const destinations = [
  {
    slug: "srinagar",
    badge: "Must Visit",
    name: "Srinagar",
    tagline: "Lakes, gardens and houseboats",
    image: images.srinagar,
    bestTime: "April – October",
    idealStay: "2–3 nights",
    altitude: "1,585 m",
    summary:
      "Srinagar is the summer capital of Kashmir, set around the calm waters of Dal Lake and lined with Mughal gardens, wooden shrines and old-city bazaars.",
    overview:
      "Spend slow mornings on a shikara among floating vegetable gardens, wander through Nishat and Shalimar Bagh, and end the day on a houseboat deck with kahwa as the light fades behind the Zabarwan range. The old city rewards walkers with papier-mâché workshops, Pashmina ateliers and the timber architecture of Khanqah-e-Moula.",
    highlights: ["Dal Lake shikara ride", "Mughal Gardens", "Luxury houseboat stay", "Old city & Jama Masjid", "Shankaracharya Temple viewpoint", "Wazwan dinner"],
    faqs: [
      { q: "How many days are enough for Srinagar?", a: "Two to three nights lets you cover Dal Lake, the Mughal Gardens and the old city without rushing." },
      { q: "Is a houseboat stay worth it?", a: "Yes. A night on Dal Lake is one of the signature Kashmir experiences, especially at sunrise and sunset." },
    ],
  },
  {
    slug: "gulmarg",
    badge: "Snow Favourite",
    name: "Gulmarg",
    tagline: "Meadow of flowers, slopes of snow",
    image: images.gulmarg,
    bestTime: "December – March (snow), May – September (meadows)",
    idealStay: "1–2 nights",
    altitude: "2,650 m",
    summary:
      "Gulmarg is a high-altitude meadow resort known for the Gulmarg Gondola, winter skiing and wide alpine views toward Nanga Parbat.",
    overview:
      "In winter the bowl turns into one of India's best ski and snowboard destinations. In summer it becomes a carpet of wildflowers with pony rides, golf and easy walks to Alpather Lake. The two-phase gondola climbs close to 4,000 metres for panoramic Himalayan views.",
    highlights: ["Gulmarg Gondola (Phase 1 & 2)", "Skiing & snowboarding", "Strawberry Valley", "Alpather Lake trek", "Maharani Temple", "Sledding"],
    faqs: [
      { q: "Does Gulmarg get snow?", a: "Usually from December to March. Dates vary each year, so ask us for current conditions before you travel." },
      { q: "Should I pre-book the gondola?", a: "Yes, especially in peak season. We handle gondola ticketing for our guests." },
    ],
  },
  {
    slug: "pahalgam",
    badge: "Family Favourite",
    name: "Pahalgam",
    tagline: "Valley of shepherds",
    image: images.pahalgam,
    bestTime: "April – October",
    idealStay: "2 nights",
    altitude: "2,200 m",
    summary:
      "Pahalgam sits where the Lidder River meets pine forests and green meadows, making it a favourite for families, couples and gentle trekkers.",
    overview:
      "Base yourself beside the river and take day trips to Betaab Valley, Aru Valley and Chandanwari. Pony rides, riverside picnics and short forest walks fill the days, while the evenings are cool and quiet.",
    highlights: ["Betaab Valley", "Aru Valley", "Baisaran meadow", "Lidder River walks", "Chandanwari", "Riverside stay"],
    faqs: [
      { q: "Is Pahalgam suitable for families with children?", a: "Yes. Most sights are accessible by car and short pony rides, with gentle terrain." },
      { q: "Can we combine Pahalgam with Srinagar?", a: "Absolutely. It is a 3 to 3.5 hour drive from Srinagar and part of most of our itineraries." },
    ],
  },
  {
    slug: "sonamarg",
    badge: "Scenic Pick",
    name: "Sonamarg",
    tagline: "Meadow of gold",
    image: images.sonamarg,
    bestTime: "May – September",
    idealStay: "Day trip or 1 night",
    altitude: "2,800 m",
    summary:
      "Sonamarg is a glacier-fed valley beside the Sindh River, gateway to Thajiwas Glacier and the high alpine lakes of the Great Lakes region.",
    overview:
      "A pony ride to Thajiwas Glacier is the classic outing. Trekkers use Sonamarg as the base for the Kashmir Great Lakes trek, while others simply enjoy the river, the apple-green meadows and the dramatic mountain walls.",
    highlights: ["Thajiwas Glacier", "Sindh River", "Zoji La views", "Krishansar & Vishansar trek base", "Trout fishing", "Alpine picnics"],
    faqs: [
      { q: "Can Sonamarg be done as a day trip?", a: "Yes, from Srinagar it is roughly 2.5 to 3 hours each way. An overnight stay is more relaxed." },
    ],
  },
  {
    slug: "doodhpathri",
    badge: "Offbeat",
    name: "Doodhpathri",
    tagline: "Valley of milk",
    image: images.doodhpathri,
    bestTime: "April – October",
    idealStay: "Day trip",
    altitude: "2,730 m",
    summary:
      "Doodhpathri is an unspoilt pine-fringed meadow in Budgam, known for the milky stream that runs through it and its quiet, offbeat character.",
    overview:
      "Less visited than Gulmarg or Pahalgam, Doodhpathri is ideal for travellers who want open grassland, forest walks and a peaceful picnic. It is an easy day out from Srinagar, roughly two hours by road.",
    highlights: ["Shaliganga stream", "Pine forest walks", "Meadow picnics", "Photography", "Local village food"],
    faqs: [{ q: "Is Doodhpathri open all year?", a: "Access can be limited during heavy winter snowfall. Summer and autumn are the best seasons." }],
  },
  {
    slug: "gurez-valley",
    badge: "Hidden Gem",
    name: "Gurez Valley",
    tagline: "Kashmir's hidden frontier",
    image: images.gurez,
    bestTime: "June – September",
    idealStay: "2 nights",
    altitude: "2,400 m",
    summary:
      "Gurez is a remote Himalayan valley along the Kishanganga River, famous for Habba Khatoon peak and traditional Dard-Shin villages.",
    overview:
      "The journey over Razdan Pass is part of the experience. Expect wooden villages, turquoise river water and almost no crowds. Permits are required for non-local visitors, which we arrange for our guests.",
    highlights: ["Razdan Pass", "Habba Khatoon Peak", "Kishanganga River", "Tulail Valley", "Dawar village", "Village homestays"],
    faqs: [{ q: "Do I need a permit for Gurez?", a: "Yes. Permit requirements change, so we confirm and arrange the current paperwork for you." }],
  },
  {
    slug: "bangus-valley",
    badge: "Offbeat",
    name: "Bangus Valley",
    tagline: "Kashmir's largest meadow",
    image: images.bangus,
    bestTime: "June – September",
    idealStay: "1–2 nights",
    altitude: "2,500 m",
    summary:
      "Bangus Valley is a vast open meadow in Kupwara district, surrounded by deodar forests and mountain ridges, still largely off the tourist circuit.",
    overview:
      "A great choice for offbeat travellers: wide-open grassland, short treks, camping and wildflower season in early summer. Facilities are simple, so it suits flexible, nature-loving guests.",
    highlights: ["Open alpine meadow", "Camping", "Short treks", "Wildflowers", "Stargazing", "Village culture"],
    faqs: [{ q: "Is Bangus Valley suitable for first-time visitors?", a: "It suits travellers who enjoy offbeat experiences. First-timers often pair it with Srinagar and Gulmarg." }],
  },
  {
    slug: "yusmarg",
    badge: "Day Trip",
    name: "Yusmarg",
    tagline: "Meadow of Jesus",
    image: images.yusmarg,
    bestTime: "April – October",
    idealStay: "Day trip",
    altitude: "2,400 m",
    summary:
      "Yusmarg is a gentle green meadow in Budgam, reached through pine forests and an easy drive from Srinagar, perfect for a relaxed day out.",
    overview:
      "Gentle walks, the Nilnag Lake and open grassy slopes make Yusmarg an uncomplicated, family-friendly retreat. It pairs well with Doodhpathri on a longer Budgam day.",
    highlights: ["Nilnag Lake", "Pine forests", "Gentle walks", "Picnics", "Photography"],
    faqs: [{ q: "How far is Yusmarg from Srinagar?", a: "About 47 km, roughly 1.5 to 2 hours by road." }],
  },
];

export const getDestination = (slug) => destinations.find((d) => d.slug === slug);
