"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/atoms/Logo";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center space-x-6 lg:space-x-8">
      <Link href="/" className="flex items-center space-x-2 lg:ml-7">
        <Logo className="size-6" />
      </Link>
      <Link
        href="/blog"
        className={cn(
          "hover:text-primary hidden text-base font-medium transition-colors sm:inline-block",
          pathname === "/blog" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Blog
      </Link>
      <Link
        href="/about"
        className={cn(
          "hover:text-primary hidden text-base font-medium transition-colors sm:inline-block",
          pathname === "/about" ? "text-foreground" : "text-foreground/60"
        )}
      >
        About
      </Link>
    </nav>
  );
}
