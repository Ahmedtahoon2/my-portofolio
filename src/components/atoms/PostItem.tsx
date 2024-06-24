import Link from "next/link";
import { Calendar, MoveRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { formatDate } from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/atoms/Tag";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: Array<string>;
}

export default function PostItem({
  slug,
  title,
  description,
  date,
  tags,
}: PostItemProps) {
  return (
    <article className="flex flex-col border-b border-border py-3">
      <div>
        <h2 className="my-2 text-2xl font-bold">
          <Link href={"/" + slug} aria-label={title}>
            {title}
          </Link>
        </h2>
      </div>
      <div className="flex gap-2">
        {tags?.map(tag => <Tag tag={tag} key={tag} />)}
      </div>
      <p className="mt-2 line-clamp-2 max-w-none text-lg leading-normal text-muted-foreground">
        {description}
      </p>
      <div className="flex items-center justify-between">
        <dl>
          <dt className="sr-only">Published On</dt>
          <dd className="flex items-center gap-1 text-sm font-medium sm:text-base">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{formatDate(date)}</time>
          </dd>
        </dl>
        <Link
          href={"/" + slug}
          aria-label={title}
          className={cn(buttonVariants({ variant: "link" }), "gap-1 py-0")}
        >
          Read more <MoveRight className="pt-1" />
        </Link>
      </div>
    </article>
  );
}
