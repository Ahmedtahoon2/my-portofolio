import Link from "next/link";
import { StepForward } from "lucide-react";
import { Project } from "@site/content";
import { formatDate } from "@/lib/formatDate";
import { Picture } from "./Picture";
import { Tag } from "./Tag";

export default function ProjectItem({
  project,
  selectedTags,
}: {
  project: Project;
  selectedTags: string[];
}) {
  const { slug, title, tags, description, date, image, imageDark } = project;
  return (
    <section className="flex justify-between gap-2 overflow-hidden rounded-2xl border border-b-8 px-4 py-3">
      <div className="flex w-full flex-col gap-4 lg:w-3/5">
        <Link
          href={"/" + slug}
          aria-label={title}
          className="group/link space-y-2"
        >
          <div className="inline-flex items-center gap-1">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-heading text-xl font-semibold">{title}</h3>
              <span className="bg-secondary rounded px-2 py-1 text-xs">
                <time dateTime={date}>{formatDate(date)}</time>
              </span>
            </div>
            <span className="-translate-x-1 opacity-0 transition-all duration-100 ease-in-out group-hover/link:translate-x-0 group-hover/link:opacity-100">
              <StepForward size={20} />
            </span>
          </div>
          <p className="text-muted-foreground line-clamp-4 max-w-xl">
            {description}
          </p>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          {tags?.map(tag => (
            <Tag
              path="projects"
              tag={tag}
              key={tag}
              current={selectedTags.includes(tag)}
            />
          ))}
        </div>
      </div>
      <div className="hidden aspect-video w-2/5 transform-gpu overflow-hidden rounded-xl transition-all duration-100 ease-in-out hover:cursor-pointer hover:border lg:block">
        <Link href={"/" + slug} aria-label={title}>
          <Picture
            image={image}
            imageDark={imageDark}
            alt={title}
            className="size-full scale-100 transform-gpu object-cover transition-all ease-in-out hover:scale-105"
          />
        </Link>
      </div>
    </section>
  );
}
