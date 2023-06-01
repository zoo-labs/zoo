[View code on GitHub](zoo-labs/zoo/blob/master/core/src/features/analytics/InfoCard.tsx)

The code defines a React component called `InfoCard` that renders an information card with a title, a number, and a percentage. The component takes four props: `text` (a string representing the title of the card), `number` (a number or string representing the value to be displayed), `numberType` (an optional string that determines how the `number` prop should be formatted), and `percent` (a number representing the percentage to be displayed).

The `InfoCard` component imports two functions from a `functions` module: `formatNumber` and `formatPercent`. These functions are used to format the `number` and `percent` props, respectively. The component also imports another component called `ColoredNumber`, which is used to display the percentage with a color that indicates whether it is positive or negative.

The `InfoCard` component defines a function called `switchNumber` that uses a switch statement to format the `number` prop based on the value of the `numberType` prop. If `numberType` is `'usd'`, the `formatNumber` function is used to format the number as a US dollar amount. If `numberType` is `'text'`, the number is returned as is. If `numberType` is `'percent'`, the `formatPercent` function is used to format the number as a percentage.

The `InfoCard` component returns a div element that contains the title and the formatted number and percentage. The div has a dark background color and a border, and it is rounded. The title is displayed with a white-space property set to "nowrap" to prevent line breaks. The number and percentage are displayed in a flex container with a space between them. The number is displayed with a font size of 2xl and a bold font weight. The percentage is displayed using the `ColoredNumber` component, which takes the `percent` prop and displays it with a color that indicates whether it is positive or negative.

This component can be used in a larger project to display various types of information in a consistent and visually appealing way. For example, it could be used to display financial data, sales figures, or performance metrics. The `numberType` prop allows the component to be flexible and adapt to different types of data, while the `ColoredNumber` component adds a visual element that makes it easy to see whether the percentage is positive or negative. Overall, this component is a useful and versatile tool for displaying information in a clear and concise way.
## Questions: 
 1. What does the `ColoredNumber` component do and where is it imported from?
   - The `ColoredNumber` component is imported from the same directory as this file and it takes in a `number` and `percent` prop to display a colored number with a percentage sign.
2. What is the purpose of the `switchNumber` function and how is it used?
   - The `switchNumber` function takes in a `numberType` prop and formats the `number` prop based on the type. It is used to display the formatted number in the JSX returned by the `InfoCard` component.
3. What CSS classes are applied to the outermost `div` element returned by the `InfoCard` component?
   - The outermost `div` element has the classes `w-full`, `px-6`, `py-4`, `border`, `rounded`, `bg-dark-900`, and `border-dark-700`.