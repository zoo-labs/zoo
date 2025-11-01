// 14_drop.ts

import { Deploy } from '@zoolabs/contracts/utils/deploy'

import configureGame from '../utils/configureGame'

export default Deploy('Drop', {}, async ({ hre, ethers, deploy, deployments, deps }) => {
  const tx = await deploy(['Gen 0', 'some description', 'some image'])

  if (hre.network.name == 'mainnet') return

  const drop = await ethers.getContractAt('Drop', tx.address)
  const keeper = await ethers.getContract('ZooKeeper')
  // Configure game executes a very long series of transactions which set the
  // initial state for our Gen 0 drop. Do not expect this to work during
  // Testnet or Mainnet deployment -- use the standalone `yarn deploy:drop` to
  // update Testnet or Mainnet contracts.
  await configureGame(keeper, drop)
})
