class SnipperError extends Error {
  constructor(message: string, cause?: string) {
    super(message);

    this.name = 'SnipperError';
    this.message = message;
    this.cause = cause;

    this.stack = '';
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
    };
  }
}

const isSnipperError = (err: unknown): err is SnipperError => {
  return err instanceof SnipperError;
};

export { SnipperError, isSnipperError };
