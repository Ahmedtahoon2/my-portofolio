import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type LinkProps = {
  children: ReactNode;
  className?: string;
  underline?: boolean;
} & NextLinkProps;

export default function Link(props: LinkProps) {
  const isExternal = !props.href.toString().startsWith("/");
  const { underline, ...rest } = props;
  return (
    <NextLink
      {...rest}
      className={cn(
        "underline-offset-4",
        (isExternal || underline) && "underline",
        props.className
      )}
      target={isExternal ? "_blank" : undefined}
    >
      {props.children}
    </NextLink>
  );
}
