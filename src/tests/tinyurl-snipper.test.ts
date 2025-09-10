import { describe, it, beforeEach, expect } from 'vitest';
import { Snipper } from '../Snipper';
import { SnipperError } from '../error/SnipperError';

import { SNIPPERS } from '../snippers';
import { type SnipResult } from '../types';
import { createTestUrls, type TestUrls } from './test-data';

describe('TinyUrl Snipper functionality', () => {
  let tinyUrlSnipper: InstanceType<(typeof SNIPPERS)['tinyurl']>;
  const TEST_URLS: TestUrls = createTestUrls('tinyurl');

  beforeEach(() => {
    tinyUrlSnipper = Snipper.create('tinyurl');
  });

  describe('snip()', () => {
    it('should shorten a valid URL successfully', async () => {
      const result: SnipResult = await tinyUrlSnipper.snip(TEST_URLS.original);

      expect(result).toBeDefined();
      expect(result.snippedUrl).toBe(TEST_URLS.shortened);
      expect(result.originalUrl).toBe(TEST_URLS.original);
      expect(result.snipperId).toBe('tinyurl');
    });

    it('should reject invalid URLs', async () => {
      await expect(tinyUrlSnipper.snip(TEST_URLS.invalid)).rejects.toThrow(
        SnipperError,
      );
    });

    it('should reject empty input', async () => {
      await expect(tinyUrlSnipper.snip(TEST_URLS.empty)).rejects.toThrow(
        SnipperError,
      );
    });
  });
});
