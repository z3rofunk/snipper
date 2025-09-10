import { describe, it, beforeEach, expect } from 'vitest';
import { Snipper } from '../Snipper';
import { SnipperError } from '../error/SnipperError';

import { SNIPPERS } from '../snippers';
import { type SnipResult } from '../types';
import { createTestUrls, type TestUrls } from './test-data';

describe('Dagd Snipper functionality', () => {
  let dagdSnipper: InstanceType<(typeof SNIPPERS)['dagd']>;
  const TEST_URLS: TestUrls = createTestUrls('dagd');

  beforeEach(() => {
    dagdSnipper = Snipper.create('dagd');
  });

  describe('snip()', () => {
    it('should shorten a valid URL successfully', async () => {
      const result: SnipResult = await dagdSnipper.snip(TEST_URLS.original);

      expect(result).toBeDefined();
      expect(result.snippedUrl).toBe(TEST_URLS.shortened);
      expect(result.originalUrl).toBe(TEST_URLS.original);
      expect(result.snipperId).toBe('dagd');
    });

    it('should reject invalid URLs', async () => {
      await expect(dagdSnipper.snip(TEST_URLS.invalid)).rejects.toThrow(
        SnipperError,
      );
    });

    it('should reject empty input', async () => {
      await expect(dagdSnipper.snip(TEST_URLS.empty)).rejects.toThrow(
        SnipperError,
      );
    });
  });

  describe('unSnip()', () => {
    beforeEach(() => {
      if (!dagdSnipper.unSnip) {
        throw new Error('unSnip method is not implemented for dagdSnipper');
      }
    });

    it('should expand a shortened URL successfully', async () => {
      const result: SnipResult = await dagdSnipper.unSnip!(TEST_URLS.shortened);

      expect(result).toBeDefined();
      expect(result.originalUrl).toBe(TEST_URLS.original);
      expect(result.snipperId).toBe('dagd');
    });

    it('should reject invalid URLs', async () => {
      await expect(dagdSnipper.unSnip!(TEST_URLS.invalid)).rejects.toThrow(
        SnipperError,
      );
    });

    it('should reject empty input', async () => {
      await expect(dagdSnipper.unSnip!(TEST_URLS.empty)).rejects.toThrow(
        SnipperError,
      );
    });

    it('should reject invalid snipped URLs', async () => {
      await expect(
        dagdSnipper.unSnip!(TEST_URLS.invalidSnipped),
      ).rejects.toThrow(SnipperError);
    });
  });
});
