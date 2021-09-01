// 08_savage.ts

import { Deploy } from '@zoolabs/contracts/utils/deploy'

// mainnet
export default Deploy('Savage', ['ZOO'], async({ ethers, hre, deploy, deployments, deps, signers }) => {
  const { ZOO } = deps

  // bsc mainnet only
  if (hre.network == 'mainnet') throw new Error('BSC Mainnet only')

  // get addresses for this environment
  const z1      = '0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997'
  const bnb     = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
  const zoo     = ZOO.address
  const factory = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'
  const router  = '0x10ED43C718714eb63d5aA57B78B54704E256024E'

  // deploy savage
  const { address } = await deploy([])  // ['SafeMath', 'TransferHelper'])
  const savage = await ethers.getContractAt('Savage', address)

  // configure
  await savage.configure(z1, bnb, zoo, factory, router)
})

// testnet
// export default Deploy('Savage', ['Z1', 'BNB', 'ZOO', 'UniswapV2Factory', 'UniswapV2Router02'], async({ ethers, hre, deploy, deployments, deps, signers }) => {
//   const { ZOO, UniswapV2Factory, UniswapV2Router02 } = deps
//   let { Z1, BNB } = deps

//   // bsc mainnet
//   const isMainnet = hre.network == 'mainnet'

//   // get addresses for this environment
//   const z1      = (isMainnet) ? '0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997' : Z1.address
//   const bnb     = (isMainnet) ? '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c' : BNB.address
//   const zoo     = ZOO.address
//   const factory = (isMainnet) ? '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73' : UniswapV2Factory.address
//   const router  = (isMainnet) ? '0x10ED43C718714eb63d5aA57B78B54704E256024E' : UniswapV2Router02.address

//   // deploy savage
//   const { address } = await deploy([])  // ['SafeMath', 'TransferHelper'])
//   const savage = await ethers.getContractAt('Savage', address)

//   // configure
//   await savage.configure(z1, bnb, zoo, factory, router)

//   // create old LP
//   const Factory = await ethers.getContract('UniswapV2Factory')
//   const Router = await ethers.getContract('UniswapV2Router02')
//   const Savage = await ethers.getContract('Savage')
//   Z1 = await ethers.getContract('Z1')
//   BNB = await ethers.getContract('BNB')

//   console.log('Factory', Factory.address)
//   console.log('Router', Router.address)
//   console.log('Savage', Savage.address)
//   console.log('Z1', Z1.address)
//   console.log('BNB', BNB.address)

//   // const txn = await Factory.createPair(Z1.address, BNB.address);
//   // await txn.wait();

//   const pair = await Factory.getPair(Z1.address, BNB.address);
//   console.log('Pair', pair)

//   const tril = ethers.utils.parseEther('1000000000000')
//   const amountZoo = ethers.utils.parseUnits('2180913677.035819786465972231', 18)
//   const amountBNB = ethers.utils.parseUnits('2019.717141295805250967', 18)
//   const finalBNB  = ethers.utils.parseUnits('2010', 18)
//   const amountIn  = tril
//   const amountOutMin = ethers.utils.parseUnits('1990', 18)

//   const amountToSender = amountZoo.add(amountIn)

//   const signer = signers[0]

//   await BNB.mint(signer.address, amountBNB)
//   await Z1.mint(signer.address, amountToSender)

//   await BNB.approve(Router.address, amountBNB)
//   await Z1.approve(Router.address, amountZoo)

//   // Add liquidity
//   await Router.addLiquidity(
//     Z1.address,
//     BNB.address,
//     amountZoo, amountBNB,
//     100, 100,
//     signer.address,
//     2e9
//   )
// })
