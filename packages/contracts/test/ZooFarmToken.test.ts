import {setupTestFactory, requireDependencies} from './utils'

const {expect} = requireDependencies();
const setupTest = setupTestFactory(['ZooFarmToken'])

describe('ZooFarmToken', async () => {
    it('exists', async () => {
        const {tokens: {'ZooFarmToken': token}} = await setupTest()
        expect(token).not.to.be.null;
    });

    it('mints tokens by the owner', async () => {
        const {tokens: {'ZooFarmToken': token}, signers} = await setupTest()
        const toAddr = signers[0].address;
        expect(parseInt(await token.totalSupply())).to.equal(0);
        await token.mint(toAddr, 100);
        expect(parseInt(await token.totalSupply())).to.equal(100);
        expect(await token.balanceOf(toAddr)).to.equal(100);
    })

    it('mints tokens to any given address', async () => {
        const {tokens: {'ZooFarmToken': token}, signers} = await setupTest()
        const toAddr = signers[1].address;
        expect(await token.balanceOf(toAddr)).to.equal(0)
        await token.mint(toAddr, 100);
        expect(await token.balanceOf(toAddr)).to.equal(100)
    })

    it('cannot be called by someone other than the owner', async () => {
        const {tokens: {'ZooFarmToken': token}, signers} = await setupTest()
        const toAddr = signers[1].address;
        const contract = token.connect(signers[1]);
        await expect(contract.mint(toAddr, 100)).to.be.revertedWith('Ownable: caller is not the owner')
    })
})