import { BaseSnipper } from './BaseSnipper.js';
import { SnipperError, isSnipperError } from '../error/SnipperError.js';
import { type SnipResult, type SnipperId } from '../types/snipper.js';

class DagdSnipper extends BaseSnipper {
  private readonly baseUrl: string = 'https://da.gd';
  private readonly snipperId: SnipperId = 'dagd';

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

  async unSnip(snippedUrl: string): Promise<SnipResult> {
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
