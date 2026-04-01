import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  VoteTrackerERC721V1,
  VoteTrackerERC721V1__factory,
  IVoteTrackerV1__factory,
  IERC165__factory,
  ERC1967Proxy__factory,
  IVersion__factory,
  IDeploymentBlock__factory,
} from '../../../../../typechain-types';
import { runSupportsInterfaceTests } from '../../../shared/supportsInterfaceTests';

describe('VoteTrackerERC721V1', () => {
  let deployer: SignerWithAddress;
  let authorizedCaller: SignerWithAddress;
  let unauthorizedCaller: SignerWithAddress;
  let voter1: SignerWithAddress;
  let voter2: SignerWithAddress;

  let voteTracker: VoteTrackerERC721V1;

  async function fixture() {
    const [d, ac, uc, v1, v2] = await ethers.getSigners();

    // Deploy VoteTrackerERC721V1 implementation
    const trackerFactory = new VoteTrackerERC721V1__factory(d);
    const trackerImpl = await trackerFactory.deploy();
    await trackerImpl.waitForDeployment();

    // Deploy proxy and initialize
    const initData = trackerImpl.interface.encodeFunctionData('initialize', [
      [ac.address], // Array of authorized callers
    ]);
    const proxy = await new ERC1967Proxy__factory(d).deploy(
      await trackerImpl.getAddress(),
      initData,
    );
    await proxy.waitForDeployment();

    const tracker = VoteTrackerERC721V1__factory.connect(await proxy.getAddress(), d);

    return {
      deployer: d,
      authorizedCaller: ac,
      unauthorizedCaller: uc,
      voter1: v1,
      voter2: v2,
      voteTracker: tracker,
    };
  }

  beforeEach(async () => {
    const f = await loadFixture(fixture);
    deployer = f.deployer;
    authorizedCaller = f.authorizedCaller;
    unauthorizedCaller = f.unauthorizedCaller;
    voter1 = f.voter1;
    voter2 = f.voter2;
    voteTracker = f.voteTracker;
  });

  describe('Initialization', () => {
    it('should initialize with authorized callers', async () => {
      // Check that authorized caller can record votes (will revert if not authorized)
      const contextId = 1n;
      const tokenIds = [1n];
      const voteData = ethers.AbiCoder.defaultAbiCoder().encode(['uint256[]'], [tokenIds]);

      // This should not revert
      await expect(
        voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData),
      ).to.not.be.reverted;

      // This should revert
      await expect(
        voteTracker.connect(unauthorizedCaller).recordVote(contextId, voter2.address, voteData),
      )
        .to.be.revertedWithCustomError(voteTracker, 'UnauthorizedCaller')
        .withArgs(unauthorizedCaller.address);
    });

    it('should revert if already initialized', async () => {
      await expect(
        voteTracker.initialize([authorizedCaller.address]),
      ).to.be.revertedWithCustomError(voteTracker, 'InvalidInitialization');
    });

    it('should initialize with multiple authorized callers', async () => {
      const newTrackerImpl = await new VoteTrackerERC721V1__factory(deployer).deploy();
      const initData = newTrackerImpl.interface.encodeFunctionData('initialize', [
        [authorizedCaller.address, voter1.address, voter2.address],
      ]);
      const proxy = await new ERC1967Proxy__factory(deployer).deploy(
        await newTrackerImpl.getAddress(),
        initData,
      );
      const newTracker = VoteTrackerERC721V1__factory.connect(await proxy.getAddress(), deployer);

      const voteData = ethers.AbiCoder.defaultAbiCoder().encode(['uint256[]'], [[1n]]);

      // All three addresses should be able to record votes
      await newTracker.connect(authorizedCaller).recordVote(1n, deployer.address, voteData);

      const voteData2 = ethers.AbiCoder.defaultAbiCoder().encode(['uint256[]'], [[2n]]);
      await newTracker.connect(voter1).recordVote(2n, deployer.address, voteData2);

      const voteData3 = ethers.AbiCoder.defaultAbiCoder().encode(['uint256[]'], [[3n]]);
      await newTracker.connect(voter2).recordVote(3n, deployer.address, voteData3);
    });

    it('should initialize with empty authorized callers array', async () => {
      const newTrackerImpl = await new VoteTrackerERC721V1__factory(deployer).deploy();
      const initData = newTrackerImpl.interface.encodeFunctionData('initialize', [
        [], // Empty array
      ]);
      const proxy = await new ERC1967Proxy__factory(deployer).deploy(
        await newTrackerImpl.getAddress(),
        initData,
      );
      const newTracker = VoteTrackerERC721V1__factory.connect(await proxy.getAddress(), deployer);

      const voteData = ethers.AbiCoder.defaultAbiCoder().encode(['uint256[]'], [[1n]]);

      // No one should be able to record votes
      await expect(newTracker.connect(authorizedCaller).recordVote(1n, voter1.address, voteData))
        .to.be.revertedWithCustomError(newTracker, 'UnauthorizedCaller')
        .withArgs(authorizedCaller.address);
    });
  });

  describe('recordVote', () => {
    const contextId = 1n;

    function encodeTokenIds(tokenIds: bigint[]): string {
      return ethers.AbiCoder.defaultAbiCoder().encode(['uint256[]'], [tokenIds]);
    }

    it('should record vote with single NFT', async () => {
      const tokenIds = [1n];
      const voteData = encodeTokenIds(tokenIds);

      await voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData);

      expect(await voteTracker.hasVoted(contextId, voter1.address, voteData)).to.be.true;
    });

    it('should record vote with multiple NFTs', async () => {
      const tokenIds = [1n, 2n, 3n];
      const voteData = encodeTokenIds(tokenIds);

      await voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData);

      expect(await voteTracker.hasVoted(contextId, voter1.address, voteData)).to.be.true;
    });

    it('should revert if not authorized caller', async () => {
      const tokenIds = [1n];
      const voteData = encodeTokenIds(tokenIds);

      await expect(
        voteTracker.connect(unauthorizedCaller).recordVote(contextId, voter1.address, voteData),
      )
        .to.be.revertedWithCustomError(voteTracker, 'UnauthorizedCaller')
        .withArgs(unauthorizedCaller.address);
    });

    it('should revert if voter already voted with same NFTs', async () => {
      const tokenIds = [1n, 2n];
      const voteData = encodeTokenIds(tokenIds);

      // First vote should succeed
      await voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData);

      // Second vote with same NFTs should fail
      await expect(
        voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData),
      )
        .to.be.revertedWithCustomError(voteTracker, 'AlreadyVoted')
        .withArgs(contextId, voter1.address, voteData);
    });

    it('should allow voting with different NFT combinations', async () => {
      const tokenIds1 = [1n, 2n];
      const tokenIds2 = [3n, 4n];
      const voteData1 = encodeTokenIds(tokenIds1);
      const voteData2 = encodeTokenIds(tokenIds2);

      // Vote with first set of NFTs
      await voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData1);

      // Vote with different set of NFTs should succeed
      await voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData2);

      expect(await voteTracker.hasVoted(contextId, voter1.address, voteData1)).to.be.true;
      expect(await voteTracker.hasVoted(contextId, voter1.address, voteData2)).to.be.true;
    });

    it('should track votes per context', async () => {
      const contextId1 = 1n;
      const contextId2 = 2n;
      const tokenIds = [1n];
      const voteData = encodeTokenIds(tokenIds);

      // Vote in context 1
      await voteTracker.connect(authorizedCaller).recordVote(contextId1, voter1.address, voteData);

      // Same NFTs can be used in different context
      await voteTracker.connect(authorizedCaller).recordVote(contextId2, voter1.address, voteData);

      expect(await voteTracker.hasVoted(contextId1, voter1.address, voteData)).to.be.true;
      expect(await voteTracker.hasVoted(contextId2, voter1.address, voteData)).to.be.true;
    });

    it('should handle NFT order correctly', async () => {
      // Same NFTs in different order should still be considered as already voted
      // because the individual NFTs have been used
      const tokenIds1 = [1n, 2n, 3n];
      const tokenIds2 = [3n, 2n, 1n];
      const voteData1 = encodeTokenIds(tokenIds1);
      const voteData2 = encodeTokenIds(tokenIds2);

      await voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData1);

      // Should revert because NFTs 1, 2, and 3 are already used
      await expect(
        voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData2),
      )
        .to.be.revertedWithCustomError(voteTracker, 'AlreadyVoted')
        .withArgs(contextId, voter1.address, voteData2);

      expect(await voteTracker.hasVoted(contextId, voter1.address, voteData1)).to.be.true;
      expect(await voteTracker.hasVoted(contextId, voter1.address, voteData2)).to.be.true;
    });

    it('should handle empty NFT list', async () => {
      const tokenIds: bigint[] = [];
      const voteData = encodeTokenIds(tokenIds);

      // Recording with empty NFT list should succeed
      await voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData);

      // hasVoted should return false because no NFTs were actually marked as used
      expect(await voteTracker.hasVoted(contextId, voter1.address, voteData)).to.be.false;
    });

    it('should handle large NFT lists', async () => {
      // Create a list of 100 NFT IDs
      const tokenIds = Array.from({ length: 100 }, (_, i) => BigInt(i + 1));
      const voteData = encodeTokenIds(tokenIds);

      await voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData);
      expect(await voteTracker.hasVoted(contextId, voter1.address, voteData)).to.be.true;
    });
  });

  describe('hasVoted', () => {
    const contextId = 1n;

    function encodeTokenIds(tokenIds: bigint[]): string {
      return ethers.AbiCoder.defaultAbiCoder().encode(['uint256[]'], [tokenIds]);
    }

    it('should return false for voter who has not voted', async () => {
      const tokenIds = [1n];
      const voteData = encodeTokenIds(tokenIds);

      expect(await voteTracker.hasVoted(contextId, voter1.address, voteData)).to.be.false;
    });

    it('should return true for exact NFT combination that was voted with', async () => {
      const tokenIds = [1n, 2n];
      const voteData = encodeTokenIds(tokenIds);

      await voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData);
      expect(await voteTracker.hasVoted(contextId, voter1.address, voteData)).to.be.true;
    });

    it('should return true for different NFT combination that includes used NFTs', async () => {
      const tokenIds1 = [1n, 2n];
      const tokenIds2 = [1n, 3n]; // Different second NFT but includes used NFT 1
      const voteData1 = encodeTokenIds(tokenIds1);
      const voteData2 = encodeTokenIds(tokenIds2);

      await voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData1);

      // Should return true because NFT 1 is already used
      expect(await voteTracker.hasVoted(contextId, voter1.address, voteData2)).to.be.true;

      // A completely different set of NFTs would return false
      const tokenIds3 = [3n, 4n]; // Completely different NFTs
      const voteData3 = encodeTokenIds(tokenIds3);
      expect(await voteTracker.hasVoted(contextId, voter1.address, voteData3)).to.be.false;
    });

    it('should be callable by anyone', async () => {
      const tokenIds = [1n];
      const voteData = encodeTokenIds(tokenIds);

      await voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData);

      // Check that unauthorized caller can still check vote status
      expect(
        await voteTracker.connect(unauthorizedCaller).hasVoted(contextId, voter1.address, voteData),
      ).to.be.true;
    });
  });

  describe('IVersion', () => {
    it('should return correct version', async () => {
      expect(await voteTracker.version()).to.equal(1);
    });
  });

  describe('Deployment Block', () => {
    it('should have deployment block set', async () => {
      const deploymentBlock = await voteTracker.deploymentBlock();
      expect(deploymentBlock).to.be.gt(0);
      expect(deploymentBlock).to.be.lte(await ethers.provider.getBlockNumber());
    });
  });

  describe('ERC165 supportsInterface', () => {
    runSupportsInterfaceTests({
      getContract: () => voteTracker,
      supportedInterfaceFactories: [
        IVoteTrackerV1__factory,
        IVersion__factory,
        IDeploymentBlock__factory,
        IERC165__factory,
      ],
    });
  });
});
