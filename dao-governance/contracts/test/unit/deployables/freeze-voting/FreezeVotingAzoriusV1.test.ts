import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { loadFixture, time } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  ERC1967Proxy__factory,
  FreezeVotingAzoriusV1,
  FreezeVotingAzoriusV1__factory,
  IDeploymentBlock__factory,
  IERC165__factory,
  IFreezeVotingAzoriusV1__factory,
  IFreezeVotingBase__factory,
  ILightAccountValidator__factory,
  IVersion__factory,
  MockLightAccountFactory,
  MockLightAccountFactory__factory,
  MockModuleAzoriusV1,
  MockModuleAzoriusV1__factory,
  MockVotingStrategy,
  MockVotingStrategy__factory,
  MockERC20Votes,
  IFreezable__factory,
} from '../../../../typechain-types';
import { IVotingTypes } from '../../../../typechain-types/contracts/interfaces/dao/deployables/IStrategyV1';
import {
  deployMockERC20VotingConfig,
  deployMockERC721VotingConfig,
  setupMockERC20Token,
  MockVotingConfigContracts,
} from '../../../helpers/votingConfigHelpers';
import { runDeploymentBlockTests } from '../../shared/deploymentBlockTests';
import { runInitializerEventEmitterTests } from '../../shared/initializerEventEmitterTests';
import { runSupportsInterfaceTests } from '../../shared/supportsInterfaceTests';

async function deployAzoriusFreezeVotingProxy(
  proxyDeployer: SignerWithAddress,
  implementationAddress: string,
  owner: string,
  freezeVotesThreshold: bigint,
  freezeProposalPeriod: number,
  parentAzoriusAddress: string,
  lightAccountFactoryAddress: string,
): Promise<FreezeVotingAzoriusV1> {
  const initData = FreezeVotingAzoriusV1__factory.createInterface().encodeFunctionData(
    'initialize',
    [
      owner,
      freezeVotesThreshold,
      freezeProposalPeriod,
      parentAzoriusAddress,
      lightAccountFactoryAddress,
    ],
  );
  const proxy = await new ERC1967Proxy__factory(proxyDeployer).deploy(
    implementationAddress,
    initData,
  );
  await proxy.waitForDeployment();
  return FreezeVotingAzoriusV1__factory.connect(await proxy.getAddress(), proxyDeployer);
}

describe('FreezeVotingAzoriusV1', () => {
  let deployer: SignerWithAddress;
  let owner: SignerWithAddress;
  let voter1: SignerWithAddress;
  let voter2: SignerWithAddress;

  let azoriusFreezeVoting: FreezeVotingAzoriusV1;
  let mockParentAzorius: MockModuleAzoriusV1;
  let mockStrategy: MockVotingStrategy;
  let votingConfig1: MockVotingConfigContracts;
  let mockLightAccountFactory: MockLightAccountFactory;
  let azoriusFreezeVotingImplementationAddress: string;

  const DEFAULT_FREEZE_VOTES_THRESHOLD = 100n;
  const DEFAULT_FREEZE_PROPOSAL_PERIOD = 60 * 60 * 24; // 1 day

  async function fixture() {
    const [d, o, paa, v1, v2] = await ethers.getSigners();

    const implFactory = new FreezeVotingAzoriusV1__factory(d);
    const impl = await implFactory.deploy();
    await impl.waitForDeployment();
    const implAddr = await impl.getAddress();

    const mockAzoriusFactory = new MockModuleAzoriusV1__factory(d);
    const mAzorius = await mockAzoriusFactory.deploy();
    await mAzorius.waitForDeployment();

    const mockStrategyFactory = new MockVotingStrategy__factory(d);
    const mStrategy = await mockStrategyFactory.deploy(paa.address); // Paa as mock strategy owner/proposerInitializer
    await mStrategy.waitForDeployment();
    await mAzorius.connect(d).updateStrategy(await mStrategy.getAddress()); // Configure mock Azorius with mock Strategy

    // Deploy mock voting configuration for testing
    // We'll use a temporary address for authorization and update it later
    const vConfig1 = await deployMockERC20VotingConfig(ethers.ZeroAddress);

    const lightAccountFactory = await new MockLightAccountFactory__factory(d).deploy();
    await lightAccountFactory.waitForDeployment();

    return {
      deployer: d,
      owner: o,
      voter1: v1,
      voter2: v2,
      azoriusFreezeVotingImplementationAddress: implAddr,
      mockParentAzorius: mAzorius,
      mockStrategy: mStrategy,
      votingConfig1: vConfig1,
      mockLightAccountFactory: lightAccountFactory,
    };
  }

  beforeEach(async () => {
    const f = await loadFixture(fixture);
    deployer = f.deployer;
    owner = f.owner;
    voter1 = f.voter1;
    voter2 = f.voter2;
    azoriusFreezeVotingImplementationAddress = f.azoriusFreezeVotingImplementationAddress;
    mockParentAzorius = f.mockParentAzorius;
    mockStrategy = f.mockStrategy;
    votingConfig1 = f.votingConfig1;
    mockLightAccountFactory = f.mockLightAccountFactory;

    azoriusFreezeVoting = await deployAzoriusFreezeVotingProxy(
      deployer,
      azoriusFreezeVotingImplementationAddress,
      owner.address,
      DEFAULT_FREEZE_VOTES_THRESHOLD,
      DEFAULT_FREEZE_PROPOSAL_PERIOD,
      await mockParentAzorius.getAddress(),
      mockLightAccountFactory.target as string,
    );
  });

  describe('Initialization', () => {
    it('should initialize with correct parameters', async () => {
      expect(await azoriusFreezeVoting.owner()).to.equal(owner.address);
      expect(await azoriusFreezeVoting.freezeVotesThreshold()).to.equal(
        DEFAULT_FREEZE_VOTES_THRESHOLD,
      );
      expect(await azoriusFreezeVoting.freezeProposalPeriod()).to.equal(
        DEFAULT_FREEZE_PROPOSAL_PERIOD,
      );
      expect(await azoriusFreezeVoting.parentAzorius()).to.equal(
        await mockParentAzorius.getAddress(),
      );
      expect(await azoriusFreezeVoting.lightAccountFactory()).to.equal(
        mockLightAccountFactory.target as string,
      );
    });

    it('should not allow reinitialization', async () => {
      await expect(
        azoriusFreezeVoting.initialize(
          owner.address,
          DEFAULT_FREEZE_VOTES_THRESHOLD,
          DEFAULT_FREEZE_PROPOSAL_PERIOD,
          await mockParentAzorius.getAddress(),
          mockLightAccountFactory.target as string,
        ),
      ).to.be.revertedWithCustomError(azoriusFreezeVoting, 'InvalidInitialization');
    });

    it('implementation contract should have initializers disabled', async () => {
      const newImpl = FreezeVotingAzoriusV1__factory.connect(
        azoriusFreezeVotingImplementationAddress,
        deployer,
      );
      await expect(
        newImpl.initialize(
          owner.address,
          DEFAULT_FREEZE_VOTES_THRESHOLD,
          DEFAULT_FREEZE_PROPOSAL_PERIOD,
          await mockParentAzorius.getAddress(),
          mockLightAccountFactory.target as string,
        ),
      ).to.be.revertedWithCustomError(newImpl, 'InvalidInitialization');
    });
  });

  describe('parentAzorius()', () => {
    it('should return the correct parent Azorius contract address', async () => {
      expect(await azoriusFreezeVoting.parentAzorius()).to.equal(
        await mockParentAzorius.getAddress(),
      );
    });
  });

  describe('castFreezeVote', () => {
    let votingConfigData: IVotingTypes.VotingConfigVoteDataStruct[];
    const voteAmount = ethers.parseEther('50');

    beforeEach(async () => {
      // Setup mock strategy to return our voting config
      await mockStrategy.initialize2(await mockStrategy.mockStrategyAdmin(), [
        {
          votingWeight: await votingConfig1.votingWeight.getAddress(),
          voteTracker: await votingConfig1.voteTracker.getAddress(),
        },
      ]);

      // Update the vote tracker to authorize the freeze voting contract
      const freezeVotingAddress = await azoriusFreezeVoting.getAddress();
      const voteTracker = votingConfig1.voteTracker;
      await voteTracker.initialize([freezeVotingAddress]);

      // Update mock strategy with the authorized vote tracker
      await mockStrategy.initialize2(await mockStrategy.mockStrategyAdmin(), [
        {
          votingWeight: await votingConfig1.votingWeight.getAddress(),
          voteTracker: await voteTracker.getAddress(),
        },
      ]);

      // Setup voting data for ERC20 voting
      votingConfigData = [
        {
          configIndex: 0,
          voteData: '0x', // Empty for ERC20
        },
      ];
    });

    it('should initiate a new freeze proposal period if none active and record a vote', async () => {
      const initialFreezeProposalCreated = await azoriusFreezeVoting.freezeProposalCreated();
      expect(initialFreezeProposalCreated).to.equal(0); // Should be 0 before first vote

      // Give voter1 tokens and delegate
      const erc20Token = votingConfig1.token as MockERC20Votes;
      await setupMockERC20Token(erc20Token, voter1, voteAmount);

      // Set mock weight strategy to return the vote amount for voter1
      const votingWeight = votingConfig1.votingWeight;
      await votingWeight.setDefaultWeight(voter1.address, voteAmount);

      const tx = await azoriusFreezeVoting.connect(voter1).castFreezeVote(votingConfigData, 0n);
      const receipt = await tx.wait();
      const block = await ethers.provider.getBlock(receipt!.blockNumber!);
      const txTimestamp = BigInt(block!.timestamp);

      await expect(tx)
        .to.emit(azoriusFreezeVoting, 'FreezeProposalCreated')
        .withArgs(voter1.address, await mockStrategy.getAddress());

      await expect(tx)
        .to.emit(azoriusFreezeVoting, 'FreezeVoteCast')
        .withArgs(voter1.address, voteAmount);

      expect(await azoriusFreezeVoting.freezeProposalCreated()).to.equal(txTimestamp - 1n);
      expect(await azoriusFreezeVoting.freezeProposalVoteCount()).to.equal(voteAmount);
      expect(await azoriusFreezeVoting.freezeProposalStrategy()).to.equal(
        await mockStrategy.getAddress(),
      );

      // Verify vote was recorded in vote tracker
      const voteTracker = votingConfig1.voteTracker;
      expect(await voteTracker.hasVoted(txTimestamp - 1n, voter1.address, '0x')).to.be.true;
    });

    it('should use an existing active freeze proposal period', async () => {
      // Setup tokens for BOTH voters before creating the freeze proposal
      const erc20Token = votingConfig1.token as MockERC20Votes;
      await setupMockERC20Token(erc20Token, voter1, voteAmount);
      const newVoteAmount = ethers.parseEther('30');
      await setupMockERC20Token(erc20Token, voter2, newVoteAmount);

      const votingWeight = votingConfig1.votingWeight;

      // Set weight strategy to return the appropriate amount for voter1
      await votingWeight.setDefaultWeight(voter1.address, voteAmount);

      // First vote to establish a period
      await azoriusFreezeVoting.connect(voter1).castFreezeVote(votingConfigData, 0n);
      const firstProposalCreatedTimestamp = await azoriusFreezeVoting.freezeProposalCreated();
      const firstVoteCount = await azoriusFreezeVoting.freezeProposalVoteCount();

      // Now set default weight for voter2
      await votingWeight.setDefaultWeight(voter2.address, newVoteAmount);

      // Ensure some time passes but not enough to expire the proposal period
      await time.increase(DEFAULT_FREEZE_PROPOSAL_PERIOD / 2);

      const txPromise = azoriusFreezeVoting.connect(voter2).castFreezeVote(votingConfigData, 0n); // voter2 casts a vote

      // Should NOT emit FreezeProposalCreated again
      await expect(txPromise).to.not.emit(azoriusFreezeVoting, 'FreezeProposalCreated');
      await expect(txPromise)
        .to.emit(azoriusFreezeVoting, 'FreezeVoteCast')
        .withArgs(voter2.address, newVoteAmount);

      expect(await azoriusFreezeVoting.freezeProposalCreated()).to.equal(
        firstProposalCreatedTimestamp,
      );
      expect(await azoriusFreezeVoting.freezeProposalVoteCount()).to.equal(
        firstVoteCount + newVoteAmount,
      );

      // Verify vote was recorded with correct context
      const voteTracker = votingConfig1.voteTracker;
      expect(await voteTracker.hasVoted(firstProposalCreatedTimestamp, voter2.address, '0x')).to.be
        .true;
    });

    it('should start a new proposal period if current one has expired', async () => {
      // First vote
      // Give voter1 tokens and vote
      const erc20Token = votingConfig1.token as MockERC20Votes;
      await setupMockERC20Token(erc20Token, voter1, voteAmount);

      const votingWeight = votingConfig1.votingWeight;

      // Set weight for voter1
      await votingWeight.setDefaultWeight(voter1.address, voteAmount);

      await azoriusFreezeVoting.connect(voter1).castFreezeVote(votingConfigData, 0n);
      const firstProposalCreatedTimestamp = await azoriusFreezeVoting.freezeProposalCreated();

      // Expire the proposal period
      await time.increase(DEFAULT_FREEZE_PROPOSAL_PERIOD + 1);
      const newVoteAmount = ethers.parseEther('70');

      // Give voter2 tokens
      await setupMockERC20Token(erc20Token, voter2, newVoteAmount);

      // Set weight for voter2
      await votingWeight.setDefaultWeight(voter2.address, newVoteAmount);

      const tx = await azoriusFreezeVoting.connect(voter2).castFreezeVote(votingConfigData, 0n);
      const receipt = await tx.wait();
      const block = await ethers.provider.getBlock(receipt!.blockNumber!);
      const newTxTimestamp = BigInt(block!.timestamp);

      await expect(tx)
        .to.emit(azoriusFreezeVoting, 'FreezeProposalCreated')
        .withArgs(voter2.address, await mockStrategy.getAddress());
      await expect(tx)
        .to.emit(azoriusFreezeVoting, 'FreezeVoteCast')
        .withArgs(voter2.address, newVoteAmount);

      const newProposalCreatedTimestamp = await azoriusFreezeVoting.freezeProposalCreated();
      expect(newProposalCreatedTimestamp).to.not.equal(firstProposalCreatedTimestamp);
      expect(newProposalCreatedTimestamp).to.equal(newTxTimestamp - 1n);
      expect(await azoriusFreezeVoting.freezeProposalVoteCount()).to.equal(newVoteAmount);
    });

    it('should revert when trying to vote with an already used config', async () => {
      // Give voter1 tokens
      const erc20Token = votingConfig1.token as MockERC20Votes;
      await setupMockERC20Token(erc20Token, voter1, voteAmount);

      const votingWeight = votingConfig1.votingWeight;
      await votingWeight.setDefaultWeight(voter1.address, voteAmount);

      // First vote should succeed
      await azoriusFreezeVoting.connect(voter1).castFreezeVote(votingConfigData, 0n);

      // Second vote with same config should revert
      // Note: AlreadyVoted error now comes from the VoteTracker with different params
      const proposalId = await azoriusFreezeVoting.freezeProposalCreated();
      await expect(azoriusFreezeVoting.connect(voter1).castFreezeVote(votingConfigData, 0n))
        .to.be.revertedWithCustomError(votingConfig1.voteTracker, 'AlreadyVoted')
        .withArgs(proposalId, voter1.address, '0x'); // contextId, voter, voteData
    });

    it('should allow voting with different configs even if one was already used', async () => {
      // Setup both voting configs
      const votingConfig2 = await deployMockERC20VotingConfig(
        await mockStrategy.getAddress(),
        1n, // 1:1 weight ratio
      );

      // Update strategy with both configs
      await mockStrategy.initialize2(await mockStrategy.mockStrategyAdmin(), [
        {
          votingWeight: await votingConfig1.votingWeight.getAddress(),
          voteTracker: await votingConfig1.voteTracker.getAddress(),
        },
        {
          votingWeight: await votingConfig2.votingWeight.getAddress(),
          voteTracker: await votingConfig2.voteTracker.getAddress(),
        },
      ]);

      // Authorize freeze voting on both vote trackers
      const freezeVotingAddress = await azoriusFreezeVoting.getAddress();
      await votingConfig1.voteTracker.initialize([freezeVotingAddress]);
      await votingConfig2.voteTracker.initialize([freezeVotingAddress]);

      // Give voter1 tokens for both configs
      const erc20Token1 = votingConfig1.token as MockERC20Votes;
      const erc20Token2 = votingConfig2.token as MockERC20Votes;
      await setupMockERC20Token(erc20Token1, voter1, voteAmount);
      await setupMockERC20Token(erc20Token2, voter1, voteAmount);

      // Set weights for both configs
      await votingConfig1.votingWeight.setDefaultWeight(voter1.address, voteAmount);
      await votingConfig2.votingWeight.setDefaultWeight(voter1.address, voteAmount);

      // Vote with first config
      await azoriusFreezeVoting.connect(voter1).castFreezeVote(votingConfigData, 0n);

      // Vote with second config should succeed
      const votingConfigData2: IVotingTypes.VotingConfigVoteDataStruct[] = [
        { configIndex: 1, voteData: '0x' },
      ];

      await expect(azoriusFreezeVoting.connect(voter1).castFreezeVote(votingConfigData2, 0n))
        .to.emit(azoriusFreezeVoting, 'FreezeVoteCast')
        .withArgs(voter1.address, voteAmount);

      expect(await azoriusFreezeVoting.freezeProposalVoteCount()).to.equal(voteAmount * 2n);
    });

    it('should revert when voter has zero weight for a config', async () => {
      // Don't give voter1 any tokens or set any weight
      // This should result in zero weight

      await expect(azoriusFreezeVoting.connect(voter1).castFreezeVote(votingConfigData, 0n))
        .to.be.revertedWithCustomError(azoriusFreezeVoting, 'NoVotingWeight')
        .withArgs(0, '0x'); // Config index 0, empty vote data for ERC20
    });

    it('should emit FreezeVoteRecorded events for each config', async () => {
      // Setup multiple configs
      const votingConfig2 = await deployMockERC20VotingConfig(await mockStrategy.getAddress(), 1n);

      await mockStrategy.initialize2(await mockStrategy.mockStrategyAdmin(), [
        {
          votingWeight: await votingConfig1.votingWeight.getAddress(),
          voteTracker: await votingConfig1.voteTracker.getAddress(),
        },
        {
          votingWeight: await votingConfig2.votingWeight.getAddress(),
          voteTracker: await votingConfig2.voteTracker.getAddress(),
        },
      ]);

      const freezeVotingAddress = await azoriusFreezeVoting.getAddress();
      await votingConfig1.voteTracker.initialize([freezeVotingAddress]);
      await votingConfig2.voteTracker.initialize([freezeVotingAddress]);

      // Setup tokens and weights
      const erc20Token1 = votingConfig1.token as MockERC20Votes;
      const erc20Token2 = votingConfig2.token as MockERC20Votes;
      await setupMockERC20Token(erc20Token1, voter1, voteAmount);
      await setupMockERC20Token(erc20Token2, voter1, voteAmount * 2n);

      await votingConfig1.votingWeight.setDefaultWeight(voter1.address, voteAmount);
      await votingConfig2.votingWeight.setDefaultWeight(voter1.address, voteAmount * 2n);

      // Vote with both configs
      const multiConfigVoteData: IVotingTypes.VotingConfigVoteDataStruct[] = [
        { configIndex: 0, voteData: '0x' },
        { configIndex: 1, voteData: '0x' },
      ];

      const tx = await azoriusFreezeVoting.connect(voter1).castFreezeVote(multiConfigVoteData, 0n);

      // Check for both FreezeVoteRecorded events
      await expect(tx)
        .to.emit(azoriusFreezeVoting, 'FreezeVoteRecorded')
        .withArgs(
          voter1.address,
          await azoriusFreezeVoting.freezeProposalCreated(),
          voteAmount,
          '0x',
        );

      await expect(tx)
        .to.emit(azoriusFreezeVoting, 'FreezeVoteRecorded')
        .withArgs(
          voter1.address,
          await azoriusFreezeVoting.freezeProposalCreated(),
          voteAmount * 2n,
          '0x',
        );

      // Also check the aggregate FreezeVoteCast event
      await expect(tx)
        .to.emit(azoriusFreezeVoting, 'FreezeVoteCast')
        .withArgs(voter1.address, voteAmount * 3n);
    });

    it('should revert with correct parameters when voting with already used config at different index', async () => {
      // Setup two voting configs
      const votingConfig2 = await deployMockERC20VotingConfig(await mockStrategy.getAddress(), 1n);

      await mockStrategy.initialize2(await mockStrategy.mockStrategyAdmin(), [
        {
          votingWeight: await votingConfig1.votingWeight.getAddress(),
          voteTracker: await votingConfig1.voteTracker.getAddress(),
        },
        {
          votingWeight: await votingConfig2.votingWeight.getAddress(),
          voteTracker: await votingConfig2.voteTracker.getAddress(),
        },
      ]);

      const freezeVotingAddress = await azoriusFreezeVoting.getAddress();
      await votingConfig2.voteTracker.initialize([freezeVotingAddress]);

      // Setup tokens and weights for config2
      const erc20Token2 = votingConfig2.token as MockERC20Votes;
      await setupMockERC20Token(erc20Token2, voter1, voteAmount);
      await votingConfig2.votingWeight.setDefaultWeight(voter1.address, voteAmount);

      // Vote with config index 1
      const votingConfigData2: IVotingTypes.VotingConfigVoteDataStruct[] = [
        { configIndex: 1, voteData: '0x' },
      ];

      await azoriusFreezeVoting.connect(voter1).castFreezeVote(votingConfigData2, 0n);

      // Try to vote again with same config - should revert with index 1
      const proposalId = await azoriusFreezeVoting.freezeProposalCreated();
      await expect(azoriusFreezeVoting.connect(voter1).castFreezeVote(votingConfigData2, 0n))
        .to.be.revertedWithCustomError(votingConfig2.voteTracker, 'AlreadyVoted')
        .withArgs(proposalId, voter1.address, '0x'); // contextId, voter, voteData
    });

    it('should revert with correct parameters including non-empty vote data', async () => {
      // Deploy ERC721 voting config
      const votingConfigERC721 = await deployMockERC721VotingConfig(
        await mockStrategy.getAddress(),
        1n, // 1:1 weight ratio
      );

      await mockStrategy.initialize2(await mockStrategy.mockStrategyAdmin(), [
        {
          votingWeight: await votingConfigERC721.votingWeight.getAddress(),
          voteTracker: await votingConfigERC721.voteTracker.getAddress(),
        },
      ]);

      const freezeVotingAddress = await azoriusFreezeVoting.getAddress();
      await votingConfigERC721.voteTracker.initialize([freezeVotingAddress]);

      // Mint NFTs to voter1
      const erc721Token = votingConfigERC721.token;
      await (erc721Token as any).mintToken(voter1.address, 1n);
      await (erc721Token as any).mintToken(voter1.address, 2n);

      // Encode token IDs for voting
      const tokenIds = [1n, 2n];
      const encodedTokenIds = ethers.AbiCoder.defaultAbiCoder().encode(['uint256[]'], [tokenIds]);

      const votingConfigDataERC721: IVotingTypes.VotingConfigVoteDataStruct[] = [
        { configIndex: 0, voteData: encodedTokenIds },
      ];

      // First vote should succeed
      await azoriusFreezeVoting.connect(voter1).castFreezeVote(votingConfigDataERC721, 0n);

      // Second vote should revert with the encoded token IDs
      const proposalId = await azoriusFreezeVoting.freezeProposalCreated();
      await expect(azoriusFreezeVoting.connect(voter1).castFreezeVote(votingConfigDataERC721, 0n))
        .to.be.revertedWithCustomError(votingConfigERC721.voteTracker, 'AlreadyVoted')
        .withArgs(proposalId, voter1.address, encodedTokenIds); // contextId, voter, voteData
    });

    it('should revert with correct config index when error occurs in multi-config voting', async () => {
      // Setup three voting configs
      const votingConfig2 = await deployMockERC20VotingConfig(await mockStrategy.getAddress(), 1n);
      const votingConfig3 = await deployMockERC20VotingConfig(await mockStrategy.getAddress(), 1n);

      await mockStrategy.initialize2(await mockStrategy.mockStrategyAdmin(), [
        {
          votingWeight: await votingConfig1.votingWeight.getAddress(),
          voteTracker: await votingConfig1.voteTracker.getAddress(),
        },
        {
          votingWeight: await votingConfig2.votingWeight.getAddress(),
          voteTracker: await votingConfig2.voteTracker.getAddress(),
        },
        {
          votingWeight: await votingConfig3.votingWeight.getAddress(),
          voteTracker: await votingConfig3.voteTracker.getAddress(),
        },
      ]);

      const freezeVotingAddress = await azoriusFreezeVoting.getAddress();
      await votingConfig1.voteTracker.initialize([freezeVotingAddress]);
      await votingConfig2.voteTracker.initialize([freezeVotingAddress]);
      await votingConfig3.voteTracker.initialize([freezeVotingAddress]);

      // Setup tokens for all configs
      const erc20Token1 = votingConfig1.token as MockERC20Votes;
      const erc20Token2 = votingConfig2.token as MockERC20Votes;

      await setupMockERC20Token(erc20Token1, voter1, voteAmount);
      await setupMockERC20Token(erc20Token2, voter1, voteAmount);
      // Don't give tokens for config3 - this will cause NoVotingWeight

      await votingConfig1.votingWeight.setDefaultWeight(voter1.address, voteAmount);
      await votingConfig2.votingWeight.setDefaultWeight(voter1.address, voteAmount);
      // Config3 will have 0 weight

      // Try to vote with all three configs - should fail on config index 2
      const multiConfigVoteData: IVotingTypes.VotingConfigVoteDataStruct[] = [
        { configIndex: 0, voteData: '0x' },
        { configIndex: 1, voteData: '0x' },
        { configIndex: 2, voteData: '0x' }, // This will fail
      ];

      await expect(azoriusFreezeVoting.connect(voter1).castFreezeVote(multiConfigVoteData, 0n))
        .to.be.revertedWithCustomError(azoriusFreezeVoting, 'NoVotingWeight')
        .withArgs(2, '0x'); // Config index 2 has no weight
    });
  });

  // Placeholder for isFrozen tests
  describe('isFrozen', () => {
    it('should correctly report freeze status', async () => {
      // Test will go here
    });
  });

  // Placeholder for unfreeze tests
  describe('unfreeze', () => {
    it('should allow owner to unfreeze', async () => {
      // Test will go here
    });
  });

  describe('Version', () => {
    it('should return the correct version', async () => {
      expect(await azoriusFreezeVoting.version()).to.equal(1);
    });
  });

  describe('ERC165 supportsInterface', () => {
    runSupportsInterfaceTests({
      getContract: () => azoriusFreezeVoting,
      supportedInterfaceFactories: [
        IFreezeVotingAzoriusV1__factory,
        IFreezeVotingBase__factory,
        IFreezable__factory,
        IVersion__factory,
        IERC165__factory,
        ILightAccountValidator__factory,
        IDeploymentBlock__factory,
      ],
    });
  });

  describe('Deployment Block', () => {
    runDeploymentBlockTests({
      getContract: () => azoriusFreezeVoting,
    });
  });

  describe('InitializerEventEmitter', () => {
    runInitializerEventEmitterTests({
      contractFactory: FreezeVotingAzoriusV1__factory,
      masterCopy: () => azoriusFreezeVotingImplementationAddress,
      deployer: () => deployer,
      initializeParams: async () => [
        owner.address,
        DEFAULT_FREEZE_VOTES_THRESHOLD,
        DEFAULT_FREEZE_PROPOSAL_PERIOD,
        await mockParentAzorius.getAddress(),
        mockLightAccountFactory.target as string,
      ],
      getExpectedInitData: async () =>
        ethers.AbiCoder.defaultAbiCoder().encode(
          ['address', 'uint256', 'uint32', 'address', 'address'],
          [
            owner.address,
            DEFAULT_FREEZE_VOTES_THRESHOLD,
            DEFAULT_FREEZE_PROPOSAL_PERIOD,
            await mockParentAzorius.getAddress(),
            mockLightAccountFactory.target as string,
          ],
        ),
    });
  });
});
