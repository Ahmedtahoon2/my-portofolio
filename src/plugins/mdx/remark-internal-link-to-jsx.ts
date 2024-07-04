import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export type RemarkInternalLinkToJsxOptions = {
  excludeExternalLinks?: boolean;
  log?: boolean;
};

/**
 * A remark plugin to convert internal Markdown links to JSX `Link` components.
 *
 * This plugin processes links in the Markdown AST and converts internal links (those that are not external URLs)
 * into JSX `Link` components. Optionally, it can exclude external links from processing and log the processing steps.
 *
 * @param {RemarkInternalLinkToJsxOptions} [options={ excludeExternalLinks: true, log: false }] - Configuration options.
 * @param {boolean} [options.excludeExternalLinks=true] - Whether to exclude external links (those starting with "http://" or "https://") from processing.
 * @param {boolean} [options.log=false] - Whether to log the processing of each link.
 * @returns A transformer function for the unified processor.
 *
 */
export const remarkInternalLinkToJsx: Plugin<
  [RemarkInternalLinkToJsxOptions],
  Root
> = (
  { excludeExternalLinks, log }: RemarkInternalLinkToJsxOptions = {
    excludeExternalLinks: true,
    log: false,
  }
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
