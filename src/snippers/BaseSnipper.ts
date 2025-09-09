import fetch from 'node-fetch';
import { SnipperError } from '../error/SnipperError.js';

import { type SnipperConfig, type SnipResult } from '../types/snipper.js';

export abstract class BaseSnipper {
  /**
   * Constructs a new BaseSnipper instance with optional configuration.
   *
   * @constructor
   * @param config - Optional configuration object for the snipper.
   */
  constructor(protected config: SnipperConfig = {}) {
    this.config = {
      timeout: 2000,
      ...config,
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
  protected get = async (baseUrl: string, params?: Record<string, unknown>) => {
    const controller = new AbortController();

    let timeoutId: NodeJS.Timeout | undefined;
    if (this.config.timeout) {
      timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
    }

    try {
      const finalUrl = this.buildUrlWithParams(baseUrl, params);
      const response = await fetch(finalUrl, {
        signal: controller.signal,
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
  private buildUrlWithParams = (
    baseUrl: string,
    params?: Record<string, unknown>,
  ): string => {
    if (!params || Object.keys(params).length === 0) {
      return baseUrl;
    }

    const url = new URL(baseUrl);
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
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
  protected validateUrl = (url: string) => {
    if (!url || url.trim() === '') {
      throw new SnipperError('URL cannot be empty', url);
    }
    const urlRegex: RegExp =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `http://${url}`;
    }

    if (!url.match(urlRegex)) {
      throw new SnipperError('Invalid URL format', url);
    }
    return url;
  };

  /**
   * Abstract method to snip (shorten) a URL.
   *
   * @param {string} url - The URL to snip.
   * @returns {Promise<SnipResult>} A Promise resolving to the SnipResult.
   * @throws {SnipperError} If snipping fails.
   */
  abstract snip(url: string): Promise<SnipResult>;

  /**
   * Optional abstract method to un-snip (expand) a shortened URL.
   *
   * @param {string} snippedUrl - The snipped (shortened) URL to un-snip (expand).
   * @returns  {Promise<SnipResult>} A Promise resolving to the SnipResult with original URL.
   * @throws {SnipperError} If un-snipping fails.
   */
  abstract unSnip?(snippedUrl: string): Promise<SnipResult>;
}
