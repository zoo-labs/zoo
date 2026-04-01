import { Address } from 'viem';
import { NewProposal, NewComment } from 'sdk';

const address = '0x07a281d9CF79585282a2ADa24B78B494977DC33E';
export const daoAddress = address.toLowerCase() as Address;
export const daoChainId = 8453;

export const newProposal: NewProposal = {
  title: 'Test Proposal',
  body: 'Test Description',
  voteType: 'single-choice',
};

export const newComment: NewComment = {
  content: 'Test Comment',
  replyToId: null,
};
