import { BaseSnipper } from '../snippers/BaseSnipper.js';

export interface SnipResult {
  /** The snipped (shortened) URL. */
  snippedUrl: string;
  /** The original URL that was snipped. */
  originalUrl: string;
  /** The ID of the snipper used. */
  snipperId: string;
}

/**
 * Configuration options for snipper instances.
 */
export interface SnipperConfig {
  /** Optional timeout in milliseconds for operations. */
  timeout?: number;
}

/**
 * Type alias for available snipper identifiers.
 */
export type SnipperId = 'dagd' | 'tinyurl';

/**
 * Constructor type for snipper classes.
 *
 * @template T - The type of snipper this constructor creates.
 */
export type SnipperConstructor<T extends BaseSnipper = BaseSnipper> = new (
  config?: SnipperConfig,
) => T;
