// @ts-ignore
import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { Contract, BigNumber } from 'ethers'

describe('ZooGovernor', () => {
  let token: Contract
  let timelock: Contract
  let governor: Contract
  let owner: SignerWithAddress
  let voter1: SignerWithAddress
  let voter2: SignerWithAddress
  let voter3: SignerWithAddress

  const VOTING_DELAY = 7200 // ~1 day at 12s/block
  const VOTING_PERIOD = 50400 // ~1 week at 12s/block
  const QUORUM_PERCENTAGE = 4
  const TOTAL_SUPPLY = ethers.utils.parseEther('1000000') // 1M tokens
  const QUORUM_AMOUNT = TOTAL_SUPPLY.mul(QUORUM_PERCENTAGE).div(100) // 40k tokens

  // Proposal states from Governor
  enum ProposalState {
    Pending,
    Active,
    Canceled,
    Defeated,
    Succeeded,
    Queued,
    Expired,
    Executed
  }

  beforeEach(async () => {
    [owner, voter1, voter2, voter3] = await ethers.getSigners()

    // Deploy ZooToken
    const ZooToken = await ethers.getContractFactory('ZooToken')
    token = await ZooToken.deploy()
    await token.deployed()

    // Mint tokens
    await token.mint(owner.address, TOTAL_SUPPLY)

    // Deploy TimelockController with owner as temporary proposer
    const TimelockController = await ethers.getContractFactory('TimelockController')
    const minDelay = 86400 // 1 day
    timelock = await TimelockController.deploy(
      minDelay,
      [owner.address], // proposers (will add governor)
      [ethers.constants.AddressZero], // executors (anyone)
      owner.address // admin
    )
    await timelock.deployed()

    // Deploy ZooGovernor
    const ZooGovernor = await ethers.getContractFactory('ZooGovernor')
    governor = await ZooGovernor.deploy(token.address, timelock.address)
    await governor.deployed()

    // Grant governor the proposer role on timelock
    const PROPOSER_ROLE = await timelock.PROPOSER_ROLE()
    await timelock.grantRole(PROPOSER_ROLE, governor.address)

    // Renounce admin role for self-governance
    const ADMIN_ROLE = await timelock.DEFAULT_ADMIN_ROLE()
    await timelock.renounceRole(ADMIN_ROLE, owner.address)

    // Complete airdrop to lock minting
    await token.completeAirdrop()
  })

  describe('Deployment', () => {
    it('should have correct voting delay', async () => {
      expect(await governor.votingDelay()).to.equal(VOTING_DELAY)
    })

    it('should have correct voting period', async () => {
      expect(await governor.votingPeriod()).to.equal(VOTING_PERIOD)
    })

    it('should have correct quorum percentage', async () => {
      expect(await governor.QUORUM_PERCENTAGE()).to.equal(QUORUM_PERCENTAGE)
    })

    it('should have correct name', async () => {
      expect(await governor.name()).to.equal('ZooGovernor')
    })
  })

  describe('Voting Power', () => {
    it('should have zero voting power without delegation', async () => {
      await token.transfer(voter1.address, ethers.utils.parseEther('100'))
      const block = await ethers.provider.getBlockNumber()
      // No delegation = no voting power
      expect(await token.getVotes(voter1.address)).to.equal(0)
    })

    it('should have voting power after self-delegation', async () => {
      const amount = ethers.utils.parseEther('100')
      await token.transfer(voter1.address, amount)
      await token.connect(voter1).delegate(voter1.address)

      // After delegation, voting power equals balance
      expect(await token.getVotes(voter1.address)).to.equal(amount)
    })

    it('should allow delegation to another address', async () => {
      const amount = ethers.utils.parseEther('100')
      await token.transfer(voter1.address, amount)
      await token.connect(voter1).delegate(voter2.address)

      expect(await token.getVotes(voter2.address)).to.equal(amount)
      expect(await token.getVotes(voter1.address)).to.equal(0)
    })
  })

  describe('Proposals', () => {
    let proposalId: BigNumber
    const description = 'Test proposal'

    beforeEach(async () => {
      // Delegate to owner for voting
      await token.delegate(owner.address)
    })

    it('should create a proposal', async () => {
      const targets = [token.address]
      const values = [0]
      const calldatas = [token.interface.encodeFunctionData('pause', [])]

      const tx = await governor.propose(targets, values, calldatas, description)
      const receipt = await tx.wait()

      const event = receipt.events?.find((e: any) => e.event === 'ProposalCreated')
      expect(event).to.not.be.undefined

      proposalId = event.args.proposalId
      expect(await governor.state(proposalId)).to.equal(ProposalState.Pending)
    })

    it('should transition to Active after voting delay', async () => {
      const targets = [token.address]
      const values = [0]
      const calldatas = [token.interface.encodeFunctionData('pause', [])]

      const tx = await governor.propose(targets, values, calldatas, description)
      const receipt = await tx.wait()
      proposalId = receipt.events?.find((e: any) => e.event === 'ProposalCreated').args.proposalId

      // Mine blocks to pass voting delay
      for (let i = 0; i < VOTING_DELAY + 1; i++) {
        await ethers.provider.send('evm_mine', [])
      }

      expect(await governor.state(proposalId)).to.equal(ProposalState.Active)
    })
  })

  describe('Quorum', () => {
    it('should require 4% quorum to pass', async () => {
      // Give voter1 less than quorum
      const belowQuorum = QUORUM_AMOUNT.sub(ethers.utils.parseEther('1'))
      await token.transfer(voter1.address, belowQuorum)
      await token.connect(voter1).delegate(voter1.address)

      // Owner keeps rest, delegates to self
      await token.delegate(owner.address)

      // Create proposal
      const targets = [token.address]
      const values = [0]
      const calldatas = [token.interface.encodeFunctionData('pause', [])]
      const description = 'Quorum test'

      const tx = await governor.connect(voter1).propose(targets, values, calldatas, description)
      const receipt = await tx.wait()
      const proposalId = receipt.events?.find((e: any) => e.event === 'ProposalCreated').args.proposalId

      // Pass voting delay
      for (let i = 0; i < VOTING_DELAY + 1; i++) {
        await ethers.provider.send('evm_mine', [])
      }

      // Vote with below-quorum amount
      await governor.connect(voter1).castVote(proposalId, 1) // 1 = For

      // Pass voting period
      for (let i = 0; i < VOTING_PERIOD + 1; i++) {
        await ethers.provider.send('evm_mine', [])
      }

      // Should be defeated due to lack of quorum
      expect(await governor.state(proposalId)).to.equal(ProposalState.Defeated)
    })

    it('should pass with sufficient quorum', async () => {
      // Give voter1 enough for quorum
      const aboveQuorum = QUORUM_AMOUNT.add(ethers.utils.parseEther('1'))
      await token.transfer(voter1.address, aboveQuorum)
      await token.connect(voter1).delegate(voter1.address)

      // Create proposal
      const targets = [token.address]
      const values = [0]
      const calldatas = [token.interface.encodeFunctionData('pause', [])]
      const description = 'Quorum pass test'

      const tx = await governor.connect(voter1).propose(targets, values, calldatas, description)
      const receipt = await tx.wait()
      const proposalId = receipt.events?.find((e: any) => e.event === 'ProposalCreated').args.proposalId

      // Pass voting delay
      for (let i = 0; i < VOTING_DELAY + 1; i++) {
        await ethers.provider.send('evm_mine', [])
      }

      // Vote
      await governor.connect(voter1).castVote(proposalId, 1) // 1 = For

      // Pass voting period
      for (let i = 0; i < VOTING_PERIOD + 1; i++) {
        await ethers.provider.send('evm_mine', [])
      }

      // Should succeed
      expect(await governor.state(proposalId)).to.equal(ProposalState.Succeeded)
    })
  })

  describe('Token-Weighted Voting', () => {
    it('should weight votes by token balance', async () => {
      // voter1 gets 60% of supply
      // voter2 gets 30% of supply
      const voter1Amount = TOTAL_SUPPLY.mul(60).div(100)
      const voter2Amount = TOTAL_SUPPLY.mul(30).div(100)

      await token.transfer(voter1.address, voter1Amount)
      await token.transfer(voter2.address, voter2Amount)

      await token.connect(voter1).delegate(voter1.address)
      await token.connect(voter2).delegate(voter2.address)
      await token.delegate(owner.address) // owner keeps 10%

      // Create proposal
      const targets = [token.address]
      const values = [0]
      const calldatas = [token.interface.encodeFunctionData('pause', [])]
      const description = 'Weighted vote test'

      const tx = await governor.propose(targets, values, calldatas, description)
      const receipt = await tx.wait()
      const proposalId = receipt.events?.find((e: any) => e.event === 'ProposalCreated').args.proposalId

      // Pass voting delay
      for (let i = 0; i < VOTING_DELAY + 1; i++) {
        await ethers.provider.send('evm_mine', [])
      }

      // voter1 votes Against, voter2 votes For
      await governor.connect(voter1).castVote(proposalId, 0) // 0 = Against
      await governor.connect(voter2).castVote(proposalId, 1) // 1 = For

      // Check vote counts
      const proposalVotes = await governor.proposalVotes(proposalId)
      expect(proposalVotes.forVotes).to.equal(voter2Amount)
      expect(proposalVotes.againstVotes).to.equal(voter1Amount)

      // Pass voting period
      for (let i = 0; i < VOTING_PERIOD + 1; i++) {
        await ethers.provider.send('evm_mine', [])
      }

      // Should be defeated because Against > For
      expect(await governor.state(proposalId)).to.equal(ProposalState.Defeated)
    })
  })
})

describe('ZooToken', () => {
  let token: Contract
  let owner: SignerWithAddress
  let user1: SignerWithAddress
  let user2: SignerWithAddress

  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners()

    const ZooToken = await ethers.getContractFactory('ZooToken')
    token = await ZooToken.deploy()
    await token.deployed()
  })

  describe('Deployment', () => {
    it('should have correct name and symbol', async () => {
      expect(await token.name()).to.equal('ZOO')
      expect(await token.symbol()).to.equal('ZOO')
    })
  })

  describe('Minting', () => {
    it('should allow owner to mint before airdrop completion', async () => {
      await token.mint(user1.address, ethers.utils.parseEther('100'))
      expect(await token.balanceOf(user1.address)).to.equal(ethers.utils.parseEther('100'))
    })

    it('should prevent minting after airdrop completion', async () => {
      await token.completeAirdrop()
      await expect(token.mint(user1.address, ethers.utils.parseEther('100')))
        .to.be.revertedWithCustomError(token, 'AirdropAlreadyCompleted')
    })
  })

  describe('Delegation', () => {
    it('should allow self-delegation', async () => {
      await token.mint(user1.address, ethers.utils.parseEther('100'))
      await token.connect(user1).delegate(user1.address)

      expect(await token.getVotes(user1.address)).to.equal(ethers.utils.parseEther('100'))
    })

    it('should allow delegation to others', async () => {
      await token.mint(user1.address, ethers.utils.parseEther('100'))
      await token.connect(user1).delegate(user2.address)

      expect(await token.getVotes(user2.address)).to.equal(ethers.utils.parseEther('100'))
      expect(await token.getVotes(user1.address)).to.equal(0)
    })
  })

  describe('Blacklist', () => {
    it('should prevent blacklisted addresses from transferring', async () => {
      await token.mint(user1.address, ethers.utils.parseEther('100'))
      await token.setBlacklist(user1.address, true)

      await expect(token.connect(user1).transfer(user2.address, ethers.utils.parseEther('50')))
        .to.be.revertedWithCustomError(token, 'AddressBlacklisted')
    })

    it('should prevent transfers to blacklisted addresses', async () => {
      await token.mint(user1.address, ethers.utils.parseEther('100'))
      await token.setBlacklist(user2.address, true)

      await expect(token.connect(user1).transfer(user2.address, ethers.utils.parseEther('50')))
        .to.be.revertedWithCustomError(token, 'AddressBlacklisted')
    })
  })

  describe('Pause', () => {
    it('should prevent transfers when paused', async () => {
      await token.mint(user1.address, ethers.utils.parseEther('100'))
      await token.pause()

      await expect(token.connect(user1).transfer(user2.address, ethers.utils.parseEther('50')))
        .to.be.revertedWith('Pausable: paused')
    })

    it('should allow transfers after unpause', async () => {
      await token.mint(user1.address, ethers.utils.parseEther('100'))
      await token.pause()
      await token.unpause()

      await token.connect(user1).transfer(user2.address, ethers.utils.parseEther('50'))
      expect(await token.balanceOf(user2.address)).to.equal(ethers.utils.parseEther('50'))
    })
  })
})
