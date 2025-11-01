import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { time } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  ConcreteFreezeVotingBase,
  ConcreteFreezeVotingBase__factory,
  ERC1967Proxy__factory,
} from '../../../../typechain-types';

// Helper function for deploying ConcreteBaseFreezeVoting instances using ERC1967Proxy
async function deployConcreteBaseFreezeVotingProxy(
  proxyDeployer: SignerWithAddress,
  implementation: string,
  owner: SignerWithAddress,
  freezeVotesThreshold: number,
  freezeProposalPeriod: number,
  lightAccountFactory: string,
): Promise<ConcreteFreezeVotingBase> {
  // Combine selector and encoded params
  const fullInitData = ConcreteFreezeVotingBase__factory.createInterface().encodeFunctionData(
    'initialize',
    [owner.address, freezeVotesThreshold, freezeProposalPeriod, lightAccountFactory],
  );

  // Deploy the proxy with the implementation
  const proxy = await new ERC1967Proxy__factory(proxyDeployer).deploy(implementation, fullInitData);

  // Return a contract instance connected to the proxy
  return ConcreteFreezeVotingBase__factory.connect(await proxy.getAddress(), owner);
}

describe('FreezeVotingBase', () => {
  // signers
  let proxyDeployer: SignerWithAddress;
  let owner: SignerWithAddress;
  let voter1: SignerWithAddress;
  let voter2: SignerWithAddress;
  let voter3: SignerWithAddress;

  // contracts
  let masterCopy: string;
  let freezeVoting: ConcreteFreezeVotingBase;
  let lightAccountFactory: SignerWithAddress;

  // constants
  const FREEZE_VOTES_THRESHOLD = 3;
  const FREEZE_PROPOSAL_PERIOD = 5;

  beforeEach(async () => {
    // Get signers
    [proxyDeployer, owner, voter1, voter2, voter3, lightAccountFactory] = await ethers.getSigners();

    // Deploy implementation
    const implementation = await new ConcreteFreezeVotingBase__factory(proxyDeployer).deploy();
    masterCopy = await implementation.getAddress();

    // Deploy proxy
    freezeVoting = await deployConcreteBaseFreezeVotingProxy(
      proxyDeployer,
      masterCopy,
      owner,
      FREEZE_VOTES_THRESHOLD,
      FREEZE_PROPOSAL_PERIOD,
      lightAccountFactory.address,
    );
  });

  describe('Initialization', () => {
    it('should initialize with correct parameters', async () => {
      expect(await freezeVoting.owner()).to.equal(owner.address);
      expect(await freezeVoting.freezeVotesThreshold()).to.equal(FREEZE_VOTES_THRESHOLD);
      expect(await freezeVoting.freezeProposalPeriod()).to.equal(FREEZE_PROPOSAL_PERIOD);
    });

    it('should not allow reinitialization', async () => {
      await expect(
        freezeVoting.initialize(
          owner.address,
          FREEZE_VOTES_THRESHOLD,
          FREEZE_PROPOSAL_PERIOD,
          lightAccountFactory.address,
        ),
      ).to.be.revertedWithCustomError(freezeVoting, 'InvalidInitialization');
    });

    it('Should have initialization disabled in the implementation', async function () {
      const implementationContract = ConcreteFreezeVotingBase__factory.connect(
        masterCopy,
        proxyDeployer,
      ) as any;

      await expect(
        implementationContract.initialize(
          owner.address,
          FREEZE_VOTES_THRESHOLD,
          FREEZE_PROPOSAL_PERIOD,
          lightAccountFactory.address,
        ),
      ).to.be.revertedWithCustomError(implementationContract, 'InvalidInitialization');
    });
  });

  describe('Freeze Voting Process', () => {
    it('should create a freeze proposal on first vote', async () => {
      // Initial state
      expect(await freezeVoting.freezeProposalCreated()).to.equal(0);
      expect(await freezeVoting.freezeProposalVoteCount()).to.equal(0);

      // First vote creates the proposal
      await expect(freezeVoting.connect(voter1).castFreezeVote())
        .to.emit(freezeVoting, 'FreezeVoteCast')
        .withArgs(voter1.address, 1);

      // Check state after first vote
      const currentTimestamp = await time.latest();
      expect(await freezeVoting.freezeProposalCreated()).to.equal(currentTimestamp - 1);
      expect(await freezeVoting.freezeProposalVoteCount()).to.equal(1);
    });

    it('should accumulate votes correctly', async () => {
      // First vote
      await freezeVoting.connect(voter1).castFreezeVote();
      expect(await freezeVoting.freezeProposalVoteCount()).to.equal(1);

      // Second vote
      await freezeVoting.connect(voter2).castFreezeVote();
      expect(await freezeVoting.freezeProposalVoteCount()).to.equal(2);

      // Third vote
      await freezeVoting.connect(voter3).castFreezeVote();
      expect(await freezeVoting.freezeProposalVoteCount()).to.equal(3);
    });

    it('should reject votes after proposal period expiry', async () => {
      // First vote to create proposal
      await freezeVoting.connect(voter1).castFreezeVote();

      // Increase time to pass the freeze proposal period
      await time.increase(FREEZE_PROPOSAL_PERIOD + 1);

      // New vote should be rejected
      await expect(freezeVoting.connect(voter2).castFreezeVote()).to.be.revertedWith(
        'Freeze proposal period expired',
      );
    });
  });

  describe('Freeze State', () => {
    it('should not be frozen initially', async () => {
      expect(await freezeVoting.isFrozen()).to.be.false;
    });

    it('should not be frozen when below threshold', async () => {
      // With threshold of 3, cast only 2 votes
      await freezeVoting.connect(voter1).castFreezeVote();
      await freezeVoting.connect(voter2).castFreezeVote();

      // Should not be frozen yet
      expect(await freezeVoting.isFrozen()).to.be.false;
    });

    it('should be frozen once threshold is met', async () => {
      // Cast enough votes to meet threshold
      await freezeVoting.connect(voter1).castFreezeVote();
      await freezeVoting.connect(voter2).castFreezeVote();
      await freezeVoting.connect(voter3).castFreezeVote();

      // Should now be frozen
      expect(await freezeVoting.isFrozen()).to.be.true;
    });

    it('should remain frozen until explicitly unfrozen', async () => {
      // Cast enough votes to meet threshold
      await freezeVoting.connect(voter1).castFreezeVote();
      await freezeVoting.connect(voter2).castFreezeVote();
      await freezeVoting.connect(voter3).castFreezeVote();

      // Should be frozen initially
      expect(await freezeVoting.isFrozen()).to.be.true;

      // Increase time significantly
      await time.increase(60 * 60 * 24 * 30); // 30 days

      // Should still be frozen (permanent freeze)
      expect(await freezeVoting.isFrozen()).to.be.true;
    });

    it('should allow owner to unfreeze manually', async () => {
      // Cast enough votes to meet threshold
      await freezeVoting.connect(voter1).castFreezeVote();
      await freezeVoting.connect(voter2).castFreezeVote();
      await freezeVoting.connect(voter3).castFreezeVote();

      // Should be frozen
      expect(await freezeVoting.isFrozen()).to.be.true;

      // Owner unfreezes manually
      await freezeVoting.connect(owner).unfreeze();

      // Should no longer be frozen
      expect(await freezeVoting.isFrozen()).to.be.false;

      // Check that state was reset
      expect(await freezeVoting.freezeProposalCreated()).to.equal(0);
      expect(await freezeVoting.freezeProposalVoteCount()).to.equal(0);
    });

    it('should not allow non-owner to unfreeze', async () => {
      // Cast enough votes to meet threshold
      await freezeVoting.connect(voter1).castFreezeVote();
      await freezeVoting.connect(voter2).castFreezeVote();
      await freezeVoting.connect(voter3).castFreezeVote();

      // Non-owner tries to unfreeze
      await expect(freezeVoting.connect(voter1).unfreeze()).to.be.revertedWithCustomError(
        freezeVoting,
        'OwnableUnauthorizedAccount',
      );

      // Should still be frozen
      expect(await freezeVoting.isFrozen()).to.be.true;
    });

    it('should track freeze status across multiple proposals', async () => {
      // First proposal: get enough votes to freeze
      await freezeVoting.connect(voter1).castFreezeVote();
      await freezeVoting.connect(voter2).castFreezeVote();
      await freezeVoting.connect(voter3).castFreezeVote();

      // DAO should be frozen
      expect(await freezeVoting.isFrozen()).to.be.true;

      // Owner unfreezes manually
      await freezeVoting.connect(owner).unfreeze();

      // DAO should not be frozen
      expect(await freezeVoting.isFrozen()).to.be.false;

      // Start a new proposal with not enough votes
      await freezeVoting.connect(voter1).castFreezeVote();
      await freezeVoting.connect(voter2).castFreezeVote();

      // DAO should not be frozen with only 2 votes
      expect(await freezeVoting.isFrozen()).to.be.false;

      // Add the third vote to reach threshold
      await freezeVoting.connect(voter3).castFreezeVote();

      // DAO should be frozen again
      expect(await freezeVoting.isFrozen()).to.be.true;
    });
  });

  describe('DAOFrozen Event', () => {
    it('should emit DAOFrozen event when threshold is reached', async () => {
      // Cast votes to reach threshold
      await freezeVoting.connect(voter1).castFreezeVote();
      await freezeVoting.connect(voter2).castFreezeVote();

      // The final vote that reaches threshold should emit DAOFrozen
      await expect(freezeVoting.connect(voter3).castFreezeVote()).to.emit(
        freezeVoting,
        'DAOFrozen',
      );
    });

    it('should emit DAOFrozen event only once when threshold is reached', async () => {
      // Cast votes to reach threshold
      await freezeVoting.connect(voter1).castFreezeVote();
      await freezeVoting.connect(voter2).castFreezeVote();

      // This vote reaches threshold and should emit DAOFrozen
      await expect(freezeVoting.connect(voter3).castFreezeVote()).to.emit(
        freezeVoting,
        'DAOFrozen',
      );

      // After unfreezing and voting again
      await freezeVoting.connect(owner).unfreeze();

      // Start new freeze cycle
      await freezeVoting.connect(voter1).castFreezeVote();
      await freezeVoting.connect(voter2).castFreezeVote();

      // Should emit DAOFrozen again for the new freeze
      await expect(freezeVoting.connect(voter3).castFreezeVote()).to.emit(
        freezeVoting,
        'DAOFrozen',
      );
    });
  });
});
