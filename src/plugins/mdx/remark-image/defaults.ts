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
const IMAGE_QUALITY = 85;
const DEFAULT_IMAGE_FORMAT = "webp";
const ERROR_PREFIX = "Error";

export {
  RESIZE_DIMENSIONS,
  VALID_BLUR_EXT,
  EXTERNAL_URL_REGEX,
  IMAGE_QUALITY,
  DEFAULT_IMAGE_FORMAT,
  ERROR_PREFIX,
};
