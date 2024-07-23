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
 * Sorts items based on the specified order.
 *
 * @param {any[]} items - The array of items to be sorted.
 * @param {string} orderBy - The order by which to sort the items. Should be one of "new-first" or "old-first".
 * @returns {any[]} The sorted array of items.
 */
export function sortItems(items: any[], orderBy: string): any[] {
  // Filter items to include only those that are published
  const filteredItems = items.filter(item => item?.published);

  // Sort items based on the specified order
  return filteredItems.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    switch (orderBy) {
      case SortOrder.NewFirst:
        return dateB - dateA;
      case SortOrder.OldFirst:
        return dateA - dateB;
      default:
        return 0;
    }
  });
}
