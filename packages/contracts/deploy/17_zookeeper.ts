// 17_zookeeper.ts

import { Deploy } from '@zoolabs/contracts/utils/deploy'

export default Deploy('ZooKeeperV2', {proxy: true, dependencies: ['Bridge', 'Media', 'ZOO', 'Market', 'ZooKeeper_Proxy']}, async({ ethers, deploy, deployments, deps, hre, upgrades }) => {
  // const tx = await deploy()
  const { ZooKeeper_Proxy } = deps

  const ZK2 = await ethers.getContractFactory('ZooKeeperV2')
  // const inst = await upgrades.deployProxy(ZK, [])

  // const { ZooKeeper_Proxy } = deps

  // const ZK2 = await ethers.getContractFactory('ZooKeeperV2')
  const upgraded = await upgrades.upgradeProxy(ZooKeeper_Proxy.address, ZK2)

//   console.log('ZooKeeper_Proxy.address', ZooKeeper_Proxy.address)
//   const upgraded = await upgrades.upgradeProxy(ZooKeeper_Proxy.address, tx.address)

  // if (hre.network.name != 'hardhat') return

  // const keeper = await ethers.getContractAt('ZooKeeper', tx.address)
  // const bridge = await ethers.getContract('Bridge')
  // const token = await ethers.getContract('ZOO')
  // const market = await ethers.getContract('Market')
  // const media = await ethers.getContract('Media')

  // Configure contracts to talk to each other
  // market.configure(keeper.address, media.address)
  // media.configure(keeper.address, market.address)
  // keeper.configure(market.address, media.address, token.address, bridge.address)

  // Mint ZOO to keeper for yield
  // token.mint(keeper.address, 1000000000000)
})
