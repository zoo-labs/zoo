[View code on GitHub](zoo-labs/zoo/blob/master/core/src/features/analytics/Portfolio/AllocationTable.tsx)

The code above defines a React component called `AllocationTable` that takes in an array of objects called `allocations` as a prop. Each object in the `allocations` array has two properties: `name`, which is a string, and `allocation`, which is a number. The purpose of this component is to render a table that displays the `name` and `allocation` properties of each object in the `allocations` array.

The table is defined using HTML tags within the `return` statement of the `AllocationTable` function. The `tbody` tag contains a `map` function that iterates over each object in the `allocations` array and returns a `tr` tag for each object. The `key` attribute of each `tr` tag is set to the index of the current object in the `allocations` array. The `className` attribute of each `tr` tag is set to `'hidden'` if the `allocation` property of the current object is equal to 0 or is not a number. This will hide the row if the allocation is 0 or NaN.

Each `tr` tag contains three `td` tags. The first `td` tag contains a `div` tag that displays the `name` property of the current object. The second `td` tag contains a `div` tag that displays a horizontal bar graph representing the `allocation` property of the current object. The width of the bar graph is set to the percentage value of the `allocation` property using inline styles. The third `td` tag contains a `div` tag that displays the `allocation` property of the current object as a percentage using the `formatPercent` function imported from the `functions` module.

This component can be used in the larger project to display a table of asset allocations for a portfolio or investment account. The `allocations` prop can be passed in as an array of objects representing the percentage allocation of each asset in the portfolio. The resulting table will display the name of each asset, a horizontal bar graph representing its allocation, and the allocation percentage. This component can be easily customized by modifying the CSS classes and inline styles to match the design of the larger project.
## Questions: 
 1. What is the purpose of the `AllocationTable` component?
- The `AllocationTable` component is used to render a table of allocations with names and percentages.

2. What is the `allocations` prop and what shape does it need to be in?
- The `allocations` prop is an array of objects with `name` and `allocation` properties. The `name` property should be a string and the `allocation` property should be a number.

3. What is the purpose of the `formatPercent` function and where is it imported from?
- The `formatPercent` function is used to format a number as a percentage with two decimal places. It is imported from a file located at `../../../functions`.