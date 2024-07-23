"use client";

import { useEffect, useMemo, useState } from "react";
import { SortOrder } from "@/lib/sortItems";
import { Project, projects } from "@site/content";
import { useProjectsPagination } from "@/hooks/useProjectsPagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProjectItem from "@/components/atoms/ProjectItem";
import QueryPagination from "@/components/atoms/QueryPagination";
import { getAllTags, sortItemsByTags, sortTagsByCount } from "@/lib/tagUtils";
import { TagsSearch } from "@/components/atoms/TagsSearch";

interface ProjectsPageProps {
  searchParams: {
    page?: string;
    tags?: string;
  };
}

export default function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const [selectedOrder, setSelectedOrder] = useState<SortOrder>(
    SortOrder.NewFirst
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const currentPage = useMemo(
    () => Number(searchParams?.page) || 1,
    [searchParams?.page]
  );

  const tags = useMemo(() => getAllTags(projects), []);
  const sortedTags = useMemo(() => sortTagsByCount(tags), [tags]);

  useEffect(() => {
    if (searchParams.tags) {
      setSelectedTags(searchParams.tags.split(","));
    } else {
      setSelectedTags([]);
    }
  }, [searchParams.tags]);

  const filteredProjects = useMemo(() => {
    return selectedTags.length > 0
      ? sortItemsByTags(projects, selectedTags)
      : projects;
  }, [selectedTags]);

  const { totalPages, displayProjects } = useProjectsPagination(
    filteredProjects,
    selectedOrder,
    currentPage,
    6
  );

  return (
    <section className="container max-w-4xl py-6 lg:py-10">
      <div className="mb-4 flex flex-col gap-4">
        <div className="flex justify-center">
          <div className="bg-foreground text-background inline-block w-fit rounded-lg px-3 py-1 text-sm">My Projects</div>
        </div>
        <h1 className="text-center text-4xl font-black transition-colors hover:text-orange-300 lg:text-5xl">Check out my latest work</h1>
        <p className="text-muted-foreground px-16 text-center md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          I&apos;ve worked on a variety of projects, from simple websites to complex
          web applications. Here are a few of my favorites.
        </p>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="select" className="text-base">
              Filter by
            </label>
            <div className="flex flex-col gap-2 md:flex-row">
              <Select
                onValueChange={(value: SortOrder) => setSelectedOrder(value)}
                defaultValue={SortOrder.NewFirst}
              >
                <SelectTrigger id="select" className="w-[180px] cursor-pointer">
                  <SelectValue placeholder="Newest first" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value={SortOrder.NewFirst}
                    className="cursor-pointer"
                  >
                    Newest first
                  </SelectItem>
                  <SelectItem
                    value={SortOrder.OldFirst}
                    className="cursor-pointer"
                  >
                    Oldest first
                  </SelectItem>
                </SelectContent>
              </Select>
              <TagsSearch tags={sortedTags} />
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <ul className="mt-8 flex flex-col gap-4">
        {displayProjects.map((project: Project) => (
          <li key={project.slug}>
            <ProjectItem project={project} selectedTags={selectedTags} />
          </li>
        ))}
      </ul>
      <QueryPagination className="mt-6" totalPages={totalPages} />
    </section>
  );
}
