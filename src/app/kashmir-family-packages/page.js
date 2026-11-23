import PackageListPage from "@/components/packages/PackageListPage";
import { byTag } from "@/data/packages";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";

const path = "/kashmir-family-packages";
export const metadata = buildMetadata({
  title: "Kashmir Family Tour Packages – Comfortable Holidays with Kids",
  description: "Family-friendly Kashmir tour packages with shorter drives, spacious vehicles and verified hotels across Srinagar, Pahalgam, Gulmarg and Sonamarg.",
  path,
  image: images.gardens,
});

export default function Page() {
  return (
    <PackageListPage
      h1="Kashmir Family Tour Packages"
      subtitle="Comfortable, flexible holidays designed for children, parents and grandparents alike."
      image={images.gardens}
      crumbName="Family Packages"
      path={path}
      currentHref={path}
      items={byTag("family")}
      intro="Family itineraries use shorter drives, spacious private vehicles and easy outdoor activities so everyone enjoys the journey."
    />
  );
}
