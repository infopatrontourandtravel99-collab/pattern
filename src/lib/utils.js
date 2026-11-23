import { siteConfig } from "@/config/site";

export const cn = (...c) => c.filter(Boolean).join(" ");
export const formatPrice = (n) => `${siteConfig.currency}${Number(n).toLocaleString("en-IN")}`;
export const absoluteUrl = (path = "/") => `${siteConfig.url.replace(/\/$/, "")}${path}`;
