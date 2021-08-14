// deploy/04_deploy_zoo_drop.ts

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

import configureGame from '../utils/configureGame'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts, network } = hre
  const { deploy } = deployments
  // const { deployer } = await getNamedAccounts()

  const [deployer] = await ethers.getSigners()
  // const nonce = (await deployer.getTransactionCount()) + 1

  const deployResult = await deploy('ZooDrop', {
    // nonce: nonce,
    from: deployer.address,
    args: ['Gen 0'],
    log: true,
  })

  if (network.name != 'hardhat') return

  const drop = await ethers.getContractAt('ZooDrop', deployResult.address)
  const keeperAddress = (await deployments.get('ZooKeeper')).address
  const keeper = await ethers.getContractAt('ZooKeeper', keeperAddress)

  // Configure game executes a very long series of transactions which set the
  // initial state for our Gen 0 drop. Do not expect this to work during
  // Testnet or Mainnet deployment -- use the standalone `yarn deploy:drop` to
  // update Testnet or Mainnet contracts.
  await configureGame(keeper, drop)
}

export default func
func.id = 'drop'
func.tags = ['ZooDrop']
// func.dependencies = ['ZooKeeper']
