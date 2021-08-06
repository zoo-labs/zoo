// deploy/05_deploy_zoo_auction.ts

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const deployResult = await deploy('ZooAuction', {
    from: deployer,
    args: [],
    log: true,
  })

  const tokenAddress = (await deployments.get('ZooToken')).address
  const mediaAddress = (await deployments.get('ZooMedia')).address

  const auction = await ethers.getContractAt('ZooAuction', deployResult.address);
  auction.configure(mediaAddress, tokenAddress)

  return hre.network.live;
}

export default func
func.id = 'deploy_zoo_auction'
func.tags = ['ZooAuction']
// func.dependencies = ['ZooMedia', 'ZooMarket']
