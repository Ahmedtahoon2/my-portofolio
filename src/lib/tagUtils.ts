import { slug } from "github-slugger";
import { Post } from "@site/content";

export function getAllTags(posts: Post[]): Record<string, number> {
  const tags = new Map<string, number>();

  posts.forEach(post => {
    if (post.published) {
      post.tags?.forEach(tag => {
        tags.set(tag, (tags.get(tag) ?? 0) + 1);
      });
    }
  });

  return Object.fromEntries(tags);
}

export function sortTagsByCount(tags: Record<string, number>): string[] {
  return Object.entries(tags)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([tag]) => tag);
}

export function getPostsByTagSlug(posts: Post[], tag: string): Post[] {
  const slugifiedTag = slug(tag);

  return posts.filter(post => {
    if (!post.tags) return false;
    return post.tags.some(postTag => slug(postTag) === slugifiedTag);
  });
}
