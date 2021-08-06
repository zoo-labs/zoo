export interface Animal {
   owner?: string;
   kind?: string;
   tokenID: string;
   name: string;
   description: string;
   yield: string;
   boost: string;
   rarity: string;
   dob: string;
   startBid?: string;
   currentBid?: string;
   buyNow?: string;
   imageUrl: string;
   listed: boolean;
   bloodline?: string
   selected?:boolean
   bred?:boolean
   breedCount?:number
   timeRemaining?: number;
   CTAOverride?: any;
   lastBred?: string;
}

export interface Egg {
  owner: string; // wallet address of the owner
  tokenID: string;
  kind?: string;
  parentA: string;
  parentB: string;
  basic: boolean;
  timeRemaining?: number;
  CTAOverride?: any;
  created?: string;
  burned?:boolean
}
