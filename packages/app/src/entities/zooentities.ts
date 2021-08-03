export interface Animal {
   owner?: string;
   tokenId: string;
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
   animalId?: string;
   timeRemaining?: number;
   CTAOverride?: any;
   lastBred?: string;
   
}

export interface Egg {
  owner: string; // wallet address of the owner
  tokenId: string;
  animalId?: string;
  parent1: string;
  parent2: string;
  basic: boolean;
  timeRemaining?: number;
  CTAOverride?: any;
  created?: string;
  burned?:boolean
}
