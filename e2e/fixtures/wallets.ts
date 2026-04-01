/**
 * Wallets Fixture
 * Manages test wallet creation and funding for E2E testing
 */

import { ethers } from 'ethers';

export interface WalletFixture {
  deployer: ethers.Wallet;
  alice: ethers.Wallet;
  bob: ethers.Wallet;
  charlie: ethers.Wallet;
  dave: ethers.Wallet;
  wallets: ethers.Wallet[];
}

export interface WalletConfig {
  count?: number;
  fundingAmount?: ethers.BigNumber;
}

/**
 * Standard test mnemonic (DO NOT use in production!)
 */
const TEST_MNEMONIC = 'test test test test test test test test test test test junk';

/**
 * Create test wallets from mnemonic
 */
export async function setupWallets(
  provider: ethers.providers.JsonRpcProvider,
  config: WalletConfig = {}
): Promise<WalletFixture> {
  console.log('👛 Setting up test wallets...');

  const {
    count = 5,
    fundingAmount = ethers.utils.parseEther('100') // 100 ETH per wallet
  } = config;

  // Create wallets from mnemonic
  const wallets: ethers.Wallet[] = [];
  for (let i = 0; i < count; i++) {
    const path = `m/44'/60'/0'/0/${i}`;
    const wallet = ethers.Wallet.fromMnemonic(TEST_MNEMONIC, path).connect(provider);
    wallets.push(wallet);
  }

  // Fund wallets (Hardhat gives 10,000 ETH to first 20 accounts by default)
  // So we just verify they have funds
  for (const wallet of wallets) {
    const balance = await wallet.getBalance();
    console.log(`   ${await wallet.getAddress()}: ${ethers.utils.formatEther(balance)} ETH`);
  }

  console.log(`   ✅ ${wallets.length} wallets ready`);

  return {
    deployer: wallets[0],
    alice: wallets[1],
    bob: wallets[2],
    charlie: wallets[3],
    dave: wallets[4],
    wallets
  };
}

/**
 * Get wallet by name
 */
export function getWallet(
  fixture: WalletFixture,
  name: 'deployer' | 'alice' | 'bob' | 'charlie' | 'dave'
): ethers.Wallet {
  return fixture[name];
}

/**
 * Get wallet address
 */
export async function getAddress(wallet: ethers.Wallet): Promise<string> {
  return await wallet.getAddress();
}

/**
 * Get wallet balance (ETH)
 */
export async function getBalance(wallet: ethers.Wallet): Promise<ethers.BigNumber> {
  return await wallet.getBalance();
}

/**
 * Get formatted wallet balance
 */
export async function getFormattedBalance(wallet: ethers.Wallet): Promise<string> {
  const balance = await getBalance(wallet);
  return ethers.utils.formatEther(balance);
}

/**
 * Fund wallet with ETH
 */
export async function fundWallet(
  from: ethers.Wallet,
  to: string,
  amount: ethers.BigNumber
): Promise<ethers.providers.TransactionReceipt> {
  console.log(`💰 Funding ${to} with ${ethers.utils.formatEther(amount)} ETH...`);

  const tx = await from.sendTransaction({
    to,
    value: amount
  });

  const receipt = await tx.wait();
  console.log(`   ✅ Transaction confirmed: ${receipt.transactionHash}`);

  return receipt;
}

/**
 * Get private key (for MetaMask import)
 */
export function getPrivateKey(wallet: ethers.Wallet): string {
  return wallet.privateKey;
}

/**
 * Get all wallet addresses
 */
export async function getAllAddresses(
  fixture: WalletFixture
): Promise<Record<string, string>> {
  return {
    deployer: await fixture.deployer.getAddress(),
    alice: await fixture.alice.getAddress(),
    bob: await fixture.bob.getAddress(),
    charlie: await fixture.charlie.getAddress(),
    dave: await fixture.dave.getAddress()
  };
}

/**
 * Print wallet summary
 */
export async function printWalletSummary(
  fixture: WalletFixture
): Promise<void> {
  console.log('\n📋 Wallet Summary:');
  console.log('─'.repeat(80));

  const names = ['deployer', 'alice', 'bob', 'charlie', 'dave'] as const;
  for (const name of names) {
    const wallet = fixture[name];
    const address = await wallet.getAddress();
    const balance = await wallet.getBalance();
    console.log(`${name.padEnd(10)} ${address}  ${ethers.utils.formatEther(balance).padStart(10)} ETH`);
  }

  console.log('─'.repeat(80) + '\n');
}

/**
 * Import wallet into MetaMask (returns import instructions)
 */
export function getMetaMaskImportInstructions(
  wallet: ethers.Wallet,
  name: string
): string {
  return `
To import ${name} into MetaMask:
1. Open MetaMask
2. Click account icon → Import Account
3. Select "Private Key"
4. Paste: ${wallet.privateKey}
5. Click "Import"
  `.trim();
}

/**
 * Sign message
 */
export async function signMessage(
  wallet: ethers.Wallet,
  message: string
): Promise<string> {
  return await wallet.signMessage(message);
}

/**
 * Sign typed data (EIP-712)
 */
export async function signTypedData(
  wallet: ethers.Wallet,
  domain: ethers.TypedDataDomain,
  types: Record<string, ethers.TypedDataField[]>,
  value: Record<string, any>
): Promise<string> {
  return await wallet._signTypedData(domain, types, value);
}

/**
 * Verify signature
 */
export function verifyMessage(
  message: string,
  signature: string
): string {
  return ethers.utils.verifyMessage(message, signature);
}
