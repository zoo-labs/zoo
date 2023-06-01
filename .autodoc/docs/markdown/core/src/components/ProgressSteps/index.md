[View code on GitHub](zoo-labs/zoo/blob/master/core/src/components/ProgressSteps/index.tsx)

The `ProgressCircles` component is used to create a step counter of circles based on an array of steps. The purpose of this component is to visually represent the progress of a multi-step process, such as a form or a checkout process. 

The component takes in an array of booleans called `steps`, where each boolean represents whether a step is complete or not. The circles are colored differently depending on whether they are enabled, disabled, or confirmed. The states of the circles are derived from the previous step. 

An extra circle is added to represent the ability to swap, add, or remove steps. This step will never be marked as complete because there is no "transaction done" state in the body UI. 

The component returns a div that contains a flex container with a width of 50%. Within this container, there is a loop that maps over the `steps` array and creates a div for each step. Each step div contains two child divs: one for the circle and one for the connector line. 

The circle div contains a `classNames` function that determines the color of the circle based on whether it is enabled, disabled, or confirmed. The text inside the circle is either a checkmark or the step number. 

The connector line div contains a `classNames` function that determines the color of the line based on whether the previous step is complete or not. 

The component also takes in an optional boolean prop called `disabled`, which disables all the circles and connector lines if set to true. 

Overall, the `ProgressCircles` component is a useful tool for creating a visual representation of a multi-step process. It can be used in a variety of contexts, such as a form or a checkout process, to help users keep track of their progress and understand where they are in the process. 

Example usage:

```
<ProgressCircles steps={[true, false, false, false]} />
```

This would create a progress bar with four circles, where the first circle is confirmed and the rest are disabled.
## Questions: 
 1. What is the purpose of the `ProgressCircles` component?
- The `ProgressCircles` component creates a step counter of circles based on an array of steps, where each circle can be enabled, disabled, or confirmed.

2. What is the significance of the extra circle added to the step counter?
- The extra circle represents the ability to swap, add, or remove steps, and will never be marked as complete because there is no 'txn done' state in the body UI.

3. What is the purpose of the `classNames` function imported from `../../functions`?
- The `classNames` function is used to conditionally apply CSS classes to the circle elements based on their step state and other conditions such as whether they are disabled.