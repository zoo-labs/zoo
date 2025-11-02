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

  test.describe('ZK Staking Token', () => {
    test('should have correct name and symbol', async () => {
      const name = await contracts.ZKStaking.name();
      const symbol = await contracts.ZKStaking.symbol();

      expect(name).toContain('ZK');
      expect(symbol).toContain('ZK');

      console.log(`✅ ZK Staking: ${name} (${symbol})`);
    });

    test('should have 18 decimals', async () => {
      const decimals = await contracts.ZKStaking.decimals();
      expect(decimals).toBe(18);

      console.log('✅ ZK Staking has 18 decimals');
    });

    test('should mint ZK tokens to recipient', async () => {
      const amount = ethers.utils.parseEther('5000');
      const recipient = await wallets.alice.getAddress();

      const tx = await contracts.ZKStaking.mint(recipient, amount);
      const receipt = await assertTransactionSuccess(tx);

      // Verify balance
      await assertTokenBalance(contracts.ZKStaking, recipient, amount);

      console.log(`✅ Minted ${ethers.utils.formatEther(amount)} ZK to ${recipient}`);
    });

    test('should transfer ZK tokens between accounts', async () => {
      const transferAmount = ethers.utils.parseEther('500');
      const aliceAddress = await wallets.alice.getAddress();
      const bobAddress = await wallets.bob.getAddress();

      // Alice transfers to Bob
      const zkWithAlice = contracts.ZKStaking.connect(wallets.alice);
      const tx = await zkWithAlice.transfer(bobAddress, transferAmount);
      await assertTransactionSuccess(tx);

      // Verify Bob's balance
      await assertTokenBalance(contracts.ZKStaking, bobAddress, transferAmount);

      console.log(`✅ Transferred ${ethers.utils.formatEther(transferAmount)} ZK from Alice to Bob`);
    });

    test('should approve and transferFrom ZK tokens', async () => {
      const approveAmount = ethers.utils.parseEther('200');
      const transferAmount = ethers.utils.parseEther('100');
      const aliceAddress = await wallets.alice.getAddress();
      const bobAddress = await wallets.bob.getAddress();
      const charlieAddress = await wallets.charlie.getAddress();

      // Alice approves Bob
      const zkWithAlice = contracts.ZKStaking.connect(wallets.alice);
      const approveTx = await zkWithAlice.approve(bobAddress, approveAmount);
      await assertTransactionSuccess(approveTx);

      // Verify allowance
      const allowance = await contracts.ZKStaking.allowance(aliceAddress, bobAddress);
      expect(allowance.eq(approveAmount)).toBe(true);

      // Bob transfers from Alice to Charlie
      const zkWithBob = contracts.ZKStaking.connect(wallets.bob);
      const transferTx = await zkWithBob.transferFrom(aliceAddress, charlieAddress, transferAmount);
      await assertTransactionSuccess(transferTx);

      // Verify Charlie's balance
      const charlieBalance = await contracts.ZKStaking.balanceOf(charlieAddress);
      expect(charlieBalance.gte(transferAmount)).toBe(true);

      console.log(`✅ Bob transferred ${ethers.utils.formatEther(transferAmount)} ZK from Alice to Charlie`);
    });

    test('should emit Transfer event on ZK transfer', async () => {
      const amount = ethers.utils.parseEther('50');
      const aliceAddress = await wallets.alice.getAddress();
      const daveAddress = await wallets.dave.getAddress();

      const zkWithAlice = contracts.ZKStaking.connect(wallets.alice);
      const tx = await zkWithAlice.transfer(daveAddress, amount);
      const receipt = await tx.wait();

      // Verify Transfer event
      await assertEventEmitted(receipt, contracts.ZKStaking, 'Transfer', {
        from: aliceAddress,
        to: daveAddress,
        value: amount
      });

      console.log('✅ ZK Transfer event emitted correctly');
    });

    test('should track ZK total supply', async () => {
      const initialSupply = await contracts.ZKStaking.totalSupply();
      const mintAmount = ethers.utils.parseEther('1000');
      const recipient = await wallets.dave.getAddress();

      await contracts.ZKStaking.mint(recipient, mintAmount);

      const newSupply = await contracts.ZKStaking.totalSupply();
      expect(newSupply.eq(initialSupply.add(mintAmount))).toBe(true);

      console.log(`✅ ZK total supply increased from ${ethers.utils.formatEther(initialSupply)} to ${ethers.utils.formatEther(newSupply)}`);
    });

    test('should fail to transfer more ZK than balance', async () => {
      const tooMuchAmount = ethers.utils.parseEther('999999999');
      const daveAddress = await wallets.dave.getAddress();
      const bobAddress = await wallets.bob.getAddress();

      const zkWithDave = contracts.ZKStaking.connect(wallets.dave);

      await expect(
        zkWithDave.transfer(bobAddress, tooMuchAmount)
      ).rejects.toThrow();

      console.log('✅ ZK transfer correctly failed for insufficient balance');
    });
  });

  test.describe('All Three Tokens Comparison', () => {
    test('should have all three tokens deployed', async () => {
      expect(contracts.ZOO.address).toBeDefined();
      expect(contracts.KEEPER.address).toBeDefined();
      expect(contracts.ZKStaking.address).toBeDefined();

      console.log(`✅ ZOO: ${contracts.ZOO.address}`);
      console.log(`✅ KEEPER: ${contracts.KEEPER.address}`);
      console.log(`✅ ZK: ${contracts.ZKStaking.address}`);
    });

    test('should have different addresses', async () => {
      expect(contracts.ZOO.address).not.toBe(contracts.KEEPER.address);
      expect(contracts.ZOO.address).not.toBe(contracts.ZKStaking.address);
      expect(contracts.KEEPER.address).not.toBe(contracts.ZKStaking.address);

      console.log('✅ All three tokens have unique addresses');
    });

    test('should all support ERC20 interface', async () => {
      // Check each token has required ERC20 methods
      const zooName = await contracts.ZOO.name();
      const keeperName = await contracts.KEEPER.name();
      const zkName = await contracts.ZKStaking.name();

      expect(zooName).toBeDefined();
      expect(keeperName).toBeDefined();
      expect(zkName).toBeDefined();

      console.log('✅ All tokens support ERC20 interface');
    });

    test('should track balances across all tokens', async () => {
      const aliceAddress = await wallets.alice.getAddress();

      const zooBalance = await contracts.ZOO.balanceOf(aliceAddress);
      const keeperBalance = await contracts.KEEPER.balanceOf(aliceAddress);
      const zkBalance = await contracts.ZKStaking.balanceOf(aliceAddress);

      console.log(`✅ Alice balances:`);
      console.log(`   ZOO: ${ethers.utils.formatEther(zooBalance)}`);
      console.log(`   KEEPER: ${ethers.utils.formatEther(keeperBalance)}`);
      console.log(`   ZK: ${ethers.utils.formatEther(zkBalance)}`);

      // All should have some balance after our tests
      expect(zooBalance.gt(0) || keeperBalance.gt(0) || zkBalance.gt(0)).toBe(true);
    });
  });
});
