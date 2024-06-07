import { MDXLayoutRenderer, useMDXComponent } from "@/hooks/mdx";
import { components } from "@/components/mdx/components";

export function MDXContent({ code, ...rest }: MDXLayoutRenderer) {
  const Mdx = useMDXComponent(code);
  return <Mdx components={components} {...rest} />;
}
