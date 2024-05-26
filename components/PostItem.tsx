import Link from "next/link";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatDate";
import { buttonVariants } from "./ui/button";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: string[];
}

function PostItem({ slug, title, description, date, tags }: PostItemProps) {
  return (
    <article className="flex flex-col gap-2 border-border border-b py-3">
      <Link href={"/" + slug}>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="max-w-none text-muted-foreground">{description}</p>
      </Link>
      <div className="flex justify-between items-center">
        <dl>
          <dt className="sr-only">Published On</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{formatDate(date)}</time>
          </dd>
        </dl>
        <Link
          href={"/" + slug}
          className={cn(buttonVariants({ variant: "link" }), "py-0")}
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}

export default PostItem;
