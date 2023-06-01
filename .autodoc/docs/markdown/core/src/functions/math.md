[View code on GitHub](zoo-labs/zoo/blob/master/core/src/functions/math.ts)

This file contains a set of utility functions for working with BigNumber objects, which are large numbers used in Ethereum smart contracts. The file imports the BigNumber and BigNumberish types from the '@ethersproject/bignumber' library.

The first export is a constant called ZERO, which is a BigNumber object representing the value 0.

The next function, e10, takes an exponent as an argument and returns a BigNumber object representing 10 to the power of that exponent. This function can be used to convert between different units of measurement in Ethereum, which often use powers of 10. For example, to convert 1 ether (which has 18 decimal places) to wei (which has 0 decimal places), you would call e10(18).

The final two functions, minimum and maximum, take any number of BigNumberish arguments and return the smallest or largest value, respectively. These functions can be used to compare and order BigNumber objects. For example, to find the minimum value in an array of BigNumber objects, you would call minimum(...array).

Overall, this file provides useful utility functions for working with BigNumber objects in Ethereum smart contracts. These functions can be used to perform common operations such as converting between units of measurement and comparing values.
## Questions: 
 1. What is the purpose of the `BigNumber` and `BigNumberish` imports from `@ethersproject/bignumber`?
- `BigNumber` and `BigNumberish` are likely used for handling large numbers in the code, possibly related to cryptocurrency transactions.

2. What is the significance of the `ZERO` constant?
- The `ZERO` constant is likely used as a default value or reference point for calculations involving `BigNumber` values.

3. What do the `minimum` and `maximum` functions do?
- The `minimum` and `maximum` functions take in an array of `BigNumberish` values and return the lowest and highest values, respectively. These functions could be useful for finding the minimum or maximum value in a set of data.