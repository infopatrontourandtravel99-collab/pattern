import PackageListPage from "@/components/packages/PackageListPage";
import { packagesByTag, getPhotos } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const path = "/kashmir-honeymoon-packages";
export async function generateMetadata() {
  return buildMetadata({
    title: "Kashmir Honeymoon Packages – Romantic Dal Lake & Gulmarg Trips",
    description: "Romantic Kashmir honeymoon packages with houseboat stays, private shikara rides and mountain-view hotels in Srinagar, Gulmarg and Pahalgam.",
    path,
    image: (await getPhotos()).honeymoonBanner,
  });
}

export default async function Page() {
  const photos = await getPhotos();
  const items = await packagesByTag("honeymoon");
  return (
    <PackageListPage
      h1="Kashmir Honeymoon Packages"
      subtitle="Candlelit houseboat dinners, private shikara rides and quiet mountain mornings for two."
      image={photos.honeymoonBanner}
      crumbName="Honeymoon Packages"
      path={path}
      currentHref={path}
      items={items}
      intro="Our honeymoon journeys are paced for privacy and romance, with special touches arranged at every stay. Tell us your travel dates and we will shape the plan around you."
    />
  );
}
