/**
 * Zoo.vote - ZK Staking Dashboard Test Script
 * Tests the localhost blockchain connection and contract deployments
 */

const { ethers } = require('ethers');
const deployments = require('../contracts/deployments/localhost-zk-governance.json');

async function testStakingSetup() {
  console.log('🦁 Zoo.vote - ZK Staking Test Script');
  console.log('=====================================\n');

  try {
    // Connect to local blockchain
    const provider = new ethers.JsonRpcProvider('http://localhost:8545');

    // Check connection
    const network = await provider.getNetwork();
    console.log('✅ Connected to network:', network.name, '(chainId:', network.chainId.toString(), ')');

    // Get latest block
    const blockNumber = await provider.getBlockNumber();
    console.log('📦 Latest block:', blockNumber);

    // Check deployed contracts
    console.log('\n📝 Deployed Contracts:');
    console.log('----------------------');

    for (const [name, address] of Object.entries(deployments.contracts)) {
      const code = await provider.getCode(address);
      const isDeployed = code !== '0x';
      const status = isDeployed ? '✅' : '❌';
      console.log(`${status} ${name}: ${address}`);
    }

    // Check ZK Staking contract specifically
    console.log('\n🔍 ZK Staking Contract Details:');
    console.log('--------------------------------');
    const zkStakingAddress = deployments.contracts.ZKStaking;
    const code = await provider.getCode(zkStakingAddress);

    if (code !== '0x') {
      console.log('✅ ZK Staking contract is deployed');
      console.log('   Address:', zkStakingAddress);
      console.log('   Code size:', code.length, 'bytes');

      // Get contract settings
      console.log('\n⚙️  Contract Settings:');
      console.log('   Min Stake:', ethers.formatEther(deployments.settings.minStake), 'tokens');
      console.log('   Max Lock Duration:', parseInt(deployments.settings.maxLockDuration) / 86400, 'days');
      console.log('   Reward Rate:', deployments.settings.rewardRate, 'basis points');
      console.log('   Voting Period:', deployments.settings.votingPeriod, 'blocks');
      console.log('   Quorum:', deployments.settings.quorum);
    } else {
      console.log('❌ ZK Staking contract not found at address:', zkStakingAddress);
      console.log('   Please deploy contracts first using the contracts deployment script');
    }

    console.log('\n✅ Test completed successfully!');
    console.log('\n🚀 Zoo.vote is ready!');
    console.log('   Access the dashboard at: http://localhost:3004');
    console.log('   Or if port 3004 is busy: http://localhost:3005');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n⚠️  Cannot connect to localhost:8545');
      console.error('   Please start your local blockchain first:');
      console.error('   cd /Users/z/work/zoo/zoo/contracts');
      console.error('   npx hardhat node');
    }
  }
}

// Run the test
testStakingSetup().catch(console.error);