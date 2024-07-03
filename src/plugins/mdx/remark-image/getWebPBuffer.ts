import { convertToWebP } from "./convertToWebP";
import { getImageBuffer } from "./getImageBuffer";
import { handleError } from "./utils";
import { Config } from "./types";

export const getWebPBuffer = async (
  imageSrc: string,
  isExternal: boolean,
  config: Config
) => {
  try {
    // Get the image buffer
    const imgBuffer = await getImageBuffer(
      imageSrc,
      isExternal,
      config.showLogs
    );

    // Convert the image buffer to WebP format
    const webPBuffer = await convertToWebP(imgBuffer, imageSrc, config);

    return webPBuffer;
  } catch (error) {
    handleError(error, `Error getting WebP buffer for image: ${imageSrc}`);
    throw error;
  }
};
