[View code on GitHub](zoo-labs/zoo/blob/master/core/src/bootstrap.ts)

This code file contains a set of functions and extensions to existing classes that are used in the larger zoo project. 

The first section of the code imports various dependencies, including `BigNumber` and `Fraction` from the `@ethersproject/bignumber` package, as well as `React` and `Zero` from other packages. It also imports a function called `parseUnits` from `@ethersproject/units`. 

The next section of the code checks if the code is running in a browser environment and in development mode. If so, it imports and runs a package called `why-did-you-render`, which is used for debugging and optimizing React components. 

The remaining code defines several extensions to the `BigNumber` and `String` classes. 

The `mulDiv` function extends the `BigNumber` class and takes two arguments, `multiplier` and `divisor`, both of which are `BigNumberish` types. It returns a new `BigNumber` that is the result of multiplying the original `BigNumber` by the `multiplier` and dividing by the `divisor`. If the `divisor` is zero or negative, it returns `Zero`. 

The `toFraction` function also extends the `BigNumber` class and takes an optional argument `decimals`, which defaults to 18. It returns a new `Fraction` object that represents the `BigNumber` as a fraction with the specified number of decimal places. 

The `toFixed` function extends the `BigNumber` class and takes two optional arguments, `decimals` and `maxFractions`, both of which default to 18 and 8, respectively. It returns a string representation of the `BigNumber` with the specified number of decimal places and maximum number of fractions. 

The `toBigNumber` function extends the `String` class and takes an argument `decimals`. It attempts to parse the string as a `BigNumber` with the specified number of decimal places using the `parseUnits` function. If parsing fails, it returns `BigNumber.from(0)`.

These extensions to the `BigNumber` and `String` classes provide additional functionality that is used throughout the zoo project. For example, the `mulDiv` function is used to calculate the price of tokens in various trading pairs, while the `toFraction` and `toFixed` functions are used to format token amounts and prices for display. The `toBigNumber` function is used to convert user input from strings to `BigNumber` objects.
## Questions: 
 1. What is the purpose of the `Fraction` entity and how is it used in this code?
   - The `Fraction` entity is imported from `./entities/Fraction` and is used to convert a `BigNumber` to a fraction with a specified number of decimals.
2. What is the significance of the `mulDiv` function added to the `BigNumber` prototype?
   - The `mulDiv` function multiplies a `BigNumber` by a multiplier and divides it by a divisor, returning the result as a `BigNumber`. If the divisor is zero or negative, it returns `Zero`.
3. Why is the `whyDidYouRender` library being used in this code, and what options are being passed to it?
   - The `whyDidYouRender` library is being used to track unnecessary re-renders in development mode. The options being passed to it include tracking all pure components, tracking hooks, logging owner reasons, and collapsing groups.