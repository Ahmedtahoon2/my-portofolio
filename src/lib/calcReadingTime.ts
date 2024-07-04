interface ReadingOptions {
  wordsPerMinute?: number;
}

/**
 * Calculates the estimated reading time for a given text.
 *
 * This function removes HTML tags, code blocks, and other elements to calculate the word count and estimate the reading time.
 *
 * @param {string} text - The input text for which the reading time is to be calculated.
 * @param {ReadingOptions} [options={}] - Configuration options for the reading time calculation.
 * @param {number} [options.wordsPerMinute=200] - The average words per minute reading speed. Defaults to 200 WPM.
 * @returns {Object} An object containing the reading time text, reading time in minutes, and word count.
 * @returns {string} return.text - A string representing the estimated reading time (e.g., "3 min read").
 * @returns {number} return.minutes - The estimated reading time in minutes.
 * @returns {number} return.words - The total word count of the text.
 *
 * @example
 * import calcReadingTime from './calcReadingTime';
 *
 * const text = `
 * This is a sample text.
 * \`\`\`js
 * console.log("This is a code block");
 * \`\`\`
 * This is more sample text.
 * `;
 *
 * const result = calcReadingTime(text, { wordsPerMinute: 250 });
 * console.log(result.text); // "1 min read"
 * console.log(result.minutes); // 1
 * console.log(result.words); // 10
 */
const calcReadingTime = (
  text: string,
  options: ReadingOptions = {}
): { text: string; minutes: number; words: number } => {
  const { wordsPerMinute = 200 } = options;

  // Remove HTML tags (if the text was converted from Markdown)
  const plainText = text
    // Remove <code> elements
    .replace(/<code>[\s\S]*?<\/code>/g, "")
    // Remove code blocks in Markdown (e.g., ```js ... ```)
    .replace(/```[\s\S]+?```/g, "")
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
