// deploy/05_savage.ts

import { Deploy } from '@zoolabs/contracts/utils/deploy'

export default Deploy('Savage', [], async({ hre, deploy, deployments, deps }) => {
  const token = deps.Savage

  const B  = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
  const Z  = '0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997'
  const PF = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'
  const PR = '0x10ED43C718714eb63d5aA57B78B54704E256024E'
  const A  =  100000000000
  const M  =  90000000000

  await deploy([B, Z, PF, PR, A, M])
})
