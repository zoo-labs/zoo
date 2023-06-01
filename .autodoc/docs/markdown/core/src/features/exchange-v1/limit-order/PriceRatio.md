[View code on GitHub](zoo-labs/zoo/blob/master/core/src/features/exchange-v1/limit-order/PriceRatio.tsx)

The `PriceRatio` component is a React functional component that displays the exchange rate between two currencies. It is part of the larger `zoo` project and imports the `Currency` and `Price` classes from the `@zoolabs/zdk` library, as well as the `useState` and `FC` (Functional Component) hooks from the `react` library, and two custom hooks `useDerivedLimitOrderInfo` and `useLimitOrderState` from the `../../../state/limit-order/hooks` module.

The component renders a div containing two sub-divs. The first sub-div displays the exchange rate between the two currencies, which is calculated using the `Price` class. The exchange rate is displayed in the format "1 [input currency symbol] = [exchange rate] [output currency symbol]". The exchange rate is calculated based on the `parsedAmounts` and `currentPrice` values obtained from the `useDerivedLimitOrderInfo` hook. If both `parsedAmounts[Field.INPUT]` and `parsedAmounts[Field.OUTPUT]` are defined, the exchange rate is calculated using these values. Otherwise, the `currentPrice` value is used. The `inverted` state variable is used to toggle the input and output currencies in the exchange rate display.

The second sub-div contains a clickable icon that toggles the `inverted` state variable when clicked. This causes the input and output currencies to be swapped in the exchange rate display.

This component can be used in the larger `zoo` project to display the exchange rate between two currencies in a user interface. It can be imported and rendered in any other React component that requires this functionality. For example:

```
import PriceRatio from './components/PriceRatio';

function App() {
  return (
    <div>
      <h1>Exchange Rates</h1>
      <PriceRatio />
    </div>
  );
}
```
## Questions: 
 1. What is the purpose of the `useDerivedLimitOrderInfo` and `useLimitOrderState` hooks imported from `../../../state/limit-order/hooks`?
- These hooks are likely used to retrieve and manage state related to limit orders in the application.

2. What is the significance of the `PriceRatio` component and where is it used in the application?
- The `PriceRatio` component appears to be responsible for displaying the exchange rate between two currencies, and it may be used in various parts of the application where currency exchange is relevant.

3. What is the purpose of the `inverted` state variable and how is it used in the component?
- The `inverted` state variable is used to determine whether the exchange rate should be displayed in the original or inverted format, and it is toggled by clicking on a button in the component. This may be useful for users who prefer to see the exchange rate in a different format.