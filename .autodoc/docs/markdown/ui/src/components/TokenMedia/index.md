[View code on GitHub](zoo-labs/zoo/blob/master/ui/src/components/TokenMedia/index.tsx)

The `TokenMedia` component is a React functional component that renders different types of media based on the type of token passed to it. The component takes in a `token` object, which is an object that contains information about the token, such as its media type, image, and collection. The component also takes in a `preview` boolean, which determines whether the media should be displayed as a preview or not. 

The `TokenMedia` component uses the `useTokens` and `useModelViewer` hooks to retrieve data about the token and to render the 3D model viewer, respectively. The component also uses the `ThemeContext` context to retrieve the theme of the application and set the border radius of the media element. 

The `TokenMedia` component renders different types of media based on the `mediaType` of the token. If the `mediaType` is an image, the component renders an `img` element with the `src` attribute set to the `media` property of the token. If the `mediaType` is a video, the component renders a `video` element with the `src` attribute set to the `media` property of the token. If the `mediaType` is an audio file, the component renders an `audio` element with the `src` attribute set to the `media` property of the token. If the `mediaType` is a 3D model, the component renders a `model-viewer` element with the `src` attribute set to the `media` property of the token. If the `mediaType` is an HTML file, the component renders an `iframe` element with the `src` attribute set to the `media` property of the token. 

If the `mediaType` is not recognized or if there is an error loading the media, the component renders a fallback element. The fallback element can be customized by passing a `fallback` function to the component. 

The `TokenMedia` component also provides options to customize the style and behavior of the media elements. These options include `style`, `className`, `modelViewerOptions`, `videoOptions`, `audioOptions`, `iframeOptions`, `onError`, and `onRefreshToken`. 

Overall, the `TokenMedia` component is a versatile component that can render different types of media based on the type of token passed to it. It provides options to customize the style and behavior of the media elements and can be used in a larger project to display media associated with tokens. 

Example usage:

```jsx
import TokenMedia from './TokenMedia'

const token = {
  media: 'https://example.com/video.mp4',
  image: 'https://example.com/image.png',
  collection: 'example-collection',
  tokenId: 'example-token',
}

function App() {
  return (
    <div>
      <TokenMedia token={token} />
    </div>
  )
}
```
## Questions: 
 1. What is the purpose of the `extractMediaType` function?
- The `extractMediaType` function takes a token object and returns the media type of the token (e.g. mp4, mp3, png, etc.) based on the file extension of the media URL.

2. What are the different types of media that this component can render?
- The component can render images (png, jpeg, jpg, gif), videos (mp4), audio (mp3, wav), 3D models (gltf, glb), HTML, SVG, and other media types.

3. What is the purpose of the `fallback` prop?
- The `fallback` prop is a function that takes the media type of the token as an argument and returns a fallback element to render if there is an error loading the media. If no fallback function is provided, a default `TokenFallback` component is rendered.