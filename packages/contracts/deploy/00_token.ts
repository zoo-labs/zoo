// deploy/00_token.ts

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre
  const { deploy } = deployments
  const [deployer] = await ethers.getSigners()

  // Ensure account is funded
  await hre.network.provider.send('hardhat_setBalance', [
    deployer.address,
    "0x10000000000000000000",
  ])

  await deploy('ZooTokenV2', {
    from: deployer.address,
    args: [],
    log: true,
  })
}

export default func
func.id = 'token'
func.tags = ['ZooTokenV2']
func.dependencies = []
