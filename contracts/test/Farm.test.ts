import { setupTestFactory, requireDependencies } from './utils'

const { expect } = requireDependencies()
const setupTest = setupTestFactory(['Farm', 'ZOO', 'DAO'])

describe('Farm', async () => {
  it('exists', async () => {
    const {
      tokens: { ZooFarm: token },
    } = await setupTest()
    expect(token).not.to.be.null
  })
})
