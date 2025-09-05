// ---------------------------
// Types
// ---------------------------

interface ErrorOptions {
  cause?: unknown;
  asserter?: AssertMyClaim;
}

interface SnipperErrorDetails {
  snipperId?: string;
  originalUrl: string;
}

type AssertMyClaim = (
  condition: unknown,
  message: string,
  options?: Omit<ErrorOptions, 'asserter'>,
) => asserts condition;

// ---------------------------
// Error Classes
// ---------------------------
class SnipperError extends Error {
  readonly details?: SnipperErrorDetails;

  constructor(
    message: string,
    options: ErrorOptions & { details?: SnipperErrorDetails },
  ) {
    super(message, { cause: options.cause });

    this.name = this.constructor.name;
    options.details && (this.details = options.details);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, options.asserter || this.constructor);
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      details: this.details,
    };
  }
}

// ---------------------------
// Type Guards
// ---------------------------

const isSnipperError = (err: unknown): err is SnipperError => {
  return err instanceof SnipperError;
};

// ---------------------------
// Assertion Functions
// ---------------------------
const assertMyClaim: AssertMyClaim = (condition, message, options = {}) => {
  if (!condition) {
    throw new SnipperError(message, {
      ...options,
      asserter: assertMyClaim,
    });
  }
};

export { SnipperError, isSnipperError, assertMyClaim };
