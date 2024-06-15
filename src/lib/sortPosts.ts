import { Post } from "@site/content";

export function sortPosts(posts: Post[]): Post[] {
  return posts
    .filter(post => post.published)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
}
