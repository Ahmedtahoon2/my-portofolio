import { MetadataRoute } from "next";
import { config } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${config.url}/sitemap.xml`,
    host: config.url,
  };
}
