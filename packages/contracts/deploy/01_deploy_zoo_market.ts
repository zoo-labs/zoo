// deploy/01_deploy_zoo_market.js

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  await deploy('ZooMarket', {
    from: deployer,
    args: [],
    log: true,
  })

  return hre.network.live
}

export default func
func.id = 'deploy_zoo_market'
func.tags = ['ZooMarket']
