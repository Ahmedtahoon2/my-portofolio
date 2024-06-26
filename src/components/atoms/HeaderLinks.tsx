import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/atoms/Icons";

export function HeaderLinks() {
  return (
    <>
      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "hidden w-10 px-0 sm:inline-flex"
          )}
        >
          <Icons.gitHub className="h-4 w-4" />
          <span className="sr-only">GitHub</span>
        </div>
      </Link>
      <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "hidden w-10 px-0 sm:inline-flex"
          )}
        >
          <Icons.twitter className="h-4 w-4" />
          <span className="sr-only">Twitter</span>
        </div>
      </Link>
    </>
  );
}
