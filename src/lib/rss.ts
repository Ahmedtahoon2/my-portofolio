import { config } from "@/config/site";
import { Post } from "@site/content";
import RSS from "rss";
import fs from "fs";
import path from "path";

export async function generateRssFeed(posts: Post[]): Promise<void> {
  const siteUrl = config.url;

  const feedOptions: RSS.FeedOptions = {
    title: "Blog posts | RSS Feed",
    description: "Welcome to this blog posts!",
    site_url: siteUrl,
    feed_url: `${siteUrl}/rss.xml`,
    image_url: `${siteUrl}/images/logo/logo-black.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  };

  const feed = new RSS(feedOptions);

  posts.forEach(post => {
    feed.item({
      title: post.title,
      description: post.description || "",
      url: `${siteUrl}/posts/${post.slug}`,
      date: post.date,
    });
  });

  // Define the path for the RSS feed file.
  const rssPath = path.join(process.cwd(), "public", "rss.xml");

  try {
    // Write the RSS feed to a file as XML.
    fs.writeFileSync(rssPath, feed.xml({ indent: true }));
  } catch (error) {
    console.error(`Failed to write RSS feed file: ${error}`);
  }
}
