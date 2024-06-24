import { convertToWebP } from "./convertToWebP";
import { getImageBuffer } from "./imageBuffer";
import { Config } from "./types";

export const getWebPBuffer = async (
  imageSrc: string,
  isExternal: boolean,
  config: Config
) => {
  const imgBuffer = await getImageBuffer(imageSrc, isExternal, config.showLogs);
  const webPBuffer = await convertToWebP(imgBuffer, imageSrc, config);
  return webPBuffer;
};
