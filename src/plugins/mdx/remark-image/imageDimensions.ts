import sharp from "sharp";
import { ERROR_PREFIX } from "./defaults";
import { handleError, log } from "./utils";
import { Config } from "./types";

// Function to get the dimensions of the image
export const getImageDimensions = async (
  imgBuffer: Buffer,
  imageSrc: string,
  config: Config
): Promise<{ width: number; height: number } | null> => {
  try {
    log(`File exists: ${imageSrc}`, config.showLogs);
    const metadata = await sharp(imgBuffer).metadata();
    return { width: metadata.width || 0, height: metadata.height || 0 };
  } catch (error) {
    handleError(error, `${ERROR_PREFIX} getting image dimensions: ${imageSrc}`);
    return null;
  }
};
