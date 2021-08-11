// deploy/00_deploy_zoo_token.js

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const useProxy = !hre.network.live

  // Proxy only in non-live network (localhost and hardhat network) enabling
  // HCR (Hot Contract Replacement) in live network, proxy is disabled and
  // constructor is invoked
  await deploy('ZooToken', {
    from: deployer,
    args: [],
    log: true,
    // proxy: useProxy && 'postUpgrade',
  })

  // When live network, record the script as executed to prevent rexecution
  return !useProxy
}

export default func
func.id = 'deploy_zoo_token' // ID required to prevent reexecution
func.tags = ['ZooToken']
func.dependencies = []

// Tenderly verification
// let verification = await tenderly.verify({
//   name: contractName,
//   address: contractAddress,
//   network: targetNetwork,
// })
