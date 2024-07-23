"use client";

import { useState, useEffect, useMemo } from "react";
import PostItem from "@/components/atoms/PostItem";
import QueryPagination from "@/components/atoms/QueryPagination";
import { posts } from "@site/content";
import { blogConfig } from "@/config/blog";
import { usePostsPagination } from "@/hooks/usePostsPagination";
import { TagsSearch } from "@/components/atoms/TagsSearch";
import { getAllTags, sortItemsByTags, sortTagsByCount } from "@/lib/tagUtils";
import { SortOrder } from "@/lib/sortItems";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PostsPageProps {
  searchParams: {
    page?: string;
    tags?: string;
  };
}

const PostsPage = ({ searchParams }: PostsPageProps) => {
  const [selectedOrder, setSelectedOrder] = useState<SortOrder>(
    SortOrder.NewFirst
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const currentPage = useMemo(
    () => Number(searchParams?.page) || 1,
    [searchParams?.page]
  );

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
      ? sortItemsByTags(posts, selectedTags)
      : posts;
  }, [selectedTags]);

  const { totalPages, displayPosts } = usePostsPagination(
    filteredPosts,
    selectedOrder,
    currentPage,
    blogConfig.POSTS_PER_PAGE
  );

  return (
    <section className="container max-w-4xl py-6 lg:py-10">
      <div className="mb-4 flex flex-col gap-4">
        <div className="flex justify-center">
          <div className="bg-foreground text-background inline-block w-fit rounded-lg px-3 py-1 text-sm">Tech Insights & Articles</div>
        </div>
        <h1 className="block text-center text-4xl font-black transition-colors hover:text-orange-300 lg:text-5xl">
          My Posts
        </h1>
        <p className="text-muted-foreground px-16 text-center md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Discover a wealth of tech insights, tutorials, and in-depth articles
          covering web development, programming techniques, and industry trends.
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
          displayPosts.map(post => (
            <li key={post.slug}>
              <PostItem post={post} selectedTags={selectedTags} />
            </li>
          ))
        ) : (
          <p>Nothing to see here yet</p>
        )}
      </ul>
      <QueryPagination className="mt-6" totalPages={totalPages} />
    </section>
  );
};

export default PostsPage;
