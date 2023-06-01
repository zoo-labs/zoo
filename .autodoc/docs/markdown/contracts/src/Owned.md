[View code on GitHub](zoo-labs/zoo/blob/master/contracts/src/Owned.sol)

The code above defines a Solidity contract called `owned`. The purpose of this contract is to provide ownership functionality to other contracts in the larger project. 

The `owned` contract has a single state variable called `owner`, which is an address type. This variable is set to the address of the contract creator in the constructor function. 

The contract also has a modifier called `onlyOwner`. This modifier restricts access to certain functions to the contract owner only. The modifier checks if the caller of the function is the same as the `owner` variable. If the caller is not the owner, an error message is returned.

The `transferOwnership` function allows the current owner to transfer ownership to a new address. This function takes in a single parameter `newOwner`, which is the address of the new owner. The function is restricted to the current owner only, using the `onlyOwner` modifier. Once the function is called, the `owner` variable is updated to the new owner's address.

This contract can be used in other contracts in the `zoo` project to provide ownership functionality. For example, if a contract needs to restrict access to certain functions to the contract owner only, it can inherit from the `owned` contract and use the `onlyOwner` modifier. 

Here is an example of how the `owned` contract can be used in another contract:

```
contract Animal is owned {
    string public name;

    constructor(string memory _name) {
        name = _name;
    }

    function changeName(string memory _newName) onlyOwner public {
        name = _newName;
    }
}
```

In this example, the `Animal` contract inherits from the `owned` contract using the `is` keyword. The `changeName` function is restricted to the contract owner only using the `onlyOwner` modifier. This ensures that only the contract owner can change the name of the animal.
## Questions: 
 1. What is the purpose of the `owned` contract?
   - The `owned` contract is used to manage ownership of a contract by setting an initial owner and allowing for ownership to be transferred to a new address.

2. What version of Solidity is required for this code to compile?
   - This code requires Solidity version 0.8.4 or higher to compile.

3. What is the purpose of the `onlyOwner` modifier?
   - The `onlyOwner` modifier restricts access to a function to only the contract owner, as specified by the `require` statement.