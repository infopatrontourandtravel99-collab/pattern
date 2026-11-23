// Single place to swap images. Values are paths inside /public or https://images.unsplash.com URLs.
// Real photos supplied by the site owner; remaining keys fall back to generated SVG illustrations.
const P = {
  srinagarLake: "/images/srinagar-lake-shikara.png",
  redGondola: "/images/red-gondola-ski.png",
  turquoise: "/images/turquoise-river-peaks.png",
  lupine: "/images/lupine-meadow-horses.png",
  cabin: "/images/meadow-cabin-horses.png",
  sunrise: "/images/dal-lake-sunrise.png",
  river: "/images/alpine-valley-river.png",
  valley: "/images/golden-valley-horses.png",
  lounge: "/images/houseboat-lounge.png",
  romance: "/images/sunset-romance-shikara.png",
};

export const images = {
  hero: P.sunrise,
  // Category cards (portrait)
  mountains: "/images/cat-mountains.png",
  lakes: "/images/cat-lakes.png",
  adventure: "/images/cat-adventure.png",
  honeymoon: P.romance,
  categoryHoneymoon: "/images/cat-honeymoon.png",
  // Destinations
  srinagar: P.srinagarLake,
  gulmarg: P.redGondola,
  pahalgam: P.river,
  sonamarg: P.turquoise,
  doodhpathri: P.lupine,
  gurez: P.valley,
  bangus: P.cabin,
  yusmarg: P.river,
  // Experiences
  shikara: P.srinagarLake,
  houseboat: P.lounge,
  gondola: P.redGondola,
  snow: P.redGondola,
  cuisine: P.lounge,
  gardens: P.river,
  offbeat: P.valley,
  about: P.sunrise,
};
