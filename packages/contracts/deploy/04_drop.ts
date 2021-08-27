// deploy/04_drop.ts

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

import configureGame from '../utils/configureGame'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts, network } = hre
  const { deploy } = deployments
  // const { deployer } = await getNamedAccounts()

  const [deployer] = await ethers.getSigners()
  // const nonce = (await deployer.getTransactionCount()) + 1

  const deployResult = await deploy('Drop', {
    // nonce: nonce,
    from: deployer.address,
    args: ['Gen 0'],
    log: true,
  })

  if (network.name != 'hardhat') return

  const drop = await ethers.getContractAt('Drop', deployResult.address)
  const keeperAddress = (await deployments.get('Keeper')).address
  const keeper = await ethers.getContractAt('Keeper', keeperAddress)

  // Configure game executes a very long series of transactions which set the
  // initial state for our Gen 0 drop. Do not expect this to work during
  // Testnet or Mainnet deployment -- use the standalone `yarn deploy:drop` to
  // update Testnet or Mainnet contracts.
  await configureGame(keeper, drop)
}

export default func
func.id = 'drop'
func.tags = ['Drop']
// func.dependencies = ['Keeper']
