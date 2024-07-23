import { Project } from "@site/content";
import { SortOrder, sortItems } from "@/lib/sortItems";

interface PaginationResult {
  totalPages: number;
  displayProjects: Project[];
}

export const useProjectsPagination = (
  projects: Project[],
  selectedOrder: SortOrder,
  currentPage: number,
  projectsPerPage: number,
): PaginationResult => {
  const sortedProjects: Project[] = sortItems(projects, selectedOrder);

  const totalPages = Math.ceil(sortedProjects.length / projectsPerPage);

  const startIndex = (currentPage - 1) * projectsPerPage;
  const displayProjects = sortedProjects.slice(startIndex, startIndex + projectsPerPage);

  return {
    totalPages,
    displayProjects,
  };
};
