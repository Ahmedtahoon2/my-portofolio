import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <section className="container flex flex-1 flex-col justify-center gap-4 text-center">
      <h1 className="text-balance text-3xl font-black sm:text-5xl md:text-6xl lg:text-7xl">
        Hello, I&apos;m Ahmed
      </h1>
      <p className="mx-auto max-w-[42rem] text-balance text-muted-foreground sm:text-xl">
        Welcome to my blog template. Built using tailwind, shadcn, velite and
        Nextjs 14.
      </p>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          href="/blog"
          className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}
        >
          View my blog
        </Link>
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "w-full sm:w-fit"
          )}
        >
          GitHub
        </Link>
      </div>
    </section>
  );
}
