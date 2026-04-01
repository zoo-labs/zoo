import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { loadFixture, time } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  ERC1967Proxy__factory,
  FreezeVotingStandaloneV1,
  FreezeVotingStandaloneV1__factory,
  IDeploymentBlock__factory,
  IERC165__factory,
  IFreezeVotingBase__factory,
  IFreezable__factory,
  IFreezeVotingStandaloneV1__factory,
  ILightAccountValidator__factory,
  IVersion__factory,
  MockLightAccountFactory,
  MockLightAccountFactory__factory,
  MockVoteTracker__factory,
  MockVotingWeight,
  MockVotingWeight__factory,
} from '../../../../typechain-types';
import { IVotingTypes } from '../../../../typechain-types/contracts/interfaces/dao/deployables/IFreezeVotingStandaloneV1';
import { runDeploymentBlockTests } from '../../shared/deploymentBlockTests';
import { runInitializerEventEmitterTests } from '../../shared/initializerEventEmitterTests';
import { runSupportsInterfaceTests } from '../../shared/supportsInterfaceTests';

async function deployStandaloneFreezeVotingProxy(
  proxyDeployer: SignerWithAddress,
  implementationAddress: string,
  freezeVotesThreshold: bigint,
  unfreezeVotesThreshold: bigint,
  freezeProposalPeriod: number,
  unfreezeProposalPeriod: number,
  lightAccountFactoryAddress: string,
  votingConfigs: IVotingTypes.VotingConfigStruct[],
): Promise<FreezeVotingStandaloneV1> {
  const initData = FreezeVotingStandaloneV1__factory.createInterface().encodeFunctionData(
    'initialize',
    [
      freezeVotesThreshold,
      unfreezeVotesThreshold,
      freezeProposalPeriod,
      unfreezeProposalPeriod,
      lightAccountFactoryAddress,
    ],
  );
  const proxy = await new ERC1967Proxy__factory(proxyDeployer).deploy(
    implementationAddress,
    initData,
  );
  await proxy.waitForDeployment();
  const freezeVoting = FreezeVotingStandaloneV1__factory.connect(
    await proxy.getAddress(),
    proxyDeployer,
  );

  // Step 2: Set voting configs
  if (votingConfigs.length > 0) {
    await freezeVoting.initialize2(votingConfigs);
  }

  return freezeVoting;
}

describe('FreezeVotingStandaloneV1', () => {
  let deployer: SignerWithAddress;
  let voter1: SignerWithAddress;
  let voter2: SignerWithAddress;
  let voter3: SignerWithAddress;

  let standaloneFreezeVoting: FreezeVotingStandaloneV1;
  let mockVotingWeight1: MockVotingWeight;
  let mockLightAccountFactory: MockLightAccountFactory;
  let votingConfig1: IVotingTypes.VotingConfigStruct;
  let votingConfig2: IVotingTypes.VotingConfigStruct;
  let standaloneFreezeVotingImplementationAddress: string;

  const DEFAULT_FREEZE_VOTES_THRESHOLD = 100n;
  const DEFAULT_UNFREEZE_VOTES_THRESHOLD = 150n;
  const DEFAULT_FREEZE_PROPOSAL_PERIOD = 60 * 60 * 24; // 1 day
  const DEFAULT_UNFREEZE_PROPOSAL_PERIOD = 60 * 60 * 24 * 2; // 2 days

  async function fixture() {
    const [d, s, v1, v2, v3, nv] = await ethers.getSigners();

    const implFactory = new FreezeVotingStandaloneV1__factory(d);
    const impl = await implFactory.deploy();
    await impl.waitForDeployment();
    const implAddr = await impl.getAddress();

    // Deploy vote trackers
    const mockVoteTrackerFactory = new MockVoteTracker__factory(d);
    const mVoteTracker1 = await mockVoteTrackerFactory.deploy();
    await mVoteTracker1.waitForDeployment();
    const mVoteTracker2 = await mockVoteTrackerFactory.deploy();
    await mVoteTracker2.waitForDeployment();

    // Deploy voting weights
    const mockVotingWeightFactory = new MockVotingWeight__factory(d);
    const mVotingWeight1 = await mockVotingWeightFactory.deploy();
    await mVotingWeight1.waitForDeployment();
    const mVotingWeight2 = await mockVotingWeightFactory.deploy();
    await mVotingWeight2.waitForDeployment();

    const mockLightAccountFactoryFactory = new MockLightAccountFactory__factory(d);
    const mLightAccountFactory = await mockLightAccountFactoryFactory.deploy();
    await mLightAccountFactory.waitForDeployment();

    // Create voting configs first
    const vConfig1: IVotingTypes.VotingConfigStruct = {
      votingWeight: await mVotingWeight1.getAddress(),
      voteTracker: await mVoteTracker1.getAddress(),
    };
    const vConfig2: IVotingTypes.VotingConfigStruct = {
      votingWeight: await mVotingWeight2.getAddress(),
      voteTracker: await mVoteTracker2.getAddress(),
    };

    const freezeVoting = await deployStandaloneFreezeVotingProxy(
      d,
      implAddr,
      DEFAULT_FREEZE_VOTES_THRESHOLD,
      DEFAULT_UNFREEZE_VOTES_THRESHOLD,
      DEFAULT_FREEZE_PROPOSAL_PERIOD,
      DEFAULT_UNFREEZE_PROPOSAL_PERIOD,
      mLightAccountFactory.target as string,
      [vConfig1, vConfig2],
    );

    // Initialize vote trackers to authorize the freeze voting contract
    await mVoteTracker1.initialize([await freezeVoting.getAddress()]);
    await mVoteTracker2.initialize([await freezeVoting.getAddress()]);

    return {
      deployer: d,
      safe: s,
      voter1: v1,
      voter2: v2,
      voter3: v3,
      nonVoter: nv,
      standaloneFreezeVoting: freezeVoting,
      mockVotingWeight1: mVotingWeight1,
      votingConfig1: vConfig1,
      votingConfig2: vConfig2,
      mockLightAccountFactory: mLightAccountFactory,
      standaloneFreezeVotingImplementationAddress: implAddr,
    };
  }

  beforeEach(async () => {
    const result = await loadFixture(fixture);
    deployer = result.deployer;
    voter1 = result.voter1;
    voter2 = result.voter2;
    voter3 = result.voter3;
    standaloneFreezeVoting = result.standaloneFreezeVoting;
    mockVotingWeight1 = result.mockVotingWeight1;
    votingConfig1 = result.votingConfig1;
    votingConfig2 = result.votingConfig2;
    mockLightAccountFactory = result.mockLightAccountFactory;
    standaloneFreezeVotingImplementationAddress =
      result.standaloneFreezeVotingImplementationAddress;
  });

  describe('Initialization', () => {
    it('should have correct initial state after both initialization steps', async () => {
      // Internal state is properly initialized (not exposed via view functions)
      expect(await standaloneFreezeVoting.unfreezeVotesThreshold()).to.equal(
        DEFAULT_UNFREEZE_VOTES_THRESHOLD,
      );
      expect(await standaloneFreezeVoting.unfreezeProposalPeriod()).to.equal(
        DEFAULT_UNFREEZE_PROPOSAL_PERIOD,
      );

      const configs = await standaloneFreezeVoting.getVotingConfigs();
      expect(configs).to.have.lengthOf(2);
      expect(configs[0].votingWeight).to.equal(votingConfig1.votingWeight);
      expect(configs[0].voteTracker).to.equal(votingConfig1.voteTracker);
      expect(configs[1].votingWeight).to.equal(votingConfig2.votingWeight);
      expect(configs[1].voteTracker).to.equal(votingConfig2.voteTracker);
    });

    it('should support two-step initialization', async () => {
      const initDataStep1 = FreezeVotingStandaloneV1__factory.createInterface().encodeFunctionData(
        'initialize',
        [
          DEFAULT_FREEZE_VOTES_THRESHOLD,
          DEFAULT_UNFREEZE_VOTES_THRESHOLD,
          DEFAULT_FREEZE_PROPOSAL_PERIOD,
          DEFAULT_UNFREEZE_PROPOSAL_PERIOD,
          mockLightAccountFactory.target as string,
        ],
      );

      const twoStepProxy = await new ERC1967Proxy__factory(deployer).deploy(
        standaloneFreezeVotingImplementationAddress,
        initDataStep1,
      );

      const twoStepFreezeVoting = FreezeVotingStandaloneV1__factory.connect(
        await twoStepProxy.getAddress(),
        deployer,
      );

      // Verify no voting configs initially
      expect(await twoStepFreezeVoting.getVotingConfigs()).to.have.lengthOf(0);

      // Create voting configs for step 2
      const mockVoteTracker = await new MockVoteTracker__factory(deployer).deploy();
      const mockVotingWeight = await new MockVotingWeight__factory(deployer).deploy();

      const vConfig: IVotingTypes.VotingConfigStruct = {
        votingWeight: await mockVotingWeight.getAddress(),
        voteTracker: await mockVoteTracker.getAddress(),
      };

      // Initialize vote tracker with freeze voting as authorized
      await mockVoteTracker.initialize([await twoStepFreezeVoting.getAddress()]);

      // Step 2: Set voting configs
      await twoStepFreezeVoting.initialize2([vConfig]);

      // Verify voting configs are now set
      const configs = await twoStepFreezeVoting.getVotingConfigs();
      expect(configs).to.have.lengthOf(1);
      expect(configs[0].votingWeight).to.equal(vConfig.votingWeight);
      expect(configs[0].voteTracker).to.equal(vConfig.voteTracker);
    });

    it('should revert if initialize2 is called twice', async () => {
      // Try to call initialize2 again on already initialized contract
      await expect(
        standaloneFreezeVoting.initialize2([votingConfig1]),
      ).to.be.revertedWithCustomError(standaloneFreezeVoting, 'InvalidInitialization');
    });
  });

  describe('Freeze Voting', () => {
    let votingConfigData: IVotingTypes.VotingConfigVoteDataStruct[];
    const voteWeight = 50n;

    beforeEach(async () => {
      // Configure mock voting weight
      await mockVotingWeight1.setWeight(voteWeight);

      const voteDataBytes = ethers.AbiCoder.defaultAbiCoder().encode(['string'], ['mockVoteData']);
      votingConfigData = [
        {
          configIndex: 0n,
          voteData: voteDataBytes,
        },
      ];
    });

    it('should create a new freeze proposal and cast vote', async () => {
      const tx = await standaloneFreezeVoting.connect(voter1).castFreezeVote(votingConfigData, 0n);

      // Verify the event was emitted
      await expect(tx).to.emit(standaloneFreezeVoting, 'FreezeProposalCreated');

      // Verify the vote was recorded (state is internal, but we can check if frozen when threshold reached)
      expect(await standaloneFreezeVoting.isFrozen()).to.be.false; // Not enough votes to freeze yet
    });

    it('should revert if already frozen', async () => {
      // First freeze the DAO
      await mockVotingWeight1.setWeight(DEFAULT_FREEZE_VOTES_THRESHOLD);
      await standaloneFreezeVoting.connect(voter1).castFreezeVote(votingConfigData, 0n);
      expect(await standaloneFreezeVoting.isFrozen()).to.be.true;

      // Try to vote again
      await expect(
        standaloneFreezeVoting.connect(voter2).castFreezeVote(votingConfigData, 0n),
      ).to.be.revertedWithCustomError(standaloneFreezeVoting, 'AlreadyFrozen');
    });

    it('should freeze DAO when threshold is reached', async () => {
      await mockVotingWeight1.setWeight(DEFAULT_FREEZE_VOTES_THRESHOLD);

      await expect(
        standaloneFreezeVoting.connect(voter1).castFreezeVote(votingConfigData, 0n),
      ).to.emit(standaloneFreezeVoting, 'DAOFrozen');

      expect(await standaloneFreezeVoting.isFrozen()).to.be.true;
    });

    it('should revert with NoVotes if voter tries to use same config twice', async () => {
      await standaloneFreezeVoting.connect(voter1).castFreezeVote(votingConfigData, 0n);

      // VoteTracker prevents double voting with same config, resulting in 0 weight
      await expect(
        standaloneFreezeVoting.connect(voter1).castFreezeVote(votingConfigData, 0n),
      ).to.be.revertedWithCustomError(standaloneFreezeVoting, 'NoVotes');
    });

    it('should create new proposal if current one expired', async () => {
      // First vote
      await standaloneFreezeVoting.connect(voter1).castFreezeVote(votingConfigData, 0n);

      // Expire the proposal
      await time.increase(DEFAULT_FREEZE_PROPOSAL_PERIOD + 1);

      // Vote again with same voter should work (new proposal)
      // This would fail with AlreadyVoted if it was the same proposal
      await expect(
        standaloneFreezeVoting.connect(voter1).castFreezeVote(votingConfigData, 0n),
      ).to.emit(standaloneFreezeVoting, 'FreezeProposalCreated');
    });
  });

  describe('Unfreeze Voting', () => {
    let votingConfigData: IVotingTypes.VotingConfigVoteDataStruct[];
    const voteWeight = 75n;

    beforeEach(async () => {
      // First freeze the DAO
      await mockVotingWeight1.setWeight(DEFAULT_FREEZE_VOTES_THRESHOLD);
      const voteDataBytes = ethers.AbiCoder.defaultAbiCoder().encode(['string'], ['mockVoteData']);
      votingConfigData = [
        {
          configIndex: 0n,
          voteData: voteDataBytes,
        },
      ];
      await standaloneFreezeVoting.connect(voter1).castFreezeVote(votingConfigData, 0n);
      expect(await standaloneFreezeVoting.isFrozen()).to.be.true;

      // Reset weight for unfreeze voting
      await mockVotingWeight1.setWeight(voteWeight);
    });

    it('should create unfreeze proposal and cast vote', async () => {
      const txPromise = standaloneFreezeVoting
        .connect(voter2)
        .castUnfreezeVote(votingConfigData, 0n);

      await expect(txPromise)
        .to.emit(standaloneFreezeVoting, 'UnfreezeProposalCreated')
        .withArgs(await ethers.provider.getBlock('latest').then(b => b!.timestamp), voter2.address);

      await expect(txPromise)
        .to.emit(standaloneFreezeVoting, 'UnfreezeVoteCast')
        .withArgs(voter2.address, voteWeight);

      expect(await standaloneFreezeVoting.getUnfreezeProposalVotes()).to.equal(voteWeight);
    });

    it('should revert if not frozen', async () => {
      // Vote to unfreeze - this should automatically unfreeze when threshold is reached
      await mockVotingWeight1.setWeight(DEFAULT_UNFREEZE_VOTES_THRESHOLD);
      await standaloneFreezeVoting.connect(voter3).castUnfreezeVote(votingConfigData, 0n);

      // Verify it's unfrozen
      expect(await standaloneFreezeVoting.isFrozen()).to.be.false;

      // Now try to vote again when not frozen
      await expect(
        standaloneFreezeVoting.connect(voter1).castUnfreezeVote(votingConfigData, 0n),
      ).to.be.revertedWithCustomError(standaloneFreezeVoting, 'NotFrozen');
    });

    it('should accumulate votes from multiple voters', async () => {
      // Set weight to 50 so two votes won't reach the 150 threshold
      await mockVotingWeight1.setWeight(50n);

      await standaloneFreezeVoting.connect(voter2).castUnfreezeVote(votingConfigData, 0n);
      const firstVotes = await standaloneFreezeVoting.getUnfreezeProposalVotes();
      expect(firstVotes).to.equal(50n);

      await standaloneFreezeVoting.connect(voter3).castUnfreezeVote(votingConfigData, 0n);
      const totalVotes = await standaloneFreezeVoting.getUnfreezeProposalVotes();
      expect(totalVotes).to.equal(100n); // 50 + 50, still below threshold

      // Verify still frozen
      expect(await standaloneFreezeVoting.isFrozen()).to.be.true;
    });

    it('should allow voter to vote on new unfreeze proposal after previous one expires', async () => {
      // Set weight to 50 so we don't reach threshold
      await mockVotingWeight1.setWeight(50n);

      // First unfreeze proposal - voter2 votes
      await standaloneFreezeVoting.connect(voter2).castUnfreezeVote(votingConfigData, 0n);
      const firstProposalVotes = await standaloneFreezeVoting.getUnfreezeProposalVotes();
      expect(firstProposalVotes).to.equal(50n);

      // Try to vote again in same proposal - VoteTracker prevents reuse of same config
      await expect(
        standaloneFreezeVoting.connect(voter2).castUnfreezeVote(votingConfigData, 0n),
      ).to.be.revertedWithCustomError(standaloneFreezeVoting, 'NoVotes');

      // Expire the proposal
      await time.increase(DEFAULT_UNFREEZE_PROPOSAL_PERIOD + 1);

      // Create new proposal by voting - voter3 creates it
      await standaloneFreezeVoting.connect(voter3).castUnfreezeVote(votingConfigData, 0n);

      // Now voter2 should be able to vote on the new proposal
      await expect(standaloneFreezeVoting.connect(voter2).castUnfreezeVote(votingConfigData, 0n))
        .not.to.be.reverted;

      // Verify votes reset and accumulated correctly
      const newProposalVotes = await standaloneFreezeVoting.getUnfreezeProposalVotes();
      expect(newProposalVotes).to.equal(100n); // Both voter2 and voter3 at 50 each

      // Verify still frozen since we haven't reached threshold
      expect(await standaloneFreezeVoting.isFrozen()).to.be.true;
    });

    it('should handle multiple proposal cycles correctly', async () => {
      // Set weight to 50 so we don't reach threshold
      await mockVotingWeight1.setWeight(50n);

      // Cycle 1: voter2 votes
      await standaloneFreezeVoting.connect(voter2).castUnfreezeVote(votingConfigData, 0n);
      expect(await standaloneFreezeVoting.getUnfreezeProposalVotes()).to.equal(50n);

      // Expire and start cycle 2
      await time.increase(DEFAULT_UNFREEZE_PROPOSAL_PERIOD + 1);
      await standaloneFreezeVoting.connect(voter2).castUnfreezeVote(votingConfigData, 0n);
      expect(await standaloneFreezeVoting.getUnfreezeProposalVotes()).to.equal(50n);

      // Expire and start cycle 3
      await time.increase(DEFAULT_UNFREEZE_PROPOSAL_PERIOD + 1);
      await standaloneFreezeVoting.connect(voter2).castUnfreezeVote(votingConfigData, 0n);
      await standaloneFreezeVoting.connect(voter3).castUnfreezeVote(votingConfigData, 0n);
      expect(await standaloneFreezeVoting.getUnfreezeProposalVotes()).to.equal(100n); // 50 + 50

      // Still frozen since threshold not reached
      expect(await standaloneFreezeVoting.isFrozen()).to.be.true;
    });
  });

  describe('Automatic Unfreeze', () => {
    let votingConfigData: IVotingTypes.VotingConfigVoteDataStruct[];

    beforeEach(async () => {
      // Freeze the DAO first
      await mockVotingWeight1.setWeight(DEFAULT_FREEZE_VOTES_THRESHOLD);
      const voteDataBytes = ethers.AbiCoder.defaultAbiCoder().encode(['string'], ['mockVoteData']);
      votingConfigData = [
        {
          configIndex: 0n,
          voteData: voteDataBytes,
        },
      ];
      await standaloneFreezeVoting.connect(voter1).castFreezeVote(votingConfigData, 0n);
      expect(await standaloneFreezeVoting.isFrozen()).to.be.true;
    });

    it('should automatically unfreeze when threshold is reached', async () => {
      // Vote to unfreeze with exactly the threshold weight
      await mockVotingWeight1.setWeight(DEFAULT_UNFREEZE_VOTES_THRESHOLD);

      await expect(standaloneFreezeVoting.connect(voter2).castUnfreezeVote(votingConfigData, 0n))
        .to.emit(standaloneFreezeVoting, 'DAOUnfrozen')
        .withArgs((await time.latest()) + 1);

      expect(await standaloneFreezeVoting.isFrozen()).to.be.false;
    });

    it('should not unfreeze with insufficient votes', async () => {
      // Vote with insufficient weight for unfreeze
      await mockVotingWeight1.setWeight(50n); // Less than the 150 threshold
      await standaloneFreezeVoting.connect(voter2).castUnfreezeVote(votingConfigData, 0n);

      // Should still be frozen
      expect(await standaloneFreezeVoting.isFrozen()).to.be.true;
      expect(await standaloneFreezeVoting.getUnfreezeProposalVotes()).to.equal(50n);
    });

    it('should unfreeze when accumulated votes reach threshold', async () => {
      // First voter votes with partial weight
      await mockVotingWeight1.setWeight(100n);
      await standaloneFreezeVoting.connect(voter2).castUnfreezeVote(votingConfigData, 0n);
      expect(await standaloneFreezeVoting.isFrozen()).to.be.true;

      // Second voter provides remaining weight to reach threshold
      await mockVotingWeight1.setWeight(50n);
      await expect(
        standaloneFreezeVoting.connect(voter3).castUnfreezeVote(votingConfigData, 0n),
      ).to.emit(standaloneFreezeVoting, 'DAOUnfrozen');

      expect(await standaloneFreezeVoting.isFrozen()).to.be.false;
      // Unfreeze proposal should be reset
      expect(await standaloneFreezeVoting.getUnfreezeProposalVotes()).to.equal(0n);
    });
  });

  describe('Security Invariant - lastFreezeTime', () => {
    it('should set lastFreezeTime on freeze and never clear it', async () => {
      // Initially, lastFreezeTime should be 0
      expect(await standaloneFreezeVoting.lastFreezeTime()).to.equal(0);

      // Cast freeze vote to freeze the DAO
      await mockVotingWeight1.setWeight(DEFAULT_FREEZE_VOTES_THRESHOLD);
      await standaloneFreezeVoting.connect(voter1).castFreezeVote(
        [
          {
            configIndex: 0,
            voteData: ethers.AbiCoder.defaultAbiCoder().encode(['string'], ['mockVoteData']),
          },
        ],
        0n,
      );

      const freezeTime = await time.latest();

      // Check that lastFreezeTime was set
      expect(await standaloneFreezeVoting.lastFreezeTime()).to.equal(freezeTime);
      expect(await standaloneFreezeVoting.isFrozen()).to.be.true;

      // Cast unfreeze votes - reaching the threshold will automatically unfreeze
      await mockVotingWeight1.setWeight(DEFAULT_UNFREEZE_VOTES_THRESHOLD);
      await standaloneFreezeVoting.connect(voter1).castUnfreezeVote(
        [
          {
            configIndex: 0,
            voteData: ethers.AbiCoder.defaultAbiCoder().encode(['string'], ['mockVoteData']),
          },
        ],
        0n,
      );

      // After automatic unfreeze, lastFreezeTime should NOT be cleared
      expect(await standaloneFreezeVoting.lastFreezeTime()).to.equal(freezeTime);
      // But isFrozen should return false
      expect(await standaloneFreezeVoting.isFrozen()).to.be.false;
    });

    it('should update lastFreezeTime on subsequent freezes', async () => {
      // First freeze
      await mockVotingWeight1.setWeight(DEFAULT_FREEZE_VOTES_THRESHOLD);
      await standaloneFreezeVoting.connect(voter1).castFreezeVote(
        [
          {
            configIndex: 0,
            voteData: ethers.AbiCoder.defaultAbiCoder().encode(['string'], ['mockVoteData']),
          },
        ],
        0n,
      );
      const firstFreezeTime = await time.latest();
      expect(await standaloneFreezeVoting.lastFreezeTime()).to.equal(firstFreezeTime);

      // Unfreeze - will happen automatically when threshold is reached
      await mockVotingWeight1.setWeight(DEFAULT_UNFREEZE_VOTES_THRESHOLD);
      await standaloneFreezeVoting.connect(voter1).castUnfreezeVote(
        [
          {
            configIndex: 0,
            voteData: ethers.AbiCoder.defaultAbiCoder().encode(['string'], ['mockVoteData']),
          },
        ],
        0n,
      );

      // Wait and freeze again
      await time.increase(100);

      // Need to wait for freeze proposal to expire
      await time.increase(DEFAULT_FREEZE_PROPOSAL_PERIOD + 1);

      await standaloneFreezeVoting.connect(voter1).castFreezeVote(
        [
          {
            configIndex: 0,
            voteData: ethers.AbiCoder.defaultAbiCoder().encode(['string'], ['mockVoteData']),
          },
        ],
        0n,
      );
      const secondFreezeTime = await time.latest();

      // lastFreezeTime should be updated to the new freeze time
      expect(await standaloneFreezeVoting.lastFreezeTime()).to.equal(secondFreezeTime);
      expect(secondFreezeTime).to.be.gt(firstFreezeTime);
    });
  });

  describe('Version', () => {
    it('should return the correct version', async () => {
      expect(await standaloneFreezeVoting.version()).to.equal(1);
    });
  });

  describe('ERC165 supportsInterface', () => {
    runSupportsInterfaceTests({
      getContract: () => standaloneFreezeVoting,
      supportedInterfaceFactories: [
        IFreezeVotingStandaloneV1__factory,
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
      getContract: () => standaloneFreezeVoting,
    });
  });

  describe('InitializerEventEmitter', () => {
    runInitializerEventEmitterTests({
      contractFactory: FreezeVotingStandaloneV1__factory,
      masterCopy: () => standaloneFreezeVotingImplementationAddress,
      deployer: () => deployer,
      initializeParams: async () => [
        DEFAULT_FREEZE_VOTES_THRESHOLD,
        DEFAULT_UNFREEZE_VOTES_THRESHOLD,
        DEFAULT_FREEZE_PROPOSAL_PERIOD,
        DEFAULT_UNFREEZE_PROPOSAL_PERIOD,
        mockLightAccountFactory.target as string,
      ],
      getExpectedInitData: async () =>
        ethers.AbiCoder.defaultAbiCoder().encode(
          ['uint256', 'uint256', 'uint32', 'uint32', 'address'],
          [
            DEFAULT_FREEZE_VOTES_THRESHOLD,
            DEFAULT_UNFREEZE_VOTES_THRESHOLD,
            DEFAULT_FREEZE_PROPOSAL_PERIOD,
            DEFAULT_UNFREEZE_PROPOSAL_PERIOD,
            mockLightAccountFactory.target as string,
          ],
        ),
    });
  });
});
