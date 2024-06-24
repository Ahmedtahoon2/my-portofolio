import { resolve } from "node:path";
import { readFile } from "node:fs/promises";
import { __dirname, ERROR_PREFIX } from "./defaults";
import { handleError, log } from "./utils";

// Temporary storage for converted images
const imageCache = new Map<string, Buffer>();

// Function to get the image buffer from cache or fetch it
export const getImageBuffer = async (
  imageSrc: string,
  isExternal: boolean,
  showLogs: boolean
): Promise<Buffer> => {
  try {
    if (isExternal) {
      const response = await fetch(imageSrc);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      log(`Fetched external image: ${imageSrc}`, showLogs);
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } else {
      const filePath = resolve(__dirname, `../public/${imageSrc}`);
      log(`Reading internal image: ${filePath}`, showLogs);

      // Check cache first
      if (imageCache.has(filePath)) {
        log(`Retrieved image from cache: ${filePath}`, showLogs);
        return imageCache.get(filePath)!;
      }

      const fileBuffer = await readFile(filePath);
      imageCache.set(filePath, fileBuffer); // Store in cache
      return fileBuffer;
    }
  } catch (error) {
    handleError(error, `${ERROR_PREFIX} fetching image buffer`);
    throw error;
  }
};
