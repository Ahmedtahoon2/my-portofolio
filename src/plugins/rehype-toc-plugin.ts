import rehypeToc from "@jsdevtools/rehype-toc";
import type { Pluggable } from "unified";

interface RehypeElement {
  type: string;
  tagName?: string;
  value?: string;
  properties?: {
    className?: Array<string>;
    style?: string;
  } & Record<string, unknown>;
  children?: Array<RehypeElement>;
}

const customizeToc = (toc: RehypeElement): RehypeElement | null => {
  if (!toc?.children?.length || !toc.children[0]?.children?.length) {
    return null;
  }

  return {
    type: "element",
    tagName: "details",
    properties: { className: ["toc"], "data-type": "toc" },
    children: [
      {
        type: "element",
        tagName: "summary",
        properties: {
          className: ["cursor-pointer"],
          "data-type": "toc-title",
        },
        children: [
          {
            type: "element",
            tagName: "span",
            properties: { className: ["toc-title"] },
            children: [
              {
                type: "text",
                value: "Table of Contents",
              },
            ],
          },
        ],
      },
      {
        type: "element",
        tagName: "nav",
        children: toc.children,
      },
    ],
  };
};

export const rehypeTocPlugin: Pluggable = [
  rehypeToc,
  { customizeTOC: customizeToc },
];
