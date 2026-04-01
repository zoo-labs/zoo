import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  VotingWeightERC721V1,
  VotingWeightERC721V1__factory,
  MockERC721,
  MockERC721__factory,
  IVotingWeightERC721V1__factory,
  IVotingWeightV1__factory,
  IERC165__factory,
  ERC1967Proxy__factory,
  IVersion__factory,
  IDeploymentBlock__factory,
} from '../../../../../typechain-types';
import { runSupportsInterfaceTests } from '../../../shared/supportsInterfaceTests';

describe('VotingWeightERC721V1', () => {
  let deployer: SignerWithAddress;
  let voter1: SignerWithAddress;
  let voter2: SignerWithAddress;

  let votingWeight: VotingWeightERC721V1;
  let mockNFT: MockERC721;

  const WEIGHT_PER_TOKEN = ethers.parseEther('100'); // 100 voting weight per NFT

  async function fixture() {
    const [d, v1, v2, nv] = await ethers.getSigners();

    // Deploy mock ERC721 token
    const nftFactory = new MockERC721__factory(d);
    const nft = await nftFactory.deploy();
    await nft.waitForDeployment();

    // Deploy VotingWeightERC721V1 implementation
    const weightFactory = new VotingWeightERC721V1__factory(d);
    const weightImpl = await weightFactory.deploy();
    await weightImpl.waitForDeployment();

    // Deploy proxy and initialize
    const initData = weightImpl.interface.encodeFunctionData('initialize', [
      await nft.getAddress(),
      WEIGHT_PER_TOKEN,
    ]);
    const proxy = await new ERC1967Proxy__factory(d).deploy(
      await weightImpl.getAddress(),
      initData,
    );
    await proxy.waitForDeployment();

    const weight = VotingWeightERC721V1__factory.connect(await proxy.getAddress(), d);

    return {
      deployer: d,
      voter1: v1,
      voter2: v2,
      notVoter: nv,
      votingWeight: weight,
      mockNFT: nft,
    };
  }

  beforeEach(async () => {
    const f = await loadFixture(fixture);
    deployer = f.deployer;
    voter1 = f.voter1;
    voter2 = f.voter2;
    votingWeight = f.votingWeight;
    mockNFT = f.mockNFT;
  });

  describe('Initialization', () => {
    it('should initialize with correct parameters', async () => {
      expect(await votingWeight.token()).to.equal(await mockNFT.getAddress());
      expect(await votingWeight.weightPerToken()).to.equal(WEIGHT_PER_TOKEN);
    });

    it('should revert if already initialized', async () => {
      await expect(
        votingWeight.initialize(await mockNFT.getAddress(), WEIGHT_PER_TOKEN),
      ).to.be.revertedWithCustomError(votingWeight, 'InvalidInitialization');
    });
  });

  describe('calculateWeight', () => {
    beforeEach(async () => {
      // Setup: Mint NFTs to voters
      await mockNFT.mintToken(voter1.address, 1);
      await mockNFT.mintToken(voter1.address, 2);
      await mockNFT.mintToken(voter2.address, 3);
      await mockNFT.mintToken(voter2.address, 4);
      await mockNFT.mintToken(voter2.address, 5);
    });

    it('should calculate correct weight with valid token IDs', async () => {
      const currentBlock = await ethers.provider.getBlock('latest');
      const timestamp = BigInt(currentBlock!.timestamp) - 1n;

      // Encode token IDs 1 and 2 for voter1
      const tokenIds = [1n, 2n];
      const voteData = ethers.AbiCoder.defaultAbiCoder().encode(['uint256[]'], [tokenIds]);

      const [weight, processedData] = await votingWeight.calculateWeight(
        voter1.address,
        timestamp,
        voteData,
      );

      expect(weight).to.equal(WEIGHT_PER_TOKEN * 2n); // 2 NFTs
      expect(processedData).to.equal(voteData);
    });

    it('should revert with empty token list', async () => {
      const currentBlock = await ethers.provider.getBlock('latest');
      const timestamp = BigInt(currentBlock!.timestamp) - 1n;

      const tokenIds: bigint[] = [];
      const voteData = ethers.AbiCoder.defaultAbiCoder().encode(['uint256[]'], [tokenIds]);

      await expect(
        votingWeight.calculateWeight(voter1.address, timestamp, voteData),
      ).to.be.revertedWithCustomError(votingWeight, 'NoTokenIds');
    });

    it('should revert if voter does not own specified token', async () => {
      const currentBlock = await ethers.provider.getBlock('latest');
      const timestamp = BigInt(currentBlock!.timestamp) - 1n;

      // Try to vote with token ID 3 which is owned by voter2
      const tokenIds = [3n];
      const voteData = ethers.AbiCoder.defaultAbiCoder().encode(['uint256[]'], [tokenIds]);

      await expect(votingWeight.calculateWeight(voter1.address, timestamp, voteData))
        .to.be.revertedWithCustomError(votingWeight, 'NotTokenOwner')
        .withArgs(3, voter2.address);
    });

    it('should revert with duplicate token IDs', async () => {
      const currentBlock = await ethers.provider.getBlock('latest');
      const timestamp = BigInt(currentBlock!.timestamp) - 1n;

      // Try to vote with duplicate token ID
      const tokenIds = [1n, 1n];
      const voteData = ethers.AbiCoder.defaultAbiCoder().encode(['uint256[]'], [tokenIds]);

      await expect(votingWeight.calculateWeight(voter1.address, timestamp, voteData))
        .to.be.revertedWithCustomError(votingWeight, 'DuplicateTokenId')
        .withArgs(1);
    });

    it('should revert with invalid vote data format', async () => {
      const currentBlock = await ethers.provider.getBlock('latest');
      const timestamp = BigInt(currentBlock!.timestamp) - 1n;

      // Invalid data (not properly encoded)
      const voteData = '0x1234';

      await expect(votingWeight.calculateWeight(voter1.address, timestamp, voteData)).to.be
        .reverted;
    });

    it('should handle large number of NFTs', async () => {
      // Mint many NFTs to voter1
      for (let i = 10; i < 20; i++) {
        await mockNFT.mintToken(voter1.address, i);
      }

      const currentBlock = await ethers.provider.getBlock('latest');
      const timestamp = BigInt(currentBlock!.timestamp) - 1n;

      const tokenIds = Array.from({ length: 10 }, (_, i) => BigInt(i + 10));
      const voteData = ethers.AbiCoder.defaultAbiCoder().encode(['uint256[]'], [tokenIds]);

      const [weight] = await votingWeight.calculateWeight(voter1.address, timestamp, voteData);

      expect(weight).to.equal(WEIGHT_PER_TOKEN * 10n);
    });

    it('should work with different weight ratios', async () => {
      // Deploy new weight contract with different ratio
      const newWeightImpl = await new VotingWeightERC721V1__factory(deployer).deploy();
      const initData = newWeightImpl.interface.encodeFunctionData('initialize', [
        await mockNFT.getAddress(),
        1, // 1 weight per NFT
      ]);
      const proxy = await new ERC1967Proxy__factory(deployer).deploy(
        await newWeightImpl.getAddress(),
        initData,
      );
      const newWeight = VotingWeightERC721V1__factory.connect(await proxy.getAddress(), deployer);

      const currentBlock = await ethers.provider.getBlock('latest');
      const timestamp = BigInt(currentBlock!.timestamp) - 1n;

      const tokenIds = [1n, 2n];
      const voteData = ethers.AbiCoder.defaultAbiCoder().encode(['uint256[]'], [tokenIds]);

      const [weight] = await newWeight.calculateWeight(voter1.address, timestamp, voteData);

      expect(weight).to.equal(2); // 2 NFTs * 1 weight each
    });

    it('should handle token transfers correctly', async () => {
      const currentBlock = await ethers.provider.getBlock('latest');
      const timestamp = BigInt(currentBlock!.timestamp) - 1n;

      // Transfer token 1 from voter1 to voter2
      await mockNFT.connect(voter1).transferFrom(voter1.address, voter2.address, 1);

      // voter1 should not be able to vote with token 1 anymore
      const tokenIds = [1n];
      const voteData = ethers.AbiCoder.defaultAbiCoder().encode(['uint256[]'], [tokenIds]);

      await expect(votingWeight.calculateWeight(voter1.address, timestamp, voteData))
        .to.be.revertedWithCustomError(votingWeight, 'NotTokenOwner')
        .withArgs(1, voter2.address);

      // But voter2 should be able to vote with it
      const [weight] = await votingWeight.calculateWeight(voter2.address, timestamp, voteData);
      expect(weight).to.equal(WEIGHT_PER_TOKEN);
    });
  });

  describe('getVotingWeightForPaymaster', () => {
    beforeEach(async () => {
      // Setup: Mint NFTs to voter1
      await mockNFT.mintToken(voter1.address, 1);
      await mockNFT.mintToken(voter1.address, 2);
    });

    it('should return correct weight for paymaster validation', async () => {
      const currentBlock = await ethers.provider.getBlock('latest');
      const timestamp = BigInt(currentBlock!.timestamp) - 1n;

      const tokenIds = [1n, 2n];
      const voteData = ethers.AbiCoder.defaultAbiCoder().encode(['uint256[]'], [tokenIds]);

      const weight = await votingWeight.getVotingWeightForPaymaster(
        voter1.address,
        timestamp,
        voteData,
      );

      expect(weight).to.equal(WEIGHT_PER_TOKEN * 2n);
    });

    it('should return zero for voter with no NFTs specified', async () => {
      const currentBlock = await ethers.provider.getBlock('latest');
      const timestamp = BigInt(currentBlock!.timestamp) - 1n;

      const tokenIds: bigint[] = [];
      const voteData = ethers.AbiCoder.defaultAbiCoder().encode(['uint256[]'], [tokenIds]);

      const weight = await votingWeight.getVotingWeightForPaymaster(
        voter1.address,
        timestamp,
        voteData,
      );

      expect(weight).to.equal(0);
    });
  });

  describe('ERC165 supportsInterface', () => {
    runSupportsInterfaceTests({
      getContract: () => votingWeight,
      supportedInterfaceFactories: [
        IVotingWeightERC721V1__factory,
        IVotingWeightV1__factory,
        IVersion__factory,
        IDeploymentBlock__factory,
        IERC165__factory,
      ],
    });
  });
});
