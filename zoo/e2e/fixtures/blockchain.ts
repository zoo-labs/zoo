/**
 * Blockchain Fixture
 * Manages Hardhat local node lifecycle for E2E testing
 */

import { spawn, ChildProcess } from 'child_process';
import { ethers } from 'ethers';
import path from 'path';

export interface BlockchainFixture {
  provider: ethers.providers.JsonRpcProvider;
  chainId: number;
  blockNumber: number;
  hardhatProcess: ChildProcess;
}

export interface BlockchainConfig {
  port?: number;
  chainId?: number;
  accountsCount?: number;
  accountBalance?: string;
  gasPrice?: string;
  gasLimit?: number;
  blockGasLimit?: number;
  miningInterval?: number;
}

const DEFAULT_CONFIG: BlockchainConfig = {
  port: 8545,
  chainId: 31337,
  accountsCount: 20,
  accountBalance: '10000', // 10,000 ETH per account
  gasPrice: '8000000000', // 8 gwei
  gasLimit: 12500000,
  blockGasLimit: 12500000,
  miningInterval: 0 // Auto-mine
};

/**
 * Start Hardhat local blockchain
 */
export async function setupBlockchain(
  config: BlockchainConfig = {}
): Promise<BlockchainFixture> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  console.log('🔗 Starting Hardhat blockchain...');
  console.log(`   Port: ${finalConfig.port}`);
  console.log(`   Chain ID: ${finalConfig.chainId}`);
  console.log(`   Accounts: ${finalConfig.accountsCount}`);
  console.log(`   Balance per account: ${finalConfig.accountBalance} ETH`);

  // Start Hardhat node
  const contractsPath = path.join(__dirname, '../../contracts');
  const hardhatProcess = spawn(
    'npm',
    ['run', 'chain'],
    {
      cwd: contractsPath,
      stdio: 'pipe',
      shell: true
    }
  );

  // Capture output
  let output = '';
  hardhatProcess.stdout?.on('data', (data) => {
    output += data.toString();
    // Log important messages
    if (data.toString().includes('Started HTTP')) {
      console.log('   ✅ Hardhat node started');
    }
  });

  hardhatProcess.stderr?.on('data', (data) => {
    console.error(`   ⚠️  Hardhat stderr: ${data.toString()}`);
  });

  hardhatProcess.on('error', (error) => {
    console.error(`   ❌ Hardhat process error: ${error.message}`);
  });

  hardhatProcess.on('exit', (code, signal) => {
    if (code !== null && code !== 0) {
      console.error(`   ❌ Hardhat exited with code ${code}`);
    }
    if (signal) {
      console.log(`   ⚠️  Hardhat killed with signal ${signal}`);
    }
  });

  // Wait for node to be ready
  const provider = new ethers.providers.JsonRpcProvider(
    `http://localhost:${finalConfig.port}`
  );

  await waitForBlockchain(provider, 30000); // 30s timeout

  // Get chain metadata
  const network = await provider.getNetwork();
  const blockNumber = await provider.getBlockNumber();

  console.log(`   ✅ Blockchain ready (chain ID: ${network.chainId}, block: ${blockNumber})`);

  return {
    provider,
    chainId: network.chainId,
    blockNumber,
    hardhatProcess
  };
}

/**
 * Wait for blockchain to be ready
 */
async function waitForBlockchain(
  provider: ethers.providers.JsonRpcProvider,
  timeout: number
): Promise<void> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    try {
      await provider.getBlockNumber();
      return; // Success!
    } catch (error) {
      // Not ready yet, wait 500ms and retry
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  throw new Error(`Blockchain failed to start within ${timeout}ms`);
}

/**
 * Stop Hardhat blockchain
 */
export async function teardownBlockchain(
  fixture: BlockchainFixture
): Promise<void> {
  console.log('🛑 Stopping Hardhat blockchain...');

  // Kill Hardhat process
  if (fixture.hardhatProcess && !fixture.hardhatProcess.killed) {
    fixture.hardhatProcess.kill('SIGTERM');

    // Wait for graceful shutdown
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Force kill if still running
    if (!fixture.hardhatProcess.killed) {
      console.log('   ⚠️  Force killing Hardhat process');
      fixture.hardhatProcess.kill('SIGKILL');
    }
  }

  console.log('   ✅ Blockchain stopped');
}

/**
 * Reset blockchain state (mine empty blocks to advance time)
 */
export async function resetBlockchain(
  provider: ethers.providers.JsonRpcProvider
): Promise<void> {
  console.log('🔄 Resetting blockchain state...');

  // Reset Hardhat's internal state
  await provider.send('hardhat_reset', []);

  console.log('   ✅ Blockchain reset');
}

/**
 * Mine blocks (useful for testing time-dependent contracts)
 */
export async function mineBlocks(
  provider: ethers.providers.JsonRpcProvider,
  count: number
): Promise<void> {
  console.log(`⛏️  Mining ${count} blocks...`);

  for (let i = 0; i < count; i++) {
    await provider.send('evm_mine', []);
  }

  const blockNumber = await provider.getBlockNumber();
  console.log(`   ✅ Mined to block ${blockNumber}`);
}

/**
 * Set next block timestamp (useful for testing time locks)
 */
export async function setNextBlockTimestamp(
  provider: ethers.providers.JsonRpcProvider,
  timestamp: number
): Promise<void> {
  console.log(`⏰ Setting next block timestamp to ${new Date(timestamp * 1000).toISOString()}`);

  await provider.send('evm_setNextBlockTimestamp', [timestamp]);
  await provider.send('evm_mine', []);

  console.log('   ✅ Timestamp set');
}

/**
 * Increase blockchain time (useful for testing vesting/staking)
 */
export async function increaseTime(
  provider: ethers.providers.JsonRpcProvider,
  seconds: number
): Promise<void> {
  console.log(`⏩ Increasing time by ${seconds} seconds`);

  await provider.send('evm_increaseTime', [seconds]);
  await provider.send('evm_mine', []);

  console.log('   ✅ Time increased');
}

/**
 * Take snapshot of blockchain state
 */
export async function snapshot(
  provider: ethers.providers.JsonRpcProvider
): Promise<string> {
  const snapshotId = await provider.send('evm_snapshot', []);
  console.log(`📸 Snapshot taken: ${snapshotId}`);
  return snapshotId;
}

/**
 * Restore blockchain state from snapshot
 */
export async function restore(
  provider: ethers.providers.JsonRpcProvider,
  snapshotId: string
): Promise<void> {
  console.log(`♻️  Restoring snapshot: ${snapshotId}`);
  await provider.send('evm_revert', [snapshotId]);
  console.log('   ✅ Snapshot restored');
}
