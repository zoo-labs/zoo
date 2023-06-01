[View code on GitHub](zoo-labs/zoo/blob/master/ui/src/modal/list/TokenStats.tsx)

The `TokenStats` component is a React functional component that renders a set of statistics related to a given token and its collection. It receives three props: `token`, `collection`, and `royaltyBps`. 

The `token` prop is an object that represents a token and contains information such as its attributes and last sale. The `collection` prop is an object that represents the collection to which the token belongs and contains information such as its floor price. The `royaltyBps` prop is a number that represents the royalty fee percentage that goes to the collection creator on every order.

The component renders a `Flex` container that contains two child components: a `Token` component and a `Box` component. The `Token` component is responsible for rendering the token's image and name, while the `Box` component renders a set of `Stat` components that display the statistics related to the token and its collection.

The `Stat` component is a custom component that receives an object with the following properties: `id`, `label`, `value`, `address`, `symbol`, and `asNative`. It renders a label and a value, and optionally, an icon that displays additional information when hovered over. 

The `Box` component maps an array of objects that represent the statistics to an array of `Stat` components. The array of objects contains the following statistics:

- Creator Royalties: displays the royalty fee percentage that goes to the collection creator on every order. It also displays an icon that provides additional information about the fee.
- Last Sale: displays the price of the token's last sale, its currency symbol, and an icon that indicates whether the currency is native or not.
- Collection Floor: displays the floor price of the collection to which the token belongs, its currency symbol, and an icon that indicates whether the currency is native or not.
- Highest Trait Floor: displays the floor price of the most valuable trait of the token, its currency symbol, and an icon that provides additional information about the trait.

The `TokenStats` component is used in the larger project to display the statistics related to a given token and its collection. It can be used in various parts of the project, such as the token detail page or the collection detail page. 

Example usage:

```
import TokenStats from './TokenStats'

const MyComponent = () => {
  const token = { /* token object */ }
  const collection = { /* collection object */ }
  const royaltyBps = 100

  return (
    <TokenStats
      token={token}
      collection={collection}
      royaltyBps={royaltyBps}
    />
  )
}
```
## Questions: 
 1. What is the purpose of this code?
- This code defines a React component called `TokenStats` that displays various statistics related to a token and its collection.

2. What are the props accepted by this component?
- The `TokenStats` component accepts three props: `token`, `collection`, and `royaltyBps`. `token` and `collection` are objects that contain data related to the token and its collection, respectively. `royaltyBps` is a number that represents the royalty fee percentage for the collection creator.

3. What other components or hooks are used in this code?
- This code imports several components and hooks from other files in the project, including `Flex`, `Box`, `Text`, `Token`, `Stat`, `useTokens`, `useCollections`, and `InfoTooltip`.