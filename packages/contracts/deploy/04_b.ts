// 04_b.ts

import { Deploy } from '@zoolabs/contracts/utils/deploy'

export default Deploy('B', [], async({ hre, deploy, deployments, deps }) => {
  await deploy()
})
