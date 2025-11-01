import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  ConcreteBasePaymaster,
  ConcreteBasePaymaster__factory,
  ERC1967Proxy__factory,
  MockEntryPoint,
  MockEntryPoint__factory,
  MockValidator,
  MockValidator__factory,
} from '../../../../typechain-types';

interface PackedUserOperation {
  sender: string;
  nonce: bigint;
  initCode: string;
  callData: string;
  accountGasLimits: string;
  preVerificationGas: bigint;
  gasFees: string;
  paymasterAndData: string;
  signature: string;
}

// Helper function for deploying ConcreteBasePaymaster instances using ERC1967Proxy
async function deployConcreteBasePaymasterProxy(
  proxyDeployer: SignerWithAddress,
  implementation: string,
  owner: SignerWithAddress,
  entryPoint: string,
): Promise<ConcreteBasePaymaster> {
  // Create full initialization data with function selector
  const fullInitData = ConcreteBasePaymaster__factory.createInterface().encodeFunctionData(
    'initialize',
    [owner.address, entryPoint],
  );

  // Deploy the proxy with the implementation
  const proxy = await new ERC1967Proxy__factory(proxyDeployer).deploy(implementation, fullInitData);

  // Return a contract instance connected to the proxy
  return ConcreteBasePaymaster__factory.connect(await proxy.getAddress(), owner);
}

describe('BasePaymaster', function () {
  // contracts
  let concretePaymaster: ConcreteBasePaymaster;
  let masterCopy: ConcreteBasePaymaster;
  let entryPoint: MockEntryPoint;
  let invalidEntryPoint: MockValidator;

  // signers
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let randomAddress: SignerWithAddress;

  // test data
  let mockUserOp: PackedUserOperation;

  beforeEach(async function () {
    // Get signers
    [owner, nonOwner, randomAddress] = await ethers.getSigners();

    // Deploy mock EntryPoint
    entryPoint = await new MockEntryPoint__factory(owner).deploy();

    // Deploy invalid EntryPoint (MockValidator doesn't implement IEntryPoint)
    invalidEntryPoint = await new MockValidator__factory(owner).deploy();

    // Deploy ConcreteBasePaymaster implementation
    masterCopy = await new ConcreteBasePaymaster__factory(owner).deploy();

    // Deploy ConcreteBasePaymaster proxy
    concretePaymaster = await deployConcreteBasePaymasterProxy(
      owner,
      await masterCopy.getAddress(),
      owner,
      await entryPoint.getAddress(),
    );

    // Create mock UserOperation
    mockUserOp = {
      sender: randomAddress.address,
      nonce: 0n,
      initCode: '0x',
      callData: '0x',
      accountGasLimits: ethers.ZeroHash,
      preVerificationGas: 0n,
      gasFees: ethers.ZeroHash,
      paymasterAndData: '0x',
      signature: '0x',
    };
  });

  describe('Initialization', function () {
    it('Should set the entry point address', async function () {
      expect(await concretePaymaster.entryPoint()).to.equal(await entryPoint.getAddress());
    });

    it('Should set the owner', async function () {
      expect(await concretePaymaster.owner()).to.equal(owner.address);
    });

    it('Should revert if EntryPoint does not implement IEntryPoint interface', async function () {
      const newMasterCopy = await new ConcreteBasePaymaster__factory(owner).deploy();

      // Create initialization data with invalid entry point
      const fullInitData = ConcreteBasePaymaster__factory.createInterface().encodeFunctionData(
        'initialize',
        [owner.address, await invalidEntryPoint.getAddress()],
      );

      // Deploy proxy with invalid entry point should revert
      await expect(
        new ERC1967Proxy__factory(owner).deploy(await newMasterCopy.getAddress(), fullInitData),
      ).to.be.revertedWithCustomError(newMasterCopy, 'InvalidEntryPointInterface');
    });

    it('Should validate EntryPoint interface during initialization', async function () {
      // Test the validation function directly
      await expect(
        concretePaymaster.testValidateEntryPointInterface(invalidEntryPoint as any),
      ).to.be.revertedWithCustomError(concretePaymaster, 'InvalidEntryPointInterface');
    });
  });

  describe('Entry Point Access Control', function () {
    it('Should revert when validatePaymasterUserOp is called by non-EntryPoint', async function () {
      await expect(
        concretePaymaster.validatePaymasterUserOp(mockUserOp, ethers.randomBytes(32), 100000n),
      ).to.be.revertedWithCustomError(concretePaymaster, 'CallerNotEntryPoint');
    });

    it('Should revert when postOp is called by non-EntryPoint', async function () {
      await expect(
        concretePaymaster.postOp(
          0, // PostOpMode.opSucceeded
          '0x',
          0n,
          0n,
        ),
      ).to.be.revertedWithCustomError(concretePaymaster, 'CallerNotEntryPoint');
    });

    it('Should test _requireFromEntryPoint directly', async function () {
      // Direct call should revert
      await expect(concretePaymaster.testRequireFromEntryPoint()).to.be.revertedWithCustomError(
        concretePaymaster,
        'CallerNotEntryPoint',
      );
    });
  });

  describe('Deposit and Withdrawal', function () {
    it('Should allow deposits', async function () {
      const depositAmount = ethers.parseEther('1');

      await expect(concretePaymaster.deposit({ value: depositAmount })).to.not.be.reverted;

      expect(await concretePaymaster.getDeposit()).to.equal(depositAmount);
    });

    it('Should allow owner to withdraw to address', async function () {
      const depositAmount = ethers.parseEther('1');
      await concretePaymaster.deposit({ value: depositAmount });

      const recipientBalanceBefore = await ethers.provider.getBalance(nonOwner.address);

      await concretePaymaster.withdrawTo(nonOwner.address, depositAmount);

      const recipientBalanceAfter = await ethers.provider.getBalance(nonOwner.address);
      expect(recipientBalanceAfter - recipientBalanceBefore).to.equal(depositAmount);
    });

    it('Should revert when non-owner tries to withdraw', async function () {
      await expect(
        concretePaymaster.connect(nonOwner).withdrawTo(nonOwner.address, 0n),
      ).to.be.revertedWithCustomError(concretePaymaster, 'OwnableUnauthorizedAccount');
    });
  });

  describe('Staking', function () {
    it('Should allow owner to add stake', async function () {
      const stakeAmount = ethers.parseEther('1');
      const unstakeDelaySec = 86400; // 1 day

      await expect(concretePaymaster.addStake(unstakeDelaySec, { value: stakeAmount })).to.not.be
        .reverted;
    });

    it('Should allow owner to unlock stake', async function () {
      await expect(concretePaymaster.unlockStake()).to.not.be.reverted;
    });

    it('Should allow owner to withdraw stake', async function () {
      // First add some stake
      const stakeAmount = ethers.parseEther('1');
      await concretePaymaster.addStake(86400, { value: stakeAmount });

      // Then unlock it
      await concretePaymaster.unlockStake();

      // Now we can withdraw (note: in a real scenario, we'd need to wait for unstake delay)
      await expect(concretePaymaster.withdrawStake(owner.address)).to.not.be.reverted;
    });

    it('Should revert when non-owner tries to add stake', async function () {
      await expect(
        concretePaymaster.connect(nonOwner).addStake(86400, { value: ethers.parseEther('1') }),
      ).to.be.revertedWithCustomError(concretePaymaster, 'OwnableUnauthorizedAccount');
    });

    it('Should revert when non-owner tries to unlock stake', async function () {
      await expect(concretePaymaster.connect(nonOwner).unlockStake()).to.be.revertedWithCustomError(
        concretePaymaster,
        'OwnableUnauthorizedAccount',
      );
    });

    it('Should revert when non-owner tries to withdraw stake', async function () {
      await expect(
        concretePaymaster.connect(nonOwner).withdrawStake(nonOwner.address),
      ).to.be.revertedWithCustomError(concretePaymaster, 'OwnableUnauthorizedAccount');
    });
  });

  describe('PostOp Implementation', function () {
    it('Should revert with PostOpNotImplemented when _postOp is not implemented', async function () {
      // Set validation to return context, which requires postOp implementation
      await concretePaymaster.setValidationBehavior(true, ethers.toUtf8Bytes('test context'), 0);

      // Fund the EntryPoint address so we can impersonate it
      await owner.sendTransaction({
        to: await entryPoint.getAddress(),
        value: ethers.parseEther('1'),
      });

      // Impersonate EntryPoint to call postOp
      await ethers.provider.send('hardhat_impersonateAccount', [await entryPoint.getAddress()]);
      const entryPointSigner = await ethers.getSigner(await entryPoint.getAddress());

      // postOp should revert with PostOpNotImplemented
      await expect(
        concretePaymaster.connect(entryPointSigner).postOp(
          0, // PostOpMode.opSucceeded
          ethers.toUtf8Bytes('test context'),
          100000n,
          1000n,
        ),
      ).to.be.revertedWithCustomError(concretePaymaster, 'PostOpNotImplemented');

      await ethers.provider.send('hardhat_stopImpersonatingAccount', [
        await entryPoint.getAddress(),
      ]);
    });

    it('Should not revert when _postOp is properly implemented', async function () {
      // Enable postOp implementation
      await concretePaymaster.setPostOpImplemented(true);

      // Fund and impersonate EntryPoint
      await owner.sendTransaction({
        to: await entryPoint.getAddress(),
        value: ethers.parseEther('1'),
      });

      await ethers.provider.send('hardhat_impersonateAccount', [await entryPoint.getAddress()]);
      const entryPointSigner = await ethers.getSigner(await entryPoint.getAddress());

      // postOp should not revert
      await expect(
        concretePaymaster.connect(entryPointSigner).postOp(
          0, // PostOpMode.opSucceeded
          ethers.toUtf8Bytes('test context'),
          100000n,
          1000n,
        ),
      ).to.not.be.reverted;

      await ethers.provider.send('hardhat_stopImpersonatingAccount', [
        await entryPoint.getAddress(),
      ]);
    });
  });

  describe('ValidatePaymasterUserOp with EntryPoint', function () {
    it('Should successfully validate when called by EntryPoint', async function () {
      // Set up validation behavior
      const testContext = ethers.toUtf8Bytes('validation context');
      const testValidationData = 12345n;
      await concretePaymaster.setValidationBehavior(true, testContext, testValidationData);

      // Fund and impersonate EntryPoint
      await owner.sendTransaction({
        to: await entryPoint.getAddress(),
        value: ethers.parseEther('1'),
      });

      await ethers.provider.send('hardhat_impersonateAccount', [await entryPoint.getAddress()]);
      const entryPointSigner = await ethers.getSigner(await entryPoint.getAddress());

      // Call validatePaymasterUserOp as EntryPoint
      const result = await concretePaymaster
        .connect(entryPointSigner)
        .validatePaymasterUserOp.staticCall(
          mockUserOp,
          ethers.randomBytes(32),
          ethers.parseEther('0.1'),
        );

      // Verify the return values
      expect(result[0]).to.equal(ethers.hexlify(testContext));
      expect(result[1]).to.equal(testValidationData);

      await ethers.provider.send('hardhat_stopImpersonatingAccount', [
        await entryPoint.getAddress(),
      ]);
    });

    it('Should return empty context when configured', async function () {
      // Configure to return no context
      await concretePaymaster.setValidationBehavior(false, '0x', 0);

      // Fund and impersonate EntryPoint
      await owner.sendTransaction({
        to: await entryPoint.getAddress(),
        value: ethers.parseEther('1'),
      });

      await ethers.provider.send('hardhat_impersonateAccount', [await entryPoint.getAddress()]);
      const entryPointSigner = await ethers.getSigner(await entryPoint.getAddress());

      const result = await concretePaymaster
        .connect(entryPointSigner)
        .validatePaymasterUserOp.staticCall(
          mockUserOp,
          ethers.randomBytes(32),
          ethers.parseEther('0.1'),
        );

      expect(result[0]).to.equal('0x');
      expect(result[1]).to.equal(0);

      await ethers.provider.send('hardhat_stopImpersonatingAccount', [
        await entryPoint.getAddress(),
      ]);
    });
  });

  describe('Deposit and Withdrawal - Additional Edge Cases', function () {
    it('Should handle multiple deposits correctly', async function () {
      const deposit1 = ethers.parseEther('1');
      const deposit2 = ethers.parseEther('2');
      const deposit3 = ethers.parseEther('0.5');

      await concretePaymaster.deposit({ value: deposit1 });
      expect(await concretePaymaster.getDeposit()).to.equal(deposit1);

      await concretePaymaster.deposit({ value: deposit2 });
      expect(await concretePaymaster.getDeposit()).to.equal(deposit1 + deposit2);

      await concretePaymaster.deposit({ value: deposit3 });
      expect(await concretePaymaster.getDeposit()).to.equal(deposit1 + deposit2 + deposit3);
    });

    it('Should handle zero-value deposits', async function () {
      await expect(concretePaymaster.deposit({ value: 0 })).to.not.be.reverted;
      expect(await concretePaymaster.getDeposit()).to.equal(0);
    });

    it('Should allow anyone to deposit', async function () {
      const depositAmount = ethers.parseEther('1');
      await expect(concretePaymaster.connect(nonOwner).deposit({ value: depositAmount })).to.not.be
        .reverted;
      expect(await concretePaymaster.getDeposit()).to.equal(depositAmount);
    });

    it('Should handle partial withdrawals correctly', async function () {
      const totalDeposit = ethers.parseEther('10');
      const withdrawal1 = ethers.parseEther('3');
      const withdrawal2 = ethers.parseEther('2');

      await concretePaymaster.deposit({ value: totalDeposit });

      const recipient1BalanceBefore = await ethers.provider.getBalance(nonOwner.address);
      await concretePaymaster.withdrawTo(nonOwner.address, withdrawal1);
      const recipient1BalanceAfter = await ethers.provider.getBalance(nonOwner.address);

      expect(recipient1BalanceAfter - recipient1BalanceBefore).to.equal(withdrawal1);
      expect(await concretePaymaster.getDeposit()).to.equal(totalDeposit - withdrawal1);

      const recipient2BalanceBefore = await ethers.provider.getBalance(randomAddress.address);
      await concretePaymaster.withdrawTo(randomAddress.address, withdrawal2);
      const recipient2BalanceAfter = await ethers.provider.getBalance(randomAddress.address);

      expect(recipient2BalanceAfter - recipient2BalanceBefore).to.equal(withdrawal2);
      expect(await concretePaymaster.getDeposit()).to.equal(
        totalDeposit - withdrawal1 - withdrawal2,
      );
    });

    it('Should revert when withdrawing more than deposited', async function () {
      const depositAmount = ethers.parseEther('1');
      await concretePaymaster.deposit({ value: depositAmount });

      // This will revert at the EntryPoint level
      await expect(concretePaymaster.withdrawTo(nonOwner.address, ethers.parseEther('2'))).to.be
        .reverted;
    });
  });
});
