import fetch from 'node-fetch';

abstract class BaseSnipper {
  protected get = async (baseUrl: string, params: Record<string, unknown>) => {
    const finalUrl = this.buildUrlWithParams(baseUrl, params);
    const response = await fetch(finalUrl);

    return response;
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

  abstract snip(url: string): Promise<string>;
}

export { BaseSnipper };
