// deploy/03_deploy_zoo_animals.js
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { getDeployerAddress } from '../lib/deploy_helper'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const {deployer} = await getNamedAccounts()
  const OWNER_ADDRESS = await getDeployerAddress(hre);

  const useProxy = !hre.network.live

  // Proxy only in non-live network (localhost and hardhat network) enabling
  // HCR (Hot Contract Replacement) in live network, proxy is disabled and
  // constructor is invoked
  const ZooMedia = await deployments.get('ZooMedia');

  return !useProxy // When live network, record the script as executed to prevent rexecution
}

export default func
func.id = 'deploy_zoo_animals' // ID required to prevent reexecution
func.tags = ['ZooAnimals']
