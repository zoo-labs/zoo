[View code on GitHub](zoo-labs/zoo/blob/master/core/src/marketplace/state.ts)

The `zoo` file contains several functions and types that are used in the larger project. The main purpose of this file is to provide functionality related to assets and token types. 

The `useAsset` function is used to retrieve information about a specific asset, given its token ID. It uses the `useActiveWeb3React` and `useQuery` hooks to interact with the Ethereum blockchain and retrieve data from the GraphQL API. The function returns an object containing information about the asset, such as its owner, current ask price, and currency balance. 

The `useTokenType` function is similar to `useAsset`, but is used to retrieve information about a specific token type, given its name. It also uses the `useActiveWeb3React` and `useQuery` hooks to interact with the Ethereum blockchain and retrieve data from the GraphQL API. The function returns an object containing information about the token type, such as its owner, current ask price, and minted/supply amounts. 

The `usePrice` function is used to retrieve the current prices of various cryptocurrencies from the Coingecko API. It uses the `useActiveWeb3React` hook to determine the current chain ID, and returns an object containing the prices of various cryptocurrencies in USD. 

The `useBids` function is used to retrieve information about the bids for a specific asset. It uses the `useActiveWeb3React` and `useQuery` hooks to interact with the Ethereum blockchain and retrieve data from the GraphQL API. The function returns an object containing information about the bids, such as the highest bid amount and the USD value of each bid. 

The `useIsAddress` function is a utility function that is used to determine if a given Ethereum address is equal to another address. 

The `AssetState` and `TokenType` types are used to define the shape of the objects returned by `useAsset` and `useTokenType`, respectively. 

Overall, this file provides important functionality for interacting with assets and token types in the larger project. It uses various hooks and APIs to retrieve data from the Ethereum blockchain and other sources, and returns objects containing useful information about assets and token types.
## Questions: 
 1. What is the purpose of the `useAsset` function?
- The `useAsset` function is used to retrieve information about a specific asset, such as its owner, current ask price, and currency balance.

2. What is the purpose of the `usePrice` function?
- The `usePrice` function is used to retrieve the current prices of various cryptocurrencies from the CoinGecko API, and to calculate the USD value of a given token amount.

3. What is the purpose of the `useTokenTypes` function?
- The `useTokenTypes` function is used to retrieve information about all token types associated with a particular contract, such as the number of tokens minted and their metadata URIs. However, it appears that this function is currently commented out and not being used in the code.