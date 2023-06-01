[View code on GitHub](zoo-labs/zoo/blob/master/ui/src/modal/TokenPrimitive.tsx)

The `TokenPrimitive` component is a React functional component that renders a token item or collection. It receives a set of props that define the item or collection to be rendered, such as `img`, `name`, `collection`, `currencyContract`, `currencyDecimals`, `currencySymbol`, `source`, `price`, `usdPrice`, `expires`, `warning`, `isOffer`, `isUnavailable`, `priceSubtitle`, `royaltiesBps`, and `quantity`. 

The component uses the `styled` function from the `stitches.config` module to create a styled `img` component. It then renders a set of `Box`, `Flex`, `Text`, `Grid`, `FormatCurrency`, and `FormatCryptoCurrency` components from the `primitives` module, which are used to structure and format the content of the token item or collection. Additionally, the component renders an `InfoTooltip` component from the `primitives` module, which displays a tooltip with information about the creator royalties.

The `TokenPrimitive` component renders the token item or collection by first rendering a `Flex` component that displays the item or collection name and price subtitle. It then renders another `Flex` component that displays the item or collection image, name, collection, quantity, and expiration date. The component also renders a `Grid` component that displays the item or collection source, price, USD price, and warning. 

The `TokenPrimitive` component is used in the larger project to display token items and collections in various parts of the application, such as in search results, user profiles, and marketplaces. For example, the component can be used to display a user's token collection in their profile page, or to display search results for a specific token item. 

Example usage:

```jsx
import TokenPrimitive from './TokenPrimitive'

const token = {
  img: 'https://example.com/token.jpg',
  name: 'Token Name',
  collection: 'Token Collection',
  currencyContract: '0x1234567890abcdef',
  currencyDecimals: 18,
  currencySymbol: 'ETH',
  source: 'https://example.com/source.png',
  price: 1.23,
  usdPrice: 100.00,
  expires: '2022-01-01',
  warning: 'This token is not for sale',
  isOffer: false,
  isUnavailable: false,
  priceSubtitle: 'Token Price',
  royaltiesBps: 100,
  quantity: 10,
}

const App = () => {
  return (
    <div>
      <TokenPrimitive {...token} />
    </div>
  )
}
```
## Questions: 
 1. What is the purpose of this code file?
- This code file defines a React functional component called `TokenPrimitive` that renders a token with various properties such as name, image, price, and source.

2. What external dependencies does this code file use?
- This code file imports several components and utilities from other files in the project, including `styled` from `stitches.config`, `Box`, `Flex`, `Text`, `Grid`, `FormatCurrency`, `FormatCryptoCurrency`, and `InfoTooltip` from `../primitives`.

3. What props can be passed to the `TokenPrimitive` component?
- The `TokenPrimitive` component accepts several optional props, including `img`, `name`, `collection`, `currencyContract`, `currencyDecimals`, `currencySymbol`, `source`, `price`, `usdPrice`, `expires`, `warning`, `isOffer`, `isUnavailable`, `priceSubtitle`, `royaltiesBps`, and `quantity`.