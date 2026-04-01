# api

Indexer and API to serve [app](https://github.com/org/app) offchain features.

## packages

### [ponder](./packages/ponder)
a [Ponder](https://github.com/ponder-sh/ponder) project for indexing contracts and events

#### Indexed contracts
- [KeyValuePair](https://github.com/luxdao/contracts/blob/develop/contracts/singletons/KeyValuePairs.sol)
- [FractalRegistry](https://github.com/luxdao/contracts/blob/87b74fc69c788709bb606c59e41cf5a365506b06/contracts/FractalRegistry.sol) *(legacy)*
- [ModuleProxyFactory](https://github.com/gnosisguild/zodiac/blob/master/contracts/factory/ModuleProxyFactory.sol)

### [offchain](./packages/offchain)

API to access DAO information, proposals, comments, temperature checks, and SIWE authentication
