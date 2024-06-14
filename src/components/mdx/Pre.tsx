"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Files } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { copyToClipboard } from "@/lib/copyToClipboard";
import { cn } from "@/lib/utils";

export default function Pre(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLPreElement>,
    HTMLPreElement
  >
) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleClickCopy = async () => {
    if (preRef.current?.innerText) {
      copyToClipboard(preRef.current.innerText);
      setCopied(true);
    }
  };

  return (
    <TooltipProvider>
      <div className="relative">
        <Tooltip>
          <pre {...props} ref={preRef}>
            <TooltipTrigger
              type="button"
              disabled={copied}
              onClick={handleClickCopy}
              aria-label="Copy to Clipboard"
              className={cn(
                "absolute right-0 top-0 m-2 cursor-pointer space-x-2 rounded-md border bg-gray-600/15 p-2 transition group-hover:flex focus:outline-none disabled:flex",
                copied ? "border-green-400/80" : "border-transparent"
              )}
            >
              <div className="pointer-events-none h-4 w-4">
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
            </TooltipTrigger>
            <TooltipContent>copy</TooltipContent>
            {props.children}
          </pre>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
