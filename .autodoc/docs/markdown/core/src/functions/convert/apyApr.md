[View code on GitHub](zoo-labs/zoo/blob/master/core/src/functions/convert/apyApr.ts)

This code provides two functions for converting between Annual Percentage Yield (APY) and Annual Percentage Rate (APR). APY is the rate of return on an investment over a year, taking into account compounding interest, while APR is the simple interest rate over a year. The functions take in the APY or APR as a percentage and the frequency of compounding (in times per year), and return the corresponding APR or APY as a percentage.

The `apyToApr` function uses the formula `(1 + apy / 100) ** (1 / frequency) - 1` to calculate the periodic interest rate, then multiplies it by the frequency to get the APR. The `aprToApy` function uses the formula `(1 + apr / 100 / frequency) ** frequency - 1` to calculate the periodic interest rate, then multiplies it by 100 to get the APY.

These functions could be useful in financial applications where APY and APR are important metrics, such as calculating interest on loans or investments. For example, if a user inputs an APY for a savings account, the `apyToApr` function could be used to calculate the equivalent APR for comparison to other interest rates. Similarly, if a user inputs an APR for a loan, the `aprToApy` function could be used to calculate the equivalent APY to determine the total cost of the loan over time.

Example usage:

```
import { apyToApr, aprToApy } from 'zoo';

const apy = 6;
const frequency = 12; // monthly compounding
const apr = apyToApr(apy, frequency); // 5.82

const apr2 = 5.82;
const frequency2 = 365; // daily compounding
const apy2 = aprToApy(apr2, frequency2); // 6.01
```
## Questions: 
 1. What is the purpose of this code?
- This code provides two functions, `apyToApr` and `aprToApy`, that convert between annual percentage yield (APY) and annual percentage rate (APR) based on a given compounding frequency.

2. What is the source of the formulas used in this code?
- The formulas used in this code are sourced from http://www.linked8.com/blog/158-apy-to-apr-and-apr-to-apy-calculation-methodologies.

3. What is the significance of the `BLOCKS_IN_A_YEAR` constant?
- The `BLOCKS_IN_A_YEAR` constant is used as the default value for the `frequency` parameter in both functions. It represents the number of blocks in a year based on a block time of 14 seconds, which is used in the Ethereum blockchain.