import { Toast } from "components/Toast";

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
}
export interface EggAttribute {
  trait_type: string;
  value: string;
}

export interface Auction {
  tokenID: string;
  auctionId: string;
  reservePrice: string;
  firstBidTime: string;
  duration: number;
  curatorFeePercentage: number;
  amount: number;
  addresses: {
    auctionCurrency: string;
    bidder: string;
    curator: string;
    tokenContract: string;
    tokenOwner: string;
  };
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
  hatchEgg: (egg) => void;
  hatchEggReady: (egg) => void;
  hatching?: boolean;
  viewItem: () => void;
  // eggGroup: {BASIC: number, HYBRID: number}
};
export interface ToastsState {
  data: Toast[];
}
