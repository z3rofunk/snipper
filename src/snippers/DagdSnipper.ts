import { BaseSnipper } from './BaseSnipper.js';
import { SnipperError, isSnipperError } from '../error/SnipperError.js';
import { type SnipResult, type SnipperId } from '../types/snipper.js';

class DagdSnipper extends BaseSnipper {
  private readonly baseUrl: string = 'https://da.gd';
  private readonly snipperId: SnipperId = 'dagd';

  async snip(url: string): Promise<SnipResult> {
    const baseDetails = { originalUrl: url, snipperId: this.snipperId };

    try {
      this.validateUrl(url);
      const response = await this.get(`${this.baseUrl}/shorten`, { url });

      if (!response.ok) {
        const errorMessage = (await response.text()).trim();
        throw new SnipperError(errorMessage || 'Failed to snip URL', url);
      }

      const snippedUrl = (await response.text()).trim();
      return { snippedUrl, ...baseDetails };
    } catch (err) {
      if (isSnipperError(err)) throw err;

      throw new SnipperError('Unexpected error during URL snipping');
    }
  }
}

export { DagdSnipper };
