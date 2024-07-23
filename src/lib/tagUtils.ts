import { slug } from "github-slugger";

/**
 * Calculates the count of each tag from an array of posts.
 *
 * @param {Post[]} posts - The array of posts from which tags will be extracted.
 * @returns {Record<string, number>} A record where keys are tags and values are their counts.
 *
 * @example
 * import { getAllTags } from './tagsUtils';
 *
 * const posts = [
 *   { title: 'Post 1', tags: ['javascript', 'nodejs'], published: true },
 *   { title: 'Post 2', tags: ['typescript', 'nodejs'], published: true },
 *   { title: 'Post 3', tags: ['javascript'], published: false }
 * ];
 *
 * const tagsCount = getAllTags(posts);
 * console.log(tagsCount);
 * // Output: { 'javascript': 1, 'nodejs': 2, 'typescript': 1 }
 */
export function getAllTags(items: any[]): Record<string, number> {
  const tags = new Map<string, number>();

  items.forEach(post => {
    if (post.published) {
      post.tags?.forEach((tag: string) => {
        tags.set(tag, (tags.get(tag) ?? 0) + 1);
      });
    }
  });

  return Object.fromEntries(tags);
}

/**
 * Sorts tags by their count in descending order.
 *
 * @param {Record<string, number>} tags - The record of tags with their respective counts.
 * @returns {string[]} An array of tags sorted by their count in descending order.
 *
 * @example
 * import { sortTagsByCount } from './tagsUtils';
 *
 * const tagsCount = { 'javascript': 3, 'nodejs': 2, 'typescript': 1 };
 * const sortedTags = sortTagsByCount(tagsCount);
 * console.log(sortedTags);
 * // Output: [ 'javascript', 'nodejs', 'typescript' ]
 */
export function sortTagsByCount(tags: Record<string, number>): string[] {
  return Object.entries(tags)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([tag]) => tag);
}

/**
 * Retrieves items that have a specific tag (case-insensitive).
 *
 * @param {any[]} items - The array of items to search for the tag.
 * @param {string[]} tags - The tags to search for.
 * @returns {any[]} An array of items that have the specified tag.
 *
 * @example
 * import { sortItemsByTags } from './tagsUtils';
 *
 * const posts = [
 *   { title: 'Post 1', tags: ['JavaScript', 'Node.js'] },
 *   { title: 'Post 2', tags: ['TypeScript', 'Node.js'] },
 *   { title: 'Post 3', tags: ['JavaScript']}
 * ];
 *
 * const javascriptPosts = sortItemsByTags(posts, ['javascript']);
 * console.log(javascriptPosts);
 * // Output: [ { title: 'Post 1', tags: ['JavaScript', 'Node.js'], published: true }, { title: 'Post 3', tags: ['JavaScript'] } ]
 */
export function sortItemsByTags(items: any[], tags: string[]): any[] {
  const slugifiedTags = tags.map(tag => slug(tag));

  return items.filter(item => {
    if (!item.tags) return false;

    // Check if any of the item's tags match the slugified tags
    return item.tags.some((itemTag: string) => {
      const itemTagSlug = slug(itemTag);
      return slugifiedTags.includes(itemTagSlug);
    });
  });
}