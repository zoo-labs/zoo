[View code on GitHub](zoo-labs/zoo/blob/master/core/src/functions/zoo.ts)

The code provided in this file contains several utility functions that can be used in the larger project. 

The `sortData` function takes an array of data and a string `byType` as input parameters. It sorts the data in descending order based on the `tokenID` property of each element in the array. The sorted array is then returned as output. Here is an example of how to use this function:

```
const data = [
  { tokenID: 3, name: 'A' },
  { tokenID: 1, name: 'B' },
  { tokenID: 2, name: 'C' }
]

const sortedData = sortData(data, 'tokenID')
console.log(sortedData)
// Output: [{ tokenID: 3, name: 'A' }, { tokenID: 2, name: 'C' }, { tokenID: 1, name: 'B' }]
```

The `wait` function takes a `timeout` value in milliseconds as input parameter. It returns a Promise that resolves after the specified timeout. This function can be used to introduce a delay in the execution of other code. Here is an example of how to use this function:

```
async function doSomething() {
  console.log('Start')
  await wait(2000)
  console.log('End')
}

doSomething()
// Output: Start
//         (2 second delay)
//         End
```

The `waitOnHardhat` function takes a `chainId` value and a `timeout` value in milliseconds as input parameters. If the `chainId` is either `ChainId.HARDHAT` or `ChainId.HARDHAT2`, it returns a Promise that resolves after the specified timeout. Otherwise, it returns a Promise that resolves immediately with `undefined`. This function can be used to introduce a delay in the execution of code that is specific to the Hardhat blockchain. Here is an example of how to use this function:

```
async function doSomething(chainId) {
  console.log('Start')
  await waitOnHardhat(chainId, 2000)
  console.log('End')
}

doSomething(ChainId.HARDHAT)
// Output: Start
//         (2 second delay)
//         End

doSomething(ChainId.MAINNET)
// Output: Start
//         End
```

The `timer` function takes a `countDownDate` value as input parameter. It calculates the time remaining between the current date and the `countDownDate` in days, hours, minutes, and seconds. It returns a string that represents the remaining time in the format "Xd Xh Xm Xs". If the `countDownDate` has already passed, it returns the string "EXPIRED". This function can be used to display a countdown timer on a webpage. Here is an example of how to use this function:

```
const countDownDate = new Date('Jan 1, 2022 00:00:00').getTime()
const remainingTime = timer(countDownDate)
console.log(remainingTime)
// Output: (time remaining until Jan 1, 2022)
```

The `accountEllipsis` function takes an Ethereum account address as input parameter. It returns a string that represents the account address with an ellipsis in the middle. This function can be used to display a shortened version of an Ethereum account address. Here is an example of how to use this function:

```
const account = '0x1234567890123456789012345678901234567890'
const shortenedAccount = accountEllipsis(account)
console.log(shortenedAccount)
// Output: 0x1234...7890
```

The `getEmoji` function takes a string `rarity` as input parameter. It returns an emoji that represents the rarity level. This function can be used to display an emoji that corresponds to the rarity level of an item. Here is an example of how to use this function:

```
const rarity = 'Rare'
const emoji = getEmoji(rarity)
console.log(emoji)
// Output: 🔥
```

The `getAge` function takes a number `stage` as input parameter. It returns a string that represents the age stage. This function can be used to display the age stage of an item. Here is an example of how to use this function:

```
const stage = 1
const age = getAge(stage)
console.log(age)
// Output: TEENAGE
```
## Questions: 
 1. What is the purpose of the `sortData` function?
- The `sortData` function sorts an array of data by the `tokenID` property in descending order.

2. What is the purpose of the `waitOnHardhat` function?
- The `waitOnHardhat` function waits for a specified amount of time if the `chainId` parameter is either `ChainId.HARDHAT` or `ChainId.HARDHAT2`, and resolves immediately otherwise.

3. What is the purpose of the `getEmoji` function?
- The `getEmoji` function returns an emoji based on the `rarity` parameter, with different emojis for different rarities such as 'Common', 'Uncommon', 'Rare', etc.