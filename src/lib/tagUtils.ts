import { slug } from "github-slugger";
import { Post } from "@site/content";

export function getAllTags(posts: Post[]) {
  const tags: Record<string, number> = {};
  posts.forEach(post => {
    if (post.published) {
      post.tags?.forEach(tag => {
        tags[tag] = (tags[tag] ?? 0) + 1;
      });
    }
  });
  return tags;
}

export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
}

export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter(post => {
    if (!post.tags) return false;
    const slugifiedTags = post.tags.map(tag => slug(tag));
    return slugifiedTags.includes(tag);
  });
}
