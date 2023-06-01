[View code on GitHub](zoo-labs/zoo/blob/master/core/src/components/Input/Percent/index.tsx)

The `Input` component in this file is a reusable React component that renders an HTML input element. It takes in several props, including `value`, `onUserInput`, `placeholder`, `className`, `align`, and `fontSize`. The `value` prop is the current value of the input, while `onUserInput` is a callback function that is called whenever the user types into the input. The `placeholder` prop is the text that is displayed in the input when it is empty, while `className` and `fontSize` are used to style the input.

The `Input` component enforces several constraints on the user's input. It only allows numeric input, and it limits the length of the input to 3 characters. Additionally, it replaces any commas in the input with periods, since the input is used in a financial context where periods are used as decimal separators. Finally, it only allows input values that are less than or equal to 100.

The `Input` component is memoized using React's `React.memo` function, which means that it will only re-render if its props have changed. This can help improve performance in cases where the component is used frequently and its props are not changing often.

The `Input` component is exported as both a named export (`Input`) and a default export. The named export is used to import the component into other files, while the default export is used to import the component into files that are not TypeScript-aware.

Here is an example of how the `Input` component might be used in a larger project:

```jsx
import React, { useState } from "react";
import Input from "./path/to/Input";

function MyComponent() {
  const [value, setValue] = useState("");

  const handleUserInput = (input) => {
    setValue(input);
  };

  return (
    <div>
      <Input
        value={value}
        onUserInput={handleUserInput}
        placeholder="Enter a value"
        className="my-input"
        align="right"
        fontSize="16px"
      />
    </div>
  );
}
```

In this example, the `MyComponent` function renders an instance of the `Input` component. It passes in a `value` state variable and a `handleUserInput` callback function as props to the `Input` component. Whenever the user types into the input, the `handleUserInput` function is called with the new input value, and the `value` state variable is updated accordingly. The `placeholder`, `className`, `align`, and `fontSize` props are also passed in to customize the appearance of the input.
## Questions: 
 1. What is the purpose of the `enforcer` function?
- The `enforcer` function checks if the input value is valid and within a certain range, and if so, calls the `onUserInput` function with the input value.

2. What is the significance of the `inputRegex` variable?
- The `inputRegex` variable is a regular expression that matches any string that contains only digits (0-9) and escaped "." characters.

3. What is the purpose of the `align` prop?
- The `align` prop is used to specify the alignment of the text within the input field, and can be set to either "right" or "left".