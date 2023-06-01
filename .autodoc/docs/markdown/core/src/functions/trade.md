[View code on GitHub](zoo-labs/zoo/blob/master/core/src/functions/trade.ts)

The code in this file provides several utility functions for working with trades and currencies in the larger zoo project. 

The `isTradeBetter` function takes two trades and a minimum delta percentage and returns a boolean indicating whether the second trade is better than the first by at least the minimum delta percentage. If the first trade is undefined or null and the second is not, the function returns true. If the second trade is undefined or null and the first is not, the function returns false. If either trade is undefined or null, the function returns undefined. If the trades are not comparable (i.e. they have different trade types or input/output currencies), the function throws an error. Otherwise, the function compares the execution prices of the trades and returns whether the second trade is better than the first by at least the minimum delta percentage.

The `calculateGasMargin` function takes a BigNumber value and returns a new BigNumber value that is 20% higher than the input value. This function is used to add a margin of safety to gas estimates when interacting with smart contracts.

The `calculateSlippageAmount` function takes a CurrencyAmount value and a slippage percentage and returns a tuple of two JSBI values representing the minimum and maximum possible amounts after accounting for slippage. This function is used to estimate the impact of slippage on trades.

The `computeFiatValuePriceImpact` function takes two CurrencyAmount values representing the fiat value of the input and output tokens in a trade and returns a Percent value representing the price impact of the trade. If either input is undefined or null, the function returns undefined. If the input and output currencies are not the same, the function returns undefined. If the input fiat value is zero, the function returns undefined. Otherwise, the function calculates the price impact as the percentage difference between the output and input fiat values.

Overall, these functions provide useful tools for working with trades and currencies in the zoo project, allowing for more accurate estimation of gas costs, slippage, and price impact.
## Questions: 
 1. What is the purpose of the `isTradeBetter` function?
- The `isTradeBetter` function compares two trades and determines if `tradeB` is better than `tradeA` by at least a threshold percentage amount.

2. What is the purpose of the `calculateGasMargin` function?
- The `calculateGasMargin` function adds a 20% gas margin to a given value.

3. What is the purpose of the `computeFiatValuePriceImpact` function?
- The `computeFiatValuePriceImpact` function calculates the price impact of a trade in terms of fiat value, given the input and output fiat values.