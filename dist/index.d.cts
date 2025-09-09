import { SNIPPERS } from './snippers/index.cjs';
import { S as SnipperId, a as SnipperConfig } from './shared/snippers.CXVLyLL-.cjs';
export { b as SnipResult, c as SnipperConstructor } from './shared/snippers.CXVLyLL-.cjs';
import './snippers/DagdSnipper.cjs';
import 'node-fetch';

/**
 *  Class for creating snipper instances based on ID.
 */
declare class Snipper {
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
    static create<T extends SnipperId & keyof typeof SNIPPERS>(snipperId: T, config?: SnipperConfig): InstanceType<(typeof SNIPPERS)[T]>;
    /**
     * Retrieves a list of available snipper IDs.
     *
     * @returns {SnipperId[]} An array of available snipper IDs.
     *
     * @example
     * const available = Snipper.getAvailableSnippers();
     * console.log(available); // ['dagd']
     */
    static getAvailableSnippers(): SnipperId[];
}

export { Snipper, SnipperConfig, SnipperId };
