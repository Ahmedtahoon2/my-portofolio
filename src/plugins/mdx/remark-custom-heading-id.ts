import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export type HProperties = {
  id?: string;
};

export const remarkCustomHeadingId: Plugin<[], Root> =
  () => (tree, _file, done) => {
    visit(tree, "heading", node => {
      const lastChild = node.children.at(-1);

      // Check if the last child is a text node
      if (lastChild?.type !== "text") return;

      const headingText = lastChild.value;
      // Match the heading text for a custom ID pattern [#custom-id]
      const match = headingText.match(/\s*\[#([^\]]+)]\s*$/);

      if (!match) return;

      const [matchedText, id] = match;
      node.data ??= {};
      const headingProps: HProperties = (node.data.hProperties ??= {});
      headingProps.id = id;

      // Remove the matched text from the heading text
      lastChild.value = headingText.slice(
        0,
        headingText.length - matchedText.length
      );
    });

    done();
  };
