// Make chain table
// maybe with all of these fields
// https://github.com/luxdao/app/blob/develop/src/types/network.ts
// maybe smaller table with "extended" fields
// export const chains = onchainTable("chains", (t) => ({
//   chainId: t.integer(),
//   rank: t.integer(),
//   name: t.text(),
// }));

// hats addresses table, sablier, safe etc
// has foreign key to chainId
// order: number; // any arbitrary integer, used to "order" the networks in the dropdown
// chain: Chain;

// prefix is just a frontend thing, do /chain/address/1234567890
export const chainIdToPrefix = (chainId: number) => {
  if (chainId === 11155111) {
    return 'sep';
  } else if (chainId === 1) {
    return 'eth';
  } else if (chainId === 8453) {
    return 'base';
  } else if (chainId === 10) {
    return 'opt';
  } else if (chainId === 137) {
    return 'matic';
  }
};
