import { Optional } from './Common';

export type PaymentStream = {
  start: Date;
  end: Date;
  cliff: Optional<Date>;
  amount: number;
  cancelable: boolean;
  transferable: boolean;
};
