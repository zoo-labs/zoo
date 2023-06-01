[View code on GitHub](zoo-labs/zoo/blob/master/sdk/src/utils/pollApi.ts)

The code in this file provides two functions for polling a URL until certain conditions are met. The first function, `pollUntilHasData`, takes in an Axios request configuration object, a data parser function, and two optional parameters for the maximum number of attempts and the current attempt count. The function will repeatedly make the request until the data parser function returns true, indicating that the desired data is available. If the maximum number of attempts is reached without success, an error is thrown. 

Here is an example of how `pollUntilHasData` could be used in a larger project:

```
const requestConfig = {
  method: 'get',
  url: 'https://example.com/data',
  headers: {
    'Authorization': 'Bearer myToken'
  }
}

function dataParser(json) {
  return json && json.data && json.data.length > 0
}

try {
  const response = await pollUntilHasData(requestConfig, dataParser)
  console.log(response)
} catch (error) {
  console.error(error)
}
```

In this example, `requestConfig` is an Axios request configuration object that specifies a GET request to an endpoint that returns JSON data. The `dataParser` function checks if the JSON data has a `data` property with a length greater than 0. The `pollUntilHasData` function is called with these parameters, and will repeatedly make the request until the `dataParser` function returns true. Once the data is available, the response is logged to the console.

The second function, `pollUntilOk`, takes in an Axios request configuration object, a validation function, and two optional parameters for the maximum number of attempts and the current attempt count. The function will repeatedly make the request until the validation function returns true, indicating that the response is valid. If the maximum number of attempts is reached without success, an error is thrown. If no validation function is provided, the function will check if the response status is 200.

Here is an example of how `pollUntilOk` could be used in a larger project:

```
const requestConfig = {
  method: 'post',
  url: 'https://example.com/submit',
  data: {
    name: 'John Doe',
    email: 'johndoe@example.com'
  }
}

try {
  await pollUntilOk(requestConfig)
  console.log('Request successful')
} catch (error) {
  console.error(error)
}
```

In this example, `requestConfig` is an Axios request configuration object that specifies a POST request to an endpoint that submits data. The `pollUntilOk` function is called with this parameter, and will repeatedly make the request until the response status is 200. Once the request is successful, a message is logged to the console.
## Questions: 
 1. What is the purpose of the `pollUntilHasData` function?
- The `pollUntilHasData` function is used to poll a URL with a 5 second interval until the step has data available.

2. What is the purpose of the `pollUntilOk` function?
- The `pollUntilOk` function is used to poll a URL with a 5 second interval until it responds with success.

3. What is the purpose of the `validate` parameter in the `pollUntilOk` function?
- The `validate` parameter is a function that checks if the request is "ok" or valid. If it is not provided, the function will check if the response status is 200.