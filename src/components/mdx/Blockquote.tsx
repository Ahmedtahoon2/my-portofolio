import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export default function Blockquote({
  className,
  ...props
}: ComponentProps<"blockquote">) {
  return (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-l-blue-400 pl-6 italic [&>*]:text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
