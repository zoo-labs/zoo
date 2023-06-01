[View code on GitHub](zoo-labs/zoo/blob/master/ui/src/primitives/FormatCurrency.tsx)

The `FormatCurrency` component is a React functional component that formats a given amount of money into a currency format. It takes in a `Props` object that contains the `amount` to be formatted, the `currency` to format the amount in, and the `maximumFractionDigits` to be displayed. 

The `FormatCurrency` component uses the `useState` and `useEffect` hooks to manage the state of the formatted value. The `useState` hook initializes the `formattedValue` state to an empty string. The `useEffect` hook is used to update the `formattedValue` state whenever the `amount` or `maximumFractionDigits` props change. 

The `useEffect` hook first checks if the `amount` prop is truthy. If it is, it calculates the lowest possible value based on the `maximumFractionDigits` prop and checks if the `amount` is less than that value. If the `amount` is less than the lowest possible value, the `formattedValue` state is set to `<` concatenated with the formatted lowest possible value. Otherwise, the `amount` is formatted using the `Intl.NumberFormat` constructor and the `formattedValue` state is set to the formatted amount. If the `amount` prop is falsy, the `formattedValue` state is set to an empty string.

Finally, the `FormatCurrency` component returns a `Text` component with the `formattedValue` state as its child. The `Text` component also receives any additional props passed to the `FormatCurrency` component and sets its `style` and `color` props to default values if they are not provided.

This component can be used in a larger project to format currency values in a consistent and localized way. For example, it can be used to format prices in an e-commerce website or financial application. Here is an example usage of the `FormatCurrency` component:

```
<FormatCurrency amount={19.99} currency="EUR" maximumFractionDigits={2} />
```

This will format the amount `19.99` as `€19.99`.
## Questions: 
 1. What does this component do?
- This component formats a given amount as currency and displays it as text.

2. What are the possible values for the `currency` prop?
- The `currency` prop accepts any valid currency code recognized by the `Intl.NumberFormat` API, but defaults to `'USD'` if not provided.

3. What happens if the `amount` prop is less than the smallest possible value for the given `maximumFractionDigits`?
- If the `amount` prop is less than the smallest possible value for the given `maximumFractionDigits`, the component will format and display the smallest possible value instead of the actual amount, with a message indicating that the actual amount is less than the displayed value.