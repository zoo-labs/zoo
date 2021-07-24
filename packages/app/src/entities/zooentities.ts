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
   
}

export interface Egg {
   owner?: string; // wallet address of the owner
   tokenId: string;
   parent1: string;
   parent2: string;
   basic: boolean
}
