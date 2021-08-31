// 07_savage.ts

import { Deploy } from '@zoolabs/contracts/utils/deploy'

export default Deploy('Savage', ['ZOO', 'Z', 'B', 'UniswapV2Factory', 'UniswapV2Router02'], async({ ethers, hre, deploy, deployments, deps }) => {
  const { ZOO, Z, B, UniswapV2Factory, UniswapV2Router02 } = deps

  // bsc mainnet
  const isMainnet = hre.network == 'mainnet'

  // get addresses for this environment
  const a       = (isMainnet) ? '0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997' : Z.address
  const b       = (isMainnet) ? '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c' : B.address
  const c       = ZOO.address
  const factory = (isMainnet) ? '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73' : UniswapV2Factory.address
  const router  = (isMainnet) ? '0x10ED43C718714eb63d5aA57B78B54704E256024E' : UniswapV2Router02.address

  // deploy savage
  const { address } = await deploy([])  // ['SafeMath', 'TransferHelper'])
  const savage = await ethers.getContractAt('Savage', address)

  // configure
  await savage.configure(a, b, c, factory, router)
})
