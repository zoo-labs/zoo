[View code on GitHub](zoo-labs/zoo/blob/master/app/components/primitives/Collapsible.tsx)

This code defines a set of components and animations for creating collapsible content in a React application. The main component is `Collapsible`, which takes a `trigger` prop and a `contentProps` prop, and renders a collapsible section of content. When the `trigger` is clicked, the content expands or collapses with a sliding animation.

The `Collapsible` component is built using the `@radix-ui/react-collapsible` library, which provides a set of primitive components for building collapsible interfaces. The `Collapsible` component wraps these primitives and adds animation and state management.

The `Collapsible` component uses the `useState` hook to manage the `open` state of the collapsible content. When the `trigger` is clicked, the `open` state is toggled, which causes the content to expand or collapse. The `AnimatePresence` component from the `framer-motion` library is used to animate the content as it enters or exits the DOM.

The `AnimatedCollapsibleContent` component is a wrapper around the `CollapsibleContent` primitive that adds a sliding animation to the content. The `motion.div` component from `framer-motion` is used to animate the width of the content as it expands or collapses.

The `CollapsibleRoot` and `CollapsibleContent` components are styled versions of the `Root` and `Content` primitives from `@radix-ui/react-collapsible`. These styles add rounded corners and remove borders from the collapsible content.

Overall, this code provides a flexible and reusable set of components and animations for creating collapsible content in a React application. Here is an example of how the `Collapsible` component might be used:

```
import { Collapsible } from 'zoo'

function MyComponent() {
  return (
    <Collapsible trigger={<button>Click me</button>}>
      <p>Here is some collapsible content</p>
    </Collapsible>
  )
}
```
## Questions: 
 1. What is the purpose of the `Collapsible` component?
   - The `Collapsible` component is a custom implementation of a collapsible UI element that uses the `@radix-ui/react-collapsible` library and adds animation using `framer-motion`.
2. What are the `slideDown` and `slideUp` keyframes used for?
   - The `slideDown` and `slideUp` keyframes are used to animate the height of the collapsible content when it is opened and closed, respectively.
3. What is the purpose of the `AnimatedCollapsibleContent` component?
   - The `AnimatedCollapsibleContent` component is a wrapper around the `CollapsibleContent` component that adds animation using `framer-motion` when the collapsible content is opened and closed.