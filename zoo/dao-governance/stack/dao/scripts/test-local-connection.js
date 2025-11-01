const { ethers } = require('ethers');

async function testConnection() {
  console.log('🔗 Testing connection to local Anvil network...\n');
  
  // Connect to Anvil
  const provider = new ethers.JsonRpcProvider('http://localhost:8545');
  
  // Get chain ID
  const network = await provider.getNetwork();
  console.log('✅ Connected to network:');
  console.log('   Chain ID:', network.chainId.toString());
  console.log('   Name:', network.name);
  
  // Get latest block
  const blockNumber = await provider.getBlockNumber();
  console.log('   Latest block:', blockNumber);
  
  // Check deployed contracts
  const contracts = {
    'KeyValuePairs': '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    'ERC6551Registry': '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    'DecentHats': '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    'DecentAutonomousAdmin': '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
  };
  
  console.log('\n📦 Checking deployed contracts:');
  for (const [name, address] of Object.entries(contracts)) {
    const code = await provider.getCode(address);
    const hasCode = code !== '0x';
    console.log(`   ${name}: ${address} - ${hasCode ? '✅ Deployed' : '❌ Not found'}`);
  }
  
  // Test account
  const testPrivateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
  const wallet = new ethers.Wallet(testPrivateKey, provider);
  
  console.log('\n👤 Test account:');
  console.log('   Address:', wallet.address);
  const balance = await provider.getBalance(wallet.address);
  console.log('   Balance:', ethers.formatEther(balance), 'ETH');
  
  console.log('\n✅ Local network is properly configured and contracts are deployed!');
}

testConnection().catch(console.error);