const calcReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = words / wordsPerMinute;
  const readingTime = Math.ceil(minutes);
  return {
    text: `${readingTime} min read`,
    minutes: readingTime,
    words: words,
  };
};

export default calcReadingTime;
