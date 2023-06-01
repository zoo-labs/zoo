[View code on GitHub](zoo-labs/zoo/blob/master/core/src/functions/feature.ts)

This code defines a set of features and their availability on different blockchain networks. The `Feature` enum lists the available features, including AMM, liquidity mining, BentoBox, Kashi, MISO, analytics, migrate, and staking. The `globalFeatures` array lists the features that are globally available, but are not tied to any specific blockchain network.

The `features` object is a mapping of `ChainId` to an array of `Feature`s that are available on that network. `ChainId` is an enum that lists the supported blockchain networks, including MAINNET, HARDHAT, ROPSTEN, RINKEBY, GÖRLI, KOVAN, BSC, BSC_TESTNET, FANTOM, FANTOM_TESTNET, MATIC, MATIC_TESTNET, HARMONY, HARMONY_TESTNET, AVALANCHE, AVALANCHE_TESTNET, OKEX, OKEX_TESTNET, XDAI, MOONRIVER, and ARBITRUM.

The `featureEnabled` function takes a `Feature` and a `ChainId` as input and returns a boolean indicating whether the feature is available on that network. It checks if the `features` object has an array of features for the given `ChainId`, and if so, whether that array includes the given `Feature`. It also checks if the `globalFeatures` array includes the given `Feature`.

The `chainsWithFeature` function takes a `Feature` as input and returns an array of `ChainId`s that support that feature. It filters the keys of the `features` object to only include those that have the given `Feature` in their array of features, and then maps those keys to their corresponding `ChainId`.

This code is likely used in the larger project to determine which features are available on which blockchain networks, and to enable or disable certain functionality based on those features. For example, a UI component might display different options depending on which features are available on the user's selected network.
## Questions: 
 1. What is the purpose of the `globalFeatures` array?
   - The `globalFeatures` array contains a list of features that are enabled globally across all chains.
2. What is the purpose of the `featureEnabled` function?
   - The `featureEnabled` function takes in a `Feature` and a `ChainId` as arguments and returns a boolean indicating whether the feature is enabled on the specified chain and globally.
3. What is the purpose of the `chainsWithFeature` function?
   - The `chainsWithFeature` function takes in a `Feature` as an argument and returns an array of `ChainId`s that have the specified feature enabled.