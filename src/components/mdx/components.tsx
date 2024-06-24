import type { MDXComponents } from "mdx/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Callout from "./Callout";
import Code from "./Code";
import FileTree from "./FileTree";
import Image from "./Image";
import Pre from "./Pre";
import Tabs from "./Tabs";
import Blockquote from "./Blockquote";

export const components: MDXComponents = {
  Link,
  Image,
  Button,
  FileTree,
  Tabs,
  Callout,
  pre: Pre,
  code: Code,
  blockquote: Blockquote,
};
