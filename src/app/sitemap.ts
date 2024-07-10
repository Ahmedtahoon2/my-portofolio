import { MetadataRoute } from "next";
import { posts } from "@site/content";
import { config } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = config.url;

  const blogRoutes = posts
    .filter(post => post.published)
    .map(post => ({
      url: `${siteUrl}/posts/${post.slugAsParams}`,
      lastModified: new Date(post.updated || post.date)
        .toISOString()
        .split("T")[0],
    }));

  const routes = ["", "about", "posts", "projects", "tags"].map(route => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogRoutes];
}
