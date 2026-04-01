import { Optional, Address } from './Common';

export type TokenBlance = {
  tokenAddress: Address;
  balance: number;
  usdValue: number;
  portfolioPercentage: Optional<number>;
};

export type Treasury = {
  totalUsdValue: number;
  fungible: TokenBlance[]; // ERC20
  nonFungible: TokenBlance[]; // ERC721, ERC1155
};
