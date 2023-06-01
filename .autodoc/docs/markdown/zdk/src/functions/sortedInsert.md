[View code on GitHub](zoo-labs/zoo/blob/master/zdk/src/functions/sortedInsert.ts)

The `sortedInsert` function in the `zoo` project is designed to insert an item into an array of items that is already sorted according to a given comparator function. The function also ensures that the size of the array does not exceed a given maximum size by removing the last item if necessary. 

The function takes four arguments: `items`, `add`, `maxSize`, and `comparator`. `items` is the array of items that is already sorted according to `comparator`. `add` is the item that needs to be inserted into the array. `maxSize` is the maximum size of the array, and `comparator` is a function that takes two arguments and returns a number. The function should return a negative number if the first argument is less than the second, a positive number if the first argument is greater than the second, and zero if the two arguments are equal.

The function first checks that `maxSize` is greater than zero and that the length of `items` does not exceed `maxSize`. If either of these conditions is not met, the function throws an error using the `invariant` function from the `tiny-invariant` library.

If `items` is empty, the function simply adds `add` to the array and returns `null`. Otherwise, the function checks if the array is already at its maximum size and if `add` should be inserted before the last item in the array. If both of these conditions are true, the function returns `add` without modifying the array.

If the array is not at its maximum size or if `add` should be inserted before the last item, the function uses a binary search to find the correct index at which to insert `add`. The function starts by setting `lo` to 0 and `hi` to the length of `items`. It then repeatedly calculates the midpoint between `lo` and `hi` and compares the item at that index to `add` using `comparator`. If the item at the midpoint is less than or equal to `add`, the function sets `lo` to `mid + 1`. Otherwise, the function sets `hi` to `mid`. The function continues this process until `lo` is greater than or equal to `hi`. At this point, `lo` is the index at which `add` should be inserted into the array.

Finally, the function uses the `splice` method to insert `add` into the array at index `lo`. If the array was already at its maximum size, the function removes the last item from the array using the `pop` method and returns it. Otherwise, the function returns `null`.

Overall, the `sortedInsert` function is a useful utility function for maintaining a sorted array of items with a maximum size constraint. It could be used in a variety of contexts within the `zoo` project, such as maintaining a list of animals sorted by weight or a list of exhibits sorted by popularity. Here is an example usage of the function:

```
const animals = [{name: 'lion', weight: 500}, {name: 'tiger', weight: 600}, {name: 'bear', weight: 400}]
const addAnimal = {name: 'elephant', weight: 1000}
const maxSize = 4
const comparator = (a, b) => a.weight - b.weight

const removedAnimal = sortedInsert(animals, addAnimal, maxSize, comparator)
console.log(animals) // [{name: 'bear', weight: 400}, {name: 'lion', weight: 500}, {name: 'tiger', weight: 600}, {name: 'elephant', weight: 1000}]
console.log(removedAnimal) // null
```
## Questions: 
 1. What is the purpose of the `invariant` function being imported from 'tiny-invariant'?
- The `invariant` function is used to check if certain conditions are met and throw an error if they are not.

2. What is the purpose of the `sortedInsert` function?
- The `sortedInsert` function takes an array of items sorted by a given comparator, inserts a new item into its sorted index, and removes the last item if the array size exceeds a given `maxSize`.

3. What happens if the `items` array length exceeds the `maxSize` parameter?
- An error is thrown with the message 'ITEMS_SIZE', indicating that the `items` array cannot exceed the `maxSize` parameter.