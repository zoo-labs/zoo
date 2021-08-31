// deploy/06_savage.ts

import { Deploy } from '@zoolabs/contracts/utils/deploy'

export default Deploy('Savage', ['WETH', 'Z', 'B', 'UniswapV2Factory', 'UniswapV2Router02'], async({ ethers, hre, deploy, deployments, deps }) => {
  const { WETH, Z, B, UniswapV2Factory, UniswapV2Router02 } = deps

  const isMainnet = hre.network == 'mainnet'
  const isTestnet = hre.network == 'testnet'

  const z       = isMainnet ? '0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997' : Z.address
  const b       = isMainnet ? '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c' : B.address
  const c       = isMainnet ? '0x0000000000000000000000000000000000000000' : WETH.address
  const factory = (isTestnet || isMainnet) ? '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73' : UniswapV2Factory.address
  const router  = (isTestnet || isMainnet) ? '0x10ED43C718714eb63d5aA57B78B54704E256024E' : UniswapV2Router02.address

  const res = await deploy()

  const savage = await ethers.getContractAt('Savage', res.address)
  await savage.configure(z, b, c, factory, router)
})
