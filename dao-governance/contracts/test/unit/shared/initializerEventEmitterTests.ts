import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import type { BaseContract, Interface, TransactionReceipt } from 'ethers';
import { ERC1967Proxy__factory } from '../../../typechain-types';

/**
 * Shared test utilities for testing InitializerEventEmitter functionality
 * Used by all contracts that implement InitializerEventEmitter
 */

export type ContractFactory = {
  createInterface(): Interface;
  connect(address: string, signer: SignerWithAddress): BaseContract;
};

/**
 * Parameters for running the InitializerEventEmitter tests
 */
interface InitializerEventEmitterTestParams {
  /**
   * Factory for the contract being tested (typechain generated factory)
   */
  contractFactory: ContractFactory;

  /**
   * The master copy address of the implementation contract
   * Can be a string or a function that returns a string/Promise<string>
   */
  masterCopy: () => string | Promise<string>;

  /**
   * The deployer signer
   * Can be a SignerWithAddress or a function that returns one
   */
  deployer: () => SignerWithAddress;

  /**
   * Initialize function parameters to use for deployment
   * Can be an array or a function that returns an array/Promise<array>
   */
  initializeParams: () => any[] | Promise<any[]>;

  /**
   * Optional: custom encoding of the expected init data
   * If not provided, will use abi.encode of initializeParams
   */
  getExpectedInitData: () => string | Promise<string>;
}

/**
 * Run all the InitializerEventEmitter tests on the given contract
 * @param params The test parameters
 */
export function runInitializerEventEmitterTests(params: InitializerEventEmitterTestParams): void {
  let contract: BaseContract;
  let initTxReceipt: TransactionReceipt;
  let expectedInitData: string;

  beforeEach(async function () {
    const masterCopy = await params.masterCopy();
    const deployer = params.deployer();
    const initializeParams = await params.initializeParams();

    // Encode the initialization data
    const fullInitData = params.contractFactory
      .createInterface()
      .encodeFunctionData('initialize', initializeParams);

    // Deploy proxy with initialization
    const proxy = await new ERC1967Proxy__factory(deployer).deploy(masterCopy, fullInitData);

    const tx = proxy.deploymentTransaction();
    if (!tx) {
      throw new Error('Deployment transaction is null');
    }

    const receipt = await tx.wait();
    if (!receipt) {
      throw new Error('Deployment transaction receipt is null');
    }

    initTxReceipt = receipt;

    // Connect to the proxy
    contract = params.contractFactory.connect(await proxy.getAddress(), deployer);

    // Calculate expected init data
    expectedInitData = await params.getExpectedInitData();
  });

  it('should emit InitializeData event during initialization', async () => {
    // Ensure we have a receipt
    expect(initTxReceipt).to.not.be.undefined;

    // Parse all logs from the transaction
    const events = initTxReceipt?.logs
      .map((log: any) => {
        try {
          return contract.interface.parseLog(log);
        } catch {
          // Log might be from a different contract, ignore parse errors
          return null;
        }
      })
      .filter((event: any) => event !== null);

    // Find the InitializeData event
    const initializeDataEvent = events.find((event: any) => event?.name === 'InitializeData');

    // Verify the event was emitted
    expect(initializeDataEvent).to.not.be.undefined;
    expect(initializeDataEvent).to.not.be.null;

    // Verify the event data matches expected
    expect(initializeDataEvent?.args.initData).to.equal(expectedInitData);
  });

  it('should only emit InitializeData event once during initialization', async () => {
    // Ensure we have a receipt
    expect(initTxReceipt).to.not.be.undefined;

    // Parse all logs from the transaction
    const events = initTxReceipt?.logs
      .map((log: any) => {
        try {
          return contract.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .filter((event: any) => event !== null);

    // Find all InitializeData events
    const initializeDataEvents = events.filter((event: any) => event?.name === 'InitializeData');

    // Verify exactly one InitializeData event was emitted
    expect(initializeDataEvents.length).to.equal(
      1,
      'InitializeData event should be emitted exactly once',
    );
  });

  it('should emit InitializeData as properly formatted hex string', async () => {
    // Ensure we have a receipt
    expect(initTxReceipt).to.not.be.undefined;

    // Parse the specific InitializeData event
    const events = initTxReceipt?.logs
      .map((log: any) => {
        try {
          return contract.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .filter((event: any) => event !== null);

    const initializeDataEvent = events.find((event: any) => event?.name === 'InitializeData');

    // Verify the emitted data is a properly formatted hex string
    // This is important because the contract should always emit valid hex data
    // regardless of what format the test's expectedInitData is in
    expect(initializeDataEvent?.args.initData).to.be.a('string');
    expect(initializeDataEvent?.args.initData).to.match(/^0x[0-9a-fA-F]*$/);
  });
}
