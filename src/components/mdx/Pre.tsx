"use client";

import { ComponentProps, useEffect, useRef, useState } from "react";
import { Check, Files } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { copyToClipboard } from "@/lib/copyToClipboard";
import { cn } from "@/lib/utils";

export default function Pre(props: ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleClickCopy = async () => {
    if (preRef.current?.innerText) {
      await copyToClipboard(preRef.current.innerText);
      setCopied(true);
    }
  };

  return (
    <TooltipProvider>
      <div className="relative">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              disabled={copied}
              onClick={handleClickCopy}
              aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
              className={cn(
                "absolute right-0 top-0 m-2 cursor-pointer space-x-2 rounded-md border bg-gray-600/15 p-[0.6rem] transition group-hover:flex focus:outline-none disabled:flex",
                copied ? "border-green-400/80" : "border-transparent"
              )}
            >
              <div className="pointer-events-none h-5 w-5">
                {copied ? (
                  <Check
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="text-green-400/80"
                  />
                ) : (
                  <Files
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                )}
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent>{copied ? "Copied" : "Copy"}</TooltipContent>
        </Tooltip>
        <pre {...props} ref={preRef}>
          {props.children}
        </pre>
      </div>
    </TooltipProvider>
  );
}
