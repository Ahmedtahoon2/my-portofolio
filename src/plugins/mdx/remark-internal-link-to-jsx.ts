import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export type RemarkInternalLinkToJsxOptions = {
  excludeExternalLinks?: boolean;
  log?: boolean;
};

export const remarkInternalLinkToJsx: Plugin<
  [RemarkInternalLinkToJsxOptions],
  Root
> = (
  { excludeExternalLinks, log } = { excludeExternalLinks: true, log: false }
) => {
  return tree => {
    visit(tree, "link", node => {
      if (log) {
        console.log(`Processing link: ${node.url}`);
      }
      if (!(excludeExternalLinks && /^https?:\/\//.test(node.url))) {
        // Convert the internal link to JSX Link component
        const linkNode = {
          type: "mdxJsxFlowElement",
          name: "Link",
          attributes: [
            { type: "mdxJsxAttribute", name: "href", value: node.url },
          ],
          children: node.children,
        };
        Object.assign(node, linkNode);
      }
    });
  };
};
