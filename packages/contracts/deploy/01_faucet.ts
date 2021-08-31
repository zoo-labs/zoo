// 01_faucet.ts

import { Deploy } from '@zoolabs/contracts/utils/deploy'

export default Deploy('Faucet', ['ZOO'], async({ hre, deploy, deployments, deps }) => {
  const token = deps.ZOO
  await deploy([token.address])
})

// const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
//   const { deployments, ethers, network, getNamedAccounts } = hre
//   const { deploy } = deployments
//   const { deployer } = await getNamedAccounts()

//   const tokenAddress = (await deployments.get('ZOO')).address

//   const deployResult = await deploy('Faucet', {
//     from: deployer,
//     args: [tokenAddress],
//     log: true,
//   })

  // const { network } = hre
  // if (network.name != 'hardhat') return

//   // Get signers to fund
//   const signers = await ethers.getSigners()

//   // Get Token instance
//   const token = await ethers.getContractAt('ZOO', tokenAddress)

//   // Get Faucet instance
//   const faucet = await ethers.getContractAt('Faucet', deployResult.address)

//   // 100B ZOO to faucet
//   const exp = ethers.BigNumber.from('10').pow(18)
//   const faucetAmount = ethers.BigNumber.from('100000000000').mul(exp)

//   // 100M ZOO to each signer
//   const signerAmount = ethers.BigNumber.from('100000000').mul(exp)

//   // Mint new tokens
//   await token.mint(faucet.address, faucetAmount)
//   for (var i = 0; i < signers.length; i++) {
//     await token.mint(signers[i].address, signerAmount)
//   }

//   // return hre.network.live
// }

// export default func
// func.id = 'faucet'
// func.tags = ['Faucet']
// func.dependencies = ['ZOO']
