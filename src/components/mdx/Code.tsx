import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export default function Code({ className, ...props }: ComponentProps<"code">) {
  return (
    <code className={cn("text-base", className)} translate="no" {...props} />
  );
}
