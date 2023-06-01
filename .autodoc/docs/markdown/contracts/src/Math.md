[View code on GitHub](zoo-labs/zoo/blob/master/contracts/src/Math.sol)

The `Math` library is a collection of non-standard math functions that are used in the larger `zoo` project. This library is imported from the OpenZeppelin `SafeMath` library, which provides additional safety checks for arithmetic operations in Solidity.

The library contains several functions that perform basic arithmetic operations such as multiplication, division, and rounding. These functions are used to calculate partial values of a target number based on a numerator and denominator. The `getPartial` function returns the result of multiplying the target by the numerator and dividing by the denominator. The `getPartialRoundUp` function performs the same calculation, but rounds up the result to the nearest integer.

The library also contains several functions that convert a `uint256` number to a smaller data type such as `uint128`, `uint96`, or `uint32`. These functions are used to reduce the size of data stored on the blockchain, which can help reduce gas costs.

Finally, the library contains two functions that return the minimum or maximum of two `uint256` numbers. These functions are used to compare values and determine which one is larger or smaller.

Overall, the `Math` library provides a set of useful math functions that can be used in various parts of the `zoo` project. For example, these functions may be used in smart contracts that involve financial calculations or data compression. 

Example usage of the `getPartial` function:

```
uint256 target = 100;
uint256 numerator = 25;
uint256 denominator = 50;
uint256 result = Math.getPartial(target, numerator, denominator); // returns 50
```
## Questions: 
 1. What is the purpose of this library and what functions does it provide?
- This library is called "Math" and provides non-standard math functions. It includes functions for getting partial values, rounding up partial values, converting numbers to different bit sizes, and finding the minimum and maximum of two numbers.

2. What is the origin of this code and has it been modified?
- This file is a clone of the dydx protocol's Decimal.sol contract, which was forked from https://github.com/dydxprotocol/solo at commit 2d8454e02702fe5bc455b848556660629c3cad36. It has not been modified other than to use a newer solidity in the pragma to match the rest of the contract suite of this project.

3. What external dependency does this library have?
- This library imports the SafeMath library from "@openzeppelin/contracts/utils/math/SafeMath.sol".