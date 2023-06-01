[View code on GitHub](zoo-labs/zoo/blob/master/core/src/state/bridge/types.ts)

This file contains a set of interfaces that define the structure of various objects used in the zoo project. 

The `Proposal` interface defines the structure of a proposal object, which includes information such as the proposal type, status, and description, as well as the votes and vote count associated with the proposal. This interface also includes information about the token being used in the proposal, such as its address, decimal value, and IPFS hash.

The `Token` interface defines the structure of a token object, which includes information such as the token's address, decimal value, name, and symbol. This interface also includes a boolean value indicating whether the token is compliant with the EIP-2612 standard, as well as a URI for the token's logo.

The `CurrentTrade` interface defines the structure of a trade object, which includes information about the tokens being traded, such as their addresses and decimal values.

The `TokenList` interface defines the structure of a token list object, which includes information about a list of tokens, such as the name of the list, the timestamp of its creation, and the version of the list. This interface also includes an array of `Token` objects, as well as optional keywords, tags, and a URI for the list's logo.

The `Version` interface defines the structure of a version object, which includes information about the major, minor, and patch versions of a software release.

The `Tags` interface defines the structure of a tags object, which includes information about a set of tags associated with a token list.

The `Balance` interface defines the structure of a balance object, which includes information about the balance of a particular token for a given user.

The `MoralisError` interface defines the structure of an error object that may be returned by the Moralis API, which is used in the zoo project. This interface includes information such as the error code, description, and any metadata associated with the error.

The `MetaError` interface defines the structure of a metadata object associated with a `MoralisError`.

Finally, the `TokenSelect` and `ChainSelect` interfaces define the structure of objects used to select tokens and chains, respectively, in the zoo project.

Overall, these interfaces provide a standardized way of defining the structure of various objects used in the zoo project, which can help to ensure consistency and interoperability across different parts of the project. For example, the `Proposal` interface can be used to define the structure of proposal objects in both the front-end and back-end components of the project, allowing for easier communication and data sharing between these components.
## Questions: 
 1. What is the purpose of the `BigNumber` import and how is it used in this code?
- The `BigNumber` import is used to represent large numbers in a precise manner. It is used in the `Proposal` interface to define the `votes` and `voteCount` properties as arrays of `BigNumber` objects.

2. What is the difference between the `Token` and `TokenList` interfaces?
- The `Token` interface defines the properties of a single token, while the `TokenList` interface defines a list of tokens along with metadata such as name, version, and keywords.

3. What is the `MoralisError` interface used for?
- The `MoralisError` interface defines the structure of an error object that can be returned by the Moralis API. It includes properties such as `statusCode`, `error`, `description`, and `meta` to provide information about the error.