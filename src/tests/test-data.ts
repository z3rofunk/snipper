import { type SnipperId } from '../types/snipper.js';

export interface TestUrls {
  original: string;
  shortened: string;
  invalid: string;
  invalidSnipped: string;
  empty: string;
}

/**
 * Base test URLs that are common across all snippers
 */
const BASE_TEST_URLS = {
  original: 'https://github.com/z3rofunk/snipper',
  invalid: 'not-a-valid-url',
  empty: '',
} as const;

/**
 * Provider-specific shortened URLs and invalid shortened URLs
 */
const PROVIDER_SPECIFIC_URLS: Record<
  SnipperId,
  Pick<TestUrls, 'shortened' | 'invalidSnipped'>
> = {
  dagd: {
    shortened: 'https://da.gd/eJqz0',
    invalidSnipped: 'https://da/eJqz0',
  },
  tinyurl: {
    shortened: 'https://tinyurl.com/22of4hgp',
    invalidSnipped: 'https://turl.com/abc123',
  },
};

/**
 * Creates test URLs for a specific snipper provider
 *
 * @param snipperId - The ID of the snipper to create test URLs for
 * @returns Complete test URL set for the specified provider
 *
 * @example
 * const dagdUrls = createTestUrls('dagd');
 * const tinyUrlUrls = createTestUrls('tinyurl');
 */
export const createTestUrls = (snipperId: SnipperId): TestUrls => {
  return {
    ...BASE_TEST_URLS,
    ...PROVIDER_SPECIFIC_URLS[snipperId],
  };
};
