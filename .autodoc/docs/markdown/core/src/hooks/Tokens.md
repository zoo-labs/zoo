[View code on GitHub](zoo-labs/zoo/blob/master/core/src/hooks/Tokens.ts)

The code in this file provides various hooks and functions related to tokens and token lists in the larger zoo project. 

The `useTokensFromMap` function takes a `TokenAddressMap` object and a boolean flag `includeUserAdded` and returns a mapping of token addresses to `Token` objects. The `TokenAddressMap` object is a mapping of chain IDs to mappings of token addresses to token information. If `includeUserAdded` is true, the function also includes user-added tokens in the mapping. This function is used by other hooks to get a mapping of all tokens or unsupported tokens.

The `useAllTokens`, `useTokens`, and `useUnsupportedTokens` hooks use `useTokensFromMap` to return a mapping of all tokens, tokens that are not unsupported, and unsupported tokens, respectively.

The `useSearchInactiveTokenLists` hook takes a search string and a minimum number of results and returns an array of `WrappedTokenInfo` objects that match the search string and are not in the active token list. This hook is used to search for inactive tokens in token lists.

The `useIsTokenActive` hook takes a `Token` object and returns a boolean indicating whether the token is in the active token list. This hook is used to check whether a token is active.

The `useIsUserAddedToken` hook takes a `Currency` object and returns a boolean indicating whether the currency is a user-added token. This hook is used to check whether a currency is in the user's custom token list.

The `parseStringOrBytes32` function takes a string, a bytes32 string, and a default value and returns the string if it is not empty, the bytes32 string if it is a valid bytes32 string, or the default value otherwise. This function is used to parse a name or symbol from a token response.

The `useToken` hook takes a token address and returns a `Token` object for that address. It uses other hooks to get the name, symbol, and decimals of the token. If the token is already in the active token list, the hook returns the existing `Token` object. If the token is not in the active token list, the hook returns a new `Token` object with the name, symbol, and decimals obtained from the other hooks. This hook is used to get a `Token` object for a given token address.

The `useCurrency` hook takes a currency ID and returns a `Currency` object for that ID. If the ID is "ETH", the hook returns the native currency for the current chain. Otherwise, the hook uses `useToken` to get a `Token` object for the currency ID. If the chain is Celo, the hook checks if the currency ID is "CELO" and returns the native currency if it is. This hook is used to get a `Currency` object for a given currency ID.
## Questions: 
 1. What is the purpose of the `useTokensFromMap` function?
- The `useTokensFromMap` function reduces a token map into a standard address <-> Token mapping, optionally including user added tokens.

2. What does the `useToken` function do?
- The `useToken` function returns a Token object for a given token address, parsing its name, symbol, and decimals from the token contract.

3. What is the difference between `useAllTokens` and `useTokens`?
- `useAllTokens` returns all tokens from the active token list, including user added tokens, while `useTokens` returns only the tokens from the active token list that are not user added.