import sharp from "sharp";
import { DEFAULT_IMAGE_FORMAT, ERROR_PREFIX, IMAGE_QUALITY } from "./defaults";
import { handleError, log } from "./utils";
import { Config } from "./types";

export const convertToWebP = async (
  imgBuffer: Buffer,
  imageUrl: string,
  config: Config
): Promise<Buffer> => {
  try {
    const image = sharp(imgBuffer);
    const metadata = await image.metadata();

    // Avoid converting SVG and GIF files to WebP
    if (metadata.format === "svg" || metadata.format === "gif") {
      log(`Skipping conversion for SVG or GIF: ${imageUrl}`, config.showLogs);
      return imgBuffer;
    }

    const webpQuality = config.webpQuality || IMAGE_QUALITY; // Use provided quality or default

    if (metadata.format !== DEFAULT_IMAGE_FORMAT) {
      log(`Converting image to WebP format`, config.showLogs);
      return await image.webp({ quality: webpQuality }).toBuffer();
    } else {
      log(`Image is already in WebP format`, config.showLogs);
      return imgBuffer;
    }
  } catch (error) {
    handleError(error, `${ERROR_PREFIX} converting image to WebP`);
    throw error;
  }
};
