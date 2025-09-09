import * as node_fetch from 'node-fetch';

interface SnipResult {
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
interface SnipperConfig {
    /** Optional timeout in milliseconds for operations. */
    timeout?: number;
}
/**
 * Type alias for available snipper identifiers.
 */
type SnipperId = 'dagd';
/**
 * Constructor type for snipper classes.
 *
 * @template T - The type of snipper this constructor creates.
 */
type SnipperConstructor<T extends BaseSnipper = BaseSnipper> = new (config?: SnipperConfig) => T;

declare abstract class BaseSnipper {
    protected config: SnipperConfig;
    /**
     * Constructs a new BaseSnipper instance with optional configuration.
     *
     * @constructor
     * @param config - Optional configuration object for the snipper.
     */
    constructor(config?: SnipperConfig);
    /**
     * Performs a GET request to the specified URL with optional parameters.
     *
     * @param baseUrl - The base URL for the request.
     * @param params - Optional query parameters to append to the URL.
     * @returns A Promise resolving to the fetch Response object.
     *
     */
    protected get: (baseUrl: string, params?: Record<string, unknown>) => Promise<node_fetch.Response>;
    /**
     * Builds a URL with query parameters appended.
     *
     * @param baseUrl - The base URL string.
     * @param params - Optional parameters to append.
     * @returns The constructed URL string.
     */
    private buildUrlWithParams;
    /**
     * Validates and normalizes a URL string.
     *
     * @param url - The URL to validate.
     * @returns The validated and possibly normalized URL.
     * @throws {SnipperError} If the URL is empty or invalid.
     *
     * @example
     * const validUrl = this.validateUrl('example.com'); // returns 'http://example.com'
     */
    protected validateUrl: (url: string) => string;
    /**
     * Abstract method to snip (shorten) a URL.
     *
     * @param {string} url - The URL to snip.
     * @returns {Promise<SnipResult>} A Promise resolving to the SnipResult.
     * @throws {SnipperError} If snipping fails.
     */
    abstract snip(url: string): Promise<SnipResult>;
    /**
     * Optional abstract method to un-snip (expand) a shortened URL.
     *
     * @param {string} snippedUrl - The snipped (shortened) URL to un-snip (expand).
     * @returns  {Promise<SnipResult>} A Promise resolving to the SnipResult with original URL.
     * @throws {SnipperError} If un-snipping fails.
     */
    abstract unSnip?(snippedUrl: string): Promise<SnipResult>;
}

export { BaseSnipper as B };
export type { SnipperId as S, SnipperConfig as a, SnipResult as b, SnipperConstructor as c };
