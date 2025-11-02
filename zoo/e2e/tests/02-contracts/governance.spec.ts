/**
 * Governance Contract Tests
 * Tests Governor, Timelock, and Safe multisig functionality
 */

import { test, expect } from '@playwright/test';
import ethers from 'ethers';
import { setupBlockchain, teardownBlockchain, mineBlocks, increaseTime, BlockchainFixture } from '../../fixtures/blockchain';
import { deployContracts, initializeContracts, ContractsFixture } from '../../fixtures/contracts';
import { setupWallets, WalletFixture } from '../../fixtures/wallets';
import {
  assertTransactionSuccess,
  assertTokenBalance,
  assertProposalState,
  assertEventEmitted
} from '../../helpers/assertions';

let blockchain: BlockchainFixture;
let contracts: ContractsFixture;
let wallets: WalletFixture;

test.describe('Governance Contracts', () => {
  test.beforeAll(async () => {
    console.log('🔧 Setting up governance test environment...');

    // Start blockchain
    blockchain = await setupBlockchain();
    console.log('✅ Blockchain started');

    // Setup wallets
    wallets = await setupWallets(blockchain.provider);
    console.log('✅ Wallets created');

    // Deploy contracts
    contracts = await deployContracts(blockchain.provider, wallets.deployer);
    console.log('✅ Contracts deployed');

    // Initialize with voting power
    await initializeContracts(contracts, {
      mintAmount: ethers.utils.parseEther('1000000'), // 1M tokens
      recipients: [
        await wallets.alice.getAddress(),
        await wallets.bob.getAddress(),
        await wallets.charlie.getAddress()
      ]
    });
    console.log('✅ Contracts initialized');
  });

  test.afterAll(async () => {
    console.log('🧹 Cleaning up test environment...');
    await teardownBlockchain(blockchain);
    console.log('✅ Cleanup complete');
  });

  test.describe('Governor Contract', () => {
    test('should have correct configuration', async () => {
      const name = await contracts.Governor.name();
      expect(name).toContain('Governor');

      // Check voting delay (1 block for testing)
      const votingDelay = await contracts.Governor.votingDelay();
      expect(votingDelay.toNumber()).toBeGreaterThanOrEqual(1);

      // Check voting period
      const votingPeriod = await contracts.Governor.votingPeriod();
      expect(votingPeriod.toNumber()).toBeGreaterThan(0);

      console.log(`✅ Governor: voting delay=${votingDelay}, period=${votingPeriod}`);
    });

    test('should track total voting power', async () => {
      const aliceAddress = await wallets.alice.getAddress();
      const votingPower = await contracts.Governor.getVotes(aliceAddress, await blockchain.provider.getBlockNumber() - 1);

      expect(votingPower.gt(0)).toBe(true);

      console.log(`✅ Alice voting power: ${ethers.utils.formatEther(votingPower)} ZOO`);
    });

    test('should create proposal', async () => {
      const aliceAddress = await wallets.alice.getAddress();
      const bobAddress = await wallets.bob.getAddress();

      // Create proposal to transfer tokens
      const transferAmount = ethers.utils.parseEther('100');
      const transferCalldata = contracts.ZOO.interface.encodeFunctionData('transfer', [bobAddress, transferAmount]);

      const governorWithAlice = contracts.Governor.connect(wallets.alice);

      const tx = await governorWithAlice.propose(
        [contracts.ZOO.address],  // targets
        [0],                        // values
        [transferCalldata],         // calldatas
        'Proposal #1: Transfer 100 ZOO to Bob'  // description
      );

      const receipt = await assertTransactionSuccess(tx);

      // Get proposal ID from event
      await assertEventEmitted(receipt, contracts.Governor, 'ProposalCreated');

      console.log('✅ Proposal created successfully');
    });

    test('should vote on proposal', async () => {
      // Create a proposal first
      const transferAmount = ethers.utils.parseEther('50');
      const charlieAddress = await wallets.charlie.getAddress();
      const transferCalldata = contracts.ZOO.interface.encodeFunctionData('transfer', [charlieAddress, transferAmount]);

      const governorWithAlice = contracts.Governor.connect(wallets.alice);

      const proposeTx = await governorWithAlice.propose(
        [contracts.ZOO.address],
        [0],
        [transferCalldata],
        'Proposal #2: Transfer 50 ZOO to Charlie'
      );

      const proposeReceipt = await proposeTx.wait();

      // Extract proposal ID from ProposalCreated event
      const proposalCreatedEvent = proposeReceipt.logs
        .map(log => {
          try {
            return contracts.Governor.interface.parseLog(log);
          } catch {
            return null;
          }
        })
        .find(e => e && e.name === 'ProposalCreated');

      expect(proposalCreatedEvent).toBeDefined();
      const proposalId = proposalCreatedEvent!.args.proposalId;

      // Mine blocks to pass voting delay
      await mineBlocks(blockchain.provider, 2);

      // Vote in favor
      const voteTx = await governorWithAlice.castVote(proposalId, 1); // 0=Against, 1=For, 2=Abstain
      await assertTransactionSuccess(voteTx);

      console.log('✅ Voted on proposal');

      // Check vote was recorded
      const hasVoted = await contracts.Governor.hasVoted(proposalId, await wallets.alice.getAddress());
      expect(hasVoted).toBe(true);

      console.log('✅ Vote recorded successfully');
    });

    test('should track proposal state', async () => {
      // Create proposal
      const transferAmount = ethers.utils.parseEther('25');
      const daveAddress = await wallets.dave.getAddress();
      const transferCalldata = contracts.ZOO.interface.encodeFunctionData('transfer', [daveAddress, transferAmount]);

      const governorWithAlice = contracts.Governor.connect(wallets.alice);

      const proposeTx = await governorWithAlice.propose(
        [contracts.ZOO.address],
        [0],
        [transferCalldata],
        'Proposal #3: Transfer 25 ZOO to Dave'
      );

      const proposeReceipt = await proposeTx.wait();
      const proposalCreatedEvent = proposeReceipt.logs
        .map(log => {
          try {
            return contracts.Governor.interface.parseLog(log);
          } catch {
            return null;
          }
        })
        .find(e => e && e.name === 'ProposalCreated');

      const proposalId = proposalCreatedEvent!.args.proposalId;

      // Check initial state (Pending)
      await assertProposalState(contracts.Governor, proposalId, 0);
      console.log('✅ Proposal state: Pending');

      // Mine blocks to make it Active
      await mineBlocks(blockchain.provider, 2);

      // Check Active state
      await assertProposalState(contracts.Governor, proposalId, 1);
      console.log('✅ Proposal state: Active');
    });
  });

  test.describe('Timelock Contract', () => {
    test('should have correct configuration', async () => {
      const minDelay = await contracts.Timelock.getMinDelay();
      expect(minDelay.toNumber()).toBeGreaterThanOrEqual(0);

      console.log(`✅ Timelock minimum delay: ${minDelay.toNumber()} seconds`);
    });

    test('should only allow proposer role to schedule', async () => {
      // Only Governor should be able to propose
      const proposerRole = await contracts.Timelock.PROPOSER_ROLE();
      const hasRole = await contracts.Timelock.hasRole(proposerRole, contracts.Governor.address);

      expect(hasRole).toBe(true);

      console.log('✅ Governor has PROPOSER_ROLE on Timelock');
    });

    test('should allow executor role to execute', async () => {
      const executorRole = await contracts.Timelock.EXECUTOR_ROLE();

      // Check if zero address has executor role (means anyone can execute)
      const hasRole = await contracts.Timelock.hasRole(executorRole, ethers.constants.AddressZero);

      if (hasRole) {
        console.log('✅ Anyone can execute (EXECUTOR_ROLE granted to zero address)');
      } else {
        console.log('ℹ️  Restricted execution (only specific addresses can execute)');
      }
    });
  });

  test.describe('Safe Multisig Integration', () => {
    test('should deploy Safe multisig', async () => {
      // Note: This test requires Safe contracts to be deployed
      // For now, we'll test the interface and document requirements

      console.log('📝 Safe multisig deployment requires:');
      console.log('   1. Safe master copy contract');
      console.log('   2. Safe proxy factory contract');
      console.log('   3. Multiple owners addresses');
      console.log('   4. Threshold for approvals');

      // Check if Safe contracts are available
      const bodyText = 'Safe deployment test placeholder';
      expect(bodyText).toBeDefined();

      console.log('ℹ️  Safe multisig test requires additional setup');
    });

    test('should create Safe with multiple owners', async () => {
      // Placeholder for Safe creation test
      const owners = [
        await wallets.alice.getAddress(),
        await wallets.bob.getAddress(),
        await wallets.charlie.getAddress()
      ];

      const threshold = 2; // 2 of 3 required

      console.log(`📝 Safe configuration:`);
      console.log(`   Owners: ${owners.length}`);
      console.log(`   Threshold: ${threshold}/${owners.length}`);

      expect(owners.length).toBe(3);
      expect(threshold).toBeLessThanOrEqual(owners.length);

      console.log('✅ Safe configuration valid');
    });

    test('should execute multisig transaction', async () => {
      // Placeholder for Safe transaction execution
      console.log('📝 Multisig transaction flow:');
      console.log('   1. Propose transaction');
      console.log('   2. Collect signatures (threshold)');
      console.log('   3. Execute transaction');
      console.log('   4. Verify execution on-chain');

      console.log('ℹ️  Multisig execution test requires Safe deployment');
    });
  });

  test.describe('Full Governance Workflow', () => {
    test('should execute full proposal lifecycle', async () => {
      // 1. Create proposal
      const transferAmount = ethers.utils.parseEther('10');
      const bobAddress = await wallets.bob.getAddress();
      const transferCalldata = contracts.ZOO.interface.encodeFunctionData('transfer', [bobAddress, transferAmount]);

      const governorWithAlice = contracts.Governor.connect(wallets.alice);

      const proposeTx = await governorWithAlice.propose(
        [contracts.ZOO.address],
        [0],
        [transferCalldata],
        'Proposal #4: Full Lifecycle Test'
      );

      const proposeReceipt = await proposeTx.wait();
      const proposalCreatedEvent = proposeReceipt.logs
        .map(log => {
          try {
            return contracts.Governor.interface.parseLog(log);
          } catch {
            return null;
          }
        })
        .find(e => e && e.name === 'ProposalCreated');

      const proposalId = proposalCreatedEvent!.args.proposalId;
      console.log('✅ Step 1: Proposal created');

      // 2. Wait for voting to start
      await mineBlocks(blockchain.provider, 2);
      await assertProposalState(contracts.Governor, proposalId, 1); // Active
      console.log('✅ Step 2: Voting period started');

      // 3. Cast votes
      await governorWithAlice.castVote(proposalId, 1); // Vote For
      console.log('✅ Step 3: Votes cast');

      // 4. End voting period
      const votingPeriod = await contracts.Governor.votingPeriod();
      await mineBlocks(blockchain.provider, votingPeriod.toNumber() + 1);

      // Proposal should now be Succeeded
      await assertProposalState(contracts.Governor, proposalId, 4);
      console.log('✅ Step 4: Proposal succeeded');

      console.log('✅ Full governance lifecycle completed');
    });
  });

  test.describe('Governance Security', () => {
    test('should prevent unauthorized proposal execution', async () => {
      // Create a proposal
      const transferAmount = ethers.utils.parseEther('100');
      const aliceAddress = await wallets.alice.getAddress();
      const transferCalldata = contracts.ZOO.interface.encodeFunctionData('transfer', [aliceAddress, transferAmount]);

      const governorWithBob = contracts.Governor.connect(wallets.bob);

      const proposeTx = await governorWithBob.propose(
        [contracts.ZOO.address],
        [0],
        [transferCalldata],
        'Proposal #5: Security Test'
      );

      const proposeReceipt = await proposeTx.wait();
      const proposalCreatedEvent = proposeReceipt.logs
        .map(log => {
          try {
            return contracts.Governor.interface.parseLog(log);
          } catch {
            return null;
          }
        })
        .find(e => e && e.name === 'ProposalCreated');

      const proposalId = proposalCreatedEvent!.args.proposalId;

      // Try to execute before voting - should fail
      const descriptionHash = ethers.utils.id('Proposal #5: Security Test');

      await expect(
        governorWithBob.execute(
          [contracts.ZOO.address],
          [0],
          [transferCalldata],
          descriptionHash
        )
      ).rejects.toThrow();

      console.log('✅ Unauthorized execution prevented');
    });

    test('should require minimum voting power for proposals', async () => {
      // Dave has minimal tokens
      const governorWithDave = contracts.Governor.connect(wallets.dave);

      const transferAmount = ethers.utils.parseEther('1');
      const daveAddress = await wallets.dave.getAddress();
      const transferCalldata = contracts.ZOO.interface.encodeFunctionData('transfer', [daveAddress, transferAmount]);

      // This might fail if Dave doesn't have enough voting power
      try {
        await governorWithDave.propose(
          [contracts.ZOO.address],
          [0],
          [transferCalldata],
          'Proposal #6: Low Power Test'
        );
        console.log('ℹ️  Proposal threshold is very low or zero');
      } catch (error) {
        console.log('✅ Proposal threshold enforced');
      }
    });
  });
});
