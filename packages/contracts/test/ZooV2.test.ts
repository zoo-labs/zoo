import { setupTestFactory, requireDependencies } from './utils'
import { Signer } from '@ethersproject/abstract-signer'
import { ZooV2 } from '../types'

const { expect } = requireDependencies()

const setupTest = setupTestFactory(['ZooV2'])

describe.only('ZooV2', function () {
  let token: ZooV2
  let signers: Signer[]

  beforeEach(async () => {
    const test = await setupTest()
    token = test.tokens.ZooV2 as ZooV2
    signers = test.signers
  })

  it('should have correct name, symbol, decimal', async function () {
    const name = await token.name()
    const symbol = await token.symbol()
    const decimals = await token.decimals()
    expect(name.valueOf()).to.eq('Zoo')
    expect(symbol.valueOf()).to.eq('ZOO')
    expect(decimals.valueOf()).to.eq(18)
  })

  it('should add user to blacklist', async function () {
    const {
      signers,
      tokens: { ZooV2 },
    } = await setupTest()
    const token = ZooV2

    const address = signers[1].address
    const address2 = signers[2].address

    // Add user to blacklist
    await token.blacklistAddress(address)
    expect(await token.isBlacklisted(address))

    // Only blacklist users should be blacklisted
    expect(await token.isBlacklisted(address2)).to.be.false
  })

  it('allows transfer for eligable accounts', async function () {
    const {
      signers,
      tokens: { ZooV2 },
    } = await setupTest()
    const token = ZooV2

    const address = signers[1].address
    const address2 = signers[2].address
    const address3 = signers[3].address

    await token.mint(address, 1000)
    await token.mint(address2, 1000)
    await token.mint(address3, 1000)

    await token.connect(signers[1]).approve(address2, 1000)
    await token.connect(signers[2]).approve(address, 1000)

    const initialBalance = await token.balanceOf(address)
    await expect(token.connect(signers[2]).transferFrom(address, address2, 100)).not.to.be.reverted
  })

  it('should not allow transferFrom when blacklisted', async function () {
    const { signers, tokens } = await setupTest()
    const token = tokens['ZooV2']

    const address = signers[1].address
    const address2 = signers[2].address

    await token.mint(address, 1000)
    await token.mint(address2, 1000)

    await token.connect(signers[1]).approve(address2, 1000)
    //await token.connect(signers[2]).approve(address, 1000)

    // Add user to blacklist
    await token.blacklistAddress(address)
    await expect(token.connect(signers[1]).transferFrom(address, address2, 100)).to.be.revertedWith('Address is on blacklist')
  })

  it('does not allow transfer from a blacklisted address', async function () {
    const { signers, tokens } = await setupTest()
    const token = tokens['ZooV2']

    const address = signers[1].address
    const address2 = signers[2].address
    const address3 = signers[3].address

    await token.mint(address, 1000)
    await token.mint(address2, 1000)

    await token.connect(signers[1]).approve(address2, 1000)

    // Add user to blacklist
    await token.blacklistAddress(address)
    await expect(token.connect(signers[1]).transfer(address2, 100)).to.be.revertedWith('Address is on blacklist')
  })

  describe('pausable', async () => {
    it('starts out as unpaused', async () => {
      const {
        tokens: { ZooV2 },
      } = await setupTest()
      const isPaused = await ZooV2.paused()
      await expect(isPaused).to.be.false
    })

    it('can be paused and unpaused', async () => {
      const {
        tokens: { ZooV2 },
      } = await setupTest()
      let isPaused = await ZooV2.paused()
      await expect(isPaused).to.be.false
      await ZooV2.pause();
      isPaused = await ZooV2.paused()
      await expect(isPaused).to.be.true
      await ZooV2.unpause();
      isPaused = await ZooV2.paused()
      await expect(isPaused).to.be.false
    })

    it('cannot transfer when contract is paused', async () => {
        const {
        signers,
        tokens: { ZooV2 },
      } = await setupTest()
			const [user1, user2] = signers;
			const address1 = user1.address;
			const address2 = user2.address;
      await ZooV2.mint(address1, 1000)
      await ZooV2.approve(address1, 1000)
      await ZooV2.pause(); 
      await expect(ZooV2.transfer(address2, 100)).to.revertedWith('Pausable: paused');
    });

    it('can transfer when contract is not paused', async () => {
        const {
        signers,
        tokens: { ZooV2 },
      } = await setupTest()
			const [user1, user2] = signers;
			const address1 = user1.address;
			const address2 = user2.address;
      await ZooV2.mint(address1, 1000)
      await ZooV2.approve(address1, 1000)
      await ZooV2.pause(); 
      await ZooV2.unpause();
      await expect(ZooV2.transfer(address2, 100)).not.to.be.reverted;
    });


    it('it cannot transferFrom when the contract is paused', async () => {
      const {
        signers,
        tokens: { ZooV2 },
      } = await setupTest()
			const [user1, user2] = signers;
			const address1 = user1.address;
			const address2 = user2.address;
      await ZooV2.mint(address1, 1000)
      await ZooV2.approve(address1, 1000)
      await ZooV2.pause(); 
      await expect(ZooV2.transferFrom(address1, address2, 100)).to.revertedWith('Pausable: paused');
    })

    it('it can transferFrom when the contract is not paused', async () => {
      const {
        signers,
        tokens: { ZooV2 },
      } = await setupTest()
			const [user1, user2] = signers;
			const address1 = user1.address;
			const address2 = user2.address;

      await ZooV2.mint(address1, 1000)
      await ZooV2.approve(address1, 1000)

      await ZooV2.pause(); 
			await ZooV2.unpause();

      const isPaused = await ZooV2.paused()
      await expect(isPaused).to.be.false;
      await expect(
        ZooV2.transferFrom(address1, address2, 100)
      ).not.to.be.reverted;
    })



  })
})
