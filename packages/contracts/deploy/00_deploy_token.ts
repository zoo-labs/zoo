// deploy/00_deploy_token.js
require('dotenv').config()

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const OWNER_ADDRESS = process.env.CONTRACT_OWNER_ADDRESS ?? "0xf8f59f0269c4f6d7b5C5ab98d70180EAa0C7507E";


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre
  const {deploy} = deployments
  const {deployer} = await getNamedAccounts()

  const useProxy = !hre.network.live

  // Proxy only in non-live network (localhost and hardhat network) enabling
  // HCR (Hot Contract Replacement) in live network, proxy is disabled and
  // constructor is invoked
  await deploy('ZooToken', {
    from: deployer,
    args: ['ZooToken', 'ZOO', 18, 2000000000, OWNER_ADDRESS],
    log: true,
    // proxy: useProxy && 'postUpgrade',
  })

  return !useProxy // When live network, record the script as executed to prevent rexecution
}

export default func
func.id = 'deploy_zoo_token'
func.tags = ['ZooToken'];

// Tenderly verification
// let verification = await tenderly.verify({
//   name: contractName,
//   address: contractAddress,
//   network: targetNetwork,
// })
