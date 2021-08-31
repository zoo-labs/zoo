// deploy/05_savage.ts

import { Deploy } from '@zoolabs/contracts/utils/deploy'

export default Deploy('Savage', ['Z', 'B', 'UniswapV2Factory', 'UniswapV2Router02'], async({ hre, deploy, deployments, deps }) => {
  const { Z, B, UniswapV2Factory, UniswapV2Router02 } = deps

  const isMainnet = hre.network == 'mainnet'

  const z       = isMainnet ? '0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997' : Z.address
  const b       = isMainnet ? '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c' : B.address
  const factory = isMainnet ? '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73' : UniswapV2Factory.address
  const router  = isMainnet ? '0x10ED43C718714eb63d5aA57B78B54704E256024E' : UniswapV2Router02.address

  await deploy([z, b, factory, router])
})
