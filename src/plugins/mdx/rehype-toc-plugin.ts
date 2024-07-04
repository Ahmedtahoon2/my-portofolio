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

/**
 * Customizes the Table of Contents (ToC) structure by wrapping it in a <details> element with a <summary>.
 *
 * @param {RehypeElement} toc - The original ToC element.
 * @returns {RehypeElement | null} The customized ToC element or null if the original ToC has no children.
 */
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

/**
 * A plugin for rehype that customizes the Table of Contents (ToC) structure.
 *
 * @type {Pluggable}
 * @property {Function} rehypeToc - The rehype ToC plugin.
 * @property {Object} options - Options for the rehype ToC plugin.
 * @property {Function} options.customizeTOC - A function to customize the ToC structure.
 */
export const rehypeTocPlugin: Pluggable = [
  rehypeToc,
  { customizeTOC: customizeToc },
];
