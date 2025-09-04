import { BaseSnipper, type SnipResult } from './BaseSnipper.js';
import { SnipperError } from '../utils/SnipperError.js';

class DagdSnipper extends BaseSnipper {
  private readonly baseUrl: string = 'https://da.gd';

  async snip(url: string): Promise<SnipResult> | never {
    try {
      const snipUrl = `${this.baseUrl}/shorten`;
      const response = await this.get(snipUrl, { url });
      const data = (await response.text()).trim();
      return { snippedUrl: data, originalUrl: url, snipperId: 'dagd' };
    } catch (err: unknown) {
      throw new SnipperError('');
    }
  }
}

export { DagdSnipper };
