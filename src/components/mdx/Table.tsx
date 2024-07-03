import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Table = ({
  className = "",
  ...props
}: ComponentProps<"table">) => (
  <table className={cn("my-6 w-full overflow-y-auto", className)} {...props} />
);
