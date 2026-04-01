import { Address } from './Common';

export type TokenType = 'ERC20' | 'ERC721' | 'ERC1155';

export type Token = {
  address: Address;
  type: TokenType;
}
