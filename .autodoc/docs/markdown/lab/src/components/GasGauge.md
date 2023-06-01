[View code on GitHub](zoo-labs/zoo/blob/master/lab/src/components/GasGauge.jsx)

## GasGauge Code Explanation

The `GasGauge` code is a React component that displays a gas gauge. The component is imported from the `antd` library and React. The purpose of this code is to display a gas gauge that shows the current gas price. 

The component takes in a single prop, `gasPrice`, which is used to display the current gas gauge. If `gasPrice` is not provided, the component will display 0 instead of NaN. 

To use the `GasGauge` component, simply import it and include it in your React code. The component can be used as follows:

```jsx
<GasGauge gasPrice={gasPrice} />
```

The `GasGauge` component is a button that, when clicked, opens a new window to the `ethgasstation.info` website. The button is styled with a large size and a round shape. The button also includes an icon of a fuel pump, represented by the `⛽️` emoji. 

The gas price is displayed next to the fuel pump icon. If `gasPrice` is undefined, the component will display 0. Otherwise, the gas price is parsed as an integer and divided by 10 to the power of 9 to convert it to gwei. The gas price is then displayed with a `g` suffix. 

Overall, the `GasGauge` component is a simple and useful way to display the current gas price in a React application.
## Questions: 
 1. What library is being used for the Button component?
   - The Button component is being imported from the "antd" library.
   
2. What happens when the button is clicked?
   - When the button is clicked, it opens a new window to the URL "https://ethgasstation.info/".
   
3. What is the purpose of the gasPrice prop?
   - The gasPrice prop is used to display the current gas gauge. If it is not provided, the display will show 0 instead of NaN.