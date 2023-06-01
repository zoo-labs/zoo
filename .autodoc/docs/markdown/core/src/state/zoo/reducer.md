[View code on GitHub](zoo-labs/zoo/blob/master/core/src/state/zoo/reducer.ts)

This code defines the state and reducer for the `zoo` project. The `zoo` project is a blockchain-based game where users can buy, sell, and breed virtual animals. The state is defined as an object with various properties such as `animals`, `myBids`, `myAuctions`, `eggs`, `zooBalance`, `myEggs`, and `myTransactions`. The reducer is created using the `createReducer` function from the `@reduxjs/toolkit` library.

The reducer handles various actions such as `loading`, `getZooBalance`, `getBNBBalance`, `getAllowance`, `addEgg`, `updateMyNfts`, `addAuctionNft`, `eggsCount`, `animalsCount`, `breedsCount`, and `addNftTTransfers`. These actions update the state based on the payload received. For example, the `getZooBalance` action updates the `zooBalance` property of the state with the balance received in the payload.

The code also imports various functions and types from other files such as `actions`, `types`, and `functions`. These files contain the implementation of the various actions and types used in the `zoo` project.

Overall, this code defines the state and reducer for the `zoo` project and handles various actions to update the state based on the payload received. This code can be used in the larger `zoo` project to manage the state of the application and handle various user actions. For example, when a user buys an animal, the `addNftTTransfers` action can be used to update the state with the new transfer. Similarly, when a user wants to check their balance, the `getZooBalance` action can be used to retrieve the balance from the blockchain and update the state.
## Questions: 
 1. What are the different actions being imported from "./actions" and what do they do?
- The actions being imported are `getZooBalance`, `getAllowance`, `addEgg`, `updateMyNfts`, `loading`, `eggsCount`, `animalsCount`, `breedsCount`, `addAuctionNft`, `getBNBBalance`, and `addNftTTransfers`. They are used to update different parts of the `initialState` object in response to different events.

2. What is the purpose of the `createReducer` function and how is it being used in this code?
- The `createReducer` function is used to create a Redux reducer function that updates the state based on different actions. It takes an initial state object and a builder function that defines how the state should be updated in response to different actions. In this code, it is being used to create the default export for the module.

3. What is the purpose of the `isEmptyObj` function and where is it being used?
- The `isEmptyObj` function is used to check if an object is empty (i.e. has no properties). It is being imported from a `functions` module and used in the `addEgg` and `updateMyNfts` cases of the reducer to check if the payload object is empty before updating the state.