"use client";

import { useState, useEffect, useMemo } from "react";
import PostItem from "@/components/atoms/PostItem";
import { posts } from "@site/content";
import { blogConfig } from "@/config/blog";
import { useBlogPagination } from "@/hooks/useBlogPagination";
import QueryPagination from "@/components/atoms/QueryPagination";
import { TagsSearch } from "@/components/atoms/TagsSearch";
import { getAllTags, getPostsByTagSlug, sortTagsByCount } from "@/lib/tagUtils";
import { SortOrder } from "@/lib/sortPosts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BlogPageProps {
  searchParams: {
    page?: string;
    tags?: string;
  };
}

export default function Page({ searchParams }: BlogPageProps) {
  const [selectedOrder, setSelectedOrder] = useState<SortOrder>(
    SortOrder.NewFirst
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const currentPage = Number(searchParams?.page) || 1;

  const tags = useMemo(() => getAllTags(posts), []);
  const sortedTags = useMemo(() => sortTagsByCount(tags), [tags]);

  useEffect(() => {
    if (searchParams.tags) {
      setSelectedTags(searchParams.tags.split(","));
    } else {
      setSelectedTags([]);
    }
  }, [searchParams.tags]);

  const filteredPosts = useMemo(() => {
    return selectedTags.length > 0
      ? getPostsByTagSlug(posts, selectedTags)
      : posts;
  }, [selectedTags]);

  const { totalPages, displayPosts } = useBlogPagination(
    filteredPosts,
    selectedOrder,
    blogConfig.POSTS_PER_PAGE,
    currentPage
  );

  return (
    <section className="container max-w-4xl py-6 lg:py-10">
      <div className="mb-4 flex flex-col gap-4">
        <h1 className="block text-4xl font-black lg:text-5xl">Posts</h1>
        <p className="text-muted-foreground text-xl">
          My ramblings on all things web dev.
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
      <ul className="mt-8 grid gap-10 sm:grid-cols-2">
        {displayPosts?.length > 0 ? (
          displayPosts.map(post => {
            return (
              <li key={post.slug}>
                <PostItem post={post} selectedTags={selectedTags} />
              </li>
            );
          })
        ) : (
          <p>Nothing to see here yet</p>
        )}
      </ul>
      <QueryPagination className="mt-6" totalPages={totalPages} />
    </section>
  );
}
