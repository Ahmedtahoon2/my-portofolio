import { siteConfig } from "@/config/site";

export function formatDate(date: string | number): string {
  return new Date(date).toLocaleDateString(siteConfig.geolocation.locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
