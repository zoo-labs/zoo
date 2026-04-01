/**
 * Custom Assertions
 * Helper functions for common test assertions
 */

import { expect } from '@playwright/test';
import { ethers, Contract } from 'ethers';

/**
 * Assert transaction succeeded
 */
export async function assertTransactionSuccess(
  tx: ethers.providers.TransactionResponse
): Promise<ethers.providers.TransactionReceipt> {
  const receipt = await tx.wait();
  expect(receipt.status).toBe(1);
  expect(receipt.transactionHash).toBeDefined();
  expect(receipt.blockNumber).toBeGreaterThan(0);
  return receipt;
}

/**
 * Assert transaction failed
 */
export async function assertTransactionFails(
  txPromise: Promise<ethers.providers.TransactionResponse>
): Promise<void> {
  await expect(txPromise).rejects.toThrow();
}

/**
 * Assert token balance
 */
export async function assertTokenBalance(
  token: Contract,
  address: string,
  expectedBalance: ethers.BigNumber,
  tolerance: ethers.BigNumber = ethers.BigNumber.from(0)
): Promise<void> {
  const actualBalance = await token.balanceOf(address);

  if (tolerance.isZero()) {
    expect(actualBalance.eq(expectedBalance)).toBe(true);
  } else {
    const diff = actualBalance.sub(expectedBalance).abs();
    expect(diff.lte(tolerance)).toBe(true);
  }
}

/**
 * Assert ETH balance
 */
export async function assertEthBalance(
  provider: ethers.providers.JsonRpcProvider,
  address: string,
  expectedBalance: ethers.BigNumber,
  tolerance: ethers.BigNumber = ethers.utils.parseEther('0.01') // 0.01 ETH tolerance for gas
): Promise<void> {
  const actualBalance = await provider.getBalance(address);
  const diff = actualBalance.sub(expectedBalance).abs();
  expect(diff.lte(tolerance)).toBe(true);
}

/**
 * Assert event emitted
 */
export async function assertEventEmitted(
  receipt: ethers.providers.TransactionReceipt,
  contract: Contract,
  eventName: string,
  expectedArgs?: Record<string, any>
): Promise<void> {
  const events = receipt.logs
    .map(log => {
      try {
        return contract.interface.parseLog(log);
      } catch {
        return null;
      }
    })
    .filter((e): e is ethers.utils.LogDescription => e !== null);

  const event = events.find(e => e.name === eventName);
  expect(event).toBeDefined();

  if (expectedArgs && event) {
    for (const [key, value] of Object.entries(expectedArgs)) {
      expect(event.args[key]).toEqual(value);
    }
  }
}

/**
 * Assert block number increased
 */
export async function assertBlockNumberIncreased(
  provider: ethers.providers.JsonRpcProvider,
  startBlock: number,
  minIncrease: number = 1
): Promise<void> {
  const currentBlock = await provider.getBlockNumber();
  expect(currentBlock).toBeGreaterThanOrEqual(startBlock + minIncrease);
}

/**
 * Assert timestamp increased
 */
export async function assertTimestampIncreased(
  provider: ethers.providers.JsonRpcProvider,
  startTimestamp: number,
  minIncrease: number = 1
): Promise<void> {
  const block = await provider.getBlock('latest');
  expect(block.timestamp).toBeGreaterThanOrEqual(startTimestamp + minIncrease);
}

/**
 * Assert contract state
 */
export async function assertContractState(
  contract: Contract,
  method: string,
  expectedValue: any,
  ...args: any[]
): Promise<void> {
  const actualValue = await contract[method](...args);
  expect(actualValue).toEqual(expectedValue);
}

/**
 * Assert wallet has sufficient ETH
 */
export async function assertSufficientEth(
  wallet: ethers.Wallet,
  minBalance: ethers.BigNumber = ethers.utils.parseEther('1')
): Promise<void> {
  const balance = await wallet.getBalance();
  expect(balance.gte(minBalance)).toBe(true);
}

/**
 * Assert app is running
 */
export async function assertAppRunning(url: string): Promise<void> {
  const fetch = (await import('node-fetch')).default;

  try {
    const response = await fetch(url, { method: 'HEAD' });
    expect(response.ok || response.status === 404).toBe(true);
  } catch (error) {
    throw new Error(`App not running at ${url}: ${error}`);
  }
}

/**
 * Assert governance proposal state
 */
export async function assertProposalState(
  governor: Contract,
  proposalId: ethers.BigNumber,
  expectedState: number // 0=Pending, 1=Active, 2=Canceled, 3=Defeated, 4=Succeeded, 5=Queued, 6=Expired, 7=Executed
): Promise<void> {
  const state = await governor.state(proposalId);
  expect(state).toBe(expectedState);
}

/**
 * Assert staking balance
 */
export async function assertStakingBalance(
  stakingContract: Contract,
  address: string,
  expectedStaked: ethers.BigNumber
): Promise<void> {
  const staked = await stakingContract.balanceOf(address);
  expect(staked.eq(expectedStaked)).toBe(true);
}
