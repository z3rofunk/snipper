import fetch from 'node-fetch';
import { SnipperError } from '../error/SnipperError.js';

import { type SnipperConfig, type SnipResult } from '../types/snipper.js';

export abstract class BaseSnipper {
  constructor(protected config: SnipperConfig = {}) {
    this.config = {
      timeout: 2000,
      ...config,
    };
  }

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

  abstract snip(url: string): Promise<SnipResult> | never;

  abstract unSnip?(snippedUrl: string): Promise<SnipResult>;
}
