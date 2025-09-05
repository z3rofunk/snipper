import { SNIPPERS } from './snippers/index.js';
import {
  type SnipperId,
  type SnipperConfig,
  type SnipperConstructor,
} from './types/snipper.js';

class Snipper {
  static create<T extends SnipperId & keyof typeof SNIPPERS>(
    snipperId: T,
    config: SnipperConfig = {},
  ): InstanceType<(typeof SNIPPERS)[T]> {
    const SnipperClass = SNIPPERS[snipperId] as SnipperConstructor;
    if (!SnipperClass) {
      throw new Error(`Snipper with id '${snipperId}' not found`);
    }
    return new SnipperClass(config) as InstanceType<(typeof SNIPPERS)[T]>;
  }

  static getAvailableSnippers(): SnipperId[] {
    return Object.keys(SNIPPERS) as SnipperId[];
  }
}

export { Snipper };
