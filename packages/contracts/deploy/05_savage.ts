// deploy/05_savage.ts

import { Deploy } from '@zoolabs/contracts/utils/deploy'

export default Deploy('Savage', ['B', 'Z', 'UniswapV2Factory', 'UniswapV2Router02'], async({ hre, deploy, deployments, deps }) => {
  const { B, Z, UniswapV2Factory, UniswapV2Router02 } = deps

  const isMainnet = hre.network == 'mainnet'

  const b  = isMainnet ? '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c' : B.address
  const z  = isMainnet ? '0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997' : Z.address
  const f  = isMainnet ? '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73' : UniswapV2Factory.address
  const r  = isMainnet ? '0x10ED43C718714eb63d5aA57B78B54704E256024E' : UniswapV2Router02.address
  const a  =  100000000000
  const m  =  90000000000

  await deploy([b, z, f, r, a, m])
})
