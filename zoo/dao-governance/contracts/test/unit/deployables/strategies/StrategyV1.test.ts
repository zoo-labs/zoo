import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { time } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  ERC1967Proxy__factory,
  IDeploymentBlock__factory,
  IERC165__factory,
  ILightAccountValidator__factory,
  IStrategyV1__factory,
  IVersion__factory,
  MockERC20Votes,
  MockERC721,
  MockLightAccount__factory,
  MockLightAccountFactory,
  MockLightAccountFactory__factory,
  MockProposerAdapter,
  MockProposerAdapter__factory,
  StrategyV1,
  StrategyV1__factory,
} from '../../../../typechain-types';
import {
  IStrategyV1,
  IVotingTypes,
} from '../../../../typechain-types/contracts/interfaces/dao/deployables/IStrategyV1';
import {
  deployMockERC20VotingConfig,
  deployMockERC721VotingConfig,
  encodeERC721VoteData,
  setupMockERC20Token,
  setupMockERC721Tokens,
  MockVotingConfigContracts,
} from '../../../helpers/votingConfigHelpers';
import { runDeploymentBlockTests } from '../../shared/deploymentBlockTests';
import { runSupportsInterfaceTests } from '../../shared/supportsInterfaceTests';

describe('StrategyV1', () => {
  // Signers
  let deployer: SignerWithAddress;
  let strategyAdmin: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let user1: SignerWithAddress;
  let voter1: SignerWithAddress, voter2: SignerWithAddress, voter3: SignerWithAddress;

  // Contract Instances
  let strategyImplementation: StrategyV1;
  let strategy: StrategyV1;
  let erc20VotingConfig: MockVotingConfigContracts;
  let erc721VotingConfig: MockVotingConfigContracts;
  let mockProposerAdapter1: MockProposerAdapter;
  let mockProposerAdapter2: MockProposerAdapter;
  let lightAccountFactoryMock: MockLightAccountFactory;
  let lightAccountFactoryMockAddress: string;

  // Default Initialization Parameters for StrategyV1
  const DEFAULT_VOTING_PERIOD = 100; // Example value
  const DEFAULT_QUORUM_THRESHOLD = 1n;
  const DEFAULT_BASIS_NUMERATOR = 500_001n;
  let defaultInitialVotingConfigs: IStrategyV1.VotingConfigStruct[];
  let defaultInitialProposerAdapters: string[];

  async function deployStrategyProxy(
    strategyAdminAddress: string,
    votingPeriod: number,
    quorumThreshold: bigint,
    basisNumerator: bigint,
    initialVotingConfigs: IStrategyV1.VotingConfigStruct[],
    initialProposerAdaptersAddresses: string[],
    lightAccountFactoryAddress: string,
  ): Promise<StrategyV1> {
    const initializeCalldata = strategyImplementation.interface.encodeFunctionData('initialize', [
      votingPeriod,
      quorumThreshold,
      basisNumerator,
      initialProposerAdaptersAddresses,
      lightAccountFactoryAddress,
    ]);
    const proxy = await new ERC1967Proxy__factory(deployer).deploy(
      await strategyImplementation.getAddress(),
      initializeCalldata,
    );
    const strategyInstance = StrategyV1__factory.connect(await proxy.getAddress(), deployer);
    await strategyInstance.initialize2(strategyAdminAddress, initialVotingConfigs);
    return strategyInstance;
  }

  beforeEach(async () => {
    [deployer, strategyAdmin, nonOwner, user1, voter2, voter3] = await ethers.getSigners();
    voter1 = user1; // Alias for clarity in some tests

    strategyImplementation = await new StrategyV1__factory(deployer).deploy();
    await strategyImplementation.waitForDeployment();

    lightAccountFactoryMock = await new MockLightAccountFactory__factory(deployer).deploy();
    await lightAccountFactoryMock.waitForDeployment();
    lightAccountFactoryMockAddress = lightAccountFactoryMock.target as string;

    // Deploy proposer adapters first
    mockProposerAdapter1 = await new MockProposerAdapter__factory(deployer).deploy();
    await mockProposerAdapter1.waitForDeployment();
    mockProposerAdapter2 = await new MockProposerAdapter__factory(deployer).deploy();
    await mockProposerAdapter2.waitForDeployment();
    defaultInitialProposerAdapters = [await mockProposerAdapter1.getAddress()];

    // First deploy the strategy WITHOUT voting configs using only initialize
    const initializeCalldata = strategyImplementation.interface.encodeFunctionData('initialize', [
      DEFAULT_VOTING_PERIOD,
      DEFAULT_QUORUM_THRESHOLD,
      DEFAULT_BASIS_NUMERATOR,
      defaultInitialProposerAdapters,
      lightAccountFactoryMockAddress,
    ]);
    const strategyProxy = await new ERC1967Proxy__factory(deployer).deploy(
      await strategyImplementation.getAddress(),
      initializeCalldata,
    );
    strategy = StrategyV1__factory.connect(await strategyProxy.getAddress(), deployer);

    // Now deploy mock voting configs with the actual strategy address
    erc20VotingConfig = await deployMockERC20VotingConfig(await strategy.getAddress());
    erc721VotingConfig = await deployMockERC721VotingConfig(await strategy.getAddress());

    // Set up default voting configs for initialize2
    defaultInitialVotingConfigs = [
      {
        votingWeight: await erc20VotingConfig.votingWeight.getAddress(),
        voteTracker: await erc20VotingConfig.voteTracker.getAddress(),
      },
    ];

    // Now call initialize2 to set the strategy admin and voting configs
    await strategy.initialize2(strategyAdmin.address, defaultInitialVotingConfigs);
  });

  describe('Initialize', () => {
    it('should initialize StrategyV1 correctly with valid parameters', async () => {
      const votingConfigs = [
        {
          votingWeight: await erc20VotingConfig.votingWeight.getAddress(),
          voteTracker: await erc20VotingConfig.voteTracker.getAddress(),
        },
        {
          votingWeight: await erc721VotingConfig.votingWeight.getAddress(),
          voteTracker: await erc721VotingConfig.voteTracker.getAddress(),
        },
      ];
      const initialProposerAdapters = [
        await mockProposerAdapter1.getAddress(),
        await mockProposerAdapter2.getAddress(),
      ];

      const testStrategy = await deployStrategyProxy(
        strategyAdmin.address,
        DEFAULT_VOTING_PERIOD,
        DEFAULT_QUORUM_THRESHOLD,
        DEFAULT_BASIS_NUMERATOR,
        votingConfigs,
        initialProposerAdapters,
        lightAccountFactoryMockAddress,
      );

      expect(await testStrategy.strategyAdmin()).to.equal(strategyAdmin.address);
      expect(await testStrategy.votingPeriod()).to.equal(DEFAULT_VOTING_PERIOD);
      expect(await testStrategy.quorumThreshold()).to.equal(DEFAULT_QUORUM_THRESHOLD);
      expect(await testStrategy.basisNumerator()).to.equal(DEFAULT_BASIS_NUMERATOR);

      // Check voting configs
      const configs = await testStrategy.votingConfigs();
      expect(configs.length).to.equal(2);
      expect(configs[0].votingWeight).to.equal(votingConfigs[0].votingWeight);
      expect(configs[0].voteTracker).to.equal(votingConfigs[0].voteTracker);
      expect(configs[1].votingWeight).to.equal(votingConfigs[1].votingWeight);
      expect(configs[1].voteTracker).to.equal(votingConfigs[1].voteTracker);
    });

    it('should revert if no voting configs are provided', async () => {
      await expect(
        deployStrategyProxy(
          strategyAdmin.address,
          DEFAULT_VOTING_PERIOD,
          DEFAULT_QUORUM_THRESHOLD,
          DEFAULT_BASIS_NUMERATOR,
          [],
          [await mockProposerAdapter1.getAddress()],
          lightAccountFactoryMockAddress,
        ),
      ).to.be.revertedWithCustomError(strategy, 'NoVotingConfigs');
    });

    it('should revert if no proposer adapters are provided', async () => {
      const initializeCalldata = strategyImplementation.interface.encodeFunctionData('initialize', [
        DEFAULT_VOTING_PERIOD,
        DEFAULT_QUORUM_THRESHOLD,
        DEFAULT_BASIS_NUMERATOR,
        [],
        lightAccountFactoryMockAddress,
      ]);
      await expect(
        new ERC1967Proxy__factory(deployer).deploy(
          await strategyImplementation.getAddress(),
          initializeCalldata,
        ),
      ).to.be.revertedWithCustomError(strategy, 'NoProposerAdapters');
    });

    it('Should revert if basis numerator is invalid', async () => {
      // Test with basisNumerator < 500_000
      const initializeCalldata = strategyImplementation.interface.encodeFunctionData('initialize', [
        DEFAULT_VOTING_PERIOD,
        DEFAULT_QUORUM_THRESHOLD,
        499_999n,
        [await mockProposerAdapter1.getAddress()],
        lightAccountFactoryMockAddress,
      ]);
      await expect(
        new ERC1967Proxy__factory(deployer).deploy(
          await strategyImplementation.getAddress(),
          initializeCalldata,
        ),
      ).to.be.revertedWithCustomError(strategy, 'InvalidBasisNumerator');

      // Test with basisNumerator >= 1_000_000
      const initializeCalldata2 = strategyImplementation.interface.encodeFunctionData(
        'initialize',
        [
          DEFAULT_VOTING_PERIOD,
          DEFAULT_QUORUM_THRESHOLD,
          1_000_000n,
          [await mockProposerAdapter1.getAddress()],
          lightAccountFactoryMockAddress,
        ],
      );
      await expect(
        new ERC1967Proxy__factory(deployer).deploy(
          await strategyImplementation.getAddress(),
          initializeCalldata2,
        ),
      ).to.be.revertedWithCustomError(strategy, 'InvalidBasisNumerator');
    });
  });

  describe('votingConfigs', () => {
    it('Should return the correct voting configs', async () => {
      const configs = await strategy.votingConfigs();
      expect(configs.length).to.equal(1);
      // Check against the default configs used in beforeEach
      expect(configs[0].votingWeight).to.equal(defaultInitialVotingConfigs[0].votingWeight);
      expect(configs[0].voteTracker).to.equal(defaultInitialVotingConfigs[0].voteTracker);
    });
  });

  describe('Vote Casting', () => {
    let proposalId: number;
    const voteAmount = ethers.parseEther('100');
    let voteCastingStrategy: StrategyV1;
    let voteCastingERC20Config: MockVotingConfigContracts;

    beforeEach(async () => {
      // First deploy strategy without voting configs
      const initializeCalldata = strategyImplementation.interface.encodeFunctionData('initialize', [
        DEFAULT_VOTING_PERIOD,
        DEFAULT_QUORUM_THRESHOLD,
        DEFAULT_BASIS_NUMERATOR,
        defaultInitialProposerAdapters,
        lightAccountFactoryMockAddress,
      ]);
      const voteCastingStrategyProxy = await new ERC1967Proxy__factory(deployer).deploy(
        await strategyImplementation.getAddress(),
        initializeCalldata,
      );
      voteCastingStrategy = StrategyV1__factory.connect(
        await voteCastingStrategyProxy.getAddress(),
        deployer,
      );

      // Deploy mock voting config with the strategy address
      voteCastingERC20Config = await deployMockERC20VotingConfig(
        await voteCastingStrategy.getAddress(),
      );

      // Now call initialize2 with strategy admin and voting configs
      await voteCastingStrategy.initialize2(strategyAdmin.address, [
        {
          votingWeight: await voteCastingERC20Config.votingWeight.getAddress(),
          voteTracker: await voteCastingERC20Config.voteTracker.getAddress(),
        },
      ]);

      // Setup mock ERC20 tokens for voters BEFORE initializing proposal
      const erc20Token = voteCastingERC20Config.token as MockERC20Votes;
      await setupMockERC20Token(erc20Token, voter1, voteAmount);
      await setupMockERC20Token(erc20Token, voter2, voteAmount);

      // Mine a block to ensure delegation takes effect
      await time.increase(1);

      // NOW initialize a proposal - this sets votingStartTimestamp
      proposalId = 1;
      await voteCastingStrategy.connect(strategyAdmin).initializeProposal(proposalId);

      // Get the proposal start timestamp and set mock weights
      const voteCastingDetails = await voteCastingStrategy.proposalVotingDetails(proposalId);
      const votingWeight = voteCastingERC20Config.votingWeight;
      await votingWeight.setMockWeight(
        voter1.address,
        voteCastingDetails.votingStartTimestamp,
        voteAmount,
      );
      await votingWeight.setMockWeight(
        voter2.address,
        voteCastingDetails.votingStartTimestamp,
        voteAmount,
      );
    });

    it('Should allow voting with ERC20 config', async () => {
      const voteData: IVotingTypes.VotingConfigVoteDataStruct = {
        configIndex: 0,
        voteData: '0x', // Empty for ERC20
      };

      await expect(voteCastingStrategy.connect(voter1).castVote(proposalId, 1, [voteData], 0))
        .to.emit(voteCastingStrategy, 'Voted')
        .withArgs(voter1.address, proposalId, 1, voteAmount);

      const proposalDetails = await voteCastingStrategy.proposalVotingDetails(proposalId);
      expect(proposalDetails.yesVotes).to.equal(voteAmount);
    });

    it('Should prevent double voting with same config', async () => {
      const voteData = {
        configIndex: 0,
        voteData: '0x',
      };

      await voteCastingStrategy.connect(voter1).castVote(proposalId, 1, [voteData], 0);

      await expect(
        voteCastingStrategy.connect(voter1).castVote(proposalId, 1, [voteData], 0),
      ).to.be.revertedWithCustomError(voteCastingERC20Config.voteTracker, 'AlreadyVoted');
    });

    it('Should allow voting with multiple configs', async () => {
      // First deploy strategy without voting configs
      const initializeCalldata = strategyImplementation.interface.encodeFunctionData('initialize', [
        DEFAULT_VOTING_PERIOD,
        DEFAULT_QUORUM_THRESHOLD,
        DEFAULT_BASIS_NUMERATOR,
        defaultInitialProposerAdapters,
        lightAccountFactoryMockAddress,
      ]);
      const multiConfigStrategyProxy = await new ERC1967Proxy__factory(deployer).deploy(
        await strategyImplementation.getAddress(),
        initializeCalldata,
      );
      const multiConfigStrategy = StrategyV1__factory.connect(
        await multiConfigStrategyProxy.getAddress(),
        deployer,
      );

      // Deploy two mock voting configs with the strategy address
      const config1 = await deployMockERC20VotingConfig(await multiConfigStrategy.getAddress());
      const config2 = await deployMockERC20VotingConfig(await multiConfigStrategy.getAddress());

      // Setup tokens for both configs BEFORE initializing proposal
      await setupMockERC20Token(config1.token as MockERC20Votes, voter1, voteAmount);
      await setupMockERC20Token(config2.token as MockERC20Votes, voter1, voteAmount);

      // Mine a block to ensure delegation takes effect
      await time.increase(1);

      // Now call initialize2 with both configs
      await multiConfigStrategy.initialize2(strategyAdmin.address, [
        {
          votingWeight: await config1.votingWeight.getAddress(),
          voteTracker: await config1.voteTracker.getAddress(),
        },
        {
          votingWeight: await config2.votingWeight.getAddress(),
          voteTracker: await config2.voteTracker.getAddress(),
        },
      ]);

      // NOW initialize proposal
      await multiConfigStrategy.connect(strategyAdmin).initializeProposal(proposalId);

      // Set mock weights for both configs
      const multiConfigDetails = await multiConfigStrategy.proposalVotingDetails(proposalId);
      await config1.votingWeight.setMockWeight(
        voter1.address,
        multiConfigDetails.votingStartTimestamp,
        voteAmount,
      );
      await config2.votingWeight.setMockWeight(
        voter1.address,
        multiConfigDetails.votingStartTimestamp,
        voteAmount,
      );

      const voteData: IVotingTypes.VotingConfigVoteDataStruct[] = [
        { configIndex: 0, voteData: '0x' },
        { configIndex: 1, voteData: '0x' },
      ];

      await expect(multiConfigStrategy.connect(voter1).castVote(proposalId, 1, voteData, 0))
        .to.emit(multiConfigStrategy, 'Voted')
        .withArgs(voter1.address, proposalId, 1, voteAmount * 2n);
    });

    it('Should handle ERC721 voting', async () => {
      // First deploy strategy without voting configs
      const initializeCalldata = strategyImplementation.interface.encodeFunctionData('initialize', [
        DEFAULT_VOTING_PERIOD,
        DEFAULT_QUORUM_THRESHOLD,
        DEFAULT_BASIS_NUMERATOR,
        defaultInitialProposerAdapters,
        lightAccountFactoryMockAddress,
      ]);
      const nftStrategyProxy = await new ERC1967Proxy__factory(deployer).deploy(
        await strategyImplementation.getAddress(),
        initializeCalldata,
      );
      const nftStrategy = StrategyV1__factory.connect(
        await nftStrategyProxy.getAddress(),
        deployer,
      );

      // Deploy mock ERC721 voting config with the strategy address
      const nftConfig = await deployMockERC721VotingConfig(await nftStrategy.getAddress());

      // Mint NFTs to voter BEFORE initializing proposal
      const nftToken = nftConfig.token as MockERC721;
      await setupMockERC721Tokens(nftToken, voter1, [1, 2, 3]);

      // Mine a block
      await time.increase(1);

      // Now call initialize2 with the config
      await nftStrategy.initialize2(strategyAdmin.address, [
        {
          votingWeight: await nftConfig.votingWeight.getAddress(),
          voteTracker: await nftConfig.voteTracker.getAddress(),
        },
      ]);

      // NOW initialize proposal
      await nftStrategy.connect(strategyAdmin).initializeProposal(proposalId);

      // Set mock weight for NFT voting
      const nftDetails = await nftStrategy.proposalVotingDetails(proposalId);
      const expectedWeight = 3n; // 3 NFTs * 1 weight per NFT
      await nftConfig.votingWeight.setMockWeight(
        voter1.address,
        nftDetails.votingStartTimestamp,
        expectedWeight,
      );

      const voteData = {
        configIndex: 0,
        voteData: encodeERC721VoteData([1, 2, 3]),
      };
      await expect(nftStrategy.connect(voter1).castVote(proposalId, 1, [voteData], 0))
        .to.emit(nftStrategy, 'Voted')
        .withArgs(voter1.address, proposalId, 1, expectedWeight);
    });

    it('Should emit VotingPeriodEnded event on first vote after period ends', async () => {
      await time.increase(DEFAULT_VOTING_PERIOD + 1);

      const voteData = {
        configIndex: 0,
        voteData: '0x',
      };

      // First vote after period ends should emit event but not revert
      await expect(voteCastingStrategy.connect(voter1).castVote(proposalId, 1, [voteData], 0))
        .to.emit(voteCastingStrategy, 'VotingPeriodEnded')
        .withArgs(proposalId);

      // Second vote should revert
      await expect(
        voteCastingStrategy.connect(voter2).castVote(proposalId, 1, [voteData], 0),
      ).to.be.revertedWithCustomError(voteCastingStrategy, 'ProposalNotActive');
    });

    it('Should revert with invalid vote type', async () => {
      const voteData = {
        configIndex: 0,
        voteData: '0x',
      };

      await expect(
        voteCastingStrategy.connect(voter1).castVote(proposalId, 3, [voteData], 0),
      ).to.be.revertedWithCustomError(voteCastingStrategy, 'InvalidVoteType');
    });

    it('Should revert with invalid config index', async () => {
      const voteData = {
        configIndex: 99, // Invalid index
        voteData: '0x',
      };

      await expect(
        voteCastingStrategy.connect(voter1).castVote(proposalId, 1, [voteData], 0),
      ).to.be.revertedWithCustomError(voteCastingStrategy, 'InvalidVotingConfig');
    });

    it('Should revert when voter has no voting weight', async () => {
      const voteData = {
        configIndex: 0,
        voteData: '0x',
      };

      await expect(
        voteCastingStrategy.connect(voter3).castVote(proposalId, 1, [voteData], 0), // voter3 has no tokens
      ).to.be.revertedWithCustomError(voteCastingStrategy, 'NoVotingWeight');
    });
  });

  describe('Proposal Management', () => {
    describe('initializeProposal', () => {
      it('Should initialize proposal correctly', async () => {
        const proposalId = 1;
        const tx = await strategy.connect(strategyAdmin).initializeProposal(proposalId);

        const block = await ethers.provider.getBlock(tx.blockNumber!);
        const expectedEndTime = block!.timestamp + DEFAULT_VOTING_PERIOD;

        await expect(tx)
          .to.emit(strategy, 'ProposalInitialized')
          .withArgs(proposalId, block!.timestamp, expectedEndTime, block!.number);

        const details = await strategy.proposalVotingDetails(proposalId);
        expect(details.votingStartTimestamp).to.equal(block!.timestamp);
        expect(details.votingEndTimestamp).to.equal(expectedEndTime);
        expect(details.votingStartBlock).to.equal(block!.number);
      });

      it('Should revert when non-admin initializes proposal', async () => {
        await expect(
          strategy.connect(nonOwner).initializeProposal(1),
        ).to.be.revertedWithCustomError(strategy, 'InvalidStrategyAdmin');
      });
    });

    describe('isPassed', () => {
      let proposalId: number;
      const voteAmount = ethers.parseEther('100');

      beforeEach(async () => {
        // Setup mock tokens BEFORE initializing proposal
        const erc20Token = erc20VotingConfig.token as MockERC20Votes;
        await setupMockERC20Token(erc20Token, voter1, voteAmount);
        await setupMockERC20Token(erc20Token, voter2, voteAmount);

        // Mine a block to ensure delegation takes effect
        await time.increase(1);

        // NOW initialize proposal
        proposalId = 1;
        await strategy.connect(strategyAdmin).initializeProposal(proposalId);

        // Set mock weights
        const isPassedDetails = await strategy.proposalVotingDetails(proposalId);
        const votingWeight = erc20VotingConfig.votingWeight;
        await votingWeight.setMockWeight(
          voter1.address,
          isPassedDetails.votingStartTimestamp,
          voteAmount,
        );
        await votingWeight.setMockWeight(
          voter2.address,
          isPassedDetails.votingStartTimestamp,
          voteAmount,
        );
      });

      it('Should return false when voting period not ended', async () => {
        const voteData = { configIndex: 0, voteData: '0x' };
        await strategy.connect(voter1).castVote(proposalId, 1, [voteData], 0);

        expect(await strategy.isPassed(proposalId)).to.be.false;
      });

      it('Should return true when proposal passes', async () => {
        const voteData = { configIndex: 0, voteData: '0x' };
        await strategy.connect(voter1).castVote(proposalId, 1, [voteData], 0);

        await time.increase(DEFAULT_VOTING_PERIOD + 1);

        expect(await strategy.isPassed(proposalId)).to.be.true;
      });

      it('Should return false when quorum not met', async () => {
        await time.increase(DEFAULT_VOTING_PERIOD + 1);
        expect(await strategy.isPassed(proposalId)).to.be.false;
      });

      it('Should return false when basis not met', async () => {
        const voteData = { configIndex: 0, voteData: '0x' };
        await strategy.connect(voter1).castVote(proposalId, 0, [voteData], 0); // NO vote
        await strategy.connect(voter2).castVote(proposalId, 1, [voteData], 0); // YES vote

        await time.increase(DEFAULT_VOTING_PERIOD + 1);

        // 50/50 split doesn't meet >50% requirement
        expect(await strategy.isPassed(proposalId)).to.be.false;
      });
    });
  });

  describe('Freeze Voter Management', () => {
    let freezeVoter: SignerWithAddress;

    beforeEach(async () => {
      [freezeVoter] = await ethers.getSigners();
    });

    describe('addAuthorizedFreezeVoter', () => {
      it('Should add freeze voter correctly', async () => {
        await expect(strategy.connect(strategyAdmin).addAuthorizedFreezeVoter(freezeVoter.address))
          .to.emit(strategy, 'FreezeVoterAuthorizationChanged')
          .withArgs(freezeVoter.address, true);

        expect(await strategy.isAuthorizedFreezeVoter(freezeVoter.address)).to.be.true;

        const freezeVoters = await strategy.authorizedFreezeVoters();
        expect(freezeVoters).to.include(freezeVoter.address);
      });

      it('Should revert when non-admin adds freeze voter', async () => {
        await expect(
          strategy.connect(nonOwner).addAuthorizedFreezeVoter(freezeVoter.address),
        ).to.be.revertedWithCustomError(strategy, 'InvalidStrategyAdmin');
      });

      it('Should revert when adding zero address', async () => {
        await expect(
          strategy.connect(strategyAdmin).addAuthorizedFreezeVoter(ethers.ZeroAddress),
        ).to.be.revertedWithCustomError(strategy, 'InvalidAddress');
      });
    });

    describe('removeAuthorizedFreezeVoter', () => {
      beforeEach(async () => {
        await strategy.connect(strategyAdmin).addAuthorizedFreezeVoter(freezeVoter.address);
      });

      it('Should remove freeze voter correctly', async () => {
        await expect(
          strategy.connect(strategyAdmin).removeAuthorizedFreezeVoter(freezeVoter.address),
        )
          .to.emit(strategy, 'FreezeVoterAuthorizationChanged')
          .withArgs(freezeVoter.address, false);

        expect(await strategy.isAuthorizedFreezeVoter(freezeVoter.address)).to.be.false;

        const freezeVoters = await strategy.authorizedFreezeVoters();
        expect(freezeVoters).to.not.include(freezeVoter.address);
      });

      it('Should revert when non-admin removes freeze voter', async () => {
        await expect(
          strategy.connect(nonOwner).removeAuthorizedFreezeVoter(freezeVoter.address),
        ).to.be.revertedWithCustomError(strategy, 'InvalidStrategyAdmin');
      });

      it('Should revert when removing zero address', async () => {
        await expect(
          strategy.connect(strategyAdmin).removeAuthorizedFreezeVoter(ethers.ZeroAddress),
        ).to.be.revertedWithCustomError(strategy, 'InvalidAddress');
      });
    });
  });

  describe('Light Account Integration', () => {
    let lightAccount: any;
    let lightAccountOwner: SignerWithAddress;

    beforeEach(async () => {
      lightAccountOwner = voter1;

      // Create mock light account
      const lightAccountAddress = ethers.getCreateAddress({
        from: lightAccountFactoryMock.target as string,
        nonce: 0,
      });

      // Set up the mock factory to return this address
      await lightAccountFactoryMock.setAccountAddress(
        lightAccountOwner.address,
        0,
        lightAccountAddress,
      );

      // Deploy the mock light account
      const MockLightAccount = await ethers.getContractFactory('MockLightAccount');
      const mockLightAccount = await MockLightAccount.deploy(lightAccountOwner.address);
      await mockLightAccount.waitForDeployment();

      // Update factory to return the deployed address
      await lightAccountFactoryMock.setAccountAddress(
        lightAccountOwner.address,
        0,
        await mockLightAccount.getAddress(),
      );

      lightAccount = MockLightAccount__factory.connect(
        await mockLightAccount.getAddress(),
        lightAccountOwner,
      );
    });

    it('Should resolve light account owner correctly', async () => {
      // Setup mock tokens for light account owner BEFORE initializing proposal
      const erc20Token = erc20VotingConfig.token as MockERC20Votes;
      await setupMockERC20Token(erc20Token, lightAccountOwner, ethers.parseEther('100'));

      // Mine a block to ensure delegation takes effect
      await time.increase(1);

      // NOW initialize proposal
      const proposalId = 1;
      await strategy.connect(strategyAdmin).initializeProposal(proposalId);

      // Set mock weight
      const lightAccountDetails = await strategy.proposalVotingDetails(proposalId);
      const votingWeight = erc20VotingConfig.votingWeight;
      await votingWeight.setMockWeight(
        lightAccountOwner.address,
        lightAccountDetails.votingStartTimestamp,
        ethers.parseEther('100'),
      );

      const voteData = { configIndex: 0, voteData: '0x' };

      // Vote through light account
      await lightAccount.callStrategyVote(
        await strategy.getAddress(),
        proposalId,
        1,
        [voteData],
        0,
      );

      const details = await strategy.proposalVotingDetails(proposalId);
      expect(details.yesVotes).to.equal(ethers.parseEther('100'));
    });
  });

  describe('validStrategyVote', () => {
    let proposalId: number;
    const voteAmount = ethers.parseEther('100');

    beforeEach(async () => {
      // Setup mock tokens BEFORE initializing proposal
      const erc20Token = erc20VotingConfig.token as MockERC20Votes;
      await setupMockERC20Token(erc20Token, voter1, voteAmount);

      // Mine a block to ensure delegation takes effect
      await time.increase(1);

      // NOW initialize proposal
      proposalId = 1;
      await strategy.connect(strategyAdmin).initializeProposal(proposalId);

      // Set mock weight for voter1
      const validVoteDetails = await strategy.proposalVotingDetails(proposalId);
      const votingWeight = erc20VotingConfig.votingWeight;
      await votingWeight.setMockWeight(
        voter1.address,
        validVoteDetails.votingStartTimestamp,
        voteAmount,
      );
    });

    it('Should return true for valid vote configuration', async () => {
      const voteData = { configIndex: 0, voteData: '0x' };

      expect(await strategy.validStrategyVote(voter1.address, proposalId, 1, [voteData])).to.be
        .true;
    });

    it('Should return false when no voting configs provided', async () => {
      expect(await strategy.validStrategyVote(voter1.address, proposalId, 1, [])).to.be.false;
    });

    it('Should return false for already voted config', async () => {
      const voteData = { configIndex: 0, voteData: '0x' };

      // Cast vote first
      await strategy.connect(voter1).castVote(proposalId, 1, [voteData], 0);

      // Check validity - should be false now
      expect(await strategy.validStrategyVote(voter1.address, proposalId, 1, [voteData])).to.be
        .false;
    });

    it('Should return false for zero voting weight', async () => {
      const voteData = { configIndex: 0, voteData: '0x' };

      expect(
        await strategy.validStrategyVote(
          voter3.address, // voter3 has no tokens
          proposalId,
          1,
          [voteData],
        ),
      ).to.be.false;
    });

    it('Should return false after someone tried voting after period ended', async () => {
      await time.increase(DEFAULT_VOTING_PERIOD + 1);

      const voteData = { configIndex: 0, voteData: '0x' };

      // First attempt to vote after period ends - this will set the flag
      await strategy.connect(voter1).castVote(proposalId, 1, [voteData], 0);

      // Now validStrategyVote should return false because the flag is set
      expect(await strategy.validStrategyVote(voter2.address, proposalId, 1, [voteData])).to.be
        .false;
    });
  });

  runDeploymentBlockTests({
    getContract: () => strategy,
  });

  // Skip InitializerEventEmitter tests for now as StrategyV1 has a two-step initialization
  // and the test framework expects a single initialize function

  runSupportsInterfaceTests({
    getContract: () => strategy,
    supportedInterfaceFactories: [
      IStrategyV1__factory,
      ILightAccountValidator__factory,
      IVersion__factory,
      IDeploymentBlock__factory,
      IERC165__factory,
    ],
  });
});
