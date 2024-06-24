import { Node } from "unist";
import { visit } from "unist-util-visit";
import { imageProcess } from "./imageProcess";
import { Config, ImageNode } from "./types";

// Main remark plugin function
export function remarkImgToJsx(config: Config = { showLogs: false }) {
  return async (tree: Node) => {
    const promises: Promise<void>[] = [];

    // Traverse the tree and process each image node
    visit(tree, "image", (imageNode: ImageNode, _, parent) => {
      imageNode.parent = parent;
      promises.push(imageProcess(imageNode, config));
    });

    await Promise.all(promises);
  };
}

export type { Config as RemarkImgToJsxOptions };
