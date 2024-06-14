import type { MDXComponents } from "mdx/types";
import Image from "./Image";
import Pre from "./Pre";
import { Callout } from "./Callout";

export const components: MDXComponents = {
  Image,
  Callout,
  pre: Pre,
};
