import { Post } from "@site/content";
import { SortOrder, sortPosts } from "@/lib/sortPosts";

interface PaginationResult {
  totalPages: number;
  displayPosts: Post[];
}

export const useBlogPagination = (
  posts: Post[],
  selectedOrder: SortOrder,
  postsPerPage: number,
  currentPage: number
): PaginationResult => {
  const sortedPosts = sortPosts(posts, selectedOrder);

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;
  const displayPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  return {
    totalPages,
    displayPosts,
  };
};
