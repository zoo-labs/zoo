[View code on GitHub](zoo-labs/zoo/blob/master/core/src/modals/SearchModal/CommonBases.tsx)

The `CommonBases` component is a React functional component that renders a list of commonly used tokens (referred to as "bases") for a given blockchain network. The component takes in three props: `chainId`, `selectedCurrency`, and `onSelect`. 

The `chainId` prop is an optional number that specifies the blockchain network for which the list of common bases should be displayed. If `chainId` is not provided, the component will not render any bases. If `chainId` is provided, the component will look up the list of common bases for that network from the `COMMON_BASES` object in the `routing` configuration file. If the list of common bases for the specified network is not found, an empty array is used instead.

The `selectedCurrency` prop is an optional `Currency` object that represents the currently selected base. If `selectedCurrency` is provided, the component will disable the button for that base and prevent it from being selected again. 

The `onSelect` prop is a callback function that is called when a base is selected. The function takes in a `Currency` object representing the selected base.

The component renders a list of buttons, one for each base in the list of common bases. Each button displays the base's logo and symbol, and is disabled if the base is already selected. When a button is clicked, the `onSelect` callback is called with the corresponding `Currency` object.

This component can be used in a larger project that involves selecting a base token for a trading pair. For example, in a decentralized exchange application, the user may need to select a base token before selecting a quote token to create a trading pair. The `CommonBases` component provides a pre-defined list of commonly used base tokens for the user to choose from, making the selection process easier and more intuitive. 

Example usage:

```
<CommonBases
  chainId={1}
  selectedCurrency={selectedBase}
  onSelect={(currency) => setSelectedBase(currency)}
/>
```
## Questions: 
 1. What is the purpose of this code and what does it do?
- This code exports a React component called `CommonBases` that displays a list of commonly paired tokens for a given `chainId`. It allows the user to select a token from the list and calls the `onSelect` function with the selected token.

2. What external dependencies does this code rely on?
- This code relies on several external dependencies, including `@zoolabs/zdk`, `react`, and various components from the `../../components` directory.

3. What is the significance of the `COMMON_BASES` constant and how is it used in this code?
- The `COMMON_BASES` constant is a configuration object that maps `chainId` values to arrays of `Currency` objects. It is used in this code to determine which tokens to display in the list based on the `chainId` prop passed to the `CommonBases` component. If `chainId` is not defined, an empty array is used instead.