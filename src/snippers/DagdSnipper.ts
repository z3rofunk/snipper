import { BaseSnipper } from './BaseSnipper.js';

class DagdSnipper extends BaseSnipper {
  private readonly baseUrl: string = 'https://da.gd';

  async snip(url: string): Promise<string> {
    try {
      const snipUrl = `${this.baseUrl}/shorten`;
      const response = await this.get(snipUrl, { url });
      return response.text.toString().trim();
    } catch (err) {}
  }
}

export { DagdSnipper };
