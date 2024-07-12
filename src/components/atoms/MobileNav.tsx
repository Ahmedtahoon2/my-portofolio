"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { MobileLink } from "@/components/atoms/MobileLink";
import { Logo } from "@/components/atoms/Logo";
import { Icons } from "./Icons";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="w-10 cursor-pointer px-0 sm:hidden">
          <Menu className="size-5" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <MobileLink
          onOpenChange={setOpen}
          href="/"
          className="mb-6 flex items-center"
        >
          <Logo className="mr-2 size-4" />
        </MobileLink>
        <div className="mt-3 flex flex-col gap-4">
          <MobileLink onOpenChange={setOpen} href="/posts">
            Posts
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/about">
            About
          </MobileLink>
          <div className="flex justify-center gap-2">
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "inline-flex w-10 px-0"
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
                  "inline-flex w-10 px-0"
                )}
              >
                <Icons.twitter className="size-4" />
                <span className="sr-only">Twitter</span>
              </div>
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
