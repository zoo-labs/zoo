[View code on GitHub](zoo-labs/zoo/blob/master/core/src/marketplace/types.ts)

This file contains various types used in the zoo project, as well as a type for Coingecko prices and a type for the highest bid. 

The `Currency`, `BigintIsh`, and `Token` types are imported from the `@zoolabs/zdk` library, while the `BigNumber` type is imported from the `ethers` library. These types are likely used throughout the project to represent different aspects of tokens and currency.

The `TokenId` type is defined as either a string or a number, and is likely used to represent the unique identifier for a token.

The `Ask` and `Bid` types are defined as objects with various properties, including an `amount` property that can be either a `BigintIsh` or a `BigNumber`, a `currency` property that is a string, and various other properties such as `offline`, `bidder`, and `recipient`. These types are likely used to represent bids and asks in the project's marketplace.

The `GraphUser`, `GraphCurrency`, `GraphMedia`, `GraphAsk`, `GraphBid`, and `GraphLazyBid` types are all used to represent different aspects of data returned from GraphQL queries. These types likely correspond to different types of data that can be queried from the project's GraphQL API.

The `CoingeckoPrices` type is defined as an object with keys that are coin IDs and values that are objects with a `usd` property. This type is likely used to represent price data from the Coingecko API.

The `HighestBid` type is defined as an object with a `bid` property that is a `GraphBid` object, a `usdAmount` property that is a number, and a `createdAtTimestamp` property that is a string. This type is likely used to represent the highest bid on a particular item in the marketplace.

Overall, this file contains various types that are used throughout the zoo project to represent different aspects of tokens, currency, bids, asks, and data returned from GraphQL queries. These types are likely used extensively throughout the project to ensure consistency and type safety.
## Questions: 
 1. What is the purpose of the `zdk` library and how is it used in this code?
- The `zdk` library is imported to provide access to the `Currency`, `BigintIsh`, and `Token` types used in the `Ask` and `Bid` types.

2. What is the difference between an `Ask` and a `Bid`?
- An `Ask` represents an offer to sell a media asset, while a `Bid` represents an offer to buy a media asset. `Bid` includes additional properties such as `bidder`, `recipient`, and `sellOnShare`.

3. What is the `GraphLazyBid` type and why is the `media` property commented out?
- `GraphLazyBid` is a type used in GraphQL responses to represent a bid without the associated media asset. The `media` property is commented out because it is not always included in the response and is not required for all use cases.