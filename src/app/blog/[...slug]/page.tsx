import { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "@site/content";
import { formatDate } from "@/lib/formatDate";
import { siteConfig } from "@/config/site";
import { MDXContent } from "@/components/molecules/MdxComponent";
import { Tag } from "@/components/atoms/Tag";
import "@/styles/mdx.css";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find(post => post.slugAsParams === slug);
  return post || null;
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map(post => ({ slug: post.slugAsParams.split("/") }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.length > 0 ? post.tags.join(", ") : "",
    authors: { name: siteConfig.author },
    alternates: {
      canonical: post.slug,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      locale: siteConfig.geolocation.locale,
      images: [
        {
          url: `${siteConfig.url}/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${siteConfig.url}/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const post = await getPostFromParams(params);

    if (!post || !post.published) {
      notFound();
    }

    return (
      <article className="container prose mx-auto max-w-3xl py-6 dark:prose-invert">
        <time
          dateTime={post.date}
          className="block text-sm text-muted-foreground"
        >
          Published on {formatDate(post.date)}
        </time>
        <h1 className="font-heading mb-4 mt-2 inline-block text-4xl leading-tight lg:text-5xl">
          {post.title}
        </h1>
        <div className="mb-4 flex gap-2">
          {post.tags?.map(tag => <Tag tag={tag} key={tag} />)}
        </div>
        {post.description ? (
          <p className="mt-0 text-xl text-muted-foreground">
            {post.description}
          </p>
        ) : null}
        <p className="mt-0 text-xl text-muted-foreground">
          Reading time: {post.readingTime.text}
        </p>
        <hr className="my-4" />
        <MDXContent code={post.body} />
      </article>
    );
  } catch (error) {
    console.error("Error rendering post:", error);
    notFound();
  }
}
