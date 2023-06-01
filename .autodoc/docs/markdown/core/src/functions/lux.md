[View code on GitHub](zoo-labs/zoo/blob/master/core/src/functions/lux.ts)

This file contains several utility functions that can be used in the larger zoo project. 

The `sortData` function takes an array of data and a string indicating the type of data to sort by. It then sorts the data in descending order based on the `tokenID` property of each object in the array. This function can be used to sort data in various parts of the project.

The `wait` function takes a timeout value and returns a promise that resolves after the specified timeout. This function can be used to delay execution of code in the project.

The `waitOnHardhat` function takes a `ChainId` enum value and a timeout value. If the `ChainId` is either `HARDHAT` or `HARDHAT2`, it returns a promise that resolves after the specified timeout. Otherwise, it returns a promise that resolves with `undefined`. This function can be used to wait for a certain amount of time when running tests on the Hardhat network.

The `timer` function takes a `countDownDate` value and returns a string representing the time remaining until that date. It uses the `setInterval` function to update the time every second and returns the time in the format of "X days X hours X minutes X seconds". This function can be used to display a countdown timer in the project.

The `accountEllipsis` function takes an Ethereum account address and returns a shortened version of the address with an ellipsis in the middle. This function can be used to display account addresses in a more compact format.

The `getEmoji` function takes a string representing the rarity of an item and returns an emoji corresponding to that rarity. This function can be used to display emojis next to items in the project based on their rarity.

The `formatError` function takes an error object and returns a formatted error message. If the error object has a `data` property with a `message` property, it returns that message without the "Error: Returned error: " prefix. Otherwise, if the error object has a `code` property, it returns the error message. Otherwise, it returns the error object as a string without the prefix. This function can be used to format error messages in the project.

Overall, these utility functions can be used in various parts of the zoo project to perform common tasks such as sorting data, delaying execution, displaying countdown timers, formatting error messages, and more.
## Questions: 
 1. What is the purpose of the `sortData` function?
- The `sortData` function takes in an array of data and a string indicating the type of data to sort by, and returns the sorted array in descending order based on the `tokenID` property of each element.

2. What is the purpose of the `waitOnHardhat` function and how does it work?
- The `waitOnHardhat` function takes in a `chainId` and a `timeout` value, and returns a promise that resolves after the specified `timeout` if the `chainId` is either `ChainId.HARDHAT` or `ChainId.HARDHAT2`. Otherwise, it resolves immediately with `undefined`.

3. What is the purpose of the `getEmoji` function and how is it used?
- The `getEmoji` function takes in a string representing the rarity of an item and returns an emoji character based on the rarity level. It is likely used to display the rarity of items in a more visually appealing way.