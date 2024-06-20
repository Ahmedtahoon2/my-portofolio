import { Parent, Node, Literal } from "unist";
import { visit } from "unist-util-visit";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import fetch from "node-fetch";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_RESIZE_DIMENSIONS = { width: 10, height: 10 };

type ImageNode = Parent & {
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

interface Config {
  showLogs?: boolean;
}

const log = (message: string, config: Config) => {
  if (config.showLogs) {
    console.log(message);
  }
};

const handleError = (error: unknown, message: string) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(`${message}: ${errorMessage}`);
};

const getImageBuffer = async (
  imageSrc: string,
  isExternal: boolean,
  config: Config
): Promise<Buffer> => {
  try {
    if (isExternal) {
      const response = await fetch(imageSrc);
      if (!response.ok)
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      const arrayBuffer = await response.arrayBuffer();
      log(`Fetched external image: ${imageSrc}`, config);
      return Buffer.from(arrayBuffer);
    } else {
      const filePath = resolve(__dirname, `../public/${imageSrc}`);
      log(`Reading internal image: ${filePath}`, config);
      return await readFile(filePath);
    }
  } catch (error) {
    handleError(error, `Error fetching image buffer`);
    throw error;
  }
};

const getImageDimensions = async (
  imageSrc: string,
  isExternal: boolean,
  config: Config = {}
): Promise<{ width: number; height: number } | null> => {
  try {
    const imgBuffer = await getImageBuffer(imageSrc, isExternal, config);
    log(`File exists: ${imageSrc}`, config);
    const metadata = await sharp(imgBuffer).metadata();
    return { width: metadata.width || 0, height: metadata.height || 0 };
  } catch (error) {
    handleError(error, `Error getting image dimensions: ${imageSrc}`);
    return null;
  }
};

const getBlurData = async (
  imageSrc: string,
  isExternal: boolean,
  defaultWidth: number = 0,
  defaultHeight: number = 0,
  config: Config = {}
): Promise<BlurResult | null> => {
  if (!imageSrc) return null;
  try {
    const imgBuffer = await getImageBuffer(imageSrc, isExternal, config);
    const image = sharp(imgBuffer);
    const metadata = await image.metadata();

    const width =
      defaultWidth > 0
        ? Math.min(defaultWidth, metadata.width || defaultWidth)
        : metadata.width || defaultWidth;

    const height =
      defaultHeight > 0
        ? Math.min(defaultHeight, metadata.height || defaultHeight)
        : metadata.height || defaultHeight;

    const blurBuffer = await image
      .resize(DEFAULT_RESIZE_DIMENSIONS.width, DEFAULT_RESIZE_DIMENSIONS.height)
      .toBuffer();

    const mimeType = metadata.format
      ? `image/${metadata.format}`
      : "image/jpeg";
    const blurDataURL = blurBuffer.toString("base64");

    return {
      width,
      height,
      blurDataURL: `data:${mimeType};base64,${blurDataURL}`,
      placeholder: "blur",
    };
  } catch (error) {
    handleError(error, `Error getting blur data: ${imageSrc}`);
    return null;
  }
};

const processImage = async (imageNode: ImageNode, config: Config) => {
  const isExternal = imageNode.url.startsWith("http");
  const dimensions = await getImageDimensions(
    imageNode.url,
    isExternal,
    config
  );

  if (dimensions) {
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
      { type: "mdxJsxAttribute", name: "width", value: dimensions.width },
      { type: "mdxJsxAttribute", name: "height", value: dimensions.height },
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

    if (imageNode.parent) {
      imageNode.parent.type = "div";
    }
  } else {
    console.error(`Error getting image dimensions: ${imageNode.url}`);
  }
};

export function remarkImgToJsx(config: Config = { showLogs: false }) {
  return async (tree: Node) => {
    const promises: Promise<void>[] = [];

    visit(tree, "image", (imageNode: ImageNode, _, parent) => {
      imageNode.parent = parent;
      promises.push(processImage(imageNode, config));
    });

    await Promise.all(promises);
  };
}
