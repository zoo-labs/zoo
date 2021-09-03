// 17_zookeeper.ts

import { Deploy } from '@zoolabs/contracts/utils/deploy'
import { Manifest, getAdminAddress } from '@openzeppelin/upgrades-core'
import ProxyAdmin from '@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol/ProxyAdmin.json'

export default Deploy(
  'ZooKeeperV2',
  { proxy: true, dependencies: ['Bridge', 'Media', 'ZOO', 'Market', 'ZooKeeper_Proxy', 'ZooKeeper', 'DefaultProxyAdmin'] },
  async ({ ethers, deploy, deployments, deps, hre, upgrades }) => {
    // const tx = await deploy()
    const { deployer } = await hre.getNamedAccounts()
    const { ZooKeeper_Proxy, ZooKeeper, DefaultProxyAdmin } = deps

    const ZK2 = await ethers.getContractFactory('ZooKeeperV2')
    // const DPA = await ethers.getContractFactory('DefaultProxyAdmin')
    const adminContract = await ethers.getContractAt(DefaultProxyAdmin.abi, DefaultProxyAdmin.address)
    const adminFromContract = await adminContract.getProxyAdmin(ZooKeeper_Proxy.address)
    // const inst = await upgrades.deployProxy(ZK, [])

    const { provider } = hre.network
    const manifest = await Manifest.forNetwork(provider)
    const adminAddress = await getAdminAddress(provider, ZooKeeper_Proxy.address)

    const AdminFactory = await hre.ethers.getContractFactory(ProxyAdmin.abi, ProxyAdmin.bytecode, deployer)

    const admin = AdminFactory.attach(adminAddress)
    const manifestAdmin = await manifest.getAdmin()
    const proxyFromAddress = await manifest.getProxyFromAddress(DefaultProxyAdmin.address)

    console.log('man', proxyFromAddress, adminAddress, manifestAdmin.address, admin.address)

    // const { ZooKeeper_Proxy } = deps

    // const ZK2 = await ethers.getContractFactory('ZooKeeperV2')
    const upgraded = await upgrades.upgradeProxy(ZooKeeper_Proxy.address, ZK2, { deployer: manifestAdmin.address })

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
  },
)
