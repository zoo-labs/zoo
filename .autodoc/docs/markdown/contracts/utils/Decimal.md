[View code on GitHub](zoo-labs/zoo/blob/master/contracts/utils/Decimal.ts)

The `Decimal` class in the `zoo` project provides two static methods for creating decimal values that can be used in Ethereum smart contracts. The first method, `new`, takes a regular JavaScript number as input and returns a decimal value with 18 decimal places. The second method, `raw`, takes a regular JavaScript number as input and returns a decimal value with no decimal places.

The `new` method first determines the number of decimal places in the input value by calling the `countDecimals` function. It then calculates the difference between 18 and the number of decimal places, and creates a `BigNumber` object representing 10 raised to the power of that difference. It then creates another `BigNumber` object representing the absolute value of the input value with the decimal point removed, and multiplies it by the `BigNumber` representing the zeros. Finally, it logs the resulting `BigNumber` object to the console and returns an object with a `value` property set to the resulting `BigNumber` object.

The `raw` method simply creates a `BigNumber` object representing the input value and returns an object with a `value` property set to that `BigNumber` object.

The `countDecimals` function takes a number as input and returns the number of decimal places in that number. If the input number is an integer, it returns 0. Otherwise, it converts the number to a string, splits it at the decimal point, and returns the length of the second element of the resulting array (which represents the decimal portion of the number).

Overall, the `Decimal` class provides a convenient way to create decimal values with a specified number of decimal places or with no decimal places, which can be useful in Ethereum smart contracts that require precise calculations involving decimal values. Here is an example usage of the `new` method:

```
import Decimal from 'zoo/Decimal'

const myDecimal = Decimal.new(123.456)
console.log(myDecimal.value.toString()) // "123456000000000000000"
```
## Questions: 
 1. What is the purpose of the `Decimal` class and its methods?
- The `Decimal` class provides methods for converting a given number to a BigNumber with 18 decimal places (`new` method) and for creating a BigNumber directly from a given number (`raw` method).

2. What is the `BigNumber` class and where does it come from?
- The `BigNumber` class is imported from the `ethers` library, which is likely being used for interacting with the Ethereum blockchain.

3. What is the purpose of the `countDecimals` function?
- The `countDecimals` function is used to determine the number of decimal places in a given number. It returns 0 if the number is an integer.