import sharp from "sharp";
import {
  DEFAULT_IMAGE_FORMAT,
  ERROR_PREFIX,
  RESIZE_DIMENSIONS,
} from "./defaults";
import { handleError } from "./utils";
import { BlurResult } from "./types";

// Function to get the blur data for the image
export const getBlurData = async (
  imgBuffer: Buffer,
  imageSrc: string,
  defaultWidth: number = 0,
  defaultHeight: number = 0
): Promise<BlurResult | null> => {
  if (!imageSrc) return null;
  try {
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
