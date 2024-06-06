import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CalloutProps {
  children?: ReactNode;
  type?: "default" | "warning" | "danger";
}

export function Callout({
  children,
  type = "default",
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn(
        "my-6 w-full items-start rounded-md border border-l-4 p-4 dark:max-w-none",
        {
          "border-red-500 bg-red-50 dark:prose": type === "danger",
          "border-yellow-500 bg-yellow-50 dark:prose": type === "warning",
        }
      )}
      {...props}
    >
      <div>{children}</div>
    </div>
  );
}