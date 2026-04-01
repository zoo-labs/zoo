import { Address, Optional } from './Common';
import { Vote } from './Vote';

export type Action = {
  address: Address;
}

export type TransferAction = Action & {
  value: string; // Transfering native tokens, value is in wei
};

export type ContractActionParam = {
  name: string; // for example: amount
  type: string; // for example: unit256
  value: string; // to be converted to the right type according to ABI
};

export type ContractAction = Action & {
  name: string; // function name
  abi: unknown; // ABI object for the contract
  params: Optional<ContractActionParam[]>;
};

/*
cid stored JSON
{
  "title": "...",
  "description": "...",
  "choices": [
    "John Smith",
    "Mike Dan"
  ]
}
*/

export type Proposal = {
  slug: string; // nanoid
  title: Optional<string>; // title and description are from DB if proposal is in draft.
  body: Optional<string>;
  status: string; // TBD enum we should have
  authorAddress: Address; // address of the proposer
  metadataCID: Optional<string>; // cid to metadata with data (title and/or description and/or others)
  id: Optional<number>; // number to concat with organization prefix (ex: DCT-1)
  safeNonce: Optional<number>; // nonce for this proposal
  proposedTxHash: Optional<string>; // txn hash of the proposed safe tx
  executedTxHash: Optional<string>; // txn hash of the executed safe tx
  votingStrategyAddress: Optional<Address>;
  voteStartsAt: Optional<number>; // timestamp, if onchain, voteStartsAt and voteEndsAt should have value
  voteEndsAt: Optional<number>; // timestamp
  discussionId: Optional<string>; // if went through discussion, there should be discussion ID
  version: number; // Starts at 1
  votes: Optional<Vote[]>; // vote records
  cycle: Optional<number>; // Use votingStrategy to get DAO, and get DAO's governance cycle.
  voteType: Optional<string>; // "single-choice" or "multi-choice"
  voteChoices: Optional<string[]>; // choices for the vote
  createdAt: number; // timestamp
  updatedAt: Optional<number>; // timestamp
}

export type NewProposal = {
  title: string;
  body: string;
  voteType: string;
  voteChoices?: string[];
  cycle?: number;
  votingStrategyAddress?: Address;
}

export type UpdateProposal = NewProposal & Pick<Proposal, 'slug'>

export type ProposalTransaction = {
  actions: Optional<Action[]>;
};

export interface YesNoVoteResult {
  yes: number;
  no: number;
  abstain: number;
}

export type YesNoProposal = Proposal & {
  thumbsUp: number; // from Web2
  thumbsDown: number;
  thumbsUpWeighted: number;
  thumbsDownWeighted: number;
  tx: ProposalTransaction;
  result: Optional<YesNoVoteResult>;
};

/*
Sample multiple choice proposal
We want to pay DAO
1. $100,  // tx: transfer 100 USDC
2. $2000,  // TX: transfer 2000 USDC
3. $800,000  // TX: transfer 800000 USDC

Elect council members
1. John Smith // address
2. Mike Dam // address
*/

export type ProposalChoice = {
  text: string;
  tx: ProposalTransaction;
};

export interface MultipleChoiceVoteResult {
  totalWeightVoted: number;
  choice: number[]; // the votingWeight for each choice
}

export type MultipleChoiceProposal = Proposal & {
  choices: ProposalChoice[];
  result: MultipleChoiceVoteResult;
};
