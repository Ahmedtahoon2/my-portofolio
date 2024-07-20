import Link from "next/link";
import SparklesText from "@/components/magicui/sparkles-text";
import RetroGrid from "@/components/magicui/retro-grid";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <section className="relative flex flex-1">
      <div className="container flex flex-1 flex-col items-center justify-center gap-4">
        <h1 className="text-balance text-3xl font-black sm:text-5xl md:text-6xl lg:text-7xl">
          Hello, <span className="text-gradient">I&apos;m Ahmed</span>
        </h1>
        <div className="flex text-balance text-3xl">
          <div className="mr-2 flex flex-1 items-center md:w-60 lg:w-80">
            <div className="h-[2px] w-full bg-gray-700 dark:bg-gray-200"></div>
          </div>
          <SparklesText
            text="front-end developer"
            className="text-2xl"
            colors={{
              first: "rgb(255, 120, 86)",
              second: "rgb(255, 195, 75)",
            }}
            sparklesCount={7}
          />
        </div>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/posts"
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}
          >
            View my posts
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full border-orange-400 sm:w-fit"
            )}
          >
            GitHub
          </Link>
        </div>
      </div>
      <RetroGrid />
    </section>
  );
}
