[View code on GitHub](zoo-labs/zoo/blob/master/app/utils/router.ts)

The code in this file provides a set of functions that can be used to manipulate the URL query parameters in a Next.js application. The functions are designed to work with the Next.js router object, which is passed as the first argument to each function.

The `addParam` function allows you to add a new query parameter to the URL. If a parameter with the same name already exists, the new value will be added to the existing parameter. If the parameter is an array, the new value will be appended to the array. If the parameter is a string, the new value will be added to a new array with the existing value.

The `removeParam` function allows you to remove a query parameter from the URL. If the parameter has a specific value, only parameters with that value will be removed. If the parameter is an array, only the specified value will be removed from the array.

The `hasParam` function allows you to check if a parameter exists in the URL. If a value is provided, it will check if the parameter exists with that value.

The `clearAllAttributes` function is a utility function that removes all query parameters that start with the string "attributes[" and end with "]" from the URL.

These functions can be used to manipulate the URL query parameters in a Next.js application. For example, you could use the `addParam` function to add a filter to a list of items, and then use the `removeParam` function to remove the filter when the user clears the search. The `hasParam` function could be used to check if a filter is currently applied, and the `clearAllAttributes` function could be used to remove all filters at once.

Here is an example of how you could use these functions:

```javascript
import { useRouter } from 'next/router';
import { addParam, removeParam, hasParam, clearAllAttributes } from './zoo';

function MyComponent() {
  const router = useRouter();

  function handleAddFilter(filter) {
    addParam(router, 'filter', filter);
  }

  function handleClearFilter() {
    removeParam(router, 'filter');
  }

  function handleCheckFilter(filter) {
    return hasParam(router, 'filter', filter);
  }

  function handleClearAllFilters() {
    clearAllAttributes(router);
  }

  return (
    <div>
      <button onClick={() => handleAddFilter('red')}>Add Red Filter</button>
      <button onClick={() => handleAddFilter('blue')}>Add Blue Filter</button>
      <button onClick={handleClearFilter}>Clear Filter</button>
      <button onClick={() => handleCheckFilter('red')}>Check Red Filter</button>
      <button onClick={() => handleCheckFilter('blue')}>Check Blue Filter</button>
      <button onClick={handleClearAllFilters}>Clear All Filters</button>
    </div>
  );
}
```
## Questions: 
 1. What is the purpose of the `addParam` function?
   - The `addParam` function adds a parameter with a given name and value to the URL string, and handles cases where multiple parameters with the same name and different values already exist in the URL.

2. What is the purpose of the `removeParam` function?
   - The `removeParam` function removes a parameter with a given name and value from the URL string, and handles cases where multiple parameters with the same name and different values exist in the URL.

3. What is the purpose of the `clearAllAttributes` function?
   - The `clearAllAttributes` function deletes all parameters with names that start with "attributes[" and end with "]" from the URL string.