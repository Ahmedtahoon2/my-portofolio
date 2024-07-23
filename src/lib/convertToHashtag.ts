export function convertToHashtag(arr: string[], defaultTag: string) {
  const hashtagsArray = arr.map(str => `#${str.replace(/ /g, "_")}`);

  hashtagsArray.unshift(defaultTag);

  return hashtagsArray;
}
