import { Mail } from "lucide-react";
import { config, siteConfig } from "@/config/site";
import { Icons } from "@/components/atoms/Icons";
import { Rss } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const date = new Date();
  return (
    <footer>
      <div className="my-6 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <a
            target="_blank"
            rel="noreferrer"
            href={`mailto:${siteConfig.links.email}`}
          >
            <span className="sr-only">Mail</span>
            <Mail className="size-6" />
          </a>
          <Link href="/api/rss.xml">
            <span className="sr-only">Rss</span>
            <Rss className="size-6" />
          </Link>
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
            {siteConfig.author} • @{date.getFullYear()}
          </a>
        </div>
      </div>
    </footer>
  );
}
