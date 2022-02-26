# ZOO

![App CI](https://github.com/zoo-labs/zoo/actions/workflows/app.yml/badge.svg)
![Contracts CI](https://github.com/zoo-labs/zoo/actions/workflows/contracts.yml/badge.svg)

> Wildlife Conservation Powered by DeFi.

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

# Zoo Subgraph

### Pre Requisites

- Docker 4.1 and up

### Local Setup

```bash
yarn chain
```

> Start Docker and Local Graph Node

- The Docker container provides PostgreSQL and IPFS
- Make sure you Docker engine is running
- The first command spins up the container
- The second command builds and starts Graph Node separately
- The Graph Node connects to PostgreSQL and IPFS
- This will take a lot of time to build the first time

```bash
yarn graphnode:start
```

> Successful Docker output
> ![](resources/success-docker.png)

> Successful Graph Node output
> ![](resources/success-graphnode.png)

> Start the Zoo Subgraph

```bash
// On a new tab
yarn subgraph:prepare-local
yarn configure
yarn subgraph:start
```

> Successful Subgraph output
> ![](resources/success-subgraph.png)

> Build the SDK and Configure

- Running configure will mint a small number of NFTs for testing

```bash
// On a new tab
yarn build:sdk
yarn configure
```

> Start the App

```bash
yarn dev
```

# TS-Node Error

If you encounter a typescript compilation error when running `yarn configure`, try running the following command and then try again.

```bash
yarn workspace @zoolabs/contracts add ts-node@10.3 --dev
```
