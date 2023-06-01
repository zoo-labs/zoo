[View code on GitHub](zoo-labs/zoo/blob/master/app/components/primitives/PercentChange.tsx)

The code above defines a React functional component called `PercentChange`. This component takes in two props: `value` and `decimals`. The `value` prop can be a number, undefined, or null, while the `decimals` prop is an optional number that defaults to 2. 

The purpose of this component is to calculate the percentage change of a given value and display it as text. If the `value` prop is undefined, null, or 0, the component returns null and does not render anything. Otherwise, the percentage change is calculated by subtracting 1 from the `value` prop and multiplying the result by 100. 

The component then determines whether the percentage change is positive or negative by checking if it is greater than 0. If it is positive, the text color is set to a shade of green (`$green11`), otherwise it is set to a shade of red (`$red11`). 

Finally, the percentage change is rounded to the number of decimal places specified by the `decimals` prop using a utility function called `round`, and is displayed as text within a `Text` component. The `Text` component is imported from another file within the same directory and is passed any additional props that were passed to the `PercentChange` component.

This component can be used in a larger project to display percentage changes in various contexts, such as stock prices, sales figures, or website traffic. Here is an example of how the `PercentChange` component can be used:

```
import { PercentChange } from './PercentChange'

const StockPrice = ({ currentPrice, previousPrice }) => {
  const percentageChange = (currentPrice - previousPrice) / previousPrice

  return (
    <div>
      <span>Current Price: ${currentPrice}</span>
      <br />
      <span>Previous Price: ${previousPrice}</span>
      <br />
      <PercentChange value={percentageChange} />
    </div>
  )
}
```

In this example, the `PercentChange` component is used to display the percentage change between the current and previous stock prices. The `value` prop is set to the calculated percentage change, and the `decimals` prop is left at its default value of 2. The resulting percentage change is displayed as text within the `StockPrice` component.
## Questions: 
 1. What does this code do?
   This code exports a React functional component called `PercentChange` that takes in a `value` prop and displays the percentage change from that value. The component also has an optional `decimals` prop to specify the number of decimal places to display.
   
2. What dependencies does this code have?
   This code imports two dependencies: `react` and `utils/round`. `react` is used to define the React component, while `utils/round` is used to round the percentage value to the specified number of decimal places.
   
3. What is the purpose of the `isPositive` variable?
   The `isPositive` variable is used to determine whether the percentage change is positive or negative. It is set to `true` if the percentage is greater than 0, and `false` otherwise. This is used to determine the color of the text displayed by the component.