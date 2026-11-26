import PackageListPage from "@/components/packages/PackageListPage";
import { packagesByTag, getPhotos } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const path = "/kashmir-family-packages";
export async function generateMetadata() {
  return buildMetadata({
    title: "Kashmir Family Tour Packages – Comfortable Holidays with Kids",
    description: "Family-friendly Kashmir tour packages with shorter drives, spacious vehicles and verified hotels across Srinagar, Pahalgam, Gulmarg and Sonamarg.",
    path,
    image: (await getPhotos()).familyBanner,
  });
}

export default async function Page() {
  const photos = await getPhotos();
  const items = await packagesByTag("family");
  return (
    <PackageListPage
      h1="Kashmir Family Tour Packages"
      subtitle="Comfortable, flexible holidays designed for children, parents and grandparents alike."
      image={photos.familyBanner}
      crumbName="Family Packages"
      path={path}
      currentHref={path}
      items={items}
      intro="Family itineraries use shorter drives, spacious private vehicles and easy outdoor activities so everyone enjoys the journey."
    />
  );
}
