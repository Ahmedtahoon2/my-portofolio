import rehypeToc from "@jsdevtools/rehype-toc";
import type { Pluggable } from "unified";

interface RehypeElement {
  type: string;
  tagName?: string;
  value?: string;
  attributes?: Record<string, unknown>;
  properties: {
    className?: Array<string>;
    style?: string;
  } & Record<string, unknown>;
  children?: Array<RehypeElement>;
}

const customizeToc = (toc: RehypeElement): RehypeElement | null => {
  try {
    const children = toc?.children;
    const childrenOfChildren = children?.[0]?.children;

    if (!children?.length || !childrenOfChildren?.length) {
      return null;
    }
  } catch (e) {
    console.error("Error customizing TOC:", e);
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
                properties: {},
              },
            ],
          },
        ],
      },
      {
        type: "element",
        tagName: "nav",
        properties: {},
        children: toc.children || [],
      },
    ],
  };
};

export const rehypeTocPlugin: Pluggable = [
  rehypeToc,
  { customizeTOC: customizeToc },
];
