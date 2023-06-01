[View code on GitHub](zoo-labs/zoo/blob/master/lab/src/components/Address.jsx)

The `Address` component is used to display an Ethereum address with a blockie image and an option to copy the address. The component takes in several props, including `address`, `ensProvider`, `blockExplorer`, and `fontSize`. 

If the `address` prop is not provided, the component will display a loading skeleton. If an ENS provider is provided, the component will replace the address with the ENS name (e.g. "0xa870" => "user.eth"). If a block explorer URL is provided, clicking on the address will take the user to the corresponding page on the block explorer. The `fontSize` prop can be used to change the size of the address text.

The `Address` component uses the `useLookupAddress` hook to look up the ENS name for the provided address. It also uses the `useThemeSwitcher` hook to determine the current theme (light or dark) and adjust the color of the address text accordingly.

The `blockExplorerLink` function is used to generate the URL for the block explorer link. It takes in the address and block explorer URL (or defaults to Etherscan) and returns the full URL.

The `Address` component conditionally renders the blockie image and address text based on the provided props. If the `minimized` prop is provided, only the blockie image and link to the block explorer will be displayed. If the `onChange` prop is provided, the address text will be editable and copyable. Otherwise, the address text will only be copyable.

Overall, the `Address` component provides a convenient way to display Ethereum addresses with additional functionality such as ENS name lookup and block explorer links. It can be easily integrated into other parts of the larger project that require displaying Ethereum addresses. 

Example usage:
```
<Address
  address="0x1234567890123456789012345678901234567890"
  ensProvider={mainnetProvider}
  blockExplorer="https://etherscan.io/"
  fontSize={24}
/>
```
## Questions: 
 1. What is the purpose of the `useLookupAddress` hook imported from "../hooks"?
- The `useLookupAddress` hook is used to retrieve the ENS name associated with a given Ethereum address.

2. What is the significance of the `minimized` prop?
- The `minimized` prop determines whether the component should be displayed in a minimized format, which only includes the blockie image and a link to the address on Etherscan.

3. How does the `fontSize` prop affect the size of the address text?
- The `fontSize` prop is used to set the font size of the address text, and is also used to scale the size of the blockie image.