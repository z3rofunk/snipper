import { BaseSnipper } from './BaseSnipper.js';
import { SnipperError, isSnipperError } from '../error/SnipperError.js';
import { type SnipResult, type SnipperId } from '../types/snipper.js';

class TinyUrlSnipper extends BaseSnipper {
  /** The base URL for the tinyurl API. */
  private readonly baseUrl: string = 'https://tinyurl.com';
  /** The identifier for this snipper. */
  private readonly snipperId: SnipperId = 'tinyurl';

  /**
   * Shortens a given URL using the tinyurl integration.
   *
   * @override
   * @param {string} url - The URL to snip (shorten).
   * @returns {Promise<SnipResult>} A Promise resolving to the SnipResult containing the snipped (shortened) URL.
   * @throws {SnipperError} If validation fails or the API request fails.
   *
   * @example
   * const tinyUrlSnipper = Snipper.create('tinyurl');
   * const result = await tinyUrlSnipper.snip('https://example.com');
   * console.log(result.snippedUrl); // e.g., 'https://tinyurl.com/abc123'
   */
  async snip(url: string): Promise<SnipResult> {
    try {
      this.validateUrl(url);
      const response = await this.get(`${this.baseUrl}/api-create.php`, {
        url,
      });
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
}

export { TinyUrlSnipper };
