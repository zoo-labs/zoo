import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  ConcreteWarrantBase,
  ConcreteWarrantBase__factory,
  MockERC20,
  MockERC20__factory,
  MockERC20Votes,
  MockERC20Votes__factory,
  ERC1967Proxy__factory,
} from '../../../../typechain-types';

// Time utilities
const time = {
  latest: async (): Promise<number> => {
    const block = await ethers.provider.getBlock('latest');
    return block!.timestamp;
  },
  increaseTo: async (timestamp: number): Promise<void> => {
    await ethers.provider.send('evm_mine', [timestamp]);
  },
};

describe('WarrantBase', () => {
  let owner: SignerWithAddress;
  let warrantHolder: SignerWithAddress;
  let feeReceiver: SignerWithAddress;
  let recipient: SignerWithAddress;
  let other: SignerWithAddress;
  let proxyDeployer: SignerWithAddress;

  let mockWarrant: ConcreteWarrantBase;
  let mockWarrantImplementation: ConcreteWarrantBase;
  let mockWarrantToken: MockERC20;
  let mockPaymentToken: MockERC20;
  let mockVotesToken: MockERC20Votes;

  const TOKEN_AMOUNT = ethers.parseEther('1000');
  const TOKEN_PRICE = ethers.parseEther('0.5'); // 0.5 fee tokens per warrant token
  const EXPIRATION_DURATION = 30 * 24 * 60 * 60; // 30 days

  async function deployMockWarrantProxy(
    relativeTime: boolean,
    ownerAddr: string,
    warrantHolderAddr: string,
    tokenAddr: string,
    feeTokenAddr: string,
    tokenAmount: bigint,
    tokenPrice: bigint,
    feeReceiverAddr: string,
    expiration: bigint,
  ): Promise<ConcreteWarrantBase> {
    const fullInitData = ConcreteWarrantBase__factory.createInterface().encodeFunctionData(
      'initialize',
      [
        relativeTime,
        ownerAddr,
        warrantHolderAddr,
        tokenAddr,
        feeTokenAddr,
        tokenAmount,
        tokenPrice,
        feeReceiverAddr,
        expiration,
      ],
    );

    const proxy = await new ERC1967Proxy__factory(proxyDeployer).deploy(
      await mockWarrantImplementation.getAddress(),
      fullInitData,
    );

    return ConcreteWarrantBase__factory.connect(await proxy.getAddress(), owner);
  }

  beforeEach(async () => {
    [owner, warrantHolder, feeReceiver, recipient, other, proxyDeployer] =
      await ethers.getSigners();

    // Deploy mock tokens
    mockWarrantToken = await new MockERC20__factory(owner).deploy('Mock Token', 'MTK', 18);
    mockPaymentToken = await new MockERC20__factory(owner).deploy('Mock Fee Token', 'MFT', 18);
    mockVotesToken = await new MockERC20Votes__factory(owner).deploy();

    // Deploy implementation
    mockWarrantImplementation = await new ConcreteWarrantBase__factory(owner).deploy();

    // Mint tokens for testing
    await mockWarrantToken.mint(owner.address, ethers.parseEther('10000'));
    await mockPaymentToken.mint(warrantHolder.address, ethers.parseEther('10000'));
  });

  describe('Initialization', () => {
    it('should initialize with absolute time mode correctly', async () => {
      const currentTime = await time.latest();
      const expirationTime = BigInt(currentTime + EXPIRATION_DURATION);

      mockWarrant = await deployMockWarrantProxy(
        false, // absolute time
        owner.address,
        warrantHolder.address,
        await mockWarrantToken.getAddress(),
        await mockPaymentToken.getAddress(),
        TOKEN_AMOUNT,
        TOKEN_PRICE,
        feeReceiver.address,
        expirationTime,
      );

      expect(await mockWarrant.relativeTime()).to.be.false;
      expect(await mockWarrant.owner()).to.equal(owner.address);
      expect(await mockWarrant.warrantHolder()).to.equal(warrantHolder.address);
      expect(await mockWarrant.warrantToken()).to.equal(await mockWarrantToken.getAddress());
      expect(await mockWarrant.paymentToken()).to.equal(await mockPaymentToken.getAddress());
      expect(await mockWarrant.warrantTokenAmount()).to.equal(TOKEN_AMOUNT);
      expect(await mockWarrant.warrantTokenPrice()).to.equal(TOKEN_PRICE);
      expect(await mockWarrant.paymentReceiver()).to.equal(feeReceiver.address);
      expect(await mockWarrant.expiration()).to.equal(expirationTime);
      expect(await mockWarrant.executed()).to.be.false;
    });

    it('should initialize with relative time mode correctly', async () => {
      mockWarrant = await deployMockWarrantProxy(
        true, // relative time
        owner.address,
        warrantHolder.address,
        await mockVotesToken.getAddress(),
        await mockPaymentToken.getAddress(),
        TOKEN_AMOUNT,
        TOKEN_PRICE,
        feeReceiver.address,
        BigInt(EXPIRATION_DURATION), // duration instead of timestamp
      );

      expect(await mockWarrant.relativeTime()).to.be.true;
      expect(await mockWarrant.owner()).to.equal(owner.address);
      expect(await mockWarrant.warrantHolder()).to.equal(warrantHolder.address);
      expect(await mockWarrant.warrantToken()).to.equal(await mockVotesToken.getAddress());
      expect(await mockWarrant.paymentToken()).to.equal(await mockPaymentToken.getAddress());
      expect(await mockWarrant.warrantTokenAmount()).to.equal(TOKEN_AMOUNT);
      expect(await mockWarrant.warrantTokenPrice()).to.equal(TOKEN_PRICE);
      expect(await mockWarrant.paymentReceiver()).to.equal(feeReceiver.address);
      expect(await mockWarrant.expiration()).to.equal(BigInt(EXPIRATION_DURATION));
      expect(await mockWarrant.executed()).to.be.false;
    });

    it('should revert if relative time with non-IVotesERC20V1 token', async () => {
      await expect(
        deployMockWarrantProxy(
          true, // relative time
          owner.address,
          warrantHolder.address,
          await mockWarrantToken.getAddress(), // regular ERC20, not IVotesERC20V1
          await mockPaymentToken.getAddress(),
          TOKEN_AMOUNT,
          TOKEN_PRICE,
          feeReceiver.address,
          BigInt(EXPIRATION_DURATION),
        ),
      ).to.be.revertedWithCustomError(mockWarrantImplementation, 'UnsupportedToken');
    });
  });

  describe('Execute - Absolute Time', () => {
    let expirationTime: number;

    beforeEach(async () => {
      const currentTime = await time.latest();
      expirationTime = currentTime + EXPIRATION_DURATION;

      mockWarrant = await deployMockWarrantProxy(
        false, // absolute time
        owner.address,
        warrantHolder.address,
        await mockWarrantToken.getAddress(),
        await mockPaymentToken.getAddress(),
        TOKEN_AMOUNT,
        TOKEN_PRICE,
        feeReceiver.address,
        BigInt(expirationTime),
      );

      // Mint tokens to warrant contract
      await mockWarrantToken.mint(await mockWarrant.getAddress(), TOKEN_AMOUNT);

      // Approve fee payment
      await mockPaymentToken
        .connect(warrantHolder)
        .approve(await mockWarrant.getAddress(), ethers.MaxUint256);
    });

    it('should execute warrant successfully', async () => {
      const expectedFee = (TOKEN_AMOUNT * TOKEN_PRICE) / ethers.parseEther('1');
      const feeReceiverBalanceBefore = await mockPaymentToken.balanceOf(feeReceiver.address);

      const tx = await mockWarrant.connect(warrantHolder).execute(recipient.address);

      // Check fee was transferred
      expect(await mockPaymentToken.balanceOf(feeReceiver.address)).to.equal(
        feeReceiverBalanceBefore + expectedFee,
      );

      // Check execution was marked
      expect(await mockWarrant.executed()).to.be.true;

      // Check mock execution was called
      expect(await mockWarrant.mockExecutionCalled()).to.be.true;
      expect(await mockWarrant.mockExecutionRecipient()).to.equal(recipient.address);

      // Check event
      await expect(tx).to.emit(mockWarrant, 'Executed').withArgs(recipient.address);
      await expect(tx).to.emit(mockWarrant, 'MockWarrantExecuted').withArgs(recipient.address);
    });

    it('should revert if caller is not warrant holder', async () => {
      await expect(
        mockWarrant.connect(other).execute(recipient.address),
      ).to.be.revertedWithCustomError(mockWarrant, 'OnlyWarrantHolder');
    });

    it('should revert if already executed', async () => {
      await mockWarrant.connect(warrantHolder).execute(recipient.address);

      await expect(
        mockWarrant.connect(warrantHolder).execute(recipient.address),
      ).to.be.revertedWithCustomError(mockWarrant, 'AlreadyExecuted');
    });

    it('should revert if expired', async () => {
      await time.increaseTo(expirationTime + 1);

      await expect(
        mockWarrant.connect(warrantHolder).execute(recipient.address),
      ).to.be.revertedWithCustomError(mockWarrant, 'WarrantExpired');
    });

    it('should revert if insufficient fee token balance', async () => {
      // Remove fee tokens from warrant holder
      const balance = await mockPaymentToken.balanceOf(warrantHolder.address);
      await mockPaymentToken.connect(warrantHolder).transfer(other.address, balance);

      await expect(
        mockWarrant.connect(warrantHolder).execute(recipient.address),
      ).to.be.revertedWithCustomError(mockPaymentToken, 'ERC20InsufficientBalance');
    });
  });

  describe('Execute - Relative Time', () => {
    let UNLOCK_TIME: number;

    beforeEach(async () => {
      mockWarrant = await deployMockWarrantProxy(
        true, // relative time
        owner.address,
        warrantHolder.address,
        await mockVotesToken.getAddress(),
        await mockPaymentToken.getAddress(),
        TOKEN_AMOUNT,
        TOKEN_PRICE,
        feeReceiver.address,
        BigInt(EXPIRATION_DURATION), // duration after unlock
      );

      UNLOCK_TIME = await time.latest();

      // Mint tokens to warrant contract
      await mockVotesToken.mint(await mockWarrant.getAddress(), TOKEN_AMOUNT);

      // Set unlock time on votes token
      await mockVotesToken.setUnlockTime(UNLOCK_TIME);

      // Approve fee payment
      await mockPaymentToken
        .connect(warrantHolder)
        .approve(await mockWarrant.getAddress(), ethers.MaxUint256);
    });

    it('should execute warrant after token unlock', async () => {
      const expectedFee = (TOKEN_AMOUNT * TOKEN_PRICE) / ethers.parseEther('1');
      const feeReceiverBalanceBefore = await mockPaymentToken.balanceOf(feeReceiver.address);

      const tx = await mockWarrant.connect(warrantHolder).execute(recipient.address);

      // Check fee was transferred
      expect(await mockPaymentToken.balanceOf(feeReceiver.address)).to.equal(
        feeReceiverBalanceBefore + expectedFee,
      );

      // Check execution was marked
      expect(await mockWarrant.executed()).to.be.true;

      // Check event
      await expect(tx).to.emit(mockWarrant, 'Executed').withArgs(recipient.address);
    });

    it('should revert if token is still locked', async () => {
      // Set token as locked
      await mockVotesToken.setLocked(true);

      await expect(
        mockWarrant.connect(warrantHolder).execute(recipient.address),
      ).to.be.revertedWithCustomError(mockWarrant, 'TokenLocked');
    });

    it('should revert if expired after unlock time', async () => {
      // Wait for unlock + expiration
      await time.increaseTo(UNLOCK_TIME + EXPIRATION_DURATION + 1);

      await expect(
        mockWarrant.connect(warrantHolder).execute(recipient.address),
      ).to.be.revertedWithCustomError(mockWarrant, 'WarrantExpired');
    });
  });

  describe('Clawback', () => {
    let expirationTime: number;

    beforeEach(async () => {
      const currentTime = await time.latest();
      expirationTime = currentTime + EXPIRATION_DURATION;

      mockWarrant = await deployMockWarrantProxy(
        false, // absolute time
        owner.address,
        warrantHolder.address,
        await mockWarrantToken.getAddress(),
        await mockPaymentToken.getAddress(),
        TOKEN_AMOUNT,
        TOKEN_PRICE,
        feeReceiver.address,
        BigInt(expirationTime),
      );

      // Transfer tokens to warrant contract
      await mockWarrantToken.transfer(await mockWarrant.getAddress(), TOKEN_AMOUNT);
    });

    it('should allow owner to clawback after expiration', async () => {
      await time.increaseTo(expirationTime + 1);

      const recipientBalanceBefore = await mockWarrantToken.balanceOf(recipient.address);

      const tx = await mockWarrant.connect(owner).clawback(recipient.address);

      expect(await mockWarrantToken.balanceOf(recipient.address)).to.equal(
        recipientBalanceBefore + TOKEN_AMOUNT,
      );

      await expect(tx).to.emit(mockWarrant, 'Clawback').withArgs(recipient.address, TOKEN_AMOUNT);
    });

    it('should revert if not owner', async () => {
      await time.increaseTo(expirationTime + 1);

      await expect(
        mockWarrant.connect(other).clawback(recipient.address),
      ).to.be.revertedWithCustomError(mockWarrant, 'OwnableUnauthorizedAccount');
    });

    it('should revert if warrant already executed', async () => {
      // Execute warrant first
      await mockPaymentToken
        .connect(warrantHolder)
        .approve(await mockWarrant.getAddress(), ethers.MaxUint256);
      await mockWarrant.connect(warrantHolder).execute(recipient.address);

      await time.increaseTo(expirationTime + 1);

      await expect(
        mockWarrant.connect(owner).clawback(recipient.address),
      ).to.be.revertedWithCustomError(mockWarrant, 'AlreadyExecuted');
    });

    it('should revert if warrant not expired', async () => {
      await expect(
        mockWarrant.connect(owner).clawback(recipient.address),
      ).to.be.revertedWithCustomError(mockWarrant, 'WarrantNotExpired');
    });
  });

  describe('Clawback - Relative Time', () => {
    let UNLOCK_TIME: number;

    beforeEach(async () => {
      mockWarrant = await deployMockWarrantProxy(
        true, // relative time
        owner.address,
        warrantHolder.address,
        await mockVotesToken.getAddress(),
        await mockPaymentToken.getAddress(),
        TOKEN_AMOUNT,
        TOKEN_PRICE,
        feeReceiver.address,
        BigInt(EXPIRATION_DURATION),
      );

      UNLOCK_TIME = await time.latest();

      // Mint tokens to warrant contract
      await mockVotesToken.mint(await mockWarrant.getAddress(), TOKEN_AMOUNT);

      // Set unlock time
      await mockVotesToken.setUnlockTime(UNLOCK_TIME);
    });

    it('should allow clawback after unlock time + expiration', async () => {
      await time.increaseTo(UNLOCK_TIME + EXPIRATION_DURATION + 1);

      const recipientBalanceBefore = await mockVotesToken.balanceOf(recipient.address);

      const tx = await mockWarrant.connect(owner).clawback(recipient.address);

      expect(await mockVotesToken.balanceOf(recipient.address)).to.equal(
        recipientBalanceBefore + TOKEN_AMOUNT,
      );

      await expect(tx).to.emit(mockWarrant, 'Clawback').withArgs(recipient.address, TOKEN_AMOUNT);
    });

    it('should revert if token is still locked', async () => {
      await mockVotesToken.setLocked(true);

      await expect(
        mockWarrant.connect(owner).clawback(recipient.address),
      ).to.be.revertedWithCustomError(mockWarrant, 'TokenLocked');
    });

    it('should revert if not expired relative to unlock time', async () => {
      await expect(
        mockWarrant.connect(owner).clawback(recipient.address),
      ).to.be.revertedWithCustomError(mockWarrant, 'WarrantNotExpired');
    });
  });

  describe('Version', () => {
    beforeEach(async () => {
      const currentTime = await time.latest();
      mockWarrant = await deployMockWarrantProxy(
        false,
        owner.address,
        warrantHolder.address,
        await mockWarrantToken.getAddress(),
        await mockPaymentToken.getAddress(),
        TOKEN_AMOUNT,
        TOKEN_PRICE,
        feeReceiver.address,
        BigInt(currentTime + EXPIRATION_DURATION),
      );
    });

    it('should return correct version', async () => {
      expect(await mockWarrant.version()).to.equal(1);
    });
  });
});
