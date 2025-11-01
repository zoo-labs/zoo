import { Address } from './Common';

export type Vote = {
  address: Address;
  weight: number;
  timestamp: number; // We can get the vote time from onchain. Not sure if there is use for it
}

export type YesNoVoteOption = 'YES' | 'NO' | 'ABSTAIN';

export type YesNoVote = Vote & {
  vote: YesNoVoteOption;
};

export type MultipleChoiceVote = Vote & {
  vote: number; // In case we support MC vote, the result is the index, 0 based
};
