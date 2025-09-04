import { BaseSnipper } from '../snippers/BaseSnipper.js';

export interface SnipResult {
  snippedUrl: string;
  originalUrl: string;
  snipperId: string;
}

export interface SnipperConfig {
  timeout?: number;
}

export type SnipperId = 'dagd';

export type SnipperConstructor<T extends BaseSnipper = BaseSnipper> = new (
  config?: SnipperConfig,
) => T;
