[View code on GitHub](zoo-labs/zoo/blob/master/zdk/src/entities/NativeCurrency.ts)

The code above defines an abstract class called `NativeCurrency` that extends another abstract class called `AbstractCurrency`. The purpose of this class is to represent the native currency of a blockchain network. 

The `NativeCurrency` class has three properties: `isNative`, `isToken`, and `address`. The `isNative` property is a boolean that is set to `true`, indicating that this currency is the native currency of the blockchain network. The `isToken` property is also a boolean, but it is set to `false`, indicating that this currency is not a token. Finally, the `address` property is a string that is set to a default value of `0x0000000000000000000000000000000000000000`. 

This class is abstract, which means that it cannot be instantiated directly. Instead, it must be extended by another class that provides concrete implementations for its abstract methods. 

This class is likely to be used in the larger project as a base class for other currency classes that represent specific tokens or currencies on the blockchain network. For example, a `TokenCurrency` class could extend `NativeCurrency` and provide additional properties and methods specific to that token. 

Here is an example of how this class could be extended to create a `TokenCurrency` class:

```
import { NativeCurrency } from './NativeCurrency'

export class TokenCurrency extends NativeCurrency {
  public readonly isToken: true = true
  public readonly symbol: string
  public readonly name: string

  constructor(symbol: string, name: string) {
    super()
    this.symbol = symbol
    this.name = name
  }
}
```

In this example, the `TokenCurrency` class extends `NativeCurrency` and adds two additional properties: `symbol` and `name`. It also sets the `isToken` property to `true`, indicating that this currency is a token. The `constructor` method takes two arguments, `symbol` and `name`, and sets the corresponding properties. 

Overall, the `NativeCurrency` class provides a useful abstraction for representing the native currency of a blockchain network, and it can be extended to create more specific currency classes.
## Questions: 
 1. What is the purpose of the `AbstractCurrency` import?
- The `AbstractCurrency` import is used to extend the `NativeCurrency` class.

2. What does the `isNative` property do?
- The `isNative` property is a boolean that is set to `true` and represents whether the currency is native to the chain.

3. Why is the `address` property set to all zeros?
- The `address` property is set to all zeros because the native currency does not have a specific address on the chain.