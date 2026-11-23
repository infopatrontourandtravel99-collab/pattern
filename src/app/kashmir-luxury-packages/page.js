import PackageListPage from "@/components/packages/PackageListPage";
import { byTag } from "@/data/packages";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";

const path = "/kashmir-luxury-packages";
export const metadata = buildMetadata({
  title: "Kashmir Luxury Tour Packages – 5-Star Stays & Private Chauffeur",
  description: "Luxury Kashmir tour packages with 5-star hotels, deluxe houseboat nights, private chauffeur and a dedicated trip manager.",
  path,
  image: images.houseboat,
});

export default function Page() {
  return (
    <PackageListPage
      h1="Kashmir Luxury Tour Packages"
      subtitle="Refined stays, private transport and unhurried experiences across the Valley."
      image={images.houseboat}
      crumbName="Luxury Packages"
      path={path}
      currentHref={path}
      items={byTag("luxury")}
      intro="Our luxury Kashmir journeys combine the finest properties with private guides and seamless logistics, so you can simply enjoy the view."
    />
  );
}
