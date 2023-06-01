[View code on GitHub](zoo-labs/zoo/blob/master/core/src/functions/moralis/mapping.ts)

The code above contains two functions, `mapEgg` and `mapAnimal`, that are used to map data from two different objects, `egg` and `animal`, respectively. These functions are exported and can be used in other parts of the project.

The `mapEgg` function takes an `egg` object as input and returns a new object with specific properties from the `egg` object. The returned object has properties such as `tokenID`, `name`, `kind`, `type`, `animalID`, `basic`, `burned`, `hatched`, `interactive`, `owner`, `parentA`, `parentB`, `timeRemaining`, `createdAt`, `updatedAt`, and `CTAOverride`. These properties are obtained from the `egg` object using the `get` method. If the `get` method is not defined on the `egg` object, it is defined as a function that returns the value of the specified key. The `mapEgg` function is useful for mapping egg data to a format that can be used in other parts of the project.

Here is an example of how `mapEgg` can be used:

```
const egg = {
  tokenID: 123,
  name: 'Dragon Egg',
  kind: 'Fire',
  type: 'basic',
  animalID: 456,
  burn: false,
  hatched: false,
  interactive: true,
  owner: 'Alice',
  parentA: 789,
  parentB: 1011,
  timeRemaining: 3600,
  createdAt: '2022-01-01',
  updatedAt: '2022-01-02',
  CTAOverride: 'Buy Now'
}

const mappedEgg = mapEgg(egg)

console.log(mappedEgg)
// Output: 
// {
//   tokenID: 123,
//   name: 'Dragon Egg',
//   kind: 'Fire',
//   type: 'basic',
//   animalID: 456,
//   basic: true,
//   burned: false,
//   hatched: false,
//   interactive: true,
//   owner: 'Alice',
//   parentA: 789,
//   parentB: 1011,
//   timeRemaining: 3600,
//   createdAt: '2022-01-01',
//   updatedAt: '2022-01-02',
//   CTAOverride: 'Buy Now'
// }
```

The `mapAnimal` function takes an `animal` object as input and returns a new object with specific properties from the `animal` object. The returned object has properties such as `owner`, `tokenID`, `name`, `description`, `yield`, `boost`, `rarity`, `dob`, `startBid`, `currentBid`, `imageUrl`, `listed`, `bloodline`, `selected`, `bred`, `breedCount`, `kind`, `timeRemaining`, `CTAOverride`, `lastBred`, `buyNow`, `revealed`, and `freed`. These properties are obtained from the `animal` object using the `get` method. If the `get` method is not defined on the `animal` object, it is defined as a function that returns the value of the specified key. The `mapAnimal` function is useful for mapping animal data to a format that can be used in other parts of the project.

Here is an example of how `mapAnimal` can be used:

```
const animal = {
  owner: 'Bob',
  tokenID: 789,
  name: 'Fire Dragon',
  NA: 'A fierce dragon that breathes fire',
  yield: 10,
  boost: 2,
  rarity: 'Rare',
  timestamp: '2022-01-01',
  startBid: 100,
  currentBid: 150,
  tokenURI: 'https://example.com/fire-dragon',
  listed: true,
  kind: 2,
  breedCount: 0,
  timeRemaining: 3600,
  CTAOverride: 'Bid Now',
  lastBred: '2022-01-01',
  buyNow: 200,
  revealed: true,
  freed: false
}

const mappedAnimal = mapAnimal(animal)

console.log(mappedAnimal)
// Output:
// {
//   owner: 'Bob',
//   tokenID: 789,
//   name: 'Fire Dragon',
//   description: 'A fierce dragon that breathes fire',
//   yield: 10,
//   boost: 2,
//   rarity: 'Rare',
//   dob: '2022-01-01',
//   startBid: 100,
//   currentBid: 150,
//   imageUrl: 'https://example.com/fire-dragon',
//   listed: true,
//   bloodline: '',
//   selected: false,
//   bred: false,
//   breedCount: 0,
//   kind: 2,
//   timeRemaining: 3600,
//   CTAOverride: 'Bid Now',
//   lastBred: '2022-01-01',
//   buyNow: 200,
//   revealed: true,
//   freed: false
// }
```

In summary, the `mapEgg` and `mapAnimal` functions are used to map data from `egg` and `animal` objects to new objects with specific properties. These functions are useful for formatting data in a way that can be used in other parts of the project.
## Questions: 
 1. What is the purpose of the `mapEgg` function?
- The `mapEgg` function takes an `egg` object and returns a new object with specific properties and values extracted from the `egg` object.

2. What is the purpose of the `mapAnimal` function?
- The `mapAnimal` function takes an `animal` object and returns a new object with specific properties and values extracted from the `animal` object.

3. What is the significance of the `get` function used in both `mapEgg` and `mapAnimal`?
- The `get` function is used to retrieve the value of a specific key from the `egg` or `animal` object. If the key does not exist in the object, the `get` function returns `undefined`. The `if` statement checks if the `get` function exists in the object and adds it if it doesn't, allowing the function to be used on any object that doesn't have a `get` method.