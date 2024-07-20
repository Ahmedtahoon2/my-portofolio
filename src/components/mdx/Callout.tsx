import type { ReactElement, ReactNode } from "react";
import { Info, Ban, TriangleAlert, CircleAlert, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const TypeToEmoji = {
  tip: <Lightbulb />,
  important: <CircleAlert />,
  info: <Info />,
  warning: <TriangleAlert />,
  error: <Ban />,
} as const;

type CalloutType = keyof typeof TypeToEmoji;

const classes: Record<CalloutType, string> = {
  tip: cn(
    "border-green-100 bg-green-100 dark:border-green-400/30 dark:bg-green-400/30"
  ),
  important: cn(
    "border-blue-200 bg-blue-100 dark:border-blue-200/30 dark:bg-blue-900/30"
  ),
  info: cn(
    "border-orange-100 bg-orange-50 dark:border-orange-400/30 dark:bg-orange-400/30"
  ),
  warning: cn(
    "border-yellow-100 bg-yellow-50 dark:border-yellow-200/30 dark:bg-yellow-700/30"
  ),
  error: cn(
    "border-red-200 bg-red-100 dark:border-red-200/30 dark:bg-red-900/30"
  ),
};

const headerClasses: Record<CalloutType, string> = {
  tip: cn("text-green-800 dark:text-green-300"),
  important: cn("text-blue-900 dark:text-blue-200"),
  info: cn("text-orange-800 dark:text-orange-300"),
  warning: cn("text-yellow-900 dark:text-yellow-200"),
  error: cn("text-red-900 dark:text-red-200"),
};

type CalloutProps = {
  header?: string;
  type?: CalloutType;
  emoji?: string | ReactNode;
  children: ReactNode;
};

export default function Callout({
  children,
  header,
  type = "tip",
  emoji = TypeToEmoji[type],
}: CalloutProps): ReactElement {
  return (
    <div
      className={cn(
        "my-6 flex flex-col gap-2 overflow-x-auto rounded-lg border px-4 py-3",
        "contrast-more:border-current contrast-more:dark:border-current",
        classes[type]
      )}
    >
      <div
        className={cn(
          "flex select-none items-center gap-2 text-xl capitalize",
          headerClasses[type]
        )}
      >
        {emoji}
        {header ?? type}
      </div>
      <div className="w-full min-w-0 leading-7">{children}</div>
    </div>
  );
}
