[View code on GitHub](zoo-labs/zoo/blob/master/contracts/src/Bridge.sol)

The `Bridge` contract is a smart contract that enables swapping of ERC20 and ERC721 tokens between different chains. The contract is part of the larger Zoo project and is used to facilitate cross-chain token transfers.

The contract defines several structs, including `Token` and `Transaction`, which are used to represent tokens and swap transactions, respectively. The `Token` struct contains information about the token, including its type (ERC20 or ERC721), ID, chain ID, address, and whether it is enabled for swapping. The `Transaction` struct contains information about the swap transaction, including the IDs of the tokens being swapped, the sender and recipient addresses, the amount being swapped, and a nonce to ensure that the transaction is unique.

The contract also defines several mappings, including `tokens` and `transactions`, which are used to store information about supported tokens and swap transactions, respectively. The `tokens` mapping maps a unique identifier for each token (based on its chain ID and address) to its `Token` struct. The `transactions` mapping maps a unique identifier for each swap transaction (based on the IDs of the tokens being swapped, the sender and recipient addresses, the amount being swapped, and the nonce) to its `Transaction` struct.

The contract defines several functions for enabling and performing swaps. The `setToken` function is used to enable swapping of a new ERC20 or ERC721 token. The function takes a `Token` struct as input and saves it to the `tokens` mapping. If the token is already enabled, the function emits an `AddToken` event; otherwise, it emits a `RemoveToken` event.

The `swap` function is used to perform a swap between two tokens on different chains. The function takes as input the `Token` structs for the two tokens being swapped, the recipient address, the amount being swapped, and a nonce. The function first checks that the swap is being initiated from the correct chain and that both tokens are enabled for swapping. It then saves the swap transaction to the `transactions` mapping and emits a `Swap` event. Finally, it burns the original tokens on the sender's chain and mints new tokens on the recipient's chain.

The `burn` and `mint` functions are used to burn and mint tokens, respectively. The `burn` function takes as input a `Token` struct, the owner address, and the amount being burned. It then burns the specified amount of tokens and emits a `Burn` event. The `mint` function takes as input a `Token` struct, the owner address, and the amount being minted. It first checks that the token is on the current chain and that the owner address is not zero. It then mints the specified amount of tokens and emits a `Mint` event.

Overall, the `Bridge` contract provides a way for users to swap ERC20 and ERC721 tokens between different chains. The contract is used in conjunction with other contracts in the Zoo project to enable cross-chain token transfers.
## Questions: 
 1. What is the purpose of this contract?
- This contract is a bridge contract that enables swapping of ERC20 and ERC721 tokens between different chains.

2. How are tokens enabled for swapping?
- Tokens are enabled for swapping by calling the `setToken` function with the token's chain ID and address. The function saves the token configuration and emits an `AddToken` event if the token is enabled for swapping, or a `RemoveToken` event if it is not.

3. How are tokens burned and minted during a swap?
- Tokens are burned by calling the `burn` function with the token to be burned, the owner's address, and the amount to be burned. Tokens are minted by calling the `mint` function with the token to be minted, the owner's address, and the amount to be minted. The `mint` function also takes a fee from the amount to be minted and sends it to the DAO address.