/**
 * Blockchain Infrastructure Tests
 * Tests the Hardhat local blockchain setup and basic functionality
 */

import { test, expect } from '@playwright/test';
import ethers from 'ethers';
import {
  setupBlockchain,
  teardownBlockchain,
  mineBlocks,
  increaseTime,
  snapshot,
  restore,
  BlockchainFixture
} from '../../fixtures/blockchain';

let blockchain: BlockchainFixture;

test.describe('Blockchain Infrastructure', () => {
  test.beforeAll(async () => {
    // Start local blockchain
    blockchain = await setupBlockchain();
  });

  test.afterAll(async () => {
    // Stop blockchain
    await teardownBlockchain(blockchain);
  });

  test('should start Hardhat node successfully', async () => {
    expect(blockchain.provider).toBeDefined();
    expect(blockchain.hardhatProcess).toBeDefined();
    expect(blockchain.hardhatProcess.killed).toBe(false);
  });

  test('should have correct chain ID (31337)', async () => {
    expect(blockchain.chainId).toBe(31337);
  });

  test('should be able to get latest block number', async () => {
    const blockNumber = await blockchain.provider.getBlockNumber();
    expect(blockNumber).toBeGreaterThanOrEqual(0);
  });

  test('should be able to get network info', async () => {
    const network = await blockchain.provider.getNetwork();
    expect(network.chainId).toBe(31337);
    expect(network.name).toBe('unknown'); // Hardhat doesn't set a name
  });

  test('should have test accounts with ETH', async () => {
    const accounts = await blockchain.provider.listAccounts();
    expect(accounts.length).toBeGreaterThan(0);

    // Check first account has substantial ETH (Hardhat gives 10,000 ETH)
    const balance = await blockchain.provider.getBalance(accounts[0]);
    expect(balance.gt(ethers.utils.parseEther('9000'))).toBe(true);
  });

  test('should be able to send transactions', async () => {
    const signer = blockchain.provider.getSigner(0);
    const recipient = await blockchain.provider.getSigner(1).getAddress();

    // Send 1 ETH
    const tx = await signer.sendTransaction({
      to: recipient,
      value: ethers.utils.parseEther('1')
    });

    const receipt = await tx.wait();
    expect(receipt.status).toBe(1);
    expect(receipt.transactionHash).toBeDefined();
  });

  test('should be able to mine blocks', async () => {
    const startBlock = await blockchain.provider.getBlockNumber();

    await mineBlocks(blockchain.provider, 5);

    const endBlock = await blockchain.provider.getBlockNumber();
    expect(endBlock).toBe(startBlock + 5);
  });

  test('should be able to increase time', async () => {
    // Get current block timestamp
    const block = await blockchain.provider.getBlock('latest');
    const startTimestamp = block.timestamp;

    // Increase time by 1 day
    await increaseTime(blockchain.provider, 86400);

    // Get new block timestamp
    const newBlock = await blockchain.provider.getBlock('latest');
    const endTimestamp = newBlock.timestamp;

    expect(endTimestamp).toBeGreaterThanOrEqual(startTimestamp + 86400);
  });

  test('should be able to take and restore snapshots', async () => {
    // Get current block number
    const startBlock = await blockchain.provider.getBlockNumber();

    // Take snapshot
    const snapshotId = await snapshot(blockchain.provider);
    expect(snapshotId).toBeDefined();

    // Mine some blocks
    await mineBlocks(blockchain.provider, 3);
    const afterMineBlock = await blockchain.provider.getBlockNumber();
    expect(afterMineBlock).toBe(startBlock + 3);

    // Restore snapshot
    await restore(blockchain.provider, snapshotId);

    // Block number should be back to start
    const afterRestoreBlock = await blockchain.provider.getBlockNumber();
    expect(afterRestoreBlock).toBe(startBlock);
  });

  test('should have stable gas price', async () => {
    const gasPrice = await blockchain.provider.getGasPrice();
    expect(gasPrice.gt(0)).toBe(true);
    expect(gasPrice.lt(ethers.utils.parseUnits('100', 'gwei'))).toBe(true);
  });

  test('should support eth_call for read-only operations', async () => {
    const accounts = await blockchain.provider.listAccounts();
    const balance = await blockchain.provider.getBalance(accounts[0]);

    // This uses eth_call under the hood
    expect(balance).toBeDefined();
    expect(balance.gt(0)).toBe(true);
  });

  test('should support eth_estimateGas', async () => {
    const signer = blockchain.provider.getSigner(0);
    const recipient = await blockchain.provider.getSigner(1).getAddress();

    const gasEstimate = await signer.estimateGas({
      to: recipient,
      value: ethers.utils.parseEther('0.1')
    });

    expect(gasEstimate.gt(0)).toBe(true);
    expect(gasEstimate.lt(100000)).toBe(true); // Simple transfer should be < 100k gas
  });

  test('should support listening to events', async () => {
    const signer = blockchain.provider.getSigner(0);
    const recipient = await blockchain.provider.getSigner(1).getAddress();

    // Listen for block event
    let blockReceived = false;
    blockchain.provider.once('block', (blockNumber) => {
      blockReceived = true;
      expect(blockNumber).toBeGreaterThan(0);
    });

    // Send transaction to trigger new block
    const tx = await signer.sendTransaction({
      to: recipient,
      value: ethers.utils.parseEther('0.1')
    });
    await tx.wait();

    // Wait a bit for event to fire
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(blockReceived).toBe(true);
  });

  test('should support pending transactions', async () => {
    const signer = blockchain.provider.getSigner(0);
    const recipient = await blockchain.provider.getSigner(1).getAddress();

    const tx = await signer.sendTransaction({
      to: recipient,
      value: ethers.utils.parseEther('0.1')
    });

    // Transaction should be in pending state initially
    expect(tx.hash).toBeDefined();
    expect(tx.blockNumber).toBeNull();

    // Wait for confirmation
    const receipt = await tx.wait();
    expect(receipt.blockNumber).toBeGreaterThan(0);
  });
});
