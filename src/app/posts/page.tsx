"use client";

import { useState } from "react";
import PostItem from "@/components/atoms/PostItem";
import { posts } from "@site/content";
import { blogConfig } from "@/config/blog";
import { useBlogPagination } from "@/hooks/useBlogPagination";
import QueryPagination from "@/components/atoms/QueryPagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/atoms/Tag";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getAllTags, sortTagsByCount } from "@/lib/tagUtils";
import { SortOrder } from "@/lib/sortPosts";

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default function Page({ searchParams }: BlogPageProps) {
  const [selectedOrder, setSelectedOrder] = useState<SortOrder>(
    SortOrder.NewFirst
  );

  const currentPage = Number(searchParams?.page) || 1;

  const { totalPages, displayPosts } = useBlogPagination(
    posts,
    selectedOrder,
    blogConfig.POSTS_PER_PAGE,
    currentPage
  );

  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-black lg:text-5xl">
            Posts
          </h1>
          <p className="text-muted-foreground text-xl">
            My ramblings on all things web dev.
          </p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-12 gap-3">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
              {displayPosts.map(post => {
                const { slug, title, description, date, tags } = post;
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      title={title}
                      description={description}
                      date={date}
                      tags={tags}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Nothing to see here yet</p>
          )}
          <QueryPagination className="mt-3" totalPages={totalPages} />
        </div>
        <div className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="select" className="text-base">
              Order by
            </label>
            <Select
              onValueChange={(value: SortOrder) => setSelectedOrder(value)}
              defaultValue={SortOrder.NewFirst}
            >
              <SelectTrigger id="select" className="w-[180px] cursor-pointer">
                <SelectValue placeholder="Newest first" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={SortOrder.NewFirst}>Newest first</SelectItem>
                <SelectItem value={SortOrder.OldFirst}>Oldest first</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {sortedTags?.map(tag => (
                <Tag tag={tag} key={tag} count={tags[tag]} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
