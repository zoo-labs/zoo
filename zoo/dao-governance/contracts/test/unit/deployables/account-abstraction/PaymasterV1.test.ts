import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  PaymasterV1,
  PaymasterV1__factory,
  ERC1967Proxy__factory,
  IBasePaymaster__factory,
  IPaymasterV1__factory,
  IDeploymentBlock__factory,
  IERC165__factory,
  ILightAccountValidator__factory,
  IPaymaster__factory,
  IVersion__factory,
  MockEntryPoint,
  MockEntryPoint__factory,
  MockGaslessTarget,
  MockGaslessTarget__factory,
  MockLightAccount,
  MockLightAccount__factory,
  MockLightAccountFactory,
  MockLightAccountFactory__factory,
  MockValidator,
  MockValidator__factory,
} from '../../../../typechain-types';
import { runDeploymentBlockTests } from '../../shared/deploymentBlockTests';
import { runInitializerEventEmitterTests } from '../../shared/initializerEventEmitterTests';
import { runSupportsInterfaceTests } from '../../shared/supportsInterfaceTests';
import { runUUPSUpgradeabilityTests } from '../../shared/uupsUpgradeabilityTests';

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

// Helper function for deploying PaymasterV1 instances using ERC1967Proxy
async function deployDAOPaymasterProxy(
  proxyDeployer: SignerWithAddress,
  implementation: string,
  owner: SignerWithAddress,
  entryPoint: string,
  lightAccountFactory: string,
): Promise<PaymasterV1> {
  // Create full initialization data with function selector
  const fullInitData = PaymasterV1__factory.createInterface().encodeFunctionData(
    'initialize',
    [owner.address, entryPoint, lightAccountFactory],
  );

  // Deploy the proxy with the implementation
  const proxy = await new ERC1967Proxy__factory(proxyDeployer).deploy(implementation, fullInitData);

  // Return a contract instance connected to the proxy
  return PaymasterV1__factory.connect(await proxy.getAddress(), owner);
}

describe('PaymasterV1', function () {
  // contracts
  let daoPaymaster: PaymasterV1;
  let masterCopy: PaymasterV1;
  let entryPoint: MockEntryPoint;
  let mockLightAccount: MockLightAccount;
  let mockTarget: MockGaslessTarget;
  let mockLightAccountFactory: MockLightAccountFactory;
  let mockValidator: MockValidator;
  let mockLightAccountFactoryAddress: string;

  // signers
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;

  // test data
  let mockUserOp: PackedUserOperation;
  let FOO_SELECTOR: string;

  beforeEach(async function () {
    // Get signers
    [owner, nonOwner] = await ethers.getSigners();

    // Deploy mock EntryPoint
    entryPoint = await new MockEntryPoint__factory(owner).deploy();

    // Deploy MockLightAccount
    mockLightAccount = await new MockLightAccount__factory(owner).deploy(owner.address);

    // Deploy MockGaslessTarget
    mockTarget = await new MockGaslessTarget__factory(owner).deploy();

    // Deploy MockValidator
    mockValidator = await new MockValidator__factory(owner).deploy();

    // Deploy MockLightAccountFactory
    mockLightAccountFactory = await new MockLightAccountFactory__factory(owner).deploy();
    mockLightAccountFactoryAddress = mockLightAccountFactory.target.toString();

    // Set up the mock light account factory to return our mock account
    await mockLightAccountFactory.setAccountAddress(
      await mockLightAccount.owner(),
      0n,
      await mockLightAccount.getAddress(),
    );

    // Get the foo function selector
    FOO_SELECTOR = mockTarget.interface.getFunction('foo').selector;

    // Deploy DAOPaymaster implementation
    masterCopy = await new PaymasterV1__factory(owner).deploy();

    // Deploy DAOPaymaster proxy
    daoPaymaster = await deployDAOPaymasterProxy(
      owner,
      await masterCopy.getAddress(),
      owner,
      await entryPoint.getAddress(),
      mockLightAccountFactoryAddress,
    );

    // Create mock UserOperation with properly encoded calldata
    const innerCalldata = mockTarget.interface.encodeFunctionData('foo', [
      123, // uint32 someNumber
      1, // uint8 someFlag
    ]);

    const executeCalldata = mockLightAccount.interface.encodeFunctionData('execute', [
      await mockTarget.getAddress(),
      0n, // value
      innerCalldata,
    ]);

    mockUserOp = {
      sender: await mockLightAccount.getAddress(),
      nonce: 0n,
      initCode: '0x',
      callData: executeCalldata,
      accountGasLimits: ethers.ZeroHash,
      preVerificationGas: 0n,
      gasFees: ethers.ZeroHash,
      paymasterAndData: '0x',
      signature: '0x',
    };
  });

  describe('Initialization', function () {
    it('Should set the entry point address', async function () {
      expect(await daoPaymaster.entryPoint()).to.equal(await entryPoint.getAddress());
    });

    it('Should set the owner', async function () {
      expect(await daoPaymaster.owner()).to.equal(owner.address);
    });

    it('Should set the light account factory', async function () {
      expect(await daoPaymaster.lightAccountFactory()).to.equal(mockLightAccountFactoryAddress);
    });

    it('Should not allow reinitialization', async function () {
      await expect(
        daoPaymaster.initialize(
          owner.address,
          await entryPoint.getAddress(),
          mockLightAccountFactoryAddress,
        ),
      ).to.be.revertedWithCustomError(daoPaymaster, 'InvalidInitialization');
    });

    it('Should have a version', async function () {
      const version = await daoPaymaster.version();
      expect(version).to.equal(1);
    });
  });

  describe('Validator Management', function () {
    it('Should allow owner to set validator for target', async function () {
      await expect(
        daoPaymaster.setFunctionValidator(
          await mockTarget.getAddress(),
          FOO_SELECTOR,
          await mockValidator.getAddress(),
        ),
      )
        .to.emit(daoPaymaster, 'FunctionValidatorSet')
        .withArgs(await mockTarget.getAddress(), FOO_SELECTOR, await mockValidator.getAddress());

      expect(
        await daoPaymaster.getFunctionValidator(await mockTarget.getAddress(), FOO_SELECTOR),
      ).to.be.equal(await mockValidator.getAddress());
    });

    it('Should allow owner to remove validator for target', async function () {
      await daoPaymaster.setFunctionValidator(
        await mockTarget.getAddress(),
        FOO_SELECTOR,
        await mockValidator.getAddress(),
      );
      expect(
        await daoPaymaster.getFunctionValidator(await mockTarget.getAddress(), FOO_SELECTOR),
      ).to.be.equal(await mockValidator.getAddress());

      await expect(
        daoPaymaster.removeFunctionValidator(await mockTarget.getAddress(), FOO_SELECTOR),
      )
        .to.emit(daoPaymaster, 'FunctionValidatorRemoved')
        .withArgs(await mockTarget.getAddress(), FOO_SELECTOR);

      expect(
        await daoPaymaster.getFunctionValidator(await mockTarget.getAddress(), FOO_SELECTOR),
      ).to.be.equal(ethers.ZeroAddress);
    });

    it('Should revert when non-owner tries to set validator', async function () {
      await expect(
        daoPaymaster
          .connect(nonOwner)
          .setFunctionValidator(
            await mockTarget.getAddress(),
            FOO_SELECTOR,
            await mockValidator.getAddress(),
          ),
      ).to.be.revertedWithCustomError(daoPaymaster, 'OwnableUnauthorizedAccount');
    });

    it('Should revert when setting invalid validator address', async function () {
      await expect(
        daoPaymaster.setFunctionValidator(
          await mockTarget.getAddress(),
          FOO_SELECTOR,
          ethers.ZeroAddress,
        ),
      ).to.be.revertedWithCustomError(daoPaymaster, 'InvalidValidator');
    });
  });

  describe('Validation', function () {
    beforeEach(async function () {
      // Set up validator for mock target and FOO_SELECTOR
      await daoPaymaster.setFunctionValidator(
        await mockTarget.getAddress(),
        FOO_SELECTOR,
        await mockValidator.getAddress(),
      );
      // Configure validator to return true
      await mockValidator.setShouldValidate(true);
    });

    it('Should validate when validator approves', async function () {
      const entryPointSigner = await ethers.getImpersonatedSigner(await entryPoint.getAddress());
      const result = await daoPaymaster
        .connect(entryPointSigner)
        .validatePaymasterUserOp.staticCall(mockUserOp, ethers.ZeroHash, 0);

      expect(result[1]).to.equal(0n); // validationData
      expect(result[0]).to.equal('0x'); // context
    });

    it('Should revert when validator disapproves', async function () {
      // Configure validator to return false
      await mockValidator.setShouldValidate(false);

      await expect(
        daoPaymaster
          .connect(await ethers.getImpersonatedSigner(await entryPoint.getAddress()))
          .validatePaymasterUserOp.staticCall(mockUserOp, ethers.ZeroHash, 0),
      ).to.be.revertedWithCustomError(daoPaymaster, 'ValidationFailed');
    });

    it('Should revert when no validator is set', async function () {
      // Remove validator
      await daoPaymaster.removeFunctionValidator(await mockTarget.getAddress(), FOO_SELECTOR);

      await expect(
        daoPaymaster
          .connect(await ethers.getImpersonatedSigner(await entryPoint.getAddress()))
          .validatePaymasterUserOp.staticCall(mockUserOp, ethers.ZeroHash, 0),
      ).to.be.revertedWithCustomError(daoPaymaster, 'NoValidatorSet');
    });

    it('Should revert for non-whitelisted function selectors', async function () {
      // Create a new function selector that isn't whitelisted
      const nonWhitelistedSelector = mockTarget.interface.getFunction('bar').selector;

      // Create inner calldata with non-whitelisted selector
      const innerCalldata = mockTarget.interface.encodeFunctionData('bar', [
        owner.address, // address someAddress
        ethers.parseEther('1'), // uint256 someAmount
      ]);

      // Create the execute calldata
      const executeCalldata = mockLightAccount.interface.encodeFunctionData('execute', [
        await mockTarget.getAddress(),
        0n, // value
        innerCalldata,
      ]);

      const userOp = { ...mockUserOp, callData: executeCalldata };

      await expect(
        daoPaymaster
          .connect(await ethers.getImpersonatedSigner(await entryPoint.getAddress()))
          .validatePaymasterUserOp.staticCall(userOp, ethers.ZeroHash, 0),
      )
        .to.be.revertedWithCustomError(daoPaymaster, 'NoValidatorSet')
        .withArgs(await mockTarget.getAddress(), nonWhitelistedSelector);
    });
  });

  describe('Deposit handling', function () {
    it('Should accept deposits through deposit function', async function () {
      const depositAmount = ethers.parseEther('1');

      await expect(daoPaymaster.deposit({ value: depositAmount })).to.changeEtherBalance(
        entryPoint,
        depositAmount,
      );
    });

    it('Should reject direct ETH transfers', async function () {
      const depositAmount = ethers.parseEther('1');

      await expect(
        owner.sendTransaction({
          to: await daoPaymaster.getAddress(),
          value: depositAmount,
        }),
      ).to.be.reverted;
    });

    it('Should handle zero value deposits', async function () {
      const depositAmount = 0n;

      await expect(daoPaymaster.deposit({ value: depositAmount })).to.changeEtherBalance(
        entryPoint,
        depositAmount,
      );
    });

    it('Should handle large value deposits', async function () {
      const depositAmount = ethers.parseEther('1000');

      await expect(daoPaymaster.deposit({ value: depositAmount })).to.changeEtherBalance(
        entryPoint,
        depositAmount,
      );
    });

    it('Should handle multiple deposits', async function () {
      const deposit1 = ethers.parseEther('1');
      const deposit2 = ethers.parseEther('2');
      const deposit3 = ethers.parseEther('3');

      await daoPaymaster.deposit({ value: deposit1 });
      await daoPaymaster.deposit({ value: deposit2 });
      await daoPaymaster.deposit({ value: deposit3 });

      const totalDeposit = deposit1 + deposit2 + deposit3;
      const balance = await entryPoint.balanceOf(await daoPaymaster.getAddress());
      expect(balance).to.equal(totalDeposit);
    });
  });

  describe('ERC165 supportsInterface', () => {
    runSupportsInterfaceTests({
      getContract: () => daoPaymaster,
      supportedInterfaceFactories: [
        IERC165__factory,
        IPaymaster__factory,
        IBasePaymaster__factory,
        IPaymasterV1__factory,
        IVersion__factory,
        ILightAccountValidator__factory,
        IDeploymentBlock__factory,
      ],
    });
  });

  describe('Version', () => {
    it('should return the correct version number', async () => {
      expect(await daoPaymaster.version()).to.equal(1);
    });
  });

  describe('UUPS Upgradeability', function () {
    runUUPSUpgradeabilityTests({
      getContract: () => daoPaymaster,
      createNewImplementation: async () => {
        const newImplementation = await new PaymasterV1__factory(owner).deploy();
        return newImplementation;
      },
      owner: () => owner,
      nonOwner: () => nonOwner,
    });
  });

  describe('Deployment Block', () => {
    runDeploymentBlockTests({
      getContract: () => daoPaymaster,
    });
  });

  // Test InitializerEventEmitter functionality
  describe('InitializerEventEmitter', () => {
    runInitializerEventEmitterTests({
      contractFactory: PaymasterV1__factory,
      masterCopy: async () => await masterCopy.getAddress(),
      deployer: () => owner,
      initializeParams: async () => [
        owner.address,
        await entryPoint.getAddress(),
        mockLightAccountFactoryAddress,
      ],
      getExpectedInitData: async () =>
        ethers.AbiCoder.defaultAbiCoder().encode(
          ['address', 'address', 'address'],
          [owner.address, await entryPoint.getAddress(), mockLightAccountFactoryAddress],
        ),
    });
  });
});
