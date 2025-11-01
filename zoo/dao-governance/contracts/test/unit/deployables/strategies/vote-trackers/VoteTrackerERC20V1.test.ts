import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  VoteTrackerERC20V1,
  VoteTrackerERC20V1__factory,
  IVoteTrackerV1__factory,
  IERC165__factory,
  ERC1967Proxy__factory,
  IVersion__factory,
  IDeploymentBlock__factory,
} from '../../../../../typechain-types';
import { runSupportsInterfaceTests } from '../../../shared/supportsInterfaceTests';

describe('VoteTrackerERC20V1', () => {
  let deployer: SignerWithAddress;
  let authorizedCaller: SignerWithAddress;
  let unauthorizedCaller: SignerWithAddress;
  let voter1: SignerWithAddress;
  let voter2: SignerWithAddress;

  let voteTracker: VoteTrackerERC20V1;

  async function fixture() {
    const [d, ac, uc, v1, v2] = await ethers.getSigners();

    // Deploy VoteTrackerERC20V1 implementation
    const trackerFactory = new VoteTrackerERC20V1__factory(d);
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

    const tracker = VoteTrackerERC20V1__factory.connect(await proxy.getAddress(), d);

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
      const voteData = '0x';

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
      const newTrackerImpl = await new VoteTrackerERC20V1__factory(deployer).deploy();
      const initData = newTrackerImpl.interface.encodeFunctionData('initialize', [
        [authorizedCaller.address, voter1.address, voter2.address],
      ]);
      const proxy = await new ERC1967Proxy__factory(deployer).deploy(
        await newTrackerImpl.getAddress(),
        initData,
      );
      const newTracker = VoteTrackerERC20V1__factory.connect(await proxy.getAddress(), deployer);

      // All three addresses should be able to record votes
      await newTracker.connect(authorizedCaller).recordVote(1n, deployer.address, '0x');
      await newTracker.connect(voter1).recordVote(2n, deployer.address, '0x');
      await newTracker.connect(voter2).recordVote(3n, deployer.address, '0x');
    });

    it('should initialize with empty authorized callers array', async () => {
      const newTrackerImpl = await new VoteTrackerERC20V1__factory(deployer).deploy();
      const initData = newTrackerImpl.interface.encodeFunctionData('initialize', [
        [], // Empty array
      ]);
      const proxy = await new ERC1967Proxy__factory(deployer).deploy(
        await newTrackerImpl.getAddress(),
        initData,
      );
      const newTracker = VoteTrackerERC20V1__factory.connect(await proxy.getAddress(), deployer);

      // No one should be able to record votes
      await expect(newTracker.connect(authorizedCaller).recordVote(1n, voter1.address, '0x'))
        .to.be.revertedWithCustomError(newTracker, 'UnauthorizedCaller')
        .withArgs(authorizedCaller.address);
    });
  });

  describe('recordVote', () => {
    const contextId = 1n;
    const voteData = '0x'; // Empty for ERC20 voting

    it('should record vote from authorized caller', async () => {
      await voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData);

      expect(await voteTracker.hasVoted(contextId, voter1.address, voteData)).to.be.true;
    });

    it('should revert if not authorized caller', async () => {
      await expect(
        voteTracker.connect(unauthorizedCaller).recordVote(contextId, voter1.address, voteData),
      )
        .to.be.revertedWithCustomError(voteTracker, 'UnauthorizedCaller')
        .withArgs(unauthorizedCaller.address);
    });

    it('should revert if voter already voted in same context', async () => {
      // First vote should succeed
      await voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData);

      // Second vote should fail
      await expect(
        voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData),
      )
        .to.be.revertedWithCustomError(voteTracker, 'AlreadyVoted')
        .withArgs(contextId, voter1.address, voteData);
    });

    it('should allow same voter to vote in different contexts', async () => {
      const contextId1 = 1n;
      const contextId2 = 2n;

      await voteTracker.connect(authorizedCaller).recordVote(contextId1, voter1.address, voteData);
      await voteTracker.connect(authorizedCaller).recordVote(contextId2, voter1.address, voteData);

      expect(await voteTracker.hasVoted(contextId1, voter1.address, voteData)).to.be.true;
      expect(await voteTracker.hasVoted(contextId2, voter1.address, voteData)).to.be.true;
    });

    it('should allow different voters to vote in same context', async () => {
      await voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData);
      await voteTracker.connect(authorizedCaller).recordVote(contextId, voter2.address, voteData);

      expect(await voteTracker.hasVoted(contextId, voter1.address, voteData)).to.be.true;
      expect(await voteTracker.hasVoted(contextId, voter2.address, voteData)).to.be.true;
    });

    it('should handle large context IDs', async () => {
      const largeContextId = ethers.MaxUint256;

      await voteTracker
        .connect(authorizedCaller)
        .recordVote(largeContextId, voter1.address, voteData);
      expect(await voteTracker.hasVoted(largeContextId, voter1.address, voteData)).to.be.true;
    });

    it('should ignore vote data for ERC20 tracking', async () => {
      // Vote data is ignored for ERC20, so different data should still be considered the same vote
      const voteData1 = '0x';
      const voteData2 = '0x1234';

      await voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData1);

      // Should be considered already voted even with different vote data
      await expect(
        voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData2),
      )
        .to.be.revertedWithCustomError(voteTracker, 'AlreadyVoted')
        .withArgs(contextId, voter1.address, voteData2);

      // Both should return true for hasVoted
      expect(await voteTracker.hasVoted(contextId, voter1.address, voteData1)).to.be.true;
      expect(await voteTracker.hasVoted(contextId, voter1.address, voteData2)).to.be.true;
    });
  });

  describe('hasVoted', () => {
    const contextId = 1n;
    const voteData = '0x';

    it('should return false for voter who has not voted', async () => {
      expect(await voteTracker.hasVoted(contextId, voter1.address, voteData)).to.be.false;
    });

    it('should return true for voter who has voted', async () => {
      await voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData);
      expect(await voteTracker.hasVoted(contextId, voter1.address, voteData)).to.be.true;
    });

    it('should return false for different context', async () => {
      await voteTracker.connect(authorizedCaller).recordVote(contextId, voter1.address, voteData);
      expect(await voteTracker.hasVoted(contextId + 1n, voter1.address, voteData)).to.be.false;
    });

    it('should be callable by anyone', async () => {
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
