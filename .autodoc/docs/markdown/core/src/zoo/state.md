[View code on GitHub](zoo-labs/zoo/blob/master/core/src/zoo/state.ts)

The code is a collection of React hooks and utility functions used in the Zoo project. The main purpose of the code is to provide functionality related to assets and token types. 

The `useAsset` hook is used to retrieve information about a specific asset, identified by a token ID. It uses the `useActiveWeb3React` and `useQuery` hooks from the `@apollo/client` library to fetch data from the blockchain and the Zoo API. The hook returns an object containing information about the asset, such as the current ask price, the owner, and the content URI. 

The `useTokenType` hook is similar to `useAsset`, but it is used to retrieve information about a specific token type, identified by a name. It also uses the `useActiveWeb3React` and `useQuery` hooks to fetch data from the blockchain and the Zoo API. The hook returns an object containing information about the token type, such as the current ask price, the owner, and the content URI. 

The `usePrice` hook is used to retrieve the current prices of various cryptocurrencies from the Coingecko API. It uses the `useActiveWeb3React` hook to determine the current chain ID, and the `cachedFetch` utility function to cache the API response for 2 minutes. The hook returns an object containing the current prices of various cryptocurrencies, as well as a function to convert a token amount to its equivalent USD value. 

The `useBids` hook is used to retrieve information about the bids for a specific asset, identified by a token ID. It uses the `useActiveWeb3React` and `useQuery` hooks to fetch data from the blockchain and the Zoo API. The hook returns an object containing information about the bids, such as the highest bid and the USD value of each bid. 

The remaining functions and types are utility functions and types used by the hooks. They include functions to format currency amounts, retrieve currency tokens, and check if two addresses are the same. 

Overall, this code provides a set of useful hooks and utility functions for working with assets and token types in the Zoo project.
## Questions: 
 1. What is the purpose of the `useAsset` function and what does it return?
Answer: The `useAsset` function is used to retrieve information about a specific asset/token based on its ID. It returns an object containing various properties such as the current ask price, owner, currency balance, and formatted amounts.

2. What is the purpose of the `usePrice` function and what does it return?
Answer: The `usePrice` function is used to retrieve the current prices of various cryptocurrencies from the Coingecko API. It returns an object containing the loading state, prices object, and functions to retrieve prices and USD amounts.

3. What is the purpose of the `useTokenTypes` function and what does it return?
Answer: The `useTokenTypes` function is used to retrieve information about all available token types. It returns an object containing an array of token types and an object with aggregated information about the token types such as the total number of tokens minted.