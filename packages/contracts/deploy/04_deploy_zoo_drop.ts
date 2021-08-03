// deploy/04_deploy_zoo_drop.ts

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

import configureGame from '../utils/configureGame';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const deployResult = await deploy('ZooDrop', {
    from: deployer,
    args: ['Gen 0'],
    log: true,
  })

  const dropAddress = deployResult.address;
  const keeperAddress = (await deployments.get('ZooKeeper')).address
  const keeper = await hre.ethers.getContractAt('ZooKeeper', keeperAddress);
  const drop = await hre.ethers.getContractAt('ZooDrop', dropAddress);

  // Configure game executes a very long series of transactions which set the
  // initial state for our Gen 0 drop. Do not expect this to work during
  // Testnet or Mainnet deployment -- use the standalone `yarn deploy:drop` to
  // update Testnet or Mainnet contracts.
  configureGame(keeper, drop);

  return hre.network.live;
}

export default func
func.id = 'deploy_zoo_drop'
func.tags = ['ZooDrop']
func.dependencies = ['ZooKeeper']
