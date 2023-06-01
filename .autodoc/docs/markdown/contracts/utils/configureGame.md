[View code on GitHub](zoo-labs/zoo/blob/master/contracts/utils/configureGame.ts)

The code in this file is responsible for configuring the game for the Gen 0 drop in the larger zoo project. The code imports three JSON files containing data on rarities, animals, and hybrids. It then exports a default async function called `configureGame` that takes two arguments: `keeper` and `drop`. 

The function first adds the drop to the ZooKeeper by calling the `addDrop` method on the `keeper` object. It then sets the name price by calling the `setNamePrice` method on the `keeper` object. Next, it configures the drop by calling the `configureKeeper` method on the `drop` object, passing in the `keeper` address. 

The function then creates an array of two egg objects and maps over it, calling the `setEgg` method on the `drop` object for each egg. It then calls the `configureEggs` method on the `drop` object, passing in the value 1. 

The function then sorts the `rarities` array by probability and maps over it, calling the `setRarity` method on the `drop` object for each rarity. It then maps over the `animals` array, calling the `setAnimal` method on the `drop` object for each animal. Finally, it maps over the `hybrids` array, calling the `setHybrid` method on the `drop` object for each hybrid. 

Overall, this code is responsible for configuring the game for the Gen 0 drop in the larger zoo project. It sets the name price, adds eggs, rarities, animals, and hybrids to the drop, and configures the drop with the ZooKeeper. 

Example usage:

```
import configureGame from './configureGame'

const keeper = ...
const drop = ...

configureGame(keeper, drop)
```
## Questions: 
 1. What is the purpose of the `configureGame` function?
- The `configureGame` function is used to configure the game for a Gen 0 drop by adding a drop to ZooKeeper, setting a name price, configuring the drop, adding eggs, rarities, animals, and hybrids.

2. What are the contents of the `rarities.json`, `animals.json`, and `hybrids.json` files?
- The `rarities.json` file contains an array of rarities with their probability, yields, and boost. The `animals.json` file contains an array of animals with their name, rarity, tokenURI, and metadataURI. The `hybrids.json` file contains an array of hybrids with their name, rarity, yields, parentA, parentB, tokenURI, and metadataURI.

3. Why are the `map` functions used for adding eggs, rarities, animals, and hybrids?
- The `map` functions are used to iterate over the arrays of eggs, rarities, animals, and hybrids and call the corresponding `setEgg`, `setRarity`, `setAnimal`, and `setHybrid` functions for each item in the array. The `async` keyword is used to ensure that each function call is awaited before moving on to the next item in the array.