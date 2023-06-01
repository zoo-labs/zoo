[View code on GitHub](zoo-labs/zoo/blob/master/app/components/primitives/FormatCurrency.tsx)

The `FormatCurrency` component is a React functional component that formats a given amount of money into a currency format based on the provided `currency` parameter. The component takes in a `Props` object that includes the `amount` to be formatted, `currency` type, and `maximumFractionDigits` to be displayed. 

The component uses the `useState` and `useEffect` hooks from React to manage state and side effects. The `useState` hook initializes the `formattedValue` state to a default value of `-`. The `useEffect` hook is used to update the `formattedValue` state whenever the `amount` or `maximumFractionDigits` props change. 

The `Intl.NumberFormat` constructor is used to format the `amount` into a currency format based on the `currency` parameter. The `+amount` is used to convert the `amount` string to a number before formatting. If the `amount` is not provided, the `formattedValue` state is set to `-`.

The component returns a `Text` component from the `./index` file with the `formattedValue` as its child. The `Text` component is passed any additional props passed to the `FormatCurrency` component. If no `style` prop is provided, the `Text` component defaults to a `subtitle3` style.

This component can be used in a larger project to format currency values in a consistent and standardized way. For example, it can be used in an e-commerce application to display prices of products in different currencies. 

Example usage:

```
<FormatCurrency amount={10.99} currency="EUR" maximumFractionDigits={2} />
```

This will display the formatted value of `€10.99`.
## Questions: 
 1. What does this component do?
- This component formats a given amount as currency using the Intl.NumberFormat API and displays it as text.

2. What are the possible values for the `currency` prop?
- The `currency` prop accepts any valid currency code recognized by the Intl.NumberFormat API, such as "USD", "EUR", "JPY", etc.

3. What is the purpose of the `maximumFractionDigits` prop?
- The `maximumFractionDigits` prop determines the maximum number of decimal places to display in the formatted currency value. If not specified, it defaults to 2.