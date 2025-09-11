import { DagdSnipper } from './DagdSnipper.js';
import { TinyUrlSnipper } from './TinyUrlSnipper.js';
import { IsgdSnipper } from './IsgdSnipper.js';
import { VgdSnipper } from './VgdSnipper.js';

export const SNIPPERS = {
  dagd: DagdSnipper,
  tinyurl: TinyUrlSnipper,
  isgd: IsgdSnipper,
  vgd: VgdSnipper,
} as const;
