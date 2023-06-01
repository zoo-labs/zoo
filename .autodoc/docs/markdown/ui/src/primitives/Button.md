[View code on GitHub](zoo-labs/zoo/blob/master/ui/src/primitives/Button.tsx)

The code defines a styled button component using the Stitches CSS-in-JS library. The component can be customized using variants for color, corners, and size. The `color` variant can be set to `primary`, `secondary`, or `ghost`, with corresponding styles for each. The `corners` variant can be set to `rounded`, `pill`, or `circle`, with corresponding border radius styles. The `size` variant can be set to `none`, `xs`, `small`, `medium`, or `large`, with corresponding padding, line-height, and min-height styles.

The `compoundVariants` array defines additional styles for the button when certain combinations of variants are used. For example, when the `size` variant is set to `xs` and the `corners` variant is set to `circle`, the button will have a height and width of 40px and no padding.

The `defaultVariants` object sets the default values for the `color`, `corners`, and `size` variants.

This button component can be used throughout the larger project to provide a consistent look and feel for buttons. Developers can easily customize the button by passing in different variant values. For example, to create a large, secondary button with pill corners, the following code could be used:

```
<Button color="secondary" corners="pill" size="large">Click me</Button>
```
## Questions: 
 1. What is the purpose of the `styled` function and where does it come from?
- The `styled` function is used to create a styled component and it comes from the `stitches.config` module.
2. What are the available variants for the `Button` component and what styles do they apply?
- The available variants for the `Button` component are `color`, `corners`, and `size`. They apply different styles to the background color, text color, border radius, padding, and height/width of the button.
3. What is the purpose of the `compoundVariants` property and how is it used in this code?
- The `compoundVariants` property is used to create compound variants that combine multiple variants together. In this code, it is used to create circular buttons with different sizes by combining the `size` and `corners` variants.