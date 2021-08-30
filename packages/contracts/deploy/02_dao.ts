// deploy/08_dao.ts

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre
  const { deploy } = deployments

  const [deployer] = await ethers.getSigners()

  await deploy('DAO', {
    from: deployer.address,
    args: ['GOO', 'GoveranceToken', 'DAO', 'DAO', deployer.address],
    log: true,
  })
}

export default func
func.id = 'dao'
func.tags = ['DAO']
func.dependencies = []
