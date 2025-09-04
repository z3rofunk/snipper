import type { BaseSnipper } from './BaseSnipper.js';
import { DagdSnipper } from './DagdSnipper.js';

export type SnipperId = 'dagd';

type SnipperConstructor<T extends BaseSnipper = BaseSnipper> = new (
  ...args: any[]
) => T;
export const SNIPPERS: Record<SnipperId, SnipperConstructor> = {
  dagd: DagdSnipper,
};
