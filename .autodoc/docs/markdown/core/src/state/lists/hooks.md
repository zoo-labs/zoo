[View code on GitHub](zoo-labs/zoo/blob/master/core/src/state/lists/hooks.ts)

The code in this file is responsible for managing token lists used in the larger project. It imports the `AppState` from another file, as well as several other dependencies, including `DEFAULT_TOKEN_LIST` and `UNSUPPORTED_TOKEN_LIST`. It also defines several functions that are used to manipulate and combine token lists.

The `listToTokenMap` function takes a `TokenList` object and returns a `TokenAddressMap` object, which is a nested object that maps token addresses to their corresponding `WrappedTokenInfo` objects and `TokenList` objects. This function is used to create a map of all tokens in a given list, which can then be combined with other maps to create a master list of all tokens.

The `useCombinedTokenMapFromUrls` function takes an array of URLs and returns a `TokenAddressMap` object that combines all tokens from the lists at those URLs. This function is used to merge tokens contained within lists from URLs.

The `useActiveListUrls` function returns an array of active list URLs, filtered to exclude any unsupported lists. This function is used to filter out unsupported lists.

The `useCombinedActiveList` function returns a `TokenAddressMap` object that combines all tokens from the active lists and the default token list. This function is used to get all the tokens from active lists and combine them with local default tokens.

The `useUnsupportedTokenList` function returns a `TokenAddressMap` object that contains all tokens that are not supported on the interface. This function is used to show warnings and prevent swaps and adds.

Finally, the `useIsListActive` function takes a URL and returns a boolean indicating whether that list is active. This function is used to determine whether a list is active or not.

Overall, this code is responsible for managing token lists and combining them to create a master list of all tokens. It is used throughout the larger project to ensure that all tokens are accounted for and that unsupported tokens are properly handled.
## Questions: 
 1. What is the purpose of the `listToTokenMap` function?
- The `listToTokenMap` function takes a `TokenList` object and returns a `TokenAddressMap` object that maps token addresses to their corresponding `WrappedTokenInfo` and `TokenList` objects.

2. What is the purpose of the `useCombinedTokenMapFromUrls` function?
- The `useCombinedTokenMapFromUrls` function takes an array of token list URLs and returns a `TokenAddressMap` object that combines the tokens from all the specified lists.

3. What is the purpose of the `useUnsupportedTokenList` function?
- The `useUnsupportedTokenList` function returns a `TokenAddressMap` object that contains all the tokens that are not supported by the interface, which is used to show warnings and prevent swaps and adds. This includes both hard-coded unsupported tokens and any loaded unsupported tokens.