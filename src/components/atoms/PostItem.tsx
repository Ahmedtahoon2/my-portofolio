import Link from "next/link";
import { Calendar, MoveRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { formatDate } from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/atoms/Tag";
import { Post } from "@site/content";
import { Picture } from "./postPicture";
import { Card } from "../ui/card";

export default function PostItem({ post }: { post: Post }) {
  const { slug, title, tags, description, date, image, imageDark } = post;
  return (
    <article className="flex flex-col">
      <Picture image={image} imageDark={imageDark} alt={title} className="rounded-t" />
      <Card className="rounded-t-none px-3">
        <div>
          <h2 className="my-3 line-clamp-2 text-2xl font-bold">
            <Link href={"/" + slug} aria-label={title}>
              {title}
            </Link>
          </h2>
        </div>
        <div className="flex gap-2">
          {tags?.map(tag => <Tag tag={tag} key={tag} />)}
        </div>
        <p className="text-muted-foreground my-3 line-clamp-2 max-w-none text-lg leading-normal">
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
            className={cn(buttonVariants({ variant: "link" }), "gap-1 p-0 pl-2")}
          >
            Read more <MoveRight className="pt-1" />
          </Link>
        </div>
      </Card>
    </article>
  );
}
