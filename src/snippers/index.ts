import { type SnipperConstructor, type SnipperId } from '../types/snipper.js';
import { DagdSnipper } from './DagdSnipper.js';

export const SNIPPERS: Record<SnipperId, SnipperConstructor> = {
  dagd: DagdSnipper,
};
