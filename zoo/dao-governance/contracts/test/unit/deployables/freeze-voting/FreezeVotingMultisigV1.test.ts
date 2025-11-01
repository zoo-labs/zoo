import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { time } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  ERC1967Proxy__factory,
  FreezeVotingMultisigV1,
  FreezeVotingMultisigV1__factory,
  IDeploymentBlock__factory,
  IERC165__factory,
  IFreezable__factory,
  IFreezeVotingBase__factory,
  IFreezeVotingMultisigV1__factory,
  ILightAccountValidator__factory,
  IVersion__factory,
  MockLightAccount,
  MockLightAccountFactory,
  MockLightAccountFactory__factory,
  MockLightAccount__factory,
  MockSafe,
  MockSafe__factory,
} from '../../../../typechain-types';
import { runDeploymentBlockTests } from '../../shared/deploymentBlockTests';
import { runInitializerEventEmitterTests } from '../../shared/initializerEventEmitterTests';
import { runSupportsInterfaceTests } from '../../shared/supportsInterfaceTests';

// Helper function for deploying MultisigFreezeVotingV1 proxy instances using ERC1967Proxy
async function deployMultisigFreezeVotingProxy(
  proxyDeployer: SignerWithAddress,
  implementation: string,
  owner: SignerWithAddress,
  freezeVotesThreshold: number,
  freezeProposalPeriod: number,
  parentGnosisSafe: MockSafe,
  lightAccountFactoryAddress: string,
): Promise<FreezeVotingMultisigV1> {
  // Combine selector and encoded params
  const fullInitData = FreezeVotingMultisigV1__factory.createInterface().encodeFunctionData(
    'initialize',
    [
      owner.address,
      freezeVotesThreshold,
      freezeProposalPeriod,
      await parentGnosisSafe.getAddress(),
      lightAccountFactoryAddress,
    ],
  );

  // Deploy the proxy with the implementation
  const proxy = await new ERC1967Proxy__factory(proxyDeployer).deploy(implementation, fullInitData);

  // Return a contract instance connected to the proxy
  return FreezeVotingMultisigV1__factory.connect(await proxy.getAddress(), owner);
}

describe('FreezeVotingMultisigV1', () => {
  // signers
  let proxyDeployer: SignerWithAddress;
  let owner: SignerWithAddress;
  let safeOwner1: SignerWithAddress;
  let safeOwner2: SignerWithAddress;
  let nonSafeOwner: SignerWithAddress;

  // contracts
  let masterCopy: string;
  let freezeVoting: FreezeVotingMultisigV1;
  let mockSafe: MockSafe;
  let lightAccountFactoryMock: MockLightAccountFactory;
  let lightAccountFactoryMockAddress: string;

  // constants
  const FREEZE_VOTES_THRESHOLD = 2;
  const FREEZE_PROPOSAL_PERIOD = 5;

  beforeEach(async () => {
    // Get signers
    [proxyDeployer, owner, safeOwner1, safeOwner2, nonSafeOwner] = await ethers.getSigners();

    // Deploy mock Safe
    mockSafe = await new MockSafe__factory(proxyDeployer).deploy();

    // Set the owner of the mock Safe
    await mockSafe.setOwner(safeOwner1.address);

    lightAccountFactoryMock = await new MockLightAccountFactory__factory(proxyDeployer).deploy();
    lightAccountFactoryMockAddress = lightAccountFactoryMock.target as string;

    // Deploy implementation
    const implementation = await new FreezeVotingMultisigV1__factory(proxyDeployer).deploy();
    masterCopy = await implementation.getAddress();

    // Deploy proxy
    freezeVoting = await deployMultisigFreezeVotingProxy(
      proxyDeployer,
      masterCopy,
      owner,
      FREEZE_VOTES_THRESHOLD,
      FREEZE_PROPOSAL_PERIOD,
      mockSafe,
      lightAccountFactoryMockAddress,
    );
  });

  describe('Initialization', () => {
    it('should initialize with correct parameters', async () => {
      expect(await freezeVoting.owner()).to.equal(owner.address);
      expect(await freezeVoting.freezeVotesThreshold()).to.equal(FREEZE_VOTES_THRESHOLD);
      expect(await freezeVoting.freezeProposalPeriod()).to.equal(FREEZE_PROPOSAL_PERIOD);
      expect(await freezeVoting.parentSafe()).to.equal(await mockSafe.getAddress());
      expect(await freezeVoting.lightAccountFactory()).to.equal(lightAccountFactoryMockAddress);
    });

    it('should not allow reinitialization', async () => {
      await expect(
        freezeVoting.initialize(
          owner.address,
          FREEZE_VOTES_THRESHOLD,
          FREEZE_PROPOSAL_PERIOD,
          await mockSafe.getAddress(),
          lightAccountFactoryMockAddress,
        ),
      ).to.be.revertedWithCustomError(freezeVoting, 'InvalidInitialization');
    });

    it('Should have initialization disabled in the implementation', async function () {
      const implementationContract = FreezeVotingMultisigV1__factory.connect(
        masterCopy,
        proxyDeployer,
      );

      await expect(
        implementationContract.initialize(
          owner.address,
          FREEZE_VOTES_THRESHOLD,
          FREEZE_PROPOSAL_PERIOD,
          await mockSafe.getAddress(),
          lightAccountFactoryMockAddress,
        ),
      ).to.be.revertedWithCustomError(implementationContract, 'InvalidInitialization');
    });
  });

  describe('Freeze Voting Process', () => {
    it('should reject votes from users not in the parent Safe', async () => {
      await expect(
        freezeVoting.connect(nonSafeOwner).castFreezeVote(0n),
      ).to.be.revertedWithCustomError(freezeVoting, 'NoVotingWeight');
    });

    it('should create a freeze proposal when first user votes', async () => {
      // Set up mock Safe owner
      await mockSafe.setOwner(safeOwner1.address);

      // Cast the first vote
      await expect(freezeVoting.connect(safeOwner1).castFreezeVote(0n))
        .to.emit(freezeVoting, 'FreezeProposalCreated')
        .withArgs(safeOwner1.address)
        .and.to.emit(freezeVoting, 'FreezeVoteCast')
        .withArgs(safeOwner1.address, 1);

      // Check state after vote
      expect(await freezeVoting.freezeProposalCreated()).to.be.gt(0); // Just check that a timestamp was recorded
      expect(await freezeVoting.freezeProposalVoteCount()).to.equal(1);
    });

    it('should accumulate votes correctly from multiple Safe owners', async () => {
      // Set first Safe owner
      await mockSafe.setOwner(safeOwner1.address);

      // First vote
      await freezeVoting.connect(safeOwner1).castFreezeVote(0n);
      expect(await freezeVoting.freezeProposalVoteCount()).to.equal(1);

      // Change Safe owner for second vote
      await mockSafe.setOwner(safeOwner2.address);

      // Second vote
      await freezeVoting.connect(safeOwner2).castFreezeVote(0n);
      expect(await freezeVoting.freezeProposalVoteCount()).to.equal(2);
    });

    it('should prevent duplicate votes from the same user', async () => {
      // Set Safe owner
      await mockSafe.setOwner(safeOwner1.address);

      // First vote
      await freezeVoting.connect(safeOwner1).castFreezeVote(0n);

      // Attempting to vote again should fail with AlreadyVoted
      await expect(
        freezeVoting.connect(safeOwner1).castFreezeVote(0n),
      ).to.be.revertedWithCustomError(freezeVoting, 'AlreadyVoted');
    });

    it('should create a new proposal after proposal period expiry', async () => {
      // Set Safe owner
      await mockSafe.setOwner(safeOwner1.address);

      // First proposal
      await freezeVoting.connect(safeOwner1).castFreezeVote(0n);
      const firstProposalTimestamp = await freezeVoting.freezeProposalCreated();

      // Increase time to pass the freeze proposal period
      await time.increase(FREEZE_PROPOSAL_PERIOD + 1);

      // Change Safe owner for second vote
      await mockSafe.setOwner(safeOwner2.address);

      // Second vote should create a new proposal
      await expect(freezeVoting.connect(safeOwner2).castFreezeVote(0n))
        .to.emit(freezeVoting, 'FreezeProposalCreated')
        .withArgs(safeOwner2.address);

      // New proposal should have a different timestamp
      const secondProposalTimestamp = await freezeVoting.freezeProposalCreated();
      expect(secondProposalTimestamp).to.not.equal(firstProposalTimestamp);

      // Vote count should be reset to 1
      expect(await freezeVoting.freezeProposalVoteCount()).to.equal(1);
    });

    it('should prevent a removed owner from re-contributing to the same proposal', async () => {
      // Initial owner: safeOwner1
      await mockSafe.setOwner(safeOwner1.address);
      await freezeVoting.connect(safeOwner1).castFreezeVote(0n);
      const initialVoteCount = await freezeVoting.freezeProposalVoteCount();
      expect(initialVoteCount).to.equal(1);
      const proposalTimestamp = await freezeVoting.freezeProposalCreated();

      // Remove safeOwner1, make safeOwner2 the owner
      await mockSafe.setOwner(safeOwner2.address);

      // safeOwner1 (no longer an owner) tries to vote again on the same proposal
      await expect(
        freezeVoting.connect(safeOwner1).castFreezeVote(0n),
      ).to.be.revertedWithCustomError(freezeVoting, 'NoVotingWeight');
      // Vote count should not change
      expect(await freezeVoting.freezeProposalVoteCount()).to.equal(initialVoteCount);
      // Proposal timestamp should not change as it's within the same proposal period
      expect(await freezeVoting.freezeProposalCreated()).to.equal(proposalTimestamp);
    });

    it('should allow a newly added owner to vote on an existing proposal', async () => {
      // Initial owner: safeOwner1
      await mockSafe.setOwner(safeOwner1.address);
      await freezeVoting.connect(safeOwner1).castFreezeVote(0n);
      let currentVoteCount = await freezeVoting.freezeProposalVoteCount();
      expect(currentVoteCount).to.equal(1);
      const proposalTimestamp = await freezeVoting.freezeProposalCreated();

      // Add safeOwner2 (by making it the sole owner for this mock's simplicity)
      await mockSafe.setOwner(safeOwner2.address);

      // Newly added safeOwner2 votes on the existing proposal
      await expect(freezeVoting.connect(safeOwner2).castFreezeVote(0n))
        .to.emit(freezeVoting, 'FreezeVoteCast')
        .withArgs(safeOwner2.address, 1);

      currentVoteCount = await freezeVoting.freezeProposalVoteCount();
      expect(currentVoteCount).to.equal(2);
      // Proposal timestamp should not change
      expect(await freezeVoting.freezeProposalCreated()).to.equal(proposalTimestamp);
    });

    it('should allow a re-added owner (who previously voted) to vote again IF a NEW proposal starts', async () => {
      // Initial owner: safeOwner1
      await mockSafe.setOwner(safeOwner1.address);
      await freezeVoting.connect(safeOwner1).castFreezeVote(0n); // Vote 1 for proposal 1
      const firstProposalTimestamp = await freezeVoting.freezeProposalCreated();

      // Simulate safeOwner1 being removed and then re-added later, or simply a new proposal period starting
      await time.increase(FREEZE_PROPOSAL_PERIOD + 1);

      // safeOwner1 (still an owner or re-added) votes again, this should start a new proposal
      // Ensure mockSafe still considers safeOwner1 an owner for this vote
      await mockSafe.setOwner(safeOwner1.address);

      await expect(freezeVoting.connect(safeOwner1).castFreezeVote(0n))
        .to.emit(freezeVoting, 'FreezeProposalCreated')
        .withArgs(safeOwner1.address); // New proposal

      const secondProposalTimestamp = await freezeVoting.freezeProposalCreated();
      expect(secondProposalTimestamp).to.not.equal(firstProposalTimestamp);
      expect(await freezeVoting.freezeProposalVoteCount()).to.equal(1); // Vote count resets for new proposal
    });
  });

  describe('Freeze State', () => {
    it('should not be frozen initially', async () => {
      expect(await freezeVoting.isFrozen()).to.be.false;
    });

    it('should not be frozen when below threshold', async () => {
      // Set Safe owner
      await mockSafe.setOwner(safeOwner1.address);

      // Cast first vote - not enough to reach threshold of 2
      await freezeVoting.connect(safeOwner1).castFreezeVote(0n);

      // Total votes: 1, below threshold of 2
      expect(await freezeVoting.isFrozen()).to.be.false;
    });

    it('should be frozen once threshold is met', async () => {
      // Set first Safe owner
      await mockSafe.setOwner(safeOwner1.address);

      // First vote
      await freezeVoting.connect(safeOwner1).castFreezeVote(0n);

      // Change Safe owner for second vote
      await mockSafe.setOwner(safeOwner2.address);

      // Second vote to reach threshold
      await freezeVoting.connect(safeOwner2).castFreezeVote(0n);

      // Total votes: 2, equal to threshold of 2
      expect(await freezeVoting.isFrozen()).to.be.true;
    });

    it('should remain frozen until explicitly unfrozen', async () => {
      // Set first Safe owner
      await mockSafe.setOwner(safeOwner1.address);

      // First vote
      await freezeVoting.connect(safeOwner1).castFreezeVote(0n);

      // Change Safe owner for second vote
      await mockSafe.setOwner(safeOwner2.address);

      // Second vote to reach threshold
      await freezeVoting.connect(safeOwner2).castFreezeVote(0n);

      // Should be frozen initially
      expect(await freezeVoting.isFrozen()).to.be.true;

      // Increase time significantly
      await time.increase(60 * 60 * 24 * 30); // 30 days

      // Should still be frozen (permanent freeze)
      expect(await freezeVoting.isFrozen()).to.be.true;
    });

    it('should allow owner to unfreeze manually', async () => {
      // Set first Safe owner
      await mockSafe.setOwner(safeOwner1.address);

      // First vote
      await freezeVoting.connect(safeOwner1).castFreezeVote(0n);

      // Change Safe owner for second vote
      await mockSafe.setOwner(safeOwner2.address);

      // Second vote to reach threshold
      await freezeVoting.connect(safeOwner2).castFreezeVote(0n);

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
      // Set first Safe owner
      await mockSafe.setOwner(safeOwner1.address);

      // First vote
      await freezeVoting.connect(safeOwner1).castFreezeVote(0n);

      // Change Safe owner for second vote
      await mockSafe.setOwner(safeOwner2.address);

      // Second vote to reach threshold
      await freezeVoting.connect(safeOwner2).castFreezeVote(0n);

      // Non-owner tries to unfreeze
      await expect(freezeVoting.connect(nonSafeOwner).unfreeze()).to.be.revertedWithCustomError(
        freezeVoting,
        'OwnableUnauthorizedAccount',
      );

      // Should still be frozen
      expect(await freezeVoting.isFrozen()).to.be.true;
    });

    it('should track freeze status across multiple proposals', async () => {
      // Set first Safe owner
      await mockSafe.setOwner(safeOwner1.address);

      // First vote
      await freezeVoting.connect(safeOwner1).castFreezeVote(0n);

      // Change Safe owner for second vote
      await mockSafe.setOwner(safeOwner2.address);

      // Second vote to reach threshold
      await freezeVoting.connect(safeOwner2).castFreezeVote(0n);

      // DAO should be frozen
      expect(await freezeVoting.isFrozen()).to.be.true;

      // Owner unfreezes manually
      await freezeVoting.connect(owner).unfreeze();

      // DAO should not be frozen
      expect(await freezeVoting.isFrozen()).to.be.false;

      // Start new proposal
      await mockSafe.setOwner(safeOwner1.address);

      // First vote
      await freezeVoting.connect(safeOwner1).castFreezeVote(0n);

      // DAO should not be frozen with only one vote
      expect(await freezeVoting.isFrozen()).to.be.false;

      // Second vote to reach threshold
      await mockSafe.setOwner(safeOwner2.address);
      await freezeVoting.connect(safeOwner2).castFreezeVote(0n);

      // DAO should be frozen again
      expect(await freezeVoting.isFrozen()).to.be.true;
    });
  });

  describe('User Has Voted Tracking', () => {
    it('should correctly track if a user has voted on a proposal', async () => {
      // Set Safe owner
      await mockSafe.setOwner(safeOwner1.address);

      // Initial state - user has not voted
      const createdTimestamp = await freezeVoting.freezeProposalCreated();
      expect(await freezeVoting.accountHasFreezeVoted(createdTimestamp, safeOwner1.address)).to.be
        .false;

      // User votes
      await freezeVoting.connect(safeOwner1).castFreezeVote(0n);

      // Get the new created timestamp
      const newCreatedTimestamp = await freezeVoting.freezeProposalCreated();

      // Updated state - user has voted for the new proposal timestamp
      expect(await freezeVoting.accountHasFreezeVoted(newCreatedTimestamp, safeOwner1.address)).to
        .be.true;
      if (createdTimestamp !== newCreatedTimestamp) {
        expect(await freezeVoting.accountHasFreezeVoted(createdTimestamp, safeOwner1.address)).to.be
          .false;
      }
    });

    it('should reset user voting status when unfreeze is called', async () => {
      // Set Safe owner
      await mockSafe.setOwner(safeOwner1.address);

      // User votes
      await freezeVoting.connect(safeOwner1).castFreezeVote(0n);

      // Get the created timestamp
      const createdTimestamp = await freezeVoting.freezeProposalCreated();

      // Check that user has voted for this proposal timestamp
      expect(await freezeVoting.accountHasFreezeVoted(createdTimestamp, safeOwner1.address)).to.be
        .true;

      // Owner unfreezes
      await freezeVoting.connect(owner).unfreeze();

      // The created timestamp is now 0, and the mapping for the old `createdTimestamp` is not cleared by unfreeze itself,
      // but the state for a *new* proposal (which will get a new timestamp) should be clear.
      expect(await freezeVoting.freezeProposalCreated()).to.equal(0);
      // Check for the new (zero) proposal timestamp - should be false
      expect(await freezeVoting.accountHasFreezeVoted(0, safeOwner1.address)).to.be.false;

      // User should be able to vote again (this will create a new proposal timestamp)
      await freezeVoting.connect(safeOwner1).castFreezeVote(0n);
      const newCreatedTimestamp = await freezeVoting.freezeProposalCreated();

      // User has voted on the new proposal
      expect(await freezeVoting.accountHasFreezeVoted(newCreatedTimestamp, safeOwner1.address)).to
        .be.true;
      if (createdTimestamp > 0 && createdTimestamp !== newCreatedTimestamp) {
        expect(await freezeVoting.accountHasFreezeVoted(createdTimestamp, safeOwner1.address)).to.be
          .true;
      }
    });
  });

  describe('Version', () => {
    it('should return the correct version number', async () => {
      expect(await freezeVoting.version()).to.equal(1);
    });
  });

  describe('ERC165 supportsInterface', () => {
    runSupportsInterfaceTests({
      getContract: () => freezeVoting,
      supportedInterfaceFactories: [
        IFreezeVotingMultisigV1__factory,
        IFreezeVotingBase__factory,
        IFreezable__factory,
        ILightAccountValidator__factory,
        IERC165__factory,
        IVersion__factory,
        IDeploymentBlock__factory,
      ],
    });
  });

  describe('ERC4337 Smart Account Voting', () => {
    let freezeVotingSA: FreezeVotingMultisigV1;
    let mockSafeSA: MockSafe;
    let smartAccountOwnerSA: SignerWithAddress;
    let relayerSA: SignerWithAddress;
    let mockSmartAccount: MockLightAccount;
    let lightAccountFactorySA: MockLightAccountFactory;

    beforeEach(async () => {
      smartAccountOwnerSA = safeOwner1;
      relayerSA = nonSafeOwner;

      lightAccountFactorySA = await new MockLightAccountFactory__factory(proxyDeployer).deploy();

      mockSmartAccount = await new MockLightAccount__factory(proxyDeployer).deploy(
        smartAccountOwnerSA.address,
      );
      await mockSmartAccount.waitForDeployment();
      const mockSmartAccountAddress = mockSmartAccount.target as string;

      await lightAccountFactorySA.setAccountAddress(
        smartAccountOwnerSA.address,
        0,
        mockSmartAccountAddress,
      );
      await lightAccountFactorySA.setAccountOwner(
        mockSmartAccountAddress,
        smartAccountOwnerSA.address,
      );
      await lightAccountFactorySA.setIsDeployed(mockSmartAccountAddress, true);

      mockSafeSA = await new MockSafe__factory(proxyDeployer).deploy();
      await mockSafeSA.setOwner(smartAccountOwnerSA.address);

      const implementation = await new FreezeVotingMultisigV1__factory(proxyDeployer).deploy();
      const masterCopySA = await implementation.getAddress();

      freezeVotingSA = await deployMultisigFreezeVotingProxy(
        proxyDeployer,
        masterCopySA,
        owner,
        FREEZE_VOTES_THRESHOLD,
        FREEZE_PROPOSAL_PERIOD,
        mockSafeSA,
        lightAccountFactorySA.target as string,
      );
    });

    it('should allow vote via smart account if SA owner is a Safe owner, attributing vote to SA owner', async () => {
      const castVoteCalldata = freezeVotingSA.interface.encodeFunctionData('castFreezeVote', [0n]);

      await expect(
        mockSmartAccount
          .connect(relayerSA)
          .executeFreezeVote(await freezeVotingSA.getAddress(), castVoteCalldata),
      )
        .to.emit(freezeVotingSA, 'FreezeProposalCreated')
        .withArgs(smartAccountOwnerSA.address)
        .and.to.emit(freezeVotingSA, 'FreezeVoteCast')
        .withArgs(smartAccountOwnerSA.address, 1);

      expect(await freezeVotingSA.freezeProposalVoteCount()).to.equal(1);
      const proposalTimestamp = await freezeVotingSA.freezeProposalCreated();
      expect(
        await freezeVotingSA.accountHasFreezeVoted(proposalTimestamp, smartAccountOwnerSA.address),
      ).to.be.true;
    });

    it('should reject vote via smart account if SA owner is NOT a Safe owner', async () => {
      await mockSafeSA.setOwner(safeOwner2.address);
      const castVoteCalldata = freezeVotingSA.interface.encodeFunctionData('castFreezeVote', [0n]);

      await expect(
        mockSmartAccount
          .connect(relayerSA)
          .executeFreezeVote(await freezeVotingSA.getAddress(), castVoteCalldata),
      ).to.be.revertedWithCustomError(freezeVotingSA, 'NoVotingWeight');
    });
  });

  describe('Deployment Block', () => {
    runDeploymentBlockTests({
      getContract: () => freezeVoting,
    });
  });

  describe('InitializerEventEmitter', () => {
    let deployer: SignerWithAddress;
    let testOwner: SignerWithAddress;
    let testMockSafeAddress: string;
    let lightAccountFactoryAddress: string;

    beforeEach(async () => {
      [deployer, testOwner] = await ethers.getSigners();
      const testMockSafe = await new MockSafe__factory(testOwner).deploy();
      const lightAccountFactory = await new MockLightAccountFactory__factory(testOwner).deploy();
      testMockSafeAddress = await testMockSafe.getAddress();
      lightAccountFactoryAddress = lightAccountFactory.target as string;
    });

    runInitializerEventEmitterTests({
      contractFactory: FreezeVotingMultisigV1__factory,
      masterCopy: async () =>
        await (await new FreezeVotingMultisigV1__factory(deployer).deploy()).getAddress(),
      deployer: () => deployer,
      initializeParams: () => [
        testOwner.address,
        FREEZE_VOTES_THRESHOLD,
        FREEZE_PROPOSAL_PERIOD,
        testMockSafeAddress,
        lightAccountFactoryAddress,
      ],
      getExpectedInitData: () =>
        ethers.AbiCoder.defaultAbiCoder().encode(
          ['address', 'uint256', 'uint32', 'address', 'address'],
          [
            testOwner.address,
            FREEZE_VOTES_THRESHOLD,
            FREEZE_PROPOSAL_PERIOD,
            testMockSafeAddress,
            lightAccountFactoryAddress,
          ],
        ),
    });
  });
});
