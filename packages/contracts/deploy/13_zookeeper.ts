// 13_zookeeper.ts

import { Deploy } from '@zoolabs/contracts/utils/deploy'

export default Deploy('ZooKeeper', ['Bridge', 'Media', 'ZOO', 'Market'], async({ ethers, deploy, deployments, hre }) => {
  const tx = await deploy([])

  if (hre.network.name != 'hardhat') return

  const keeper = await ethers.getContractAt('ZooKeeper', tx.address)
  const bridge = await ethers.getContract('Bridge')
  const token = await ethers.getContract('ZOO')
  const market = await ethers.getContract('Market')
  const media = await ethers.getContract('Media')

  // Configure contracts to talk to each other
  market.configure(keeper.address, media.address)
  media.configure(keeper.address, market.address)
  keeper.configure(market.address, media.address, token.address, bridge.address)

  // Mint ZOO to keeper for yield
  token.mint(keeper.address, 1000000000000)
})
