import { Optional, Address } from './Common';

export type Comment = {
  id: string;
  replyToId: Optional<string>;
  proposalSlug: string;
  authorAddress: Address;
  content: string;
  createdAt: number;
  updatedAt: Optional<number>;
}

export type NewComment = {
  replyToId: Optional<string>;
  content: string;
}

export type UpdateComment = {
  content: string;
}
