import PackageListPage from "@/components/packages/PackageListPage";
import { byTag } from "@/data/packages";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";

const path = "/kashmir-honeymoon-packages";
export const metadata = buildMetadata({
  title: "Kashmir Honeymoon Packages – Romantic Dal Lake & Gulmarg Trips",
  description: "Romantic Kashmir honeymoon packages with houseboat stays, private shikara rides and mountain-view hotels in Srinagar, Gulmarg and Pahalgam.",
  path,
  image: images.honeymoon,
});

export default function Page() {
  return (
    <PackageListPage
      h1="Kashmir Honeymoon Packages"
      subtitle="Candlelit houseboat dinners, private shikara rides and quiet mountain mornings for two."
      image={images.honeymoon}
      crumbName="Honeymoon Packages"
      path={path}
      currentHref={path}
      items={byTag("honeymoon")}
      intro="Our honeymoon journeys are paced for privacy and romance, with special touches arranged at every stay. Tell us your travel dates and we will shape the plan around you."
    />
  );
}
