[View code on GitHub](zoo-labs/zoo/blob/master/zdk/src/entities/Fraction.ts)

The code in this file defines a `Fraction` class that represents a fraction as a numerator and denominator. The class provides methods for performing arithmetic operations on fractions, such as addition, subtraction, multiplication, and division. It also provides methods for comparing fractions, such as less than, equal to, and greater than. Additionally, the class provides methods for converting fractions to a fixed number of decimal places or significant digits.

The `Fraction` class takes two arguments in its constructor: a numerator and a denominator. The numerator and denominator are stored as `JSBI` (JavaScript BigInt) objects. The class provides methods for performing arithmetic operations on fractions, such as `add`, `subtract`, `multiply`, and `divide`. These methods take either another `Fraction` object or a `BigintIsh` (a JavaScript BigInt, number, or string) as an argument.

The class also provides methods for comparing fractions, such as `lessThan`, `equalTo`, and `greaterThan`. These methods take either another `Fraction` object or a `BigintIsh` as an argument.

The `Fraction` class provides methods for converting fractions to a fixed number of decimal places or significant digits. The `toFixed` method takes a number of decimal places and an optional format object as arguments and returns a string representation of the fraction with the specified number of decimal places. The `toSignificant` method takes a number of significant digits, an optional format object, and an optional rounding mode as arguments and returns a string representation of the fraction with the specified number of significant digits.

The `Fraction` class also provides a `tryParseFraction` method that takes a `BigintIsh` or `Fraction` object as an argument and returns a `Fraction` object. If the argument is already a `Fraction` object, it is returned unchanged. If the argument is a `BigintIsh`, a new `Fraction` object is created with the `BigintIsh` as the numerator and `1` as the denominator.

Overall, the `Fraction` class provides a way to represent and perform arithmetic operations on fractions in JavaScript. It can be used in a larger project that requires working with fractions, such as a financial or scientific application.
## Questions: 
 1. What external libraries are being used in this code?
- The code is importing `_Big` from the `big.js` library, `JSBI` from the `jsbi` library, `_Decimal` from the `decimal.js-light` library, `invariant` from the `tiny-invariant` library, and `toFormat` from the `toformat` library.

2. What is the purpose of the `Fraction` class?
- The `Fraction` class represents a fraction with a numerator and denominator, and provides methods for performing arithmetic operations, comparisons, and formatting.

3. What is the difference between the `toSignificant` and `toFixed` methods of the `Fraction` class?
- The `toSignificant` method formats the fraction to a specified number of significant digits, while the `toFixed` method formats the fraction to a specified number of decimal places. Both methods take optional parameters for formatting and rounding.