import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  ERC1967Proxy__factory,
  FreezeGuardAzoriusV1,
  FreezeGuardAzoriusV1__factory,
  IDeploymentBlock__factory,
  IERC165__factory,
  IFreezeGuardAzoriusV1__factory,
  IFreezeGuardBaseV1__factory,
  IGuard__factory,
  IVersion__factory,
  MockFreezable,
  MockFreezable__factory,
} from '../../../../typechain-types';
import { runDeploymentBlockTests } from '../../shared/deploymentBlockTests';
import { runInitializerEventEmitterTests } from '../../shared/initializerEventEmitterTests';
import { runSupportsInterfaceTests } from '../../shared/supportsInterfaceTests';
import { runUUPSUpgradeabilityTests } from '../../shared/uupsUpgradeabilityTests';

// Helper function for deploying AzoriusFreezeGuardV1 instances using ERC1967Proxy
async function deployAzoriusFreezeGuardProxy(
  proxyDeployer: SignerWithAddress,
  implementation: string,
  owner: SignerWithAddress,
  freezeVoting: string,
): Promise<FreezeGuardAzoriusV1> {
  // Create initialization data with function selector
  const fullInitData = FreezeGuardAzoriusV1__factory.createInterface().encodeFunctionData(
    'initialize',
    [owner.address, freezeVoting],
  );

  // Deploy the proxy with the implementation
  const proxy = await new ERC1967Proxy__factory(proxyDeployer).deploy(implementation, fullInitData);

  // Return a contract instance connected to the proxy
  return FreezeGuardAzoriusV1__factory.connect(await proxy.getAddress(), owner);
}

describe('FreezeGuardAzoriusV1', () => {
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
  let azoriusFreezeGuard: FreezeGuardAzoriusV1;
  let mockFreezable: MockFreezable;

  beforeEach(async () => {
    // Get signers
    [proxyDeployer, owner, user, nonOwner] = await ethers.getSigners();

    // Deploy implementation
    const implementation = await new FreezeGuardAzoriusV1__factory(proxyDeployer).deploy();
    masterCopy = await implementation.getAddress();

    // Deploy mock contracts
    mockFreezable = await new MockFreezable__factory(owner).deploy();
  });

  describe('Initialization', () => {
    it('should initialize with correct owner and freezeVoting address', async () => {
      azoriusFreezeGuard = await deployAzoriusFreezeGuardProxy(
        proxyDeployer,
        masterCopy,
        owner,
        await mockFreezable.getAddress(),
      );

      expect(await azoriusFreezeGuard.owner()).to.equal(owner.address);
      expect(await azoriusFreezeGuard.freezable()).to.equal(await mockFreezable.getAddress());
    });

    it('should not allow reinitialization', async () => {
      azoriusFreezeGuard = await deployAzoriusFreezeGuardProxy(
        proxyDeployer,
        masterCopy,
        owner,
        await mockFreezable.getAddress(),
      );

      await expect(
        azoriusFreezeGuard.initialize(user.address, ethers.ZeroAddress),
      ).to.be.revertedWithCustomError(azoriusFreezeGuard, 'InvalidInitialization');
    });

    it('Should have initialization disabled in the implementation', async function () {
      const implementationContract = FreezeGuardAzoriusV1__factory.connect(
        masterCopy,
        proxyDeployer,
      );

      await expect(
        implementationContract.initialize(owner.address, ethers.ZeroAddress),
      ).to.be.revertedWithCustomError(implementationContract, 'InvalidInitialization');
    });
  });

  describe('Ownership', function () {
    beforeEach(async () => {
      azoriusFreezeGuard = await deployAzoriusFreezeGuardProxy(
        proxyDeployer,
        masterCopy,
        owner,
        await mockFreezable.getAddress(),
      );
    });

    it('Should allow owner to call owner-only functions', async function () {
      // The transfer ownership function is an example of an owner-only function
      await azoriusFreezeGuard.connect(owner).transferOwnership(user.address);
      await azoriusFreezeGuard.connect(user).acceptOwnership();
      expect(await azoriusFreezeGuard.owner()).to.equal(user.address);
    });

    it('Should prevent non-owners from calling owner-only functions', async function () {
      await expect(
        azoriusFreezeGuard.connect(user).transferOwnership(user.address),
      ).to.be.revertedWithCustomError(azoriusFreezeGuard, 'OwnableUnauthorizedAccount');
    });
  });

  describe('Transaction Checking', () => {
    beforeEach(async () => {
      // Deploy the guard with the mock freeze voting
      azoriusFreezeGuard = await deployAzoriusFreezeGuardProxy(
        proxyDeployer,
        masterCopy,
        owner,
        await mockFreezable.getAddress(),
      );
    });

    it('should allow transactions when DAO is not frozen', async () => {
      // Set the mock to return false for isFrozen
      await mockFreezable.setIsFrozen(false);

      // Should not revert when checking transaction
      await expect(
        azoriusFreezeGuard.checkTransaction(
          ethers.ZeroAddress, // to
          0, // value
          '0x', // data
          Operation.Call, // operation
          0, // safeTxGas
          0, // baseGas
          0, // gasPrice
          ethers.ZeroAddress, // gasToken
          ethers.ZeroAddress, // refundReceiver
          '0x', // signatures
          ethers.ZeroAddress, // msgSender
        ),
      ).not.to.be.reverted;
    });

    it('should revert transactions when DAO is frozen', async () => {
      // Set the mock to return true for isFrozen
      await mockFreezable.setIsFrozen(true);

      // Should revert with DAOFrozen
      await expect(
        azoriusFreezeGuard.checkTransaction(
          ethers.ZeroAddress, // to
          0, // value
          '0x', // data
          Operation.Call, // operation
          0, // safeTxGas
          0, // baseGas
          0, // gasPrice
          ethers.ZeroAddress, // gasToken
          ethers.ZeroAddress, // refundReceiver
          '0x', // signatures
          ethers.ZeroAddress, // msgSender
        ),
      ).to.be.revertedWithCustomError(azoriusFreezeGuard, 'DAOFrozen');
    });

    it('should not perform any checks after execution', async () => {
      // checkAfterExecution should not revert or do anything
      await expect(azoriusFreezeGuard.checkAfterExecution(ethers.randomBytes(32), true)).not.to.be
        .reverted;
    });
  });

  describe('Version', () => {
    beforeEach(async () => {
      azoriusFreezeGuard = await deployAzoriusFreezeGuardProxy(
        proxyDeployer,
        masterCopy,
        owner,
        await mockFreezable.getAddress(),
      );
    });

    // Use the shared version test utility
    it('should return the correct version number', async () => {
      expect(await azoriusFreezeGuard.version()).to.equal(1);
    });
  });

  describe('ERC165 supportsInterface', function () {
    beforeEach(async function () {
      azoriusFreezeGuard = await deployAzoriusFreezeGuardProxy(
        proxyDeployer,
        masterCopy,
        owner,
        await mockFreezable.getAddress(),
      );
    });

    runSupportsInterfaceTests({
      getContract: () => azoriusFreezeGuard,
      supportedInterfaceFactories: [
        IERC165__factory,
        IVersion__factory,
        {
          factory: IFreezeGuardAzoriusV1__factory,
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

  describe('AzoriusFreezeGuardV1 UUPS Upgradeability', function () {
    beforeEach(async function () {
      // Deploy proxy
      azoriusFreezeGuard = await deployAzoriusFreezeGuardProxy(
        proxyDeployer,
        masterCopy,
        owner,
        await mockFreezable.getAddress(),
      );
    });

    // Run UUPS upgradeability tests
    runUUPSUpgradeabilityTests({
      getContract: () => azoriusFreezeGuard,
      createNewImplementation: async () => {
        const newImplementation = await new FreezeGuardAzoriusV1__factory(owner).deploy();
        return newImplementation;
      },
      owner: () => owner,
      nonOwner: () => nonOwner,
    });
  });

  describe('Deployment Block', () => {
    beforeEach(async function () {
      azoriusFreezeGuard = await deployAzoriusFreezeGuardProxy(
        proxyDeployer,
        masterCopy,
        owner,
        await mockFreezable.getAddress(),
      );
    });

    runDeploymentBlockTests({
      getContract: () => azoriusFreezeGuard,
    });
  });

  describe('InitializerEventEmitter', () => {
    runInitializerEventEmitterTests({
      contractFactory: FreezeGuardAzoriusV1__factory,
      masterCopy: () => masterCopy,
      deployer: () => proxyDeployer,
      initializeParams: async () => [owner.address, await mockFreezable.getAddress()],
      getExpectedInitData: async () =>
        ethers.AbiCoder.defaultAbiCoder().encode(
          ['address', 'address'],
          [owner.address, await mockFreezable.getAddress()],
        ),
    });
  });
});
