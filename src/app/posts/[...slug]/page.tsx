import Link from "next/link";
import { ArrowLeftIcon, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { posts } from "@site/content";
import { config, siteConfig } from "@/config/site";
import { formatDate } from "@/lib/formatDate";
import { convertToHashtag } from "@/lib/convertToHashtag";
import { MDXContent } from "@/components/molecules/MdxComponent";
import { Picture } from "@/components/atoms/postPicture";
import { ScrollBtn } from "@/components/atoms/ScrollBtn";
import { ShareBtns } from "@/components/atoms/ShareBtns";
import { Tag } from "@/components/atoms/Tag";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
          url: `${config.url}/api/og?${ogSearchParams.toString()}`,
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
      images: [`${config.url}/api/og?${ogSearchParams.toString()}`],
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
      <article className="prose dark:prose-invert container relative mx-auto max-w-3xl py-6">
        <Link
          href="/posts"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-[-200px] top-4 hidden no-underline lg:inline-flex"
          )}
        >
          <ArrowLeftIcon className="mr-2 size-4" />
          See all blogs
        </Link>
        <section className="mb-2 flex flex-col gap-4">
          <time
            dateTime={post.date}
            className="bg-secondary block w-fit rounded px-2 py-1 text-xs"
          >
            {formatDate(post.date)}
          </time>
          <h1 className="font-heading my-0 block text-4xl leading-tight lg:text-5xl">
            {post.title}
          </h1>
          <Picture
            image={post.image}
            imageDark={post.imageDark}
            alt={post.title}
            className="my-0 w-[90%]"
          />
          <div className="flex gap-2">
            {post.tags?.map(tag => <Tag tag={tag} key={tag} />)}
          </div>
          {post.description ? (
            <p className="text-muted-foreground m-0 text-xl">
              {post.description}
            </p>
          ) : null}
          <div className="flex items-center justify-between">
            <ShareBtns
              url={`${config.url}/posts/${post.slugAsParams}`}
              quote={post.description || ""}
              hashtags={convertToHashtag(post.tags, "#Ahmed_Tahoon")}
              blankTarget
            />
            <p className="text-muted-foreground my-0"><Clock className="mr-1 inline" /> {post.readingTime.text}</p>
          </div>
        </section>
        <hr className="my-4" />
        <MDXContent code={post.body} />
        <hr className="my-4 md:my-6" />
        <div className="flex justify-center py-4">
          <Link
            href="/posts"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            See all blogs
          </Link>
        </div>
        <ScrollBtn />
      </article>
    );
  } catch (error) {
    console.error("Error rendering post:", error);
    notFound();
  }
}
