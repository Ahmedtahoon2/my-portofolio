import pkg from "lru_map";
import sharp from "sharp";
import { DEFAULT_IMAGE_FORMAT, ERROR_PREFIX, IMAGE_QUALITY } from "./defaults";
import { handleError, log } from "./utils";
import { Config } from "./types";

const { LRUMap } = pkg;
const imageCache = new LRUMap<string, Buffer>(100);

export const convertToWebP = async (
  imgBuffer: Buffer,
  imageUrl: string,
  config: Config
): Promise<Buffer> => {
  const cacheKey = `${imageUrl}`;

  try {
    if (imageCache.has(cacheKey)) {
      log(`Retrieved image from cache: ${cacheKey}`, config.showLogs);
      return imageCache.get(cacheKey)!;
    }

    const image = sharp(imgBuffer);
    const metadata = await image.metadata();

    if (metadata.format === "svg" || metadata.format === "gif") {
      log(`Skipping conversion for SVG or GIF: ${imageUrl}`, config.showLogs);
      return imgBuffer;
    }

    const webpQuality = config.webpQuality || IMAGE_QUALITY;

    if (metadata.format !== DEFAULT_IMAGE_FORMAT) {
      log(`Converting image to WebP format`, config.showLogs);
      const webpBuffer = await image.webp({ quality: webpQuality }).toBuffer();

      imageCache.set(cacheKey, webpBuffer);
      return webpBuffer;
    } else {
      log(`Image is already in WebP format`, config.showLogs);
      return imgBuffer;
    }
  } catch (error) {
    handleError(error, `${ERROR_PREFIX} converting image to WebP`);
    throw error;
  }
};
