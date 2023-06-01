[View code on GitHub](zoo-labs/zoo/blob/master/core/src/functions/bridgeFiltering.ts)

The code in this file provides utility functions for filtering and sorting tokens in a larger project called zoo. The file imports the Token and TokenInfo types from other modules, as well as a validation function and a hook from the React library. 

The `createTokenFilterFunction` function takes a search query as input and returns a filter function that can be applied to a list of tokens. If the search query is an Ethereum address, the filter function checks if the token's address matches the query. Otherwise, it splits the search query into parts and checks if each part is a substring of the token's name or symbol. The function returns true if the token matches the search query and false otherwise.

The `filterTokens` function takes a list of tokens and a search query as input and returns a filtered list of tokens that match the search query. It uses the `createTokenFilterFunction` function to create a filter function and applies it to the list of tokens using the `filter` method.

The `useSortedTokensByQuery` hook takes a list of tokens and a search query as input and returns a sorted list of tokens that match the search query. It uses the `useMemo` hook to memoize the sorted list of tokens and avoid unnecessary re-renders. The function first checks if the list of tokens is empty and returns an empty list if it is. Otherwise, it splits the search query into parts and checks if there is more than one part. If there is, it returns the original list of tokens. Otherwise, it sorts the list of tokens by exact matches on the symbol, substrings on the symbol, and the rest of the tokens. The function returns the sorted list of tokens.

Overall, this file provides useful utility functions for filtering and sorting tokens in the larger zoo project. Here is an example of how these functions can be used:

```
import { filterTokens, useSortedTokensByQuery } from 'zoo/tokenUtils'

const tokens = [
  { name: 'Ethereum', symbol: 'ETH', address: '0x123' },
  { name: 'Dai Stablecoin', symbol: 'DAI', address: '0x456' },
  { name: 'Chainlink', symbol: 'LINK', address: '0x789' },
]

const filteredTokens = filterTokens(tokens, 'eth')
// [{ name: 'Ethereum', symbol: 'ETH', address: '0x123' }]

const sortedTokens = useSortedTokensByQuery(tokens, 'link')
// [{ name: 'Chainlink', symbol: 'LINK', address: '0x789' }, { name: 'Dai Stablecoin', symbol: 'DAI', address: '0x456' }, { name: 'Ethereum', symbol: 'ETH', address: '0x123' }]
```
## Questions: 
 1. What is the purpose of the `createTokenFilterFunction` function?
- The `createTokenFilterFunction` function creates a filter function that can be used to filter a list of tokens based on a search query.

2. What is the purpose of the `useSortedTokensByQuery` function?
- The `useSortedTokensByQuery` function sorts a list of tokens based on a search query, with exact matches first, followed by tokens with a symbol that starts with the search query, and then the rest of the tokens.

3. What is the purpose of the `alwaysTrue` function?
- The `alwaysTrue` function is a helper function that always returns `true`. It is used as a fallback filter function in case the search query is empty.