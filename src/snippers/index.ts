import { DagdSnipper } from './DagdSnipper.js';
import { TinyUrlSnipper } from './TinyUrlSnipper.js';

type SNIPPERS = {
  dagd: typeof DagdSnipper;
  tinyurl: typeof TinyUrlSnipper;
};

export const SNIPPERS: SNIPPERS = {
  dagd: DagdSnipper,
  tinyurl: TinyUrlSnipper,
};
