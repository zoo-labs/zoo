[View code on GitHub](zoo-labs/zoo/blob/master/ui/src/modal/bid/TokenStats.tsx)

The `TokenStats` component is responsible for rendering the statistics of a given token or collection. It receives three props: `token`, `collection`, and `trait`. 

The `token` prop is an object that represents a specific token, while the `collection` prop is an object that represents a collection of tokens. The `trait` prop is an object that represents a specific trait of a token. 

The component first initializes an empty array called `stats`. It then pushes two objects into the `stats` array. The first object represents the creator royalties of the collection, and the second object represents the highest offer for the token or collection. 

If the `token` prop is not null, the component pushes a third object into the `stats` array, which represents the list price of the token. If the `token` prop is null and the `collection` prop is not null, the component pushes a third object into the `stats` array, which represents the floor price of the collection. 

The `TokenStats` component returns a `Flex` component that contains a `TokenStatsHeader` component and a `Grid` component. The `TokenStatsHeader` component is responsible for rendering the header of the statistics section, while the `Grid` component is responsible for rendering the statistics themselves. 

The `Grid` component contains a `SelectedAttribute` component and a `Box` component. The `SelectedAttribute` component is responsible for rendering the selected attribute of the token, while the `Box` component is responsible for rendering the `Stat` components. 

Each `Stat` component represents a single statistic, and it receives several props, including `id`, `label`, and `value`. The `id` prop is a unique identifier for the statistic, while the `label` prop is a string or JSX element that represents the label of the statistic. The `value` prop is the value of the statistic. 

Overall, the `TokenStats` component is a reusable component that can be used to render the statistics of a token or collection in various parts of the larger project.
## Questions: 
 1. What are the required props for the `TokenStats` component?
- The `TokenStats` component requires a `collection` prop of type `NonNullable<ReturnType<typeof useCollections>['data']>[0]` and an optional `token` prop of type `NonNullable<NonNullable<ReturnType<typeof useTokens>>['data']>['0']` and an optional `trait` prop of type `Trait`.

2. What is the purpose of the `stats` array and how is it populated?
- The `stats` array is an array of objects that represent statistics to be displayed in the component. It is populated using the `push` method to add objects with `id`, `label`, and `value` properties, as well as optional `address`, `symbol`, `asWrapped`, and `asNative` properties.

3. What other components are being imported and used in this file?
- This file imports and uses several components from other files, including `Flex`, `Box`, `Grid`, `Text`, `TokenStatsHeader`, `Stat`, `InfoTooltip`, and `SelectedAttribute`. It also imports two custom hooks, `useTokens` and `useCollections`.