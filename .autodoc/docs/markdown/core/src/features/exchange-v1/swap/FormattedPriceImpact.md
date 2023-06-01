[View code on GitHub](zoo-labs/zoo/blob/master/core/src/features/exchange-v1/swap/FormattedPriceImpact.tsx)

This code defines a React component called `FormattedPriceImpact` that takes in a `priceImpact` prop of type `Percent`. The component returns a div element that displays the formatted price impact percentage with a corresponding text color based on the severity of the impact. 

The `SEVERITY` object maps severity levels (0-4) to CSS class names that determine the text color. The `warningSeverity` function, imported from `../../../functions/prices`, calculates the severity level based on the `priceImpact` prop. 

If `priceImpact` is not provided or is falsy, the component displays a dash ("-"). Otherwise, the component calculates the formatted percentage by multiplying `priceImpact` by -1 and rounding to 2 decimal places using the `toFixed` method. 

This component can be used in a larger project to display the price impact of a transaction or trade. For example, it could be used in a trading interface to show users the estimated impact of their trade on the market. 

Here is an example usage of the `FormattedPriceImpact` component:

```jsx
import { Percent } from "@zoolabs/zdk";
import FormattedPriceImpact from "./FormattedPriceImpact";

function TradeConfirmation({ trade }) {
  const { priceImpact } = trade;

  return (
    <div>
      <h2>Trade Confirmation</h2>
      <p>Price Impact: <FormattedPriceImpact priceImpact={priceImpact} /></p>
      {/* other trade details */}
    </div>
  );
}
```

In this example, the `TradeConfirmation` component receives a `trade` object that includes a `priceImpact` property of type `Percent`. The `FormattedPriceImpact` component is used to display the formatted price impact percentage with the appropriate text color based on the severity level.
## Questions: 
 1. What is the purpose of the `Percent` import from `@zoolabs/zdk`?
   - The `Percent` import is likely used to handle percentage calculations in the code.
2. What is the significance of the `ONE_BIPS` constant imported from `../../../constants`?
   - It is unclear from this code snippet what the `ONE_BIPS` constant is used for. Further investigation into the `constants` file may be necessary to determine its purpose.
3. How is the `warningSeverity` function from `../../../functions/prices` used in this code?
   - The `warningSeverity` function is used to determine which CSS class to apply to the `div` element's `className` attribute based on the severity of the `priceImpact` value.