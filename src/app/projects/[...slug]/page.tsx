import { notFound } from "next/navigation";
import { config, siteConfig } from "@/config/site";
import { projects } from "@site/content";
import { Metadata } from "next/types";

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
        page
      </section>
    );
  } catch (error) {
    console.error("Error rendering project:", error);
    notFound();
  }
}
