import { Mail } from "lucide-react";
import { config, siteConfig } from "@/config/site";
import { Icons } from "@/components/atoms/Icons";

export default function Footer() {
  return (
    <footer>
      <div className="mb-6 mt-10 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <a target="_blank" rel="noreferrer" href="mailto:hello@example.com">
            <span className="sr-only">Mail</span>
            <Mail className="size-6" />
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.twitter}>
            <span className="sr-only">Twitter</span>
            <Icons.twitter className="size-6" />
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.github}>
            <span className="sr-only">GitHub</span>
            <Icons.gitHub className="size-6" />
          </a>
        </div>
        <div className="text-muted-foreground mb-2 flex space-x-2 text-sm">
          <a target="_blank" rel="noreferrer" href={config.url}>
            {siteConfig.author}
          </a>
        </div>
      </div>
    </footer>
  );
}
