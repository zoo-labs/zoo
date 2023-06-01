[View code on GitHub](zoo-labs/zoo/blob/master/contracts/deploy/12_media.ts)

The `12_media.js` file is a module that exports a function that deploys a smart contract called `Media`. This smart contract is part of the larger `zoo` project and is used to manage the creation and ownership of digital assets, such as images and videos, that represent animals in the zoo.

The function uses the `Deploy` method from the `@zoolabs/contracts/utils/deploy` module to deploy the `Media` contract. The `Deploy` method takes two arguments: the name of the contract to deploy and an object that specifies any dependencies that the contract has. In this case, the `Media` contract depends on the `Market` contract.

The function also uses an `async` function to perform the deployment. The `async` function takes a single argument, an object that contains a `deploy` method. The `deploy` method is used to actually deploy the contract. The `await` keyword is used to wait for the deployment to complete before moving on to the next step.

Finally, the function calls the `deploy` method with an array of two arguments: the name of the token that represents the animal (`Animal`) and its symbol (`ANML`). This creates a new instance of the `Animal` token and associates it with the `Media` contract.

Overall, this code is responsible for deploying the `Media` contract and setting up its dependencies. It is an important part of the `zoo` project as it enables the creation and management of digital assets that represent animals in the zoo. Here is an example of how this code might be used in the larger project:

```javascript
import Media from './12_media.js'

const media = await Media()
// media is now an instance of the Media contract
```
## Questions: 
 1. What is the purpose of this code file?
   - This code file is responsible for deploying the 'Media' contract and its dependencies, including the 'Animal' contract with the symbol 'ANML'.

2. What is the '@zoolabs/contracts/utils/deploy' module used for?
   - The '@zoolabs/contracts/utils/deploy' module is used to facilitate the deployment of contracts in the zoo project.

3. What is the significance of the 'Market' dependency in the deployment of the 'Media' contract?
   - The 'Market' dependency is required for the deployment of the 'Media' contract, indicating that the 'Media' contract is likely to interact with the 'Market' contract in some way.