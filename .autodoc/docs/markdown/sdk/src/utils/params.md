[View code on GitHub](zoo-labs/zoo/blob/master/sdk/src/utils/params.ts)

The `setParams` function is used to set URL query parameters using a typed object. It takes in two parameters: `url`, which is an instance of the URL class, and `query`, which is an object containing all the query parameters needed. 

The function first maps over the keys of the `query` object and for each key, it checks if the value is not undefined. If the value is an array, it loops over the array and appends each item to the URL search parameters using the `append` method of the `searchParams` property of the `url` object. If the value is not an array, it appends the value to the URL search parameters as a string using the `toString` method. 

The function then returns the `url` object with the appended search parameters. 

This function can be used in a larger project to easily set query parameters for URLs. For example, if a user is searching for a specific item on an e-commerce website, the search query can be passed as an object to the `setParams` function and the resulting URL with the search query parameters can be used to fetch the relevant data from the server. 

Here is an example usage of the `setParams` function:

```js
const url = new URL('https://api.example.com/tokens')
const query = {
  foo: 'bar',
  age: 50,
}
setParams(url, query)
console.log(url.href) // https://api.example.com/tokens?foo=bar&age=50
```
## Questions: 
 1. What is the purpose of this function and how is it used in the `zoo` project?
   - This function sets URL query parameters using an object and appends it to the provided URL. It is likely used to make API requests with specific query parameters in the `zoo` project.
2. What is the expected data type of the `url` parameter?
   - The `url` parameter is expected to be an instance of the built-in `URL` class in JavaScript.
3. What happens if a value in the `query` object is `undefined`?
   - If a value in the `query` object is `undefined`, it will be skipped and not included in the resulting query string.