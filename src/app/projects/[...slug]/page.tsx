import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import { ArrowLeftIcon, Clock } from "lucide-react";
import { projects } from "@site/content";
import { config, siteConfig } from "@/config/site";
import { ShareBtns } from "@/components/molecules/ShareBtns";
import { Picture } from "@/components/atoms/Picture";
import { Tag } from "@/components/atoms/Tag";
import { formatDate } from "@/lib/formatDate";
import { convertToHashtag } from "@/lib/convertToHashtag";
import { MDXContent } from "@/components/molecules/MdxComponent";
import { ScrollBtn } from "@/components/atoms/ScrollBtn";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectPageProps {
  params: {
    slug: string[];
  };
}

async function getProjectFromParams(params: ProjectPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const project = projects.find(project => project.slugAsParams === slug);
  return project || null;
}

export async function generateStaticParams(): Promise<
  ProjectPageProps["params"][]
> {
  return projects.map(project => ({ slug: project.slugAsParams.split("/") }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectFromParams(params);

  if (!project) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", project.title);

  return {
    title: project.title,
    description: project.description,
    keywords: project.tags.length > 0 ? project.tags.join(", ") : "",
    alternates: {
      canonical: project.slug,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: project.slug,
      locale: siteConfig.geolocation.locale,
      images: [
        {
          url: `${config.url}/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: project.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [`${config.url}/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export default async function page({ params }: ProjectPageProps) {
  try {
    const project = await getProjectFromParams(params);

    if (!project || !project.published) {
      notFound();
    }

    return (
      <section className="prose dark:prose-invert container relative mx-auto max-w-3xl py-6">
        <section className="mb-2 flex flex-col gap-4">
          <time
            dateTime={project.date}
            className="bg-secondary block w-fit rounded px-2 py-1 text-xs"
          >
            {formatDate(project.date)}
          </time>
          <h1 className="font-heading my-0 block text-4xl leading-tight lg:text-5xl">
            {project.title}
          </h1>
          <Picture
            image={project.image}
            imageDark={project.imageDark}
            alt={project.title}
            className="my-0 w-[90%]"
          />
          <div className="flex gap-2">
            {project.tags?.map(tag => <Tag path="projects" tag={tag} key={tag} />)}
          </div>
          {project.description ? (
            <p className="text-muted-foreground m-0 text-xl">
              {project.description}
            </p>
          ) : null}
          <div className="flex items-center justify-between">
            <ShareBtns
              url={`${config.url}/projects/${project.slugAsParams}`}
              quote={project.description || ""}
              hashtags={convertToHashtag(project.tags, "#Ahmed_Tahoon")}
              blankTarget
            />
            <p className="text-muted-foreground my-0">
              <Clock className="mr-1 inline" /> {project.readingTime.text}
            </p>
          </div>
        </section>
        <hr className="my-4" />
        <MDXContent code={project.body} />
        <hr className="my-4 md:my-6" />
        <div className="flex justify-center py-4">
          <Link
            href="/projects"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            See all projects
          </Link>
        </div>
        <ScrollBtn />
      </section>
    );
  } catch (error) {
    console.error("Error rendering project:", error);
    notFound();
  }
}
