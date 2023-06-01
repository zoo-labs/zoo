[View code on GitHub](zoo-labs/zoo/blob/master/core/src/hooks/useVote.ts)

This code file contains several custom hooks that are used in the Zoo project. The hooks are designed to interact with the ZooVoting smart contract and perform various actions such as adding proposals, getting all proposals, voting on proposals, and checking if a user has voted on a proposal. 

The `useAddProposal` hook is used to add a new proposal to the ZooVoting smart contract. It takes in several parameters such as the proposal value, start and end timestamps, and a success callback function. The hook uses the `useCallback` hook from React to memoize the function and optimize performance. If the proposal is successfully added, a success message is displayed using the `notify` function from the `components/alertMessage` module.

The `useGetAllProposals` hook is used to get all proposals from the ZooVoting smart contract. It uses the `useCallback` hook to memoize the function and optimize performance. The hook fetches all proposals from the smart contract and structures them into an array of objects. The objects contain information such as the proposal type, status, start time, IPFS hash, votes, and vote count. The structured proposals are then dispatched to the Redux store using the `dispatch` function from the `react-redux` module.

The `useVoteProposal` hook is used to vote on a proposal in the ZooVoting smart contract. It takes in several parameters such as the proposal ID, the user's choice, and success/error callback functions. The hook dispatches a `voteProposal` action to the Redux store to indicate that a vote is in progress. If the vote is successful, a success message is displayed using the `addPopup` function from the `state/application/hooks` module.

The `useHasVoted` hook is used to check if a user has voted on a proposal in the ZooVoting smart contract. It takes in several parameters such as the user's address, the proposal ID, and success/error callback functions. The hook returns a boolean value indicating whether the user has voted on the proposal or not.

The `useGetAllVoters` hook is used to get all voters from the ZooVoting smart contract. It uses the `useCallback` hook to memoize the function and optimize performance. The hook fetches all voters from the smart contract and returns them as an array.

Overall, these hooks provide a convenient way to interact with the ZooVoting smart contract and perform various actions such as adding proposals, getting all proposals, voting on proposals, and checking if a user has voted on a proposal. These hooks can be used in other components of the Zoo project to provide a seamless user experience.
## Questions: 
 1. What is the purpose of the `useAddProposal` function?
- The `useAddProposal` function is used to add a new proposal to the voting system by calling the `addProposals` function from the `useZooVoting` contract. It also handles success and error callbacks and displays notifications.

2. What is the purpose of the `useGetAllProposals` function?
- The `useGetAllProposals` function is used to retrieve all proposals from the voting system by calling the `getAllProposals` function from the `useZooVoting` contract. It also structures the retrieved data and dispatches it to the Redux store.

3. What is the purpose of the `useVoteProposal` function?
- The `useVoteProposal` function is used to vote on a proposal in the voting system by calling the `voteProposal` function from the `useZooVoting` contract. It also handles success and error callbacks and displays notifications.