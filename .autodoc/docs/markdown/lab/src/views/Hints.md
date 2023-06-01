[View code on GitHub](zoo-labs/zoo/blob/master/lab/src/views/Hints.jsx)

The `Hints` component is a React functional component that provides guidance and instructions for developers working on the Zoo project. The component renders a series of instructions and tips for developers, including how to edit contracts, compile and deploy code, and build the frontend of the application. 

The component also provides examples of how to use various hooks and components that are part of the Zoo project. For example, the `useBalance()` hook is used to keep track of the user's balance, and the `AddressInput` component is used to input an Ethereum address. 

The `Hints` component also includes a `Select` component that allows the user to select a token from a list of tokens obtained from tokenlists.org using the `useTokenList()` hook. The selected token is stored in the `selectedToken` state variable.

The component also includes instructions for using the faucet to send funds to an address, deploying to a testnet or mainnet, and building and shipping the application. 

Overall, the `Hints` component serves as a helpful guide for developers working on the Zoo project, providing instructions and examples for using various components and hooks, as well as guidance on how to deploy and ship the application. 

Example usage of the `Hints` component:

```jsx
import Hints from './Hints';

function App() {
  return (
    <div>
      <Hints />
      {/* rest of the app */}
    </div>
  );
}
```
## Questions: 
 1. What is the purpose of the `useTokenList` hook and where does it get its data from?
- The `useTokenList` hook returns an array of tokens and gets its data from the tokenlist located at `https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/set.tokenlist.json`.
2. What is the purpose of the `AddressInput` component and what props does it take?
- The `AddressInput` component is a web3 specific component used for inputting addresses and takes a prop called `ensProvider` which is used for resolving ENS names.
3. What is the purpose of the `usePrice` hook and what value does it return?
- The `usePrice` hook is used to load the current price and returns the value of `price`.