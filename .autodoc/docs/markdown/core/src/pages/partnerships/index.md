[View code on GitHub](zoo-labs/zoo/blob/master/core/src/pages/partnerships/index.tsx)

The `Partnership` component is a React component that renders a section of the Zoo website related to partnerships and donations. The component imports several dependencies, including React, Next.js, Material UI, and an animation library. 

The component starts by defining a custom styled switch component using Material UI's `styled` function. The `UiSwitch` component is a switch with a custom thumb that displays the Zoo logo. 

The `Partnership` component then defines a `partnerRef` using React's `useRef` hook and a `checked` state variable using React's `useState` hook. The `useEffect` hook is used to apply a fade-in animation to the `partnerRef` element when the component mounts. 

The component then renders several sections of content related to Zoo partnerships and donations. The first section includes a heading and a paragraph of text. The second section includes two paragraphs of text. The third section includes a custom switch component, an input field, and a button. 

Overall, the `Partnership` component provides a way for users to learn about Zoo partnerships and make donations. The custom switch component adds a unique touch to the donation form. 

Example usage: 

```jsx
import Partnership from "./Partnership";

function App() {
  return (
    <div>
      <Partnership />
    </div>
  );
}
```
## Questions: 
 1. What is the purpose of the `UiSwitch` component and how is it styled?
   
   The `UiSwitch` component is a custom styled switch component from the Material UI library. It is styled using the `styled` function from Material UI and has custom styles for the switch base, thumb, and track.

2. What is the purpose of the `fadeInOnScroll` function and where is it used?
   
   The `fadeInOnScroll` function is an animation function that fades in an element when it comes into view on the screen. It is used in the `useEffect` hook to apply the animation to the `partnerRef` element.

3. What is the purpose of the `Switch` component from Material UI and how is it used in this code?
   
   The `Switch` component from Material UI is a basic switch component that can be used to toggle between two states. It is used in this code to create a switch that toggles between a one-time donation and a monthly donation. The `checked` state is controlled by the `checked` prop and the `onChange` function updates the state when the switch is toggled.