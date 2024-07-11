import { config, siteConfig } from "@/config/site";
import { posts } from "@site/content";
import RSS from "rss";

export async function GET() {
  const siteUrl = config.url;

  const feedOptions: RSS.FeedOptions = {
    title: "Blog posts | RSS Feed",
    description: "Welcome to this blog posts!",
    site_url: siteUrl,
    feed_url: `${siteUrl}/api/rss.xml`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.author}`,
  };

  const feed = new RSS(feedOptions);

  posts.forEach(post => {
    feed.item({
      title: post.title,
      description: post.description || "",
      guid: post.slugAsParams,
      url: `${siteUrl}/posts/${post.slugAsParams}`,
      date: new Date(post.date),
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
