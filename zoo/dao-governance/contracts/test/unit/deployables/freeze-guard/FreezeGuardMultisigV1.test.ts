import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { time } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  ERC1967Proxy__factory,
  FreezeGuardMultisigV1,
  FreezeGuardMultisigV1__factory,
  IDeploymentBlock__factory,
  IERC165__factory,
  IFreezeGuardBaseV1__factory,
  IFreezeGuardMultisigV1__factory,
  IGuard__factory,
  IVersion__factory,
  MockFreezable,
  MockFreezable__factory,
  MockSafe,
  MockSafe__factory,
} from '../../../../typechain-types';
import { runDeploymentBlockTests } from '../../shared/deploymentBlockTests';
import { runInitializerEventEmitterTests } from '../../shared/initializerEventEmitterTests';
import { runSupportsInterfaceTests } from '../../shared/supportsInterfaceTests';
import { runUUPSUpgradeabilityTests } from '../../shared/uupsUpgradeabilityTests';

// Helper function for deploying MultisigFreezeGuardV1 instances using ERC1967Proxy
async function deployMultisigFreezeGuardProxy(
  proxyDeployer: SignerWithAddress,
  implementation: string,
  owner: SignerWithAddress,
  timelockPeriod: number,
  executionPeriod: number,
  freezeVoting: string,
  childGnosisSafe: string,
): Promise<FreezeGuardMultisigV1> {
  // Create initialization data with function selector
  const initializeInterface = FreezeGuardMultisigV1__factory.createInterface();
  const fullInitData = initializeInterface.encodeFunctionData('initialize', [
    timelockPeriod,
    executionPeriod,
    owner.address,
    freezeVoting,
    childGnosisSafe,
  ]);

  // Deploy the proxy with the implementation
  const proxy = await new ERC1967Proxy__factory(proxyDeployer).deploy(implementation, fullInitData);

  // Return a contract instance connected to the proxy
  return FreezeGuardMultisigV1__factory.connect(await proxy.getAddress(), owner);
}

describe('FreezeGuardMultisigV1', () => {
  const Operation = {
    Call: 0,
    DelegateCall: 1,
  };

  // signers
  let proxyDeployer: SignerWithAddress;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;
  let nonOwner: SignerWithAddress;

  // contracts
  let masterCopy: string;
  let multisigFreezeGuard: FreezeGuardMultisigV1;
  let mockFreezable: MockFreezable;
  let mockSafe: MockSafe;

  // test data
  const mockSignatures = '0x1234';
  const mockSignaturesHash = ethers.keccak256(mockSignatures);

  // constants
  const TIMELOCK_PERIOD = 100;
  const EXECUTION_PERIOD = 200;

  beforeEach(async () => {
    // Get signers
    [proxyDeployer, owner, user, nonOwner] = await ethers.getSigners();

    // Deploy implementation
    const implementation = await new FreezeGuardMultisigV1__factory(proxyDeployer).deploy();
    masterCopy = await implementation.getAddress();

    // Deploy mock contracts
    mockFreezable = await new MockFreezable__factory(owner).deploy();
    mockSafe = await new MockSafe__factory(owner).deploy();

    // Deploy MultisigFreezeGuard with mock dependencies
    multisigFreezeGuard = await deployMultisigFreezeGuardProxy(
      proxyDeployer,
      masterCopy,
      owner,
      TIMELOCK_PERIOD,
      EXECUTION_PERIOD,
      await mockFreezable.getAddress(),
      await mockSafe.getAddress(),
    );
  });

  describe('Initialization', () => {
    it('should initialize with correct parameters', async () => {
      expect(await multisigFreezeGuard.owner()).to.equal(owner.address);
      expect(await multisigFreezeGuard.freezable()).to.equal(await mockFreezable.getAddress());
      expect(await multisigFreezeGuard.childGnosisSafe()).to.equal(await mockSafe.getAddress());
      expect(await multisigFreezeGuard.timelockPeriod()).to.equal(TIMELOCK_PERIOD);
      expect(await multisigFreezeGuard.executionPeriod()).to.equal(EXECUTION_PERIOD);
    });

    it('should not allow reinitialization', async () => {
      await expect(
        multisigFreezeGuard.initialize(
          50,
          100,
          user.address,
          ethers.ZeroAddress,
          ethers.ZeroAddress,
        ),
      ).to.be.revertedWithCustomError(multisigFreezeGuard, 'InvalidInitialization');
    });

    it('Should have initialization disabled in the implementation', async function () {
      const implementationContract = FreezeGuardMultisigV1__factory.connect(
        masterCopy,
        proxyDeployer,
      );

      await expect(
        implementationContract.initialize(
          50,
          100,
          owner.address,
          ethers.ZeroAddress,
          ethers.ZeroAddress,
        ),
      ).to.be.revertedWithCustomError(implementationContract, 'InvalidInitialization');
    });
  });

  describe('Period Updates', () => {
    it('should allow owner to update timelock period', async () => {
      const newTimelockPeriod = 150;

      await expect(multisigFreezeGuard.updateTimelockPeriod(newTimelockPeriod))
        .to.emit(multisigFreezeGuard, 'TimelockPeriodUpdated')
        .withArgs(newTimelockPeriod);

      expect(await multisigFreezeGuard.timelockPeriod()).to.equal(newTimelockPeriod);
    });

    it('should allow owner to update execution period', async () => {
      const newExecutionPeriod = 250;

      await expect(multisigFreezeGuard.updateExecutionPeriod(newExecutionPeriod))
        .to.emit(multisigFreezeGuard, 'ExecutionPeriodUpdated')
        .withArgs(newExecutionPeriod);

      expect(await multisigFreezeGuard.executionPeriod()).to.equal(newExecutionPeriod);
    });

    it('should not allow non-owner to update timelock period', async () => {
      await expect(
        multisigFreezeGuard.connect(user).updateTimelockPeriod(150),
      ).to.be.revertedWithCustomError(multisigFreezeGuard, 'OwnableUnauthorizedAccount');
    });

    it('should not allow non-owner to update execution period', async () => {
      await expect(
        multisigFreezeGuard.connect(user).updateExecutionPeriod(250),
      ).to.be.revertedWithCustomError(multisigFreezeGuard, 'OwnableUnauthorizedAccount');
    });
  });

  describe('Transaction Timelocking', () => {
    const to = ethers.ZeroAddress;
    const value = 0;
    const data = '0x';
    const operation = Operation.Call;
    const safeTxGas = 0;
    const baseGas = 0;
    const gasPrice = 0;
    const gasToken = ethers.ZeroAddress;
    const refundReceiver = ethers.ZeroAddress;
    const nonce = 0;

    beforeEach(async () => {
      // Configure mock Safe for valid signature validation
      await mockSafe.setValidSignature(mockSignaturesHash, true);
    });

    it('should timelock a transaction with valid signatures', async () => {
      await expect(
        multisigFreezeGuard.timelockTransaction(
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          mockSignatures,
          nonce,
        ),
      )
        .to.emit(multisigFreezeGuard, 'TransactionTimelocked')
        .withArgs(owner.address, ethers.isHexString, mockSignatures);

      // Check that the transaction is now timelocked
      const timelockedTimestamp =
        await multisigFreezeGuard.getTransactionTimelocked(mockSignaturesHash);
      expect(timelockedTimestamp).to.not.equal(0);
    });

    it('should not allow timelocking the same signatures twice', async () => {
      // Timelock transaction first time
      await multisigFreezeGuard.timelockTransaction(
        to,
        value,
        data,
        operation,
        safeTxGas,
        baseGas,
        gasPrice,
        gasToken,
        refundReceiver,
        mockSignatures,
        nonce,
      );

      // Try to timelock again with the same signatures
      await expect(
        multisigFreezeGuard.timelockTransaction(
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          mockSignatures,
          nonce,
        ),
      ).to.be.revertedWithCustomError(multisigFreezeGuard, 'AlreadyTimelocked');
    });

    it('should revert if signatures are invalid', async () => {
      // Configure mock Safe to reject the signatures
      const invalidSignatures = '0x4321';
      await mockSafe.setValidSignature(ethers.keccak256(invalidSignatures), false);

      await expect(
        multisigFreezeGuard.timelockTransaction(
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          invalidSignatures,
          nonce,
        ),
      ).to.be.reverted;
    });

    it('should revert if trying to timelock when DAO is frozen', async () => {
      // Set DAO to frozen
      await mockFreezable.setIsFrozen(true);

      await expect(
        multisigFreezeGuard.timelockTransaction(
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          mockSignatures,
          nonce,
        ),
      ).to.be.revertedWithCustomError(multisigFreezeGuard, 'DAOFrozen');
    });
  });

  describe('Transaction Checking', () => {
    const to = ethers.ZeroAddress;
    const value = 0;
    const data = '0x';
    const operation = Operation.Call;
    const safeTxGas = 0;
    const baseGas = 0;
    const gasPrice = 0;
    const gasToken = ethers.ZeroAddress;
    const refundReceiver = ethers.ZeroAddress;
    const nonce = 0;

    beforeEach(async () => {
      // Configure mock Safe for valid signature validation
      await mockSafe.setValidSignature(mockSignaturesHash, true);

      // Timelock a transaction
      await multisigFreezeGuard.timelockTransaction(
        to,
        value,
        data,
        operation,
        safeTxGas,
        baseGas,
        gasPrice,
        gasToken,
        refundReceiver,
        mockSignatures,
        nonce,
      );
    });

    it('should revert if transaction is not timelocked', async () => {
      const unknownSignatures = '0x5678';

      await expect(
        multisigFreezeGuard.checkTransaction(
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          unknownSignatures,
          ethers.ZeroAddress,
        ),
      ).to.be.revertedWithCustomError(multisigFreezeGuard, 'NotTimelocked');
    });

    it('should revert if timelock period has not passed', async () => {
      await expect(
        multisigFreezeGuard.checkTransaction(
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          mockSignatures,
          ethers.ZeroAddress,
        ),
      ).to.be.revertedWithCustomError(multisigFreezeGuard, 'Timelocked');
    });

    it('should revert if timelock has expired', async () => {
      await time.increase(TIMELOCK_PERIOD + EXECUTION_PERIOD + 1);

      await expect(
        multisigFreezeGuard.checkTransaction(
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          mockSignatures,
          ethers.ZeroAddress,
        ),
      ).to.be.revertedWithCustomError(multisigFreezeGuard, 'Expired');
    });

    it('should revert if DAO is frozen', async () => {
      await time.increase(TIMELOCK_PERIOD + 1);

      // Set DAO to frozen
      await mockFreezable.setIsFrozen(true);

      await expect(
        multisigFreezeGuard.checkTransaction(
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          mockSignatures,
          ethers.ZeroAddress,
        ),
      ).to.be.revertedWithCustomError(multisigFreezeGuard, 'DAOFrozen');
    });

    it('should allow transaction if properly timelocked and DAO not frozen', async () => {
      await time.increase(TIMELOCK_PERIOD + 1);

      // Set DAO to not frozen
      await mockFreezable.setIsFrozen(false);

      // Should not revert
      await expect(
        multisigFreezeGuard.checkTransaction(
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          mockSignatures,
          ethers.ZeroAddress,
        ),
      ).not.to.be.reverted;
    });

    it('should revert if transaction was timelocked before the most recent freeze', async () => {
      // First timelock the transaction (already done in beforeEach)
      // Get the timelock timestamp
      const timelockTimestamp =
        await multisigFreezeGuard.getTransactionTimelocked(mockSignaturesHash);

      // Wait for timelock period to pass
      await time.increase(TIMELOCK_PERIOD + 1);

      // Simulate a freeze that happened AFTER the timelock
      const freezeTimestamp = timelockTimestamp + 10n; // 10 seconds after timelock
      await mockFreezable.setLastKnownFreezeTime(freezeTimestamp);

      // DAO is not currently frozen but there was a freeze after this transaction was timelocked
      await mockFreezable.setIsFrozen(false);

      // Should revert because transaction was timelocked before the most recent freeze
      await expect(
        multisigFreezeGuard.checkTransaction(
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          mockSignatures,
          ethers.ZeroAddress,
        ),
      ).to.be.revertedWithCustomError(multisigFreezeGuard, 'TimelockedBeforeFreeze');
    });

    it('should allow transaction if timelocked after the most recent freeze', async () => {
      // First timelock the transaction (already done in beforeEach)
      // Get the timelock timestamp
      const timelockTimestamp =
        await multisigFreezeGuard.getTransactionTimelocked(mockSignaturesHash);

      // Wait for timelock period to pass
      await time.increase(TIMELOCK_PERIOD + 1);

      // Simulate a freeze that happened BEFORE the timelock
      const freezeTimestamp = timelockTimestamp - 10n; // 10 seconds before timelock
      await mockFreezable.setLastKnownFreezeTime(freezeTimestamp);

      // DAO is not currently frozen
      await mockFreezable.setIsFrozen(false);

      // Should not revert because transaction was timelocked after the most recent freeze
      await expect(
        multisigFreezeGuard.checkTransaction(
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          mockSignatures,
          ethers.ZeroAddress,
        ),
      ).not.to.be.reverted;
    });

    it('should allow transaction if lastKnownFreezeTime returns 0 (never frozen)', async () => {
      await time.increase(TIMELOCK_PERIOD + 1);

      // Set never frozen state
      await mockFreezable.setIsFrozen(false);
      await mockFreezable.setLastKnownFreezeTime(0);

      // Should not revert
      await expect(
        multisigFreezeGuard.checkTransaction(
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          mockSignatures,
          ethers.ZeroAddress,
        ),
      ).not.to.be.reverted;
    });

    it('should enforce security invariant across multiple freeze/unfreeze cycles', async () => {
      // CRITICAL TEST: Demonstrates the security invariant that transactions
      // timelocked before the most recent freeze are permanently invalid

      // Timeline:
      // T1: Transaction A is timelocked (already done in beforeEach)

      // T2: First freeze occurs after the timelock
      await time.increase(10);
      const firstFreezeTime = await time.latest();
      await mockFreezable.setLastKnownFreezeTime(firstFreezeTime);
      await mockFreezable.setIsFrozen(true);

      // T3: DAO is unfrozen
      await time.increase(10);
      await mockFreezable.setIsFrozen(false);
      // CRITICAL: lastKnownFreezeTime is NOT cleared

      // Transaction A should still be blocked even though DAO is unfrozen
      // Wait for timelock period to pass
      await time.increase(TIMELOCK_PERIOD);

      await expect(
        multisigFreezeGuard.checkTransaction(
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          mockSignatures,
          ethers.ZeroAddress,
        ),
      ).to.be.revertedWithCustomError(multisigFreezeGuard, 'TimelockedBeforeFreeze');

      // T4: New transaction B is timelocked after unfreeze
      const newSignatures = ethers.randomBytes(65);
      const newSignaturesHash = ethers.keccak256(newSignatures);
      await mockSafe.setValidSignature(newSignaturesHash, true);

      await multisigFreezeGuard.timelockTransaction(
        ethers.ZeroAddress,
        0,
        '0x',
        Operation.Call,
        0,
        0,
        0,
        ethers.ZeroAddress,
        ethers.ZeroAddress,
        newSignatures,
        1,
      );

      // T5: Second freeze occurs
      await time.increase(10);
      const secondFreezeTime = await time.latest();
      await mockFreezable.setLastKnownFreezeTime(secondFreezeTime);
      await mockFreezable.setIsFrozen(true);

      // T6: DAO is unfrozen again
      await time.increase(10);
      await mockFreezable.setIsFrozen(false);

      // Transaction A has now exceeded its execution window, but let's verify
      // Transaction B which is still within its window

      // Transaction B should be blocked (was before second freeze)
      await time.increase(TIMELOCK_PERIOD);
      await expect(
        multisigFreezeGuard.checkTransaction(
          ethers.ZeroAddress,
          0,
          '0x',
          Operation.Call,
          0,
          0,
          0,
          ethers.ZeroAddress,
          ethers.ZeroAddress,
          newSignatures,
          ethers.ZeroAddress,
        ),
      ).to.be.revertedWithCustomError(multisigFreezeGuard, 'TimelockedBeforeFreeze');
    });
  });

  describe('checkAfterExecution', () => {
    it('should not perform any checks after execution', async () => {
      // This function in the contract doesn't do anything, so it should never revert
      await expect(multisigFreezeGuard.checkAfterExecution(ethers.randomBytes(32), true)).not.to.be
        .reverted;
    });
  });

  describe('getTransactionTimelocked', () => {
    it('should return 0 for unknown signatures', async () => {
      const unknownSignatures = ethers.keccak256('0x9999');
      expect(await multisigFreezeGuard.getTransactionTimelocked(unknownSignatures)).to.equal(0);
    });

    it('should return correct timestamp for timelocked signatures', async () => {
      // Configure mock Safe for valid signature validation
      await mockSafe.setValidSignature(mockSignaturesHash, true);

      // Timelock a transaction
      await multisigFreezeGuard.timelockTransaction(
        ethers.ZeroAddress,
        0,
        '0x',
        Operation.Call,
        0,
        0,
        0,
        ethers.ZeroAddress,
        ethers.ZeroAddress,
        mockSignatures,
        0,
      );

      // Get the current timestamp
      const timestamp = await time.latest();

      // Check that the returned timestamp matches
      expect(await multisigFreezeGuard.getTransactionTimelocked(mockSignaturesHash)).to.equal(
        timestamp,
      );
    });
  });

  describe('Version', () => {
    // Use the shared version test utility
    it('should return the correct version number', async () => {
      expect(await multisigFreezeGuard.version()).to.equal(1);
    });
  });

  describe('ERC165 supportsInterface', function () {
    runSupportsInterfaceTests({
      getContract: () => multisigFreezeGuard,
      supportedInterfaceFactories: [
        IERC165__factory,
        IVersion__factory,
        {
          factory: IFreezeGuardMultisigV1__factory,
          inheritedFactories: [IFreezeGuardBaseV1__factory, IGuard__factory],
        },
        {
          factory: IFreezeGuardBaseV1__factory,
          inheritedFactories: [IGuard__factory],
        },
        IGuard__factory,
        IDeploymentBlock__factory,
      ],
    });
  });

  describe('UUPS Upgradeability', function () {
    runUUPSUpgradeabilityTests({
      getContract: () => multisigFreezeGuard,
      createNewImplementation: async () => {
        const newImplementation = await new FreezeGuardMultisigV1__factory(owner).deploy();
        return newImplementation;
      },
      owner: () => owner,
      nonOwner: () => nonOwner,
    });
  });

  describe('Deployment Block', () => {
    runDeploymentBlockTests({
      getContract: () => multisigFreezeGuard,
    });
  });

  describe('InitializerEventEmitter', () => {
    runInitializerEventEmitterTests({
      contractFactory: FreezeGuardMultisigV1__factory,
      masterCopy: () => masterCopy,
      deployer: () => proxyDeployer,
      initializeParams: async () => [
        TIMELOCK_PERIOD,
        EXECUTION_PERIOD,
        owner.address,
        await mockFreezable.getAddress(),
        await mockSafe.getAddress(),
      ],
      getExpectedInitData: async () =>
        ethers.AbiCoder.defaultAbiCoder().encode(
          ['uint32', 'uint32', 'address', 'address', 'address'],
          [
            TIMELOCK_PERIOD,
            EXECUTION_PERIOD,
            owner.address,
            await mockFreezable.getAddress(),
            await mockSafe.getAddress(),
          ],
        ),
    });
  });
});
