import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "./Image";
import Pre from "./Pre";
import { Callout } from "./Callout";

export const components: MDXComponents = {
  Link,
  Image,
  Callout,
  pre: Pre,
};
