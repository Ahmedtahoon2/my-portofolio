import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export default function Code({ className, ...props }: ComponentProps<"code">) {
  return (
    <code
      className={cn("px-[0.3rem] py-[0.2rem] text-sm", className)}
      translate="no"
      {...props}
    />
  );
}
