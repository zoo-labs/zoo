[View code on GitHub](zoo-labs/zoo/blob/master/zdk/src/entities/Native/Movr.ts)

The code above defines a class called `Movr` that extends another class called `NativeCurrency`. The purpose of this class is to represent a native currency called "Moonriver" (abbreviated as "MOVR") on a specific blockchain network identified by its `chainId`. 

The `Movr` class has a constructor that takes in a `chainId` parameter and calls the constructor of its parent class (`NativeCurrency`) with the `chainId` parameter, a decimal precision of 18, and the currency symbol and name as "MOVR" and "Moonriver" respectively. 

The `Movr` class also has a method called `wrapped` that returns a `Token` object representing the wrapped version of the native currency on the same blockchain network. This method retrieves the wrapped token from a constant called `WNATIVE` using the `chainId` property of the `Movr` instance. If the wrapped token is not found, the `invariant` function from the `tiny-invariant` library is called with the message "WRAPPED", which will throw an error.

The `Movr` class also has a static property called `_cache`, which is an object that stores instances of the `Movr` class for each `chainId`. The `Movr` class has a static method called `onChain` that takes in a `chainId` parameter and returns the corresponding `Movr` instance from the `_cache` object if it exists, or creates a new instance and adds it to the `_cache` object if it does not exist.

Finally, the `Movr` class overrides the `equals` method of its parent class to compare whether another `Currency` object is a native currency on the same blockchain network as the `Movr` instance.

This code can be used in a larger project that involves interacting with blockchain networks and their native currencies. For example, if the project involves a decentralized exchange that supports the Moonriver network, the `Movr` class can be used to represent the native currency of that network and its wrapped version for trading purposes. The `onChain` method can be used to retrieve the `Movr` instance for a specific chain ID, and the `equals` method can be used to compare whether a given currency is the same as the native currency of the Moonriver network.
## Questions: 
 1. What is the purpose of the `Movr` class and how is it related to the `NativeCurrency` and `Token` classes?
- The `Movr` class extends the `NativeCurrency` class and represents a native currency called "Moonriver". It also has a method to retrieve the wrapped token associated with the currency.
2. What is the significance of the `_cache` property and how is it used in the `onChain` method?
- The `_cache` property is a static object that stores instances of the `Movr` class for each chain ID. The `onChain` method checks if an instance for the given chain ID already exists in the cache and returns it if it does, otherwise it creates a new instance and adds it to the cache before returning it.
3. What is the purpose of the `equals` method and how does it determine if two currencies are equal?
- The `equals` method compares the `Currency` object passed as an argument to the `Movr` instance and returns a boolean indicating whether they are equal. It checks if the other currency is also a native currency and has the same chain ID as the `Movr` instance.