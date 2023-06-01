[View code on GitHub](zoo-labs/zoo/blob/master/core/src/components/Voting/ProposalsTable.tsx)

The `ProposalsTable` component is a React component that renders a table of proposals. It takes in an array of `Proposal` objects, a `state` string, and a `type` number as props. The component filters the proposals based on the `state` and `type` props and renders them in a table format.

The component uses the `useRouter` hook from the `next/router` module to handle navigation to the proposal details page when a proposal is clicked. It also uses the `toast` function from the `react-toastify` module to display a message when a user tries to vote on a pending proposal.

The `filteredProposals` function is imported from the `functions/proposal` module and is used to filter the proposals based on the `state` and `type` props. The `getProposalState` function is also imported from the same module but is not used in this component.

The `getDay` function takes in a `time` parameter and returns a formatted date string in the format "MMMM dd, yyyy | hh:mm a". This function is used to display the start and end times of the proposals.

The component renders a table of proposals using the `_proposals` state variable. If there are no proposals to display, a message is displayed instead. Each proposal is rendered as a div element with the proposal title, start and end times, and proposal type displayed. The proposal type is displayed as a button with a different color depending on whether it is a core or community proposal. The proposal state is also displayed as a button with a different color depending on whether it is pending, ongoing, or closed. When a proposal is clicked, the user is navigated to the proposal details page if the proposal is ongoing. If the proposal is pending, a message is displayed using the `toast` function.

Overall, this component is an important part of the larger project as it allows users to view and interact with the proposals in a user-friendly way. It also demonstrates the use of React hooks and modules to handle navigation and display messages.
## Questions: 
 1. What is the purpose of the `ProposalsTable` component?
- The `ProposalsTable` component is used to display a table of proposals based on their state and type.

2. What external libraries are being used in this code?
- The code is using several external libraries including `next/image`, `react`, `next/router`, `date-fns`, and `react-toastify`.

3. What is the purpose of the commented out code block?
- The commented out code block is an alternative implementation of the `ProposalsTable` component that uses different HTML elements and CSS classes to style the proposals table. It is likely that this code was used during development and was left in as a reference or backup.