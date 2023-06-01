[View code on GitHub](zoo-labs/zoo/blob/master/lab/src/hooks/TokenList.js)

# `useTokenList` function

The `useTokenList` function is a custom React hook that retrieves a token list from a specified URI and returns an array of tokens. A token list is a JSON file that contains information about tokens, such as their name, symbol, and contract address. The function takes two optional parameters: `tokenListUri` and `chainId`.

## How to use

To use the `useTokenList` function, import it into a React component and call it. By default, it returns the Uniswap token list. You can also pass a custom token list URI as the first parameter to retrieve a different token list. If you pass a `chainId` as the second parameter, the function will filter the token list to only include tokens that belong to that chain.

```javascript
import useTokenList from './useTokenList';

const MyComponent = () => {
  const tokenList = useTokenList(); // returns Uniswap tokens
  const customTokenList = useTokenList('https://mycustomtokenlist.com', 1); // returns tokens for chainId 1
  // ...
};
```

## Features

- Retrieves a token list from a specified URI
- Returns an array of tokens
- Optional `chainId` parameter to filter tokens by chainId

## Implementation

The `useTokenList` function uses the `useState` and `useEffect` hooks from React. It initializes a state variable `tokenList` as an empty array and sets the default token list URI to the Uniswap token list. When the component mounts or the `tokenListUri` parameter changes, the function calls an asynchronous `getTokenList` function that fetches the token list from the specified URI. If the `chainId` parameter is passed, the function filters the token list to only include tokens that belong to that chain. Finally, the function sets the `tokenList` state variable to an array of tokens extracted from the token list JSON.
## Questions: 
 1. What is the purpose of this code?
    
    This code defines a custom React hook called `useTokenList` that fetches a tokenlist and returns an array of tokens from it. The tokenlist URI and chainId can be optionally specified as parameters.

2. What is the format of the tokenlist that this code fetches?

    The code expects the tokenlist to be in JSON format, with an array of objects containing information about each token. The relevant information for this code is the `tokens` property of the JSON object.

3. What happens if the user is offline when this code is executed?

    If the user is offline, the code will not attempt to fetch the tokenlist and will not update the state of the `tokenList` variable.