[View code on GitHub](zoo-labs/zoo/blob/master/core/src/components/Logo/index.tsx)

The `Logo` component in the `zoo` project is a React functional component that renders an image. It takes in a list of URIs as `srcs`, and sequentially tries each URI until it finds one that works. If none of the URIs work, it displays a fallback image of a triangle alert. 

The `Logo` component is used to display logos of tokens in the larger project. It is designed to handle cases where the token logo URI is incorrect or unavailable. The component uses the `Image` component from the `../Image` file to display the image. The `Image` component takes in a `src` prop, which is the URI of the image to be displayed. If the URI is incorrect or unavailable, the `onError` callback is triggered. In the `Logo` component, the `onError` callback updates the `BAD_SRCS` object with the URI that failed, and triggers a state update to re-render the component with the next URI in the list.

The `Logo` component also takes in other props such as `width`, `height`, `style`, `alt`, and `className`. These props are passed down to the `Image` component to customize the image display. The `Logo` component also uses the `cloudinaryLoader` function from the `../../functions/cloudinary` file as the `loader` prop for the `Image` component. The `cloudinaryLoader` function is responsible for loading the image from the cloudinary CDN.

Here is an example usage of the `Logo` component:

```
import Logo from "./Logo";

const tokenLogoSrcs = [
  "https://example.com/token-logo.png",
  "https://example.com/token-logo-2.png",
  "https://example.com/token-logo-3.png",
];

const MyComponent = () => {
  return (
    <div>
      <Logo srcs={tokenLogoSrcs} width={50} height={50} alt="Token Logo" />
    </div>
  );
};
```

In this example, the `Logo` component is used to display the logo of a token. The `srcs` prop is an array of URIs to try, and the `width` and `height` props set the size of the image. The `alt` prop is used to provide alternative text for the image.
## Questions: 
 1. What is the purpose of the `Logo` component?
- The `Logo` component renders an image by sequentially trying a list of URIs and eventually a fallback triangle alert.

2. What is the `BAD_SRCS` object used for?
- The `BAD_SRCS` object is used to keep track of URIs that have failed to load, so that they can be skipped in future attempts to load the image.

3. What is the `cloudinaryLoader` function used for?
- The `cloudinaryLoader` function is used as a loader for the `Image` component, which loads the image from a cloudinary URL.