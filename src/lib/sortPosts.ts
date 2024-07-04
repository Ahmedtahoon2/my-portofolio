import { Post } from "@site/content";

/**
 * Sorts an array of posts by their published date in descending order.
 *
 * @param {Post[]} posts - The array of posts to be sorted.
 * @returns {Post[]} The sorted array of posts.
 *
 * @example
 * import { sortPosts } from './sortPosts';
 *
 * const posts = [
 *   { title: 'Post 1', date: '2023-01-01', published: true },
 *   { title: 'Post 2', date: '2023-02-15', published: false },
 *   { title: 'Post 3', date: '2023-03-10', published: true }
 * ];
 *
 * const sortedPosts = sortPosts(posts);
 * console.log(sortedPosts);
 * // Output: [{ title: 'Post 3', date: '2023-03-10', published: true }, { title: 'Post 1', date: '2023-01-01', published: true }]
 */
export function sortPosts(posts: Post[]): Post[] {
  return posts
    .filter(post => post.published)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
}
