[View code on GitHub](zoo-labs/zoo/blob/master/core/src/modals/TransactionConfirmationModal/index.tsx)

This code defines several React components that are used to display different types of transaction confirmation modals in the Zoo project. The modals are used to provide feedback to the user about the status of a transaction, such as whether it is pending, has been submitted, or has encountered an error. 

The `ConfirmationPendingContent` component displays a modal with a loading animation and a message indicating that the transaction is waiting for confirmation. It also displays two lines of text that are passed in as props. 

The `TransactionSubmittedContent` component displays a modal with a checkmark icon and a message indicating that the transaction has been submitted. It also provides a link to view the transaction on an explorer and a button to add a currency to MetaMask. The component takes several props, including the transaction hash, chain ID, and currency to add. 

The `ConfirmationModalContent` component is a generic component that displays a modal with a title, top content, and bottom content. It is used as a wrapper for the other confirmation modals. 

The `TransactionErrorContent` component displays a modal with an error icon and a message indicating that the transaction has encountered an error. It also provides a button to dismiss the modal. 

The `TransactionConfirmationModal` component is the main component that is exported by this file. It takes several props, including whether the modal is open, whether the transaction is attempting, the transaction hash, and the content to display. It conditionally renders one of the other confirmation modals based on the state of the transaction. 

Overall, these components provide a consistent and user-friendly way to display transaction confirmation feedback to users in the Zoo project. Developers can use these components in their own code to provide transaction confirmation feedback to users. For example, they might use the `TransactionSubmittedContent` component to display a confirmation modal after a user has submitted a transaction to the blockchain.
## Questions: 
 1. What external libraries or packages are being used in this code?
- The code is importing several packages such as `react-feather`, `@zoolabs/zdk`, `@lingui/macro`, `lottie-react`, and some custom components from the `../../components` directory.

2. What are the different components being exported in this file?
- The file exports several React components such as `ConfirmationPendingContent`, `TransactionSubmittedContent`, `ConfirmationModalContent`, `TransactionErrorContent`, and `TransactionConfirmationModal`.

3. What is the purpose of the `useAddTokenToMetaMask` hook being imported in this file?
- The `useAddTokenToMetaMask` hook is being used to add a token to the user's MetaMask wallet. It is being called in the `TransactionSubmittedContent` component when the user clicks on the "Add to MetaMask" button.