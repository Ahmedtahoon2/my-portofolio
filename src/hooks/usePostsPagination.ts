import { Post } from "@site/content";
import { SortOrder, sortItems } from "@/lib/sortItems";

interface PaginationResult {
  totalPages: number;
  displayPosts: Post[];
}

export const usePostsPagination = (
  posts: Post[],
  selectedOrder: SortOrder,
  currentPage: number,
  postsPerPage: number,
): PaginationResult => {
  const sortedPosts: Post[] = sortItems(posts, selectedOrder);

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;
  const displayPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  return {
    totalPages,
    displayPosts,
  };
};
