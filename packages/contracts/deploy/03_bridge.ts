// deploy/03_bridge.ts

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre
  const { deploy } = deployments

  const [deployer] = await ethers.getSigners()

  // const tokenAddress = (await deployments.get('ZooTokenV2')).address

  await deploy('Bridge', {
    from: deployer.address,
    args: [],
    log: true
  })
}

export default func
func.id = 'bridge'
func.tags = ['Bridge']
func.dependencies = []
