// deploy/00_deploy_token.js

import {getDeployerAddress, getWallet} from '../lib/deploy_helper'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { Contract } from 'ethers'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts, getUnnamedAccounts} = hre
  const {deploy} = deployments
  const {deployer} = await getNamedAccounts()
  const unnamed = await getUnnamedAccounts();

  const useProxy = !hre.network.live

  const OWNER_ADDRESS = await getDeployerAddress(hre);
  const ownerWallet = await getWallet(hre);

  // Proxy only in non-live network (localhost and hardhat network) enabling
  // HCR (Hot Contract Replacement) in live network, proxy is disabled and
  // constructor is invoked
  const result = await deploy('ZooToken', {
    from: deployer,
    args: ['ZooToken', 'ZOO', 18, 2000000000, deployer],
    log: true,
    // proxy: useProxy && 'postUpgrade',
  })

  // const c = new hre.ethers.Contract(result.address, result.abi, ownerWallet);
  // await c.transferOwnership(OWNER_ADDRESS);

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
