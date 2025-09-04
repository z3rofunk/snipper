import fetch from 'node-fetch';
import { type SnipperConfig, type SnipResult } from '../types/snipper.js';

export abstract class BaseSnipper {
  constructor(protected config: SnipperConfig = {}) {
    this.config = {
      timeout: 2000,
      ...config,
    };
  }

  protected get = async (baseUrl: string, params: Record<string, unknown>) => {
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

  abstract snip(url: string): Promise<SnipResult> | never;
}
