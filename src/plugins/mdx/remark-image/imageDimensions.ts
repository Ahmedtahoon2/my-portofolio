import sharp from "sharp";
import { ERROR_PREFIX } from "./defaults";
import { handleError, log } from "./utils";
import { getWebPBuffer } from "./getWebPBuffer";
import { Config } from "./types";

// Function to get the dimensions of the image
export const getImageDimensions = async (
  imageSrc: string,
  isExternal: boolean,
  config: Config
): Promise<{ width: number; height: number } | null> => {
  try {
    const webPBuffer = await getWebPBuffer(imageSrc, isExternal, config);
    log(`File exists: ${imageSrc}`, config.showLogs);
    const metadata = await sharp(webPBuffer).metadata();
    return { width: metadata.width || 0, height: metadata.height || 0 };
  } catch (error) {
    handleError(error, `${ERROR_PREFIX} getting image dimensions: ${imageSrc}`);
    return null;
  }
};
