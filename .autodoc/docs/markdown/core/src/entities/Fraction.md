[View code on GitHub](zoo-labs/zoo/blob/master/core/src/entities/Fraction.ts)

The `Fraction` class in the `zoo` project provides functionality for working with fractions. It is used to represent fractions of ERC20 tokens in the project. The class is implemented using the `BigNumber` class from the `@ethersproject/bignumber` package and the `Fraction` class from the `@zoolabs/zdk` package.

The `Fraction` class has several static methods that can be used to create instances of the class. The `from` method takes two arguments, `numerator` and `denominator`, and returns a new `Fraction` instance with the given numerator and denominator. The `parse` method takes a string argument and returns a new `Fraction` instance with the parsed value. The `convert` method takes an instance of the `SDKFraction` class and returns a new `Fraction` instance with the same numerator and denominator.

The `Fraction` class has several instance methods that can be used to perform operations on fractions. The `isZero` method returns `true` if the fraction is zero. The `isNaN` method returns `true` if the fraction is not a number. The `eq`, `gt`, and `lt` methods compare the fraction to another fraction and return `true` if the comparison is true. The `toString` method returns a string representation of the fraction with a maximum number of decimal places specified by the `maxFractions` argument. The `apply` method takes a `BigNumberish` argument and returns the result of applying the fraction to the argument.

Overall, the `Fraction` class provides a convenient way to work with fractions of ERC20 tokens in the `zoo` project. It can be used to perform arithmetic operations on fractions, compare fractions, and convert between different representations of fractions. Here is an example of how the `Fraction` class can be used:

```
import Fraction from 'zoo/fraction'

const fraction1 = Fraction.from(1, 2)
const fraction2 = Fraction.parse('0.25')
const fraction3 = Fraction.convert(new SDKFraction(1, 3))

console.log(fraction1.toString()) // '0.5'
console.log(fraction2.toString()) // '0.25'
console.log(fraction3.toString()) // '0.33333333'

console.log(fraction1.eq(fraction2)) // false
console.log(fraction1.gt(fraction2)) // true
console.log(fraction1.lt(fraction2)) // false

console.log(fraction1.apply(10)) // BigNumber('5')
```
## Questions: 
 1. What is the purpose of the `Fraction` class?
    
    The `Fraction` class is used to represent fractions with a numerator and denominator, and provides methods for comparing and manipulating fractions.

2. What is the significance of the `BASE` property?
    
    The `BASE` property is a static property of the `Fraction` class that represents the denominator used for all fractions. It is set to 10^18, which is the standard value used for Ethereum tokens.

3. What is the purpose of the `apply` method?
    
    The `apply` method takes a `BigNumberish` value and returns the result of applying the fraction to that value. If the denominator of the fraction is zero, it returns `Zero`.