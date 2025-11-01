import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load contract artifacts
const loadJSON = (filepath) => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, filepath), 'utf-8'));
};

const KeyValuePairsArtifact = loadJSON('../artifacts/contracts/singletons/KeyValuePairsV1.sol/KeyValuePairsV1.json');
const ERC6551RegistryArtifact = loadJSON('../artifacts/contracts/mocks/MockERC6551Registry.sol/MockERC6551Registry.json');
const DecentHatsArtifact = loadJSON('../artifacts/contracts/mocks/MockHats.sol/MockHats.json');
const DecentAutonomousAdminArtifact = loadJSON('../artifacts/contracts/mocks/MockAutonomousAdmin.sol/MockAutonomousAdmin.json');

async function main() {
  console.log("🚀 Deploying contracts to Anvil...");
  
  // Connect to Anvil
  const provider = new ethers.JsonRpcProvider('http://localhost:8545');
  
  // Use first Anvil account
  const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
  const wallet = new ethers.Wallet(privateKey, provider);
  
  console.log("📍 Deploying with account:", wallet.address);
  
  const balance = await provider.getBalance(wallet.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "ETH");
  
  const deployedContracts = {};
  
  try {
    // 1. Deploy KeyValuePairs
    console.log("\n📦 Deploying KeyValuePairs...");
    const KeyValuePairs = new ethers.ContractFactory(
      KeyValuePairsArtifact.abi,
      KeyValuePairsArtifact.bytecode,
      wallet
    );
    const keyValuePairs = await KeyValuePairs.deploy();
    await keyValuePairs.waitForDeployment();
    const kvAddress = await keyValuePairs.getAddress();
    console.log("   ✅ KeyValuePairs deployed to:", kvAddress);
    deployedContracts.KeyValuePairs = { 
      address: kvAddress,
      abi: KeyValuePairsArtifact.abi 
    };
    
    // 2. Deploy ERC6551Registry
    console.log("\n📦 Deploying ERC6551Registry...");
    const ERC6551Registry = new ethers.ContractFactory(
      ERC6551RegistryArtifact.abi,
      ERC6551RegistryArtifact.bytecode,
      wallet
    );
    const erc6551Registry = await ERC6551Registry.deploy();
    await erc6551Registry.waitForDeployment();
    const registryAddress = await erc6551Registry.getAddress();
    console.log("   ✅ ERC6551Registry deployed to:", registryAddress);
    deployedContracts.ERC6551Registry = { 
      address: registryAddress,
      abi: ERC6551RegistryArtifact.abi 
    };
    
    // 3. Deploy DecentHats
    console.log("\n📦 Deploying DecentHats...");
    const DecentHats = new ethers.ContractFactory(
      DecentHatsArtifact.abi,
      DecentHatsArtifact.bytecode,
      wallet
    );
    const decentHats = await DecentHats.deploy();
    await decentHats.waitForDeployment();
    const hatsAddress = await decentHats.getAddress();
    console.log("   ✅ DecentHats deployed to:", hatsAddress);
    deployedContracts.DecentHats = { 
      address: hatsAddress,
      abi: DecentHatsArtifact.abi 
    };
    
    // 4. Deploy DecentAutonomousAdmin
    console.log("\n📦 Deploying DecentAutonomousAdmin...");
    const DecentAutonomousAdmin = new ethers.ContractFactory(
      DecentAutonomousAdminArtifact.abi,
      DecentAutonomousAdminArtifact.bytecode,
      wallet
    );
    const decentAutonomousAdmin = await DecentAutonomousAdmin.deploy();
    await decentAutonomousAdmin.waitForDeployment();
    const adminAddress = await decentAutonomousAdmin.getAddress();
    console.log("   ✅ DecentAutonomousAdmin deployed to:", adminAddress);
    deployedContracts.DecentAutonomousAdmin = { 
      address: adminAddress,
      abi: DecentAutonomousAdminArtifact.abi 
    };
    
    // Save deployment info
    const deploymentInfo = {
      network: "localhost",
      chainId: 1337,
      timestamp: new Date().toISOString(),
      deployer: wallet.address,
      contracts: deployedContracts
    };
    
    // Create deployments directory if it doesn't exist
    const deploymentsDir = './deployments';
    if (!fs.existsSync(deploymentsDir)) {
      fs.mkdirSync(deploymentsDir, { recursive: true });
    }
    
    // Save to deployments file
    fs.writeFileSync(
      path.join(deploymentsDir, 'localhost.json'),
      JSON.stringify(deploymentInfo, null, 2)
    );
    
    // Also save to publish directory for app to use
    const publishDir = './publish';
    if (!fs.existsSync(publishDir)) {
      fs.mkdirSync(publishDir, { recursive: true });
    }
    
    // Create contracts data for app
    const contractsForApp = {
      1337: {
        ...Object.entries(deployedContracts).reduce((acc, [name, data]) => {
          acc[name] = data.address;
          return acc;
        }, {})
      }
    };
    
    fs.writeFileSync(
      path.join(publishDir, 'contracts.json'),
      JSON.stringify(contractsForApp, null, 2)
    );
    
    console.log("\n✅ Deployment complete!");
    console.log("📄 Deployment info saved to:");
    console.log("   - deployments/localhost.json");
    console.log("   - publish/contracts.json");
    
  } catch (error) {
    console.error("❌ Deployment error:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });