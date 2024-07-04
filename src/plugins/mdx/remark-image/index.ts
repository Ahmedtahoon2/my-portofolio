import { Node } from "unist";
import { visit } from "unist-util-visit";
import { imageProcess } from "./imageProcess";
import { Config, ImageNode } from "./types";
import { handleError } from "./utils";

// Main remark plugin function
export function remarkImgToJsx(config: Config = { showLogs: false }) {
  return async (tree: Node) => {
    const promises: Promise<void>[] = [];

    // Traverse the tree and process each image node
    visit(tree, "image", (imageNode: ImageNode, _, parent) => {
      // Ensure the image node has a URL
      if (!imageNode.url) {
        console.error("Image node is missing a URL:", imageNode);
        return;
      }

      imageNode.parent = parent;
      promises.push(imageProcess(imageNode, config));
    });

    try {
      await Promise.all(promises);
    } catch (error) {
      handleError(error, "Error processing images");
    }
  };
}

/**
 * Type definition for the configuration options of the remarkImgToJsx plugin.
 */
export type { Config as RemarkImgToJsxOptions };
