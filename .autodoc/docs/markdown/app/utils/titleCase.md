[View code on GitHub](zoo-labs/zoo/blob/master/app/utils/titleCase.ts)

The `titleCase` function in the `zoo` project is designed to convert a given word to title case format. Title case is a writing style where the first letter of each word is capitalized, except for certain small words like "and", "the", and "of". This function takes a single parameter, `word`, which is the word to be converted to title case. 

The function uses a regular expression to match all words in the input string and then applies a callback function to each match. The callback function takes the matched word and returns a modified version of it in title case format. The modified version is created by capitalizing the first letter of the word using the `toUpperCase()` method and then converting the rest of the word to lowercase using the `toLowerCase()` method. 

This function can be used in a variety of ways within the larger `zoo` project. For example, it could be used to format animal names or exhibit titles in a consistent and professional manner. It could also be used to format user input in forms or search queries to ensure that the input is correctly formatted and matches the expected format. 

Here is an example of how to use the `titleCase` function:

```typescript
import titleCase from './titleCase';

const animalName = 'giraffe';
const formattedName = titleCase(animalName);
console.log(formattedName); // Output: "Giraffe"
```

In this example, the `titleCase` function is imported from the `titleCase.ts` file and used to format the `animalName` variable. The resulting `formattedName` variable is then logged to the console, which outputs "Giraffe".
## Questions: 
 1. What does the `titleCase` function do?
   - The `titleCase` function takes a string input and converts it to title case format, where the first letter of each word is capitalized and the rest are in lowercase.
2. What is the input parameter for the `titleCase` function?
   - The input parameter for the `titleCase` function is a string called `word`.
3. What regular expression is used in the `replace` method of the `titleCase` function?
   - The regular expression used in the `replace` method of the `titleCase` function is `/\w\S*/g`, which matches any word character followed by zero or more non-space characters.