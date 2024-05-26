import { Post } from "@site/content";

export function sortPosts(posts: Post[]): Post[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

