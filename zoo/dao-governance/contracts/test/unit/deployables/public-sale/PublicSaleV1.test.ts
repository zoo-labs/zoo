import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { time } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  PublicSaleV1,
  PublicSaleV1__factory,
  ERC1967Proxy__factory,
  MockERC20,
  MockERC20__factory,
  MockKYCVerifier,
  MockKYCVerifier__factory,
  IPublicSaleV1,
  IPublicSaleV1__factory,
  IVersion__factory,
  IDeploymentBlock__factory,
  IERC165__factory,
} from '../../../../typechain-types';
import { runDeploymentBlockTests } from '../../shared/deploymentBlockTests';
import { runInitializerEventEmitterTests } from '../../shared/initializerEventEmitterTests';
import { runSupportsInterfaceTests } from '../../shared/supportsInterfaceTests';

// Test Constants
const TEST_CONSTANTS = {
  NATIVE_ASSET: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  PRECISION: ethers.parseEther('1'),
  DEFAULT_START_OFFSET: 3600,
  DEFAULT_END_OFFSET: 86400,
  SAFE_SIGNER_START_INDEX: 9,
};

// Sale State Enum
enum SaleState {
  NOT_STARTED = 0,
  ACTIVE = 1,
  SUCCEEDED = 2,
  FAILED = 3,
}

// Helper Functions
async function deployPublicSaleProxy(
  deployer: SignerWithAddress,
  params: IPublicSaleV1.InitializerParamsStruct,
): Promise<PublicSaleV1> {
  // Get saleToken and saleTokenHolder from params
  const saleToken = MockERC20__factory.connect(params.saleToken as string, deployer);
  const saleTokenHolder = await ethers.getSigner(params.saleTokenHolder as string);

  // Calculate required sale token amount
  const saleTokenAmount =
    (BigInt(params.maximumTotalCommitment) * ethers.parseEther('1')) /
    BigInt(params.saleTokenPrice);

  // Deploy implementation
  const publicSaleImplementation = await new PublicSaleV1__factory(deployer).deploy();
  const proxyFactory = new ERC1967Proxy__factory(deployer);

  // Calculate proxy address before deployment
  const nonce = await ethers.provider.getTransactionCount(deployer.address);
  const proxyAddress = ethers.getCreateAddress({ from: deployer.address, nonce });

  // Approve the proxy address
  await saleToken.connect(saleTokenHolder).approve(proxyAddress, saleTokenAmount);

  const initializeCalldata = publicSaleImplementation.interface.encodeFunctionData('initialize', [
    params,
  ]);

  const proxy = await proxyFactory.deploy(
    await publicSaleImplementation.getAddress(),
    initializeCalldata,
  );

  return PublicSaleV1__factory.connect(await proxy.getAddress(), deployer);
}

interface DeployTestSaleOptions {
  startOffset?: number;
  endOffset?: number;
  maximumTotalCommitment?: bigint;
  minimumTotalCommitment?: bigint;
  commitmentToken?: string;
  decreaseCommitmentFee?: bigint;
  protocolFee?: bigint;
  minimumCommitment?: bigint;
  maximumCommitment?: bigint;
  saleTokenPrice?: bigint;
}

async function deployTestSale(
  deployer: SignerWithAddress,
  saleToken: MockERC20,
  saleTokenHolder: SignerWithAddress,
  baseParams: IPublicSaleV1.InitializerParamsStruct,
  options: DeployTestSaleOptions = {},
): Promise<PublicSaleV1> {
  const currentTime = await time.latest();
  const params = {
    ...baseParams,
    saleStartTimestamp: BigInt(
      currentTime + (options.startOffset ?? TEST_CONSTANTS.DEFAULT_START_OFFSET),
    ),
    saleEndTimestamp: BigInt(
      currentTime + (options.endOffset ?? TEST_CONSTANTS.DEFAULT_END_OFFSET),
    ),
    ...(options.maximumTotalCommitment && {
      maximumTotalCommitment: options.maximumTotalCommitment,
    }),
    ...(options.minimumTotalCommitment && {
      minimumTotalCommitment: options.minimumTotalCommitment,
    }),
    ...(options.commitmentToken && { commitmentToken: options.commitmentToken }),
    ...(options.decreaseCommitmentFee !== undefined && {
      decreaseCommitmentFee: options.decreaseCommitmentFee,
    }),
    ...(options.protocolFee !== undefined && { protocolFee: options.protocolFee }),
    ...(options.minimumCommitment && { minimumCommitment: options.minimumCommitment }),
    ...(options.maximumCommitment && { maximumCommitment: options.maximumCommitment }),
    ...(options.saleTokenPrice && { saleTokenPrice: options.saleTokenPrice }),
  };

  // Calculate and mint required sale tokens
  const requiredSaleTokens =
    (BigInt(params.maximumTotalCommitment) * TEST_CONSTANTS.PRECISION) /
    BigInt(params.saleTokenPrice);
  await saleToken.mint(saleTokenHolder.address, requiredSaleTokens);

  return deployPublicSaleProxy(deployer, params);
}

async function mintAndApproveCommitmentTokens(
  commitmentToken: MockERC20,
  sale: PublicSaleV1,
  users: SignerWithAddress[],
  amounts: bigint[],
): Promise<void> {
  const saleAddress = await sale.getAddress();
  for (let i = 0; i < users.length; i++) {
    await commitmentToken.mint(users[i].address, amounts[i]);
    await commitmentToken.connect(users[i]).approve(saleAddress, amounts[i]);
  }
}

async function reachMinimumTotalCommitment(
  sale: PublicSaleV1,
  commitmentToken: MockERC20,
  minimumTotalCommitment: bigint,
  maximumCommitment: bigint,
  initialCommitters: { user: SignerWithAddress; amount: bigint }[] = [],
): Promise<void> {
  let totalCommitted = 0n;

  // Process initial committers
  for (const { amount } of initialCommitters) {
    totalCommitted += amount;
  }

  // Fill remaining with additional signers
  const signers = await ethers.getSigners();
  let signerIndex = TEST_CONSTANTS.SAFE_SIGNER_START_INDEX;

  while (totalCommitted < minimumTotalCommitment) {
    const user = signers[signerIndex++];
    const remaining = minimumTotalCommitment - totalCommitted;
    const toCommit = remaining > maximumCommitment ? maximumCommitment : remaining;

    await commitmentToken.mint(user.address, toCommit);
    await commitmentToken.connect(user).approve(await sale.getAddress(), toCommit);
    await sale.connect(user).increaseCommitmentERC20(toCommit, ethers.getBytes('0x'), 0n);

    totalCommitted += toCommit;
  }
}

async function moveToSaleEnd(sale: PublicSaleV1): Promise<void> {
  const endTimestamp = await sale.saleEndTimestamp();
  await time.increaseTo(Number(endTimestamp) + 1);
}

async function moveToSaleStart(sale: PublicSaleV1): Promise<void> {
  const startTimestamp = await sale.saleStartTimestamp();
  await time.increaseTo(Number(startTimestamp));
}

async function expectSaleState(sale: PublicSaleV1, expectedState: SaleState): Promise<void> {
  expect(await sale.saleState()).to.equal(BigInt(expectedState));
}

describe('PublicSaleV1', () => {
  let deployer: SignerWithAddress;
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let charlie: SignerWithAddress;
  let saleProceedsReceiver: SignerWithAddress;
  let protocolFeeReceiver: SignerWithAddress;
  let saleTokenHolder: SignerWithAddress;
  let nonCommitter: SignerWithAddress;

  let publicSale: PublicSaleV1;
  let saleToken: MockERC20;
  let commitmentToken: MockERC20;
  let kycVerifier: MockKYCVerifier;

  let defaultParams: IPublicSaleV1.InitializerParamsStruct;

  beforeEach(async () => {
    [
      deployer,
      owner,
      alice,
      bob,
      charlie,
      saleProceedsReceiver,
      protocolFeeReceiver,
      saleTokenHolder,
      nonCommitter,
    ] = await ethers.getSigners();

    // Deploy mock contracts
    const MockERC20Factory = new MockERC20__factory(deployer);
    const MockKYCVerifierFactory = new MockKYCVerifier__factory(deployer);

    saleToken = await MockERC20Factory.deploy('Sale Token', 'SALE', 18);
    commitmentToken = await MockERC20Factory.deploy('Commitment Token', 'COMMIT', 18);
    kycVerifier = await MockKYCVerifierFactory.deploy();

    // Mint tokens to sale token holder
    await saleToken.mint(saleTokenHolder.address, ethers.parseEther('1000000'));

    // Setup default parameters
    const currentTime = await time.latest();
    defaultParams = {
      saleStartTimestamp: BigInt(currentTime + 3600), // 1 hour from now
      saleEndTimestamp: BigInt(currentTime + 86400), // 24 hours from now
      owner: owner.address,
      saleTokenHolder: saleTokenHolder.address,
      commitmentToken: await commitmentToken.getAddress(),
      saleToken: await saleToken.getAddress(),
      kycVerifier: await kycVerifier.getAddress(),
      saleProceedsReceiver: saleProceedsReceiver.address,
      protocolFeeReceiver: protocolFeeReceiver.address,
      minimumCommitment: ethers.parseEther('10'),
      maximumCommitment: ethers.parseEther('1000'),
      minimumTotalCommitment: ethers.parseEther('10000'),
      maximumTotalCommitment: ethers.parseEther('100000'),
      saleTokenPrice: ethers.parseEther('0.1'), // 0.1 commitment token per sale token
      decreaseCommitmentFee: ethers.parseEther('0.1'), // 10%
      protocolFee: ethers.parseEther('0.02'), // 2%
    };

    // Enable KYC for test accounts
    await kycVerifier.setVerify(true);
  });

  describe('Proxy Deployment & Initialization', () => {
    it('should deploy and initialize properly with valid parameters', async () => {
      publicSale = await deployPublicSaleProxy(deployer, defaultParams);

      // Verify all parameters are set correctly
      expect(await publicSale.saleStartTimestamp()).to.equal(defaultParams.saleStartTimestamp);
      expect(await publicSale.saleEndTimestamp()).to.equal(defaultParams.saleEndTimestamp);
      expect(await publicSale.owner()).to.equal(defaultParams.owner);
      expect(await publicSale.commitmentToken()).to.equal(defaultParams.commitmentToken);
      expect(await publicSale.saleToken()).to.equal(defaultParams.saleToken);
      expect(await publicSale.kycVerifier()).to.equal(defaultParams.kycVerifier);
      expect(await publicSale.saleProceedsReceiver()).to.equal(defaultParams.saleProceedsReceiver);
      expect(await publicSale.protocolFeeReceiver()).to.equal(defaultParams.protocolFeeReceiver);
      expect(await publicSale.minimumCommitment()).to.equal(defaultParams.minimumCommitment);
      expect(await publicSale.maximumCommitment()).to.equal(defaultParams.maximumCommitment);
      expect(await publicSale.minimumTotalCommitment()).to.equal(
        defaultParams.minimumTotalCommitment,
      );
      expect(await publicSale.maximumTotalCommitment()).to.equal(
        defaultParams.maximumTotalCommitment,
      );
      expect(await publicSale.saleTokenPrice()).to.equal(defaultParams.saleTokenPrice);
      expect(await publicSale.decreaseCommitmentFee()).to.equal(
        defaultParams.decreaseCommitmentFee,
      );
      expect(await publicSale.protocolFee()).to.equal(defaultParams.protocolFee);

      // Verify sale tokens were transferred to the contract
      const expectedSaleTokenAmount =
        (BigInt(defaultParams.maximumTotalCommitment) * TEST_CONSTANTS.PRECISION) /
        BigInt(defaultParams.saleTokenPrice);
      expect(await saleToken.balanceOf(await publicSale.getAddress())).to.equal(
        expectedSaleTokenAmount,
      );
    });

    it('should revert when saleStartTimestamp > saleEndTimestamp', async () => {
      const invalidParams = {
        ...defaultParams,
        saleStartTimestamp: BigInt(defaultParams.saleEndTimestamp) + 1n,
      };

      await expect(deployPublicSaleProxy(deployer, invalidParams)).to.be.revertedWithCustomError(
        PublicSaleV1__factory.connect(ethers.ZeroAddress, deployer),
        'InvalidSaleTimestamps',
      );
    });

    it('should revert when saleStartTimestamp < block.timestamp', async () => {
      const currentTime = await time.latest();
      const invalidParams = {
        ...defaultParams,
        saleStartTimestamp: currentTime - 1,
      };

      await expect(deployPublicSaleProxy(deployer, invalidParams)).to.be.revertedWithCustomError(
        PublicSaleV1__factory.connect(ethers.ZeroAddress, deployer),
        'InvalidSaleStartTimestamp',
      );
    });

    it('should revert when minimumCommitment > maximumCommitment', async () => {
      const invalidParams = {
        ...defaultParams,
        minimumCommitment: BigInt(defaultParams.maximumCommitment) + 1n,
      };

      await expect(deployPublicSaleProxy(deployer, invalidParams)).to.be.revertedWithCustomError(
        PublicSaleV1__factory.connect(ethers.ZeroAddress, deployer),
        'InvalidCommitmentAmounts',
      );
    });

    it('should revert when minimumTotalCommitment > maximumTotalCommitment', async () => {
      const invalidParams = {
        ...defaultParams,
        minimumTotalCommitment: BigInt(defaultParams.maximumTotalCommitment) + 1n,
      };

      await expect(deployPublicSaleProxy(deployer, invalidParams)).to.be.revertedWithCustomError(
        PublicSaleV1__factory.connect(ethers.ZeroAddress, deployer),
        'InvalidTotalCommitmentAmounts',
      );
    });

    it('should revert when decreaseCommitmentFee > TEST_CONSTANTS.PRECISION', async () => {
      const invalidParams = {
        ...defaultParams,
        decreaseCommitmentFee: TEST_CONSTANTS.PRECISION + 1n,
      };

      await expect(deployPublicSaleProxy(deployer, invalidParams)).to.be.revertedWithCustomError(
        PublicSaleV1__factory.connect(ethers.ZeroAddress, deployer),
        'InvalidDecreaseCommitmentFee',
      );
    });

    it('should revert when protocolFee > TEST_CONSTANTS.PRECISION', async () => {
      const invalidParams = {
        ...defaultParams,
        protocolFee: TEST_CONSTANTS.PRECISION + 1n,
      };

      await expect(deployPublicSaleProxy(deployer, invalidParams)).to.be.revertedWithCustomError(
        PublicSaleV1__factory.connect(ethers.ZeroAddress, deployer),
        'InvalidProtocolFee',
      );
    });

    it('should prevent double initialization', async () => {
      publicSale = await deployPublicSaleProxy(deployer, defaultParams);

      await expect(publicSale.initialize(defaultParams)).to.be.revertedWithCustomError(
        publicSale,
        'InvalidInitialization',
      );
    });
  });

  describe('Sale State Transitions', () => {
    beforeEach(async () => {
      publicSale = await deployPublicSaleProxy(deployer, defaultParams);
    });

    it('should return NOT_STARTED when block.timestamp < saleStartTimestamp', async () => {
      await expectSaleState(publicSale, SaleState.NOT_STARTED);
    });

    it('should return ACTIVE when sale is ongoing', async () => {
      await moveToSaleStart(publicSale);
      await expectSaleState(publicSale, SaleState.ACTIVE);
    });

    it('should return SUCCEEDED when totalCommitments >= maximumTotalCommitment', async () => {
      // Deploy a sale with smaller maximum total that we can reach with available signers
      const succeededSale = await deployTestSale(
        deployer,
        saleToken,
        saleTokenHolder,
        defaultParams,
        {
          maximumTotalCommitment: ethers.parseEther('10000'), // 10 users at 1000 each
        },
      );
      await moveToSaleStart(succeededSale);

      // Fill the sale to exactly maximum total
      const signers = await ethers.getSigners();
      for (let i = 0; i < 10; i++) {
        const user = signers[i + 2]; // Skip deployer and owner
        await commitmentToken.mint(user.address, defaultParams.maximumCommitment);
        await commitmentToken
          .connect(user)
          .approve(await succeededSale.getAddress(), defaultParams.maximumCommitment);
        await succeededSale
          .connect(user)
          .increaseCommitmentERC20(defaultParams.maximumCommitment, ethers.getBytes('0x'), 0n);
      }

      expect(await succeededSale.totalCommitments()).to.equal(ethers.parseEther('10000'));
      await expectSaleState(succeededSale, SaleState.SUCCEEDED);
    });

    it('should return SUCCEEDED when sale ended and totalCommitments >= minimumTotalCommitment', async () => {
      await moveToSaleStart(publicSale);

      // Setup initial commitments
      await mintAndApproveCommitmentTokens(
        commitmentToken,
        publicSale,
        [alice, bob],
        [BigInt(defaultParams.minimumTotalCommitment), BigInt(defaultParams.maximumCommitment)],
      );

      // Alice commits minimum per user
      await publicSale
        .connect(alice)
        .increaseCommitmentERC20(defaultParams.minimumCommitment, ethers.getBytes('0x'), 0n);

      // Bob commits the rest
      await publicSale
        .connect(bob)
        .increaseCommitmentERC20(defaultParams.maximumCommitment, ethers.getBytes('0x'), 0n);

      // Reach minimum total commitment
      await reachMinimumTotalCommitment(
        publicSale,
        commitmentToken,
        BigInt(defaultParams.minimumTotalCommitment),
        BigInt(defaultParams.maximumCommitment),
        [
          { user: alice, amount: BigInt(defaultParams.minimumCommitment) },
          { user: bob, amount: BigInt(defaultParams.maximumCommitment) },
        ],
      );

      // Move past sale end
      await moveToSaleEnd(publicSale);

      await expectSaleState(publicSale, SaleState.SUCCEEDED);
    });

    it('should return FAILED when sale ended and totalCommitments < minimumTotalCommitment', async () => {
      await moveToSaleStart(publicSale);

      // Commit less than minimum total
      await mintAndApproveCommitmentTokens(
        commitmentToken,
        publicSale,
        [alice],
        [BigInt(defaultParams.minimumCommitment)],
      );
      await publicSale
        .connect(alice)
        .increaseCommitmentERC20(defaultParams.minimumCommitment, ethers.getBytes('0x'), 0n);

      // Move past sale end
      await moveToSaleEnd(publicSale);

      await expectSaleState(publicSale, SaleState.FAILED);
    });

    it('should handle edge case at exact saleStartTimestamp', async () => {
      await time.increaseTo(Number(defaultParams.saleStartTimestamp) - 1);
      await expectSaleState(publicSale, SaleState.NOT_STARTED);

      await time.increaseTo(Number(defaultParams.saleStartTimestamp));
      await expectSaleState(publicSale, SaleState.ACTIVE);
    });

    it('should handle edge case at exact saleEndTimestamp', async () => {
      await time.increaseTo(defaultParams.saleEndTimestamp);
      // Still active at exact end timestamp if not enough commitments
      await expectSaleState(publicSale, SaleState.ACTIVE);

      await time.increaseTo(Number(defaultParams.saleEndTimestamp) + 1);
      // Failed after end timestamp with no commitments
      await expectSaleState(publicSale, SaleState.FAILED);
    });
  });

  describe('Commitment Increase - ERC20 Token', () => {
    beforeEach(async () => {
      publicSale = await deployPublicSaleProxy(deployer, defaultParams);
      await moveToSaleStart(publicSale);

      // Setup commitment tokens for test accounts
      await mintAndApproveCommitmentTokens(
        commitmentToken,
        publicSale,
        [alice, bob],
        [ethers.parseEther('10000'), ethers.parseEther('10000')],
      );
    });

    it('should allow first commitment by user', async () => {
      const commitAmount = ethers.parseEther('100');
      await expect(
        publicSale.connect(alice).increaseCommitmentERC20(commitAmount, ethers.getBytes('0x'), 0n),
      )
        .to.emit(publicSale, 'CommitmentIncreased')
        .withArgs(alice.address, commitAmount);

      expect(await publicSale.commitments(alice.address)).to.equal(commitAmount);
      expect(await publicSale.totalCommitments()).to.equal(commitAmount);
    });

    it('should allow increasing existing commitment', async () => {
      const firstCommit = ethers.parseEther('100');
      const secondCommit = ethers.parseEther('200');

      await publicSale
        .connect(alice)
        .increaseCommitmentERC20(firstCommit, ethers.getBytes('0x'), 0n);
      await publicSale
        .connect(alice)
        .increaseCommitmentERC20(secondCommit, ethers.getBytes('0x'), 0n);

      expect(await publicSale.commitments(alice.address)).to.equal(firstCommit + secondCommit);
      expect(await publicSale.totalCommitments()).to.equal(firstCommit + secondCommit);
    });

    it('should allow commitment that reaches exactly minimumCommitment', async () => {
      await publicSale
        .connect(alice)
        .increaseCommitmentERC20(defaultParams.minimumCommitment, ethers.getBytes('0x'), 0n);
      expect(await publicSale.commitments(alice.address)).to.equal(defaultParams.minimumCommitment);
    });

    it('should allow commitment that reaches exactly maximumCommitment', async () => {
      await publicSale
        .connect(alice)
        .increaseCommitmentERC20(defaultParams.maximumCommitment, ethers.getBytes('0x'), 0n);
      expect(await publicSale.commitments(alice.address)).to.equal(defaultParams.maximumCommitment);
    });

    it('should allow commitment that makes totalCommitments reach exactly maximumTotalCommitment', async () => {
      // Test with smaller values to work with limited signers
      const testSale = await deployTestSale(deployer, saleToken, saleTokenHolder, defaultParams, {
        minimumTotalCommitment: ethers.parseEther('1000'),
        maximumTotalCommitment: ethers.parseEther('5000'), // 5 users at 1000 each
      });
      await moveToSaleStart(testSale);

      // Use 5 users to reach exactly 5000 commitment tokens total
      const signers = await ethers.getSigners();
      const users = [alice, bob, charlie, signers[5], signers[6]];
      const commitmentPerUser = ethers.parseEther('1000');

      await mintAndApproveCommitmentTokens(
        commitmentToken,
        testSale,
        users,
        Array(users.length).fill(commitmentPerUser),
      );

      for (const user of users) {
        await testSale
          .connect(user)
          .increaseCommitmentERC20(commitmentPerUser, ethers.getBytes('0x'), 0n);
      }

      expect(await testSale.totalCommitments()).to.equal(ethers.parseEther('5000'));
      await expectSaleState(testSale, SaleState.SUCCEEDED);
    });

    it('should revert when using ERC20 function with native asset commitment token', async () => {
      const nativeSale = await deployTestSale(deployer, saleToken, saleTokenHolder, defaultParams, {
        commitmentToken: TEST_CONSTANTS.NATIVE_ASSET,
      });
      await moveToSaleStart(nativeSale);

      await expect(
        nativeSale
          .connect(alice)
          .increaseCommitmentERC20(ethers.parseEther('100'), ethers.getBytes('0x'), 0n),
      ).to.be.revertedWithCustomError(nativeSale, 'InvalidCommitmentToken');
    });

    it('should revert when sale has not started', async () => {
      const freshSale = await deployTestSale(
        deployer,
        saleToken,
        saleTokenHolder,
        defaultParams,
        {},
      );
      // Don't time travel - sale hasn't started yet

      await expect(
        freshSale
          .connect(alice)
          .increaseCommitmentERC20(ethers.parseEther('100'), ethers.getBytes('0x'), 0n),
      ).to.be.revertedWithCustomError(freshSale, 'SaleNotActive');
    });

    it('should revert when sale has ended', async () => {
      await time.increaseTo(Number(defaultParams.saleEndTimestamp) + 1);

      await expect(
        publicSale
          .connect(alice)
          .increaseCommitmentERC20(ethers.parseEther('100'), ethers.getBytes('0x'), 0n),
      ).to.be.revertedWithCustomError(publicSale, 'SaleNotActive');
    });

    it('should revert when increaseAmount is 0', async () => {
      await expect(
        publicSale.connect(alice).increaseCommitmentERC20(0, ethers.getBytes('0x'), 0n),
      ).to.be.revertedWithCustomError(publicSale, 'ZeroAmount');
    });

    it('should revert when increase would exceed maximumTotalCommitment', async () => {
      // Create a fresh sale with smaller limits for easier testing
      const exceedSale = await deployTestSale(deployer, saleToken, saleTokenHolder, defaultParams, {
        minimumTotalCommitment: ethers.parseEther('100'),
        maximumTotalCommitment: ethers.parseEther('200'),
      });
      await moveToSaleStart(exceedSale);

      // Alice commits 150 ETH (within her per-user limit but leaves only 50 ETH room)
      await mintAndApproveCommitmentTokens(
        commitmentToken,
        exceedSale,
        [alice],
        [ethers.parseEther('150')],
      );
      await exceedSale
        .connect(alice)
        .increaseCommitmentERC20(ethers.parseEther('150'), ethers.getBytes('0x'), 0n);

      // Bob tries to commit 60 ETH which would exceed total maximum
      await mintAndApproveCommitmentTokens(
        commitmentToken,
        exceedSale,
        [bob],
        [ethers.parseEther('60')],
      );

      await expect(
        exceedSale
          .connect(bob)
          .increaseCommitmentERC20(ethers.parseEther('60'), ethers.getBytes('0x'), 0n),
      ).to.be.revertedWithCustomError(exceedSale, 'MaximumTotalCommitment');

      // Bob can commit exactly 50 ETH to reach the maximum
      await exceedSale
        .connect(bob)
        .increaseCommitmentERC20(ethers.parseEther('50'), ethers.getBytes('0x'), 0n);
      expect(await exceedSale.totalCommitments()).to.equal(ethers.parseEther('200'));
    });

    it('should revert when new commitment < minimumCommitment', async () => {
      const tooSmall = BigInt(defaultParams.minimumCommitment) - ethers.parseEther('1');
      await expect(
        publicSale.connect(alice).increaseCommitmentERC20(tooSmall, ethers.getBytes('0x'), 0n),
      ).to.be.revertedWithCustomError(publicSale, 'MinimumCommitment');
    });

    it('should revert when new commitment > maximumCommitment per user', async () => {
      const tooMuch = BigInt(defaultParams.maximumCommitment) + ethers.parseEther('1');
      await expect(
        publicSale.connect(alice).increaseCommitmentERC20(tooMuch, ethers.getBytes('0x'), 0n),
      ).to.be.revertedWithCustomError(publicSale, 'MaximumCommitment');
    });

    it('should revert when KYC verification fails', async () => {
      await kycVerifier.setVerify(false);

      await expect(
        publicSale
          .connect(alice)
          .increaseCommitmentERC20(ethers.parseEther('100'), ethers.getBytes('0x'), 0n),
      ).to.be.revertedWithCustomError(kycVerifier, 'InvalidSignature');
    });
  });

  describe('Commitment Increase - Native Asset (ETH)', () => {
    let nativeSale: PublicSaleV1;

    beforeEach(async () => {
      const nativeParams = { ...defaultParams, commitmentToken: TEST_CONSTANTS.NATIVE_ASSET };
      nativeSale = await deployPublicSaleProxy(deployer, nativeParams);
      await moveToSaleStart(nativeSale);
    });

    it('should allow first commitment by user with native asset', async () => {
      const commitAmount = ethers.parseEther('100');
      await expect(
        nativeSale
          .connect(alice)
          .increaseCommitmentNative(ethers.getBytes('0x'), 0n, { value: commitAmount }),
      )
        .to.emit(nativeSale, 'CommitmentIncreased')
        .withArgs(alice.address, commitAmount);

      expect(await nativeSale.commitments(alice.address)).to.equal(commitAmount);
      expect(await nativeSale.totalCommitments()).to.equal(commitAmount);
      expect(await ethers.provider.getBalance(await nativeSale.getAddress())).to.equal(
        commitAmount,
      );
    });

    it('should revert when using native function with ERC20 commitment token', async () => {
      // Create a fresh ERC20-based sale
      const erc20Sale = await deployTestSale(deployer, saleToken, saleTokenHolder, defaultParams, {
        startOffset: 60,
      });
      await moveToSaleStart(erc20Sale);

      await expect(
        erc20Sale
          .connect(alice)
          .increaseCommitmentNative(ethers.getBytes('0x'), 0n, { value: ethers.parseEther('100') }),
      ).to.be.revertedWithCustomError(erc20Sale, 'InvalidCommitmentToken');
    });

    it('should enforce same validation rules as ERC20', async () => {
      // Test minimum commitment
      await expect(
        nativeSale.connect(alice).increaseCommitmentNative(ethers.getBytes('0x'), 0n, {
          value: BigInt(defaultParams.minimumCommitment) - 1n,
        }),
      ).to.be.revertedWithCustomError(nativeSale, 'MinimumCommitment');

      // Test maximum commitment
      await expect(
        nativeSale.connect(alice).increaseCommitmentNative(ethers.getBytes('0x'), 0n, {
          value: BigInt(defaultParams.maximumCommitment) + 1n,
        }),
      ).to.be.revertedWithCustomError(nativeSale, 'MaximumCommitment');
    });
  });

  describe('Commitment Decrease', () => {
    beforeEach(async () => {
      publicSale = await deployPublicSaleProxy(deployer, defaultParams);
      await moveToSaleStart(publicSale);

      // Setup alice with commitment tokens and an initial commitment
      await mintAndApproveCommitmentTokens(
        commitmentToken,
        publicSale,
        [alice],
        [ethers.parseEther('10000')],
      );
      await publicSale
        .connect(alice)
        .increaseCommitmentERC20(ethers.parseEther('1000'), ethers.getBytes('0x'), 0n);
    });

    it('should allow partial decrease that stays above minimumCommitment', async () => {
      const decreaseAmount = ethers.parseEther('500');
      const expectedFee =
        (BigInt(decreaseAmount) * BigInt(defaultParams.decreaseCommitmentFee)) /
        TEST_CONSTANTS.PRECISION;
      const expectedReceived = BigInt(decreaseAmount) - expectedFee;

      const initialBalance = await commitmentToken.balanceOf(alice.address);

      await expect(publicSale.connect(alice).decreaseCommitment(decreaseAmount, alice.address))
        .to.emit(publicSale, 'CommitmentDecreased')
        .withArgs(alice.address, decreaseAmount);

      expect(await publicSale.commitments(alice.address)).to.equal(ethers.parseEther('500'));
      expect(await publicSale.totalCommitments()).to.equal(ethers.parseEther('500'));
      expect(await publicSale.collectedDecreaseCommitmentFees()).to.equal(expectedFee);
      expect(await commitmentToken.balanceOf(alice.address)).to.equal(
        BigInt(initialBalance) + expectedReceived,
      );
    });

    it('should allow full decrease to exactly 0', async () => {
      const fullAmount = await publicSale.commitments(alice.address);
      const expectedFee =
        (BigInt(fullAmount) * BigInt(defaultParams.decreaseCommitmentFee)) /
        TEST_CONSTANTS.PRECISION;

      await publicSale.connect(alice).decreaseCommitment(fullAmount, alice.address);

      expect(await publicSale.commitments(alice.address)).to.equal(0);
      expect(await publicSale.totalCommitments()).to.equal(0);
      expect(await publicSale.collectedDecreaseCommitmentFees()).to.equal(expectedFee);
    });

    it('should handle different fee percentages correctly', async () => {
      // Test with 0% fee
      const zeroFeeSale = await deployTestSale(
        deployer,
        saleToken,
        saleTokenHolder,
        defaultParams,
        {
          decreaseCommitmentFee: 0n,
          startOffset: 60,
        },
      );
      await moveToSaleStart(zeroFeeSale);

      await mintAndApproveCommitmentTokens(
        commitmentToken,
        zeroFeeSale,
        [alice],
        [ethers.parseEther('10000')],
      );
      await zeroFeeSale
        .connect(alice)
        .increaseCommitmentERC20(ethers.parseEther('1000'), ethers.getBytes('0x'), 0n);

      const decreaseAmount = ethers.parseEther('500');
      await zeroFeeSale.connect(alice).decreaseCommitment(decreaseAmount, alice.address);

      expect(await zeroFeeSale.collectedDecreaseCommitmentFees()).to.equal(0);
    });

    it('should revert when sale is not active', async () => {
      const freshSale = await deployTestSale(
        deployer,
        saleToken,
        saleTokenHolder,
        defaultParams,
        {},
      );
      // Sale hasn't started yet

      await expect(
        freshSale.connect(alice).decreaseCommitment(ethers.parseEther('100'), alice.address),
      ).to.be.revertedWithCustomError(freshSale, 'SaleNotActive');
    });

    it('should revert when decreaseAmount is 0', async () => {
      await expect(
        publicSale.connect(alice).decreaseCommitment(0, alice.address),
      ).to.be.revertedWithCustomError(publicSale, 'ZeroAmount');
    });

    it('should revert when decrease > users commitment', async () => {
      const tooMuch = BigInt(await publicSale.commitments(alice.address)) + ethers.parseEther('1');
      await expect(
        publicSale.connect(alice).decreaseCommitment(tooMuch, alice.address),
      ).to.be.revertedWithCustomError(publicSale, 'DecreaseAmountExceedsCommitment');
    });

    it('should revert when remaining would be < minimumCommitment (unless going to 0)', async () => {
      // Try to decrease to just below minimum
      const currentCommitment = await publicSale.commitments(alice.address);
      const decreaseToJustBelowMin =
        BigInt(currentCommitment) -
        BigInt(defaultParams.minimumCommitment) +
        ethers.parseEther('1');

      await expect(
        publicSale.connect(alice).decreaseCommitment(decreaseToJustBelowMin, alice.address),
      ).to.be.revertedWithCustomError(publicSale, 'MinimumCommitment');
    });

    it('should send funds to specified recipient address', async () => {
      const decreaseAmount = ethers.parseEther('500');
      const expectedFee =
        (BigInt(decreaseAmount) * BigInt(defaultParams.decreaseCommitmentFee)) /
        TEST_CONSTANTS.PRECISION;
      const expectedReceived = BigInt(decreaseAmount) - expectedFee;

      const initialBobBalance = await commitmentToken.balanceOf(bob.address);

      await publicSale.connect(alice).decreaseCommitment(decreaseAmount, bob.address);

      expect(await commitmentToken.balanceOf(bob.address)).to.equal(
        BigInt(initialBobBalance) + expectedReceived,
      );
    });
  });

  describe('User Settlement - Success Case', () => {
    beforeEach(async () => {
      publicSale = await deployTestSale(deployer, saleToken, saleTokenHolder, defaultParams, {
        startOffset: 60,
      });
      await moveToSaleStart(publicSale);

      // Setup commitments
      await mintAndApproveCommitmentTokens(
        commitmentToken,
        publicSale,
        [alice, bob],
        [ethers.parseEther('50000'), ethers.parseEther('50000')],
      );

      // Make enough commitments to succeed
      await publicSale
        .connect(alice)
        .increaseCommitmentERC20(defaultParams.minimumCommitment, ethers.getBytes('0x'), 0n);
      await publicSale
        .connect(bob)
        .increaseCommitmentERC20(defaultParams.maximumCommitment, ethers.getBytes('0x'), 0n);

      // Reach minimum total commitment
      await reachMinimumTotalCommitment(
        publicSale,
        commitmentToken,
        BigInt(defaultParams.minimumTotalCommitment),
        BigInt(defaultParams.maximumCommitment),
        [
          { user: alice, amount: BigInt(defaultParams.minimumCommitment) },
          { user: bob, amount: BigInt(defaultParams.maximumCommitment) },
        ],
      );

      // Move to end of sale
      await moveToSaleEnd(publicSale);
    });

    it('should allow user to settle and receive sale tokens', async () => {
      const commitment = await publicSale.commitments(alice.address);
      const expectedSaleTokens =
        (BigInt(commitment) * TEST_CONSTANTS.PRECISION) / BigInt(defaultParams.saleTokenPrice);

      await expect(publicSale.connect(alice).settle(alice.address))
        .to.emit(publicSale, 'SuccessfulSaleSettled')
        .withArgs(alice.address, alice.address, expectedSaleTokens);

      expect(await saleToken.balanceOf(alice.address)).to.equal(expectedSaleTokens);
      expect(await publicSale.settled(alice.address)).to.be.true;
    });

    it('should calculate sale token amount with correct precision', async () => {
      const commitment = await publicSale.commitments(alice.address);
      const expectedSaleTokens =
        (BigInt(commitment) * TEST_CONSTANTS.PRECISION) / BigInt(defaultParams.saleTokenPrice);

      await publicSale.connect(alice).settle(alice.address);
      expect(await saleToken.balanceOf(alice.address)).to.equal(expectedSaleTokens);
    });

    it('should allow settlement to different recipient address', async () => {
      const commitment = await publicSale.commitments(alice.address);
      const expectedSaleTokens =
        (BigInt(commitment) * TEST_CONSTANTS.PRECISION) / BigInt(defaultParams.saleTokenPrice);

      await publicSale.connect(alice).settle(bob.address);

      expect(await saleToken.balanceOf(bob.address)).to.equal(expectedSaleTokens);
      expect(await saleToken.balanceOf(alice.address)).to.equal(0);
      expect(await publicSale.settled(alice.address)).to.be.true;
    });

    it('should revert when user settles twice', async () => {
      await publicSale.connect(alice).settle(alice.address);

      await expect(publicSale.connect(alice).settle(alice.address)).to.be.revertedWithCustomError(
        publicSale,
        'AlreadySettled',
      );
    });

    it('should revert when user has no commitment', async () => {
      await expect(
        publicSale.connect(nonCommitter).settle(nonCommitter.address),
      ).to.be.revertedWithCustomError(publicSale, 'ZeroCommitment');
    });

    it('should revert when sale is still active', async () => {
      // Create a new sale that's still active
      const activeSale = await deployTestSale(deployer, saleToken, saleTokenHolder, defaultParams, {
        startOffset: 10,
      });
      await moveToSaleStart(activeSale);

      // Make a commitment
      await mintAndApproveCommitmentTokens(
        commitmentToken,
        activeSale,
        [alice],
        [BigInt(defaultParams.minimumCommitment)],
      );
      await activeSale
        .connect(alice)
        .increaseCommitmentERC20(defaultParams.minimumCommitment, ethers.getBytes('0x'), 0n);

      await expect(activeSale.connect(alice).settle(alice.address)).to.be.revertedWithCustomError(
        activeSale,
        'SaleNotEnded',
      );
    });
  });

  describe('User Settlement - Failure Case', () => {
    beforeEach(async () => {
      publicSale = await deployPublicSaleProxy(deployer, defaultParams);
      await time.increaseTo(Number(defaultParams.saleStartTimestamp));

      // Setup minimal commitments (not enough to succeed)
      await commitmentToken.mint(alice.address, ethers.parseEther('100'));
      await commitmentToken
        .connect(alice)
        .approve(await publicSale.getAddress(), ethers.parseEther('100'));
      await publicSale
        .connect(alice)
        .increaseCommitmentERC20(defaultParams.minimumCommitment, ethers.getBytes('0x'), 0n);

      // Move to end of sale
      await time.increaseTo(Number(defaultParams.saleEndTimestamp) + 1);
    });

    it('should refund exact commitment amount when sale fails', async () => {
      const commitment = await publicSale.commitments(alice.address);
      const initialBalance = await commitmentToken.balanceOf(alice.address);

      await expect(publicSale.connect(alice).settle(alice.address))
        .to.emit(publicSale, 'FailedSaleSettled')
        .withArgs(alice.address, alice.address, commitment);

      expect(await commitmentToken.balanceOf(alice.address)).to.equal(initialBalance + commitment);
      expect(await publicSale.settled(alice.address)).to.be.true;
    });

    it('should not transfer any sale tokens when sale fails', async () => {
      await publicSale.connect(alice).settle(alice.address);
      expect(await saleToken.balanceOf(alice.address)).to.equal(0);
    });

    it('should allow settlement to different recipient for refund', async () => {
      const commitment = await publicSale.commitments(alice.address);

      await publicSale.connect(alice).settle(bob.address);

      expect(await commitmentToken.balanceOf(bob.address)).to.equal(commitment);
      expect(await commitmentToken.balanceOf(alice.address)).to.equal(
        ethers.parseEther('100') - BigInt(commitment),
      );
    });
  });

  describe('Owner Settlement - Success Case', () => {
    beforeEach(async () => {
      publicSale = await deployTestSale(deployer, saleToken, saleTokenHolder, defaultParams, {
        startOffset: 60,
      });
      await moveToSaleStart(publicSale);

      // Setup successful sale
      await mintAndApproveCommitmentTokens(
        commitmentToken,
        publicSale,
        [alice, bob],
        [ethers.parseEther('50000'), ethers.parseEther('50000')],
      );

      await publicSale
        .connect(alice)
        .increaseCommitmentERC20(defaultParams.minimumCommitment, ethers.getBytes('0x'), 0n);
      await publicSale
        .connect(bob)
        .increaseCommitmentERC20(defaultParams.maximumCommitment, ethers.getBytes('0x'), 0n);

      // Reach minimum total commitment
      await reachMinimumTotalCommitment(
        publicSale,
        commitmentToken,
        BigInt(defaultParams.minimumTotalCommitment),
        BigInt(defaultParams.maximumCommitment),
        [
          { user: alice, amount: BigInt(defaultParams.minimumCommitment) },
          { user: bob, amount: BigInt(defaultParams.maximumCommitment) },
        ],
      );

      // Move to end of sale
      await moveToSaleEnd(publicSale);
    });

    it('should distribute proceeds and protocol fees correctly', async () => {
      const totalBalance = await commitmentToken.balanceOf(await publicSale.getAddress());
      const protocolFeeAmount =
        (BigInt(totalBalance) * BigInt(defaultParams.protocolFee)) / TEST_CONSTANTS.PRECISION;
      const saleProceedsAmount = BigInt(totalBalance) - protocolFeeAmount;

      await expect(publicSale.connect(owner).ownerSettle())
        .to.emit(publicSale, 'SuccessfulSaleOwnerSettled')
        .withArgs(owner.address, saleProceedsAmount, protocolFeeAmount);

      expect(await commitmentToken.balanceOf(saleProceedsReceiver.address)).to.equal(
        saleProceedsAmount,
      );
      expect(await commitmentToken.balanceOf(protocolFeeReceiver.address)).to.equal(
        protocolFeeAmount,
      );
      expect(await publicSale.ownerSettled()).to.be.true;
    });

    it('should handle different protocol fee percentages', async () => {
      // Deploy with different protocol fee
      const customSale = await deployTestSale(deployer, saleToken, saleTokenHolder, defaultParams, {
        protocolFee: ethers.parseEther('0.1'), // 10%
        startOffset: 60,
      });
      await moveToSaleStart(customSale);

      // Multiple users commit to reach minimum total
      const signers = await ethers.getSigners();
      const commitmentPerUser = defaultParams.maximumCommitment;
      const numUsers = Number(
        BigInt(defaultParams.minimumTotalCommitment) / BigInt(commitmentPerUser),
      );

      const users = signers.slice(2, 2 + numUsers); // Skip deployer and owner
      await mintAndApproveCommitmentTokens(
        commitmentToken,
        customSale,
        users,
        Array(numUsers).fill(BigInt(commitmentPerUser)),
      );

      for (const user of users) {
        await customSale
          .connect(user)
          .increaseCommitmentERC20(commitmentPerUser, ethers.getBytes('0x'), 0n);
      }

      await moveToSaleEnd(customSale);

      const totalBalance = await commitmentToken.balanceOf(await customSale.getAddress());
      const protocolFeeAmount =
        (totalBalance * ethers.parseEther('0.1')) / TEST_CONSTANTS.PRECISION;

      await customSale.connect(owner).ownerSettle();

      expect(await commitmentToken.balanceOf(protocolFeeReceiver.address)).to.equal(
        protocolFeeAmount,
      );
    });

    it('should revert when owner settles twice', async () => {
      await publicSale.connect(owner).ownerSettle();

      await expect(publicSale.connect(owner).ownerSettle()).to.be.revertedWithCustomError(
        publicSale,
        'AlreadySettled',
      );
    });

    it('should revert when non-owner tries to settle', async () => {
      await expect(publicSale.connect(alice).ownerSettle()).to.be.revertedWithCustomError(
        publicSale,
        'OwnableUnauthorizedAccount',
      );
    });
  });

  describe('Owner Settlement - Failure Case', () => {
    beforeEach(async () => {
      publicSale = await deployPublicSaleProxy(deployer, defaultParams);
      await time.increaseTo(Number(defaultParams.saleStartTimestamp));

      // Setup failed sale with some decrease commitment fees
      await commitmentToken.mint(alice.address, ethers.parseEther('1000'));
      await commitmentToken
        .connect(alice)
        .approve(await publicSale.getAddress(), ethers.parseEther('1000'));
      await kycVerifier.setVerify(true);

      await publicSale
        .connect(alice)
        .increaseCommitmentERC20(ethers.parseEther('100'), ethers.getBytes('0x'), 0n);
      await publicSale.connect(alice).decreaseCommitment(ethers.parseEther('50'), alice.address);

      // Move to end of sale
      await time.increaseTo(Number(defaultParams.saleEndTimestamp) + 1);
    });

    it('should return all sale tokens and collected fees', async () => {
      const saleTokenBalance = await saleToken.balanceOf(await publicSale.getAddress());
      const collectedFees = await publicSale.collectedDecreaseCommitmentFees();

      await expect(publicSale.connect(owner).ownerSettle())
        .to.emit(publicSale, 'FailedSaleOwnerSettled')
        .withArgs(owner.address, saleTokenBalance, collectedFees);

      expect(await saleToken.balanceOf(saleProceedsReceiver.address)).to.equal(saleTokenBalance);
      expect(await commitmentToken.balanceOf(saleProceedsReceiver.address)).to.equal(collectedFees);
    });

    it('should handle case with no decrease fees collected', async () => {
      // Deploy fresh sale that fails without any decreases
      const freshSale = await deployTestSale(deployer, saleToken, saleTokenHolder, defaultParams, {
        startOffset: 100,
        endOffset: 1000,
      });
      await moveToSaleEnd(freshSale);

      const saleTokenBalance = await saleToken.balanceOf(await freshSale.getAddress());

      await freshSale.connect(owner).ownerSettle();

      expect(await saleToken.balanceOf(saleProceedsReceiver.address)).to.equal(saleTokenBalance);
      expect(await commitmentToken.balanceOf(saleProceedsReceiver.address)).to.equal(0);
    });
  });

  describe('Token Decimal & Precision Testing', () => {
    it('should handle saleToken: 6 decimals, commitmentToken: 18 decimals', async () => {
      // Deploy tokens with different decimals
      const saleToken6 = await new MockERC20__factory(deployer).deploy('Sale6', 'S6', 6);
      const commitToken18 = await new MockERC20__factory(deployer).deploy('Commit18', 'C18', 18);

      // Calculate required escrow
      // The contract expects: (maximumTotalCommitment * TEST_CONSTANTS.PRECISION) / saleTokenPrice
      // = (10k * 10^18 * 10^18) / 10^18 = 10k * 10^18
      // This is the raw amount the contract will try to transfer
      const requiredEscrowRaw = ethers.parseEther('10000'); // 10k * 10^18
      await saleToken6.mint(saleTokenHolder.address, requiredEscrowRaw); // Mint the raw amount

      const currentTime = await time.latest();
      const customParams = {
        ...defaultParams,
        saleToken: await saleToken6.getAddress(),
        commitmentToken: await commitToken18.getAddress(),
        saleTokenPrice: ethers.parseEther('1'), // 1:1 ratio in terms of value
        maximumTotalCommitment: ethers.parseEther('10000'), // 10k commitment tokens
        saleStartTimestamp: BigInt(currentTime + 3600),
        saleEndTimestamp: BigInt(currentTime + 86400),
      };

      const customSale = await deployPublicSaleProxy(deployer, customParams);
      await time.increaseTo(Number(customParams.saleStartTimestamp));

      // Verify the escrow amount calculation
      const escrowAmount = await saleToken6.balanceOf(await customSale.getAddress());
      // The contract transfers the raw amount calculated as (maxTotalCommit * TEST_CONSTANTS.PRECISION) / price
      // = (10k * 10^18 * 10^18) / 10^18 = 10k * 10^18
      const expectedEscrow = ethers.parseEther('10000'); // This is the raw amount
      expect(escrowAmount).to.equal(expectedEscrow);
    });

    it('should handle extreme price values', async () => {
      const extremeSale = await deployTestSale(
        deployer,
        saleToken,
        saleTokenHolder,
        defaultParams,
        {
          saleTokenPrice: ethers.parseEther('0.000001'), // Very low price
        },
      );
      await moveToSaleStart(extremeSale);

      // Setup alice with commitment tokens
      await mintAndApproveCommitmentTokens(
        commitmentToken,
        extremeSale,
        [alice],
        [BigInt(defaultParams.maximumCommitment)],
      );

      // Alice makes a commitment
      await extremeSale
        .connect(alice)
        .increaseCommitmentERC20(defaultParams.maximumCommitment, ethers.getBytes('0x'), 0n);

      // Reach minimum total commitment with other users
      await reachMinimumTotalCommitment(
        extremeSale,
        commitmentToken,
        BigInt(defaultParams.minimumTotalCommitment),
        BigInt(defaultParams.maximumCommitment),
        [{ user: alice, amount: BigInt(defaultParams.maximumCommitment) }],
      );

      await moveToSaleEnd(extremeSale);

      const commitment = await extremeSale.commitments(alice.address);
      const expectedSaleTokens =
        (BigInt(commitment) * TEST_CONSTANTS.PRECISION) / ethers.parseEther('0.000001');

      await extremeSale.connect(alice).settle(alice.address);

      expect(await saleToken.balanceOf(alice.address)).to.equal(expectedSaleTokens);
    });
  });

  describe('KYC Verification', () => {
    beforeEach(async () => {
      publicSale = await deployPublicSaleProxy(deployer, defaultParams);
      await time.increaseTo(Number(defaultParams.saleStartTimestamp));

      await commitmentToken.mint(alice.address, ethers.parseEther('1000'));
      await commitmentToken
        .connect(alice)
        .approve(await publicSale.getAddress(), ethers.parseEther('1000'));
    });

    it('should allow commitment increases when KYC verification passes', async () => {
      await kycVerifier.setVerify(true);

      await expect(
        publicSale
          .connect(alice)
          .increaseCommitmentERC20(ethers.parseEther('100'), ethers.getBytes('0x'), 0n),
      ).to.not.be.reverted;
    });

    it('should block commitment increases when KYC fails', async () => {
      await kycVerifier.setVerify(false);

      await expect(
        publicSale
          .connect(alice)
          .increaseCommitmentERC20(ethers.parseEther('100'), ethers.getBytes('0x'), 0n),
      ).to.be.revertedWithCustomError(kycVerifier, 'InvalidSignature');
    });

    it('should not require KYC for decreasing commitment and settling', async () => {
      await kycVerifier.setVerify(true);
      await publicSale
        .connect(alice)
        .increaseCommitmentERC20(ethers.parseEther('100'), ethers.getBytes('0x'), 0n);

      // Now disable KYC
      await kycVerifier.setVerify(false);

      // Decrease should work
      await expect(
        publicSale.connect(alice).decreaseCommitment(ethers.parseEther('50'), alice.address),
      ).to.not.be.reverted;

      // Move to end and settle should work
      await time.increaseTo(Number(defaultParams.saleEndTimestamp) + 1);
      await expect(publicSale.connect(alice).settle(alice.address)).to.not.be.reverted;
    });
  });

  describe('Access Control', () => {
    beforeEach(async () => {
      publicSale = await deployPublicSaleProxy(deployer, defaultParams);
      await time.increaseTo(Number(defaultParams.saleEndTimestamp) + 1);
    });

    it('should only allow owner to call ownerSettle', async () => {
      await expect(publicSale.connect(alice).ownerSettle()).to.be.revertedWithCustomError(
        publicSale,
        'OwnableUnauthorizedAccount',
      );

      await expect(publicSale.connect(owner).ownerSettle()).to.not.be.reverted;
    });

    it('should allow ownership transfer using Ownable2Step pattern', async () => {
      // Start transfer
      await publicSale.connect(owner).transferOwnership(alice.address);
      expect(await publicSale.owner()).to.equal(owner.address);
      expect(await publicSale.pendingOwner()).to.equal(alice.address);

      // Accept transfer
      await publicSale.connect(alice).acceptOwnership();
      expect(await publicSale.owner()).to.equal(alice.address);
      expect(await publicSale.pendingOwner()).to.equal(ethers.ZeroAddress);
    });
  });

  describe('Native Asset Handling', () => {
    let nativeSale: PublicSaleV1;

    beforeEach(async () => {
      const nativeParams = {
        ...defaultParams,
        commitmentToken: TEST_CONSTANTS.NATIVE_ASSET,
      };
      nativeSale = await deployPublicSaleProxy(deployer, nativeParams);
    });

    it('should verify NATIVE_ASSET constant is correct', async () => {
      expect(TEST_CONSTANTS.NATIVE_ASSET).to.equal('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE');
    });

    it('should accept and handle ETH correctly', async () => {
      await moveToSaleStart(nativeSale);

      const commitAmount = ethers.parseEther('100');
      const initialBalance = await ethers.provider.getBalance(await nativeSale.getAddress());

      await nativeSale
        .connect(alice)
        .increaseCommitmentNative(ethers.getBytes('0x'), 0n, { value: commitAmount });

      expect(await ethers.provider.getBalance(await nativeSale.getAddress())).to.equal(
        BigInt(initialBalance) + BigInt(commitAmount),
      );
    });

    it('should refund ETH correctly on decrease', async () => {
      await moveToSaleStart(nativeSale);

      await nativeSale
        .connect(alice)
        .increaseCommitmentNative(ethers.getBytes('0x'), 0n, { value: ethers.parseEther('100') });

      const initialAliceBalance = await ethers.provider.getBalance(alice.address);
      const decreaseAmount = ethers.parseEther('50');
      const expectedFee =
        (BigInt(decreaseAmount) * BigInt(defaultParams.decreaseCommitmentFee)) /
        TEST_CONSTANTS.PRECISION;
      const expectedReceived = BigInt(decreaseAmount) - expectedFee;

      const tx = await nativeSale.connect(alice).decreaseCommitment(decreaseAmount, alice.address);
      const receipt = await tx.wait();
      const gasUsed = BigInt(receipt!.gasUsed) * BigInt(receipt!.gasPrice);

      const finalAliceBalance = await ethers.provider.getBalance(alice.address);
      expect(finalAliceBalance).to.equal(BigInt(initialAliceBalance) + expectedReceived - gasUsed);
    });
  });

  describe('Edge Cases & Security', () => {
    beforeEach(async () => {
      publicSale = await deployPublicSaleProxy(deployer, defaultParams);
    });

    it('should handle race to reach maximumTotalCommitment', async () => {
      // Use smaller values to test with limited signers
      const raceSale = await deployTestSale(deployer, saleToken, saleTokenHolder, defaultParams, {
        minimumTotalCommitment: ethers.parseEther('3000'),
        maximumTotalCommitment: ethers.parseEther('5000'), // Only need 5 users
      });
      await moveToSaleStart(raceSale);

      // Setup users with enough tokens
      await mintAndApproveCommitmentTokens(
        commitmentToken,
        raceSale,
        [alice, bob],
        [BigInt(defaultParams.maximumCommitment), BigInt(defaultParams.maximumCommitment)],
      );

      // Alice commits her maximum
      await raceSale
        .connect(alice)
        .increaseCommitmentERC20(defaultParams.maximumCommitment, ethers.getBytes('0x'), 0n);

      // Fill more of the sale with other users, leaving exactly 1000 for Bob
      const signers = await ethers.getSigners();
      // We need to fill 5000 - 1000 (alice) - 1000 (remaining for bob) = 3000
      const amountPerUser = ethers.parseEther('1000');
      const fillUsers = signers.slice(9, 12); // 3 users
      await mintAndApproveCommitmentTokens(
        commitmentToken,
        raceSale,
        fillUsers,
        Array(3).fill(amountPerUser),
      );

      for (const user of fillUsers) {
        await raceSale
          .connect(user)
          .increaseCommitmentERC20(amountPerUser, ethers.getBytes('0x'), 0n);
      }

      // Now only 1000 ETH remaining
      // Bob tries to commit more than remaining
      await expect(
        raceSale
          .connect(bob)
          .increaseCommitmentERC20(ethers.parseEther('1001'), ethers.getBytes('0x'), 0n),
      ).to.be.revertedWithCustomError(raceSale, 'MaximumTotalCommitment');

      // Bob commits exactly the remaining amount
      await raceSale
        .connect(bob)
        .increaseCommitmentERC20(ethers.parseEther('1000'), ethers.getBytes('0x'), 0n);

      expect(await raceSale.totalCommitments()).to.equal(ethers.parseEther('5000'));
      await expectSaleState(raceSale, SaleState.SUCCEEDED);
    });
  });

  describe('Event Emission', () => {
    beforeEach(async () => {
      publicSale = await deployPublicSaleProxy(deployer, defaultParams);
      await moveToSaleStart(publicSale);
    });

    it('should emit CommitmentIncreased with correct parameters', async () => {
      await mintAndApproveCommitmentTokens(
        commitmentToken,
        publicSale,
        [alice],
        [ethers.parseEther('1000')],
      );

      const amount = ethers.parseEther('100');
      await expect(
        publicSale.connect(alice).increaseCommitmentERC20(amount, ethers.getBytes('0x'), 0n),
      )
        .to.emit(publicSale, 'CommitmentIncreased')
        .withArgs(alice.address, amount);
    });

    it('should emit all settlement events correctly', async () => {
      // Setup successful sale - need multiple users
      await mintAndApproveCommitmentTokens(
        commitmentToken,
        publicSale,
        [alice],
        [BigInt(defaultParams.maximumCommitment)],
      );
      await publicSale
        .connect(alice)
        .increaseCommitmentERC20(defaultParams.maximumCommitment, ethers.getBytes('0x'), 0n);

      // Reach minimum total commitment
      await reachMinimumTotalCommitment(
        publicSale,
        commitmentToken,
        BigInt(defaultParams.minimumTotalCommitment),
        BigInt(defaultParams.maximumCommitment),
        [{ user: alice, amount: BigInt(defaultParams.maximumCommitment) }],
      );

      await moveToSaleEnd(publicSale);

      // User settlement
      const aliceCommitment = await publicSale.commitments(alice.address);
      const expectedSaleTokens =
        (BigInt(aliceCommitment) * TEST_CONSTANTS.PRECISION) / BigInt(defaultParams.saleTokenPrice);

      await expect(publicSale.connect(alice).settle(alice.address))
        .to.emit(publicSale, 'SuccessfulSaleSettled')
        .withArgs(alice.address, alice.address, expectedSaleTokens);

      // Owner settlement
      const totalBalance = await commitmentToken.balanceOf(await publicSale.getAddress());
      const protocolFeeAmount =
        (BigInt(totalBalance) * BigInt(defaultParams.protocolFee)) / TEST_CONSTANTS.PRECISION;
      const saleProceedsAmount = BigInt(totalBalance) - protocolFeeAmount;

      await expect(publicSale.connect(owner).ownerSettle())
        .to.emit(publicSale, 'SuccessfulSaleOwnerSettled')
        .withArgs(owner.address, saleProceedsAmount, protocolFeeAmount);
    });
  });

  describe('View Functions', () => {
    beforeEach(async () => {
      publicSale = await deployPublicSaleProxy(deployer, defaultParams);
    });

    it('should return all correct values from view functions', async () => {
      expect(await publicSale.ownerSettled()).to.be.false;
      expect(await publicSale.saleStartTimestamp()).to.equal(defaultParams.saleStartTimestamp);
      expect(await publicSale.saleEndTimestamp()).to.equal(defaultParams.saleEndTimestamp);
      expect(await publicSale.commitmentToken()).to.equal(defaultParams.commitmentToken);
      expect(await publicSale.saleToken()).to.equal(defaultParams.saleToken);
      expect(await publicSale.kycVerifier()).to.equal(defaultParams.kycVerifier);
      expect(await publicSale.saleProceedsReceiver()).to.equal(defaultParams.saleProceedsReceiver);
      expect(await publicSale.protocolFeeReceiver()).to.equal(defaultParams.protocolFeeReceiver);
      expect(await publicSale.minimumCommitment()).to.equal(defaultParams.minimumCommitment);
      expect(await publicSale.maximumCommitment()).to.equal(defaultParams.maximumCommitment);
      expect(await publicSale.minimumTotalCommitment()).to.equal(
        defaultParams.minimumTotalCommitment,
      );
      expect(await publicSale.maximumTotalCommitment()).to.equal(
        defaultParams.maximumTotalCommitment,
      );
      expect(await publicSale.saleTokenPrice()).to.equal(defaultParams.saleTokenPrice);
      expect(await publicSale.decreaseCommitmentFee()).to.equal(
        defaultParams.decreaseCommitmentFee,
      );
      expect(await publicSale.protocolFee()).to.equal(defaultParams.protocolFee);
      expect(await publicSale.totalCommitments()).to.equal(0);
      expect(await publicSale.collectedDecreaseCommitmentFees()).to.equal(0);
      expect(await publicSale.commitments(alice.address)).to.equal(0);
      expect(await publicSale.settled(alice.address)).to.be.false;
    });
  });
});

// Run shared test suites
describe('PublicSaleV1 - Shared Tests', () => {
  let deployer: SignerWithAddress;
  let owner: SignerWithAddress;
  let saleProceedsReceiver: SignerWithAddress;
  let protocolFeeReceiver: SignerWithAddress;
  let saleTokenHolder: SignerWithAddress;
  let publicSale: PublicSaleV1;
  let saleToken: MockERC20;
  let commitmentToken: MockERC20;
  let kycVerifier: MockKYCVerifier;
  let defaultParams: IPublicSaleV1.InitializerParamsStruct;

  beforeEach(async () => {
    [deployer, owner, saleProceedsReceiver, protocolFeeReceiver, saleTokenHolder] =
      await ethers.getSigners();

    // Deploy mock contracts
    const MockERC20Factory = new MockERC20__factory(deployer);
    const MockKYCVerifierFactory = new MockKYCVerifier__factory(deployer);

    saleToken = await MockERC20Factory.deploy('Sale Token', 'SALE', 18);
    commitmentToken = await MockERC20Factory.deploy('Commitment Token', 'COMMIT', 18);
    kycVerifier = await MockKYCVerifierFactory.deploy();

    // Mint tokens to sale token holder
    await saleToken.mint(saleTokenHolder.address, ethers.parseEther('1000000'));

    // Setup default parameters
    const currentTime = await time.latest();
    defaultParams = {
      saleStartTimestamp: currentTime + 3600,
      saleEndTimestamp: currentTime + 86400,
      owner: owner.address,
      saleTokenHolder: saleTokenHolder.address,
      commitmentToken: await commitmentToken.getAddress(),
      saleToken: await saleToken.getAddress(),
      kycVerifier: await kycVerifier.getAddress(),
      saleProceedsReceiver: saleProceedsReceiver.address,
      protocolFeeReceiver: protocolFeeReceiver.address,
      minimumCommitment: ethers.parseEther('10'),
      maximumCommitment: ethers.parseEther('1000'),
      minimumTotalCommitment: ethers.parseEther('10000'),
      maximumTotalCommitment: ethers.parseEther('100000'),
      saleTokenPrice: ethers.parseEther('0.1'),
      decreaseCommitmentFee: ethers.parseEther('0.1'),
      protocolFee: ethers.parseEther('0.02'),
    };

    // Enable KYC
    await kycVerifier.setVerify(true);

    // Deploy the contract
    publicSale = await deployPublicSaleProxy(deployer, defaultParams);
  });

  describe('Deployment Block', () => {
    runDeploymentBlockTests({
      getContract: () => publicSale,
    });
  });

  describe('Initializer Event Emitter', () => {
    let testDeployer: SignerWithAddress;
    let savedInitParams: any;

    beforeEach(async () => {
      [testDeployer] = await ethers.getSigners();
    });

    runInitializerEventEmitterTests({
      contractFactory: PublicSaleV1__factory,
      masterCopy: async () => {
        const impl = await new PublicSaleV1__factory(testDeployer).deploy();
        return await impl.getAddress();
      },
      deployer: () => testDeployer,
      initializeParams: async () => {
        // Setup params
        const currentTime = await time.latest();
        const initParams = {
          saleStartTimestamp: currentTime + 3600,
          saleEndTimestamp: currentTime + 86400,
          owner: owner.address,
          saleTokenHolder: saleTokenHolder.address,
          commitmentToken: await commitmentToken.getAddress(),
          saleToken: await saleToken.getAddress(),
          kycVerifier: await kycVerifier.getAddress(),
          saleProceedsReceiver: saleProceedsReceiver.address,
          protocolFeeReceiver: protocolFeeReceiver.address,
          minimumCommitment: ethers.parseEther('10'),
          maximumCommitment: ethers.parseEther('1000'),
          minimumTotalCommitment: ethers.parseEther('10000'),
          maximumTotalCommitment: ethers.parseEther('100000'),
          saleTokenPrice: ethers.parseEther('0.1'),
          decreaseCommitmentFee: ethers.parseEther('0.1'),
          protocolFee: ethers.parseEther('0.02'),
        };

        // Calculate required sale token amount
        const saleTokenAmount =
          (BigInt(initParams.maximumTotalCommitment) * TEST_CONSTANTS.PRECISION) /
          BigInt(initParams.saleTokenPrice);

        // Mint tokens to saleTokenHolder
        await saleToken.mint(saleTokenHolder.address, saleTokenAmount);

        // Get current nonce - masterCopy() has already been called at this point
        const currentNonce = await ethers.provider.getTransactionCount(testDeployer.address);

        // The proxy will be deployed at the current nonce (masterCopy already deployed)
        const proxyAddress = ethers.getCreateAddress({
          from: testDeployer.address,
          nonce: currentNonce,
        });

        // Approve the predicted proxy address
        await saleToken.connect(saleTokenHolder).approve(proxyAddress, saleTokenAmount);

        // Save the params for getExpectedInitData
        savedInitParams = initParams;

        return [initParams];
      },
      getExpectedInitData: async () => {
        // Use the saved params to ensure timestamps match
        return ethers.AbiCoder.defaultAbiCoder().encode(
          [
            'tuple(uint48 saleStartTimestamp, uint48 saleEndTimestamp, address owner, address saleTokenHolder, address commitmentToken, address saleToken, address kycVerifier, address saleProceedsReceiver, address protocolFeeReceiver, uint256 minimumCommitment, uint256 maximumCommitment, uint256 minimumTotalCommitment, uint256 maximumTotalCommitment, uint256 saleTokenPrice, uint256 decreaseCommitmentFee, uint256 protocolFee)',
          ],
          [savedInitParams],
        );
      },
    });
  });

  describe('Supports Interface', () => {
    runSupportsInterfaceTests({
      getContract: () => publicSale,
      supportedInterfaceFactories: [
        IERC165__factory,
        IPublicSaleV1__factory,
        IVersion__factory,
        IDeploymentBlock__factory,
      ],
    });
  });
});
