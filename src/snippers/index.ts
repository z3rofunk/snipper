import { DagdSnipper } from './DagdSnipper.js';
import { TinyUrlSnipper } from './TinyUrlSnipper.js';

export const SNIPPERS = {
  dagd: DagdSnipper,
  tinyurl: TinyUrlSnipper,
} as const;
