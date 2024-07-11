import { config } from "@/config/site";
import { posts } from "@site/content";

export async function GET() {
  const postsData = posts
    .filter(post => post.published)
    .map(post => ({
      title: post.title,
      description: post.description,
      tags: post.tags,
      date: new Date(post.updated || post.date).toISOString().split("T")[0],
      url: `${config.url}/posts/${post.slugAsParams}`,
      readingTime: post.readingTime.minutes,
    }));

  return new Response(JSON.stringify(postsData), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
