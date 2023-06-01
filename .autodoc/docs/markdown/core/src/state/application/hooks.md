[View code on GitHub](zoo-labs/zoo/blob/master/core/src/state/application/hooks.ts)

This code file contains a collection of custom hooks and utility functions that are used in the larger project. The code is written in TypeScript and uses the React and Redux libraries. 

The `useBlockNumber` function returns the current block number of the active Ethereum network. It uses the `useActiveWeb3React` hook to get the current chain ID and the `useSelector` hook to retrieve the block number from the Redux store. 

The `useModalOpen` function takes an `ApplicationModal` enum value as input and returns a boolean indicating whether the corresponding modal is currently open. It uses the `useSelector` hook to retrieve the `openModal` value from the Redux store and compares it to the input value. 

The `useToggleModal` function takes an `ApplicationModal` enum value as input and returns a function that toggles the corresponding modal between open and closed states. It uses the `useModalOpen` and `useDispatch` hooks to retrieve the current open state and dispatch a Redux action to update the state. 

There are several other functions that are variations of `useToggleModal` and are specific to certain modals in the application. For example, `useAuctionModal` toggles the auction modal, `useShareModal` toggles the share modal, and so on. 

The `useAddPopup` function returns a function that allows adding a new popup to the application. It takes a `PopupContent` object and an optional key as input and dispatches a Redux action to add the popup to the store. 

The `useRemovePopup` function returns a function that allows removing a popup from the application by its key. It dispatches a Redux action to remove the popup from the store. 

The `useActivePopups` function returns an array of active popups in the application. It uses the `useSelector` hook to retrieve the `popupList` value from the Redux store and filters it to only include popups with a `show` property of `true`. 

Finally, there are several other utility functions that toggle various modals and perform other actions in the application. These functions are used throughout the codebase to provide a consistent and reusable way of managing modals and popups.
## Questions: 
 1. What is the purpose of the `useBlockNumber` function?
- The `useBlockNumber` function returns the block number for the current chain, obtained from the application state using `useSelector`.

2. What is the significance of the `ApplicationModal` enum?
- The `ApplicationModal` enum is used to identify different types of modals that can be opened in the application, and is used as an argument in various `useToggleModal` functions.

3. What is the purpose of the `useAddPopup` and `useRemovePopup` functions?
- The `useAddPopup` function returns a function that allows adding a popup to the application state, while the `useRemovePopup` function returns a function that allows removing a popup from the state using its key.