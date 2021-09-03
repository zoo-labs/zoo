// 17_zookeeper.ts

import { Deploy } from '@zoolabs/contracts/utils/deploy'
import { Manifest, getAdminAddress } from '@openzeppelin/upgrades-core'
import ProxyAdmin from '@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol/ProxyAdmin.json'

export default Deploy('ZooKeeperV2', {
    dependencies: ['Bridge', 'Media', 'ZOO', 'Market', 'ZooKeeper'],
    proxy: { kind: 'uups' },
  },
  async ({ ethers, deploy, deployments, deps, hre, upgrades }) => {
    const ZK = await deployments.get('ZooKeeper')
    const ZK2 = await ethers.getContractFactory('ZooKeeperV2')
    const upgraded = await upgrades.upgradeProxy(ZK.address, ZK2)


    const keeper = await ethers.getContractAt('ZooKeeper', ZK.address)
    const bridge = await ethers.getContract('Bridge')
    const token = await ethers.getContract('ZOO')
    const market = await ethers.getContract('Market')
    const media = await ethers.getContract('Media')

    // Configure contracts to talk to each other
    market.configure(keeper.address, media.address)
    media.configure(keeper.address, market.address)
    keeper.configure(market.address, media.address, token.address, bridge.address)

    if (hre.network.name != 'hardhat') return

    // Mint ZOO to keeper for yield
    token.mint(keeper.address, 1000000000000)
  },
)
