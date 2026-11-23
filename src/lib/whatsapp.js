import { siteConfig } from "@/config/site";

export function whatsappLink(message = "") {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${siteConfig.contact.whatsapp}${text}`;
}

export const packageMessage = (pkg, extra = {}) =>
  [
    `Hello ${siteConfig.name}, I would like to enquire about the "${pkg.title}" (${pkg.duration}).`,
    extra.date && `Travel date: ${extra.date}`,
    extra.travelers && `Travelers: ${extra.travelers}`,
    extra.name && `Name: ${extra.name}`,
    extra.message && `Notes: ${extra.message}`,
  ]
    .filter(Boolean)
    .join("\n");

export const destinationMessage = (d) =>
  `Hello ${siteConfig.name}, I am planning a trip to ${d.name}. Could you suggest a tour plan and pricing?`;

export const generalMessage = (extra = {}) =>
  [
    `Hello ${siteConfig.name}, I would like help planning a Kashmir trip.`,
    extra.destination && `Destination: ${extra.destination}`,
    extra.date && `Travel date: ${extra.date}`,
    extra.travelers && `Travelers: ${extra.travelers}`,
    extra.name && `Name: ${extra.name}`,
    extra.message && `Notes: ${extra.message}`,
  ]
    .filter(Boolean)
    .join("\n");

export const vehicleMessage = (v) =>
  `Hello ${siteConfig.name}, I would like a quote for the ${v.name} (${v.type}). Please share the rate for my trip.`;
