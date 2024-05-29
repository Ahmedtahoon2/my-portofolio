import { useMDXComponent } from "@/hooks/mdx";
import { components } from "./mdx/components";


interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
