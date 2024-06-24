import { fileURLToPath } from "node:url";
import { dirname } from "path";

const RESIZE_DIMENSIONS = { width: 10, height: 10 };
const VALID_BLUR_EXT = [
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".jpg",
  ".svg",
  ".gif",
];
const EXTERNAL_URL_REGEX = /^https?:\/\//;
const IMAGE_QUALITY = 80;
const DEFAULT_IMAGE_FORMAT = "webp";
const ERROR_PREFIX = "Error";
const __dirname = dirname(fileURLToPath(import.meta.url));

export {
  __dirname,
  RESIZE_DIMENSIONS,
  VALID_BLUR_EXT,
  EXTERNAL_URL_REGEX,
  IMAGE_QUALITY,
  DEFAULT_IMAGE_FORMAT,
  ERROR_PREFIX,
};
