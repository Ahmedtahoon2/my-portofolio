import { Parent, Node, Literal } from "unist";
import { visit } from "unist-util-visit";
import { sync as sizeOf } from "probe-image-size";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getImageMetadata } from "velite";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const __dirname = dirname(fileURLToPath(import.meta.url));

export type ImageNode = Parent & {
  url: string;
  alt: string;
  name: string;
  attributes: (Literal & { name: string })[];
  parent?: Parent;
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
    console.error(`Error getting blur data: ${e}`);
    return null;
  }
};

const getImageDimensions = async (
  imageNode: ImageNode,
  isExternal: boolean
): Promise<{ width: number; height: number } | null> => {
  try {
    if (isExternal) {
      const imageRes = await fetch(imageNode.url);
      const arrayBuffer = await imageRes.arrayBuffer();
      const imgBuffer = Buffer.from(arrayBuffer);
      return sizeOf(imgBuffer);
    } else {
      const imagePath = path.join(process.cwd(), "public", imageNode.url);
      if (fs.existsSync(imagePath)) {
        console.log(`File exists: ${imagePath}`);
        return sizeOf(fs.readFileSync(imagePath));
      } else {
        console.error(`File does not exist: ${imagePath}`);
        return null;
      }
    }
  } catch (error) {
    console.error(`Error getting image dimensions: ${error}`);
    return null;
  }
};

/**
 * Converts markdown image nodes to next/image jsx.
 */
export function remarkImgToJsx() {
  return async (tree: Node) => {
    const promises: Promise<void>[] = [];

    // Visit each image node in the tree
    visit(tree, "image", (imageNode: ImageNode, index, parent) => {
      const isExternal = imageNode.url.startsWith("http");
      imageNode.parent = parent; // Set the parent property on the image node

      const processImage = async () => {
        const dimensions = await getImageDimensions(imageNode, isExternal);

        if (dimensions) {
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

          // Replace parent node type from p to div to avoid nesting error
          if (imageNode.parent) {
            imageNode.parent.type = "div";
          }
        } else {
          console.error(`Error getting image dimensions: ${imageNode.url}`);
        }
      };

      promises.push(processImage());
    });

    await Promise.all(promises);
  };
}
