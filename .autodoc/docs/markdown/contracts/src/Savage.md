[View code on GitHub](zoo-labs/zoo/blob/master/contracts/src/Savage.sol)

The `Savage` contract is a smart contract that interacts with the Uniswap decentralized exchange. The contract allows the owner to swap tokens, add liquidity to a new pair, and remove liquidity from an existing pair. The contract is designed to work with three tokens: Z1, BNB, and ZOO. 

The `configure` function is used to set the addresses of the three tokens, the Uniswap factory, and the Uniswap router. The `swapTokens` function allows the owner to swap Z1 tokens for BNB tokens. The function calculates the deadline for the transaction and uses the Uniswap router to swap the tokens. The `drainPool` function allows the owner to remove all liquidity from an existing BNB/ZOO pair. The function calculates the balance of BNB tokens in the pair and swaps Z1 tokens for BNB tokens to remove the liquidity. The `launchPool` function allows the owner to create a new BNB/ZOO pair and add liquidity to it. The function creates the new pair using the Uniswap factory, approves the transfer of tokens to the Uniswap router, and adds liquidity to the new pair. The `withdrawAll` function allows the owner to withdraw any remaining Z1, BNB, or ZOO tokens from the contract. The `balanceZ1`, `balanceBNB`, and `balanceZOO` functions return the current balance of each token in the contract. The `z1Address`, `bnbAddress`, `zooAddress`, `factoryAddress`, and `routerAddress` functions return the address of each token or contract used by the `Savage` contract. The `getInitHash` function is a helper function that returns the init code for the UniswapV2Pair contract.

Overall, the `Savage` contract provides a convenient way for the owner to interact with the Uniswap decentralized exchange and manage liquidity for BNB/ZOO pairs. The contract can be used as part of a larger project that involves trading and managing liquidity for various tokens on the Uniswap exchange.
## Questions: 
 1. What is the purpose of this contract and how does it interact with the UniswapV2 protocol?
    
    This contract is called "Savage" and it interacts with the UniswapV2 protocol to swap tokens and add/remove liquidity from a pool. Its purpose is to enable the owner to manage the liquidity pool and withdraw tokens if necessary.

2. What are the main variables and functions used in this contract?
    
    The main variables used in this contract are IERC20 tokens A, B, and C, IUniswapV2Router01 Router, IUniswapV2Factory Factory, and addresses a, b, c, router, factory, and owner. The main functions used in this contract are configure(), swapTokens(), drainPool(), launchPool(), and withdrawAll().

3. How does this contract ensure that only the owner can execute certain functions?
    
    This contract uses a modifier called onlyOwner() to ensure that only the owner can execute certain functions. This modifier requires that the owner address matches the msg.sender address, and if it does not match, it will revert the transaction with an error message. The functions that use this modifier are configure(), drainPool(), launchPool(), and withdrawAll().