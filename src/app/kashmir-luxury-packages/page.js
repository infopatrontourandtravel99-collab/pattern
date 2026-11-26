import PackageListPage from "@/components/packages/PackageListPage";
import { packagesByTag, getPhotos } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const path = "/kashmir-luxury-packages";
export async function generateMetadata() {
  return buildMetadata({
    title: "Kashmir Luxury Tour Packages – 5-Star Stays & Private Chauffeur",
    description: "Luxury Kashmir tour packages with 5-star hotels, deluxe houseboat nights, private chauffeur and a dedicated trip manager.",
    path,
    image: (await getPhotos()).luxuryBanner,
  });
}

export default async function Page() {
  const photos = await getPhotos();
  const items = await packagesByTag("luxury");
  return (
    <PackageListPage
      h1="Kashmir Luxury Tour Packages"
      subtitle="Refined stays, private transport and unhurried experiences across the Valley."
      image={photos.luxuryBanner}
      crumbName="Luxury Packages"
      path={path}
      currentHref={path}
      items={items}
      intro="Our luxury Kashmir journeys combine the finest properties with private guides and seamless logistics, so you can simply enjoy the view."
    />
  );
}
