// deploy/06_deploy_zoo_faucet.ts

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, network, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const tokenAddress = (await deployments.get('ZooToken')).address

  const deployResult = await deploy('ZooFaucet', {
    from: deployer,
    args: [tokenAddress],
    log: true,
  })

  if (network.name != 'hardhat') return

  // Get signers to fund
  const signers = await ethers.getSigners()

  // Get Token instance
  const token = await ethers.getContractAt('ZooToken', tokenAddress)

  // Get Faucet instance
  const faucet = await ethers.getContractAt('ZooFaucet', deployResult.address)

  // 100B ZOO to faucet
  const exp = ethers.BigNumber.from('10').pow(18)
  const faucetAmount = ethers.BigNumber.from('100000000000').mul(exp)

  // 100M ZOO to each signer
  const signerAmount = ethers.BigNumber.from('100000000').mul(exp)

  // Mint new tokens
  await token.mint(faucet.address, faucetAmount)
  for (var i = 0; i < signers.length; i++) {
    await token.mint(signers[i].address, signerAmount)
  }

  // return hre.network.live
}

export default func
func.id = 'faucet'
func.tags = ['ZooFaucet']
// func.dependencies = ['ZooToken']
