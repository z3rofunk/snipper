import { BaseSnipper } from './BaseSnipper.js';
import { SnipperError, isSnipperError } from '../error/SnipperError.js';
import { type SnipResult, type SnipperId } from '../types/snipper.js';

class DagdSnipper extends BaseSnipper {
  /** The base URL for the da.gd API. */
  private readonly baseUrl: string = 'https://da.gd';
  /** The identifier for this snipper. */
  private readonly snipperId: SnipperId = 'dagd';

  /**
   * Shortens a given URL using the da.gd integration.
   *
   * @override
   * @param {string} url - The URL to snip (shorten).
   * @returns {Promise<SnipResult>} A Promise resolving to the SnipResult containing the snipped (shortened) URL.
   * @throws {SnipperError} If validation fails or the API request fails.
   *
   * @example
   * const dagdSnipper = Snipper.create('dagd');
   * const result = await dagdSnipper.snip('https://example.com');
   * console.log(result.snippedUrl); // e.g., 'https://da.gd/abc123'
   */
  async snip(url: string): Promise<SnipResult> {
    try {
      this.validateUrl(url);
      const response = await this.get(`${this.baseUrl}/shorten`, { url });
      const responseText = (await response.text()).trim();

      if (!response.ok) {
        throw new SnipperError(responseText || 'Failed to snip URL', url);
      }

      return {
        snippedUrl: responseText,
        originalUrl: url,
        snipperId: this.snipperId,
      };
    } catch (err) {
      if (isSnipperError(err)) throw err;
      throw new SnipperError('Unexpected error during URL snipping');
    }
  }

  /**
   * Expands a snipped (shortened) da.gd URL to its original form.
   *
   * @override
   * @param {string} snippedUrl - The snipped (shortened) URL to un-snip (expand).
   * @returns {Promise<SnipResult>} A Promise resolving to the SnipResult containing the original URL.
   * @throws {SnipperError} If validation fails, the URL is not a da.gd URL, or the API request fails.
   *
   * @example
   * const dagdSnipper = Snipper.create('dagd');
   * const result = await dagdSnipper.unSnip('https://da.gd/abc123');
   * console.log(result.originalUrl); // e.g., 'https://example.com'
   */
  override async unSnip(snippedUrl: string): Promise<SnipResult> {
    try {
      this.validateUrl(snippedUrl);
      const DAGD_URL_PREFIX = 'da.gd/';
      const prefixIndex = snippedUrl.indexOf(DAGD_URL_PREFIX);

      if (prefixIndex === -1) {
        throw new SnipperError('Failed to unsnip URL', snippedUrl);
      }

      const shortCode = snippedUrl.substring(
        prefixIndex + DAGD_URL_PREFIX.length,
      );

      const response = await this.get(`${this.baseUrl}/coshorten/${shortCode}`);
      const responseText = (await response.text()).trim();

      if (!response.ok) {
        throw new SnipperError(
          responseText || 'Failed to unsnip URL',
          snippedUrl,
        );
      }

      const originalUrl = responseText;
      return {
        originalUrl,
        snippedUrl,
        snipperId: this.snipperId,
      };
    } catch (err) {
      if (isSnipperError(err)) throw err;
      throw new SnipperError('Unexpected error during URL unsnipping');
    }
  }
}

export { DagdSnipper };
