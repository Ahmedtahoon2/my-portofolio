import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/atoms/Icons";

export default function Footer() {
  return (
    <footer>
      <div className="my-6 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <a target="_blank" rel="noreferrer" href="mailto:hello@example.com">
            <span className="sr-only">Mail</span>
            <Mail className="h-6 w-6" />
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.twitter}>
            <span className="sr-only">Twitter</span>
            <Icons.twitter className="h-6 w-6" />
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.github}>
            <span className="sr-only">GitHub</span>
            <Icons.gitHub className="h-6 w-6" />
          </a>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
          <a target="_blank" rel="noreferrer" href={siteConfig.url}>
            {siteConfig.author}
          </a>
        </div>
      </div>
    </footer>
  );
}
