[View code on GitHub](zoo-labs/zoo/blob/master/core/src/components/TransactionSettings/index.tsx)

The `TransactionSettings` component is responsible for rendering and managing the user's transaction settings, specifically the slippage tolerance and transaction deadline. It imports several hooks from the `user` slice of the global state, including `useUserSlippageTolerance`, `useSetUserSlippageTolerance`, and `useUserTransactionTTL`. It also imports several utility functions and components from various packages.

The component takes in a `placeholderSlippage` prop, which is used to display a default slippage tolerance value in the input field. It then initializes several state variables using the `useState` hook, including `slippageInput`, `slippageError`, `deadlineInput`, and `deadlineError`. It also initializes a reference to the slippage input field using the `useRef` hook.

The `parseSlippageInput` function is responsible for parsing and validating the user's input for the slippage tolerance. It first sets the `slippageInput` state variable to the user's input and clears the `slippageError` state variable. If the input is empty, it sets the user's slippage tolerance to "auto". Otherwise, it attempts to parse the input as a number and convert it to a percentage. If the parsed value is not an integer between 0 and 5000, it sets the user's slippage tolerance to "auto" and sets the `slippageError` state variable to `SlippageError.InvalidInput`. Otherwise, it sets the user's slippage tolerance to the parsed value as a `Percent` object.

The `parseCustomDeadline` function is responsible for parsing and validating the user's input for the transaction deadline. It first sets the `deadlineInput` state variable to the user's input and clears the `deadlineError` state variable. If the input is empty, it sets the transaction deadline to the default value. Otherwise, it attempts to parse the input as a number and convert it to seconds. If the parsed value is not an integer between 60 and 10800 (3 hours), it sets the `deadlineError` state variable to `DeadlineError.InvalidInput`. Otherwise, it sets the transaction deadline to the parsed value.

The component then renders two input fields for the slippage tolerance and transaction deadline, respectively. The slippage tolerance input field includes a button to toggle between "auto" and custom values, as well as a `QuestionHelper` component to display additional information. The transaction deadline input field includes a label for "minutes" and a `QuestionHelper` component. If there are any errors with the user's input, the component displays an error message below the input field.

Overall, the `TransactionSettings` component provides a user-friendly interface for managing transaction settings and ensures that the user's input is properly validated before being used in the application. It can be used in various contexts throughout the larger project, wherever transaction settings need to be managed.
## Questions: 
 1. What is the purpose of the `TransactionSettings` component?
- The `TransactionSettings` component is used to display and allow users to adjust their slippage tolerance and transaction deadline settings.

2. What are the possible values for the `SlippageError` and `DeadlineError` enums?
- The `SlippageError` enum has three possible values: `InvalidInput`, `RiskyLow`, and `RiskyHigh`. The `DeadlineError` enum has one possible value: `InvalidInput`.
- These enums are used to track and display errors related to user input for slippage tolerance and transaction deadline settings.

3. What is the purpose of the `useUserSlippageTolerance`, `useSetUserSlippageTolerance`, and `useUserTransactionTTL` hooks?
- The `useUserSlippageTolerance` hook retrieves the current slippage tolerance setting for the user.
- The `useSetUserSlippageTolerance` hook is used to update the user's slippage tolerance setting.
- The `useUserTransactionTTL` hook retrieves the current transaction deadline setting for the user.