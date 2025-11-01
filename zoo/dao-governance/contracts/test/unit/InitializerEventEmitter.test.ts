import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import type { ContractTransactionReceipt } from 'ethers';
import { ethers } from 'hardhat';
import {
  ConcreteInitializerEventEmitter,
  ConcreteInitializerEventEmitter__factory,
  ERC1967Proxy__factory,
} from '../../typechain-types';

describe('InitializerEventEmitter', () => {
  let deployer: SignerWithAddress;
  let owner: SignerWithAddress;

  let concreteInitializerEventEmitter: ConcreteInitializerEventEmitter;
  let masterCopy: string;
  let initTxReceipt: ContractTransactionReceipt;
  let testInitData: string;

  beforeEach(async () => {
    // Get signers
    [deployer, owner] = await ethers.getSigners();

    // Deploy master copy
    masterCopy = await (
      await new ConcreteInitializerEventEmitter__factory(deployer).deploy()
    ).getAddress();

    // Prepare test initialization data
    testInitData = ethers.AbiCoder.defaultAbiCoder().encode(
      ['address', 'uint256', 'string'],
      [owner.address, 12345n, 'test initialization'],
    );

    // Deploy proxy with initialization
    const initData = ConcreteInitializerEventEmitter__factory.createInterface().encodeFunctionData(
      'initialize',
      [testInitData],
    );
    const proxy = await new ERC1967Proxy__factory(deployer).deploy(masterCopy, initData);

    // Get the deployment transaction receipt
    const deploymentTx = proxy.deploymentTransaction();
    if (!deploymentTx) {
      throw new Error('Deployment transaction is null');
    }

    const receipt = await deploymentTx.wait();
    if (!receipt) {
      throw new Error('Deployment transaction receipt is null');
    }

    initTxReceipt = receipt;

    // Connect to the proxy
    concreteInitializerEventEmitter = ConcreteInitializerEventEmitter__factory.connect(
      await proxy.getAddress(),
      owner,
    );
  });

  describe('Initialization', () => {
    it('should emit InitializeData event with correct data during proxy deployment', async () => {
      // Find the InitializeData event in the deployment transaction
      const events = initTxReceipt.logs
        .map((log: any) => {
          try {
            return concreteInitializerEventEmitter.interface.parseLog(log);
          } catch {
            return null;
          }
        })
        .filter((event: any) => event !== null);

      const initializeDataEvent = events.find((event: any) => event?.name === 'InitializeData');

      expect(initializeDataEvent).to.not.be.undefined;
      expect(initializeDataEvent?.args.initData).to.equal(testInitData);
    });

    it('should not allow reinitialization', async () => {
      const newInitData = ethers.AbiCoder.defaultAbiCoder().encode(['address'], [deployer.address]);

      await expect(
        concreteInitializerEventEmitter.initialize(newInitData),
      ).to.be.revertedWithCustomError(concreteInitializerEventEmitter, 'InvalidInitialization');
    });

    it('should not allow reinitialization to emit the event again', async () => {
      const newInitData = ethers.AbiCoder.defaultAbiCoder().encode(['address'], [deployer.address]);

      // The reinitialize(2) function should revert because __InitializerEventEmitter_init
      // can only be called once due to the internal check
      await expect(
        concreteInitializerEventEmitter.reinitialize(newInitData),
      ).to.be.revertedWithCustomError(
        concreteInitializerEventEmitter,
        'InitializeDataAlreadyEmitted',
      );
    });
  });

  describe('Edge cases', () => {
    it('should handle empty initialization data via proxy', async () => {
      // Deploy new proxy with empty data
      const emptyData = '0x';
      const initData =
        ConcreteInitializerEventEmitter__factory.createInterface().encodeFunctionData(
          'initialize',
          [emptyData],
        );
      const emptyProxy = await new ERC1967Proxy__factory(deployer).deploy(masterCopy, initData);
      const emptyTxReceipt = await emptyProxy.deploymentTransaction()?.wait();

      // Check the event was emitted with empty data
      const emptyContract = ConcreteInitializerEventEmitter__factory.connect(
        await emptyProxy.getAddress(),
        owner,
      );

      const events = emptyTxReceipt?.logs
        .map(log => {
          try {
            return emptyContract.interface.parseLog(log);
          } catch {
            return null;
          }
        })
        .filter(e => e !== null && e?.name === 'InitializeData');

      expect(events || []).to.have.lengthOf(1);
      expect(events?.[0]?.args.initData).to.equal(emptyData);
    });

    it('should handle large initialization data via proxy', async () => {
      // Create large initialization data (1KB of data)
      const largeArray = new Array(32).fill(ethers.ZeroHash);
      const largeInitData = ethers.AbiCoder.defaultAbiCoder().encode(['bytes32[]'], [largeArray]);

      // Deploy new proxy with large data
      const initData =
        ConcreteInitializerEventEmitter__factory.createInterface().encodeFunctionData(
          'initialize',
          [largeInitData],
        );
      const largeProxy = await new ERC1967Proxy__factory(deployer).deploy(masterCopy, initData);
      const largeTxReceipt = await largeProxy.deploymentTransaction()?.wait();

      // Check the event was emitted with the large data
      const largeContract = ConcreteInitializerEventEmitter__factory.connect(
        await largeProxy.getAddress(),
        owner,
      );

      const events = largeTxReceipt?.logs
        .map(log => {
          try {
            return largeContract.interface.parseLog(log);
          } catch {
            return null;
          }
        })
        .filter(e => e !== null && e?.name === 'InitializeData');

      expect(events || []).to.have.lengthOf(1);
      expect(events?.[0]?.args.initData).to.equal(largeInitData);
    });
  });
});
