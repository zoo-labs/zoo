export interface Animal {
   owner?: string; // wallet address of the owner
   tokenId: string;
   name: string;
   description: string;
   yield: string;
   boost: string;
   rarity: string;
   dob: string;
   startBid?: string;
   buyNow?: string;
   imageUrl: string; // should point to IPFS
}

export interface Egg {
   owner?: string; // wallet address of the owner
   tokenId: string;
   parent1: string;
   parent2: string;
   basic: boolean
}
