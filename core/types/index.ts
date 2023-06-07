import { Toast } from "../components/Toast";
import BigNumber from "bignumber.js";

export interface Drop {
  title: string;
  description: string;
  items: AvailableEgg[] | Animal[];
  supply: number
  minted: number;
  dropSupply: number,
  dropId: number,
  image: string
}
export interface Animal {
  owner?: string;
  kind?: number;
  tokenID: number;
  parentA?: number;
  parentB?: number;
  name: string;
  description: string;
  yield: number;
  boost: number;
  rarity: string;
  dob: number;
  startBid?: number;
  currentBid?: number;
  buyNow?: number;
  imageUrl: string;
  listed: boolean;
  bloodline?: string;
  selected?: boolean;
  bred?: boolean;
  breedCount?: number;
  timeRemaining?: number;
  CTAOverride?: any;
  lastBred?: string;
  revealed?: boolean;
  freed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Egg {
  owner: string;
  kind: number;
  tokenID: number;
  parentA?: number;
  parentB?: number;
  basic: boolean;
  timeRemaining?: number;
  CTAOverride?: any;
  burned?: boolean;
  interactive?: boolean;
  hatched?: boolean;
  animalID?: number;
  createdAt?: Date;
  updatedAt?: Date;
  hatching?: boolean;
}

export interface AvailableEgg {
  bidShares: any;
  birthday: number;
  exist: boolean;
  id: number;
  kind: number;
  minted: number;
  name: string;
  price: number;
  supply: number;
  timestamp: number;
  image: string;
  animation_url: string;
  attributes: Array<EggAttribute>;
  description: string;
}
export interface EggAttribute {
  trait_type: string;
  value: string;
}
export interface AuctionHistory {
  value: number
  from_address: string
  blockNumber: number
  block_timestamp: number
  transaction_hash: string

}
export interface Auction {
  auctionHistory: Array<AuctionHistory>
  description: string;
  index: number;
  tokenID: number;
  auctionId: number;
  tokenOwner: string;
  reservePrice: number;
  firstBidTime: number;
  duration: number;
  curatorFeePercentage: number;
  // curator: string;
  // auctionCurrency: string;
  amount: number;
  tokenUri: any;
  name: any;
  image: string;
  animation_url: string;
  attributes: Array<EggAttribute>;
  kind: 0 | 1 | 2 | 3;
  glb_animation_url?: string;
  usdz_animation_url?: string;
}
export interface Bid {
  // Amount of the currency being bid
  amount: number;
  // Address to the ERC20 token being used to bid
  currency: string;
  // Address of the bidder
  bidder: string;
  // Address of the recipient
  recipient: string;
  // % of the next sale to award the previous owner
  sellOnFee: number;
}

export interface Ask {
  // Amount of the currency being asked
  amount: number;
  // Address to the ERC20 token being asked
  currency: string;
  // % of the next sale to award the seller
  sellOnFee: number;
}
export type ANIMAL_TYPE = {
  name: string;
  image: string;
  description: {
    head: string;
    desc: string;
  };
};

export interface CardEgg extends Egg {
  id: number;
  name: string;
}

export type EggCardType = {
  egg: CardEgg;
  hatchEgg: (egg: any) => void;
  hatchEggReady: (egg: any) => void;
  hatching?: boolean;
  viewItem: () => void;
  // eggGroup: {BASIC: number, HYBRID: number}
};
export interface ToastsState {
  data: Toast[];
}

export interface Proposal {
  signature: string;
  timestamp: string;
  token: string;
  type: "proposal";
  tokenDecimal: number;
  tokenAddress: string;
  id: string;
  proposalType: number;
  proposalStatus: number;
  proposalIpfs: string;
  votes: BigNumber[];
  voteCount: BigNumber;
  title: string;
  description: string;
  choices: string[];
  startDate: any;
  startTime: any;
  endDate: any;
  endTime: any;
  creator: string;
  blockNumber: number;
}
