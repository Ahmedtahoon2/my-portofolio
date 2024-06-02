import type { MDXComponents } from "mdx/types";
import * as runtime from "react/jsx-runtime";
import React from "react";

export interface MDXLayoutRenderer {
  code: string;
  components?: MDXComponents;
  [key: string]: unknown;
}

const getMDXComponent = (
  code: string,
  globals: Record<string, unknown> = {}
): React.ComponentType<any> => {
  const scope = { runtime, ...globals };
  const fn = new Function(...Object.keys(scope), code);
  return fn(...Object.values(scope)).default;
};

export const useMDXComponent = (
  code: string,
  globals: Record<string, unknown> = {}
): React.ComponentType<any> => {
  return React.useMemo(() => getMDXComponent(code, globals), [code, globals]);
};
