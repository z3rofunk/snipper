import { describe, it, beforeEach, expect } from 'vitest';
import { Snipper } from '../Snipper';
import { SnipperError } from '../error/SnipperError';

import { SNIPPERS } from '../snippers';
import { type SnipResult } from '../types';

describe('Snipper Dagd shortening functionality', () => {
  let dagdSnipper: InstanceType<(typeof SNIPPERS)['dagd']>;
  const expandedUrl: string = 'https://github.com/z3rofunk/snipper';
  const snippedUrl: string = 'https://da.gd/eJqz0';

  beforeEach(() => {
    dagdSnipper = Snipper.create('dagd');
  });

  it('should successfully shorten a valid URL', async () => {
    const snipped: SnipResult = await dagdSnipper.snip(expandedUrl);

    expect(snipped).toBeDefined();
    expect(snipped.snippedUrl).not.toBe(expandedUrl);
    expect(snipped.snippedUrl).toBe(snippedUrl);
    expect(snipped.originalUrl).toBe(expandedUrl);
  });

  it('should handle invalid URLs gracefully', async () => {
    const invalidUrl = 'not-a-valid-url';

    await expect(dagdSnipper.snip(invalidUrl)).rejects.toThrow(SnipperError);
  });

  it('should handle empty input', async () => {
    await expect(dagdSnipper.snip('')).rejects.toThrow(SnipperError);
  });
});
