[View code on GitHub](zoo-labs/zoo/blob/master/app/utils/numbers.ts)

The `zoo` project contains a module that provides functions for formatting and converting Ethereum (ETH) values to human-readable formats. The module is implemented in a single file and exports three functions: `formatDollar`, `formatBN`, and `formatNumber`.

The `formatDollar` function takes a number as input and returns a string formatted as a US dollar currency value. If the input is `null` or `undefined`, the function returns a dash (`-`). The function uses the `Intl.NumberFormat` constructor to create a formatter that formats numbers as currency values in US dollars.

The `formatNumber` function takes a number or string as input and returns a string formatted as a number with a specified number of decimal places. If the input is `null` or `undefined`, the function returns a dash (`-`). The function uses the `Intl.NumberFormat` constructor to create a formatter that formats numbers with a specified number of decimal places.

The `formatBN` function takes an Ethereum value as input and returns a string formatted as a human-readable value with a specified number of decimal places. The function takes three arguments: `amount`, `maximumFractionDigits`, and `decimals`. The `amount` argument is the Ethereum value to format, and can be a `BigNumberish` (a BigNumber or a string or number that can be converted to a BigNumber), `null`, or `undefined`. The `maximumFractionDigits` argument is the maximum number of decimal places to include in the formatted value. The `decimals` argument is the number of decimal places for the atomic unit of Ethereum (18 by default).

The function first checks if the `amount` argument is `null` or `undefined`, and returns a dash (`-`) if it is. Otherwise, it converts the `amount` to a number using the `utils.formatUnits` function from the `ethers` library. If the resulting number is zero, the function returns zero. Otherwise, it formats the number using the `Intl.NumberFormat` constructor to create a formatter that formats numbers with a specified number of decimal places. The function also sets several options for the formatter, including the minimum and maximum number of decimal places, whether to use grouping separators, and whether to use compact notation. The function then uses the `formatToParts` method of the formatter to get an array of objects representing the formatted number. The function checks if the browser is Safari, and if so, applies a workaround for a bug in the `formatToParts` method that affects the representation of the fraction part of the formatted number. The function then uses the `truncateFractionAndFormat` helper function to truncate the fraction part of the formatted number to the specified number of decimal places and return the final formatted string.

Overall, this module provides useful functions for formatting and converting Ethereum values to human-readable formats, which can be used in various parts of the `zoo` project. For example, the `formatDollar` function can be used to display Ethereum values in a user interface, while the `formatBN` function can be used to format Ethereum values for storage or transmission.
## Questions: 
 1. What is the purpose of the `zoo` project and how does this code fit into it?
- This code provides functions for formatting currency and number values, which may be used in various parts of the `zoo` project.

2. What is the significance of the `isSafariBrowser` function and how is it used in this code?
- The `isSafariBrowser` function is used to determine if the user's browser is Safari, and is used to apply workarounds for bugs in Safari's `Intl.NumberFormat` implementation.

3. What is the purpose of the `formatBN` function and what are the parameters it accepts?
- The `formatBN` function converts an ETH value to a human-readable format, and accepts the amount (in BigNumberish format), the maximum number of decimal digits to display, and the number of decimal digits for the atomic unit.