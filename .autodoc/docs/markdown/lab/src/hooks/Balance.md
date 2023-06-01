[View code on GitHub](zoo-labs/zoo/blob/master/lab/src/hooks/Balance.js)

## `useBalance` function

The `useBalance` function is a custom React hook that retrieves the balance of an Ethereum address from a given provider. It is designed to be used in a larger project that interacts with the Ethereum blockchain. 

### Features

- Provide an Ethereum address and get the balance corresponding to the given address.
- Change the provider to access the balance on different chains (e.g., mainnetProvider).
- If no `pollTime` is passed, the balance will update on every new block.

### Dependencies

The `useBalance` function depends on the following custom hooks:

- `useOnBlock`: This hook listens for new blocks and triggers a callback function when a new block is detected.
- `usePoller`: This hook polls a function at a specified interval.

### Parameters

The `useBalance` function takes three parameters:

- `provider`: An Ethereum provider object that is used to retrieve the balance of the given address.
- `address`: The Ethereum address for which the balance is to be retrieved.
- `pollTime`: An optional parameter that specifies the interval (in milliseconds) at which the balance should be polled. If this parameter is not provided, the balance will be updated on every new block.

### Return value

The `useBalance` function returns the balance of the given address as a string.

### Example usage

```jsx
import { useBalance } from "./useBalance";

function MyComponent({ provider, address }) {
  const balance = useBalance(provider, address);

  return (
    <div>
      <p>Address: {address}</p>
      <p>Balance: {balance}</p>
    </div>
  );
}
```

In the example above, the `useBalance` hook is used to retrieve the balance of an Ethereum address and display it in a React component. The `provider` and `address` props are passed to the hook to retrieve the balance. The balance is then displayed in the component using the `balance` variable returned by the hook.
## Questions: 
 1. What does this code do?
    
    This code is a custom React hook called `useBalance` that takes in a provider and an address and returns the balance in ETH corresponding to the given address. It also has the ability to change the provider to access balances on different chains and can update the balance on every new block if no pollTime is passed.

2. What is the purpose of the `useCallback` hook in this code?
    
    The `useCallback` hook is used to memoize the `pollBalance` function so that it only gets recreated when the `provider` or `address` values change. This helps to optimize performance by preventing unnecessary re-renders.

3. What is the purpose of the `usePoller` hook in this code?
    
    The `usePoller` hook is used to poll the balance at a specified interval (`pollTime`) and update the balance state accordingly. It only runs if a `pollTime` value greater than 0 is passed in and if both the `provider` and `address` values are truthy.