[View code on GitHub](zoo-labs/zoo/blob/master/core/src/state/transactions/hooks.tsx)

This file contains several functions and hooks related to managing transactions in a decentralized application. 

The `useTransactionAdder` function is a helper function that takes a transaction response from an ethers library and adds it to the list of transactions. It returns a function that can be called with the transaction response and optional custom data such as a summary, approval, claim, or archer. This function checks if there is an account and chainId available, and if so, dispatches an action to add the transaction to the store.

The `useAllTransactions` function returns all the transactions for the current chain. It uses the `useActiveWeb3React` hook to get the current chainId and the `useAppSelector` hook to get the transactions from the store. It returns an object with the transaction hash as the key and the transaction details as the value.

The `useIsTransactionPending` function takes a transaction hash and returns a boolean indicating whether the transaction is pending. It uses the `useAllTransactions` hook to get all the transactions and checks if the transaction hash exists and if there is no receipt for the transaction.

The `isTransactionRecent` function takes a transaction and returns a boolean indicating whether the transaction happened in the last day. It compares the current time to the time the transaction was added.

The `useHasPendingApproval` function takes a token address and spender and returns a boolean indicating whether there is a pending approval transaction for the token and spender. It uses the `useAllTransactions` hook to get all the transactions and filters them based on the token address, spender, and recency using the `isTransactionRecent` function.

The `useUserHasSubmittedClaim` function takes an account and returns an object with a boolean indicating whether the user has submitted a claim and the transaction details for the claim if it exists. It uses the `useAllTransactions` hook to get all the transactions and filters them based on the claim recipient and account.

The `useTransactionPopups` function returns an object with functions to add error, warning, and transaction popups. It uses the `useAddPopup` and `useTransactionAdder` hooks to add the popups and transactions. It also takes optional callbacks for when a transaction is pending or has a receipt. 

Overall, these functions and hooks provide a way to manage transactions in a decentralized application by adding, retrieving, and checking the status of transactions. They can be used in conjunction with other parts of the application to provide feedback to the user and manage state. For example, the `useHasPendingApproval` function can be used to disable a button until the approval transaction is confirmed.
## Questions: 
 1. What is the purpose of the `useTransactionAdder` function?
- The `useTransactionAdder` function is a helper function that takes a transaction response and adds it to the list of transactions.
2. What does the `useHasPendingApproval` function do?
- The `useHasPendingApproval` function returns whether a token has a pending approval transaction.
3. What is the purpose of the `useTransactionPopups` function?
- The `useTransactionPopups` function is used to add error, warning, and transaction popups to the UI. It takes in optional callbacks for handling pending transactions and transaction receipts.