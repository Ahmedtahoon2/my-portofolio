import pkg from "lru_map";
import { dirname, resolve } from "node:path";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { ERROR_PREFIX } from "./defaults";
import { handleError, log } from "./utils";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Temporary storage for converted images
const { LRUMap } = pkg;
const imageCache = new LRUMap<string, Buffer>(100);

// Function to get the image buffer from cache or fetch it
export const getImageBuffer = async (
  imageSrc: string,
  isExternal: boolean,
  showLogs: boolean
): Promise<Buffer> => {
  try {
    const cacheKey = `${isExternal ? "external" : "internal"}-${imageSrc}`;

    // Check cache first
    if (imageCache.has(cacheKey)) {
      log(`Retrieved image from cache: ${cacheKey}`, showLogs);
      return imageCache.get(cacheKey)!;
    }

    let fileBuffer: Buffer;
    if (isExternal) {
      const response = await fetch(imageSrc);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      log(`Fetched external image: ${imageSrc}`, showLogs);
      const arrayBuffer = await response.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
    } else {
      const filePath = resolve(__dirname, `../public/${imageSrc}`);
      log(`Reading internal image: ${filePath}`, showLogs);
      fileBuffer = await readFile(filePath);
    }

    imageCache.set(cacheKey, fileBuffer); // Store in cache
    return fileBuffer;
  } catch (error) {
    handleError(error, `${ERROR_PREFIX} fetching image buffer`);
    throw error;
  }
};
