import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export type RemarkInternalLinkToJsxOptions = {
  excludeExternalLinks?: boolean;
};

export const remarkInternalLinkToJsx: Plugin<
  [RemarkInternalLinkToJsxOptions],
  Root
> = ({ excludeExternalLinks } = {}) => {
  return (tree, _file, done) => {
    visit(tree, "link", node => {
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
    done();
  };
};
