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
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const sortedPosts = sortPosts(posts, selectedOrder);

  const startIndex = (currentPage - 1) * postsPerPage;

  const displayPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  return {
    totalPages,
    displayPosts,
  };
};
