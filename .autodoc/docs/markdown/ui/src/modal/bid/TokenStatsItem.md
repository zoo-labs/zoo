[View code on GitHub](zoo-labs/zoo/blob/master/ui/src/modal/bid/TokenStatsItem.tsx)

The `TokenStatsItem` component is a React functional component that renders a single item in a list of tokens. It takes two props: `token` and `collection`. The `token` prop is an optional object that contains information about the token being displayed, while the `collection` prop is a required object that contains information about the collection that the token belongs to.

The component uses the `optimizeImage` function from the `lib/optimizeImage` module to optimize the image that is displayed for the token. If the `token` prop is defined and contains an `image` property, that image is used. Otherwise, the `image` property of the `collection` prop is used. The `optimizeImage` function resizes the image to a maximum width of 600 pixels.

The component renders a `Box` component from the `primitives` module, which contains a `Text` component that displays the word "Item" as a subtitle. Below that, an `Img` component is rendered, which displays the optimized image for the token. If the image is not available, the `Img` component is hidden. The `Img` component is styled to have a width of 100% on small screens, and a fixed height and width of 150 pixels on larger screens.

Below the image, a `Text` component is rendered that displays the name of the token. If the `token` prop is defined and contains a `name` property, that name is used. Otherwise, the `tokenId` property of the `token` prop is used. The `Text` component is styled to have a font size of "h6" and to be ellipsified if it overflows its container.

Finally, a `Box` component is rendered that contains a `Text` component that displays the name of the collection that the token belongs to. The `Text` component is styled to have a font size of "subtitle2" and to be ellipsified if it overflows its container.

This component is likely used in a larger project that displays a list of tokens and their associated information. The `TokenStatsItem` component is responsible for rendering a single item in that list, and is likely used in a loop to render multiple items. The component is designed to be responsive, with the image and text sizes adjusting based on the screen size.
## Questions: 
 1. What are the dependencies of this file?
- This file imports `useTokens` and `useCollections` from a file located two levels up in the directory, as well as `Box` and `Text` from a file located one level up in the directory. It also imports `React` and `FC` from the `react` library, and `styled` from a file located in the `stitches.config` directory.

2. What is the purpose of the `optimizeImage` function?
- The `optimizeImage` function takes an image URL and a size parameter, and returns a new URL that points to an optimized version of the image with the specified size. This is used to ensure that images are not too large and do not slow down the rendering of the page.

3. What is the expected shape of the `Props` object?
- The `Props` object is expected to have two properties: `token`, which is an optional object that has a `token` property that is also optional, and `collection`, which is a required object. The `token` object is expected to have a `name` and `tokenId` property, and the `collection` object is expected to have a `name` property.