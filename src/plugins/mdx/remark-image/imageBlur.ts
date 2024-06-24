import sharp from "sharp";
import {
  DEFAULT_IMAGE_FORMAT,
  ERROR_PREFIX,
  RESIZE_DIMENSIONS,
} from "./defaults";
import { handleError } from "./utils";
import { BlurResult, Config } from "./types";
import { getWebPBuffer } from "./getWebPBuffer";

// Function to get the blur data for the image
export const getBlurData = async (
  imageSrc: string,
  isExternal: boolean,
  defaultWidth: number = 0,
  defaultHeight: number = 0,
  config: Config
): Promise<BlurResult | null> => {
  if (!imageSrc) return null;
  try {
    const webPBuffer = await getWebPBuffer(imageSrc, isExternal, config);
    const image = sharp(webPBuffer);
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
      .resize(RESIZE_DIMENSIONS.width, RESIZE_DIMENSIONS.height)
      .toBuffer();

    const mimeType = metadata.format
      ? `image/${metadata.format}`
      : `image/${DEFAULT_IMAGE_FORMAT}`;
    const blurDataURL = blurBuffer.toString("base64");

    return {
      width,
      height,
      blurDataURL: `data:${mimeType};base64,${blurDataURL}`,
      placeholder: "blur",
    };
  } catch (error) {
    handleError(error, `${ERROR_PREFIX} getting blur data: ${imageSrc}`);
    return null;
  }
};
