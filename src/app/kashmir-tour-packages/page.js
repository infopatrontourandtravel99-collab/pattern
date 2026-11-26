import PackageListPage from "@/components/packages/PackageListPage";
import JsonLd from "@/components/seo/JsonLd";
import { getPackages, getPhotos } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

const path = "/kashmir-tour-packages";
export async function generateMetadata() {
  return buildMetadata({
    title: "Kashmir Tour Packages 2026 – Holiday Packages from ₹18,500",
    description: "Browse Kashmir holiday packages from 5 to 8 days covering Srinagar, Gulmarg, Pahalgam and Sonamarg with private transport and verified stays.",
    path,
    image: (await getPhotos()).packagesBanner,
  });
}

export default async function Page() {
  const photos = await getPhotos();
  const packages = await getPackages();
  const list = { "@context": "https://schema.org", "@type": "ItemList", itemListElement: packages.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/packages/${p.slug}`), name: p.title })) };
  return (
    <>
      <JsonLd data={list} />
      <PackageListPage
        h1="Kashmir Tour Packages"
        subtitle="Curated Kashmir holiday packages with private transport, verified stays and local experts."
        image={photos.packagesBanner}
        crumbName="Tour Packages"
        path={path}
        currentHref={path}
        items={packages}
        intro="Every Kashmir tour package below can be customised: add nights, upgrade hotels, swap destinations or build a trip from scratch. Starting prices are per person and shown as samples; message us for an exact quote for your dates."
      />
    </>
  );
}
