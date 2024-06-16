import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteConfig.url,
  };
}
