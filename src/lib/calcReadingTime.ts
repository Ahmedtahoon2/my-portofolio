const calcReadingTime = (
  text: string
): { text: string; minutes: number; words: number } => {
  // Calculate words count
  const words = text.trim().split(/\s+/).length;

  // Words per minute based on average reading speed
  const wordsPerMinute = 200;

  // Calculate reading time in minutes
  const minutes = Math.ceil(words / wordsPerMinute);

  return {
    text: `${minutes} min read`,
    minutes,
    words,
  };
};

export default calcReadingTime;
