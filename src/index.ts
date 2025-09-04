import { BaseSnipper, type SnipperConfig } from './snippers/BaseSnipper.js';
import { SNIPPERS, type SnipperId } from './snippers/index.js';

class Snipper {
  static create<T extends BaseSnipper>(
    snipperId: SnipperId,
    config: SnipperConfig = {},
  ): T {
    const snipper = SNIPPERS[snipperId];
    if (!snipper) {
      throw new Error(`Snipper with id '${snipperId}' not found`);
    }
    return new snipper(config) as T;
  }

  static getAvailableSnippers(): string[] {
    return Object.keys(SNIPPERS);
  }
}

export { Snipper };
