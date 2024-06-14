import { Parent, Node, Literal } from "unist";
import { visit } from "unist-util-visit";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { LRUCache } from "lru-cache";
import fetch from "node-fetch";
import sharp from "sharp";

// Current directory path
const __dirname = dirname(fileURLToPath(import.meta.url));

export type ImageNode = Parent & {
  url: string;
  alt: string;
  name: string;
  attributes: (Literal & { name: string; value: string })[];
  parent?: Parent;
  width?: number;
  height?: number;
};

interface BlurResult {
  width: number;
  height: number;
  placeholder: "blur" | "empty";
  blurDataURL?: string;
}

interface Config {
  showLogs?: boolean;
}

const cache = new LRUCache<
  string,
  {
    dimensions: { width: number; height: number } | null;
    blurData: BlurResult | null;
  }
>({
  max: 500,
  ttl: 1000 * 60 * 60,
});

const log = (message: string, config: Config) => {
  if (config.showLogs) {
    console.log(message);
  }
};

const getImageBuffer = async (
  imageSrc: string,
  isExternal: boolean,
  config: Config = {}
): Promise<Buffer> => {
  try {
    if (isExternal) {
      const response = await fetch(imageSrc);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      log(`Fetched external image: ${imageSrc}`, config);
      return Buffer.from(arrayBuffer);
    } else {
      const filePath = resolve(__dirname, `../public/${imageSrc}`);
      log(`Reading internal image: ${filePath}`, config);
      return await readFile(filePath);
    }
  } catch (error) {
    console.error(`Error fetching or reading image: ${imageSrc}`, error);
    throw error;
  }
};

const getBlurData = async (
  imageSrc: string,
  isExternal: boolean,
  defaultWidth = 0,
  defaultHeight = 0,
  config: Config = {}
): Promise<BlurResult | null> => {
  try {
    if (!imageSrc) return null;

    const cachedData = cache.get(imageSrc);
    if (cachedData?.blurData) {
      return cachedData.blurData;
    }

    const imgBuffer = await getImageBuffer(imageSrc, isExternal, config);
    const image = sharp(imgBuffer);
    const metadata = await image.metadata();

    const width = Math.min(
      defaultWidth > 0 ? defaultWidth : metadata.width || defaultWidth,
      metadata.width || defaultWidth
    );
    const height = Math.min(
      defaultHeight > 0 ? defaultHeight : metadata.height || defaultHeight,
      metadata.height || defaultHeight
    );

    const blurDataURL = (await image.resize(10, 10).toBuffer()).toString(
      "base64"
    );

    const blurData: BlurResult = {
      width,
      height,
      blurDataURL: `data:image/jpeg;base64,${blurDataURL}`,
      placeholder: "blur",
    };

    cache.set(imageSrc, { dimensions: null, blurData });

    return blurData;
  } catch (error) {
    console.error(`Error getting blur data: ${imageSrc}`, error);
    return null; // Return null if there's an error
  }
};

const getImageDimensions = async (
  imageNode: ImageNode,
  isExternal: boolean,
  config: Config = {}
): Promise<{ width: number; height: number } | null> => {
  try {
    const cachedData = cache.get(imageNode.url);
    if (cachedData?.dimensions) {
      return cachedData.dimensions;
    }

    const imgBuffer = await getImageBuffer(imageNode.url, isExternal, config);
    const metadata = await sharp(imgBuffer).metadata();

    const width = metadata.width || 0;
    const height = metadata.height || 0;

    const dimensions = { width, height };
    cache.set(imageNode.url, { dimensions, blurData: null });

    return dimensions;
  } catch (error) {
    console.error(`Error getting image dimensions: ${imageNode.url}`, error);
    return null; // Return null if there's an error
  }
};

export function remarkImgToJsx(config: Config = { showLogs: false }) {
  return async (tree: Node) => {
    const promises: Promise<void>[] = [];

    visit(tree, "image", (imageNode: ImageNode, _, parent) => {
      const isExternal = imageNode.url.startsWith("http");
      imageNode.parent = parent;

      const processImage = async () => {
        try {
          imageNode.attributes = imageNode.attributes || [];

          const attrs = imageNode.attributes.reduce(
            (acc, attr) => {
              acc[attr.name] = attr.value ?? "";
              return acc;
            },
            {} as Record<string, string>
          );

          const layout = attrs.layout;
          const quality = attrs.quality
            ? parseInt(attrs.quality, 10)
            : undefined;

          const dimensions = await getImageDimensions(
            imageNode,
            isExternal,
            config
          );
          if (!dimensions) {
            console.error(`Error getting image dimensions: ${imageNode.url}`);
            return;
          }

          log(
            `Image dimensions: ${dimensions.width}x${dimensions.height}`,
            config
          );

          const blurData = await getBlurData(
            imageNode.url,
            isExternal,
            dimensions.width,
            dimensions.height,
            config
          );

          imageNode.type = "mdxJsxFlowElement";
          imageNode.name = "Image";
          imageNode.attributes = [
            { type: "mdxJsxAttribute", name: "alt", value: imageNode.alt },
            { type: "mdxJsxAttribute", name: "src", value: imageNode.url },
            {
              type: "mdxJsxAttribute",
              name: "width",
              value: dimensions.width.toString(),
            },
            {
              type: "mdxJsxAttribute",
              name: "height",
              value: dimensions.height.toString(),
            },
          ];

          if (layout) {
            imageNode.attributes.push({
              type: "mdxJsxAttribute",
              name: "layout",
              value: layout,
            });
          }

          if (quality !== undefined) {
            imageNode.attributes.push({
              type: "mdxJsxAttribute",
              name: "quality",
              value: quality.toString(),
            });
          }

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

          if (imageNode.parent) {
            imageNode.parent.type = "div";
          }

          imageNode.width = dimensions.width;
          imageNode.height = dimensions.height;
        } catch (error) {
          console.error(`Error processing image: ${imageNode.url}`, error);
        }
      };

      promises.push(processImage());
    });

    await Promise.all(promises);
  };
}
