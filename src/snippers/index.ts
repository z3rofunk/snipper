import type { BaseSnipper } from './BaseSnipper.js';
import { DagdSnipper } from './DagdSnipper.js';

export type SnipperConstructor = new (...args: any[]) => BaseSnipper;

export const SNIPPERS: Record<string, SnipperConstructor> = {
  dagd: DagdSnipper,
};
