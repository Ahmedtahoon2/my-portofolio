import { MDXLayoutRenderer, useMDXComponent } from "@/hooks/mdx";
import { components } from "./mdx/components";

export function MDXContent({ code, ...rest }: MDXLayoutRenderer) {
  const Mdx = useMDXComponent(code);
  return <Mdx components={components} {...rest} />;
}
