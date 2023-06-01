[View code on GitHub](zoo-labs/zoo/blob/master/core/src/functions/convert/index.ts)

This code exports three functions from three different files: `basisPointsToPercent`, `contenthashToUri`, and `uriToHttp`. These functions are likely used in the larger project to convert data between different formats or to manipulate data in some way. 

The `basisPointsToPercent` function is likely used to convert financial data from basis points to a percentage format. This could be useful in financial calculations or when displaying financial data to users. Here is an example of how this function might be used:

```
import { basisPointsToPercent } from 'zoo';

const basisPoints = 500;
const percent = basisPointsToPercent(basisPoints);
console.log(percent); // Output: 5%
```

The `contenthashToUri` function is likely used to convert a content hash to a URI format. This could be useful when working with content-addressable storage systems or when generating unique identifiers for content. Here is an example of how this function might be used:

```
import { contenthashToUri } from 'zoo';

const contentHash = 'QmXJ7jzJ1J7Z8wJzZzXjJZ5JzJzJzJzJzJzJzJzJzJzJzJ';
const uri = contenthashToUri(contentHash);
console.log(uri); // Output: /ipfs/QmXJ7jzJ1J7Z8wJzZzXjJZ5JzJzJzJzJzJzJzJzJzJzJzJ
```

The `uriToHttp` function is likely used to convert a URI to an HTTP URL format. This could be useful when working with web APIs or when generating links to web resources. Here is an example of how this function might be used:

```
import { uriToHttp } from 'zoo';

const uri = '/ipfs/QmXJ7jzJ1J7Z8wJzZzXjJZ5JzJzJzJzJzJzJzJzJzJzJzJ';
const httpUrl = uriToHttp(uri);
console.log(httpUrl); // Output: https://ipfs.io/ipfs/QmXJ7jzJ1J7Z8wJzZzXjJZ5JzJzJzJzJzJzJzJzJzJzJzJ
```

Overall, this code exports three useful functions that can be used in a variety of ways throughout the larger project.
## Questions: 
 1. **What is the purpose of this code file?** 
A smart developer might wonder what the overall goal of this file is and how it fits into the larger project. Based on the code, it appears to be exporting three functions from separate files.

2. **What do the exported functions do?** 
A developer might want to know more about the specific functionality of the exported functions, such as what arguments they take and what they return. Without additional context or documentation, it's unclear what these functions do.

3. **Are there any dependencies or requirements for these functions to work?** 
A developer might want to know if there are any external dependencies or requirements for these functions to work properly. For example, do they rely on other functions or modules within the zoo project, or do they require certain versions of external libraries?