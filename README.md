# ZOO
![App CI](https://github.com/zoo-labs/zoo/actions/workflows/app.yml/badge.svg)
![Contracts CI](https://github.com/zoo-labs/zoo/actions/workflows/contracts.yml/badge.svg)

> An autonomous ecosystem where ZOO owners breed, collect, and trade exotic hybrid animals via NFTs.

# 🏄‍♂️ Quick Start

Prerequisites: [Node](https://nodejs.org/dist/latest-v12.x/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

> clone/fork 🏗 ZOO:

```bash
git clone https://github.com/zoo-labs/zoo.git
```

> install and start your 👷‍ Hardhat chain:

```bash
cd zoo
yarn install
yarn chain
```

> in a second terminal window, start your 📱 frontend:

```bash
cd zoo
yarn start
```

You should now have a local blockchain, with contracts deployed, and your app running on https://localhost:3000.


## Moralis integration
Zoo builds on top of Moralis, which provides both cloud functions and a realtime
API for the React frontend.

### Plugins
Moralis servers support plugins which can listen to and respond to events on a given
contract. For Zoo, we Moralis watches the `ZooKeeper` contract for any new game
events and updates various game tables accordingly.

```shell
yarn plugins
```

### Cloud Functions
Moralis Cloud Functions are used to update cached game state when key events are
fired.

```shell
yarn functions
```

## Running Local Devchain Proxy
To connect your local blockchain to Moralis:

```shell
yarn proxy
```

This requires `frpc`, which can be installed with `brew install frpc` on macOS.
