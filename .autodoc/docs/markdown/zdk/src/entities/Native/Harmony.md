[View code on GitHub](zoo-labs/zoo/blob/master/zdk/src/entities/Native/Harmony.ts)

The code above defines a class called `Harmony` that extends another class called `NativeCurrency`. The purpose of this class is to represent the native currency of the Harmony blockchain, which is called "ONE". 

The `Harmony` class has a constructor that takes in a `chainId` parameter and calls the constructor of its parent class (`NativeCurrency`) with the `chainId`, a decimal precision of 18, the symbol "ONE", and the name "Harmony". The `chainId` parameter is used to retrieve the wrapped version of the native currency, which is represented by a `Token` object. The `wrapped` method returns this `Token` object after checking that it exists in the `WNATIVE` constant object. If it does not exist, an error is thrown using the `invariant` function from the `tiny-invariant` library.

The `Harmony` class also has a static method called `onChain` that takes in a `chainId` parameter and returns a `Harmony` object for that specific `chainId`. This method uses a cache object called `_cache` to store previously created `Harmony` objects for each `chainId`. If a `Harmony` object for the given `chainId` already exists in the cache, it is returned. Otherwise, a new `Harmony` object is created and stored in the cache before being returned.

Finally, the `Harmony` class has an `equals` method that takes in another `Currency` object and returns a boolean indicating whether the two objects are equal. In this case, the method checks if the other `Currency` object is also a native currency and has the same `chainId` as the `Harmony` object.

This code can be used in the larger project to represent and manipulate the native currency of the Harmony blockchain. For example, it can be used to retrieve the wrapped version of the native currency for a specific chain ID, or to check if a given `Currency` object is equal to the native currency of the Harmony blockchain.
## Questions: 
 1. What is the purpose of the `Harmony` class and how is it related to the `NativeCurrency` and `Token` classes?
- The `Harmony` class extends the `NativeCurrency` class and represents the native currency of the Harmony blockchain. It also has a `wrapped` method that returns a `Token` object representing the wrapped version of the native currency.
2. What is the significance of the `invariant` function being imported and used in the `wrapped` method?
- The `invariant` function is used to ensure that the `wnative` variable is not null or undefined. If it is, the function will throw an error with the message 'WRAPPED'.
3. What is the purpose of the `_cache` property and how is it used in the `onChain` method?
- The `_cache` property is an object that stores instances of the `Harmony` class for each chain ID. The `onChain` method checks if an instance for the given chain ID already exists in the cache, and if not, creates a new instance and adds it to the cache before returning it. This helps to avoid creating multiple instances of the same object and improves performance.