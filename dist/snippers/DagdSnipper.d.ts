import { B as BaseSnipper, b as SnipResult } from '../shared/snippers.CXVLyLL-.js';
import 'node-fetch';

declare class DagdSnipper extends BaseSnipper {
    /** The base URL for the da.gd API. */
    private readonly baseUrl;
    /** The identifier for this snipper. */
    private readonly snipperId;
    /**
     * Shortens a given URL using the da.gd integration.
     *
     * @override
     * @param {string} url - The URL to snip (shorten).
     * @returns {Promise<SnipResult>} A Promise resolving to the SnipResult containing the snipped (shortened) URL.
     * @throws {SnipperError} If validation fails or the API request fails.
     *
     * @example
     * const dagdSnipper = Snipper.create('dagd');
     * const result = await dagdSnipper.snip('https://example.com');
     * console.log(result.snippedUrl); // e.g., 'https://da.gd/abc123'
     */
    snip(url: string): Promise<SnipResult>;
    /**
     * Expands a snipped (shortened) da.gd URL to its original form.
     *
     * @override
     * @param {string} snippedUrl - The snipped (shortened) URL to un-snip (expand).
     * @returns {Promise<SnipResult>} A Promise resolving to the SnipResult containing the original URL.
     * @throws {SnipperError} If validation fails, the URL is not a da.gd URL, or the API request fails.
     *
     * @example
     * const dagdSnipper = Snipper.create('dagd');
     * const result = await dagdSnipper.unSnip('https://da.gd/abc123');
     * console.log(result.originalUrl); // e.g., 'https://example.com'
     */
    unSnip(snippedUrl: string): Promise<SnipResult>;
}

export { DagdSnipper };
