// 09_dao.ts

import { Deploy } from '@zoolabs/contracts/utils/deploy'

export default Deploy('DAO', {}, async({ ethers, getChainId, deploy, deps }) => {
  const [deployer] = await ethers.getSigners()
  const tx = await deploy(['GOO', 'GoveranceToken', 'DAO', 'DAO', deployer.address])
})
