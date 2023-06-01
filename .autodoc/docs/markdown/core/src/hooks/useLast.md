[View code on GitHub](zoo-labs/zoo/blob/master/core/src/hooks/useLast.ts)

The code defines two custom hooks that can be used in a React project. The first hook, `useLast`, takes in a changing value of type T and an optional filter function that determines whether a given value should be considered for the last value. The hook returns the last value of type T that passes the filter function. 

The `useLast` hook uses the `useState` and `useEffect` hooks from React. The `useState` hook initializes the `last` state to `undefined` if no filter function is provided or if the initial value does not pass the filter function. If the initial value passes the filter function, it is set as the initial state. The `useEffect` hook updates the `last` state whenever the value or filter function changes. If the new value passes the filter function, it becomes the new `last` state. Otherwise, the previous `last` state is returned.

The second hook, `useLastTruthy`, is a wrapper around the `useLast` hook that uses a predefined filter function `isDefined` to return the last truthy value of type T. The `isDefined` function checks if a value is not null or undefined and returns a boolean.

These hooks can be used in a larger React project to keep track of the last value of a changing state that meets certain criteria. For example, in a form where the user is entering data, the `useLast` hook can be used to keep track of the last valid input value. The `useLastTruthy` hook can be used to keep track of the last truthy value of a changing state, such as the last selected option in a dropdown menu. 

Example usage of `useLast` hook:

```
import { useState } from 'react'
import useLast from './useLast'

function Form() {
  const [inputValue, setInputValue] = useState('')
  const lastValidInput = useLast(inputValue, (value) => value !== '' && value !== null && value !== undefined)

  function handleInputChange(event) {
    setInputValue(event.target.value)
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <p>Last valid input: {lastValidInput}</p>
    </div>
  )
}
```

Example usage of `useLastTruthy` hook:

```
import { useState } from 'react'
import useLastTruthy from './useLastTruthy'

function Dropdown() {
  const [selectedOption, setSelectedOption] = useState(null)
  const lastSelectedOption = useLastTruthy(selectedOption)

  function handleOptionSelect(event) {
    setSelectedOption(event.target.value)
  }

  return (
    <div>
      <select value={selectedOption} onChange={handleOptionSelect}>
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <p>Last selected option: {lastSelectedOption}</p>
    </div>
  )
}
```
## Questions: 
 1. What is the purpose of the `useLast` function?
- The `useLast` function returns the last value of type T that passes a filter function.

2. What is the purpose of the `useEffect` hook in the `useLast` function?
- The `useEffect` hook is used to update the `last` state variable whenever the `value` or `filterFn` dependencies change.

3. What is the purpose of the `isDefined` function?
- The `isDefined` function is a type guard that checks if a value is not null or undefined and returns a boolean value. It is used in the `useLastTruthy` function to filter out null and undefined values.