"use client";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "next-share";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/atoms/Icons";
import { cn } from "@/lib/utils";

interface ShareBtnsProps {
  url: string;
  quote: string;
  hashtags: string[];
  blankTarget?: boolean;
}

export function ShareBtns({
  url,
  quote,
  hashtags,
  blankTarget,
}: ShareBtnsProps) {
  return (
    <div className="flex items-center">
      <FacebookShareButton
        url={url}
        quote={quote}
        hashtag={hashtags[0]}
        blankTarget={blankTarget}
      >
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "inline-flex w-10 px-0"
          )}
        >
          <Icons.facebook className="size-[25px]" />
        </div>
      </FacebookShareButton>
      <TwitterShareButton
        url={url}
        title={quote}
        hashtags={hashtags}
        blankTarget={blankTarget}
      >
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "inline-flex w-10 px-0"
          )}
        >
          <Icons.twitter className="size-[25px]" />
        </div>
      </TwitterShareButton>
      <LinkedinShareButton url={url} blankTarget={blankTarget}>
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "inline-flex w-10 px-0"
          )}
        >
          <Icons.linkedin className="size-[25px]" />
        </div>
      </LinkedinShareButton>
      <WhatsappShareButton
        url={url}
        title={quote}
        separator=":: "
        blankTarget={blankTarget}
      >
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "hidden w-10 px-0 sm:inline-flex"
          )}
        >
          <Icons.whatsapp className="size-[25px]" />
        </div>
      </WhatsappShareButton>
      <TelegramShareButton url={url} title={quote} blankTarget={blankTarget}>
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "hidden w-10 px-0 sm:inline-flex"
          )}
        >
          <Icons.telegram className="size-[25px]" />
        </div>
      </TelegramShareButton>
    </div>
  );
}
