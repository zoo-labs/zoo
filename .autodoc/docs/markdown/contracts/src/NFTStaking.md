[View code on GitHub](zoo-labs/zoo/blob/master/contracts/src/NFTStaking.sol)

The `ZooNFTStaker` contract is a smart contract that allows users to stake their non-fungible tokens (NFTs) and earn rewards in the form of ERC20 tokens. The contract implements the `I721Stake` interface, which defines the functions that can be called by users to stake and unstake their NFTs.

The contract uses the OpenZeppelin library to import the `IERC721` and `IERC20` interfaces, which are used to interact with the NFT and ERC20 tokens, respectively. The contract also imports the `ERC1155Receiver` and `SafeMath` libraries from OpenZeppelin.

The contract has a number of state variables, including `stakeLive`, which is a boolean that determines whether staking is currently allowed, and `totalStakers`, which keeps track of the total number of stakers. The contract also has variables that define the minimum, medium, and maximum staking periods, as well as the timestamp in seconds.

The contract defines a `Percentage` struct that is used to store the reward percentages for different staking periods. The `percentage` mapping is used to store the reward percentages for each level, and the `updatePercentage` function can be called by the contract owner to update the reward percentages.

The contract also defines a `Staker` struct that is used to store information about each staker, including the NFTs they have staked and the staking periods for each NFT. The `stakers` mapping is used to store the `Staker` struct for each staker.

The contract has a number of functions that can be called by the contract owner to update the contract parameters, including `updateMinumTime`, `updateMediumTime`, `updatemMaximumTime`, and `updateTimeStampSeconds`. The contract owner can also freeze individual stakers or NFTs using the `freezeStaker` and `freezeNft` functions.

The `stake` function allows users to stake their NFTs, and the `unstake` function allows them to unstake their NFTs and claim their rewards. The `rewardAmount` function calculates the rewards that a staker is eligible to receive based on the staking periods for their NFTs.

Overall, the `ZooNFTStaker` contract provides a way for users to earn rewards by staking their NFTs, and allows the contract owner to update the staking parameters and freeze individual stakers or NFTs.
## Questions: 
 1. What is the purpose of this contract?
- This contract is a staking contract for NFTs, where users can stake their NFTs and earn rewards in a specified ERC20 token.

2. What are the requirements for staking an NFT?
- The staker must not be frozen, the NFT must not be frozen, and the staker must own the NFT.

3. How are rewards calculated and distributed?
- Rewards are calculated based on the length of time the NFT has been staked and the percentage level set by the contract owner. Rewards are distributed in the specified ERC20 token.