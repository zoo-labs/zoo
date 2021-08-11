import { ethers } from 'hardhat'
import { ZooToken } from '../types/ZooToken'
import { ZooFaucet } from '../types/ZooFaucet'
import { expect } from 'chai'
import { BigNumber } from 'ethers'

let zooToken: any
let zooFaucet: any
let signers: any
let mintAmt = 100000000
let owner

describe('Test Faucet', () => {
  beforeEach(async () => {
    signers = await ethers.getSigners()

    const zooTokenFactory = await ethers.getContractFactory('ZooToken', signers[0])

    zooToken = (await zooTokenFactory.deploy()) as ZooToken
    await zooToken.deployed()

    const zooFaucetFactory = await ethers.getContractFactory('ZooFaucet', signers[0])

    zooFaucet = (await zooFaucetFactory.deploy(zooToken.address)) as ZooFaucet
    await zooFaucet.deployed()

    owner = signers[0]
  })

  it('Should get the Faucet owner', async () => {
    const faucetOwner: string = await zooFaucet.owner()

    expect(faucetOwner).to.equal(owner.address)
  })

  it('Should mint 100,000,000 tokens from ZooToken to ZooFaucet', async () => {
    const faucetPreBal: BigNumber = await zooToken.balanceOf(zooFaucet.address)
    await zooToken.mint(zooFaucet.address, mintAmt)
    const faucetPostBal: BigNumber = await zooToken.balanceOf(zooFaucet.address)
    expect(parseInt(faucetPreBal._hex)).to.equal(0)
    expect(parseInt(faucetPostBal._hex)).to.equal(mintAmt)
  })

  it('Should be able buy 10k ZOO from ZooFaucet', async () => {
    await zooToken.mint(zooFaucet.address, mintAmt)

    const rate = 1000

    for (var i = 0; i < signers.length; i++) {
      await zooFaucet.buyZoo(signers[i].address, 10)

      const signerBalances = await zooToken.balanceOf(signers[i].address)

      // Expect the balances to be 10K(10 * rate(1000) = 10K)
      expect(parseInt(signerBalances)).to.equal(10 * rate)
    }
  })

  it('Should be able withdraw ZOO from Faucet', async () => {
    // Creates 100 million ZOO tokens and allocates to the Faucet
    await zooToken.mint(zooFaucet.address, mintAmt)

    // The Faucet balance should be 100 million
    const faucetInitialBal = await zooToken.balanceOf(zooFaucet.address)

    // 1:1000 ratio
    const rate = 1000

    // The amount being withdrawn from the Faucet
    // 10 * rate * 20 = 200,000
    const faucetWithdrawAmt = 10 * rate * 20

    for (var i = 0; i < signers.length; i++) {
      await zooFaucet.buyZoo(signers[i].address, 10)

      // Signer balances
      const signerBalances = await zooToken.balanceOf(signers[i].address)

      // Signer balances should be 10K ZOO
      expect(parseInt(signerBalances)).to.equal(10 * rate)
    }

    // Owner Zoo balance should be 10k
    const ownerBal = await zooToken.balanceOf(owner.address)

    // Faucet balance should decreased by 200k
    const faucetBalPostBuy = await zooToken.balanceOf(zooFaucet.address)

    // Withdraw all Zoo from the Faucet to the owners wallet
    await zooFaucet.withdrawTok()

    // Faucet balance after withdrawTok should be 0
    const faucetBalPostWithdrawTok = await zooToken.balanceOf(zooFaucet.address)

    // Owner should acquire all ZOO after withdrawal
    const ownerBalPostWithdrawTok = await zooToken.balanceOf(owner.address)

    // Expect the owner balance to increase by the faucetBalPostBuy amount
    expect(parseInt(ownerBalPostWithdrawTok)).to.equal(parseInt(ownerBal) + parseInt(faucetBalPostBuy))

    // Expect the Faucet balance to be 100 million
    expect(parseInt(faucetInitialBal)).to.equal(mintAmt)

    // Expect the balance to equal 99800000
    // faucetInitialBal(100, 000, 000) - faucetWithdrawAmt(200, 000) = 99800000
    expect(parseInt(faucetBalPostBuy)).to.equal(parseInt(faucetInitialBal) - faucetWithdrawAmt)

    // Expect the Faucet balance to be 0
    expect(parseInt(faucetBalPostWithdrawTok)).to.equal(0)
  })
})
