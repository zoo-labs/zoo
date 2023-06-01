[View code on GitHub](zoo-labs/zoo/blob/master/contracts/scripts/deployPool.ts)

The code is a script that interacts with the Uniswap decentralized exchange and the Savage token contract. It creates a new liquidity pool on Uniswap for the Z1 and BNB tokens, adds liquidity to the pool, and mints new Z1 tokens to the current account. 

First, the script retrieves the current account using the `ethers.getSigners()` method. Then, it retrieves the UniswapV2Factory, UniswapV2Router02, Savage, Z1, and B contracts using the `ethers.getContract()` method. The addresses of these contracts are logged to the console. 

Next, the script creates a new liquidity pool on Uniswap by calling the `createPair()` method of the UniswapV2Factory contract. This method takes two token addresses as arguments and returns a transaction object. The script waits for the transaction to be confirmed using the `wait()` method. 

After the pool is created, the script retrieves the pair address using the `getPair()` method of the UniswapV2Factory contract. The pair address is logged to the console. 

The script then sets the amounts of Z1 and BNB tokens to be added to the pool, as well as the minimum amount of output tokens required. It also sets the amount of Z1 tokens to be minted to the current account. 

The script mints new BNB and Z1 tokens to the current account using the `mint()` method of the B and Z1 contracts, respectively. It then approves the Router contract to spend these tokens using the `approve()` method. 

Finally, the script adds liquidity to the pool using the `addLiquidity()` method of the UniswapV2Router02 contract. This method takes the addresses of the two tokens, the amounts of input tokens, the minimum amount of output tokens, and other parameters as arguments. The script waits for the transaction to be confirmed before exiting. 

This script can be used to create a new liquidity pool on Uniswap for the Z1 and BNB tokens and add liquidity to the pool. It can also be used to mint new Z1 tokens to the current account. This functionality may be useful in a larger project that involves the Savage token and the Uniswap decentralized exchange.
## Questions: 
 1. What is the purpose of this code?
- This code is used to add liquidity to a Uniswap pool by creating a new pair and adding liquidity to it.

2. What contracts are being used in this code?
- The code is using the UniswapV2Factory, UniswapV2Router02, Savage, Z, and B contracts.

3. What is the significance of the variables `amountIn` and `amountOutMin`?
- `amountIn` is the amount of Z tokens that will be added to the liquidity pool, while `amountOutMin` is the minimum amount of BNB tokens that the user expects to receive in exchange for the Z tokens.