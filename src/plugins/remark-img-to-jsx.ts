import { Parent, Node, Literal } from "unist";
import { visit } from "unist-util-visit";
import { sync as sizeOf } from "probe-image-size";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getImageMetadata } from "velite";
import fs from "fs";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export type ImageNode = Parent & {
  url: string;
  alt: string;
  name: string;
  attributes: (Literal & { name: string })[];
};

interface BlurResult {
  width: number;
  height: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export const getBlurData = async (
  imageSrc?: string,
  defaultWidth: number = 0,
  defaultHeight: number = 0
): Promise<BlurResult | null> => {
  if (!imageSrc) return null;
  const isExternal = imageSrc.startsWith("http");

  try {
    let imgBuffer: Buffer | undefined = undefined;
    if (!isExternal) {
      const filePath = resolve(__dirname, `../public/${imageSrc}`);
      imgBuffer = await readFile(filePath);
    } else {
      const imageRes = await fetch(imageSrc);
      const arrayBuffer = await imageRes.arrayBuffer();
      imgBuffer = Buffer.from(arrayBuffer);
    }

    const meta = await getImageMetadata(imgBuffer);
    return {
      width:
        defaultWidth > 0
          ? Math.min(defaultWidth, meta?.width || defaultWidth)
          : meta?.width || defaultWidth,
      height:
        defaultHeight > 0
          ? Math.min(defaultHeight, meta?.height || defaultHeight)
          : meta?.height || defaultHeight,
      blurDataURL: meta?.blurDataURL,
      placeholder: meta?.blurDataURL ? "blur" : "empty",
    };
  } catch (e) {
    return null;
  }
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
      if (node.children.some(n => n.type === "image")) {
        const imageNodeIndex = node.children.findIndex(n => n.type === "image");
        const imageNode = node.children[imageNodeIndex] as ImageNode;

        // Construct the local file path
        const imagePath = path.join(process.cwd(), "public", imageNode.url);
        const isExternal = imageNode.url.startsWith("http");

        const processImage = async () => {
          let dimensions: { width: number; height: number } | null = null;
          if (isExternal) {
            const imageRes = await fetch(imageNode.url);
            const arrayBuffer = await imageRes.arrayBuffer();
            const imgBuffer = Buffer.from(arrayBuffer);
            dimensions = sizeOf(imgBuffer);
          } else {
            if (fs.existsSync(imagePath)) {
              console.log(`File exists: ${imagePath}`);
              dimensions = sizeOf(fs.readFileSync(imagePath));
            } else {
              console.error(`File does not exist: ${imagePath}`);
            }
          }

          if (dimensions !== null) {
            console.log(
              `Image dimensions: ${dimensions.width}x${dimensions.height}`
            );

            const blurData = await getBlurData(
              imageNode.url,
              dimensions.width,
              dimensions.height
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

            if (blurData?.blurDataURL) {
              imageNode.attributes.push(
                {
                  type: "mdxJsxAttribute",
                  name: "placeholder",
                  value: blurData.placeholder,
                },
                {
                  type: "mdxJsxAttribute",
                  name: "blurDataURL",
                  value: blurData.blurDataURL,
                }
              );
            }

            // Change the node type from p to div to avoid nesting error
            node.type = "div";
            node.children[imageNodeIndex] = imageNode;
          } else {
            console.error(`Error getting image dimensions: ${imageNode.url}`);
          }
        };

        promises.push(processImage());
      }
    });

    await Promise.all(promises);
  };
}
