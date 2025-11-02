/**
 * Contracts Fixture
 * Manages smart contract deployment and interaction for E2E testing
 */

import { ethers, Contract } from 'ethers';
import { spawn, ChildProcess } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ContractsFixture {
  ZOO: Contract;
  KEEPER: Contract;
  ZKStaking: Contract;
  Governor: Contract;
  Timelock: Contract;
  addresses: Record<string, string>;
  deploymentReceipts: Record<string, ethers.providers.TransactionReceipt>;
}

export interface DeploymentInfo {
  address: string;
  abi: any[];
  transactionHash: string;
  blockNumber: number;
}

/**
 * Deploy all Zoo ecosystem contracts
 */
export async function deployContracts(
  provider: ethers.providers.JsonRpcProvider,
  deployer?: ethers.Wallet
): Promise<ContractsFixture> {
  console.log('📜 Deploying contracts...');

  // Use provided deployer or get first account from provider
  const signer = deployer || provider.getSigner(0);
  const signerAddress = await signer.getAddress();
  console.log(`   Deployer: ${signerAddress}`);

  // Run Hardhat deployment script
  const contractsPath = path.join(__dirname, '../../contracts');
  await runHardhatDeploy(contractsPath);

  // Load deployment artifacts
  const contracts = await loadDeployedContracts(provider, signer);

  console.log('   ✅ All contracts deployed');
  console.log(`      ZOO: ${contracts.addresses.ZOO}`);
  console.log(`      KEEPER: ${contracts.addresses.KEEPER}`);
  console.log(`      ZKStaking: ${contracts.addresses.ZKStaking}`);
  console.log(`      Governor: ${contracts.addresses.Governor}`);
  console.log(`      Timelock: ${contracts.addresses.Timelock}`);

  return contracts;
}

/**
 * Run Hardhat deploy script
 */
async function runHardhatDeploy(contractsPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log('   Running hardhat deploy...');

    const deployProcess = spawn(
      'npm',
      ['run', 'deploy'],
      {
        cwd: contractsPath,
        stdio: 'pipe',
        shell: true
      }
    );

    let output = '';
    deployProcess.stdout?.on('data', (data) => {
      output += data.toString();
    });

    deployProcess.stderr?.on('data', (data) => {
      console.error(`   ⚠️  Deploy stderr: ${data.toString()}`);
    });

    deployProcess.on('close', (code) => {
      if (code === 0) {
        console.log('   ✅ Contracts deployed');
        resolve();
      } else {
        reject(new Error(`Deployment failed with code ${code}\n${output}`));
      }
    });

    deployProcess.on('error', (error) => {
      reject(new Error(`Deployment process error: ${error.message}`));
    });
  });
}

/**
 * Load deployed contracts from artifacts
 */
async function loadDeployedContracts(
  provider: ethers.providers.JsonRpcProvider,
  signer: ethers.Signer
): Promise<ContractsFixture> {
  const contractsPath = path.join(__dirname, '../../contracts');
  const deploymentsPath = path.join(contractsPath, 'deployments/localhost');

  // Load contract addresses and ABIs
  const contractNames = ['ZOO', 'KEEPER', 'ZKStaking', 'ZooGovernor', 'Timelock'];
  const contracts: Record<string, Contract> = {};
  const addresses: Record<string, string> = {};
  const deploymentReceipts: Record<string, ethers.providers.TransactionReceipt> = {};

  for (const name of contractNames) {
    const deploymentFile = path.join(deploymentsPath, `${name}.json`);

    if (!fs.existsSync(deploymentFile)) {
      throw new Error(`Deployment file not found: ${deploymentFile}`);
    }

    const deployment: DeploymentInfo = JSON.parse(
      fs.readFileSync(deploymentFile, 'utf8')
    );

    const contract = new Contract(deployment.address, deployment.abi, signer);
    const key = name === 'ZooGovernor' ? 'Governor' : name;

    contracts[key] = contract;
    addresses[key] = deployment.address;

    // Get deployment receipt
    const receipt = await provider.getTransactionReceipt(deployment.transactionHash);
    deploymentReceipts[key] = receipt;
  }

  return {
    ZOO: contracts.ZOO,
    KEEPER: contracts.KEEPER,
    ZKStaking: contracts.ZKStaking,
    Governor: contracts.Governor,
    Timelock: contracts.Timelock,
    addresses,
    deploymentReceipts
  };
}

/**
 * Initialize contracts with test data
 */
export async function initializeContracts(
  contracts: ContractsFixture,
  config: {
    mintAmount?: ethers.BigNumber;
    recipients?: string[];
  } = {}
): Promise<void> {
  console.log('🎬 Initializing contracts...');

  const {
    mintAmount = ethers.utils.parseEther('1000000'), // 1M tokens
    recipients = []
  } = config;

  // Mint tokens to recipients
  if (recipients.length > 0) {
    console.log(`   Minting ${ethers.utils.formatEther(mintAmount)} tokens to ${recipients.length} recipients...`);

    for (const recipient of recipients) {
      // Mint ZOO
      const zooTx = await contracts.ZOO.mint(recipient, mintAmount);
      await zooTx.wait();

      // Mint KEEPER
      const keeperTx = await contracts.KEEPER.mint(recipient, mintAmount);
      await keeperTx.wait();

      console.log(`      ✅ ${recipient}: ${ethers.utils.formatEther(mintAmount)} ZOO + KEEPER`);
    }
  }

  console.log('   ✅ Contracts initialized');
}

/**
 * Get contract state snapshot
 */
export async function getContractState(
  contracts: ContractsFixture
): Promise<Record<string, any>> {
  console.log('📊 Getting contract state...');

  const state = {
    ZOO: {
      totalSupply: await contracts.ZOO.totalSupply(),
      name: await contracts.ZOO.name(),
      symbol: await contracts.ZOO.symbol()
    },
    KEEPER: {
      totalSupply: await contracts.KEEPER.totalSupply(),
      name: await contracts.KEEPER.name(),
      symbol: await contracts.KEEPER.symbol()
    },
    ZKStaking: {
      // Add staking state queries
    },
    Governor: {
      // Add governance state queries
      votingDelay: await contracts.Governor.votingDelay(),
      votingPeriod: await contracts.Governor.votingPeriod(),
      proposalThreshold: await contracts.Governor.proposalThreshold()
    }
  };

  console.log('   ✅ State captured');
  return state;
}

/**
 * Wait for transaction confirmation
 */
export async function waitForTransaction(
  tx: ethers.providers.TransactionResponse,
  confirmations: number = 1
): Promise<ethers.providers.TransactionReceipt> {
  console.log(`⏳ Waiting for transaction ${tx.hash} (${confirmations} confirmations)...`);

  const receipt = await tx.wait(confirmations);

  if (receipt.status === 1) {
    console.log(`   ✅ Transaction confirmed (gas used: ${receipt.gasUsed})`);
  } else {
    console.log(`   ❌ Transaction failed`);
  }

  return receipt;
}

/**
 * Estimate gas for transaction
 */
export async function estimateGas(
  contract: Contract,
  method: string,
  ...args: any[]
): Promise<ethers.BigNumber> {
  const gasEstimate = await contract.estimateGas[method](...args);
  console.log(`⛽ Gas estimate for ${method}: ${gasEstimate.toString()}`);
  return gasEstimate;
}

/**
 * Get token balance
 */
export async function getTokenBalance(
  token: Contract,
  address: string
): Promise<ethers.BigNumber> {
  const balance = await token.balanceOf(address);
  return balance;
}

/**
 * Get formatted token balance
 */
export async function getFormattedBalance(
  token: Contract,
  address: string,
  decimals: number = 18
): Promise<string> {
  const balance = await getTokenBalance(token, address);
  return ethers.utils.formatUnits(balance, decimals);
}

/**
 * Approve token spending
 */
export async function approveToken(
  token: Contract,
  spender: string,
  amount: ethers.BigNumber
): Promise<ethers.providers.TransactionReceipt> {
  console.log(`✅ Approving ${spender} to spend ${ethers.utils.formatEther(amount)} tokens...`);

  const tx = await token.approve(spender, amount);
  return await waitForTransaction(tx);
}

/**
 * Transfer tokens
 */
export async function transferToken(
  token: Contract,
  to: string,
  amount: ethers.BigNumber
): Promise<ethers.providers.TransactionReceipt> {
  console.log(`💸 Transferring ${ethers.utils.formatEther(amount)} tokens to ${to}...`);

  const tx = await token.transfer(to, amount);
  return await waitForTransaction(tx);
}
