[View code on GitHub](zoo-labs/zoo/blob/master/core/src/functions/prices.ts)

This file contains several utility functions that are used in the larger zoo project. The file imports several constants from the `constants` file and several classes and functions from the `@zoolabs/zdk` library. 

The `formatExecutionPrice` function takes a `Trade` object, an optional boolean `inverted` flag, and an optional `chainId` parameter. It returns a string that represents the execution price of the trade. If the `inverted` flag is true, the function returns the inverse of the execution price. The `chainId` parameter is not used in this function. 

The `computeRealizedLPFeePercent` function takes a `Trade` object and returns the realized liquidity provider (LP) fee as a `Percent` object. The function calculates the fee by iterating over the pairs in the trade's route and subtracting the product of the x and y values of the price impact from the 0.3% fee. The result is returned as a `Percent` object. 

The `computeRealizedLPFeeAmount` function takes a `Trade` object and returns the amount of the input currency that accrues to LPs as a `CurrencyAmount` object. The function calculates the realized LP fee using the `computeRealizedLPFeePercent` function and multiplies it by the input amount of the trade. The result is returned as a `CurrencyAmount` object. 

The `warningSeverity` function takes a `Percent` object representing the price impact of a trade and returns a `WarningSeverity` value. The function compares the price impact to several predefined impact tiers and returns a value between 0 and 4, where 0 represents the highest severity warning and 4 represents no warning. 

The file also defines several constants that are used in the above functions. The `THIRTY_BIPS_FEE` constant represents a 0.3% fee as a `Percent` object. The `ONE_HUNDRED_PERCENT` constant represents 100% as a `Percent` object. The `INPUT_FRACTION_AFTER_FEE` constant represents the fraction of the input amount that remains after the 0.3% fee is subtracted. The `TWENTY_FIVE_BIPS_FEE` and `FIVE_BIPS_FEE` constants represent 0.25% and 0.05% fees, respectively, as `Percent` objects. 

Overall, this file provides several utility functions that are used in the larger zoo project to calculate fees and warnings for trades. These functions are used to provide users with information about the costs and risks associated with their trades.
## Questions: 
 1. What are the constants being imported from '../constants'?
Answer: The code is importing constants related to allowed and blocked price impacts.

2. What is the purpose of the functions `computeRealizedLPFeePercent` and `computeRealizedLPFeeAmount`?
Answer: `computeRealizedLPFeePercent` computes the realized LP fee as a percentage for a given trade, while `computeRealizedLPFeeAmount` computes the amount of the input that accrues to LPs for a given trade.

3. What is the purpose of the `warningSeverity` function?
Answer: The `warningSeverity` function takes a price impact as input and returns a warning severity level based on the impact tiers defined in the `IMPACT_TIERS` array.