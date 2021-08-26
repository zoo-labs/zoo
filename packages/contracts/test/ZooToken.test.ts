import { deployments, ethers, getNamedAccounts } from 'hardhat'

import { ZooToken } from '../types/ZooToken'

import chai, { expect } from 'chai'
import asPromised from 'chai-as-promised'
chai.use(asPromised)

const setupTest = deployments.createFixture(async ({ deployments, getNamedAccounts, ethers }, options) => {
  const contracts = await deployments.fixture() // ensure you start from a fresh deployments
  const signers = await ethers.getSigners()
  const token = (await ethers.getContractAt('ZooToken', contracts.ZooToken.address, signers[0]) as ZooToken)
  const owner = (await getNamedAccounts()).deployer
  return {
    owner: owner,
    token: token
  }
})

describe.only('ZooToken', function () {
  it.only('should have correct name, symbol, decimal', async function () {
    const {token} = await setupTest()
    const name = await token.name()
    const symbol = await token.symbol()
    const decimals = await token.decimals()
    expect(name.valueOf()).to.eq('Zoo')
    expect(symbol.valueOf()).to.eq('ZOO')
    expect(decimals.valueOf()).to.eq(18)
  })

  it.only('should not allow transfer when blacklisted', async function() {

  })
})
