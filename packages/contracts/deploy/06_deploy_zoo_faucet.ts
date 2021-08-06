// deploy/06_deploy_zoo_faucet.ts

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const tokenAddress = (await deployments.get('ZooToken')).address

  const deployResult = await deploy('ZooFaucet', {
      from: deployer,
      args: [tokenAddress],
      log: true,
  })

  // Get signers to fund
  const signers = await ethers.getSigners()

  // Get Token instance
  const token = await ethers.getContractAt('ZooToken', tokenAddress);

  // Get Faucet instance
  const faucet = await ethers.getContractAt('ZooFaucet', deployResult.address);

  // Amount to fund the faucet with
  const faucetAmount = BigInt(500000000 * 1e18);

  // Amount to give to each signer
  const signerAmount = BigInt(10 * 1e18);

  // Mints 100 million ZOO and allocates it to ZooFaucet
  await token.mint(faucet.address, faucetAmount);

  for (var i = 0; i < signers.length; i++) {
    // The 20 signer wallets get 10K ZOO on deployment
    await faucet.getZoo(
      signers[i].address,
      signerAmount
    );
  }

  return hre.network.live;
}

export default func
func.id = 'deploy_zoo_faucet'
func.tags = ['ZooFaucet']
// func.dependencies = ['ZooToken']
