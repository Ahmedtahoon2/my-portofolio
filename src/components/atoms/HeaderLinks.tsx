import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/atoms/Icons";

export function HeaderLinks() {
  return (
    <>
      <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "hidden w-10 px-0 sm:inline-flex"
          )}
        >
          <Icons.gitHub className="size-4" />
          <span className="sr-only">GitHub</span>
        </div>
      </a>
      <a href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "hidden w-10 px-0 sm:inline-flex"
          )}
        >
          <Icons.twitter className="size-4" />
          <span className="sr-only">Twitter</span>
        </div>
      </a>
    </>
  );
}
