[View code on GitHub](zoo-labs/zoo/blob/master/ui/src/modal/bid/TokenStatsHeader.tsx)

The `TokenStatsHeader` component is a React functional component that renders a header section for a token or collection. It imports two hooks, `useTokens` and `useCollections`, from the `hooks` module, and two components, `Box` and `Text`, from the `primitives` module. It also imports a utility function, `optimizeImage`, from the `lib` module.

The component takes two props: `token` and `collection`. `token` is an optional object that represents a token, and `collection` is a required object that represents a collection. The component uses these props to render the header section with the following elements:

- A `Text` component that displays the label "Item" if `token` is truthy, or "Collection" otherwise.
- An `Img` component that displays the image of the token or collection. The image is optimized using the `optimizeImage` function, which takes the image URL and a target width as arguments. The optimized image is set as the `src` attribute of the `Img` component.
- A `Text` component that displays the name of the token or collection. If `token` is truthy, the name of the token is displayed, or the token ID if the name is falsy. If `token` is falsy, the name of the collection is displayed.
- If `token` is truthy, a `Box` component that displays the name of the collection that the token belongs to.

The component uses the `styled` function from the `stitches.config` module to create a styled `Img` component with a responsive width and height. The `Props` type defines the shape of the props that the component expects.

The component is exported as the default export of the module, which means that it can be imported and used in other modules of the project. For example:

```jsx
import TokenStatsHeader from './TokenStatsHeader'

function App() {
  const token = { /* ... */ }
  const collection = { /* ... */ }

  return (
    <div>
      <TokenStatsHeader token={token} collection={collection} />
      {/* ... */}
    </div>
  )
}
```

In this example, the `TokenStatsHeader` component is used in the `App` component to render the header section for a token or collection. The `token` and `collection` objects are passed as props to the `TokenStatsHeader` component.
## Questions: 
 1. What are the dependencies of this file?
- This file imports `useTokens` and `useCollections` from a file located two directories up, and `React`, `FC`, and `styled` from other packages.

2. What is the purpose of the `TokenStatsHeader` component?
- The `TokenStatsHeader` component takes in a `token` and a `collection` as props and returns a styled box containing information about either the token or the collection.

3. What is the purpose of the `optimizeImage` function?
- The `optimizeImage` function takes in an image URL and a size and returns a new URL with the size appended to it, which is used to display the image in the `Img` component.