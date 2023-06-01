[View code on GitHub](zoo-labs/zoo/blob/master/zdk/src/functions/computePriceImpact.ts)

The code in this file contains a function called `computePriceImpact` that calculates the percent difference between the mid price and the execution price of a trade. This is also known as the price impact. 

The function takes in three parameters: `midPrice`, `inputAmount`, and `outputAmount`. `midPrice` is the mid price before the trade, while `inputAmount` and `outputAmount` are the input and output amounts of the trade, respectively. 

The function first calculates the quoted output amount by calling the `quote` method on `midPrice` with `inputAmount` as the argument. This gives the expected output amount based on the mid price. 

Next, the function calculates the price impact by subtracting `outputAmount` from `quotedOutputAmount` and dividing the result by `quotedOutputAmount`. The resulting value is then used to create a new `Percent` object, which is returned by the function. 

This function is likely used in a larger project that involves trading currencies. It can be used to determine the price impact of a trade, which can be useful in making decisions about whether to execute the trade or not. 

Here is an example of how this function can be used:

```
import { computePriceImpact } from 'zoo'

const midPrice = new Price(new Currency('USD'), new Currency('EUR'), '1.2')
const inputAmount = new CurrencyAmount(new Currency('USD'), '100')
const outputAmount = new CurrencyAmount(new Currency('EUR'), '110')

const priceImpact = computePriceImpact(midPrice, inputAmount, outputAmount)

console.log(priceImpact.toString()) // Output: "8.333333333333334"
```

In this example, we create a `midPrice` object with a USD/EUR exchange rate of 1.2. We then create `inputAmount` and `outputAmount` objects representing a trade of 100 USD for 110 EUR. We pass these objects to `computePriceImpact` along with `midPrice` and store the result in `priceImpact`. Finally, we log the value of `priceImpact` to the console, which should be approximately 8.33%.
## Questions: 
 1. What is the purpose of the `computePriceImpact` function?
- The function calculates the percent difference between the mid price and the execution price, also known as price impact.

2. What are the input parameters of the `computePriceImpact` function?
- The function takes in three parameters: `midPrice` which is the mid price before the trade, `inputAmount` which is the input amount of the trade, and `outputAmount` which is the output amount of the trade.

3. What is the output of the `computePriceImpact` function?
- The function returns a `Percent` object which represents the calculated price impact.