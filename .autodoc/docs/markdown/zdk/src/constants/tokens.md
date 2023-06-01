[View code on GitHub](zoo-labs/zoo/blob/master/zdk/src/constants/tokens.ts)

This code defines three objects, `USDC`, `WETH9`, and `WNATIVE`, which are all maps of `Token` objects. Each `Token` object represents a specific ERC-20 token on a specific blockchain network, and is defined by its `ChainId`, contract address, number of decimal places, symbol, and name. 

The `USDC` object maps `Token` objects to each supported blockchain network, with the `USDC_ADDRESS` constant providing the contract address for USDC on each network. Similarly, the `WETH9` object maps `Token` objects to each supported blockchain network, with the `WETH9_ADDRESS` constant providing the contract address for WETH on each network. Finally, the `WNATIVE` object maps `Token` objects to each supported blockchain network, with the `WNATIVE_ADDRESS` constant providing the contract address for the native token (usually WETH) on each network.

These objects are likely used throughout the larger project to represent and interact with various ERC-20 tokens on different blockchain networks. For example, if the project needs to interact with USDC on the BSC network, it can access the `USDC` object and retrieve the corresponding `Token` object. This `Token` object can then be used to interact with the USDC contract on the BSC network, such as querying the balance of a specific address or transferring USDC between addresses. 

Code example:
```
import { USDC } from 'zoo'

const usdcToken = USDC[ChainId.BSC] // retrieve USDC Token object for BSC network
const balance = await usdcToken.balanceOf('0x123...') // query USDC balance of a specific address
await usdcToken.transfer('0x456...', '1000000000000') // transfer 0.000001 USDC to another address
```
## Questions: 
 1. What is the purpose of the `Token` class and how is it used in this code?
- The `Token` class is imported from `../entities/Token` and is used to create new instances of tokens with specific properties such as chain ID, address, decimals, symbol, and name.

2. What is the significance of the `TokenMap` type and how is it used in this code?
- The `TokenMap` type is imported from `../types/TokenMap` and is used to define a mapping of `Token` instances to different chain IDs. This allows for easy access to the correct token instance based on the current chain ID.

3. What is the purpose of the `USDC_ADDRESS`, `WETH9_ADDRESS`, and `WNATIVE_ADDRESS` constants and where are they defined?
- These constants are defined in the `./addresses` file and contain the addresses of the USDC, WETH9, and WNATIVE tokens on different chain IDs. They are used in the creation of new `Token` instances for each chain ID in the `USDC`, `WETH9`, and `WNATIVE` objects.