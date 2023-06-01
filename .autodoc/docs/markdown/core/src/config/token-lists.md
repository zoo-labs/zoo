[View code on GitHub](zoo-labs/zoo/blob/master/core/src/config/token-lists.ts)

This code defines a set of URLs that point to token lists used in the larger project. These token lists are used to import and search for tokens across various decentralized exchanges. The `UNSUPPORTED_LIST_URLS` constant is an array of URLs that point to lists of tokens that are not supported by the project. The `DEFAULT_LIST_OF_LISTS` constant is an array of URLs that point to token lists that are searched across by default. The order of the URLs in this array determines the priority of the token import. The `DEFAULT_ACTIVE_LIST_URLS` constant is an array of URLs that point to token lists that are actively searched across. 

For example, if a user wants to import a token into the project, the project will search across the token lists in `DEFAULT_ACTIVE_LIST_URLS` to see if the token is supported. If the token is not found, the project will search across the token lists in `DEFAULT_LIST_OF_LISTS` in order of priority until the token is found or all lists have been searched. If the token is still not found, the project will search across the token lists in `UNSUPPORTED_LIST_URLS` to see if the token is unsupported. 

This code is important because it allows the project to import and search for tokens across multiple decentralized exchanges. By defining a set of token lists, the project can ensure that it is searching across all relevant exchanges and can prioritize the import of tokens based on the order of the lists. 

Example usage:

```
import { DEFAULT_ACTIVE_LIST_URLS, DEFAULT_LIST_OF_LISTS } from 'zoo'

// search for a token across the default active lists
const token = 'ETH'
const activeLists = DEFAULT_ACTIVE_LIST_URLS
for (const list of activeLists) {
  const tokens = await fetch(list).then((res) => res.json())
  if (tokens.includes(token)) {
    console.log(`${token} found in ${list}`)
    break
  }
}

// search for a token across the default lists of lists
const listsOfLists = DEFAULT_LIST_OF_LISTS
for (const list of listsOfLists) {
  const tokens = await fetch(list).then((res) => res.json())
  if (tokens.includes(token)) {
    console.log(`${token} found in ${list}`)
    break
  }
}
```
## Questions: 
 1. What is the purpose of the `UNSUPPORTED_LIST_URLS` array?
- The `UNSUPPORTED_LIST_URLS` array is used to mark unsupported tokens and contains a single URL to a list of unsupported tokens from the Blockchain Association.

2. What is the difference between `DEFAULT_LIST_OF_LISTS` and `DEFAULT_ACTIVE_LIST_URLS`?
- `DEFAULT_LIST_OF_LISTS` is an array of token list URLs that are searched across in order of priority, while `DEFAULT_ACTIVE_LIST_URLS` is an array of token list URLs that are considered 'active' and always searched across.

3. What is the significance of the `OPTIMISM_LIST` constant?
- The `OPTIMISM_LIST` constant is a URL to a token list that is included in the `DEFAULT_LIST_OF_LISTS` array and is searched across for token imports.