'use strict';

const fetch = require('node-fetch');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const fetch__default = /*#__PURE__*/_interopDefaultCompat(fetch);

class SnipperError extends Error {
  /**
   * Constructs a new SnipperError instance.
   *
   * @constructor
   * @param message - The error message.
   * @param cause - Optional cause of the error.
   */
  constructor(message, cause) {
    super(message);
    this.name = "SnipperError";
    this.message = message;
    this.cause = cause;
    this.stack = "";
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
      cause: this.cause
    };
  }
}
const isSnipperError = (err) => {
  return err instanceof SnipperError;
};

class BaseSnipper {
  /**
   * Constructs a new BaseSnipper instance with optional configuration.
   *
   * @constructor
   * @param config - Optional configuration object for the snipper.
   */
  constructor(config = {}) {
    this.config = config;
    this.config = {
      timeout: 2e3,
      ...config
    };
  }
  /**
   * Performs a GET request to the specified URL with optional parameters.
   *
   * @param baseUrl - The base URL for the request.
   * @param params - Optional query parameters to append to the URL.
   * @returns A Promise resolving to the fetch Response object.
   *
   */
  get = async (baseUrl, params) => {
    const controller = new AbortController();
    let timeoutId;
    if (this.config.timeout) {
      timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
    }
    try {
      const finalUrl = this.buildUrlWithParams(baseUrl, params);
      const response = await fetch__default(finalUrl, {
        signal: controller.signal
      });
      return response;
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  };
  /**
   * Builds a URL with query parameters appended.
   *
   * @param baseUrl - The base URL string.
   * @param params - Optional parameters to append.
   * @returns The constructed URL string.
   */
  buildUrlWithParams = (baseUrl, params) => {
    if (!params || Object.keys(params).length === 0) {
      return baseUrl;
    }
    const url = new URL(baseUrl);
    for (const [key, value] of Object.entries(params)) {
      if (value !== void 0 && value !== null) {
        url.searchParams.append(key, String(value));
      }
    }
    return url.toString();
  };
  /**
   * Validates and normalizes a URL string.
   *
   * @param url - The URL to validate.
   * @returns The validated and possibly normalized URL.
   * @throws {SnipperError} If the URL is empty or invalid.
   *
   * @example
   * const validUrl = this.validateUrl('example.com'); // returns 'http://example.com'
   */
  validateUrl = (url) => {
    if (!url || url.trim() === "") {
      throw new SnipperError("URL cannot be empty", url);
    }
    const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `http://${url}`;
    }
    if (!url.match(urlRegex)) {
      throw new SnipperError("Invalid URL format", url);
    }
    return url;
  };
}

exports.BaseSnipper = BaseSnipper;
exports.SnipperError = SnipperError;
exports.isSnipperError = isSnipperError;
