// Utility function to log messages if logging is enabled
export const log = (message: string, showLogs: boolean | undefined) => {
  if (!!showLogs) {
    console.log(message);
  }
};

// Utility function to handle errors
export const handleError = (error: unknown, message: string): void => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(`${message}: ${errorMessage}`);
};
