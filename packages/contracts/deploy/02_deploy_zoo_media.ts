// deploy/02_deploy_zoo_media.js

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  await deploy('ZooMedia', {
    from: deployer,
    args: ['CryptoZoo', 'ANML'],
    log: true,
  })

  return hre.network.live
}

export default func
func.id = 'deploy_zoo_media' // ID required to prevent reexecution
func.tags = ['ZooMedia']
func.dependencies = []
