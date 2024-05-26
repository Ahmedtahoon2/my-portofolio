import Image from "next/image";
import { useMDXComponent } from "@/hooks/mdx";

const components = {
  Image,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}