[View code on GitHub](zoo-labs/zoo/blob/master/core/src/functions/list.ts)

The code in this file contains functions that are used to resolve a list URL to a validated token list. The `getTokenList` function takes in a list URL and a function that resolves an ENS name to a content hash. It then parses the ENS address, translates the content hash to a URI, and converts the URI to an HTTP URL. It then loops through the URLs and fetches the list from the first URL that returns a valid response. If the fetched list fails validation, an error is thrown. If none of the URLs return a valid response, an error is thrown.

The `sortByListPriority` function is used to sort a list of URLs based on their priority. The priority is determined by the ordering of the default list of lists. The function returns 1 if the first URL has a higher priority, -1 if the second URL has a higher priority, and 0 if they have the same priority.

The `listVersionLabel` function takes in a `Version` object and returns a string that represents the version label. The version label is in the format `v<major>.<minor>.<patch>`.

This code is used in the larger project to fetch and validate token lists. It can be used to fetch token lists from various sources, including ENS names and HTTP URLs. The `sortByListPriority` function is used to sort the list of URLs to ensure that the highest priority list is fetched first. The `listVersionLabel` function is used to generate version labels for the token lists. Overall, this code is an important part of the token list management system in the zoo project. 

Example usage:

```
import { getTokenList } from 'zoo'

const listUrl = 'https://example.com/tokenlist.json'
const resolveENSContentHash = async (ensName: string) => {
  // resolve ENS name to content hash
}

const tokenList = await getTokenList(listUrl, resolveENSContentHash)
console.log(tokenList)
// output: { name: 'Example Token List', tokens: [...] }
```
## Questions: 
 1. What is the purpose of the `getTokenList` function?
- The `getTokenList` function resolves a list URL to a validated token list by fetching and validating the JSON response from the URL.

2. What is the purpose of the `sortByListPriority` function?
- The `sortByListPriority` function is used to sort a list of URLs based on their priority, with URLs in the `DEFAULT_LIST_OF_LISTS` array having higher priority.

3. What is the purpose of the `listVersionLabel` function?
- The `listVersionLabel` function returns a string label for a given `Version` object, formatted as "vX.Y.Z".