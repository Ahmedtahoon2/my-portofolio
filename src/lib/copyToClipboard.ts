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
