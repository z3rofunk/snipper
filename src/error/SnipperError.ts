class SnipperError extends Error {
  /**
   * Constructs a new SnipperError instance.
   *
   * @constructor
   * @param message - The error message.
   * @param cause - Optional cause of the error.
   */
  constructor(message: string, cause?: string) {
    super(message);

    this.name = 'SnipperError';
    this.message = message;
    this.cause = cause;

    this.stack = '';
  }

  /**
   * Returns a JSON representation of the error.
   *
   * @returns An object containing name, message, and cause.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
    };
  }
}

/**
 * Type guard to check if an error is a SnipperError.
 *
 * @param err - The error to check.
 * @returns True if the error is a SnipperError instance.
 */
const isSnipperError = (err: unknown): err is SnipperError => {
  return err instanceof SnipperError;
};

export { SnipperError, isSnipperError };
