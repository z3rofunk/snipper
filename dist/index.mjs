import { SNIPPERS } from './snippers/index.mjs';
import './snippers/DagdSnipper.mjs';
import './shared/snippers.BxBtaZqa.mjs';
import 'node-fetch';

class Snipper {
  /**
   * Creates a new snipper instance of the specified type.
   *
   * @param snipperId - The ID of the snipper to create.
   * @param config - Optional configuration for the snipper.
   * @returns A new instance of the requested snipper.
   * @throws {Error} If the snipper ID is not found.
   *
   * @example
   * const snipper = Snipper.create('dagd', { timeout: 5000 });
   * const result = await snipper.snip('https://example.com');
   */
  static create(snipperId, config = {}) {
    const SnipperClass = SNIPPERS[snipperId];
    if (!SnipperClass) {
      throw new Error(`Snipper with id '${snipperId}' not found`);
    }
    return new SnipperClass(config);
  }
  /**
   * Retrieves a list of available snipper IDs.
   *
   * @returns {SnipperId[]} An array of available snipper IDs.
   *
   * @example
   * const available = Snipper.getAvailableSnippers();
   * console.log(available); // ['dagd']
   */
  static getAvailableSnippers() {
    return Object.keys(SNIPPERS);
  }
}

export { Snipper };
