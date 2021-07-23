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
   buyNow?: string;
   imageUrl: string;
}

export interface Egg {
   owner?: string;
   tokenId: string;
   parent1: string;
   parent2: string;
   basic: boolean
}
