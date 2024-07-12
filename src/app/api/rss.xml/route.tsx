import { config, siteConfig } from "@/config/site";
import { posts } from "@site/content";
import RSS from "rss";

export async function GET() {
  try {
    const siteUrl = config.url;

    const feedOptions = {
      title: "Blog posts | RSS Feed",
      description: "Welcome to this blog posts!",
      site_url: siteUrl,
      feed_url: `${siteUrl}/api/rss.xml`,
      pubDate: new Date().toUTCString(),
      copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.author}`,
    };

    const feed = new RSS(feedOptions);

    for (const post of posts) {
      if (post.published) {
        feed.item({
          title: post.title,
          description: post.description || "",
          guid: post.slugAsParams,
          url: `${siteUrl}/posts/${post.slugAsParams}`,
          date: new Date(post.date).toUTCString(),
        });
      }
    }

    return new Response(feed.xml({ indent: true }), {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
