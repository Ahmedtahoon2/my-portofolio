import { ERROR_PREFIX, EXTERNAL_URL_REGEX, VALID_BLUR_EXT } from "./defaults";
import { enhanceSecurity } from "./enhanceSecurity";
import { generateResponsiveSources } from "./generateSrcSet";
import { getWebPBuffer } from "./getWebPBuffer";
import { getBlurData } from "./imageBlur";
import { getImageDimensions } from "./imageDimensions";
import { Config, ImageNode } from "./types";

// Main function to process each image node
export const imageProcess = async (imageNode: ImageNode, config: Config) => {
  const isExternal = EXTERNAL_URL_REGEX.test(imageNode.url);

  if (isExternal) {
    await enhanceSecurity(imageNode.url, config.showLogs);
  }

  try {
    const webPBuffer = await getWebPBuffer(imageNode.url, isExternal, config);

    const dimensions = await getImageDimensions(
      webPBuffer,
      imageNode.url,
      config
    );

    if (dimensions) {
      const blurData = await getBlurData(
        webPBuffer,
        imageNode.url,
        dimensions.width,
        dimensions.height
      );

      // Check if the image has blur effect
      const hasBlur = VALID_BLUR_EXT.some(ext => imageNode.url.endsWith(ext));

      // Generate responsive sources
      const srcSet = generateResponsiveSources(imageNode.url, dimensions);

      // Update image node properties to JSX structure
      imageNode.type = "mdxJsxFlowElement";
      imageNode.name = "Image";
      imageNode.attributes = [
        { type: "mdxJsxAttribute", name: "alt", value: imageNode.alt },
        { type: "mdxJsxAttribute", name: "src", value: imageNode.url },
        { type: "mdxJsxAttribute", name: "width", value: dimensions.width },
        { type: "mdxJsxAttribute", name: "height", value: dimensions.height },
        { type: "mdxJsxAttribute", name: "srcSet", value: srcSet },
        {
          type: "mdxJsxAttribute",
          name: "sizes",
          value: "(max-width: 1600px) 100vw, 1600px",
        },
      ];

      // Add blur data attributes if blur effect exists
      if (hasBlur && blurData?.blurDataURL) {
        imageNode.attributes.push(
          {
            type: "mdxJsxAttribute",
            name: "placeholder",
            value: blurData.placeholder,
          },
          {
            type: "mdxJsxAttribute",
            name: "blurDataURL",
            value: blurData.blurDataURL,
          }
        );
      }

      // Set parent node type to "div" if it exists
      if (imageNode.parent) {
        imageNode.parent.type = "div";
      }
    } else {
      console.error(
        `${ERROR_PREFIX} getting image dimensions: ${imageNode.url}`
      );
    }
  } catch (error) {
    console.error(`${ERROR_PREFIX} processing image: ${imageNode.url}`, error);
  }
};
