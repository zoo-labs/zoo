import { setupTestFactory, requireDependencies } from './utils'

const { expect } = requireDependencies()
const setupTest = setupTestFactory(['ZooFarmTokenV2'])

describe('ZooFarmTokenV2', async () => {
  it('exists', async () => {
    const {
      tokens: { ZooFarmTokenV2: token },
    } = await setupTest()
    expect(token).not.to.be.null
  })
})
