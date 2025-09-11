import { BaseSnipper } from './BaseSnipper.js';
import { SnipperError } from '../error/SnipperError.js';
import { type SnipResult, type SnipperId } from '../types/snipper.js';

class IsgdSnipper extends BaseSnipper {
  /** The base URL for the da.gd API. */
  private readonly baseUrl: string = 'https://is.gd';
  /** The identifier for this snipper. */
  private readonly snipperId: SnipperId = 'isgd';

  /**
   * Shortens a given URL using the is.gd integration.
   *
   * @override
   * @param {string} url - The URL to snip (shorten).
   * @param {string} alias - Optional custom alias for the shortened URL.
   * @returns {Promise<SnipResult>} A Promise resolving to the SnipResult containing the snipped (shortened) URL.
   * @throws {SnipperError} If validation fails or the API request fails.
   *
   * @example
   * const isgdSnipper = Snipper.create('isgd');
   *
   * // Without alias
   * const result1 = await isgdSnipper.snip('https://example.com');
   * console.log(result1.snippedUrl); // e.g., 'https://is.gd/abc123'
   *
   * // With alias
   * const result2 = await isgdSnipper.snip('https://example.com', 'myalias');
   * console.log(result2.snippedUrl); // e.g., 'https://is.gd/myalias'
   */
  async snip(url: string, alias?: string): Promise<SnipResult> {
    try {
      this.validateUrl(url);
      const response = await this.get(`${this.baseUrl}/create.php`, {
        url,
        format: 'simple',
        ...(!!alias && { shorturl: alias }),
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
      this.handleError(err, this.snipperId);
    }
  }
}

export { IsgdSnipper };
