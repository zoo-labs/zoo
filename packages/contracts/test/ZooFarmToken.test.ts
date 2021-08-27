import {setupTestFactory, requireDependencies} from './utils'

const {expect} = requireDependencies();
const setupTest = setupTestFactory(['ZooFarmToken'])

describe('ZooFarmToken', async () => {
    it('exists', async () => {
        const {tokens} = await setupTest()
        const token = tokens['ZooFarmToken']
        expect(token).not.to.be.null;
    })
})