/**
 * Token Contract Tests
 * Tests ZOO and KEEPER token functionality
 */

import { test, expect } from '@playwright/test';
import ethers from 'ethers';
import { setupBlockchain, teardownBlockchain, BlockchainFixture } from '../../fixtures/blockchain';
import { deployContracts, initializeContracts, ContractsFixture } from '../../fixtures/contracts';
import { setupWallets, WalletFixture } from '../../fixtures/wallets';
import {
  assertTransactionSuccess,
  assertTokenBalance,
  assertEventEmitted
} from '../../helpers/assertions';

let blockchain: BlockchainFixture;
let contracts: ContractsFixture;
let wallets: WalletFixture;

test.describe('Token Contracts', () => {
  test.beforeAll(async () => {
    console.log('🔧 Setting up test environment...');

    // Start blockchain
    blockchain = await setupBlockchain();
    console.log('✅ Blockchain started');

    // Setup wallets
    wallets = await setupWallets(blockchain.provider);
    console.log('✅ Wallets created');

    // Deploy contracts
    contracts = await deployContracts(blockchain.provider, wallets.deployer);
    console.log('✅ Contracts deployed');
  });

  test.afterAll(async () => {
    console.log('🧹 Cleaning up test environment...');
    await teardownBlockchain(blockchain);
    console.log('✅ Cleanup complete');
  });

  test.describe('ZOO Token', () => {
    test('should have correct name and symbol', async () => {
      const name = await contracts.ZOO.name();
      const symbol = await contracts.ZOO.symbol();

      expect(name).toBe('Zoo Token');
      expect(symbol).toBe('ZOO');
    });

    test('should have 18 decimals', async () => {
      const decimals = await contracts.ZOO.decimals();
      expect(decimals).toBe(18);
    });

    test('should mint tokens to recipient', async () => {
      const amount = ethers.utils.parseEther('1000');
      const recipient = await wallets.alice.getAddress();

      const tx = await contracts.ZOO.mint(recipient, amount);
      const receipt = await assertTransactionSuccess(tx);

      // Verify balance
      await assertTokenBalance(contracts.ZOO, recipient, amount);

      console.log(`✅ Minted ${ethers.utils.formatEther(amount)} ZOO to ${recipient}`);
    });

    test('should transfer tokens between accounts', async () => {
      const transferAmount = ethers.utils.parseEther('100');
      const aliceAddress = await wallets.alice.getAddress();
      const bobAddress = await wallets.bob.getAddress();

      // Alice transfers to Bob
      const zooWithAlice = contracts.ZOO.connect(wallets.alice);
      const tx = await zooWithAlice.transfer(bobAddress, transferAmount);
      await assertTransactionSuccess(tx);

      // Verify Bob's balance
      await assertTokenBalance(contracts.ZOO, bobAddress, transferAmount);

      console.log(`✅ Transferred ${ethers.utils.formatEther(transferAmount)} ZOO from Alice to Bob`);
    });

    test('should approve and transferFrom tokens', async () => {
      const approveAmount = ethers.utils.parseEther('50');
      const transferAmount = ethers.utils.parseEther('30');
      const aliceAddress = await wallets.alice.getAddress();
      const bobAddress = await wallets.bob.getAddress();
      const charlieAddress = await wallets.charlie.getAddress();

      // Alice approves Bob to spend her tokens
      const zooWithAlice = contracts.ZOO.connect(wallets.alice);
      const approveTx = await zooWithAlice.approve(bobAddress, approveAmount);
      await assertTransactionSuccess(approveTx);

      // Verify allowance
      const allowance = await contracts.ZOO.allowance(aliceAddress, bobAddress);
      expect(allowance.eq(approveAmount)).toBe(true);

      // Bob transfers from Alice to Charlie
      const zooWithBob = contracts.ZOO.connect(wallets.bob);
      const transferTx = await zooWithBob.transferFrom(aliceAddress, charlieAddress, transferAmount);
      await assertTransactionSuccess(transferTx);

      // Verify Charlie's balance
      await assertTokenBalance(contracts.ZOO, charlieAddress, transferAmount);

      // Verify remaining allowance
      const remainingAllowance = await contracts.ZOO.allowance(aliceAddress, bobAddress);
      expect(remainingAllowance.eq(approveAmount.sub(transferAmount))).toBe(true);

      console.log(`✅ Bob transferred ${ethers.utils.formatEther(transferAmount)} ZOO from Alice to Charlie`);
    });

    test('should emit Transfer event on transfer', async () => {
      const amount = ethers.utils.parseEther('10');
      const aliceAddress = await wallets.alice.getAddress();
      const daveAddress = await wallets.dave.getAddress();

      const zooWithAlice = contracts.ZOO.connect(wallets.alice);
      const tx = await zooWithAlice.transfer(daveAddress, amount);
      const receipt = await tx.wait();

      // Verify Transfer event
      await assertEventEmitted(receipt, contracts.ZOO, 'Transfer', {
        from: aliceAddress,
        to: daveAddress,
        value: amount
      });

      console.log('✅ Transfer event emitted correctly');
    });

    test('should fail to transfer more than balance', async () => {
      const tooMuchAmount = ethers.utils.parseEther('999999999');
      const daveAddress = await wallets.dave.getAddress();
      const bobAddress = await wallets.bob.getAddress();

      const zooWithDave = contracts.ZOO.connect(wallets.dave);

      await expect(
        zooWithDave.transfer(bobAddress, tooMuchAmount)
      ).rejects.toThrow();

      console.log('✅ Transfer correctly failed for insufficient balance');
    });
  });

  test.describe('KEEPER Token', () => {
    test('should have correct name and symbol', async () => {
      const name = await contracts.KEEPER.name();
      const symbol = await contracts.KEEPER.symbol();

      expect(name).toBe('Keeper Token');
      expect(symbol).toBe('KEEPER');
    });

    test('should mint KEEPER tokens', async () => {
      const amount = ethers.utils.parseEther('500');
      const recipient = await wallets.bob.getAddress();

      const tx = await contracts.KEEPER.mint(recipient, amount);
      await assertTransactionSuccess(tx);

      await assertTokenBalance(contracts.KEEPER, recipient, amount);

      console.log(`✅ Minted ${ethers.utils.formatEther(amount)} KEEPER to ${recipient}`);
    });

    test('should transfer KEEPER tokens', async () => {
      const transferAmount = ethers.utils.parseEther('50');
      const bobAddress = await wallets.bob.getAddress();
      const charlieAddress = await wallets.charlie.getAddress();

      const keeperWithBob = contracts.KEEPER.connect(wallets.bob);
      const tx = await keeperWithBob.transfer(charlieAddress, transferAmount);
      await assertTransactionSuccess(tx);

      await assertTokenBalance(contracts.KEEPER, charlieAddress, transferAmount);

      console.log(`✅ Transferred ${ethers.utils.formatEther(transferAmount)} KEEPER`);
    });
  });

  test.describe('Token Initialization', () => {
    test('should initialize contracts with test data', async () => {
      const mintAmount = ethers.utils.parseEther('10000');
      const testRecipients = [
        await wallets.alice.getAddress(),
        await wallets.bob.getAddress()
      ];

      await initializeContracts(contracts, {
        mintAmount,
        recipients: testRecipients
      });

      // Verify both recipients received tokens
      for (const recipient of testRecipients) {
        const zooBalance = await contracts.ZOO.balanceOf(recipient);
        const keeperBalance = await contracts.KEEPER.balanceOf(recipient);

        expect(zooBalance.gte(mintAmount)).toBe(true);
        expect(keeperBalance.gte(mintAmount)).toBe(true);
      }

      console.log('✅ Contracts initialized with test data');
    });
  });

  test.describe('Token Supply', () => {
    test('should track total supply correctly', async () => {
      const initialSupply = await contracts.ZOO.totalSupply();
      const mintAmount = ethers.utils.parseEther('1000');
      const recipient = await wallets.dave.getAddress();

      await contracts.ZOO.mint(recipient, mintAmount);

      const newSupply = await contracts.ZOO.totalSupply();
      expect(newSupply.eq(initialSupply.add(mintAmount))).toBe(true);

      console.log(`✅ Total supply increased from ${ethers.utils.formatEther(initialSupply)} to ${ethers.utils.formatEther(newSupply)}`);
    });
  });
});
