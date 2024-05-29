import { Parent, Node, Literal } from "unist";
import { visit } from "unist-util-visit";
import { sync as sizeOf } from "probe-image-size";
import fs from "fs";
import path from "path";

export type ImageNode = Parent & {
  url: string;
  alt: string;
  name: string;
  attributes: (Literal & { name: string })[];
};

/**
 * Converts markdown image nodes to next/image jsx.
 */
export function remarkImgToJsx() {
  return async (tree: Node) => {
    const promises: Promise<void>[] = [];

    // Visit each paragraph node in the tree
    visit(tree, "paragraph", (node: Parent) => {
      // Check if the paragraph contains an image node
      if (node.children.some((n) => n.type === "image")) {
        const imageNodeIndex = node.children.findIndex(
          (n) => n.type === "image"
        );
        const imageNode = node.children[imageNodeIndex] as ImageNode;

        // Construct the local file path
        const imagePath = path.join(process.cwd(), "public", imageNode.url);
        console.log(`Checking file: ${imagePath}`);

        // Check if the file exists locally
        if (fs.existsSync(imagePath)) {
          console.log(`File exists: ${imagePath}`);

          // Get the dimensions of the image
          const dimensions = sizeOf(fs.readFileSync(imagePath));
          if (dimensions !== null) {
            console.log(
              `Image dimensions: ${dimensions.width}x${dimensions.height}`
            );

            // Convert the original node to next/image jsx
            imageNode.type = "mdxJsxFlowElement";
            imageNode.name = "Image";
            imageNode.attributes = [
              {
                type: "mdxJsxAttribute",
                name: "alt",
                value: imageNode.alt,
              },
              {
                type: "mdxJsxAttribute",
                name: "src",
                value: imageNode.url,
              },
              {
                type: "mdxJsxAttribute",
                name: "width",
                value: dimensions.width,
              },
              {
                type: "mdxJsxAttribute",
                name: "height",
                value: dimensions.height,
              },
            ];
            // Change the node type from p to div to avoid nesting error
            node.type = "div";
            node.children[imageNodeIndex] = imageNode;
          } else {
            console.error(`Error getting image dimensions: ${imagePath}`);
          }
        } else {
          console.error(`File does not exist: ${imagePath}`);
        }
      }
    });

    await Promise.all(promises);
  };
}
