import { Post } from "@site/content";

/**
 * Enum for the sort order.
 * @readonly
 * @enum {string}
 */
export enum SortOrder {
  NewFirst = "new-first",
  OldFirst = "old-first",
}

/**
 * Sorts the posts based on the given order.
 *
 * @param {Post[]} posts - The list of posts to be sorted.
 * @param {SortOrder} orderBy - The order by which to sort the posts.
 * @returns {Post[]} The sorted list of posts.
 */
export function sortPosts(posts: Post[], orderBy: string): Post[] {
  // Filter posts to include only published ones
  const filteredPosts: Post[] = posts.filter(post => post.published);

  // Sort the posts based on the specified order
  return filteredPosts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    switch (orderBy) {
      case "new-first":
        return dateB - dateA;
      case "old-first":
        return dateA - dateB;
      default:
        return 0;
    }
  });
}
