[View code on GitHub](zoo-labs/zoo/blob/master/ui/src/primitives/Collapsible.tsx)

This code defines a React component called `Collapsible` that can be used to create collapsible sections of content. The component is built using the `@radix-ui/react-collapsible` library and styled using the `@stitches/react` library.

The `Collapsible` component takes several props, including a `trigger` prop that specifies the element that will be used to trigger the collapsible content, an optional `contentProps` prop that can be used to pass additional props to the collapsible content element, an optional `open` prop that specifies whether the collapsible content should be open or closed by default, and an optional `onOpenChange` prop that is called when the collapsible content is opened or closed.

The `Collapsible` component uses the `useState` hook to manage the open/closed state of the collapsible content. It also uses the `useEffect` hook to update the open/closed state when the `open` prop changes.

The `Collapsible` component renders a `CollapsibleRoot` element that wraps the `trigger` and `CollapsibleContent` elements. The `CollapsibleRoot` element is styled to have rounded corners and hidden overflow. The `trigger` element is rendered using the `CollapsiblePrimitive.Trigger` component provided by the `@radix-ui/react-collapsible` library. The `CollapsibleContent` element is rendered using a custom `CollapsibleContent` component that is styled to have a transparent background, no border, and to animate using the `slideDown` and `slideUp` keyframes when opened or closed, respectively.

The `Collapsible` component is exported along with the `CollapsibleContent` and `CollapsibleRoot` components for use in other parts of the project.

Example usage:

```
import { Collapsible } from 'zoo'

function MyComponent() {
  return (
    <Collapsible trigger={<button>Click me</button>} open={true}>
      <p>Collapsible content goes here</p>
    </Collapsible>
  )
}
```
## Questions: 
 1. What is the purpose of the `Collapsible` component?
   - The `Collapsible` component is a custom React component that wraps the `CollapsiblePrimitive` component from the `@radix-ui/react-collapsible` library and provides additional functionality for controlling the open/closed state of the collapsible content.
2. What are the `slideDown` and `slideUp` keyframes used for?
   - The `slideDown` and `slideUp` keyframes are used to animate the height of the collapsible content when it is opened or closed, respectively.
3. What is the purpose of the `CollapsibleContent` and `CollapsibleRoot` components?
   - The `CollapsibleContent` and `CollapsibleRoot` components are styled components that customize the appearance of the `CollapsiblePrimitive.CollapsibleContent` and `CollapsiblePrimitive.Root` components, respectively. They are used to remove the default styling and apply custom styles to the collapsible content.