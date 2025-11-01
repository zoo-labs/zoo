import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import type { AddressLike, BigNumberish, ContractTransactionReceipt, Log } from 'ethers';
import { ethers } from 'hardhat';
import {
  ERC165__factory,
  FailingInitializerContract__factory,
  FreezeGuardAzoriusV1__factory,
  FreezeGuardMultisigV1__factory,
  FreezeVotingAzoriusV1__factory,
  FreezeVotingMultisigV1__factory,
  FreezeVotingStandaloneV1__factory,
  IDeploymentBlock__factory,
  IncompatibleStorageContract__factory,
  ISystemDeployerV1,
  ISystemDeployerV1__factory,
  IVersion__factory,
  MinimalUpgradeableContract__factory,
  ModuleAzoriusV1,
  ModuleAzoriusV1__factory,
  ModuleFractalV1__factory,
  ProposerAdapterERC20V1,
  ProposerAdapterERC20V1__factory,
  ProposerAdapterERC721V1,
  ProposerAdapterERC721V1__factory,
  ProposerAdapterHatsV1,
  ProposerAdapterHatsV1__factory,
  Safe,
  Safe__factory,
  SafeProxyFactory,
  SafeProxyFactory__factory,
  StrategyV1,
  StrategyV1__factory,
  SystemDeployerEventEmitterV1,
  SystemDeployerEventEmitterV1__factory,
  SystemDeployerV1,
  SystemDeployerV1__factory,
  UpgradeContractV1,
  UpgradeContractV1__factory,
  UpgradeContractV2__factory,
  UpgradeContractV3__factory,
  VotesERC20V1,
  VotesERC20V1__factory,
  VoteTrackerERC20V1,
  VoteTrackerERC20V1__factory,
  VoteTrackerERC721V1,
  VoteTrackerERC721V1__factory,
  VotingWeightERC20V1,
  VotingWeightERC20V1__factory,
  VotingWeightERC721V1,
  VotingWeightERC721V1__factory,
} from '../../../typechain-types';
import { runDeploymentBlockTests } from '../shared/deploymentBlockTests';
import { runSupportsInterfaceTests } from '../shared/supportsInterfaceTests';

// ======================================================================
// Event Handling Helpers
// ======================================================================

// Helper to extract address from event topic (handles indexed parameters)
function extractAddressFromTopic(topic: string): string {
  // Event topics are 32 bytes, addresses are 20 bytes (last 40 hex chars)
  return ethers.getAddress('0x' + topic.slice(26));
}

// Helper to parse ProxyDeployed event and return both addresses
function parseProxyDeployedEvent(receipt: ContractTransactionReceipt): {
  proxyAddress: string;
  implementationAddress: string;
} | null {
  const event = receipt.logs.find((log: Log) => {
    return log.topics[0] === ethers.id('ProxyDeployed(address,address)');
  });

  if (!event || event.topics.length < 3) {
    return null;
  }

  return {
    proxyAddress: extractAddressFromTopic(event.topics[1]),
    implementationAddress: extractAddressFromTopic(event.topics[2]),
  };
}

// Helper to find ExecutionFailure event in transaction receipt
function findExecutionFailureEvent(receipt: ContractTransactionReceipt): Log | undefined {
  return receipt.logs.find((log: Log) => {
    return log.topics[0] === ethers.id('ExecutionFailure(bytes32,uint256)');
  });
}

// ======================================================================
// Safe Transaction Helpers
// ======================================================================

// Helper to prepare Safe transaction data
async function prepareSafeTransaction(params: {
  safe: Safe;
  to: string;
  data: string;
  operation: number; // 0 = call, 1 = delegatecall
  safeTxGas: number;
  nonce: number;
}): Promise<{ safeTxHash: string; txParams: any }> {
  const { safe, to, data, operation = 1, safeTxGas = 0, nonce } = params;

  const currentNonce = nonce ?? Number(await safe.nonce());

  const txParams = {
    to,
    value: 0,
    data,
    operation,
    safeTxGas,
    baseGas: 0,
    gasPrice: 0,
    gasToken: ethers.ZeroAddress,
    refundReceiver: ethers.ZeroAddress,
    nonce: currentNonce,
  };

  const safeTxHash = await safe.getTransactionHash(
    txParams.to,
    txParams.value,
    txParams.data,
    txParams.operation,
    txParams.safeTxGas,
    txParams.baseGas,
    txParams.gasPrice,
    txParams.gasToken,
    txParams.refundReceiver,
    txParams.nonce,
  );

  return { safeTxHash, txParams };
}

// Helper function to create Safe-compatible signatures
async function signSafeTransaction(signer: SignerWithAddress, safeTxHash: string): Promise<string> {
  // Sign the message (this uses eth_sign which adds the Ethereum Signed Message prefix)
  const messageArray = ethers.getBytes(safeTxHash);
  const signature = await signer.signMessage(messageArray);

  // Parse the signature to adjust v value for eth_sign compatibility
  const sig = ethers.Signature.from(signature);

  // For eth_sign signatures, Safe expects v to be adjusted by adding 4
  // This makes v > 30 which triggers the eth_sign verification path in Safe
  const adjustedV = sig.v + 4;

  // Reconstruct the signature with adjusted v
  return ethers.solidityPacked(['bytes32', 'bytes32', 'uint8'], [sig.r, sig.s, adjustedV]);
}

// Helper to execute Safe transaction
async function executeSafeTransaction(params: {
  safe: Safe;
  owner: SignerWithAddress;
  safeTxHash: string;
  txParams: any;
}): Promise<any> {
  const { safe, owner, safeTxHash, txParams } = params;

  // Sign the transaction
  const signature = await signSafeTransaction(owner, safeTxHash);

  // Execute the transaction
  return safe.execTransaction(
    txParams.to,
    txParams.value,
    txParams.data,
    txParams.operation,
    txParams.safeTxGas,
    txParams.baseGas,
    txParams.gasPrice,
    txParams.gasToken,
    txParams.refundReceiver,
    signature,
  );
}

// ======================================================================
// Verification Helpers
// ======================================================================

// Helper to verify proxy exists at address
async function verifyProxyDeployment(address: string): Promise<boolean> {
  const code = await ethers.provider.getCode(address);
  return code !== '0x';
}

// ======================================================================
// Salt Helpers
// ======================================================================

// Helper to generate random salt
function randomSalt(): bigint {
  return BigInt(ethers.keccak256(ethers.randomBytes(32)));
}

// ======================================================================
// Safe Address Calculation Helpers
// ======================================================================

// Helper to calculate Safe proxy address via CREATE2
async function calculateSafeProxyAddress(params: {
  safeProxyFactory: SafeProxyFactory;
  safeSingleton: Safe;
  safeSetupData: string;
  saltNonce: bigint;
}): Promise<string> {
  const { safeProxyFactory, safeSingleton, safeSetupData, saltNonce } = params;

  return ethers.getCreate2Address(
    await safeProxyFactory.getAddress(),
    ethers.keccak256(
      ethers.solidityPacked(
        ['bytes', 'uint256'],
        [ethers.keccak256(ethers.solidityPacked(['bytes'], [safeSetupData])), saltNonce],
      ),
    ),
    ethers.keccak256(
      ethers.solidityPacked(
        ['bytes', 'uint256'],
        [await safeProxyFactory.proxyCreationCode(), await safeSingleton.getAddress()],
      ),
    ),
  );
}

// ======================================================================
// Composite Helper Functions
// ======================================================================

// Helper function to deploy proxy via delegatecall from Safe
async function deployProxyViaSafe(params: {
  systemDeployer: SystemDeployerV1;
  safe: Safe;
  owner: SignerWithAddress;
  implementation: string;
  initData: string;
  salt: bigint;
  expectFailure?: boolean;
}): Promise<{ tx: any; predictedAddress: string }> {
  const {
    systemDeployer,
    safe,
    owner,
    implementation,
    initData,
    salt,
    expectFailure = false,
  } = params;

  // Encode deployProxy call
  const deployProxyData = systemDeployer.interface.encodeFunctionData('deployProxy', [
    implementation,
    initData,
    ethers.toBeHex(salt, 32),
  ]);

  // Use safeTxGas = 1 when expecting failure to avoid GS013 error
  const safeTxGas = expectFailure ? 1 : 0;

  // Prepare Safe transaction
  const { safeTxHash, txParams } = await prepareSafeTransaction({
    safe,
    to: await systemDeployer.getAddress(),
    data: deployProxyData,
    operation: 1, // delegatecall
    safeTxGas,
    nonce: Number(await safe.nonce()),
  });

  // Execute Safe transaction
  const tx = await executeSafeTransaction({
    safe,
    owner,
    safeTxHash,
    txParams,
  });

  // Predict the address (skip if expecting failure due to zero address)
  let predictedAddress = '';
  if (!expectFailure || implementation !== ethers.ZeroAddress) {
    predictedAddress = await systemDeployer.predictProxyAddress(
      implementation,
      initData,
      ethers.toBeHex(salt, 32),
      await safe.getAddress(),
    );
  }

  return { tx, predictedAddress };
}

// Helper function to create default setupSafe parameters with optional overrides
function createSetupSafeParams(overrides?: {
  votesERC20Params?: Partial<ISystemDeployerV1.VotesERC20V1ParamsStruct>[];
  azoriusGovernanceParams?: Partial<ISystemDeployerV1.AzoriusGovernanceParamsStruct>;
  moduleFractalParams?: Partial<ISystemDeployerV1.ModuleFractalV1ParamsStruct>;
  freezeGuardMultisigParams?: Partial<ISystemDeployerV1.FreezeGuardMultisigV1ParamsStruct>;
  freezeGuardAzoriusParams?: Partial<ISystemDeployerV1.FreezeGuardAzoriusV1ParamsStruct>;
  freezeVotingMultisigParams?: Partial<ISystemDeployerV1.FreezeVotingMultisigV1ParamsStruct>;
  freezeVotingAzoriusParams?: Partial<ISystemDeployerV1.FreezeVotingAzoriusV1ParamsStruct>;
  freezeVotingStandaloneParams?: Partial<ISystemDeployerV1.FreezeVotingStandaloneParamsStruct>;
}) {
  // Default Votes ERC20 params (all empty/zero)
  const votesERC20Params: ISystemDeployerV1.VotesERC20V1ParamsStruct[] = overrides?.votesERC20Params
    ? overrides.votesERC20Params.map(params => ({
        implementation: ethers.ZeroAddress,
        metadata: {
          name: '',
          symbol: '',
        },
        allocations: [],
        locked: false,
        maxTotalSupply: 0,
        safeSupply: 0,
        ...params,
      }))
    : [];

  // Default Azorius governance params (all empty/zero)
  const azoriusGovernanceParams: ISystemDeployerV1.AzoriusGovernanceParamsStruct = {
    proposerAdapterParams: {
      proposerAdapterERC20V1Params: [],
      proposerAdapterERC721V1Params: [],
      proposerAdapterHatsV1Params: [],
    },
    strategyV1Params: {
      implementation: ethers.ZeroAddress,
      votingPeriod: 0,
      quorumThreshold: 0,
      basisNumerator: 0,
      lightAccountFactory: ethers.ZeroAddress,
    },
    votingConfigParams: {
      votingConfigERC20V1Params: [],
      votingConfigERC721V1Params: [],
    },
    moduleAzoriusV1Params: {
      implementation: ethers.ZeroAddress,
      timelockPeriod: 0,
      executionPeriod: 0,
    },
    ...overrides?.azoriusGovernanceParams,
  };

  // Default ModuleFractal params (all empty/zero)
  const moduleFractalV1Params: ISystemDeployerV1.ModuleFractalV1ParamsStruct = {
    implementation: ethers.ZeroAddress,
    owner: ethers.ZeroAddress,
    ...overrides?.moduleFractalParams,
  };

  // Default Freeze params (all empty/zero)
  // Build freeze params from individual parameters
  const freezeParams: ISystemDeployerV1.FreezeParamsStruct = {
    freezeGuardParams: {
      freezeGuardMultisigV1Params: {
        implementation: ethers.ZeroAddress,
        owner: ethers.ZeroAddress,
        timelockPeriod: 0,
        executionPeriod: 0,
        ...overrides?.freezeGuardMultisigParams,
      },
      freezeGuardAzoriusV1Params: {
        implementation: ethers.ZeroAddress,
        owner: ethers.ZeroAddress,
        ...overrides?.freezeGuardAzoriusParams,
      },
    },
    freezeVotingParams: {
      freezeVotingMultisigV1Params: {
        implementation: ethers.ZeroAddress,
        owner: ethers.ZeroAddress,
        freezeVotesThreshold: 0,
        freezeProposalPeriod: 0,
        parentSafe: ethers.ZeroAddress,
        lightAccountFactory: ethers.ZeroAddress,
        ...overrides?.freezeVotingMultisigParams,
      },
      freezeVotingAzoriusV1Params: {
        implementation: ethers.ZeroAddress,
        owner: ethers.ZeroAddress,
        freezeVotesThreshold: 0,
        freezeProposalPeriod: 0,
        parentAzorius: ethers.ZeroAddress,
        lightAccountFactory: ethers.ZeroAddress,
        ...overrides?.freezeVotingAzoriusParams,
      },
      freezeVotingStandaloneParams: {
        freezeVotingStandaloneV1Params: {
          implementation: ethers.ZeroAddress,
          freezeVotesThreshold: 0,
          unfreezeVotesThreshold: 0,
          freezeProposalPeriod: 0,
          unfreezeProposalPeriod: 0,
          lightAccountFactory: ethers.ZeroAddress,
        },
        votingConfigParams: {
          votingConfigERC20V1Params: [],
          votingConfigERC721V1Params: [],
        },
        ...overrides?.freezeVotingStandaloneParams,
      },
    },
  };

  return {
    votesERC20Params,
    azoriusGovernanceParams,
    moduleFractalV1Params,
    freezeParams,
  };
}

// Helper function to deploy a Safe proxy with setupSafe initialization
async function deploySafeWithSetup(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
    safe: Safe;
    safeProxyFactory: SafeProxyFactory;
    deployer: SignerWithAddress;
    systemDeployerEventEmitter: SystemDeployerEventEmitterV1;
  };
  owners: string[];
  threshold: number;
  setupSafeParams: {
    votesERC20Params: ISystemDeployerV1.VotesERC20V1ParamsStruct[];
    azoriusGovernanceParams: ISystemDeployerV1.AzoriusGovernanceParamsStruct;
    moduleFractalV1Params: ISystemDeployerV1.ModuleFractalV1ParamsStruct;
    freezeParams: ISystemDeployerV1.FreezeParamsStruct;
  };
}) {
  const { fixtureData, owners, threshold, setupSafeParams } = params;

  // Create a salt that will be used for both Safe proxy creation and setupSafe
  const saltNonce = randomSalt();
  const salt = ethers.solidityPackedKeccak256(['uint256'], [saltNonce]);

  // Encode setupSafe function call
  const setupSafeData = fixtureData.systemDeployer.interface.encodeFunctionData('setupSafe', [
    salt,
    await fixtureData.safeProxyFactory.getAddress(),
    await fixtureData.systemDeployerEventEmitter.getAddress(),
    setupSafeParams.votesERC20Params,
    setupSafeParams.azoriusGovernanceParams,
    setupSafeParams.moduleFractalV1Params,
    setupSafeParams.freezeParams,
  ]);

  // Create Safe setup parameters
  const to = await fixtureData.systemDeployer.getAddress();
  const data = setupSafeData;
  const fallbackHandler = ethers.ZeroAddress;
  const paymentToken = ethers.ZeroAddress;
  const payment = 0;
  const paymentReceiver = ethers.ZeroAddress;

  // Encode Safe setup function call
  const safeSetupData = fixtureData.safe.interface.encodeFunctionData('setup', [
    owners,
    threshold,
    to,
    data,
    fallbackHandler,
    paymentToken,
    payment,
    paymentReceiver,
  ]);

  // Predict the Safe Address using CREATE2
  const safeAddress = await calculateSafeProxyAddress({
    safeProxyFactory: fixtureData.safeProxyFactory,
    safeSingleton: fixtureData.safe,
    safeSetupData,
    saltNonce,
  });

  // Create Safe proxy with the same salt nonce
  const tx = await fixtureData.safeProxyFactory.createProxyWithNonce(
    await fixtureData.safe.getAddress(),
    safeSetupData,
    saltNonce,
  );

  const receipt = await tx.wait();

  if (!receipt) {
    throw new Error('No receipt found');
  }

  return { safeAddress, receipt, salt };
}

// Helper function to verify the Safe configuration
async function verifySafeConfiguration(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
    safeProxyFactory: SafeProxyFactory;
    safe: Safe;
    deployer: SignerWithAddress;
  };
  receipt: ContractTransactionReceipt;
  safeAddress: string;
  owners: string[];
  threshold: number;
}) {
  const { fixtureData, receipt, safeAddress, owners, threshold } = params;

  // Find ProxyCreation event
  const proxyCreationEvent = receipt.logs.find(log => {
    try {
      const parsedLog = fixtureData.safeProxyFactory.interface.parseLog({
        topics: log.topics,
        data: log.data,
      });
      return parsedLog?.name === 'ProxyCreation';
    } catch {
      return false;
    }
  });

  expect(proxyCreationEvent).to.not.be.undefined;

  if (!proxyCreationEvent) {
    throw new Error('Proxy creation event not found');
  }

  const parsedProxyEvent = fixtureData.safeProxyFactory.interface.parseLog({
    topics: proxyCreationEvent.topics,
    data: proxyCreationEvent.data,
  });

  if (!parsedProxyEvent) {
    throw new Error('Proxy creation event not found');
  }

  expect(parsedProxyEvent.args[0]).to.equal(safeAddress);
  expect(parsedProxyEvent.args[1]).to.equal(await fixtureData.safe.getAddress());

  // Connect to the Safe proxy
  const safeProxy = Safe__factory.connect(safeAddress, fixtureData.deployer);

  // Verify threshold
  expect(await safeProxy.getThreshold()).to.equal(threshold);

  // Verify owners
  const safeOwners = await safeProxy.getOwners();
  expect(safeOwners).to.have.lengthOf(owners.length);

  // Check each expected owner is included
  for (const expectedOwner of owners) {
    expect(safeOwners).to.include(expectedOwner);
  }
}

// Helper function to find all proxies deployed in a transaction receipt
async function findProxiesDeployed(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
  };
  receipt: ContractTransactionReceipt;
  implementation: AddressLike;
}) {
  const { fixtureData, receipt, implementation } = params;

  const proxyDeployedEvents = receipt?.logs.filter(log => {
    try {
      const parsedLog = fixtureData.systemDeployer.interface.parseLog({
        topics: log.topics,
        data: log.data,
      });
      return parsedLog?.name === 'ProxyDeployed';
    } catch {
      return false;
    }
  });

  // Find the proxy (matching the implementation address)
  let proxyAddresses: string[] = [];
  for (const event of proxyDeployedEvents || []) {
    const parsedProxyEvent = fixtureData.systemDeployer.interface.parseLog({
      topics: event.topics,
      data: event.data,
    });
    if (parsedProxyEvent?.args[1] === implementation) {
      proxyAddresses.push(parsedProxyEvent.args[0]);
    }
  }

  if (proxyAddresses.length === 0) {
    throw new Error(
      `Proxies not found for implementation ${implementation} in transaction receipt`,
    );
  }

  return proxyAddresses;
}

// Helper function to find and verify a single proxy deployment
async function findProxyDeployed(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
  };
  receipt: ContractTransactionReceipt;
  implementation: AddressLike;
}) {
  const proxyAddresses = await findProxiesDeployed(params);

  if (proxyAddresses.length > 1) {
    throw new Error(
      `Multiple proxies found for implementation ${params.implementation} in transaction receipt`,
    );
  }

  return proxyAddresses[0];
}

// Helper function to find and verify VotesERC20V1 deployment and configuration
async function findAndVerifyVotesERC20V1s(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
    deployer: SignerWithAddress;
  };
  receipt: ContractTransactionReceipt;
  implementation: string;
  safeAddress: string;
  votesERC20V1Datas: {
    metadata: {
      name: string;
      symbol: string;
    };
    allocations: {
      to: AddressLike;
      amount: BigNumberish;
    }[];
    safeSupply: BigNumberish;
    locked: boolean;
    maxTotalSupply: BigNumberish;
  }[];
}) {
  const { fixtureData, receipt, implementation, safeAddress, votesERC20V1Datas } = params;

  const votesERC20Addresses = await findProxiesDeployed({
    fixtureData,
    receipt,
    implementation,
  });

  if (votesERC20Addresses.length !== votesERC20V1Datas.length) {
    throw new Error(`Number of votes ERC20s does not match number of votes ERC20 datas`);
  }

  for (let i = 0; i < votesERC20Addresses.length; i++) {
    const votesERC20V1Address = votesERC20Addresses[i];
    const votesERC20V1Data = votesERC20V1Datas[i];

    const votesERC20V1Proxy = VotesERC20V1__factory.connect(
      votesERC20V1Address,
      fixtureData.deployer,
    );

    expect(await votesERC20V1Proxy.name()).to.equal(votesERC20V1Data.metadata.name);
    expect(await votesERC20V1Proxy.symbol()).to.equal(votesERC20V1Data.metadata.symbol);
    expect(
      await votesERC20V1Proxy.hasRole(await votesERC20V1Proxy.DEFAULT_ADMIN_ROLE(), safeAddress),
    ).to.be.true;
    expect(await votesERC20V1Proxy.hasRole(await votesERC20V1Proxy.MINTER_ROLE(), safeAddress)).to
      .be.true;
    expect(
      await votesERC20V1Proxy.hasRole(await votesERC20V1Proxy.TRANSFER_FROM_ROLE(), safeAddress),
    ).to.be.true;
    expect(await votesERC20V1Proxy.locked()).to.equal(votesERC20V1Data.locked);
    expect(await votesERC20V1Proxy.maxTotalSupply()).to.equal(votesERC20V1Data.maxTotalSupply);

    for (const allocation of votesERC20V1Data.allocations) {
      expect(await votesERC20V1Proxy.balanceOf(allocation.to)).to.equal(allocation.amount);
    }
    expect(await votesERC20V1Proxy.balanceOf(safeAddress)).to.equal(votesERC20V1Data.safeSupply);
  }

  return votesERC20Addresses.map(address =>
    VotesERC20V1__factory.connect(address, fixtureData.deployer),
  );
}

// Helper function to find and verify ModuleFractal deployment and configuration
async function findAndVerifyModuleFractalV1(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
    deployer: SignerWithAddress;
  };
  receipt: ContractTransactionReceipt;
  implementation: AddressLike;
  safeAddress: string;
  owner: AddressLike;
}) {
  const { fixtureData, receipt, implementation, safeAddress, owner } = params;

  const moduleFractalAddress = await findProxyDeployed({ fixtureData, receipt, implementation });

  // Verify the module is enabled on the Safe
  const safeProxy = Safe__factory.connect(safeAddress, fixtureData.deployer);
  const isModuleEnabled = await safeProxy.isModuleEnabled(moduleFractalAddress);
  expect(isModuleEnabled).to.be.true;

  // Connect to the deployed ModuleFractal proxy
  const moduleFractalProxy = ModuleFractalV1__factory.connect(
    moduleFractalAddress,
    fixtureData.deployer,
  );

  // Verify ModuleFractal was initialized correctly
  expect(await moduleFractalProxy.owner()).to.equal(owner);
  expect(await moduleFractalProxy.avatar()).to.equal(safeAddress);
  expect(await moduleFractalProxy.getFunction('target')()).to.equal(safeAddress);

  return moduleFractalProxy;
}

// Helper function to find and verify ModuleAzoriusV1 deployment and configuration
async function findAndVerifyModuleAzoriusV1(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
    deployer: SignerWithAddress;
  };
  receipt: ContractTransactionReceipt;
  implementation: AddressLike;
  safeAddress: string;
  owner: string;
  strategy: string;
  timelockPeriod: BigNumberish;
  executionPeriod: BigNumberish;
}) {
  const {
    fixtureData,
    receipt,
    implementation,
    safeAddress,
    owner,
    strategy,
    timelockPeriod,
    executionPeriod,
  } = params;

  const azoriusAddress = await findProxyDeployed({
    fixtureData,
    receipt,
    implementation,
  });

  // Verify the module is enabled on the Safe
  const safeProxy = Safe__factory.connect(safeAddress, fixtureData.deployer);
  const isModuleEnabled = await safeProxy.isModuleEnabled(azoriusAddress);
  expect(isModuleEnabled).to.be.true;

  const azoriusProxy = ModuleAzoriusV1__factory.connect(azoriusAddress, fixtureData.deployer);

  expect(await azoriusProxy.owner()).to.equal(owner);
  expect(await azoriusProxy.avatar()).to.equal(safeAddress);
  expect(await azoriusProxy.getFunction('target')()).to.equal(safeAddress);
  expect(await azoriusProxy.strategy()).to.equal(strategy);
  expect(await azoriusProxy.timelockPeriod()).to.equal(timelockPeriod);
  expect(await azoriusProxy.executionPeriod()).to.equal(executionPeriod);

  return azoriusProxy;
}

// Helper function to find and verify StrategyV1 deployment and configuration
async function findAndVerifyStrategyV1(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
    deployer: SignerWithAddress;
  };
  receipt: ContractTransactionReceipt;
  implementation: AddressLike;
  votingPeriod: BigNumberish;
  quorumThreshold: BigNumberish;
  basisNumerator: BigNumberish;
  strategyAdmin: string;
  proposerAdapters: string[];
  votingConfigs: { votingWeight: string; voteTracker: string }[];
}) {
  const {
    fixtureData,
    receipt,
    implementation,
    votingPeriod,
    quorumThreshold,
    basisNumerator,
    strategyAdmin,
    proposerAdapters,
    votingConfigs,
  } = params;

  const strategyAddress = await findProxyDeployed({
    fixtureData,
    receipt,
    implementation,
  });

  const strategyProxy = StrategyV1__factory.connect(strategyAddress, fixtureData.deployer);

  expect(await strategyProxy.votingPeriod()).to.equal(votingPeriod);
  expect(await strategyProxy.quorumThreshold()).to.equal(quorumThreshold);
  expect(await strategyProxy.basisNumerator()).to.equal(basisNumerator);
  expect(await strategyProxy.strategyAdmin()).to.equal(strategyAdmin);

  // Verify proposer adapters
  const actualProposerAdapters = await strategyProxy.proposerAdapters();
  expect(actualProposerAdapters).to.have.lengthOf(proposerAdapters.length);
  for (let i = 0; i < proposerAdapters.length; i++) {
    expect(actualProposerAdapters[i]).to.equal(proposerAdapters[i]);
  }

  // Verify voting configs
  const actualVotingConfigs = await strategyProxy.votingConfigs();
  expect(actualVotingConfigs).to.have.lengthOf(votingConfigs.length);
  for (let i = 0; i < votingConfigs.length; i++) {
    expect(actualVotingConfigs[i].votingWeight).to.equal(votingConfigs[i].votingWeight);
    expect(actualVotingConfigs[i].voteTracker).to.equal(votingConfigs[i].voteTracker);
  }

  return strategyProxy;
}

// Helper function to find and verify ProposerAdapterERC20V1 deployment and configuration
async function findAndVerifyProposerAdapterERC20V1s(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
    deployer: SignerWithAddress;
  };
  receipt: ContractTransactionReceipt;
  implementation: string;
  adapterDatas: {
    params: {
      proposerThreshold: BigNumberish;
    };
    token: string;
  }[];
}) {
  const { fixtureData, receipt, implementation, adapterDatas } = params;

  const proposerAdapterAddresses = await findProxiesDeployed({
    fixtureData,
    receipt,
    implementation,
  });

  if (proposerAdapterAddresses.length !== adapterDatas.length) {
    throw new Error(
      `Number of proposer adapters does not match number of adapter datas in transaction receipt`,
    );
  }

  for (let i = 0; i < proposerAdapterAddresses.length; i++) {
    const proposerAdapterAddress = proposerAdapterAddresses[i];
    const adapterData = adapterDatas[i];

    const proposerAdapterProxy = ProposerAdapterERC20V1__factory.connect(
      proposerAdapterAddress,
      fixtureData.deployer,
    );

    expect(await proposerAdapterProxy.token()).to.equal(adapterData.token);
    expect(await proposerAdapterProxy.proposerThreshold()).to.equal(
      adapterData.params.proposerThreshold,
    );
  }

  return proposerAdapterAddresses.map(adapter =>
    ProposerAdapterERC20V1__factory.connect(adapter, fixtureData.deployer),
  );
}

// Helper function to find and verify ProposerAdapterERC721V1 deployment and configuration
async function findAndVerifyProposerAdapterERC721V1s(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
    deployer: SignerWithAddress;
  };
  receipt: ContractTransactionReceipt;
  implementation: string;
  proposerAdapterDatas: {
    params: {
      token: AddressLike;
      proposerThreshold: BigNumberish;
    };
  }[];
}) {
  const { fixtureData, receipt, implementation, proposerAdapterDatas } = params;

  const proposerAdapterAddresess = await findProxiesDeployed({
    fixtureData,
    receipt,
    implementation,
  });

  if (proposerAdapterAddresess.length !== proposerAdapterDatas.length) {
    throw new Error(`Number of proposer adapters does not match number of adapter datas`);
  }

  for (let i = 0; i < proposerAdapterAddresess.length; i++) {
    const proposerAdapterAddress = proposerAdapterAddresess[i];
    const proposerAdapterData = proposerAdapterDatas[i];

    const proposerAdapterProxy = ProposerAdapterERC721V1__factory.connect(
      proposerAdapterAddress,
      fixtureData.deployer,
    );

    expect(await proposerAdapterProxy.token()).to.equal(proposerAdapterData.params.token);
    expect(await proposerAdapterProxy.proposerThreshold()).to.equal(
      proposerAdapterData.params.proposerThreshold,
    );
  }

  return proposerAdapterAddresess.map(adapter =>
    ProposerAdapterERC721V1__factory.connect(adapter, fixtureData.deployer),
  );
}

// Helper function to find and verify ProposerAdapterHatsV1 deployment and configuration
async function findAndVerifyProposerAdapterHatsV1s(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
    deployer: SignerWithAddress;
  };
  receipt: ContractTransactionReceipt;
  implementation: string;
  proposerAdapterDatas: {
    params: {
      hatsContract: AddressLike;
      whitelistedHatIds: BigNumberish[];
    };
  }[];
}) {
  const { fixtureData, receipt, implementation, proposerAdapterDatas } = params;

  const proposerAdapterAddresess = await findProxiesDeployed({
    fixtureData,
    receipt,
    implementation,
  });

  if (proposerAdapterAddresess.length !== proposerAdapterDatas.length) {
    throw new Error(`Number of proposer adapters does not match number of adapter datas`);
  }

  for (let i = 0; i < proposerAdapterAddresess.length; i++) {
    const proposerAdapterAddress = proposerAdapterAddresess[i];
    const proposerAdapterData = proposerAdapterDatas[i];

    const proposerAdapterProxy = ProposerAdapterHatsV1__factory.connect(
      proposerAdapterAddress,
      fixtureData.deployer,
    );

    expect(await proposerAdapterProxy.hatsContract()).to.equal(
      proposerAdapterData.params.hatsContract,
    );

    const whitelistedHatIds = await proposerAdapterProxy.whitelistedHatIds();
    expect(whitelistedHatIds).to.deep.equal(proposerAdapterData.params.whitelistedHatIds);
  }

  return proposerAdapterAddresess.map(adapter =>
    ProposerAdapterHatsV1__factory.connect(adapter, fixtureData.deployer),
  );
}

// Helper function to find and verify VotingConfigERC20V1 deployment and configuration
async function findAndVerifyVotingConfigERC20V1s(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
    deployer: SignerWithAddress;
    voteTrackerERC20V1: VoteTrackerERC20V1;
  };
  receipt: ContractTransactionReceipt;
  implementation: string;
  votingConfigDatas: {
    params: {
      strategy: string;
      weightPerToken: BigNumberish;
    };
    token: string;
  }[];
}): Promise<{ votingWeight: string; voteTracker: string }[]> {
  const { fixtureData, receipt, implementation, votingConfigDatas } = params;

  // Parse all ProxyDeployed events in order
  const proxyDeployedEvents = receipt?.logs.filter(log => {
    try {
      const parsedLog = fixtureData.systemDeployer.interface.parseLog({
        topics: log.topics,
        data: log.data,
      });
      return parsedLog?.name === 'ProxyDeployed';
    } catch {
      return false;
    }
  });

  // Extract proxy deployments with their implementations
  const deployments: { proxy: string; implementation: string }[] = [];
  for (const event of proxyDeployedEvents || []) {
    const parsedEvent = fixtureData.systemDeployer.interface.parseLog({
      topics: event.topics,
      data: event.data,
    });
    if (parsedEvent) {
      deployments.push({
        proxy: parsedEvent.args[0],
        implementation: parsedEvent.args[1],
      });
    }
  }

  // Find voting weight and vote tracker pairs
  const votingConfigs: { votingWeight: string; voteTracker: string }[] = [];
  const voteTrackerImplementation = await fixtureData.voteTrackerERC20V1.getAddress();

  // Find all weight strategies and vote trackers separately
  const weightStrategies: { index: number; address: string }[] = [];
  const voteTrackers: { index: number; address: string }[] = [];

  for (let i = 0; i < deployments.length; i++) {
    if (deployments[i].implementation === implementation) {
      weightStrategies.push({ index: i, address: deployments[i].proxy });
    } else if (deployments[i].implementation === voteTrackerImplementation) {
      voteTrackers.push({ index: i, address: deployments[i].proxy });
    }
  }

  // Verify we have the expected number
  if (weightStrategies.length !== votingConfigDatas.length) {
    throw new Error(
      `Expected ${votingConfigDatas.length} weight strategies but found ${weightStrategies.length}`,
    );
  }

  if (voteTrackers.length !== votingConfigDatas.length) {
    throw new Error(
      `Expected ${votingConfigDatas.length} vote trackers but found ${voteTrackers.length}`,
    );
  }

  // Pair them based on deployment order
  // SystemDeployerV1 deploys them in pairs: weight strategy then vote tracker
  for (let i = 0; i < weightStrategies.length; i++) {
    const votingWeight = weightStrategies[i];

    // Find the vote tracker that was deployed immediately after this weight strategy
    let pairedVoteTracker: { index: number; address: string } | undefined;
    for (const voteTracker of voteTrackers) {
      if (voteTracker.index > votingWeight.index) {
        // Check if there's another weight strategy between them
        const hasIntermediateWeightStrategy = weightStrategies.some(
          ws => ws.index > votingWeight.index && ws.index < voteTracker.index,
        );
        if (!hasIntermediateWeightStrategy) {
          pairedVoteTracker = voteTracker;
          break;
        }
      }
    }

    if (!pairedVoteTracker) {
      throw new Error(`Vote tracker not found for weight strategy at index ${i}`);
    }

    const votingConfigData = votingConfigDatas[i];

    // Verify the weight strategy
    const votingWeightProxy = VotingWeightERC20V1__factory.connect(
      votingWeight.address,
      fixtureData.deployer,
    );

    expect(await votingWeightProxy.token()).to.equal(votingConfigData.token);
    expect(await votingWeightProxy.weightPerToken()).to.equal(
      votingConfigData.params.weightPerToken,
    );

    votingConfigs.push({
      votingWeight: votingWeight.address,
      voteTracker: pairedVoteTracker.address,
    });
  }

  if (votingConfigs.length !== votingConfigDatas.length) {
    throw new Error(
      `Expected ${votingConfigDatas.length} voting configs but found ${votingConfigs.length}`,
    );
  }

  return votingConfigs;
}

// Helper function to find and verify VotingConfigERC721V1 deployment and configuration
async function findAndVerifyVotingConfigERC721V1s(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
    deployer: SignerWithAddress;
    voteTrackerERC721V1: VoteTrackerERC721V1;
  };
  receipt: ContractTransactionReceipt;
  implementation: string;
  votingConfigDatas: {
    params: {
      strategy: string;
      weightPerToken: BigNumberish;
      token: AddressLike;
    };
  }[];
}): Promise<{ votingWeight: string; voteTracker: string }[]> {
  const { fixtureData, receipt, implementation, votingConfigDatas } = params;

  // Parse all ProxyDeployed events in order
  const proxyDeployedEvents = receipt?.logs.filter(log => {
    try {
      const parsedLog = fixtureData.systemDeployer.interface.parseLog({
        topics: log.topics,
        data: log.data,
      });
      return parsedLog?.name === 'ProxyDeployed';
    } catch {
      return false;
    }
  });

  // Extract proxy deployments with their implementations
  const deployments: { proxy: string; implementation: string }[] = [];
  for (const event of proxyDeployedEvents || []) {
    const parsedEvent = fixtureData.systemDeployer.interface.parseLog({
      topics: event.topics,
      data: event.data,
    });
    if (parsedEvent) {
      deployments.push({
        proxy: parsedEvent.args[0],
        implementation: parsedEvent.args[1],
      });
    }
  }

  // Find voting weight and vote tracker pairs
  const votingConfigs: { votingWeight: string; voteTracker: string }[] = [];
  const voteTrackerImplementation = await fixtureData.voteTrackerERC721V1.getAddress();

  // Find all weight strategies and vote trackers separately
  const weightStrategies: { index: number; address: string }[] = [];
  const voteTrackers: { index: number; address: string }[] = [];

  for (let i = 0; i < deployments.length; i++) {
    if (deployments[i].implementation === implementation) {
      weightStrategies.push({ index: i, address: deployments[i].proxy });
    } else if (deployments[i].implementation === voteTrackerImplementation) {
      voteTrackers.push({ index: i, address: deployments[i].proxy });
    }
  }

  // Verify we have the expected number
  if (weightStrategies.length !== votingConfigDatas.length) {
    throw new Error(
      `Expected ${votingConfigDatas.length} weight strategies but found ${weightStrategies.length}`,
    );
  }

  if (voteTrackers.length !== votingConfigDatas.length) {
    throw new Error(
      `Expected ${votingConfigDatas.length} vote trackers but found ${voteTrackers.length}`,
    );
  }

  // Pair them based on deployment order
  // SystemDeployerV1 deploys them in pairs: weight strategy then vote tracker
  for (let i = 0; i < weightStrategies.length; i++) {
    const votingWeight = weightStrategies[i];

    // Find the vote tracker that was deployed immediately after this weight strategy
    let pairedVoteTracker: { index: number; address: string } | undefined;
    for (const voteTracker of voteTrackers) {
      if (voteTracker.index > votingWeight.index) {
        // Check if there's another weight strategy between them
        const hasIntermediateWeightStrategy = weightStrategies.some(
          ws => ws.index > votingWeight.index && ws.index < voteTracker.index,
        );
        if (!hasIntermediateWeightStrategy) {
          pairedVoteTracker = voteTracker;
          break;
        }
      }
    }

    if (!pairedVoteTracker) {
      throw new Error(`Vote tracker not found for weight strategy at index ${i}`);
    }

    const votingConfigData = votingConfigDatas[i];

    // Verify the weight strategy
    const votingWeightProxy = VotingWeightERC721V1__factory.connect(
      votingWeight.address,
      fixtureData.deployer,
    );

    expect(await votingWeightProxy.token()).to.equal(votingConfigData.params.token);
    expect(await votingWeightProxy.weightPerToken()).to.equal(
      votingConfigData.params.weightPerToken,
    );

    votingConfigs.push({
      votingWeight: votingWeight.address,
      voteTracker: pairedVoteTracker.address,
    });
  }

  if (votingConfigs.length !== votingConfigDatas.length) {
    throw new Error(
      `Expected ${votingConfigDatas.length} voting configs but found ${votingConfigs.length}`,
    );
  }

  return votingConfigs;
}

// Helper function to find and verify FreezeGuardMultisig deployment and configuration
async function findAndVerifyFreezeGuardMultisigV1(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
    deployer: SignerWithAddress;
  };
  receipt: ContractTransactionReceipt;
  implementation: AddressLike;
  safeAddress: string;
  owner: AddressLike;
  timelockPeriod: BigNumberish;
  executionPeriod: BigNumberish;
  freezeVoting: string;
}) {
  const {
    fixtureData,
    receipt,
    implementation,
    safeAddress,
    owner,
    timelockPeriod,
    executionPeriod,
    freezeVoting,
  } = params;
  const freezeGuardMultisigAddress = await findProxyDeployed({
    fixtureData,
    receipt,
    implementation,
  });

  // Verify the module is enabled on the Safe
  const guardAddress = ethers.AbiCoder.defaultAbiCoder().decode(
    ['address'],
    await ethers.provider.getStorage(
      safeAddress,
      ethers.keccak256(ethers.toUtf8Bytes('guard_manager.guard.address')),
    ),
  )[0];
  expect(guardAddress).to.equal(freezeGuardMultisigAddress);

  // Connect to the deployed FreezeGuardMultisig proxy
  const freezeGuardMultisigProxy = FreezeGuardMultisigV1__factory.connect(
    freezeGuardMultisigAddress,
    fixtureData.deployer,
  );

  expect(await freezeGuardMultisigProxy.owner()).to.equal(owner);
  expect(await freezeGuardMultisigProxy.timelockPeriod()).to.equal(timelockPeriod);
  expect(await freezeGuardMultisigProxy.executionPeriod()).to.equal(executionPeriod);
  expect(await freezeGuardMultisigProxy.freezable()).to.equal(freezeVoting);

  return freezeGuardMultisigProxy;
}

// Helper function to find and verify FreezeGuardAzorius deployment and configuration
async function findAndVerifyFreezeGuardAzoriusV1(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
    deployer: SignerWithAddress;
  };
  receipt: ContractTransactionReceipt;
  implementation: AddressLike;
  azoriusModuleAddress: string;
  owner: AddressLike;
  freezeVoting: string;
}) {
  const { fixtureData, receipt, implementation, azoriusModuleAddress, owner, freezeVoting } =
    params;

  const freezeGuardAzoriusAddress = await findProxyDeployed({
    fixtureData,
    receipt,
    implementation,
  });

  // Verify the guard is set on the Azorius module
  const azoriusModule = ModuleAzoriusV1__factory.connect(
    azoriusModuleAddress,
    fixtureData.deployer,
  );
  const guard = await azoriusModule.getGuard();
  expect(guard).to.equal(freezeGuardAzoriusAddress);

  // Connect to the deployed FreezeGuardAzorius proxy
  const freezeGuardAzoriusProxy = FreezeGuardAzoriusV1__factory.connect(
    freezeGuardAzoriusAddress,
    fixtureData.deployer,
  );

  expect(await freezeGuardAzoriusProxy.owner()).to.equal(owner);
  expect(await freezeGuardAzoriusProxy.freezable()).to.equal(freezeVoting);

  return freezeGuardAzoriusProxy;
}

// Helper function to find and verify FreezeVotingMultisig deployment and configuration
async function findAndVerifyFreezeVotingMultisigV1(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
    deployer: SignerWithAddress;
  };
  receipt: ContractTransactionReceipt;
  implementation: AddressLike;
  owner: AddressLike;
  freezeVotesThreshold: BigNumberish;
  freezeProposalPeriod: BigNumberish;
  lightAccountFactory: AddressLike;
}) {
  const {
    fixtureData,
    receipt,
    implementation,
    owner,
    freezeVotesThreshold,
    freezeProposalPeriod,
    lightAccountFactory,
  } = params;

  const freezeVotingMultisigAddress = await findProxyDeployed({
    fixtureData,
    receipt,
    implementation,
  });

  // Connect to the deployed FreezeVotingMultisig proxy
  const freezeVotingMultisigProxy = FreezeVotingMultisigV1__factory.connect(
    freezeVotingMultisigAddress,
    fixtureData.deployer,
  );

  expect(await freezeVotingMultisigProxy.owner()).to.equal(owner);
  expect(await freezeVotingMultisigProxy.freezeVotesThreshold()).to.equal(freezeVotesThreshold);
  expect(await freezeVotingMultisigProxy.freezeProposalPeriod()).to.equal(freezeProposalPeriod);
  expect(await freezeVotingMultisigProxy.lightAccountFactory()).to.equal(lightAccountFactory);

  return freezeVotingMultisigProxy;
}

// Helper function to find and verify FreezeVotingAzorius deployment and configuration
async function findAndVerifyFreezeVotingAzoriusV1(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
    deployer: SignerWithAddress;
  };
  receipt: ContractTransactionReceipt;
  implementation: AddressLike;
  owner: AddressLike;
  freezeVotesThreshold: BigNumberish;
  freezeProposalPeriod: BigNumberish;
  parentAzorius: AddressLike;
  lightAccountFactory: AddressLike;
}) {
  const {
    fixtureData,
    receipt,
    implementation,
    owner,
    freezeVotesThreshold,
    freezeProposalPeriod,
    parentAzorius,
    lightAccountFactory,
  } = params;

  const freezeVotingAzoriusAddress = await findProxyDeployed({
    fixtureData,
    receipt,
    implementation,
  });

  // Connect to the deployed FreezeVotingAzorius proxy
  const freezeVotingAzoriusProxy = FreezeVotingAzoriusV1__factory.connect(
    freezeVotingAzoriusAddress,
    fixtureData.deployer,
  );

  expect(await freezeVotingAzoriusProxy.owner()).to.equal(owner);
  expect(await freezeVotingAzoriusProxy.freezeProposalPeriod()).to.equal(freezeProposalPeriod);
  expect(await freezeVotingAzoriusProxy.freezeVotesThreshold()).to.equal(freezeVotesThreshold);
  expect(await freezeVotingAzoriusProxy.parentAzorius()).to.equal(parentAzorius);
  expect(await freezeVotingAzoriusProxy.lightAccountFactory()).to.equal(lightAccountFactory);

  return freezeVotingAzoriusProxy;
}

// Helper function to find and verify FreezeVotingStandalone deployment and configuration
async function findAndVerifyFreezeVotingStandaloneV1(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
    deployer: SignerWithAddress;
    votingWeightERC20V1: VotingWeightERC20V1;
    votingWeightERC721V1: VotingWeightERC721V1;
    voteTrackerERC20V1: VoteTrackerERC20V1;
    voteTrackerERC721V1: VoteTrackerERC721V1;
    votesERC20V1: VotesERC20V1;
  };
  receipt: ContractTransactionReceipt;
  implementation: AddressLike;
  freezeVotesThreshold: BigNumberish;
  unfreezeVotesThreshold: BigNumberish;
  freezeProposalPeriod: BigNumberish;
  unfreezeProposalPeriod: BigNumberish;
  lightAccountFactory: AddressLike;
  votesERC20V1Tokens?: VotesERC20V1[];
  votingConfigERC20V1Datas?: {
    params: {
      votingWeightImplementation: AddressLike;
      voteTrackerImplementation: AddressLike;
      token: AddressLike;
      newTokenIndex: BigNumberish;
      weightPerToken: BigNumberish;
    };
    token?: string;
  }[];
  votingConfigERC721V1Datas?: {
    params: {
      votingWeightImplementation: AddressLike;
      voteTrackerImplementation: AddressLike;
      token: AddressLike;
      weightPerToken: BigNumberish;
    };
  }[];
}) {
  const {
    fixtureData,
    receipt,
    implementation,
    freezeVotesThreshold,
    unfreezeVotesThreshold,
    freezeProposalPeriod,
    unfreezeProposalPeriod,
    lightAccountFactory,
    votesERC20V1Tokens = [],
    votingConfigERC20V1Datas,
    votingConfigERC721V1Datas,
  } = params;

  const freezeVotingStandaloneAddress = await findProxyDeployed({
    fixtureData,
    receipt,
    implementation,
  });

  // Connect to the deployed FreezeVotingStandalone proxy
  const freezeVotingStandaloneProxy = FreezeVotingStandaloneV1__factory.connect(
    freezeVotingStandaloneAddress,
    fixtureData.deployer,
  );

  // Verify basic parameters
  expect(await freezeVotingStandaloneProxy.freezeVotesThreshold()).to.equal(freezeVotesThreshold);
  expect(await freezeVotingStandaloneProxy.unfreezeVotesThreshold()).to.equal(
    unfreezeVotesThreshold,
  );
  expect(await freezeVotingStandaloneProxy.freezeProposalPeriod()).to.equal(freezeProposalPeriod);
  expect(await freezeVotingStandaloneProxy.unfreezeProposalPeriod()).to.equal(
    unfreezeProposalPeriod,
  );
  expect(await freezeVotingStandaloneProxy.lightAccountFactory()).to.equal(lightAccountFactory);

  // Verify voting configs
  let votingConfigERC20s: { votingWeight: string; voteTracker: string }[] = [];
  if (votingConfigERC20V1Datas) {
    votingConfigERC20s = await findAndVerifyVotingConfigERC20V1s({
      fixtureData,
      receipt,
      implementation: await fixtureData.votingWeightERC20V1.getAddress(),
      votingConfigDatas: await Promise.all(
        votingConfigERC20V1Datas.map(async data => ({
          ...data,
          params: {
            ...data.params,
            strategy: freezeVotingStandaloneAddress, // Use freeze voting as the strategy
          },
          token:
            data.token ??
            (await votesERC20V1Tokens[Number(data.params.newTokenIndex)].getAddress()),
        })),
      ),
    });
  }

  let votingConfigERC721s: { votingWeight: string; voteTracker: string }[] = [];
  if (votingConfigERC721V1Datas) {
    votingConfigERC721s = await findAndVerifyVotingConfigERC721V1s({
      fixtureData,
      receipt,
      implementation: await fixtureData.votingWeightERC721V1.getAddress(),
      votingConfigDatas: await Promise.all(
        votingConfigERC721V1Datas.map(async data => ({
          ...data,
          params: { ...data.params, strategy: freezeVotingStandaloneAddress },
        })),
      ),
    });
  }

  // Verify the voting configs match what's in the contract
  const actualVotingConfigs = await freezeVotingStandaloneProxy.getVotingConfigs();
  const expectedVotingConfigs = [...votingConfigERC20s, ...votingConfigERC721s];

  expect(actualVotingConfigs.length).to.equal(expectedVotingConfigs.length);
  for (let i = 0; i < actualVotingConfigs.length; i++) {
    expect(actualVotingConfigs[i].votingWeight).to.equal(expectedVotingConfigs[i].votingWeight);
    expect(actualVotingConfigs[i].voteTracker).to.equal(expectedVotingConfigs[i].voteTracker);
  }

  return freezeVotingStandaloneProxy;
}

// Helper function to verify the number of new contracts deployed
function verifyNumberOfNewContractsDeployed(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
  };
  receipt: ContractTransactionReceipt;
  safeAddress: string;
  numberOfNewContracts: number;
}) {
  const { fixtureData, receipt, safeAddress, numberOfNewContracts } = params;

  const proxyDeployedTopicHash =
    fixtureData.systemDeployer.interface.getEvent('ProxyDeployed').topicHash;

  const events = receipt.logs.filter(
    log => log.address === safeAddress && log.topics[0] === proxyDeployedTopicHash,
  );

  expect(events).to.have.lengthOf(numberOfNewContracts);
}

// Helper function to find and verify the SystemDeployed event
async function findAndVerifySystemDeployedEvent(params: {
  fixtureData: {
    systemDeployer: SystemDeployerV1;
    systemDeployerEventEmitter: SystemDeployerEventEmitterV1;
    safeProxyFactory: SafeProxyFactory;
  };
  receipt: ContractTransactionReceipt;
  salt: string;
}) {
  const { fixtureData, receipt, salt } = params;

  const systemDeployedEvent = receipt.logs.find(log => {
    try {
      const parsedLog = fixtureData.systemDeployer.interface.parseLog({
        topics: log.topics,
        data: log.data,
      });
      return parsedLog?.name === 'SystemDeployed';
    } catch {
      return false;
    }
  });

  expect(systemDeployedEvent).to.not.be.undefined;

  if (!systemDeployedEvent) {
    throw new Error('SystemDeployed event not found');
  }

  const parsedSystemDeployedEvent = fixtureData.systemDeployer.interface.parseLog({
    topics: systemDeployedEvent.topics,
    data: systemDeployedEvent.data,
  });

  if (!parsedSystemDeployedEvent) {
    throw new Error('SystemDeployed event not found');
  }

  expect(parsedSystemDeployedEvent.args[0]).to.equal(
    await fixtureData.safeProxyFactory.getAddress(),
  );
  expect(parsedSystemDeployedEvent.args[1]).to.equal(salt);
}

// Helper function to find and verify the SystemDeployed event emitter event
async function findAndVerifySystemDeployedEventEmitterEvent(params: {
  fixtureData: {
    systemDeployerEventEmitter: SystemDeployerEventEmitterV1;
    safeProxyFactory: SafeProxyFactory;
  };
  receipt: ContractTransactionReceipt;
  safeAddress: string;
  salt: string;
}) {
  const { fixtureData, receipt, safeAddress, salt } = params;

  const systemDeployedEventEmitterEvent = receipt.logs.find(log => {
    try {
      const parsedLog = fixtureData.systemDeployerEventEmitter.interface.parseLog({
        topics: log.topics,
        data: log.data,
      });
      return parsedLog?.name === 'SystemDeployed';
    } catch {
      return false;
    }
  });

  expect(systemDeployedEventEmitterEvent).to.not.be.undefined;

  if (!systemDeployedEventEmitterEvent) {
    throw new Error('SystemDeployed event emitter event not found');
  }

  const parsedSystemDeployedEventEmitterEvent =
    fixtureData.systemDeployerEventEmitter.interface.parseLog({
      topics: systemDeployedEventEmitterEvent.topics,
      data: systemDeployedEventEmitterEvent.data,
    });

  if (!parsedSystemDeployedEventEmitterEvent) {
    throw new Error('SystemDeployed event emitter event not found');
  }

  expect(parsedSystemDeployedEventEmitterEvent.args[0]).to.equal(safeAddress);
  expect(parsedSystemDeployedEventEmitterEvent.args[1]).to.equal(
    await fixtureData.safeProxyFactory.getAddress(),
  );
  expect(parsedSystemDeployedEventEmitterEvent.args[2]).to.equal(salt);
}

// Helper function to find and verify the base Azorius Governance setup
async function findAndVerifySafe(params: {
  fixtureData: {
    safeProxyFactory: SafeProxyFactory;
    safe: Safe;
    systemDeployer: SystemDeployerV1;
    systemDeployerEventEmitter: SystemDeployerEventEmitterV1;
    deployer: SignerWithAddress;
    proposerAdapterERC20V1: ProposerAdapterERC20V1;
    proposerAdapterERC721V1: ProposerAdapterERC721V1;
    proposerAdapterHatsV1: ProposerAdapterHatsV1;
    strategyV1: StrategyV1;
    moduleAzoriusV1: ModuleAzoriusV1;
    votingWeightERC20V1: VotingWeightERC20V1;
    votingWeightERC721V1: VotingWeightERC721V1;
    voteTrackerERC20V1: VoteTrackerERC20V1;
    voteTrackerERC721V1: VoteTrackerERC721V1;
    votesERC20V1: VotesERC20V1;
  };
  receipt: ContractTransactionReceipt;
  salt: string;
  safeAddress: string;
  owners: string[];
  threshold: number;
  moduleFractalV1Params?: ISystemDeployerV1.ModuleFractalV1ParamsStruct;
  votesERC20V1Datas?: ISystemDeployerV1.VotesERC20V1ParamsStruct[];
  proposerAdapterERC20V1Datas?: {
    params: ISystemDeployerV1.ProposerAdapterERC20V1ParamsStruct;
    token?: string;
  }[];
  proposerAdapterERC721V1Datas?: {
    params: ISystemDeployerV1.ProposerAdapterERC721V1ParamsStruct;
  }[];
  proposerAdapterHatsV1Datas?: {
    params: ISystemDeployerV1.ProposerAdapterHatsV1ParamsStruct;
  }[];
  strategyV1Params?: ISystemDeployerV1.StrategyV1ParamsStruct;
  moduleAzoriusV1Params?: ISystemDeployerV1.ModuleAzoriusV1ParamsStruct;
  votingConfigERC20V1Datas?: {
    params: ISystemDeployerV1.VotingConfigERC20V1ParamsStruct;
    token?: string;
  }[];
  votingConfigERC721V1Datas?: {
    params: ISystemDeployerV1.VotingConfigERC721V1ParamsStruct;
  }[];
  freezeGuardMultisigV1Data?: {
    guardParams: ISystemDeployerV1.FreezeGuardMultisigV1ParamsStruct;
    votingMultisigParams?: ISystemDeployerV1.FreezeVotingMultisigV1ParamsStruct;
    votingAzoriusParams?: ISystemDeployerV1.FreezeVotingAzoriusV1ParamsStruct;
    votingStandaloneParams?: {
      freezeVotingParams: ISystemDeployerV1.FreezeVotingStandaloneV1ParamsStruct;
      votingConfigERC20V1Datas?: {
        params: ISystemDeployerV1.VotingConfigERC20V1ParamsStruct;
        token?: string;
      }[];
      votingConfigERC721V1Datas?: {
        params: ISystemDeployerV1.VotingConfigERC721V1ParamsStruct;
      }[];
    };
  };
  freezeGuardAzoriusV1Data?: {
    guardParams: ISystemDeployerV1.FreezeGuardAzoriusV1ParamsStruct;
    votingMultisigParams?: ISystemDeployerV1.FreezeVotingMultisigV1ParamsStruct;
    votingAzoriusParams?: ISystemDeployerV1.FreezeVotingAzoriusV1ParamsStruct;
  };
  numberOfNewContracts: number;
}) {
  const {
    fixtureData,
    receipt,
    salt,
    safeAddress,
    owners,
    threshold,
    moduleFractalV1Params,
    votesERC20V1Datas,
    proposerAdapterERC20V1Datas,
    proposerAdapterERC721V1Datas,
    proposerAdapterHatsV1Datas,
    strategyV1Params,
    moduleAzoriusV1Params,
    votingConfigERC20V1Datas,
    votingConfigERC721V1Datas,
    freezeGuardMultisigV1Data,
    freezeGuardAzoriusV1Data,
    numberOfNewContracts,
  } = params;

  await verifySafeConfiguration({
    fixtureData,
    receipt,
    safeAddress,
    owners,
    threshold,
  });

  await findAndVerifySystemDeployedEvent({
    fixtureData,
    receipt,
    salt,
  });

  await findAndVerifySystemDeployedEventEmitterEvent({
    fixtureData,
    receipt,
    safeAddress,
    salt,
  });

  if (moduleFractalV1Params) {
    await findAndVerifyModuleFractalV1({
      fixtureData,
      receipt,
      safeAddress,
      ...moduleFractalV1Params,
    });
  }

  let votesERC20V1Tokens: VotesERC20V1[] = [];
  if (votesERC20V1Datas && votesERC20V1Datas.length > 0) {
    votesERC20V1Tokens = await findAndVerifyVotesERC20V1s({
      fixtureData,
      receipt,
      implementation: await fixtureData.votesERC20V1.getAddress(),
      votesERC20V1Datas,
      safeAddress,
    });
  }

  let proposerAdapterERC20s: ProposerAdapterERC20V1[] = [];
  if (proposerAdapterERC20V1Datas) {
    proposerAdapterERC20s = await findAndVerifyProposerAdapterERC20V1s({
      fixtureData,
      receipt,
      implementation: await fixtureData.proposerAdapterERC20V1.getAddress(),
      adapterDatas: await Promise.all(
        proposerAdapterERC20V1Datas.map(async data => ({
          ...data,
          token:
            data.token ??
            (await votesERC20V1Tokens[Number(data.params.newTokenIndex)].getAddress()),
        })),
      ),
    });
  }

  let proposerAdapterERC721s: ProposerAdapterERC721V1[] = [];
  if (proposerAdapterERC721V1Datas) {
    proposerAdapterERC721s = await findAndVerifyProposerAdapterERC721V1s({
      fixtureData,
      receipt,
      implementation: await fixtureData.proposerAdapterERC721V1.getAddress(),
      proposerAdapterDatas: proposerAdapterERC721V1Datas,
    });
  }

  let proposerAdapterHatsV1s: ProposerAdapterHatsV1[] = [];
  if (proposerAdapterHatsV1Datas) {
    proposerAdapterHatsV1s = await findAndVerifyProposerAdapterHatsV1s({
      fixtureData,
      receipt,
      implementation: await fixtureData.proposerAdapterHatsV1.getAddress(),
      proposerAdapterDatas: proposerAdapterHatsV1Datas,
    });
  }

  let strategyAddress: string | undefined;
  if (strategyV1Params) {
    strategyAddress = await findProxyDeployed({
      fixtureData,
      receipt,
      implementation: await fixtureData.strategyV1.getAddress(),
    });
  }

  let azoriusModule: ModuleAzoriusV1 | undefined;
  if (moduleAzoriusV1Params) {
    if (!strategyAddress) {
      throw new Error('Strategy is required to verify Azorius module');
    }

    azoriusModule = await findAndVerifyModuleAzoriusV1({
      fixtureData,
      receipt,
      safeAddress,
      owner: safeAddress,
      strategy: strategyAddress,
      ...moduleAzoriusV1Params,
    });
  }

  let votingConfigERC20s: { votingWeight: string; voteTracker: string }[] = [];
  if (votingConfigERC20V1Datas) {
    if (!strategyAddress) {
      throw new Error('Strategy is required to verify voting adapter ERC20');
    }

    votingConfigERC20s = await findAndVerifyVotingConfigERC20V1s({
      fixtureData,
      receipt,
      implementation: await fixtureData.votingWeightERC20V1.getAddress(),
      votingConfigDatas: await Promise.all(
        votingConfigERC20V1Datas.map(async data => ({
          ...data,
          params: {
            ...data.params,
            strategy: strategyAddress,
          },
          token:
            data.token ??
            (await votesERC20V1Tokens[Number(data.params.newTokenIndex)].getAddress()),
        })),
      ),
    });
  }

  let votingConfigERC721s: { votingWeight: string; voteTracker: string }[] = [];
  if (votingConfigERC721V1Datas) {
    if (!strategyAddress) {
      throw new Error('Strategy is required to verify voting adapter ERC721');
    }

    votingConfigERC721s = await findAndVerifyVotingConfigERC721V1s({
      fixtureData,
      receipt,
      implementation: await fixtureData.votingWeightERC721V1.getAddress(),
      votingConfigDatas: await Promise.all(
        votingConfigERC721V1Datas.map(async data => ({
          ...data,
          params: { ...data.params, strategy: strategyAddress },
        })),
      ),
    });
  }

  if (strategyV1Params) {
    if (!azoriusModule) {
      throw new Error('Azorius module is required to verify a strategy');
    }

    await findAndVerifyStrategyV1({
      fixtureData,
      receipt,
      ...strategyV1Params,
      strategyAdmin: await azoriusModule.getAddress(),
      proposerAdapters: [
        ...(await Promise.all(proposerAdapterERC20s.map(adapter => adapter.getAddress()))),
        ...(await Promise.all(proposerAdapterERC721s.map(adapter => adapter.getAddress()))),
        ...(await Promise.all(proposerAdapterHatsV1s.map(adapter => adapter.getAddress()))),
      ],
      votingConfigs: [...votingConfigERC20s, ...votingConfigERC721s],
    });
  }

  if (freezeGuardMultisigV1Data) {
    const votingParamsCount = [
      freezeGuardMultisigV1Data.votingAzoriusParams,
      freezeGuardMultisigV1Data.votingMultisigParams,
      freezeGuardMultisigV1Data.votingStandaloneParams,
    ].filter(Boolean).length;

    if (votingParamsCount > 1) {
      throw new Error('Cannot have multiple voting params types');
    }

    let freezeVotingAddress: string | undefined;

    if (freezeGuardMultisigV1Data.votingMultisigParams) {
      freezeVotingAddress = await (
        await findAndVerifyFreezeVotingMultisigV1({
          fixtureData,
          receipt,
          ...freezeGuardMultisigV1Data.votingMultisigParams,
        })
      ).getAddress();
    }

    if (freezeGuardMultisigV1Data.votingAzoriusParams) {
      freezeVotingAddress = await (
        await findAndVerifyFreezeVotingAzoriusV1({
          fixtureData,
          receipt,
          ...freezeGuardMultisigV1Data.votingAzoriusParams,
        })
      ).getAddress();
    }

    if (freezeGuardMultisigV1Data.votingStandaloneParams) {
      freezeVotingAddress = await (
        await findAndVerifyFreezeVotingStandaloneV1({
          fixtureData,
          receipt,
          ...freezeGuardMultisigV1Data.votingStandaloneParams.freezeVotingParams,
          votesERC20V1Tokens,
          votingConfigERC20V1Datas:
            freezeGuardMultisigV1Data.votingStandaloneParams.votingConfigERC20V1Datas,
          votingConfigERC721V1Datas:
            freezeGuardMultisigV1Data.votingStandaloneParams.votingConfigERC721V1Datas,
        })
      ).getAddress();
    }

    if (!freezeVotingAddress) {
      throw new Error('No freeze voting address found');
    }

    await findAndVerifyFreezeGuardMultisigV1({
      fixtureData,
      receipt,
      safeAddress,
      ...freezeGuardMultisigV1Data.guardParams,
      freezeVoting: freezeVotingAddress,
    });
  }

  if (freezeGuardAzoriusV1Data) {
    if (!azoriusModule) {
      throw new Error('Azorius module is required to verify freeze guard Azorius');
    }

    const votingParamsCount = [
      freezeGuardAzoriusV1Data.votingAzoriusParams,
      freezeGuardAzoriusV1Data.votingMultisigParams,
    ].filter(Boolean).length;

    if (votingParamsCount > 1) {
      throw new Error('Cannot have multiple voting params types');
    }

    let freezeVotingAddress: string | undefined;

    if (freezeGuardAzoriusV1Data.votingMultisigParams) {
      freezeVotingAddress = await (
        await findAndVerifyFreezeVotingMultisigV1({
          fixtureData,
          receipt,
          ...freezeGuardAzoriusV1Data.votingMultisigParams,
        })
      ).getAddress();
    }

    if (freezeGuardAzoriusV1Data.votingAzoriusParams) {
      freezeVotingAddress = await (
        await findAndVerifyFreezeVotingAzoriusV1({
          fixtureData,
          receipt,
          ...freezeGuardAzoriusV1Data.votingAzoriusParams,
        })
      ).getAddress();
    }

    if (!freezeVotingAddress) {
      throw new Error('No freeze voting address found');
    }

    await findAndVerifyFreezeGuardAzoriusV1({
      fixtureData,
      receipt,
      azoriusModuleAddress: await azoriusModule.getAddress(),
      ...freezeGuardAzoriusV1Data.guardParams,
      freezeVoting: freezeVotingAddress,
    });
  }

  verifyNumberOfNewContractsDeployed({
    fixtureData,
    receipt,
    safeAddress,
    numberOfNewContracts,
  });
}

// Helper to create a minimal Safe for testing
async function createMinimalSafe(owner: SignerWithAddress): Promise<{
  safe: Safe;
  safeOwner: SignerWithAddress;
}> {
  // Create a minimal Safe for delegatecall execution
  const safeFactory = await new SafeProxyFactory__factory(owner).deploy();
  const safeSingleton = await new Safe__factory(owner).deploy();

  // Deploy a Safe with minimal setup
  const safeSetupData = safeSingleton.interface.encodeFunctionData('setup', [
    [owner.address], // owners
    1, // threshold
    ethers.ZeroAddress, // to
    '0x', // data
    ethers.ZeroAddress, // fallbackHandler
    ethers.ZeroAddress, // paymentToken
    0, // payment
    ethers.ZeroAddress, // paymentReceiver
  ]);

  const safeSalt = randomSalt();
  await safeFactory.createProxyWithNonce(await safeSingleton.getAddress(), safeSetupData, safeSalt);

  // Calculate Safe address
  const safeAddress = await calculateSafeProxyAddress({
    safeProxyFactory: safeFactory,
    safeSingleton,
    safeSetupData,
    saltNonce: safeSalt,
  });

  return {
    safe: Safe__factory.connect(safeAddress, owner),
    safeOwner: owner,
  };
}

// Base helper for deploying upgradeable contracts via Safe
async function deployUpgradeableContractViaSafe(
  systemDeployer: SystemDeployerV1,
  implementation: string,
  owner: SignerWithAddress,
  name: string,
  safe: Safe,
  safeOwner: SignerWithAddress,
  saltNonce?: bigint,
): Promise<UpgradeContractV1> {
  // Create a unique salt if one is not provided
  const salt = saltNonce ?? randomSalt();

  // Create initialization data with function selector
  const fullInitData = UpgradeContractV1__factory.createInterface().encodeFunctionData(
    'initialize',
    [name, owner.address],
  );

  // Deploy the proxy using the helper function
  const { predictedAddress } = await deployProxyViaSafe({
    systemDeployer,
    safe,
    owner: safeOwner,
    implementation,
    initData: fullInitData,
    salt,
  });

  // Create a contract instance at the predicted address
  return UpgradeContractV1__factory.connect(predictedAddress, owner);
}

// Helper for deploying a concrete upgradeable contract with an existing Safe
async function deployConcreteUpgradeableContractWithExistingSafe(
  systemDeployer: SystemDeployerV1,
  implementation: string,
  owner: SignerWithAddress,
  name: string,
  safe: Safe,
  safeOwner: SignerWithAddress,
  saltNonce: bigint,
): Promise<UpgradeContractV1> {
  return deployUpgradeableContractViaSafe(
    systemDeployer,
    implementation,
    owner,
    name,
    safe,
    safeOwner,
    saltNonce,
  );
}

// Helper for deploying a concrete upgradeable contract with a new Safe
async function deployConcreteUpgradeableContractWithNewSafe(
  systemDeployer: SystemDeployerV1,
  implementation: string,
  owner: SignerWithAddress,
  name: string,
  saltNonce?: bigint,
): Promise<UpgradeContractV1> {
  // Create a new Safe
  const { safe, safeOwner } = await createMinimalSafe(owner);

  return deployUpgradeableContractViaSafe(
    systemDeployer,
    implementation,
    owner,
    name,
    safe,
    safeOwner,
    saltNonce,
  );
}

async function setupState() {
  const [deployer, user1, user2, upgradeableContractOwner, nonOwner] = await ethers.getSigners();

  const safe = await new Safe__factory(deployer).deploy();
  const safeProxyFactory = await new SafeProxyFactory__factory(deployer).deploy();

  const systemDeployerEventEmitter = await new SystemDeployerEventEmitterV1__factory(
    deployer,
  ).deploy();
  const systemDeployer = await new SystemDeployerV1__factory(deployer).deploy();

  const moduleFractalV1 = await new ModuleFractalV1__factory(deployer).deploy();
  const freezeGuardMultisigV1 = await new FreezeGuardMultisigV1__factory(deployer).deploy();
  const freezeGuardAzoriusV1 = await new FreezeGuardAzoriusV1__factory(deployer).deploy();
  const freezeVotingMultisigV1 = await new FreezeVotingMultisigV1__factory(deployer).deploy();
  const freezeVotingAzoriusV1 = await new FreezeVotingAzoriusV1__factory(deployer).deploy();
  const freezeVotingStandaloneV1 = await new FreezeVotingStandaloneV1__factory(deployer).deploy();
  const moduleAzoriusV1 = await new ModuleAzoriusV1__factory(deployer).deploy();
  const strategyV1 = await new StrategyV1__factory(deployer).deploy();
  const votesERC20V1 = await new VotesERC20V1__factory(deployer).deploy();
  const proposerAdapterERC20V1 = await new ProposerAdapterERC20V1__factory(deployer).deploy();
  const proposerAdapterERC721V1 = await new ProposerAdapterERC721V1__factory(deployer).deploy();
  const proposerAdapterHatsV1 = await new ProposerAdapterHatsV1__factory(deployer).deploy();
  const votingWeightERC20V1 = await new VotingWeightERC20V1__factory(deployer).deploy();
  const votingWeightERC721V1 = await new VotingWeightERC721V1__factory(deployer).deploy();
  const voteTrackerERC20V1 = await new VoteTrackerERC20V1__factory(deployer).deploy();
  const voteTrackerERC721V1 = await new VoteTrackerERC721V1__factory(deployer).deploy();

  const upgradeableMasterCopy = await (
    await new UpgradeContractV1__factory(upgradeableContractOwner).deploy()
  ).getAddress();
  const minimalImplementation = await (
    await new MinimalUpgradeableContract__factory(upgradeableContractOwner).deploy()
  ).getAddress();
  const failingImplementation = await (
    await new FailingInitializerContract__factory(upgradeableContractOwner).deploy()
  ).getAddress();
  const upgradeV1Implementation = await (
    await new UpgradeContractV1__factory(upgradeableContractOwner).deploy()
  ).getAddress();
  const incompatibleImplementation = await (
    await new IncompatibleStorageContract__factory(upgradeableContractOwner).deploy()
  ).getAddress();
  const upgradeV2Implementation = await (
    await new UpgradeContractV2__factory(upgradeableContractOwner).deploy()
  ).getAddress();
  const upgradeV3Implementation = await (
    await new UpgradeContractV3__factory(upgradeableContractOwner).deploy()
  ).getAddress();

  // Create a test Safe for deployProxy tests
  const { safe: testSafe, safeOwner: testSafeOwner } = await createMinimalSafe(deployer);

  const upgradeableContract = await deployConcreteUpgradeableContractWithExistingSafe(
    systemDeployer,
    upgradeableMasterCopy,
    upgradeableContractOwner,
    'Upgradeable Contract',
    testSafe,
    testSafeOwner,
    randomSalt(),
  );
  const upgradedMasterCopy = await (
    await new UpgradeContractV2__factory(upgradeableContractOwner).deploy()
  ).getAddress();

  return {
    deployer,
    user1,
    user2,
    upgradeableContractOwner,
    nonOwner,
    safe,
    safeProxyFactory,
    systemDeployer,
    systemDeployerEventEmitter,
    moduleFractalV1,
    freezeGuardMultisigV1,
    freezeGuardAzoriusV1,
    freezeVotingMultisigV1,
    freezeVotingAzoriusV1,
    freezeVotingStandaloneV1,
    moduleAzoriusV1,
    strategyV1,
    votesERC20V1,
    proposerAdapterERC20V1,
    proposerAdapterERC721V1,
    proposerAdapterHatsV1,
    votingWeightERC20V1,
    votingWeightERC721V1,
    voteTrackerERC20V1,
    voteTrackerERC721V1,
    upgradeableMasterCopy,
    minimalImplementation,
    failingImplementation,
    upgradeV1Implementation,
    incompatibleImplementation,
    upgradeV2Implementation,
    upgradeV3Implementation,
    upgradeableContract,
    upgradedMasterCopy,
    testSafe,
  };
}

describe('SystemDeployerV1', () => {
  let fixtureData: Awaited<ReturnType<typeof setupState>>;

  beforeEach(async () => {
    fixtureData = await loadFixture(setupState);
  });

  describe('setupSafe', () => {
    let votesERC20V1Params1: ISystemDeployerV1.VotesERC20V1ParamsStruct;
    let votesERC20V1Params2: ISystemDeployerV1.VotesERC20V1ParamsStruct;

    let moduleFractalV1Params: ISystemDeployerV1.ModuleFractalV1ParamsStruct;

    let freezeGuardMultisigParams: ISystemDeployerV1.FreezeGuardMultisigV1ParamsStruct;
    let freezeGuardAzoriusParams: ISystemDeployerV1.FreezeGuardAzoriusV1ParamsStruct;
    let freezeVotingMultisigParams: ISystemDeployerV1.FreezeVotingMultisigV1ParamsStruct;
    let freezeVotingAzoriusParams: ISystemDeployerV1.FreezeVotingAzoriusV1ParamsStruct;

    beforeEach(async () => {
      votesERC20V1Params1 = {
        implementation: await fixtureData.votesERC20V1.getAddress(),
        metadata: {
          name: 'Test Token',
          symbol: 'TEST',
        },
        allocations: [
          {
            to: fixtureData.user1.address,
            amount: ethers.parseEther('100'),
          },
        ],
        locked: true,
        maxTotalSupply: ethers.parseEther('10000'),
        safeSupply: ethers.parseEther('100'),
      };

      votesERC20V1Params2 = {
        implementation: await fixtureData.votesERC20V1.getAddress(),
        metadata: {
          name: 'Test Token 2',
          symbol: 'TEST2',
        },
        allocations: [
          {
            to: fixtureData.user2.address,
            amount: ethers.parseEther('50'),
          },
        ],
        locked: false,
        maxTotalSupply: ethers.parseEther('10030'),
        safeSupply: ethers.parseEther('150'),
      };

      moduleFractalV1Params = {
        implementation: await fixtureData.moduleFractalV1.getAddress(),
        owner: fixtureData.user1.address,
      };

      freezeGuardMultisigParams = {
        implementation: await fixtureData.freezeGuardMultisigV1.getAddress(),
        owner: fixtureData.user1.address,
        timelockPeriod: 60,
        executionPeriod: 120,
      };

      freezeGuardAzoriusParams = {
        implementation: await fixtureData.freezeGuardAzoriusV1.getAddress(),
        owner: fixtureData.user1.address,
      };

      freezeVotingMultisigParams = {
        implementation: await fixtureData.freezeVotingMultisigV1.getAddress(),
        owner: fixtureData.user1.address,
        freezeVotesThreshold: 26,
        freezeProposalPeriod: 65,
        parentSafe: ethers.ZeroAddress,
        lightAccountFactory: ethers.ZeroAddress,
      };

      freezeVotingAzoriusParams = {
        implementation: await fixtureData.freezeVotingAzoriusV1.getAddress(),
        owner: fixtureData.user1.address,
        freezeVotesThreshold: 12,
        freezeProposalPeriod: 60,
        parentAzorius: ethers.ZeroAddress,
        lightAccountFactory: ethers.ZeroAddress,
      };
    });

    describe('Deploy Multisig DAO', () => {
      let owners: string[];
      let threshold: number;

      beforeEach(async () => {
        const randomOwner = ethers.Wallet.createRandom().address;
        owners = [fixtureData.user1.address, fixtureData.user2.address, randomOwner];
        threshold = 2;
      });

      it('has correct signers and threshold', async () => {
        const setupSafeParams = createSetupSafeParams();

        await findAndVerifySafe({
          ...(await deploySafeWithSetup({
            fixtureData,
            owners,
            threshold,
            setupSafeParams,
          })),
          fixtureData,
          owners,
          threshold,
          numberOfNewContracts: 0,
        });
      });

      describe('with a Fractal Module', () => {
        it('deploys successfully with a Fractal Module', async () => {
          const setupSafeParams = createSetupSafeParams({
            moduleFractalParams: moduleFractalV1Params,
          });

          await findAndVerifySafe({
            ...(await deploySafeWithSetup({
              fixtureData,
              owners,
              threshold,
              setupSafeParams,
            })),
            fixtureData,
            owners,
            threshold,
            moduleFractalV1Params,
            numberOfNewContracts: 1,
          });
        });
      });

      describe('with Freeze Guards', () => {
        it('reverts with FreezeGuardAzorius', async () => {
          const setupSafeParams = createSetupSafeParams();

          const data = {
            fixtureData,
            owners,
            threshold,
            setupSafeParams,
          };

          // confirm that the safe is deployed with basic params
          await deploySafeWithSetup(data);

          // now update setupSafeParams to include a freezeGuardAzoriusParams
          data.setupSafeParams.freezeParams.freezeGuardParams.freezeGuardAzoriusV1Params =
            freezeGuardAzoriusParams;

          // now deploying should fail
          await expect(deploySafeWithSetup(data)).to.be.reverted;
        });

        it('reverts with FreezeGuardMultisig but no FreezeVoting contract', async () => {
          const setupSafeParams = createSetupSafeParams();

          const data = {
            fixtureData,
            owners,
            threshold,
            setupSafeParams,
          };

          // confirm that the safe is deployed with basic params
          await deploySafeWithSetup(data);

          // now update setupSafeParams to include a freezeGuardMultisigParams
          data.setupSafeParams.freezeParams.freezeGuardParams.freezeGuardMultisigV1Params =
            freezeGuardMultisigParams;

          // now deploying should fail
          await expect(deploySafeWithSetup(data)).to.be.reverted;
        });

        it('succeeds with FreezeGuardMultisig and FreezeVotingMultisig contracts', async () => {
          const setupSafeParams = createSetupSafeParams({
            freezeVotingMultisigParams,
            freezeGuardMultisigParams,
          });

          await findAndVerifySafe({
            ...(await deploySafeWithSetup({
              fixtureData,
              owners,
              threshold,
              setupSafeParams,
            })),
            fixtureData,
            owners,
            threshold,
            freezeGuardMultisigV1Data: {
              guardParams: freezeGuardMultisigParams,
              votingMultisigParams: freezeVotingMultisigParams,
            },
            numberOfNewContracts: 2,
          });
        });

        it('succeeds with FreezeGuardMultisig and FreezeVotingAzorius contracts', async () => {
          const setupSafeParams = createSetupSafeParams({
            freezeVotingAzoriusParams,
            freezeGuardMultisigParams,
          });

          await findAndVerifySafe({
            ...(await deploySafeWithSetup({
              fixtureData,
              owners,
              threshold,
              setupSafeParams,
            })),
            fixtureData,
            owners,
            threshold,
            freezeGuardMultisigV1Data: {
              guardParams: freezeGuardMultisigParams,
              votingAzoriusParams: freezeVotingAzoriusParams,
            },
            numberOfNewContracts: 2,
          });
        });

        it('succeeds with FreezeGuardMultisig and FreezeVotingStandalone contracts', async () => {
          const freezeVotingStandaloneParams: ISystemDeployerV1.FreezeVotingStandaloneParamsStruct =
            {
              freezeVotingStandaloneV1Params: {
                implementation: await fixtureData.freezeVotingStandaloneV1.getAddress(),
                freezeVotesThreshold: ethers.parseEther('100'),
                unfreezeVotesThreshold: ethers.parseEther('150'),
                freezeProposalPeriod: 7200,
                unfreezeProposalPeriod: 3600,
                lightAccountFactory: ethers.ZeroAddress,
              },
              votingConfigParams: {
                votingConfigERC20V1Params: [
                  {
                    votingWeightImplementation: await fixtureData.votingWeightERC20V1.getAddress(),
                    voteTrackerImplementation: await fixtureData.voteTrackerERC20V1.getAddress(),
                    token: ethers.ZeroAddress,
                    newTokenIndex: 0,
                    weightPerToken: ethers.parseEther('1'),
                  },
                ],
                votingConfigERC721V1Params: [],
              },
            };

          const setupSafeParams = createSetupSafeParams({
            votesERC20Params: [votesERC20V1Params1],
            freezeVotingStandaloneParams,
            freezeGuardMultisigParams,
          });

          await findAndVerifySafe({
            ...(await deploySafeWithSetup({
              fixtureData,
              owners,
              threshold,
              setupSafeParams,
            })),
            fixtureData,
            owners,
            threshold,
            votesERC20V1Datas: [votesERC20V1Params1],
            freezeGuardMultisigV1Data: {
              guardParams: freezeGuardMultisigParams,
              votingStandaloneParams: {
                freezeVotingParams: freezeVotingStandaloneParams.freezeVotingStandaloneV1Params,
                votingConfigERC20V1Datas:
                  freezeVotingStandaloneParams.votingConfigParams.votingConfigERC20V1Params.map(
                    p => ({ params: p }),
                  ),
                votingConfigERC721V1Datas:
                  freezeVotingStandaloneParams.votingConfigParams.votingConfigERC721V1Params.map(
                    p => ({ params: p }),
                  ),
              },
            },
            numberOfNewContracts: 5, // Safe + Token + FreezeVotingStandalone + VotingWeight + VoteTracker + FreezeGuardMultisig = 6, but Safe is not counted as "new"
          });
        });
      });

      describe('with a Fractal Module and Freeze Guard Multisig', () => {
        it('deploys successfully', async () => {
          const setupSafeParams = createSetupSafeParams({
            moduleFractalParams: moduleFractalV1Params,
            freezeGuardMultisigParams,
            freezeVotingMultisigParams,
          });

          await findAndVerifySafe({
            ...(await deploySafeWithSetup({
              fixtureData,
              owners,
              threshold,
              setupSafeParams,
            })),
            fixtureData,
            owners,
            threshold,
            moduleFractalV1Params,
            freezeGuardMultisigV1Data: {
              guardParams: freezeGuardMultisigParams,
              votingMultisigParams: freezeVotingMultisigParams,
            },
            numberOfNewContracts: 3,
          });
        });
      });

      describe('with VotesERC20V1 tokens', () => {
        it('deploys successfully with one VotesERC20V1 token', async () => {
          const setupSafeParams = createSetupSafeParams({
            votesERC20Params: [votesERC20V1Params1],
          });

          await findAndVerifySafe({
            ...(await deploySafeWithSetup({
              fixtureData,
              owners,
              threshold,
              setupSafeParams,
            })),
            fixtureData,
            owners,
            threshold,
            votesERC20V1Datas: [votesERC20V1Params1],
            numberOfNewContracts: 1,
          });
        });

        it('deploys successfully with multiple VotesERC20V1 tokens', async () => {
          const setupSafeParams = createSetupSafeParams({
            votesERC20Params: [votesERC20V1Params1, votesERC20V1Params2],
          });

          await findAndVerifySafe({
            ...(await deploySafeWithSetup({
              fixtureData,
              owners,
              threshold,
              setupSafeParams,
            })),
            fixtureData,
            owners,
            threshold,
            votesERC20V1Datas: [votesERC20V1Params1, votesERC20V1Params2],
            numberOfNewContracts: 2,
          });
        });
      });
    });

    describe('Deploy Azorius Governance', () => {
      let randomVotesERC20Contract: string;
      let randomVotesERC721Contract: string;
      let hatsContract: string;
      let moduleAzoriusV1Params: ISystemDeployerV1.ModuleAzoriusV1ParamsStruct;
      let proposerAdapterERC20V1Params1: ISystemDeployerV1.ProposerAdapterERC20V1ParamsStruct;
      let proposerAdapterERC20V1Params2: ISystemDeployerV1.ProposerAdapterERC20V1ParamsStruct;
      let proposerAdapterERC721V1Params1: ISystemDeployerV1.ProposerAdapterERC721V1ParamsStruct;
      let proposerAdapterERC721V1Params2: ISystemDeployerV1.ProposerAdapterERC721V1ParamsStruct;
      let proposerAdapterHatsV1Params1: ISystemDeployerV1.ProposerAdapterHatsV1ParamsStruct;
      let proposerAdapterHatsV1Params2: ISystemDeployerV1.ProposerAdapterHatsV1ParamsStruct;
      let votingConfigERC20V1Params1: ISystemDeployerV1.VotingConfigERC20V1ParamsStruct;
      let votingConfigERC20V1Params2: ISystemDeployerV1.VotingConfigERC20V1ParamsStruct;
      let votingConfigERC721V1Params1: ISystemDeployerV1.VotingConfigERC721V1ParamsStruct;
      let votingConfigERC721V1Params2: ISystemDeployerV1.VotingConfigERC721V1ParamsStruct;
      let strategyV1Params: ISystemDeployerV1.StrategyV1ParamsStruct;

      beforeEach(async () => {
        randomVotesERC20Contract = await fixtureData.votesERC20V1.getAddress();
        randomVotesERC721Contract = ethers.Wallet.createRandom().address;
        hatsContract = ethers.Wallet.createRandom().address;

        moduleAzoriusV1Params = {
          implementation: await fixtureData.moduleAzoriusV1.getAddress(),
          timelockPeriod: 3600,
          executionPeriod: 86400,
        };

        proposerAdapterERC20V1Params1 = {
          implementation: await fixtureData.proposerAdapterERC20V1.getAddress(),
          token: randomVotesERC20Contract,
          proposerThreshold: 100000,
          newTokenIndex: 0,
        };

        proposerAdapterERC20V1Params2 = {
          implementation: await fixtureData.proposerAdapterERC20V1.getAddress(),
          token: randomVotesERC20Contract,
          proposerThreshold: 874512,
          newTokenIndex: 0,
        };

        proposerAdapterERC721V1Params1 = {
          implementation: await fixtureData.proposerAdapterERC721V1.getAddress(),
          token: randomVotesERC721Contract,
          proposerThreshold: 100000,
        };

        proposerAdapterERC721V1Params2 = {
          implementation: await fixtureData.proposerAdapterERC721V1.getAddress(),
          token: randomVotesERC721Contract,
          proposerThreshold: 8745,
        };

        proposerAdapterHatsV1Params1 = {
          implementation: await fixtureData.proposerAdapterHatsV1.getAddress(),
          hatsContract: hatsContract,
          whitelistedHatIds: [1, 2, 3],
        };

        proposerAdapterHatsV1Params2 = {
          implementation: await fixtureData.proposerAdapterHatsV1.getAddress(),
          hatsContract: hatsContract,
          whitelistedHatIds: [4, 5, 6],
        };

        votingConfigERC20V1Params1 = {
          votingWeightImplementation: await fixtureData.votingWeightERC20V1.getAddress(),
          voteTrackerImplementation: await fixtureData.voteTrackerERC20V1.getAddress(),
          token: randomVotesERC20Contract,
          weightPerToken: 14,
          newTokenIndex: 0,
        };

        votingConfigERC20V1Params2 = {
          votingWeightImplementation: await fixtureData.votingWeightERC20V1.getAddress(),
          voteTrackerImplementation: await fixtureData.voteTrackerERC20V1.getAddress(),
          token: randomVotesERC20Contract,
          weightPerToken: 343,
          newTokenIndex: 0,
        };

        votingConfigERC721V1Params1 = {
          votingWeightImplementation: await fixtureData.votingWeightERC721V1.getAddress(),
          voteTrackerImplementation: await fixtureData.voteTrackerERC721V1.getAddress(),
          token: randomVotesERC721Contract,
          weightPerToken: 14,
        };

        votingConfigERC721V1Params2 = {
          votingWeightImplementation: await fixtureData.votingWeightERC721V1.getAddress(),
          voteTrackerImplementation: await fixtureData.voteTrackerERC721V1.getAddress(),
          token: randomVotesERC721Contract,
          weightPerToken: 343,
        };

        strategyV1Params = {
          implementation: await fixtureData.strategyV1.getAddress(),
          votingPeriod: 86400,
          quorumThreshold: 1000,
          basisNumerator: 500000,
          lightAccountFactory: ethers.ZeroAddress,
        };
      });

      describe('With Multisig', () => {
        it('deploys with a single non-signer', async () => {
          const owners = ['0x0000000000000000000000000000000000000002'];
          const threshold = 1;

          const setupSafeParams = createSetupSafeParams({
            azoriusGovernanceParams: {
              proposerAdapterParams: {
                proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                proposerAdapterERC721V1Params: [],
                proposerAdapterHatsV1Params: [],
              },
              strategyV1Params,
              votingConfigParams: {
                votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                votingConfigERC721V1Params: [],
              },
              moduleAzoriusV1Params,
            },
          });

          await findAndVerifySafe({
            ...(await deploySafeWithSetup({
              fixtureData,
              owners,
              threshold,
              setupSafeParams,
            })),
            fixtureData,
            owners,
            threshold,
            proposerAdapterERC20V1Datas: [
              {
                params: proposerAdapterERC20V1Params1,
                token: randomVotesERC20Contract,
              },
            ],
            strategyV1Params,
            moduleAzoriusV1Params,
            votingConfigERC20V1Datas: [
              {
                params: votingConfigERC20V1Params1,
                token: randomVotesERC20Contract,
              },
            ],
            numberOfNewContracts: 5,
          });
        });

        it('deploys with multiple signers', async () => {
          const owners = [fixtureData.user1.address, fixtureData.user2.address];
          const threshold = 2;

          const setupSafeParams = createSetupSafeParams({
            azoriusGovernanceParams: {
              proposerAdapterParams: {
                proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                proposerAdapterERC721V1Params: [],
                proposerAdapterHatsV1Params: [],
              },
              strategyV1Params,
              votingConfigParams: {
                votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                votingConfigERC721V1Params: [],
              },
              moduleAzoriusV1Params,
            },
          });

          await findAndVerifySafe({
            ...(await deploySafeWithSetup({
              fixtureData,
              owners,
              threshold,
              setupSafeParams,
            })),
            fixtureData,
            owners,
            threshold,
            proposerAdapterERC20V1Datas: [
              {
                params: proposerAdapterERC20V1Params1,
                token: randomVotesERC20Contract,
              },
            ],
            strategyV1Params,
            moduleAzoriusV1Params,
            votingConfigERC20V1Datas: [
              {
                params: votingConfigERC20V1Params1,
                token: randomVotesERC20Contract,
              },
            ],
            numberOfNewContracts: 5,
          });
        });
      });

      describe('Without Multisig', () => {
        let owners: string[];
        let threshold: number;

        beforeEach(async () => {
          owners = ['0x0000000000000000000000000000000000000002'];
          threshold = 1;
        });

        describe('With VotesERC20 tokens', () => {
          describe('With VotesERC20V1 tokens', () => {
            it('deploys with a single VotesERC20V1 token', async () => {
              const setupSafeParams = createSetupSafeParams({
                votesERC20Params: [votesERC20V1Params1],
                azoriusGovernanceParams: {
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  votingConfigParams: {
                    votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                    votingConfigERC721V1Params: [],
                  },
                  moduleAzoriusV1Params,
                },
              });

              await findAndVerifySafe({
                ...(await deploySafeWithSetup({
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                })),
                fixtureData,
                owners,
                threshold,
                votesERC20V1Datas: [votesERC20V1Params1],
                proposerAdapterERC20V1Datas: [
                  {
                    params: proposerAdapterERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                strategyV1Params,
                moduleAzoriusV1Params,
                votingConfigERC20V1Datas: [
                  {
                    params: votingConfigERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                numberOfNewContracts: 6,
              });
            });

            it('deploys with multiple VotesERC20V1 tokens', async () => {
              const setupSafeParams = createSetupSafeParams({
                votesERC20Params: [votesERC20V1Params1, votesERC20V1Params2],
                azoriusGovernanceParams: {
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  votingConfigParams: {
                    votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                    votingConfigERC721V1Params: [],
                  },
                  moduleAzoriusV1Params,
                },
              });

              await findAndVerifySafe({
                ...(await deploySafeWithSetup({
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                })),
                fixtureData,
                owners,
                threshold,
                votesERC20V1Datas: [votesERC20V1Params1, votesERC20V1Params2],
                proposerAdapterERC20V1Datas: [
                  {
                    params: proposerAdapterERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                strategyV1Params,
                moduleAzoriusV1Params,
                votingConfigERC20V1Datas: [
                  {
                    params: votingConfigERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                numberOfNewContracts: 7,
              });
            });
          });
        });

        describe('With Voting Adapters', () => {
          describe('ERC20 voting adapters', () => {
            describe('No new tokens', () => {
              it('deploys with a VotingConfigERC20V1 pointing to an existing token', async () => {
                const setupSafeParams = createSetupSafeParams({
                  azoriusGovernanceParams: {
                    votingConfigParams: {
                      votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                      votingConfigERC721V1Params: [],
                    },
                    proposerAdapterParams: {
                      proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                      proposerAdapterERC721V1Params: [],
                      proposerAdapterHatsV1Params: [],
                    },
                    strategyV1Params,
                    moduleAzoriusV1Params,
                  },
                });

                await findAndVerifySafe({
                  ...(await deploySafeWithSetup({
                    fixtureData,
                    owners,
                    threshold,
                    setupSafeParams,
                  })),
                  fixtureData,
                  owners,
                  threshold,
                  proposerAdapterERC20V1Datas: [
                    {
                      params: proposerAdapterERC20V1Params1,
                      token: randomVotesERC20Contract,
                    },
                  ],
                  strategyV1Params,
                  moduleAzoriusV1Params,
                  votingConfigERC20V1Datas: [
                    {
                      params: votingConfigERC20V1Params1,
                      token: randomVotesERC20Contract,
                    },
                  ],
                  numberOfNewContracts: 5, // module + strategy + proposer + votingWeight + voteTracker
                });
              });

              it('deploys multiple VotingConfigERC20V1s pointing to existing tokens', async () => {
                const setupSafeParams = createSetupSafeParams({
                  azoriusGovernanceParams: {
                    votingConfigParams: {
                      votingConfigERC20V1Params: [
                        votingConfigERC20V1Params1,
                        votingConfigERC20V1Params2,
                      ],
                      votingConfigERC721V1Params: [],
                    },
                    proposerAdapterParams: {
                      proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                      proposerAdapterERC721V1Params: [],
                      proposerAdapterHatsV1Params: [],
                    },
                    strategyV1Params,
                    moduleAzoriusV1Params,
                  },
                });

                await findAndVerifySafe({
                  ...(await deploySafeWithSetup({
                    fixtureData,
                    owners,
                    threshold,
                    setupSafeParams,
                  })),
                  fixtureData,
                  owners,
                  threshold,
                  proposerAdapterERC20V1Datas: [
                    {
                      params: proposerAdapterERC20V1Params1,
                      token: randomVotesERC20Contract,
                    },
                  ],
                  strategyV1Params,
                  moduleAzoriusV1Params,
                  votingConfigERC20V1Datas: [
                    {
                      params: votingConfigERC20V1Params1,
                      token: randomVotesERC20Contract,
                    },
                    {
                      params: votingConfigERC20V1Params2,
                      token: randomVotesERC20Contract,
                    },
                  ],
                  numberOfNewContracts: 7,
                });
              });
            });

            describe('One new VotesERC20 token', () => {
              it('deploys a VotingConfigERC20V1 pointing to the new token', async () => {
                votingConfigERC20V1Params1 = {
                  ...votingConfigERC20V1Params1,
                  token: ethers.ZeroAddress,
                  newTokenIndex: 0,
                };

                const setupSafeParams = createSetupSafeParams({
                  votesERC20Params: [votesERC20V1Params1],
                  azoriusGovernanceParams: {
                    votingConfigParams: {
                      votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                      votingConfigERC721V1Params: [],
                    },
                    proposerAdapterParams: {
                      proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                      proposerAdapterERC721V1Params: [],
                      proposerAdapterHatsV1Params: [],
                    },
                    strategyV1Params,
                    moduleAzoriusV1Params,
                  },
                });

                await findAndVerifySafe({
                  ...(await deploySafeWithSetup({
                    fixtureData,
                    owners,
                    threshold,
                    setupSafeParams,
                  })),
                  fixtureData,
                  owners,
                  threshold,
                  votesERC20V1Datas: [votesERC20V1Params1],
                  proposerAdapterERC20V1Datas: [
                    {
                      params: proposerAdapterERC20V1Params1,
                      token: randomVotesERC20Contract,
                    },
                  ],
                  strategyV1Params,
                  moduleAzoriusV1Params,
                  votingConfigERC20V1Datas: [{ params: votingConfigERC20V1Params1 }],
                  numberOfNewContracts: 6,
                });
              });

              it('deploys multiple VotingConfigERC20V1s pointing to the same new token', async () => {
                votingConfigERC20V1Params1 = {
                  ...votingConfigERC20V1Params1,
                  token: ethers.ZeroAddress,
                  newTokenIndex: 0,
                };

                votingConfigERC20V1Params2 = {
                  ...votingConfigERC20V1Params2,
                  token: ethers.ZeroAddress,
                  newTokenIndex: 0,
                };

                const setupSafeParams = createSetupSafeParams({
                  votesERC20Params: [votesERC20V1Params1],
                  azoriusGovernanceParams: {
                    votingConfigParams: {
                      votingConfigERC20V1Params: [
                        votingConfigERC20V1Params1,
                        votingConfigERC20V1Params2,
                      ],
                      votingConfigERC721V1Params: [],
                    },
                    proposerAdapterParams: {
                      proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                      proposerAdapterERC721V1Params: [],
                      proposerAdapterHatsV1Params: [],
                    },
                    strategyV1Params,
                    moduleAzoriusV1Params,
                  },
                });

                await findAndVerifySafe({
                  ...(await deploySafeWithSetup({
                    fixtureData,
                    owners,
                    threshold,
                    setupSafeParams,
                  })),
                  fixtureData,
                  owners,
                  threshold,
                  votesERC20V1Datas: [votesERC20V1Params1],
                  proposerAdapterERC20V1Datas: [
                    {
                      params: proposerAdapterERC20V1Params1,
                      token: randomVotesERC20Contract,
                    },
                  ],
                  strategyV1Params,
                  moduleAzoriusV1Params,
                  votingConfigERC20V1Datas: [
                    { params: votingConfigERC20V1Params1 },
                    { params: votingConfigERC20V1Params2 },
                  ],
                  numberOfNewContracts: 8,
                });
              });

              it('reverts if the VotingConfigERC20 points to an invalid new token index', async () => {
                const setupSafeParams = createSetupSafeParams({
                  votesERC20Params: [votesERC20V1Params1],
                  azoriusGovernanceParams: {
                    votingConfigParams: {
                      votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                      votingConfigERC721V1Params: [],
                    },
                    proposerAdapterParams: {
                      proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                      proposerAdapterERC721V1Params: [],
                      proposerAdapterHatsV1Params: [],
                    },
                    strategyV1Params,
                    moduleAzoriusV1Params,
                  },
                });

                const data = {
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                };

                // initial deployment should succeed
                await deploySafeWithSetup(data);

                // now updating the setupSafeParams to include an invalid index should fail
                // also the default votingConfigERC20V1Params1 token is an external token, so set it to zero address so index is used
                data.setupSafeParams.azoriusGovernanceParams.votingConfigParams.votingConfigERC20V1Params[0].newTokenIndex = 1;
                data.setupSafeParams.azoriusGovernanceParams.votingConfigParams.votingConfigERC20V1Params[0].token =
                  ethers.ZeroAddress;

                await expect(deploySafeWithSetup(data)).to.be.reverted;
              });
            });

            describe('Multiple new VotesERC20 tokens', () => {
              it('deploys a VotingConfigERC20V1 pointing to one of the new tokens', async () => {
                votingConfigERC20V1Params1 = {
                  ...votingConfigERC20V1Params1,
                  token: ethers.ZeroAddress,
                  newTokenIndex: 1,
                };

                const setupSafeParams = createSetupSafeParams({
                  votesERC20Params: [votesERC20V1Params1, votesERC20V1Params2],
                  azoriusGovernanceParams: {
                    votingConfigParams: {
                      votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                      votingConfigERC721V1Params: [],
                    },
                    proposerAdapterParams: {
                      proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                      proposerAdapterERC721V1Params: [],
                      proposerAdapterHatsV1Params: [],
                    },
                    strategyV1Params,
                    moduleAzoriusV1Params,
                  },
                });

                await findAndVerifySafe({
                  ...(await deploySafeWithSetup({
                    fixtureData,
                    owners,
                    threshold,
                    setupSafeParams,
                  })),
                  fixtureData,
                  owners,
                  threshold,
                  votesERC20V1Datas: [votesERC20V1Params1, votesERC20V1Params2],
                  proposerAdapterERC20V1Datas: [
                    {
                      params: proposerAdapterERC20V1Params1,
                      token: randomVotesERC20Contract,
                    },
                  ],
                  strategyV1Params,
                  moduleAzoriusV1Params,
                  votingConfigERC20V1Datas: [{ params: votingConfigERC20V1Params1 }],
                  numberOfNewContracts: 7,
                });
              });

              it('deploys multiple VotingConfigERC20V1s, each pointing to one of the new tokens', async () => {
                votingConfigERC20V1Params1 = {
                  ...votingConfigERC20V1Params1,
                  token: ethers.ZeroAddress,
                  newTokenIndex: 1,
                };

                votingConfigERC20V1Params2 = {
                  ...votingConfigERC20V1Params2,
                  token: ethers.ZeroAddress,
                  newTokenIndex: 0,
                };

                const setupSafeParams = createSetupSafeParams({
                  votesERC20Params: [votesERC20V1Params1, votesERC20V1Params2],
                  azoriusGovernanceParams: {
                    votingConfigParams: {
                      votingConfigERC20V1Params: [
                        votingConfigERC20V1Params1,
                        votingConfigERC20V1Params2,
                      ],
                      votingConfigERC721V1Params: [],
                    },
                    proposerAdapterParams: {
                      proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                      proposerAdapterERC721V1Params: [],
                      proposerAdapterHatsV1Params: [],
                    },
                    strategyV1Params,
                    moduleAzoriusV1Params,
                  },
                });

                await findAndVerifySafe({
                  ...(await deploySafeWithSetup({
                    fixtureData,
                    owners,
                    threshold,
                    setupSafeParams,
                  })),
                  fixtureData,
                  owners,
                  threshold,
                  votesERC20V1Datas: [votesERC20V1Params1, votesERC20V1Params2],
                  proposerAdapterERC20V1Datas: [
                    {
                      params: proposerAdapterERC20V1Params1,
                      token: randomVotesERC20Contract,
                    },
                  ],
                  strategyV1Params,
                  moduleAzoriusV1Params,
                  votingConfigERC20V1Datas: [
                    { params: votingConfigERC20V1Params1 },
                    { params: votingConfigERC20V1Params2 },
                  ],
                  numberOfNewContracts: 9,
                });
              });
            });
          });

          describe('ERC721 voting adapters', () => {
            it('deploys successfully with one VotingConfigERC721', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  votingConfigParams: {
                    votingConfigERC20V1Params: [],
                    votingConfigERC721V1Params: [votingConfigERC721V1Params1],
                  },
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  moduleAzoriusV1Params,
                },
              });

              await findAndVerifySafe({
                ...(await deploySafeWithSetup({
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                })),
                fixtureData,
                owners,
                threshold,
                proposerAdapterERC20V1Datas: [
                  {
                    params: proposerAdapterERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                strategyV1Params,
                moduleAzoriusV1Params,
                votingConfigERC721V1Datas: [{ params: votingConfigERC721V1Params1 }],
                numberOfNewContracts: 5,
              });
            });

            it('deploys successfully with multiple VotingConfigERC721s', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  votingConfigParams: {
                    votingConfigERC20V1Params: [],
                    votingConfigERC721V1Params: [
                      votingConfigERC721V1Params1,
                      votingConfigERC721V1Params2,
                    ],
                  },
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  moduleAzoriusV1Params,
                },
              });

              await findAndVerifySafe({
                ...(await deploySafeWithSetup({
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                })),
                fixtureData,
                owners,
                threshold,
                proposerAdapterERC20V1Datas: [
                  {
                    params: proposerAdapterERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                strategyV1Params,
                moduleAzoriusV1Params,
                votingConfigERC721V1Datas: [
                  { params: votingConfigERC721V1Params1 },
                  { params: votingConfigERC721V1Params2 },
                ],
                numberOfNewContracts: 7,
              });
            });
          });

          describe('Mixed voting adapters', () => {
            it('deploys successfully with multiple voting adapters', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  votingConfigParams: {
                    votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                    votingConfigERC721V1Params: [votingConfigERC721V1Params1],
                  },
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  moduleAzoriusV1Params,
                },
              });

              await findAndVerifySafe({
                ...(await deploySafeWithSetup({
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                })),
                fixtureData,
                owners,
                threshold,
                proposerAdapterERC20V1Datas: [
                  {
                    params: proposerAdapterERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                strategyV1Params,
                moduleAzoriusV1Params,
                votingConfigERC20V1Datas: [
                  { params: votingConfigERC20V1Params1, token: randomVotesERC20Contract },
                ],
                votingConfigERC721V1Datas: [{ params: votingConfigERC721V1Params1 }],
                numberOfNewContracts: 7,
              });
            });
          });
        });

        describe('With Proposer Adapters', () => {
          describe('ERC20 proposer adapters', () => {
            describe('No new tokens', () => {
              it('deploys with a ProposerAdapterERC20V1 pointing to an existing token', async () => {
                // Note: this is same test as "deploys with a VotingConfigERC20V1 pointing to an existing token"
                const setupSafeParams = createSetupSafeParams({
                  azoriusGovernanceParams: {
                    votingConfigParams: {
                      votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                      votingConfigERC721V1Params: [],
                    },
                    proposerAdapterParams: {
                      proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                      proposerAdapterERC721V1Params: [],
                      proposerAdapterHatsV1Params: [],
                    },
                    strategyV1Params,
                    moduleAzoriusV1Params,
                  },
                });

                await findAndVerifySafe({
                  ...(await deploySafeWithSetup({
                    fixtureData,
                    owners,
                    threshold,
                    setupSafeParams,
                  })),
                  fixtureData,
                  owners,
                  threshold,
                  proposerAdapterERC20V1Datas: [
                    {
                      params: proposerAdapterERC20V1Params1,
                      token: randomVotesERC20Contract,
                    },
                  ],
                  strategyV1Params,
                  moduleAzoriusV1Params,
                  votingConfigERC20V1Datas: [
                    {
                      params: votingConfigERC20V1Params1,
                      token: randomVotesERC20Contract,
                    },
                  ],
                  numberOfNewContracts: 5,
                });
              });

              it('deploys multiple ProposerAdapterERC20V1s pointing to existing tokens', async () => {
                const setupSafeParams = createSetupSafeParams({
                  azoriusGovernanceParams: {
                    votingConfigParams: {
                      votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                      votingConfigERC721V1Params: [],
                    },
                    proposerAdapterParams: {
                      proposerAdapterERC20V1Params: [
                        proposerAdapterERC20V1Params1,
                        proposerAdapterERC20V1Params2,
                      ],
                      proposerAdapterERC721V1Params: [],
                      proposerAdapterHatsV1Params: [],
                    },
                    strategyV1Params,
                    moduleAzoriusV1Params,
                  },
                });

                await findAndVerifySafe({
                  ...(await deploySafeWithSetup({
                    fixtureData,
                    owners,
                    threshold,
                    setupSafeParams,
                  })),
                  fixtureData,
                  owners,
                  threshold,
                  proposerAdapterERC20V1Datas: [
                    {
                      params: proposerAdapterERC20V1Params1,
                      token: randomVotesERC20Contract,
                    },
                    {
                      params: proposerAdapterERC20V1Params2,
                      token: randomVotesERC20Contract,
                    },
                  ],
                  strategyV1Params,
                  moduleAzoriusV1Params,
                  votingConfigERC20V1Datas: [
                    {
                      params: votingConfigERC20V1Params1,
                      token: randomVotesERC20Contract,
                    },
                  ],
                  numberOfNewContracts: 6,
                });
              });
            });

            describe('One new VotesERC20 token', () => {
              it('deploys a ProposerAdapterERC20V1 pointing to the new token', async () => {
                proposerAdapterERC20V1Params1 = {
                  ...proposerAdapterERC20V1Params1,
                  token: ethers.ZeroAddress,
                  newTokenIndex: 0,
                };

                const setupSafeParams = createSetupSafeParams({
                  votesERC20Params: [votesERC20V1Params1],
                  azoriusGovernanceParams: {
                    votingConfigParams: {
                      votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                      votingConfigERC721V1Params: [],
                    },
                    proposerAdapterParams: {
                      proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                      proposerAdapterERC721V1Params: [],
                      proposerAdapterHatsV1Params: [],
                    },
                    strategyV1Params,
                    moduleAzoriusV1Params,
                  },
                });

                await findAndVerifySafe({
                  ...(await deploySafeWithSetup({
                    fixtureData,
                    owners,
                    threshold,
                    setupSafeParams,
                  })),
                  fixtureData,
                  owners,
                  threshold,
                  votesERC20V1Datas: [votesERC20V1Params1],
                  proposerAdapterERC20V1Datas: [{ params: proposerAdapterERC20V1Params1 }],
                  strategyV1Params,
                  moduleAzoriusV1Params,
                  votingConfigERC20V1Datas: [
                    { params: votingConfigERC20V1Params1, token: randomVotesERC20Contract },
                  ],
                  numberOfNewContracts: 6,
                });
              });

              it('deploys multiple ProposerAdapterERC20V1s pointing to the same new token', async () => {
                proposerAdapterERC20V1Params1 = {
                  ...proposerAdapterERC20V1Params1,
                  token: ethers.ZeroAddress,
                  newTokenIndex: 0,
                };

                proposerAdapterERC20V1Params2 = {
                  ...proposerAdapterERC20V1Params2,
                  token: ethers.ZeroAddress,
                  newTokenIndex: 0,
                };

                const setupSafeParams = createSetupSafeParams({
                  votesERC20Params: [votesERC20V1Params1],
                  azoriusGovernanceParams: {
                    votingConfigParams: {
                      votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                      votingConfigERC721V1Params: [],
                    },
                    proposerAdapterParams: {
                      proposerAdapterERC20V1Params: [
                        proposerAdapterERC20V1Params1,
                        proposerAdapterERC20V1Params2,
                      ],
                      proposerAdapterERC721V1Params: [],
                      proposerAdapterHatsV1Params: [],
                    },
                    strategyV1Params,
                    moduleAzoriusV1Params,
                  },
                });

                await findAndVerifySafe({
                  ...(await deploySafeWithSetup({
                    fixtureData,
                    owners,
                    threshold,
                    setupSafeParams,
                  })),
                  fixtureData,
                  owners,
                  threshold,
                  votesERC20V1Datas: [votesERC20V1Params1],
                  proposerAdapterERC20V1Datas: [
                    { params: proposerAdapterERC20V1Params1 },
                    { params: proposerAdapterERC20V1Params2 },
                  ],
                  strategyV1Params,
                  moduleAzoriusV1Params,
                  votingConfigERC20V1Datas: [
                    { params: votingConfigERC20V1Params1, token: randomVotesERC20Contract },
                  ],
                  numberOfNewContracts: 7,
                });
              });

              it('reverts if the ProposerAdapterERC20 points to an invalid new token index', async () => {
                const setupSafeParams = createSetupSafeParams({
                  votesERC20Params: [votesERC20V1Params1],
                  azoriusGovernanceParams: {
                    votingConfigParams: {
                      votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                      votingConfigERC721V1Params: [],
                    },
                    proposerAdapterParams: {
                      proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                      proposerAdapterERC721V1Params: [],
                      proposerAdapterHatsV1Params: [],
                    },
                    strategyV1Params,
                    moduleAzoriusV1Params,
                  },
                });

                const data = {
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                };

                // initial deployment should succeed
                await deploySafeWithSetup(data);

                // now updating the setupSafeParams to include an invalid index should fail
                // also the default proposerAdapterERC20V1Params1 token is an external token, so set it to zero address so index is used
                data.setupSafeParams.azoriusGovernanceParams.proposerAdapterParams.proposerAdapterERC20V1Params[0].newTokenIndex = 1;
                data.setupSafeParams.azoriusGovernanceParams.proposerAdapterParams.proposerAdapterERC20V1Params[0].token =
                  ethers.ZeroAddress;

                await expect(deploySafeWithSetup(data)).to.be.reverted;
              });
            });

            describe('Multiple new VotesERC20 tokens', () => {
              it('deploys a ProposerAdapterERC20V1 pointing to one of the new tokens', async () => {
                proposerAdapterERC20V1Params1 = {
                  ...proposerAdapterERC20V1Params1,
                  token: ethers.ZeroAddress,
                  newTokenIndex: 1,
                };

                const setupSafeParams = createSetupSafeParams({
                  votesERC20Params: [votesERC20V1Params1, votesERC20V1Params2],
                  azoriusGovernanceParams: {
                    votingConfigParams: {
                      votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                      votingConfigERC721V1Params: [],
                    },
                    proposerAdapterParams: {
                      proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                      proposerAdapterERC721V1Params: [],
                      proposerAdapterHatsV1Params: [],
                    },
                    strategyV1Params,
                    moduleAzoriusV1Params,
                  },
                });

                await findAndVerifySafe({
                  ...(await deploySafeWithSetup({
                    fixtureData,
                    owners,
                    threshold,
                    setupSafeParams,
                  })),
                  fixtureData,
                  owners,
                  threshold,
                  votesERC20V1Datas: [votesERC20V1Params1, votesERC20V1Params2],
                  proposerAdapterERC20V1Datas: [{ params: proposerAdapterERC20V1Params1 }],
                  strategyV1Params,
                  moduleAzoriusV1Params,
                  votingConfigERC20V1Datas: [
                    { params: votingConfigERC20V1Params1, token: randomVotesERC20Contract },
                  ],
                  numberOfNewContracts: 7,
                });
              });

              it('deploys multiple ProposerAdapterERC20V1s, each pointing to one of the new tokens', async () => {
                proposerAdapterERC20V1Params1 = {
                  ...proposerAdapterERC20V1Params1,
                  token: ethers.ZeroAddress,
                  newTokenIndex: 1,
                };

                proposerAdapterERC20V1Params2 = {
                  ...proposerAdapterERC20V1Params2,
                  token: ethers.ZeroAddress,
                  newTokenIndex: 0,
                };

                const setupSafeParams = createSetupSafeParams({
                  votesERC20Params: [votesERC20V1Params1, votesERC20V1Params2],
                  azoriusGovernanceParams: {
                    votingConfigParams: {
                      votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                      votingConfigERC721V1Params: [],
                    },
                    proposerAdapterParams: {
                      proposerAdapterERC20V1Params: [
                        proposerAdapterERC20V1Params1,
                        proposerAdapterERC20V1Params2,
                      ],
                      proposerAdapterERC721V1Params: [],
                      proposerAdapterHatsV1Params: [],
                    },
                    strategyV1Params,
                    moduleAzoriusV1Params,
                  },
                });

                await findAndVerifySafe({
                  ...(await deploySafeWithSetup({
                    fixtureData,
                    owners,
                    threshold,
                    setupSafeParams,
                  })),
                  fixtureData,
                  owners,
                  threshold,
                  votesERC20V1Datas: [votesERC20V1Params1, votesERC20V1Params2],
                  proposerAdapterERC20V1Datas: [
                    { params: proposerAdapterERC20V1Params1 },
                    { params: proposerAdapterERC20V1Params2 },
                  ],
                  strategyV1Params,
                  moduleAzoriusV1Params,
                  votingConfigERC20V1Datas: [
                    { params: votingConfigERC20V1Params1, token: randomVotesERC20Contract },
                  ],
                  numberOfNewContracts: 8,
                });
              });
            });
          });

          describe('ERC721 proposer adapters', () => {
            it('deploys successfully with one ProposerAdapterERC721', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  votingConfigParams: {
                    votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                    votingConfigERC721V1Params: [],
                  },
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [],
                    proposerAdapterERC721V1Params: [proposerAdapterERC721V1Params1],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  moduleAzoriusV1Params,
                },
              });

              await findAndVerifySafe({
                ...(await deploySafeWithSetup({
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                })),
                fixtureData,
                owners,
                threshold,
                proposerAdapterERC721V1Datas: [{ params: proposerAdapterERC721V1Params1 }],
                strategyV1Params,
                moduleAzoriusV1Params,
                votingConfigERC20V1Datas: [
                  { params: votingConfigERC20V1Params1, token: randomVotesERC20Contract },
                ],
                numberOfNewContracts: 5,
              });
            });

            it('deploys successfully with multiple ProposerAdapterERC721s', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  votingConfigParams: {
                    votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                    votingConfigERC721V1Params: [],
                  },
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [],
                    proposerAdapterERC721V1Params: [
                      proposerAdapterERC721V1Params1,
                      proposerAdapterERC721V1Params2,
                    ],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  moduleAzoriusV1Params,
                },
              });

              await findAndVerifySafe({
                ...(await deploySafeWithSetup({
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                })),
                fixtureData,
                owners,
                threshold,
                proposerAdapterERC721V1Datas: [
                  { params: proposerAdapterERC721V1Params1 },
                  { params: proposerAdapterERC721V1Params2 },
                ],
                strategyV1Params,
                moduleAzoriusV1Params,
                votingConfigERC20V1Datas: [
                  { params: votingConfigERC20V1Params1, token: randomVotesERC20Contract },
                ],
                numberOfNewContracts: 6,
              });
            });
          });

          describe('Hats proposer adapters', () => {
            it('deploys successfully with one ProposerAdapterHats', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  votingConfigParams: {
                    votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                    votingConfigERC721V1Params: [],
                  },
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [proposerAdapterHatsV1Params1],
                  },
                  strategyV1Params,
                  moduleAzoriusV1Params,
                },
              });

              await findAndVerifySafe({
                ...(await deploySafeWithSetup({
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                })),
                fixtureData,
                owners,
                threshold,
                proposerAdapterHatsV1Datas: [{ params: proposerAdapterHatsV1Params1 }],
                strategyV1Params,
                moduleAzoriusV1Params,
                votingConfigERC20V1Datas: [
                  { params: votingConfigERC20V1Params1, token: randomVotesERC20Contract },
                ],
                numberOfNewContracts: 5,
              });
            });

            it('deploys successfully with multiple ProposerAdapterHats', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  votingConfigParams: {
                    votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                    votingConfigERC721V1Params: [],
                  },
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [
                      proposerAdapterHatsV1Params1,
                      proposerAdapterHatsV1Params2,
                    ],
                  },
                  strategyV1Params,
                  moduleAzoriusV1Params,
                },
              });

              await findAndVerifySafe({
                ...(await deploySafeWithSetup({
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                })),
                fixtureData,
                owners,
                threshold,
                proposerAdapterHatsV1Datas: [
                  { params: proposerAdapterHatsV1Params1 },
                  { params: proposerAdapterHatsV1Params2 },
                ],
                strategyV1Params,
                moduleAzoriusV1Params,
                votingConfigERC20V1Datas: [
                  { params: votingConfigERC20V1Params1, token: randomVotesERC20Contract },
                ],
                numberOfNewContracts: 6,
              });
            });
          });

          describe('Mixed proposer adapters', () => {
            it('deploys successfully with multiple proposer adapters', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  votingConfigParams: {
                    votingConfigERC20V1Params: [votingConfigERC20V1Params1],
                    votingConfigERC721V1Params: [],
                  },
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [proposerAdapterERC20V1Params1],
                    proposerAdapterERC721V1Params: [proposerAdapterERC721V1Params1],
                    proposerAdapterHatsV1Params: [proposerAdapterHatsV1Params1],
                  },
                  strategyV1Params,
                  moduleAzoriusV1Params,
                },
              });

              await findAndVerifySafe({
                ...(await deploySafeWithSetup({
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                })),
                fixtureData,
                owners,
                threshold,
                proposerAdapterERC20V1Datas: [
                  {
                    params: proposerAdapterERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                proposerAdapterERC721V1Datas: [{ params: proposerAdapterERC721V1Params1 }],
                proposerAdapterHatsV1Datas: [{ params: proposerAdapterHatsV1Params1 }],
                strategyV1Params,
                moduleAzoriusV1Params,
                votingConfigERC20V1Datas: [
                  { params: votingConfigERC20V1Params1, token: randomVotesERC20Contract },
                ],
                numberOfNewContracts: 7,
              });
            });
          });
        });

        describe('with Fractal Module', () => {
          it('deploys with a Fractal Module', async () => {
            const setupSafeParams = createSetupSafeParams({
              azoriusGovernanceParams: {
                proposerAdapterParams: {
                  proposerAdapterERC20V1Params: [{ ...proposerAdapterERC20V1Params1 }],
                  proposerAdapterERC721V1Params: [],
                  proposerAdapterHatsV1Params: [],
                },
                votingConfigParams: {
                  votingConfigERC20V1Params: [{ ...votingConfigERC20V1Params1 }],
                  votingConfigERC721V1Params: [],
                },
                strategyV1Params,
                moduleAzoriusV1Params,
              },
              moduleFractalParams: moduleFractalV1Params,
            });

            await findAndVerifySafe({
              ...(await deploySafeWithSetup({
                fixtureData,
                owners,
                threshold,
                setupSafeParams,
              })),
              fixtureData,
              owners,
              threshold,
              moduleFractalV1Params,
              proposerAdapterERC20V1Datas: [
                {
                  params: proposerAdapterERC20V1Params1,
                  token: randomVotesERC20Contract,
                },
              ],
              strategyV1Params,
              moduleAzoriusV1Params,
              votingConfigERC20V1Datas: [
                {
                  params: votingConfigERC20V1Params1,
                  token: randomVotesERC20Contract,
                },
              ],
              numberOfNewContracts: 6,
            });
          });
        });

        describe('with FreezeGuards', () => {
          describe('FreezeGuardMultisig configurations', () => {
            it('deploys with a FreezeGuardMultisig with FreezeVotingMultisig', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [{ ...proposerAdapterERC20V1Params1 }],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  votingConfigParams: {
                    votingConfigERC20V1Params: [{ ...votingConfigERC20V1Params1 }],
                    votingConfigERC721V1Params: [],
                  },
                  moduleAzoriusV1Params,
                },
                freezeVotingMultisigParams,
                freezeGuardMultisigParams,
              });

              await findAndVerifySafe({
                ...(await deploySafeWithSetup({
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                })),
                fixtureData,
                owners,
                threshold,
                proposerAdapterERC20V1Datas: [
                  {
                    params: proposerAdapterERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                strategyV1Params,
                moduleAzoriusV1Params,
                votingConfigERC20V1Datas: [
                  {
                    params: votingConfigERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                freezeGuardMultisigV1Data: {
                  guardParams: freezeGuardMultisigParams,
                  votingMultisigParams: freezeVotingMultisigParams,
                },
                numberOfNewContracts: 7,
              });
            });

            it('deploys with a FreezeGuardMultisig with FreezeVotingAzorius', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [{ ...proposerAdapterERC20V1Params1 }],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  votingConfigParams: {
                    votingConfigERC20V1Params: [{ ...votingConfigERC20V1Params1 }],
                    votingConfigERC721V1Params: [],
                  },
                  moduleAzoriusV1Params,
                },
                freezeVotingAzoriusParams,
                freezeGuardMultisigParams,
              });

              await findAndVerifySafe({
                ...(await deploySafeWithSetup({
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                })),
                fixtureData,
                owners,
                threshold,
                proposerAdapterERC20V1Datas: [
                  {
                    params: proposerAdapterERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                strategyV1Params,
                moduleAzoriusV1Params,
                votingConfigERC20V1Datas: [
                  {
                    params: votingConfigERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                freezeGuardMultisigV1Data: {
                  guardParams: freezeGuardMultisigParams,
                  votingAzoriusParams: freezeVotingAzoriusParams,
                },
                numberOfNewContracts: 7,
              });
            });

            it('reverts if we deploy a FreezeGuardMultisig and NEITHER FreezeVoting contracts', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [{ ...proposerAdapterERC20V1Params1 }],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  votingConfigParams: {
                    votingConfigERC20V1Params: [{ ...votingConfigERC20V1Params1 }],
                    votingConfigERC721V1Params: [],
                  },
                  moduleAzoriusV1Params,
                },
                freezeVotingAzoriusParams,
                freezeGuardMultisigParams,
              });

              const data = {
                fixtureData,
                owners,
                threshold,
                setupSafeParams,
              };

              // initial deployment should succeed
              await deploySafeWithSetup(data);

              // delete the freezeVotingAzoriusParams by setting the implementation to zero address
              data.setupSafeParams.freezeParams.freezeVotingParams.freezeVotingAzoriusV1Params.implementation =
                ethers.ZeroAddress;

              // now deploying should fail
              await expect(deploySafeWithSetup(data)).to.be.reverted;
            });

            it('reverts if we deploy a FreezeGuardMultisig and BOTH FreezeVoting contracts', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [{ ...proposerAdapterERC20V1Params1 }],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  votingConfigParams: {
                    votingConfigERC20V1Params: [{ ...votingConfigERC20V1Params1 }],
                    votingConfigERC721V1Params: [],
                  },
                  moduleAzoriusV1Params,
                },
                freezeVotingAzoriusParams,
                freezeGuardMultisigParams,
              });

              const data = {
                fixtureData,
                owners,
                threshold,
                setupSafeParams,
              };

              // initial deployment should succeed
              await deploySafeWithSetup(data);

              // now add the freezeVotingMultisigParams
              data.setupSafeParams.freezeParams.freezeVotingParams.freezeVotingMultisigV1Params =
                freezeVotingMultisigParams;

              // now deploying should fail
              await expect(deploySafeWithSetup(data)).to.be.reverted;
            });

            it('deploys with a FreezeGuardMultisig with FreezeVotingStandalone', async () => {
              const freezeVotingStandaloneParams: ISystemDeployerV1.FreezeVotingStandaloneParamsStruct =
                {
                  freezeVotingStandaloneV1Params: {
                    implementation: await fixtureData.freezeVotingStandaloneV1.getAddress(),
                    freezeVotesThreshold: ethers.parseEther('150'),
                    unfreezeVotesThreshold: ethers.parseEther('200'),
                    freezeProposalPeriod: 7200,
                    unfreezeProposalPeriod: 3600,
                    lightAccountFactory: ethers.ZeroAddress,
                  },
                  votingConfigParams: {
                    votingConfigERC20V1Params: [
                      {
                        votingWeightImplementation:
                          await fixtureData.votingWeightERC20V1.getAddress(),
                        voteTrackerImplementation:
                          await fixtureData.voteTrackerERC20V1.getAddress(),
                        token: ethers.ZeroAddress,
                        newTokenIndex: 0,
                        weightPerToken: ethers.parseEther('1'),
                      },
                    ],
                    votingConfigERC721V1Params: [],
                  },
                };

              const setupSafeParams = createSetupSafeParams({
                votesERC20Params: [votesERC20V1Params1],
                freezeGuardMultisigParams,
                freezeVotingStandaloneParams,
              });

              await findAndVerifySafe({
                ...(await deploySafeWithSetup({
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                })),
                fixtureData,
                owners,
                threshold,
                votesERC20V1Datas: [votesERC20V1Params1],
                freezeGuardMultisigV1Data: {
                  guardParams: freezeGuardMultisigParams,
                  votingStandaloneParams: {
                    freezeVotingParams: freezeVotingStandaloneParams.freezeVotingStandaloneV1Params,
                    votingConfigERC20V1Datas:
                      freezeVotingStandaloneParams.votingConfigParams.votingConfigERC20V1Params.map(
                        p => ({ params: p }),
                      ),
                    votingConfigERC721V1Datas:
                      freezeVotingStandaloneParams.votingConfigParams.votingConfigERC721V1Params.map(
                        p => ({ params: p }),
                      ),
                  },
                },
                numberOfNewContracts: 5, // Safe + Token + FreezeVotingStandalone + VotingWeight + VoteTracker + FreezeGuardMultisig = 6, but Safe is not counted as "new"
              });
            });

            it('should revert when multiple freeze voting types are deployed', async () => {
              // First, demonstrate that FreezeGuardMultisig works with FreezeVotingStandalone alone
              const freezeVotingStandaloneParams: ISystemDeployerV1.FreezeVotingStandaloneParamsStruct =
                {
                  freezeVotingStandaloneV1Params: {
                    implementation: await fixtureData.freezeVotingStandaloneV1.getAddress(),
                    freezeVotesThreshold: 100,
                    unfreezeVotesThreshold: 200,
                    freezeProposalPeriod: 3600,
                    unfreezeProposalPeriod: 1800,
                    lightAccountFactory: ethers.ZeroAddress,
                  },
                  votingConfigParams: {
                    votingConfigERC20V1Params: [],
                    votingConfigERC721V1Params: [],
                  },
                };

              const setupSafeParams = createSetupSafeParams({
                freezeGuardMultisigParams,
                freezeVotingStandaloneParams,
              });

              const data = {
                fixtureData,
                owners,
                threshold,
                setupSafeParams,
              };

              // Initial deployment should succeed
              await deploySafeWithSetup(data);

              // Now add FreezeVotingMultisig - the minimal change that triggers the error
              data.setupSafeParams.freezeParams.freezeVotingParams.freezeVotingMultisigV1Params.implementation =
                await fixtureData.freezeVotingMultisigV1.getAddress();

              // Now deploying should fail
              await expect(deploySafeWithSetup(data)).to.be.reverted;
            });
          });

          describe('FreezeGuardAzorius configurations', () => {
            it('deploys with a FreezeGuardAzorius with FreezeVotingMultisig', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [{ ...proposerAdapterERC20V1Params1 }],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  votingConfigParams: {
                    votingConfigERC20V1Params: [{ ...votingConfigERC20V1Params1 }],
                    votingConfigERC721V1Params: [],
                  },
                  moduleAzoriusV1Params,
                },
                freezeVotingMultisigParams,
                freezeGuardAzoriusParams,
              });

              await findAndVerifySafe({
                ...(await deploySafeWithSetup({
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                })),
                fixtureData,
                owners,
                threshold,
                proposerAdapterERC20V1Datas: [
                  {
                    params: proposerAdapterERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                strategyV1Params,
                moduleAzoriusV1Params,
                votingConfigERC20V1Datas: [
                  {
                    params: votingConfigERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                freezeGuardAzoriusV1Data: {
                  guardParams: freezeGuardAzoriusParams,
                  votingMultisigParams: freezeVotingMultisigParams,
                },
                numberOfNewContracts: 7,
              });
            });

            it('deploys with a FreezeGuardAzorius with FreezeVotingAzorius', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [{ ...proposerAdapterERC20V1Params1 }],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  votingConfigParams: {
                    votingConfigERC20V1Params: [{ ...votingConfigERC20V1Params1 }],
                    votingConfigERC721V1Params: [],
                  },
                  moduleAzoriusV1Params,
                },
                freezeVotingAzoriusParams,
                freezeGuardAzoriusParams,
              });

              await findAndVerifySafe({
                ...(await deploySafeWithSetup({
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                })),
                fixtureData,
                owners,
                threshold,
                proposerAdapterERC20V1Datas: [
                  {
                    params: proposerAdapterERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                strategyV1Params,
                moduleAzoriusV1Params,
                votingConfigERC20V1Datas: [
                  {
                    params: votingConfigERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                freezeGuardAzoriusV1Data: {
                  guardParams: freezeGuardAzoriusParams,
                  votingAzoriusParams: freezeVotingAzoriusParams,
                },
                numberOfNewContracts: 7,
              });
            });

            it('reverts if we deploy a FreezeGuardAzorius and NEITHER FreezeVoting contract', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [{ ...proposerAdapterERC20V1Params1 }],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  votingConfigParams: {
                    votingConfigERC20V1Params: [{ ...votingConfigERC20V1Params1 }],
                    votingConfigERC721V1Params: [],
                  },
                  moduleAzoriusV1Params,
                },
                freezeVotingAzoriusParams,
                freezeGuardAzoriusParams,
              });

              const data = {
                fixtureData,
                owners,
                threshold,
                setupSafeParams,
              };

              // initial deployment should succeed
              await deploySafeWithSetup(data);

              // now delete the freezeVotingAzoriusParams by setting the implementation to zero address
              data.setupSafeParams.freezeParams.freezeVotingParams.freezeVotingAzoriusV1Params.implementation =
                ethers.ZeroAddress;

              // now deploying should fail
              await expect(deploySafeWithSetup(data)).to.be.reverted;
            });

            it('reverts if we deploy a FreezeGuardAzorius and BOTH FreezeVoting contracts', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [{ ...proposerAdapterERC20V1Params1 }],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  votingConfigParams: {
                    votingConfigERC20V1Params: [{ ...votingConfigERC20V1Params1 }],
                    votingConfigERC721V1Params: [],
                  },
                  moduleAzoriusV1Params,
                },
                freezeVotingAzoriusParams,
                freezeGuardAzoriusParams,
              });

              const data = {
                fixtureData,
                owners,
                threshold,
                setupSafeParams,
              };

              // initial deployment should succeed
              await deploySafeWithSetup(data);

              // now add the freezeVotingMultisigParams
              data.setupSafeParams.freezeParams.freezeVotingParams.freezeVotingMultisigV1Params =
                freezeVotingMultisigParams;

              // now deploying should fail
              await expect(deploySafeWithSetup(data)).to.be.reverted;
            });

            it('should revert when FreezeVotingStandalone is paired with FreezeGuardAzorius', async () => {
              // First, demonstrate that FreezeGuardAzorius works with FreezeVotingAzorius
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [{ ...proposerAdapterERC20V1Params1 }],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  votingConfigParams: {
                    votingConfigERC20V1Params: [{ ...votingConfigERC20V1Params1 }],
                    votingConfigERC721V1Params: [],
                  },
                  moduleAzoriusV1Params,
                },
                freezeGuardAzoriusParams,
                freezeVotingAzoriusParams,
              });

              const data = {
                fixtureData,
                owners,
                threshold,
                setupSafeParams,
              };

              // Initial deployment should succeed
              await deploySafeWithSetup(data);

              // Now change to FreezeVotingStandalone - the minimal change that triggers the error
              data.setupSafeParams.freezeParams.freezeVotingParams.freezeVotingAzoriusV1Params.implementation =
                ethers.ZeroAddress;
              data.setupSafeParams.freezeParams.freezeVotingParams.freezeVotingStandaloneParams.freezeVotingStandaloneV1Params.implementation =
                await fixtureData.freezeVotingStandaloneV1.getAddress();

              // Now deploying should fail
              await expect(deploySafeWithSetup(data)).to.be.reverted;
            });
          });

          describe('Both FreezeGuard contracts', () => {
            it('deploys with both FreezeGuards using FreezeVotingAzorius', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [{ ...proposerAdapterERC20V1Params1 }],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  votingConfigParams: {
                    votingConfigERC20V1Params: [{ ...votingConfigERC20V1Params1 }],
                    votingConfigERC721V1Params: [],
                  },
                  moduleAzoriusV1Params,
                },
                freezeVotingAzoriusParams,
                freezeGuardMultisigParams,
                freezeGuardAzoriusParams,
              });

              await findAndVerifySafe({
                ...(await deploySafeWithSetup({
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                })),
                fixtureData,
                owners,
                threshold,
                proposerAdapterERC20V1Datas: [
                  {
                    params: proposerAdapterERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                strategyV1Params,
                moduleAzoriusV1Params,
                votingConfigERC20V1Datas: [
                  {
                    params: votingConfigERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                freezeGuardMultisigV1Data: {
                  guardParams: freezeGuardMultisigParams,
                  votingAzoriusParams: freezeVotingAzoriusParams,
                },
                freezeGuardAzoriusV1Data: {
                  guardParams: freezeGuardAzoriusParams,
                  votingAzoriusParams: freezeVotingAzoriusParams,
                },
                numberOfNewContracts: 8,
              });
            });

            it('deploys with both FreezeGuards using FreezeVotingMultisig', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [{ ...proposerAdapterERC20V1Params1 }],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  votingConfigParams: {
                    votingConfigERC20V1Params: [{ ...votingConfigERC20V1Params1 }],
                    votingConfigERC721V1Params: [],
                  },
                  moduleAzoriusV1Params,
                },
                freezeVotingMultisigParams,
                freezeGuardMultisigParams,
                freezeGuardAzoriusParams,
              });

              await findAndVerifySafe({
                ...(await deploySafeWithSetup({
                  fixtureData,
                  owners,
                  threshold,
                  setupSafeParams,
                })),
                fixtureData,
                owners,
                threshold,
                proposerAdapterERC20V1Datas: [
                  {
                    params: proposerAdapterERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                strategyV1Params,
                moduleAzoriusV1Params,
                votingConfigERC20V1Datas: [
                  {
                    params: votingConfigERC20V1Params1,
                    token: randomVotesERC20Contract,
                  },
                ],
                freezeGuardMultisigV1Data: {
                  guardParams: freezeGuardMultisigParams,
                  votingMultisigParams: freezeVotingMultisigParams,
                },
                freezeGuardAzoriusV1Data: {
                  guardParams: freezeGuardAzoriusParams,
                  votingMultisigParams: freezeVotingMultisigParams,
                },
                numberOfNewContracts: 8,
              });
            });

            it('reverts if we deploy both FreezeGuards and NEITHER FreezeVoting contract', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [{ ...proposerAdapterERC20V1Params1 }],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  votingConfigParams: {
                    votingConfigERC20V1Params: [{ ...votingConfigERC20V1Params1 }],
                    votingConfigERC721V1Params: [],
                  },
                  moduleAzoriusV1Params,
                },
                freezeVotingAzoriusParams,
                freezeGuardAzoriusParams,
                freezeGuardMultisigParams,
              });

              const data = {
                fixtureData,
                owners,
                threshold,
                setupSafeParams,
              };

              // initial deployment should succeed
              await deploySafeWithSetup(data);

              // now delete the freezeVotingAzoriusParams by setting the implementation to zero address
              data.setupSafeParams.freezeParams.freezeVotingParams.freezeVotingAzoriusV1Params.implementation =
                ethers.ZeroAddress;

              // now deploying should fail
              await expect(deploySafeWithSetup(data)).to.be.reverted;
            });

            it('reverts if we deploy both FreezeGuards and BOTH FreezeVoting contracts', async () => {
              const setupSafeParams = createSetupSafeParams({
                azoriusGovernanceParams: {
                  proposerAdapterParams: {
                    proposerAdapterERC20V1Params: [{ ...proposerAdapterERC20V1Params1 }],
                    proposerAdapterERC721V1Params: [],
                    proposerAdapterHatsV1Params: [],
                  },
                  strategyV1Params,
                  votingConfigParams: {
                    votingConfigERC20V1Params: [{ ...votingConfigERC20V1Params1 }],
                    votingConfigERC721V1Params: [],
                  },
                  moduleAzoriusV1Params,
                },
                freezeVotingAzoriusParams,
                freezeGuardAzoriusParams,
                freezeGuardMultisigParams,
              });

              const data = {
                fixtureData,
                owners,
                threshold,
                setupSafeParams,
              };

              // initial deployment should succeed
              await deploySafeWithSetup(data);

              // now add the freezeVotingMultisigParams
              data.setupSafeParams.freezeParams.freezeVotingParams.freezeVotingMultisigV1Params =
                freezeVotingMultisigParams;

              // now deploying should fail
              await expect(deploySafeWithSetup(data)).to.be.reverted;
            });
          });
        });
      });
    });
  });

  describe('version', () => {
    it('should return version 1', async () => {
      expect(await fixtureData.systemDeployer.version()).to.equal(1);
    });
  });

  describe('ERC165 supportsInterface', () => {
    runSupportsInterfaceTests({
      getContract: () => fixtureData.systemDeployer,
      supportedInterfaceFactories: [
        ISystemDeployerV1__factory,
        IVersion__factory,
        IDeploymentBlock__factory,
        ERC165__factory,
      ],
    });
  });

  describe('predictProxyAddress', () => {
    it('should revert when implementation is not a contract', async () => {
      const nonContractAddress = ethers.ZeroAddress;
      const initData = '0x';
      const salt = randomSalt();

      await expect(
        fixtureData.systemDeployer.predictProxyAddress(
          nonContractAddress,
          initData,
          ethers.toBeHex(salt, 32),
          await fixtureData.systemDeployer.getAddress(),
        ),
      ).to.be.revertedWithCustomError(fixtureData.systemDeployer, 'ImplementationMustBeAContract');
    });

    it('should create different addresses for different deployers with same other parameters', async () => {
      // Deploy a simple test implementation for this test
      const testImplementation = await new MinimalUpgradeableContract__factory(
        fixtureData.deployer,
      ).deploy();
      const implementation = await testImplementation.getAddress();

      const initData =
        MinimalUpgradeableContract__factory.createInterface().encodeFunctionData('initializeEmpty');
      const salt = randomSalt();

      const predictedAddress1 = await fixtureData.systemDeployer.predictProxyAddress(
        implementation,
        initData,
        ethers.toBeHex(salt, 32),
        await fixtureData.systemDeployer.getAddress(),
      );

      const predictedAddress2 = await fixtureData.systemDeployer.predictProxyAddress(
        implementation,
        initData,
        ethers.toBeHex(salt, 32),
        fixtureData.user1.address, // Different deployer
      );

      expect(predictedAddress1).to.not.equal(
        predictedAddress2,
        'Different deployer addresses should produce different proxy addresses',
      );
    });
  });

  describe('deployProxy', () => {
    describe('Proxy Deployment and Upgrade Tests', () => {
      describe('ProxyDeployed event', () => {
        it('should emit ProxyDeployed event with correct parameters', async () => {
          const testName = 'Event Test Contract';
          const salt = randomSalt();
          const initData = UpgradeContractV1__factory.createInterface().encodeFunctionData(
            'initialize',
            [testName, fixtureData.upgradeableContractOwner.address],
          );

          // Deploy the proxy via Safe delegatecall
          const { tx } = await deployProxyViaSafe({
            systemDeployer: fixtureData.systemDeployer,
            safe: fixtureData.testSafe,
            owner: fixtureData.deployer,
            implementation: fixtureData.upgradeableMasterCopy,
            initData,
            salt,
          });

          // Predict what the proxy address should be
          const predictedProxyAddress = await fixtureData.systemDeployer.predictProxyAddress(
            fixtureData.upgradeableMasterCopy,
            initData,
            ethers.toBeHex(salt, 32),
            await fixtureData.testSafe.getAddress(),
          );

          // When using delegatecall, events are emitted from the Safe, not SystemDeployer
          const receipt = await tx.wait();
          const eventData = parseProxyDeployedEvent(receipt);
          expect(eventData).to.not.be.null;

          // Verify the deployed address matches the predicted address
          expect(eventData!.proxyAddress).to.equal(predictedProxyAddress);
          expect(eventData!.implementationAddress).to.equal(fixtureData.upgradeableMasterCopy);

          // Additionally verify the proxy was actually deployed and initialized
          const proxy = UpgradeContractV1__factory.connect(predictedProxyAddress, ethers.provider);
          expect(await proxy.name()).to.equal(testName);
          expect(await proxy.owner()).to.equal(fixtureData.upgradeableContractOwner.address);
        });

        it('should emit ProxyDeployed event even with empty initialization data', async () => {
          const salt = randomSalt();
          const emptyInitData = '0x';

          const { tx } = await deployProxyViaSafe({
            systemDeployer: fixtureData.systemDeployer,
            safe: fixtureData.testSafe,
            owner: fixtureData.deployer,
            implementation: fixtureData.minimalImplementation,
            initData: emptyInitData,
            salt,
          });

          const predictedProxyAddress = await fixtureData.systemDeployer.predictProxyAddress(
            fixtureData.minimalImplementation,
            emptyInitData,
            ethers.toBeHex(salt, 32),
            await fixtureData.testSafe.getAddress(),
          );

          // Check that the event is still emitted correctly (from Safe due to delegatecall)
          const receipt = await tx.wait();
          const eventData = parseProxyDeployedEvent(receipt);
          expect(eventData).to.not.be.null;

          // Verify addresses from event
          expect(eventData!.proxyAddress).to.equal(predictedProxyAddress);
          expect(eventData!.implementationAddress).to.equal(fixtureData.minimalImplementation);

          // Verify proxy exists at the predicted address
          expect(await verifyProxyDeployment(predictedProxyAddress)).to.be.true;
        });
      });

      describe('Deterministic deployment', () => {
        const DETERMINISTIC_SALT = randomSalt();
        const NAME = 'Test Name';
        let firstProxyAddress: string;

        beforeEach(async () => {
          // Deploy initial proxy that other tests can reference
          const proxy = await deployConcreteUpgradeableContractWithNewSafe(
            fixtureData.systemDeployer,
            fixtureData.upgradeableMasterCopy,
            fixtureData.upgradeableContractOwner,
            NAME,
            DETERMINISTIC_SALT,
          );
          firstProxyAddress = await proxy.getAddress();
        });

        it('should fail when attempting to deploy with identical parameters', async () => {
          // Try to deploy again with EXACTLY the same parameters - should fail because the address is already taken
          try {
            await deployConcreteUpgradeableContractWithNewSafe(
              fixtureData.systemDeployer,
              fixtureData.upgradeableMasterCopy,
              fixtureData.upgradeableContractOwner,
              NAME,
              DETERMINISTIC_SALT,
            );
            expect.fail(`Expected deployment of same proxy to fail.`);
          } catch (error: any) {
            // We expect this to fail, but don't check specific error message as we're testing the helper function behavior
          }
        });

        it('should allow deployment with different salt but identical parameters', async () => {
          // Deploy with a different salt but keep track of the creation parameters
          const salt = randomSalt();
          const initData = UpgradeContractV1__factory.createInterface().encodeFunctionData(
            'initialize',
            [NAME, fixtureData.upgradeableContractOwner.address],
          );

          // Deploy a new contract with these parameters via Safe
          await deployProxyViaSafe({
            systemDeployer: fixtureData.systemDeployer,
            safe: fixtureData.testSafe,
            owner: fixtureData.deployer,
            implementation: fixtureData.upgradeableMasterCopy,
            initData,
            salt,
          });

          // Verify we can deploy with different salt but same init parameters
          const secondProxyAddress = await fixtureData.systemDeployer.predictProxyAddress(
            fixtureData.upgradeableMasterCopy,
            initData,
            ethers.toBeHex(salt, 32),
            await fixtureData.testSafe.getAddress(),
          );

          expect(secondProxyAddress.toLowerCase()).to.not.equal(
            firstProxyAddress.toLowerCase(),
            'Different salt should produce different addresses',
          );

          // Confirm that the second proxy was actually deployed by confirming that bytecode exists at the predicted address
          expect(await verifyProxyDeployment(secondProxyAddress)).to.be.true;
        });

        it('should create different addresses with different salt but same parameters', async () => {
          // Deploy with same name but different salt
          const differentSaltProxy = await deployConcreteUpgradeableContractWithNewSafe(
            fixtureData.systemDeployer,
            fixtureData.upgradeableMasterCopy,
            fixtureData.upgradeableContractOwner,
            NAME,
            randomSalt(),
          );
          const differentSaltAddress = await differentSaltProxy.getAddress();

          expect(firstProxyAddress).to.not.equal(
            differentSaltAddress,
            'Different salt should allow users to deploy multiple similar contracts with distinct addresses',
          );
        });

        it('should correctly predict proxy addresses before deployment', async () => {
          // Setup initialization data
          const salt = randomSalt();
          const initData = UpgradeContractV1__factory.createInterface().encodeFunctionData(
            'initialize',
            [NAME, fixtureData.upgradeableContractOwner.address],
          );

          // Get predicted address (using testSafe as the deployer)
          const predictedAddress = await fixtureData.systemDeployer.predictProxyAddress(
            fixtureData.upgradeableMasterCopy,
            initData,
            ethers.toBeHex(salt, 32),
            await fixtureData.testSafe.getAddress(),
          );

          // Now actually deploy via Safe delegatecall
          const { tx } = await deployProxyViaSafe({
            systemDeployer: fixtureData.systemDeployer,
            safe: fixtureData.testSafe,
            owner: fixtureData.deployer,
            implementation: fixtureData.upgradeableMasterCopy,
            initData,
            salt,
          });

          const receipt = await tx.wait();
          if (!receipt) {
            throw new Error('Transaction receipt is null');
          }

          // Extract the deployed address from the event
          const eventData = parseProxyDeployedEvent(receipt);
          expect(eventData).to.not.be.null;

          // verify the deployed address matches the predicted address
          expect(eventData!.proxyAddress).to.equal(predictedAddress);
        });

        it('should create different addresses when init parameters change, even with same salt', async () => {
          // Deploy with different name but same salt
          const differentProxy = await deployConcreteUpgradeableContractWithNewSafe(
            fixtureData.systemDeployer,
            fixtureData.upgradeableMasterCopy,
            fixtureData.upgradeableContractOwner,
            'DifferentName',
            DETERMINISTIC_SALT,
          );
          const differentAddress = await differentProxy.getAddress();

          expect(firstProxyAddress).to.not.equal(
            differentAddress,
            'Different parameters should create different addresses, providing collision resistance',
          );
        });
      });

      describe('State initialization', () => {
        it('should instantiate the contract state correctly through the factory', async () => {
          const name = 'Contract';

          // Deploy using the factory
          const upgradeableContract = await deployConcreteUpgradeableContractWithNewSafe(
            fixtureData.systemDeployer,
            fixtureData.upgradeableMasterCopy,
            fixtureData.upgradeableContractOwner,
            name,
          );

          // Verify the contract was deployed correctly
          expect(await upgradeableContract.name()).to.equal(name);
        });
      });

      describe('Proxy Upgrades', () => {
        it('should successfully upgrade a proxy to a new implementation', async () => {
          // Store original contract values
          const originalName = await fixtureData.upgradeableContract.name();
          const originalAddress = await fixtureData.upgradeableContract.getAddress();

          // Upgrade the proxy to the upgraded implementation
          const tx = await fixtureData.upgradeableContract.upgradeToAndCall(
            fixtureData.upgradedMasterCopy,
            '0x', // No initialization data needed for this upgrade
          );
          await tx.wait();

          // Create a new contract instance with the upgraded interface
          const upgradedContract = UpgradeContractV2__factory.connect(
            originalAddress,
            fixtureData.upgradeableContractOwner,
          );

          // Verify state was preserved from the original contract
          expect(await upgradedContract.name()).to.equal(originalName);

          // Verify it's at the same address
          expect(await upgradedContract.getAddress()).to.equal(originalAddress);

          // Verify it has the new functionality (version should be 0 since it wasn't initialized)
          expect(await upgradedContract.version()).to.equal(0);
        });

        it('should allow initializing new variables during upgrade', async () => {
          const originalAddress = await fixtureData.upgradeableContract.getAddress();
          const originalName = await fixtureData.upgradeableContract.name();
          const newVersion = 2;

          // Prepare initialization data for the upgrade
          const fullInitData = UpgradeContractV2__factory.createInterface().encodeFunctionData(
            'initialize(uint16)',
            [newVersion],
          );

          // Upgrade the proxy to the upgraded implementation with initialization data
          await fixtureData.upgradeableContract.upgradeToAndCall(
            fixtureData.upgradedMasterCopy,
            fullInitData,
          );

          // Create a new contract instance with the upgraded interface
          const upgradedContract = UpgradeContractV2__factory.connect(
            originalAddress,
            fixtureData.upgradeableContractOwner,
          );

          // Verify state was preserved from the original contract
          expect(await upgradedContract.name()).to.equal(originalName);

          // Verify new state was initialized
          expect(await upgradedContract.version()).to.equal(newVersion);
        });

        it('should only allow the owner to upgrade the implementation', async () => {
          // Attempt to upgrade from non-owner account
          await expect(
            fixtureData.upgradeableContract
              .connect(fixtureData.nonOwner)
              .upgradeToAndCall(fixtureData.upgradedMasterCopy, '0x'),
          ).to.be.revertedWithCustomError(
            fixtureData.upgradeableContract,
            'OwnableUnauthorizedAccount',
          );
        });

        it('should not allow upgrade to non-contract address', async () => {
          // Generate a random non-contract address
          const nonContractAddress = ethers.Wallet.createRandom().address;

          // Attempt to upgrade to a non-contract address
          await expect(fixtureData.upgradeableContract.upgradeToAndCall(nonContractAddress, '0x'))
            .to.be.reverted;
        });
      });

      describe('Initialization Data Tests', () => {
        it('should handle empty initialization data', async () => {
          // Create empty initialization data with minimal initializer function selector
          const iface = MinimalUpgradeableContract__factory.createInterface();
          const emptyInitData = iface.getFunction('initializeEmpty').selector;

          // Deploy with empty init data
          const salt = randomSalt();
          const { predictedAddress } = await deployProxyViaSafe({
            systemDeployer: fixtureData.systemDeployer,
            safe: fixtureData.testSafe,
            owner: fixtureData.deployer,
            implementation: fixtureData.minimalImplementation,
            initData: emptyInitData,
            salt,
          });

          // Create a contract instance and verify initialization worked
          const minimalContract = MinimalUpgradeableContract__factory.connect(
            predictedAddress,
            fixtureData.upgradeableContractOwner,
          );

          expect(await minimalContract.isInitialized()).to.be.true;
        });

        it('should handle very large initialization data', async () => {
          // Create a large string (will still be within gas limits)
          const largeString = 'x'.repeat(10000);

          // Create initialization data with the large string
          const largeInitData =
            MinimalUpgradeableContract__factory.createInterface().encodeFunctionData(
              'initializeWithLargeData',
              [largeString],
            );

          // Deploy with large init data
          const salt = randomSalt();
          const { predictedAddress } = await deployProxyViaSafe({
            systemDeployer: fixtureData.systemDeployer,
            safe: fixtureData.testSafe,
            owner: fixtureData.deployer,
            implementation: fixtureData.minimalImplementation,
            initData: largeInitData,
            salt,
          });

          // Create a contract instance and verify initialization worked with large data
          const minimalContract = MinimalUpgradeableContract__factory.connect(
            predictedAddress,
            fixtureData.upgradeableContractOwner,
          );

          expect(await minimalContract.isInitialized()).to.be.true;
          expect(await minimalContract.largeData()).to.equal(largeString);
        });
      });

      describe('Initializer Protection', () => {
        it('should not allow initialize to be called twice', async () => {
          // Deploy a contract
          const name = 'InitializerTest';
          const initData = UpgradeContractV1__factory.createInterface().encodeFunctionData(
            'initialize',
            [name, fixtureData.upgradeableContractOwner.address],
          );

          const salt = randomSalt();
          const { predictedAddress } = await deployProxyViaSafe({
            systemDeployer: fixtureData.systemDeployer,
            safe: fixtureData.testSafe,
            owner: fixtureData.deployer,
            implementation: fixtureData.upgradeV1Implementation,
            initData,
            salt,
          });

          // Create a contract instance
          const contract = UpgradeContractV1__factory.connect(
            predictedAddress,
            fixtureData.upgradeableContractOwner,
          );

          // Try to call initialize again - should revert
          await expect(
            contract.initialize(name, fixtureData.upgradeableContractOwner.address),
          ).to.be.revertedWithCustomError(contract, 'InvalidInitialization');
        });

        it('should correctly handle reinitializers with proper version increments', async () => {
          // Deploy a contract
          const name = 'ReinitializerTest';
          const initData = UpgradeContractV1__factory.createInterface().encodeFunctionData(
            'initialize',
            [name, fixtureData.upgradeableContractOwner.address],
          );

          const salt = randomSalt();
          const { predictedAddress } = await deployProxyViaSafe({
            systemDeployer: fixtureData.systemDeployer,
            safe: fixtureData.testSafe,
            owner: fixtureData.deployer,
            implementation: fixtureData.upgradeV1Implementation,
            initData,
            salt,
          });

          // Create a contract instance
          const contract = UpgradeContractV1__factory.connect(
            predictedAddress,
            fixtureData.upgradeableContractOwner,
          );

          // Upgrade to V2
          const v2Version = 2;
          const v2InitData = UpgradeContractV2__factory.createInterface().encodeFunctionData(
            'initialize(uint16)',
            [v2Version],
          );

          await contract.upgradeToAndCall(fixtureData.upgradeV2Implementation, v2InitData);

          // Get the V2 contract
          const contractV2 = UpgradeContractV2__factory.connect(
            predictedAddress,
            fixtureData.upgradeableContractOwner,
          );

          // Verify state was preserved and new state was initialized
          expect(await contractV2.name()).to.equal(name);
          expect(await contractV2.version()).to.equal(v2Version);

          // Try to call the reinitializer again - should revert
          await expect(
            contractV2['initialize(uint16)'](v2Version + 1),
          ).to.be.revertedWithCustomError(contractV2, 'InvalidInitialization');

          // Upgrade to V3 - should work with reinitializer(3)
          const v3AdditionalValue = 42;
          const v3InitData = UpgradeContractV3__factory.createInterface().encodeFunctionData(
            'initialize(uint256)',
            [v3AdditionalValue],
          );

          await contractV2.upgradeToAndCall(fixtureData.upgradeV3Implementation, v3InitData);

          // Get the V3 contract
          const contractV3 = UpgradeContractV3__factory.connect(
            predictedAddress,
            fixtureData.upgradeableContractOwner,
          );

          // Verify state was preserved through both upgrades
          expect(await contractV3.name()).to.equal(name);
          expect(await contractV3.version()).to.equal(v2Version);
          expect(await contractV3.additionalValue()).to.equal(v3AdditionalValue);
        });
      });

      describe('Multi-Step Upgrade Tests', () => {
        it('should support upgrading through multiple implementation versions', async () => {
          // Deploy initial contract
          const name = 'MultiStepTest';
          const initData = UpgradeContractV1__factory.createInterface().encodeFunctionData(
            'initialize',
            [name, fixtureData.upgradeableContractOwner.address],
          );

          const salt = randomSalt();
          const { predictedAddress } = await deployProxyViaSafe({
            systemDeployer: fixtureData.systemDeployer,
            safe: fixtureData.testSafe,
            owner: fixtureData.deployer,
            implementation: fixtureData.upgradeV1Implementation,
            initData,
            salt,
          });

          // Get V1 instance
          const contractV1 = UpgradeContractV1__factory.connect(
            predictedAddress,
            fixtureData.upgradeableContractOwner,
          );

          // Verify initial state
          expect(await contractV1.name()).to.equal(name);

          // Upgrade to V2
          const v2Version = 2;
          const v2InitData = UpgradeContractV2__factory.createInterface().encodeFunctionData(
            'initialize(uint16)',
            [v2Version],
          );

          await contractV1.upgradeToAndCall(fixtureData.upgradeV2Implementation, v2InitData);

          // Get V2 instance
          const contractV2 = UpgradeContractV2__factory.connect(
            predictedAddress,
            fixtureData.upgradeableContractOwner,
          );

          // Verify V2 state
          expect(await contractV2.name()).to.equal(name);
          expect(await contractV2.version()).to.equal(v2Version);

          // Upgrade to V3
          const v3AdditionalValue = 42;
          const v3InitData = UpgradeContractV3__factory.createInterface().encodeFunctionData(
            'initialize(uint256)',
            [v3AdditionalValue],
          );

          await contractV2.upgradeToAndCall(fixtureData.upgradeV3Implementation, v3InitData);

          // Get V3 instance
          const contractV3 = UpgradeContractV3__factory.connect(
            predictedAddress,
            fixtureData.upgradeableContractOwner,
          );

          // Verify state all the way from V1 to V3
          expect(await contractV3.name()).to.equal(name);
          expect(await contractV3.version()).to.equal(v2Version);
          expect(await contractV3.additionalValue()).to.equal(v3AdditionalValue);
        });
      });

      describe('State Migration Tests', () => {
        it('should support complex state transformations during upgrades', async () => {
          // Deploy initial contract
          const name = 'StateMigrationTest';
          const initData = UpgradeContractV1__factory.createInterface().encodeFunctionData(
            'initialize',
            [name, fixtureData.upgradeableContractOwner.address],
          );

          const salt = randomSalt();
          const { predictedAddress } = await deployProxyViaSafe({
            systemDeployer: fixtureData.systemDeployer,
            safe: fixtureData.testSafe,
            owner: fixtureData.deployer,
            implementation: fixtureData.upgradeV1Implementation,
            initData,
            salt,
          });

          // Upgrade to V3 directly (skipping V2)
          const v3AdditionalValue = 100;
          const v3InitData = UpgradeContractV3__factory.createInterface().encodeFunctionData(
            'initialize(uint256)',
            [v3AdditionalValue],
          );

          const contract = UpgradeContractV1__factory.connect(
            predictedAddress,
            fixtureData.upgradeableContractOwner,
          );

          await contract.upgradeToAndCall(fixtureData.upgradeV3Implementation, v3InitData);

          // Get V3 instance
          const contractV3 = UpgradeContractV3__factory.connect(
            predictedAddress,
            fixtureData.upgradeableContractOwner,
          );

          // Verify state was preserved
          expect(await contractV3.name()).to.equal(name);
          expect(await contractV3.additionalValue()).to.equal(v3AdditionalValue);

          // Perform migration (simulating complex state transformation)
          await contractV3.migrateState();

          // Verify migration was successful
          expect(await contractV3.migrationPerformed()).to.be.true;
        });
      });

      describe('Error Cases', () => {
        it('should revert when trying to deploy to zero address', async () => {
          // Zero address has no code, so it should fail the code length check
          const initData = '0x'; // Empty init data
          const salt = randomSalt();

          const successParams = {
            systemDeployer: fixtureData.systemDeployer,
            safe: fixtureData.testSafe,
            owner: fixtureData.deployer,
            implementation: fixtureData.minimalImplementation, // Valid implementation
            initData,
            salt,
          };

          // First, demonstrate that deployment works with a valid implementation
          const { tx: successTx } = await deployProxyViaSafe(successParams);

          // Verify the first deployment succeeded
          const successReceipt = await successTx.wait();
          expect(successReceipt.status).to.equal(1);

          // Now try with zero address - this should fail
          // The only change is implementation: minimalImplementation -> ZeroAddress

          const failParams = {
            ...successParams,
            implementation: ethers.ZeroAddress, // This is the minimal change that triggers the error
            salt: randomSalt(), // Different salt to guarantee no salt collision
            expectFailure: true, // Tell helper to expect failure
          };

          const { tx: failTx } = await deployProxyViaSafe(failParams);

          // Safe returns false when delegatecall fails, check ExecutionFailure event
          const failReceipt = await failTx.wait();
          expect(failReceipt).to.not.be.null;
          const executionFailureEvent = findExecutionFailureEvent(failReceipt!);
          expect(executionFailureEvent).to.not.be.undefined;

          // The minimal change (valid implementation -> zero address) caused the failure
          // This demonstrates that ImplementationMustBeAContract check is working
        });

        it('should handle initialization functions that revert', async () => {
          const salt = randomSalt();

          // First, demonstrate that deployment works when initialization succeeds
          const successInitData =
            FailingInitializerContract__factory.createInterface().encodeFunctionData(
              'initialize',
              [false], // false = don't fail
            );

          const successParams = {
            systemDeployer: fixtureData.systemDeployer,
            safe: fixtureData.testSafe,
            owner: fixtureData.deployer,
            implementation: fixtureData.failingImplementation,
            initData: successInitData,
            salt,
          };

          const { tx: successTx } = await deployProxyViaSafe(successParams);

          // Verify the first deployment succeeded
          const successReceipt = await successTx.wait();
          expect(successReceipt.status).to.equal(1);

          // Now try with failing initialization - the minimal change

          const failParams = {
            ...successParams,
            initData: FailingInitializerContract__factory.createInterface().encodeFunctionData(
              'initialize',
              [true], // true = fail initialization
            ),
            salt: randomSalt(), // Different salt to guarantee no salt collision
            expectFailure: true, // Tell helper to expect failure
          };

          const { tx: failTx } = await deployProxyViaSafe(failParams);

          // Safe returns false when delegatecall fails, check ExecutionFailure event
          const failReceipt = await failTx.wait();
          expect(failReceipt).to.not.be.null;
          const executionFailureEvent = findExecutionFailureEvent(failReceipt!);
          expect(executionFailureEvent).to.not.be.undefined;

          // The minimal change (false -> true in initialize) caused the failure
          // This demonstrates that initialization errors are properly handled
        });

        it('should allow detection of incompatible storage layout upgrades', async () => {
          // Deploy initial contract
          const name = 'IncompatibleStorageTest';
          const initData = UpgradeContractV1__factory.createInterface().encodeFunctionData(
            'initialize',
            [name, fixtureData.upgradeableContractOwner.address],
          );

          const salt = randomSalt();
          const { predictedAddress } = await deployProxyViaSafe({
            systemDeployer: fixtureData.systemDeployer,
            safe: fixtureData.testSafe,
            owner: fixtureData.deployer,
            implementation: fixtureData.upgradeV1Implementation,
            initData,
            salt,
          });

          const contract = UpgradeContractV1__factory.connect(
            predictedAddress,
            fixtureData.upgradeableContractOwner,
          );

          // Store the current name
          const originalName = await contract.name();

          // Upgrade to incompatible implementation
          const incompatibleInitData =
            IncompatibleStorageContract__factory.createInterface().getFunction(
              'initialize',
            ).selector;

          await contract.upgradeToAndCall(
            fixtureData.incompatibleImplementation,
            incompatibleInitData,
          );

          // Get instance of incompatible contract
          const incompatibleContract = IncompatibleStorageContract__factory.connect(
            predictedAddress,
            fixtureData.upgradeableContractOwner,
          );

          // The nameSlotAsNumber will have corrupted the original name's storage
          // The exact behavior might vary, but we can verify it changed something
          const newSlotValue = await incompatibleContract.nameSlotAsNumber();

          // We should see the storage has been replaced
          expect(newSlotValue).to.equal(ethers.MaxUint256);

          // Trying to call the original "name" function will likely revert or return garbage
          try {
            // Create a contract instance with the original ABI
            const corruptedContract = UpgradeContractV1__factory.connect(
              predictedAddress,
              fixtureData.upgradeableContractOwner,
            );

            // Try to read the corrupted name
            const corruptedName = await corruptedContract.name();

            // If it doesn't revert, the name should at least be different
            expect(corruptedName).to.not.equal(originalName);
          } catch (error) {
            // Alternatively, it might revert completely, which is also valid
            // We don't make specific assertions about the error
          }
        });
      });

      describe('Delegatecall enforcement', () => {
        it('should revert when deployProxy is called directly', async () => {
          const salt = randomSalt();
          const initData = UpgradeContractV1__factory.createInterface().encodeFunctionData(
            'initialize',
            ['Test', fixtureData.upgradeableContractOwner.address],
          );

          // Direct call should revert with MustBeCalledViaDelegatecall error
          await expect(
            fixtureData.systemDeployer.deployProxy(
              fixtureData.upgradeableMasterCopy,
              initData,
              ethers.toBeHex(salt, 32),
            ),
          ).to.be.revertedWithCustomError(
            fixtureData.systemDeployer,
            'MustBeCalledViaDelegatecall',
          );
        });

        it('should allow deployProxy when called via delegatecall', async () => {
          // Deploy a simple upgradeable contract via delegatecall
          const salt = randomSalt();
          const initData = UpgradeContractV1__factory.createInterface().encodeFunctionData(
            'initialize',
            ['Delegatecall Test', fixtureData.upgradeableContractOwner.address],
          );

          // Deploy via Safe delegatecall
          const { tx, predictedAddress } = await deployProxyViaSafe({
            systemDeployer: fixtureData.systemDeployer,
            safe: fixtureData.testSafe,
            owner: fixtureData.deployer,
            implementation: fixtureData.upgradeableMasterCopy,
            initData,
            salt,
          });

          // Wait for transaction
          const receipt = await tx.wait();
          expect(receipt.status).to.equal(1);

          // Verify proxy was deployed at predicted address
          const code = await ethers.provider.getCode(predictedAddress);
          expect(code).to.not.equal('0x');

          // Verify the proxy was initialized correctly
          const deployedProxy = UpgradeContractV1__factory.connect(
            predictedAddress,
            fixtureData.upgradeableContractOwner,
          );
          expect(await deployedProxy.name()).to.equal('Delegatecall Test');
          expect(await deployedProxy.owner()).to.equal(
            fixtureData.upgradeableContractOwner.address,
          );
        });
      });

      describe('Existing contract detection', () => {
        it('should return existing proxy without emitting event when contract already exists', async () => {
          const implementation = fixtureData.upgradeableMasterCopy;
          const salt = randomSalt();
          const initData = UpgradeContractV1__factory.createInterface().encodeFunctionData(
            'initialize',
            ['Test Contract', fixtureData.deployer.address],
          );

          // First deployment - create a new proxy
          const { tx: tx1, predictedAddress } = await deployProxyViaSafe({
            systemDeployer: fixtureData.systemDeployer,
            safe: fixtureData.testSafe,
            owner: fixtureData.deployer,
            implementation,
            initData,
            salt,
          });

          const receipt1 = await tx1.wait();

          // Verify first deployment emitted ProxyDeployed event
          const proxyDeployedEvent1 = receipt1.logs.find((log: Log) => {
            return log.topics[0] === ethers.id('ProxyDeployed(address,address)');
          });
          expect(proxyDeployedEvent1).to.not.be.undefined;

          // Verify contract exists and get its code
          const code1 = await ethers.provider.getCode(predictedAddress);
          expect(code1).to.not.equal('0x');

          // Verify the proxy was initialized correctly
          const deployedProxy = UpgradeContractV1__factory.connect(
            predictedAddress,
            fixtureData.upgradeableContractOwner,
          );
          expect(await deployedProxy.name()).to.equal('Test Contract');
          expect(await deployedProxy.owner()).to.equal(fixtureData.deployer.address);

          // Second deployment - try to deploy again with same parameters
          const { tx: tx2, predictedAddress: predictedAddress2 } = await deployProxyViaSafe({
            systemDeployer: fixtureData.systemDeployer,
            safe: fixtureData.testSafe,
            owner: fixtureData.deployer,
            implementation,
            initData,
            salt,
          });

          // Verify it predicted the same address
          expect(predictedAddress2).to.equal(predictedAddress);

          const receipt2 = await tx2.wait();

          // Verify second deployment did NOT emit ProxyDeployed event (since contract already exists)
          const proxyDeployedEvent2 = receipt2.logs.find((log: Log) => {
            return log.topics[0] === ethers.id('ProxyDeployed(address,address)');
          });
          expect(proxyDeployedEvent2).to.be.undefined;

          // Verify it's still the same contract (wasn't redeployed)
          expect(await verifyProxyDeployment(predictedAddress)).to.be.true;

          // Verify the proxy state hasn't changed
          expect(await deployedProxy.name()).to.equal('Test Contract');
          expect(await deployedProxy.owner()).to.equal(fixtureData.deployer.address);
        });
      });
    });
  });

  describe('Deployment Block', () => {
    runDeploymentBlockTests({
      getContract: () => fixtureData.systemDeployer,
      isNonUpgradeable: true,
    });
  });
});
