// deploy/04_zookeeper.ts

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts, network } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const bridgeAddress = (await deployments.get('Bridge')).address
  const tokenAddress = (await deployments.get('ZooV2')).address
  const marketAddress = (await deployments.get('Market')).address
  const mediaAddress = (await deployments.get('Media')).address

  const deployResult = await deploy('ZooKeeper', {
    from: deployer,
    args: [],
    log: true,
  })

  if (network.name != 'hardhat') return

  const keeperAddress = deployResult.address

  const bridge = await ethers.getContractAt('Bridge', bridgeAddress)
  const token = await ethers.getContractAt('ZooV2', tokenAddress)
  const keeper = await ethers.getContractAt('ZooKeeper', keeperAddress)
  const market = await ethers.getContractAt('Market', marketAddress)
  const media = await ethers.getContractAt('Media', mediaAddress)

  // Configure contracts to talk to each other
  market.configure(keeperAddress, mediaAddress)
  media.configure(keeperAddress, marketAddress)
  keeper.configure(marketAddress, mediaAddress, tokenAddress, bridgeAddress)

  // Mint ZOO to keeper for yield
  token.mint(keeperAddress, 1000000000000)
}

export default func
func.id = 'zookeeper'
func.tags = ['ZooKeeper']
func.dependencies = ['ZooV2', 'Bridge', 'Media', 'Market']
