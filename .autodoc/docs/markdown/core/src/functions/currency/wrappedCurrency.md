[View code on GitHub](zoo-labs/zoo/blob/master/core/src/functions/currency/wrappedCurrency.ts)

The code above is a function called `unwrappedToken` that takes a `Currency` object as its argument and returns a `Currency` object. The purpose of this function is to check if the given `Currency` object is a native currency or not. If it is a native currency, the function returns the same object. If it is not a native currency, the function checks if the `chainId` property of the `Currency` object is present in the `ChainId` object and if the `Currency` object is equal to the `WNATIVE` object for that `chainId`. If both conditions are true, the function returns the `NATIVE` object for that `chainId`. If neither condition is true, the function returns the same `Currency` object that was passed as an argument.

This function is part of the larger `zoo` project and is used to handle different types of currencies in the project. It is particularly useful when dealing with wrapped tokens, which are tokens that are backed by another asset, such as Ether. Wrapped tokens are often used in decentralized finance (DeFi) applications and can be traded on various decentralized exchanges (DEXs). This function helps to identify whether a given token is a wrapped token or not and returns the underlying asset if it is.

Here is an example of how this function can be used in the larger `zoo` project:

```javascript
import { Currency } from '@zoolabs/zdk'
import { unwrappedToken } from 'zoo'

const wrappedToken = new Currency('0x123', 'Wrapped Token', 18)
const nativeToken = new Currency('0x456', 'Native Token', 18)

const unwrappedWrappedToken = unwrappedToken(wrappedToken)
const unwrappedNativeToken = unwrappedToken(nativeToken)

console.log(unwrappedWrappedToken) // returns the same wrappedToken object
console.log(unwrappedNativeToken) // returns the same nativeToken object
``` 

In this example, we create two `Currency` objects, one for a wrapped token and one for a native token. We then pass each of these objects to the `unwrappedToken` function and log the results to the console. Since the wrapped token is not a native currency, the function returns the same `wrappedToken` object. Since the native token is a native currency, the function also returns the same `nativeToken` object.
## Questions: 
 1. What is the purpose of the `unwrappedToken` function?
- The `unwrappedToken` function takes a `Currency` object as input and returns either the same object or a different `Currency` object depending on certain conditions.

2. What is the significance of the `isNative` property of the `Currency` object?
- The `isNative` property of the `Currency` object is used to determine whether the input `Currency` object is the native currency of its blockchain.

3. What is the purpose of the commented out code block?
- The commented out code block appears to be related to a specific use case involving a particular `Currency` object (`WETH9_EXTENDED`) and a formatted chain ID. However, without more context it is unclear what the purpose of this code block is or why it is commented out.