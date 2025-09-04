// ---------------------------
// Types
// ---------------------------

interface ErrorOptions {
  cause?: unknown;
  code?: string;
  type?: string;
  asserter?: AssertMyClaim;
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
  readonly code?: string;
  readonly type?: string;

  constructor(message: string, options: ErrorOptions = {}) {
    super(message, { cause: options.cause });

    this.name = this.constructor.name;
    options.code && (this.code = options.code);
    options.type && (this.type = options.type);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, options.asserter || this.constructor);
    } else {
      this.stack = new Error().stack;
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      type: this.type,
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
