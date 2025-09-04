import { BaseSnipper, type SnipResult } from './BaseSnipper.js';
import { SnipperError, isSnipperError } from '../utils/SnipperError.js';

class DagdSnipper extends BaseSnipper {
  private readonly baseUrl: string = 'https://da.gd';

  async snip(url: string): Promise<SnipResult> {
    try {
      const snipUrl = `${this.baseUrl}/shorten`;
      const response = await this.get(snipUrl, { url });

      if (!response.ok) {
        const errorMessage = (await response.text()).trim();
        throw new SnipperError(errorMessage || 'Failed to snip URL', {
          details: {
            originalUrl: url,
            snipperId: 'dagd',
          },
        });
      }

      const snippedUrl = (await response.text()).trim();
      return { snippedUrl, originalUrl: url, snipperId: 'dagd' };
    } catch (err) {
      if (isSnipperError(err)) {
        throw err;
      }
      throw new SnipperError('Unexpected error during URL snipping', {
        cause: err,
        details: { originalUrl: url, snipperId: 'dagd' },
      });
    }
  }
}

export { DagdSnipper };
