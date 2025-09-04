import { SNIPPERS, type SnipperConstructor } from './snippers/index.js';
class Snipper {
  static create(snipperId: string): InstanceType<SnipperConstructor> {
    const snipper = SNIPPERS[snipperId];
    if (!snipper) {
      throw new Error(`Snipper with id '${snipperId}' not found`);
    }
    return new snipper();
  }

  static getAvailableSnippers(): string[] {
    return Object.keys(SNIPPERS);
  }
}

export { Snipper };
