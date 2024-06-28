// Function to generate responsive image sources

export const generateResponsiveSources = (
  url: string,
  dimensions: { width: number; height: number }
) => {
  const sizes = [480, 960, 1280]; // Reduced sizes to a smaller set
  const pixelRatio = 2; // for high-density displays
  const srcSet = sizes
    .map(size => {
      const targetWidth = Math.min(size, dimensions.width);
      const targetHeight = Math.round(
        (targetWidth / dimensions.width) * dimensions.height
      );
      const highDensityWidth = targetWidth * pixelRatio;
      const highDensityHeight = targetHeight * pixelRatio;
      return `${url}?w=${targetWidth}&h=${targetHeight} ${targetWidth}w,
              ${url}?w=${highDensityWidth}&h=${highDensityHeight} ${highDensityWidth}w 2x`;
    })
    .join(", ");
  return srcSet;
};
