// 12_media.js

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  await deploy('Media', {
    from: deployer,
    args: ['Crypto', 'ANML'],
    log: true,
  })
}

export default func
func.id = 'media' // ID required to prevent reexecution
func.tags = ['Media']
func.dependencies = []
