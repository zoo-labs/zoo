[View code on GitHub](zoo-labs/zoo/blob/master/zdk/src/constants/currencyMap.ts)

This code defines constants and functions related to currencies used in the larger project. It imports `Token` and `Ether` entities from the `entities` module, and `ChainId` enum from the `enums` module. It also imports constants for the addresses of USDC, WETH9, and USDT tokens from the `addresses` module.

The `CurrencySymbol` enum defines symbols for various currencies, including DAI, ETH, WETH, USDC, and USDT. 

The code defines several constants for logos of different currencies, including EthLogo, WethLogo, UsdcLogo, UsdtLogo, and DaiLogo. 

The code also defines two constants, `ZERO_ADDRESS` and `UNDEPLOYED_ADDRESS`, which are both set to a string of 40 zeros. 

The `getCurrencyConstants` function takes a `contracts` object as input and returns an object with constants for the addresses of WETH, USDC, and USDT tokens on the mainnet, Ropsten, and Hardhat chains. 

The `getCurrencyMap` function takes a `contracts` object as input and returns an object with tokens for WETH, USDC, and USDT on the mainnet, Ropsten, and Hardhat chains. 

The `getSymbolCurrencyMap` function takes a `contracts` object as input and returns an object with tokens for ETH, WETH, USDC, and USDT on the mainnet, Ropsten, and Hardhat chains. 

The `getSymbolCurrency` function takes a `contracts` object, a `chainId` enum value, and a `symbol` string as input, and returns the corresponding token for the given chain and symbol. 

Finally, the `isNativeCurrency` function takes a `currency` string as input and returns a boolean indicating whether the currency is the zero address. 

Overall, this code provides a set of constants and functions for working with different currencies in the larger project. It allows for easy access to tokens on different chains and provides a way to check whether a given currency is the native currency of a chain.
## Questions: 
 1. What is the purpose of the `getCurrencyConstants` function?
- The `getCurrencyConstants` function returns an object containing the addresses of various tokens on different chains, such as WETH, USDC, and USDT on the mainnet, Ropsten, and Hardhat chains.

2. What is the significance of the `CurrencySymbol` enum?
- The `CurrencySymbol` enum defines a set of currency symbols, such as DAI, ETH, WETH, USDC, and USDT, which are used throughout the codebase to represent different tokens.

3. What is the purpose of the `getSymbolCurrency` function?
- The `getSymbolCurrency` function takes in a chain ID and a currency symbol, and returns the corresponding token object for that symbol on that chain.