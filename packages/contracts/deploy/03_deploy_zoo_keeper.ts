// deploy/03_deploy_zoo_keeper.ts
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { getDeployerAddress } from '../lib/deploy_helper'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const useProxy = !hre.network.live

  console.log('hi')
  const marketAddress = (await deployments.get('ZooMarket')).address
  const mediaAddress = (await deployments.get('ZooMedia')).address
  const tokenAddress = (await deployments.get('ZooToken')).address

  const deployResult = await deploy('ZooKeeper', {
    from: deployer,
    args: [marketAddress, mediaAddress, tokenAddress],
    log: true,
  })

  return !useProxy // When live network, record the script as executed to prevent rexecution
}

export default func
func.id = 'deploy_zoo_keeper' // ID required to prevent reexecution
func.tags = ['ZooKeeper']
func.dependencies = ['ZooMedia', 'ZooMarket']
