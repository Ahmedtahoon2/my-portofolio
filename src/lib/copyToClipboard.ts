/**
 * Copies the given text to the clipboard using the Clipboard API if available, or falls back to a textarea-based method.
 *
 * @param {string} text - The text to copy to the clipboard.
 * @returns {Promise<void>} A promise that resolves when the text is successfully copied to the clipboard, or rejects if an error occurs.
 *
 * @throws {Error} Throws an error if copying to the clipboard fails, with a descriptive error message.
 *
 * @example
 * import { copyToClipboard } from './copyToClipboard';
 *
 * const textToCopy = "Hello, world!";
 *
 * try {
 *   await copyToClipboard(textToCopy);
 *   console.log("Text copied to clipboard successfully!");
 * } catch (error) {
 *   console.error("Failed to copy text to clipboard:", error.message);
 * }
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (navigator?.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to write to clipboard: ${error.message}`);
      } else {
        throw new Error("Failed to write to clipboard: Unknown error");
      }
    }
  } else {
    // Fallback for older browsers
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed"; // Avoid scrolling to bottom
      textArea.style.opacity = "0"; // Invisible textarea
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (!successful) {
        throw new Error("Fallback: Copying text command was unsuccessful.");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Fallback: Unable to copy to clipboard: ${error.message}`
        );
      } else {
        throw new Error("Fallback: Unable to copy to clipboard: Unknown error");
      }
    }
  }
}
