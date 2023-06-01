[View code on GitHub](zoo-labs/zoo/blob/master/core/src/functions/proposal.ts)

This code file contains three functions that are related to the voting system of the larger project. The first function, `getProposalState`, takes a `Proposal` object as input and returns the state of the proposal. The state can be one of three values: `ProposalState.PENDING`, `ProposalState.ONGOING`, or `ProposalState.ENDED`. The state is determined by comparing the current time with the start and end times of the proposal. If the current time is before the start time, the state is `ProposalState.PENDING`. If the current time is after the end time, the state is `ProposalState.ENDED`. Otherwise, the state is `ProposalState.ONGOING`. This function can be used to display the state of a proposal to the user.

The second function, `filteredProposals`, takes an array of `Proposal` objects, a `type` number, and a `state` string as input. It filters the array of proposals based on the `type` and `state` parameters. If `type` is equal to 3, it filters the proposals based on their state only. If `type` is not equal to 3, it filters the proposals based on both their state and type. This function can be used to display a filtered list of proposals to the user based on their state and type.

The third function, `calcAmountToPay`, takes the number of times a user has voted as input and returns the amount they need to pay for their next vote. The formula used to calculate the amount is ((n+1)^2 - n^2), where n is the number of times the user has voted. This function can be used to calculate the amount a user needs to pay for their next vote.

Overall, these functions are important for the voting system of the larger project. They can be used to display the state of proposals to the user, filter proposals based on their state and type, and calculate the amount a user needs to pay for their next vote.
## Questions: 
 1. What is the purpose of the `getProposalState` function?
- The `getProposalState` function takes a `Proposal` object as input and returns its state based on its start and end times and the current time.

2. What does the `filteredProposals` function do?
- The `filteredProposals` function takes an array of `Proposal` objects, a `type` number, and a `state` string as input, and returns a filtered array of `Proposal` objects based on their state and type.

3. What is the formula used in the `calcAmountToPay` function?
- The `calcAmountToPay` function takes the number of times a proposal has been voted on as input and returns the amount to pay for the next vote using the formula `(n+1th)2 - (nth)2`.