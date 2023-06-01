[View code on GitHub](zoo-labs/zoo/blob/master/core/src/components/AccountDetails/Transaction.tsx)

The `Transaction` component is a React functional component that displays information about a transaction on the Ethereum blockchain. It imports several dependencies from various packages, including `@zoolabs/zdk`, `@heroicons/react/outline`, and `@lingui/react`. 

The component takes a single prop, `hash`, which is the hash of the transaction to display. It then uses several hooks to retrieve information about the transaction from the Redux store, including `useActiveWeb3React` and `useAllTransactions`. 

The component then renders a div that displays the transaction summary and status. The summary is either the transaction hash or a user-defined summary if one exists. The status is displayed as an icon, with different icons representing pending, successful, cancelled, or failed transactions. 

If the transaction was submitted using the Archer network, additional information is displayed, including the nonce and tip amount. If the transaction is pending, the component also displays a countdown timer indicating how long until the transaction expires. If the transaction has expired, the component displays an "Expired" message. 

Finally, if the transaction is pending, the component allows the user to cancel the transaction by clicking a "Cancel" button. This sends a request to the Archer network to cancel the transaction, and updates the transaction status in the Redux store. 

This component is likely used in other parts of the project to display information about transactions, such as in a transaction history or on a confirmation page after submitting a transaction.
## Questions: 
 1. What is the purpose of the `Transaction` component?
- The `Transaction` component is used to display information about a transaction, including its status, summary, and deadline.

2. What is the `calculateSecondsUntilDeadline` function used for?
- The `calculateSecondsUntilDeadline` function is used to calculate the number of seconds until a transaction's deadline, which is used to determine whether the transaction has expired.

3. What is the `cancelPending` function used for?
- The `cancelPending` function is used to cancel a pending transaction by sending a request to the Archer Relay API with the transaction's raw data and authorization headers. If the cancellation is successful, the transaction is marked as cancelled in the application state.