import { ERROR_PREFIX } from "./defaults";
import { handleError, log } from "./utils";

export const enhanceSecurity = async (
  imageUrl: string,
  showLogs: boolean | undefined
): Promise<void> => {
  try {
    const response = await fetch(imageUrl, { method: "HEAD" });
    if (!response.ok) {
      throw new Error(
        `Failed security check for image: ${response.statusText}`
      );
    }
    log(`Image passed security check: ${imageUrl}`, showLogs);
  } catch (error) {
    handleError(error, `${ERROR_PREFIX} performing security check`);
    throw error;
  }
};
