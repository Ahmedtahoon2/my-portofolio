import Link from "next/link";
import { badgeVariants } from "@/components/ui/badge";

interface TagProps {
  path: string;
  tag: string;
  current?: boolean;
}
export function Tag({ path, tag, current }: TagProps) {
  return (
    <Link
      className={badgeVariants({
        variant: current ? "default" : "secondary",
        className: "rounded-md no-underline",
      })}
      href={`/${path}?tags=${tag}`}
    >
      {tag}
    </Link>
  );
}
