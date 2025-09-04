import { BaseSnipper } from './BaseSnipper.js';
import { SnipperError } from '../utils/SnipperError.js';

class DagdSnipper extends BaseSnipper {
  private readonly baseUrl: string = 'https://da.gd';

  async snip(url: string): Promise<string> | never {
    try {
      const snipUrl = `${this.baseUrl}/shorten`;
      const response = await this.get(snipUrl, { url });
      return (await response.text()).trim();
    } catch (err: unknown) {
      throw new SnipperError('');
    }
  }
}

export { DagdSnipper };
