import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  AutonomousAdminV1,
  AutonomousAdminV1__factory,
  ERC1967Proxy__factory,
  IAutonomousAdminV1__factory,
  IDeploymentBlock__factory,
  IERC165__factory,
  IVersion__factory,
} from '../../../../typechain-types';
import { runDeploymentBlockTests } from '../../shared/deploymentBlockTests';
import { runInitializerEventEmitterTests } from '../../shared/initializerEventEmitterTests';
import { runSupportsInterfaceTests } from '../../shared/supportsInterfaceTests';

// Helper function for deploying AutonomousAdminV1 instances using ERC1967Proxy
async function deployDAOAutonomousAdminProxy(
  proxyDeployer: SignerWithAddress,
  implementation: AutonomousAdminV1,
): Promise<AutonomousAdminV1> {
  const initializeCalldata = implementation.interface.encodeFunctionData('initialize');

  // Deploy the proxy with the implementation
  const proxy = await new ERC1967Proxy__factory(proxyDeployer).deploy(
    implementation,
    initializeCalldata,
  );

  // Return a contract instance connected to the proxy
  return AutonomousAdminV1__factory.connect(await proxy.getAddress(), proxyDeployer);
}

describe('AutonomousAdminV1', function () {
  // Signer accounts
  let proxyDeployer: SignerWithAddress;

  // Contract instances
  let daoAutonomousAdmin: AutonomousAdminV1;

  beforeEach(async function () {
    // Get signers
    [proxyDeployer] = await ethers.getSigners();

    // Deploy AutonomousAdminV1 implementation
    const masterCopy = await new AutonomousAdminV1__factory(proxyDeployer).deploy();

    // Deploy AutonomousAdminV1 via proxy
    daoAutonomousAdmin = await deployDAOAutonomousAdminProxy(proxyDeployer, masterCopy);
  });

  describe('ERC165 supportsInterface', function () {
    runSupportsInterfaceTests({
      getContract: () => daoAutonomousAdmin,
      supportedInterfaceFactories: [
        IERC165__factory,
        IAutonomousAdminV1__factory,
        IVersion__factory,
        IDeploymentBlock__factory,
      ],
    });
  });

  describe('Version', () => {
    it('should return the correct version number', async () => {
      expect(await daoAutonomousAdmin.version()).to.equal(1);
    });
  });

  describe('Deployment Block', () => {
    runDeploymentBlockTests({
      getContract: () => daoAutonomousAdmin,
    });
  });

  // Test InitializerEventEmitter functionality
  describe('InitializerEventEmitter', () => {
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
    });

    runInitializerEventEmitterTests({
      contractFactory: AutonomousAdminV1__factory,
      masterCopy: async () =>
        await (await new AutonomousAdminV1__factory(deployer).deploy()).getAddress(),
      deployer: () => deployer,
      initializeParams: () => [],
      getExpectedInitData: () => ethers.AbiCoder.defaultAbiCoder().encode([], []),
    });
  });
});
