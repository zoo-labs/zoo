import { setupTestFactory, requireDependencies } from './utils'
import { ethers } from 'hardhat'
import { Contract, BigNumber } from 'ethers'

const { expect } = requireDependencies()

const MAX_PRICE = 1790169938495916959
const setupTest = setupTestFactory([])

const deployGToken = async () => {
  const { signers } = await setupTest()
  const GoveranceToken = await ethers.getContractFactory('GoveranceToken')
  const token = await GoveranceToken.deploy('SYM', 'someName')
  return { token, signers }
}

describe.only('GoveranceToken', function () {
  let token: Contract
  let signers: any

  beforeEach(async () => {
    const { token: _t, signers: _s } = await deployGToken()
    token = _t
    signers = _s
  })

  describe('contract', async () => {
    it('sets properties correctly', async function () {
      const name = await token.name()
      await expect(name).to.be.eql('someName')
    })

    describe('DAO', async () => {
      let dao: Contract
      beforeEach(async () => {
        const daoAddr = await token.dao()
        dao = await ethers.getContractAt('DAO', daoAddr)
      })

      it('starts a DAO', async () => {
        expect(dao).not.to.be.null
      })
    })

    describe('price', async () => {
      it('contains the current price', async () => {
        const price = await token.price()
        await expect(parseInt(price)).to.equal(MAX_PRICE)
      })

      it('increases in price every week')
    })

    describe('buy', async () => {})
  })
})
