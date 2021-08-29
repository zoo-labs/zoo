// deploy/00_token.ts

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre
  const { deploy } = deployments

  const [deployer] = await ethers.getSigners()

  await deploy('ZooTokenV2', {
    // nonce: nonce,
    from: deployer.address,
    args: [],
    log: true,
  })

  // When live network, record the script as executed to prevent rexecution
  // return !useProxy
}

export default func
func.id = 'token'
func.tags = ['ZooTokenV2']
func.dependencies = []

// Tenderly verification
// let verification = await tenderly.verify({
//   name: contractName,
//   address: contractAddress,
//   network: targetNetwork,
// })
