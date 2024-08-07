"use client";

import Link from "next/link";
import { Calendar, MoveRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { formatDate } from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/atoms/Tag";
import { Post } from "@site/content";
import { Picture } from "./Picture";
import { Card } from "../ui/card";

export default function PostItem({
  post,
  selectedTags,
}: {
  post: Post;
  selectedTags: string[];
}) {
  const { slug, title, tags, description, date, image, imageDark } = post;
  return (
    <article className="hover:border-primary flex flex-col overflow-hidden rounded-md border transition-all duration-100 ease-in-out">
      <Link href={"/" + slug} aria-label={title}>
        <Picture
          image={image}
          imageDark={imageDark}
          alt={title}
        />
        <Card className="rounded-md px-3">
          <div>
            <h2 className="my-3 line-clamp-2 text-2xl font-bold">{title}</h2>
          </div>
          <div className="flex gap-2">
            {tags?.map(tag => (
              <Tag path="posts" tag={tag} key={tag} current={selectedTags.includes(tag)} />
            ))}
          </div>
          <p className="text-muted-foreground mt-3 line-clamp-2 max-w-none text-lg leading-normal">
            {description}
          </p>
          <div className="mb-2 flex items-center justify-between">
            <dl>
              <dt className="sr-only">Published On</dt>
              <dd className="flex items-center gap-1 text-sm font-medium sm:text-base">
                <Calendar className="size-4" />
                <time dateTime={date}>{formatDate(date)}</time>
              </dd>
            </dl>
            <Link
              href={"/" + slug}
              aria-label={title}
              className={cn(
                buttonVariants({ variant: "link" }),
                "gap-1 p-0 pl-2"
              )}
            >
              Read more <MoveRight className="pt-1" />
            </Link>
          </div>
        </Card>
      </Link>
    </article>
  );
}
