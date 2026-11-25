"use client";
import { usePathname } from "next/navigation";

// Hides the public header/footer on /admin pages.
export default function SiteChrome({ top, bottom, children }) {
  const admin = usePathname()?.startsWith("/admin");
  return (
    <>
      {!admin && top}
      <main id="main">{children}</main>
      {!admin && bottom}
    </>
  );
}
