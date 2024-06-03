import { Post } from "@site/content";

export function sortPosts(posts: Post[]): Post[] {
  const sortedPosts = posts.filter(post => post.published);
  return sortedPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
