[View code on GitHub](zoo-labs/zoo/blob/master/ui/src/primitives/FormatWrappedCurrency.tsx)

The `FormatWrappedCurrency` component is a React functional component that formats a wrapped cryptocurrency value for display. It takes in props that are passed down to the `FormatCryptoCurrency` component, which is imported from another file. Additionally, it accepts two optional props: `logoWidth` and `address`.

The component first imports an object called `wrappedContracts` from another file. This object contains the contract addresses for various wrapped cryptocurrencies on different blockchain networks. It then imports a custom hook called `useNetwork` from the `wagmi` library, which provides information about the current blockchain network that the user is connected to.

The component then defines a type for its props, which extends the props of the `FormatCryptoCurrency` component and adds the two optional props mentioned earlier. It then defines the component itself as a functional component that takes in these props.

Inside the component, it first uses the `useNetwork` hook to get information about the current blockchain network. It checks if the `activeChain` property is defined and if it matches any of the `chains` in the `chains` array. If it does, it sets the `chain` variable to that matching chain. If not, it sets `chain` to the first chain in the `chains` array. If there are no chains in the array, `chain` remains undefined.

Next, the component uses the `chain` variable to determine the contract address for the wrapped cryptocurrency. It checks if the `id` property of `chain` is defined and if it exists as a key in the `wrappedContracts` object. If it does, it sets `contractAddress` to the corresponding value in the `wrappedContracts` object. If not, it sets `contractAddress` to the contract address for the Ethereum network.

Finally, the component returns the `FormatCryptoCurrency` component with the original props passed down, but with the `address` prop set to either the `address` prop passed in or the `contractAddress` determined earlier.

This component can be used in a larger project to display formatted wrapped cryptocurrency values with the correct contract address based on the current blockchain network. An example usage of this component could be:

```
<FormatWrappedCurrency value={100} symbol="WBTC" logoWidth={20} />
```

This would display the value "100 WBTC" with a logo width of 20 pixels, using the contract address for the current blockchain network.
## Questions: 
 1. What is the purpose of this code?
   - This code defines a React component called `FormatWrappedCurrency` that formats a cryptocurrency value and displays its logo. It also determines the contract address of the wrapped currency based on the active blockchain network.
   
2. What dependencies does this code have?
   - This code imports `React`, `FC`, and `ComponentProps` from the `react` library, `wrappedContracts` from a custom module, and `useNetwork` and `FormatCryptoCurrency` from other custom modules. It also uses TypeScript for type definitions.
   
3. What props can be passed to the `FormatWrappedCurrency` component?
   - The `FormatWrappedCurrency` component accepts all props that can be passed to the `FormatCryptoCurrency` component, as well as two additional props: `logoWidth` (a number) and `address` (a string).