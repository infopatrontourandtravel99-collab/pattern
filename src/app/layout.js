import { Poppins } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import SiteChrome from "@/components/layout/SiteChrome";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, travelAgencySchema } from "@/lib/seo";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-poppins", display: "swap" });

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | Kashmir Tour Packages & Holiday Planner`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  icons: { icon: "/images/logo.jpg", apple: "/images/logo.jpg" },
  openGraph: { siteName: siteConfig.name, type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

export const viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={travelAgencySchema()} />
        <SiteChrome top={<Header />} bottom={<><Footer /><FloatingActions /></>}>{children}</SiteChrome>
      </body>
    </html>
  );
}
