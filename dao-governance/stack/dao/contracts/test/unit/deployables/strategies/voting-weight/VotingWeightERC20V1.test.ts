import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { loadFixture, time } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  VotingWeightERC20V1,
  VotingWeightERC20V1__factory,
  MockERC20Votes,
  MockERC20Votes__factory,
  IVotingWeightERC20V1__factory,
  IVotingWeightV1__factory,
  IERC165__factory,
  ERC1967Proxy__factory,
  IVersion__factory,
  IDeploymentBlock__factory,
} from '../../../../../typechain-types';
import { runSupportsInterfaceTests } from '../../../shared/supportsInterfaceTests';

describe('VotingWeightERC20V1', () => {
  let deployer: SignerWithAddress;
  let voter1: SignerWithAddress;
  let voter2: SignerWithAddress;
  let notVoter: SignerWithAddress;

  let votingWeight: VotingWeightERC20V1;
  let mockToken: MockERC20Votes;

  const WEIGHT_PER_TOKEN = ethers.parseEther('10'); // 10:1 ratio
  const TOKEN_AMOUNT = ethers.parseEther('100');

  async function fixture() {
    const [d, v1, v2, nv] = await ethers.getSigners();

    // Deploy mock ERC20 token
    const tokenFactory = new MockERC20Votes__factory(d);
    const token = await tokenFactory.deploy();
    await token.waitForDeployment();

    // Deploy VotingWeightERC20V1 implementation
    const weightFactory = new VotingWeightERC20V1__factory(d);
    const weightImpl = await weightFactory.deploy();
    await weightImpl.waitForDeployment();

    // Deploy proxy and initialize
    const initData = weightImpl.interface.encodeFunctionData('initialize', [
      await token.getAddress(),
      WEIGHT_PER_TOKEN,
    ]);
    const proxy = await new ERC1967Proxy__factory(d).deploy(
      await weightImpl.getAddress(),
      initData,
    );
    await proxy.waitForDeployment();

    const weight = VotingWeightERC20V1__factory.connect(await proxy.getAddress(), d);

    return {
      deployer: d,
      voter1: v1,
      voter2: v2,
      notVoter: nv,
      votingWeight: weight,
      mockToken: token,
    };
  }

  beforeEach(async () => {
    const f = await loadFixture(fixture);
    deployer = f.deployer;
    voter1 = f.voter1;
    voter2 = f.voter2;
    notVoter = f.notVoter;
    votingWeight = f.votingWeight;
    mockToken = f.mockToken;
  });

  describe('Initialization', () => {
    it('should initialize with correct parameters', async () => {
      expect(await votingWeight.token()).to.equal(await mockToken.getAddress());
      expect(await votingWeight.weightPerToken()).to.equal(WEIGHT_PER_TOKEN);
    });

    it('should revert if already initialized', async () => {
      await expect(
        votingWeight.initialize(await mockToken.getAddress(), WEIGHT_PER_TOKEN),
      ).to.be.revertedWithCustomError(votingWeight, 'InvalidInitialization');
    });
  });

  describe('calculateWeight', () => {
    beforeEach(async () => {
      // Setup: Give tokens to voters and have them delegate to themselves
      await mockToken.mint(voter1.address, TOKEN_AMOUNT);
      await mockToken.mint(voter2.address, TOKEN_AMOUNT * 2n);
      await mockToken.connect(voter1).delegate(voter1.address);
      await mockToken.connect(voter2).delegate(voter2.address);
    });

    describe('Clock Modes', () => {
      it('should work with timestamp mode', async () => {
        await mockToken.setClockMode(0); // ClockMode.Timestamp
        const currentBlock = await ethers.provider.getBlock('latest');
        const timestamp = BigInt(currentBlock!.timestamp) - 1n;

        await mockToken.setPastVotes(voter1.address, timestamp, TOKEN_AMOUNT);

        const [weight, processedData] = await votingWeight.calculateWeight(
          voter1.address,
          timestamp,
          '0x',
        );

        expect(weight).to.equal(TOKEN_AMOUNT * WEIGHT_PER_TOKEN);
        expect(processedData).to.equal('0x');
      });

      it('should work with block number mode', async () => {
        await mockToken.setClockMode(1); // ClockMode.BlockNumber
        const currentBlock = await ethers.provider.getBlock('latest');
        const blockNumber = currentBlock!.number - 1;

        await mockToken.setPastVotes(voter1.address, blockNumber, TOKEN_AMOUNT);

        const [weight, processedData] = await votingWeight.calculateWeight(
          voter1.address,
          blockNumber,
          '0x',
        );

        expect(weight).to.equal(TOKEN_AMOUNT * WEIGHT_PER_TOKEN);
        expect(processedData).to.equal('0x');
      });
    });

    it('should calculate correct weight for voter with tokens', async () => {
      const currentBlock = await ethers.provider.getBlock('latest');
      const timestamp = BigInt(currentBlock!.timestamp) - 1n;

      // Set mock past votes
      await mockToken.setPastVotes(voter1.address, timestamp, TOKEN_AMOUNT);

      const [weight, processedData] = await votingWeight.calculateWeight(
        voter1.address,
        timestamp,
        '0x',
      );

      expect(weight).to.equal(TOKEN_AMOUNT * WEIGHT_PER_TOKEN);
      expect(processedData).to.equal('0x');
    });

    it('should return zero weight for voter with no tokens', async () => {
      const currentBlock = await ethers.provider.getBlock('latest');
      const timestamp = BigInt(currentBlock!.timestamp) - 1n;

      const [weight, processedData] = await votingWeight.calculateWeight(
        notVoter.address,
        timestamp,
        '0x',
      );

      expect(weight).to.equal(0);
      expect(processedData).to.equal('0x');
    });

    it('should return zero weight for voter with undelegated tokens', async () => {
      // Mint tokens but don't delegate
      await mockToken.mint(notVoter.address, TOKEN_AMOUNT);

      const currentBlock = await ethers.provider.getBlock('latest');
      const timestamp = BigInt(currentBlock!.timestamp) - 1n;

      const [weight, processedData] = await votingWeight.calculateWeight(
        notVoter.address,
        timestamp,
        '0x',
      );

      expect(weight).to.equal(0);
      expect(processedData).to.equal('0x');
    });

    it('should calculate weight correctly at past timestamp', async () => {
      // Advance time
      await time.increase(3600); // 1 hour

      const pastBlock = await ethers.provider.getBlock('latest');
      const pastTimestamp = BigInt(pastBlock!.timestamp) - 3600n;

      // Set mock past votes for the past timestamp
      await mockToken.setPastVotes(voter1.address, pastTimestamp, TOKEN_AMOUNT);

      const [weight, processedData] = await votingWeight.calculateWeight(
        voter1.address,
        pastTimestamp,
        '0x',
      );

      expect(weight).to.equal(TOKEN_AMOUNT * WEIGHT_PER_TOKEN);
      expect(processedData).to.equal('0x');
    });

    it('should handle different weight ratios correctly', async () => {
      // Deploy new weight contract with different ratio
      const newWeightImpl = await new VotingWeightERC20V1__factory(deployer).deploy();
      const initData = newWeightImpl.interface.encodeFunctionData('initialize', [
        await mockToken.getAddress(),
        1, // 1:1 ratio
      ]);
      const proxy = await new ERC1967Proxy__factory(deployer).deploy(
        await newWeightImpl.getAddress(),
        initData,
      );
      const newWeight = VotingWeightERC20V1__factory.connect(await proxy.getAddress(), deployer);

      const currentBlock = await ethers.provider.getBlock('latest');
      const timestamp = BigInt(currentBlock!.timestamp) - 1n;

      await mockToken.setPastVotes(voter1.address, timestamp, TOKEN_AMOUNT);

      const [weight] = await newWeight.calculateWeight(voter1.address, timestamp, '0x');

      expect(weight).to.equal(TOKEN_AMOUNT); // 1:1 ratio
    });

    it('should handle large token amounts without overflow', async () => {
      const largeAmount = ethers.parseEther('1000000000'); // 1 billion tokens
      await mockToken.mint(voter1.address, largeAmount);

      const currentBlock = await ethers.provider.getBlock('latest');
      const timestamp = BigInt(currentBlock!.timestamp) - 1n;

      await mockToken.setPastVotes(voter1.address, timestamp, largeAmount);

      const [weight] = await votingWeight.calculateWeight(voter1.address, timestamp, '0x');

      expect(weight).to.equal(largeAmount * WEIGHT_PER_TOKEN);
    });
  });

  describe('Deployment Block', () => {
    it('should have deployment block set', async () => {
      const deploymentBlock = await votingWeight.deploymentBlock();
      expect(deploymentBlock).to.be.gt(0);
      expect(deploymentBlock).to.be.lte(await ethers.provider.getBlockNumber());
    });
  });

  describe('getVotingWeightForPaymaster', () => {
    beforeEach(async () => {
      // Setup: Give tokens to voter1 and delegate
      await mockToken.mint(voter1.address, TOKEN_AMOUNT);
      await mockToken.connect(voter1).delegate(voter1.address);
    });

    it('should return correct weight for paymaster validation', async () => {
      const currentBlock = await ethers.provider.getBlock('latest');
      const timestamp = BigInt(currentBlock!.timestamp) - 1n;

      // Set up checkpoints for the mock token since getVotingWeightForPaymaster reads checkpoints
      const checkpoints = [
        {
          _key: timestamp,
          _value: TOKEN_AMOUNT,
        },
      ];
      await mockToken.setCheckpoints(voter1.address, checkpoints);

      const weight = await votingWeight.getVotingWeightForPaymaster(
        voter1.address,
        timestamp,
        '0x',
      );

      expect(weight).to.equal(TOKEN_AMOUNT * WEIGHT_PER_TOKEN);
    });

    it('should return zero for voter with no weight', async () => {
      const currentBlock = await ethers.provider.getBlock('latest');
      const timestamp = BigInt(currentBlock!.timestamp) - 1n;

      const weight = await votingWeight.getVotingWeightForPaymaster(
        notVoter.address,
        timestamp,
        '0x',
      );

      expect(weight).to.equal(0);
    });
  });

  describe('ERC165 supportsInterface', () => {
    runSupportsInterfaceTests({
      getContract: () => votingWeight,
      supportedInterfaceFactories: [
        IVotingWeightERC20V1__factory,
        IVotingWeightV1__factory,
        IVersion__factory,
        IDeploymentBlock__factory,
        IERC165__factory,
      ],
    });
  });
});
