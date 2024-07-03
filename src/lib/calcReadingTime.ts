export interface ReadingOptions {
  wordsPerMinute?: number;
}

const calcReadingTime = (
  text: string,
  options: ReadingOptions = {}
): { text: string; minutes: number; words: number } => {
  const { wordsPerMinute = 200 } = options;

  // Remove HTML tags (if the text was converted from Markdown)
  const plainText = text
    // Remove <code> elements
    .replace(/<code>.*?<\/code>/gs, "")
    // Remove code blocks in Markdown (e.g., ```js ... ```)
    .replace(/```[^`]+```/gs, "")
    // Remove other HTML tags
    .replace(/<[^>]*>/g, "");

  // Calculate word count
  const words = plainText.trim().split(/\s+/).length;

  // Calculate reading time in minutes
  const minutes = Math.ceil(words / wordsPerMinute);

  return {
    text: `${minutes} min read`,
    minutes,
    words,
  };
};

export default calcReadingTime;
