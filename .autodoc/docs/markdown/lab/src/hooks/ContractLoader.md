[View code on GitHub](zoo-labs/zoo/blob/master/lab/src/hooks/ContractLoader.js)

The `useContractLoader` function is responsible for loading local contracts and providing options to read values from contracts or write transactions into them. This function is designed to be used in a React application and utilizes the `useEffect` and `useState` hooks from the React library. 

The function takes two parameters: `providerOrSigner` and `config`. `providerOrSigner` is an object that represents the Ethereum provider or signer that will be used to interact with the contracts. `config` is an optional object that can be used to configure the function's behavior. 

The function first checks to see if `providerOrSigner` has a signer or not. If it does, it uses the signer's provider. If not, it uses the providerOrSigner object as both the provider and signer. It then gets the network ID from the provider and uses it to determine which contracts to load. 

The function looks for two files: `contracts.json` and `external_contracts.js`. `contracts.json` contains a list of contracts that were deployed using Hardhat, while `external_contracts.js` contains a list of contracts that were deployed externally. The function combines the contracts from both files and creates a new object that maps contract names to contract instances. 

If `config.customAddresses` is defined, the function uses the custom addresses specified in the configuration object instead of the addresses specified in the contract files. 

The function returns the contracts object, which can be used to interact with the loaded contracts. 

Here is an example of how to use this function:

```
import { useContractLoader } from 'zoo';

function MyComponent() {
  const contracts = useContractLoader(providerOrSigner);

  // read a value from a contract
  const purpose = useContractReader(contracts, 'MyContract', 'purpose');

  // write a transaction to a contract
  const tx = useTransactor(contracts);
  tx(contracts.MyContract.setPurpose(newPurpose));

  // ...
}
```
## Questions: 
 1. What is the purpose of this code?
    
    This code loads local contracts and provides options to read values from contracts or write transactions into them.

2. How can I use this code?
    
    You can use this code by importing the `useContractLoader` function and passing in a provider or signer as the first argument. You can also pass in a configuration object as the second argument to customize the behavior of the function.

3. What are some of the features of this code?
    
    This code provides options to read values from contracts using a local provider and write transactions into contracts using a user provider. It also includes examples of how to use the `ContractReader.js` and `Transactor.js` hooks to interact with contracts. Additionally, the configuration object can be used to hardcode the chainId, hardhat network name, custom contract addresses, and external contracts.