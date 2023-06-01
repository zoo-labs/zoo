[View code on GitHub](zoo-labs/zoo/blob/master/core/src/components/Swap/TransactionDetail.tsx)

The `TransactionDetail` component is responsible for rendering the details of a transaction in the Zoo project. It receives several props, including `evmToAddress`, `amount`, `token`, and `bridgeState`, which are used to display information about the transaction.

The component uses the `useState` hook to manage the state of whether or not to show the transaction details. It also uses two additional state variables, `isHashCopied` and `isSigCopied`, to keep track of whether the user has copied the transaction hash or signature.

The `useActiveWeb3React` hook is used to get access to the web3 library, which is used to calculate the gas price for the transaction.

The `copyTextToClipboard` function is used to copy text to the clipboard. It first checks if the `navigator.clipboard` API is available, and if not, falls back to using the `document.execCommand` method.

The component renders a div that contains the transaction details. When the user clicks on the div, the `show` state variable is toggled, and the details are either shown or hidden.

If the details are shown, the component renders several divs that display information about the transaction, including the protocol fee, transaction state, and bridge transaction signature and hash. The `shortenString` function from the `format` module is used to shorten the signature and hash strings for display purposes.

Each of the signature and hash divs contains a copy button that, when clicked, copies the corresponding value to the clipboard and displays a "Copied!" message.

Overall, the `TransactionDetail` component provides a user-friendly way to view the details of a transaction in the Zoo project and copy important information to the clipboard. It can be used in conjunction with other components in the project to provide a comprehensive user interface for interacting with the blockchain. 

Example usage:

```jsx
import TransactionDetail from 'path/to/TransactionDetail';

const MyComponent = () => {
  const evmToAddress = '0x123...';
  const amount = 100;
  const token = { symbol: 'ZOO' };
  const bridgeState = { status: 'COMPLETED', signature: '0xabc...', hashedTxId: '0xdef...' };

  return (
    <div>
      <TransactionDetail evmToAddress={evmToAddress} amount={amount} token={token} bridgeState={bridgeState} />
    </div>
  );
};
```
## Questions: 
 1. What is the purpose of the `TransactionDetail` component?
- The `TransactionDetail` component is used to display details about a transaction, including the transaction state, protocol fee, and bridge transaction signature and hash.

2. What is the `useActiveWeb3React` hook used for?
- The `useActiveWeb3React` hook is used to get the active Web3 provider and library, which are used to retrieve the gas price for the transaction.

3. What is the purpose of the `copyTextToClipboard` function?
- The `copyTextToClipboard` function is used to copy text to the user's clipboard, and it uses the `navigator.clipboard` API if available, falling back to the `document.execCommand` method if not.