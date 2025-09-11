import { SNIPPERS } from '../snippers';

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
export type SnipperId = keyof typeof SNIPPERS;
