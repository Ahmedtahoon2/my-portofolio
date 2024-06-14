export function copyToClipboard(text: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (navigator?.clipboard) {
      // Use the modern Clipboard API if available
      navigator.clipboard.writeText(text).then(resolve).catch(reject);
    } else {
      // Clipboard API is not supported
      reject(new Error("Clipboard API is not supported in this browser."));
    }
  });
}
