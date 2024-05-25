import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Icons } from "./Icons";

export function HeaderLinks() {
  return (
    <>
      <Link
        href={siteConfig.links.github}
        target="_blank"
        rel="noreferrer"
      >
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-10 px-0 hidden sm:inline-flex"
          )}
        >
          <Icons.gitHub className="h-4 w-4" />
          <span className="sr-only">GitHub</span>
        </div>
      </Link>
      <Link
        href={siteConfig.links.twitter}
        target="_blank"
        rel="noreferrer"
      >
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-10 px-0 hidden sm:inline-flex"
          )}
        >
          <Icons.twitter className="h-4 w-4" />
          <span className="sr-only">Twitter</span>
        </div>
      </Link>
    </>
  )
}

