import { setupTestFactory, requireDependencies } from './utils'

const { expect } = requireDependencies()
const setupTest = setupTestFactory(['Farm'])

describe('Farm', async () => {
  xit('exists', async () => {
    const {
      tokens: { ZooFarm: token },
    } = await setupTest()
    expect(token).not.to.be.null
  })
})
