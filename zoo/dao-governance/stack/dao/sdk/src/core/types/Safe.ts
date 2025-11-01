import { Address } from './Common';

export type Safe = {
  owners: Address[];
  threshold: number;
};
