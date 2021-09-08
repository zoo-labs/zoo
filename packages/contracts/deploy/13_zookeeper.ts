// 13_zookeeper.ts

import { Deploy } from '@zoolabs/contracts/utils/deploy'

export default Deploy('ZooKeeper', {
    dependencies: ['Bridge', 'Media', 'ZOO', 'Market'],
    proxy: { kind: 'uups' },
  },
  async ({ ethers, deploy, deployments, deps, hre }) => {
    const tx = await deploy()

    if (hre.network.name != 'hardhat') return

    const keeper = await ethers.getContractAt('ZooKeeper', tx.address)
    const bridge = await ethers.getContract('Bridge')
    const token = await ethers.getContract('ZOO')
    const market = await ethers.getContract('Market')
    const media = await ethers.getContract('Media')

    // Configure contracts to talk to each other
    await market.configure(keeper.address, media.address)
    await media.configure(keeper.address, market.address)
    await keeper.configure(market.address, media.address, token.address, bridge.address, false)

    // Mint ZOO to keeper for yield
    await token.mint(keeper.address, 1000000000000)
  },
)
