import type { MDXComponents } from "mdx/types";
import { Button } from "@/components/ui/button";
import { Callout } from "./Callout";
import { FileTree } from "./FileTree";
import { Tabs } from "./Tabs";
import Link from "next/link";
import Image from "./Image";
import Pre from "./Pre";

export const components: MDXComponents = {
  Link,
  Image,
  Button,
  FileTree,
  Tabs,
  Callout,
  pre: Pre,
};
