import type { MDXComponents } from "mdx/types";
import { Button } from "@/components/ui/button";
import { Table } from "./Table";
import { Td } from "./Td";
import { Th } from "./Th";
import { Tr } from "./Tr";
import Link from "next/link";
import Callout from "./Callout";
import Code from "./Code";
import FileTree from "./FileTree";
import Image from "./Image";
import Pre from "./Pre";
import Tabs from "./Tabs";
import Blockquote from "./Blockquote";
import VideoPlayer from "./VideoPlayer";

export const components: MDXComponents = {
  Link,
  Image,
  Button,
  FileTree,
  Tabs,
  VideoPlayer,
  Callout,
  pre: Pre,
  code: Code,
  blockquote: Blockquote,
  table: Table,
  td: Td,
  th: Th,
  tr: Tr,
};
