import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  console.log("🚀 Starting contract deployment to local network...");
  
  // Support both local and Docker environments
  const network = process.env.NETWORK || "localhost";
  const rpcUrl = process.env.RPC_URL || "http://localhost:8545";
  console.log("🌐 Network:", network);
  console.log("🌐 RPC URL:", rpcUrl);
  
  const [deployer] = await ethers.getSigners();
  console.log("📍 Deploying contracts with account:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "ETH");

  // Deploy contracts
  const deployedContracts: Record<string, any> = {};

  try {
    // 1. Deploy KeyValuePairs
    console.log("\n📦 Deploying KeyValuePairs...");
    const KeyValuePairs = await ethers.getContractFactory("KeyValuePairs");
    const keyValuePairs = await KeyValuePairs.deploy();
    await keyValuePairs.waitForDeployment();
    const kvAddress = await keyValuePairs.getAddress();
    console.log("   ✅ KeyValuePairs deployed to:", kvAddress);
    deployedContracts.KeyValuePairs = { address: kvAddress };

    // 2. Deploy ERC6551Registry
    console.log("\n📦 Deploying ERC6551Registry...");
    const ERC6551Registry = await ethers.getContractFactory("ERC6551Registry");
    const erc6551Registry = await ERC6551Registry.deploy();
    await erc6551Registry.waitForDeployment();
    const registryAddress = await erc6551Registry.getAddress();
    console.log("   ✅ ERC6551Registry deployed to:", registryAddress);
    deployedContracts.ERC6551Registry = { address: registryAddress };

    // 3. Deploy DecentHats
    console.log("\n📦 Deploying DecentHats...");
    const DecentHats = await ethers.getContractFactory("DecentHats");
    const decentHats = await DecentHats.deploy();
    await decentHats.waitForDeployment();
    const hatsAddress = await decentHats.getAddress();
    console.log("   ✅ DecentHats deployed to:", hatsAddress);
    deployedContracts.DecentHats = { address: hatsAddress };

    // 4. Deploy DecentAutonomousAdmin
    console.log("\n📦 Deploying DecentAutonomousAdmin...");
    const DecentAutonomousAdmin = await ethers.getContractFactory("DecentAutonomousAdmin");
    const decentAutonomousAdmin = await DecentAutonomousAdmin.deploy();
    await decentAutonomousAdmin.waitForDeployment();
    const adminAddress = await decentAutonomousAdmin.getAddress();
    console.log("   ✅ DecentAutonomousAdmin deployed to:", adminAddress);
    deployedContracts.DecentAutonomousAdmin = { address: adminAddress };

    // 5. Deploy DecentSablierStreamManagement  
    console.log("\n📦 Deploying DecentSablierStreamManagement...");
    const DecentSablierStreamManagement = await ethers.getContractFactory("DecentSablierStreamManagement");
    const decentSablierStreamManagement = await DecentSablierStreamManagement.deploy();
    await decentSablierStreamManagement.waitForDeployment();
    const sablierAddress = await decentSablierStreamManagement.getAddress();
    console.log("   ✅ DecentSablierStreamManagement deployed to:", sablierAddress);
    deployedContracts.DecentSablierStreamManagement = { address: sablierAddress };

    // 6. Deploy LinearERC20Voting
    console.log("\n📦 Deploying LinearERC20Voting...");
    const LinearERC20Voting = await ethers.getContractFactory("LinearERC20Voting");
    const linearERC20Voting = await LinearERC20Voting.deploy();
    await linearERC20Voting.waitForDeployment();
    const votingAddress = await linearERC20Voting.getAddress();
    console.log("   ✅ LinearERC20Voting deployed to:", votingAddress);
    deployedContracts.LinearERC20Voting = { address: votingAddress };

    // 7. Deploy Azorius
    console.log("\n📦 Deploying Azorius...");
    const Azorius = await ethers.getContractFactory("Azorius");
    const azorius = await Azorius.deploy();
    await azorius.waitForDeployment();
    const azoriusAddress = await azorius.getAddress();
    console.log("   ✅ Azorius deployed to:", azoriusAddress);
    deployedContracts.Azorius = { address: azoriusAddress };

    // 8. Deploy FractalModule
    console.log("\n📦 Deploying FractalModule...");
    const FractalModule = await ethers.getContractFactory("FractalModule");
    const fractalModule = await FractalModule.deploy(
      deployer.address, // owner
      deployer.address, // avatar
      deployer.address  // target
    );
    await fractalModule.waitForDeployment();
    const fractalAddress = await fractalModule.getAddress();
    console.log("   ✅ FractalModule deployed to:", fractalAddress);
    deployedContracts.FractalModule = { address: fractalAddress };

    // 9. Deploy FractalRegistry
    console.log("\n📦 Deploying FractalRegistry...");
    const FractalRegistry = await ethers.getContractFactory("FractalRegistry");
    const fractalRegistry = await FractalRegistry.deploy();
    await fractalRegistry.waitForDeployment();
    const fractalRegistryAddress = await fractalRegistry.getAddress();
    console.log("   ✅ FractalRegistry deployed to:", fractalRegistryAddress);
    deployedContracts.FractalRegistry = { address: fractalRegistryAddress };

    // 10. Deploy ModuleProxyFactory
    console.log("\n📦 Deploying ModuleProxyFactory...");
    const ModuleProxyFactory = await ethers.getContractFactory("ModuleProxyFactory");
    const moduleProxyFactory = await ModuleProxyFactory.deploy();
    await moduleProxyFactory.waitForDeployment();
    const proxyFactoryAddress = await moduleProxyFactory.getAddress();
    console.log("   ✅ ModuleProxyFactory deployed to:", proxyFactoryAddress);
    deployedContracts.ModuleProxyFactory = { address: proxyFactoryAddress };

    // 11. Deploy VotesERC20
    console.log("\n📦 Deploying VotesERC20...");
    const VotesERC20 = await ethers.getContractFactory("VotesERC20");
    const votesERC20 = await VotesERC20.deploy();
    await votesERC20.waitForDeployment();
    const votesERC20Address = await votesERC20.getAddress();
    console.log("   ✅ VotesERC20 deployed to:", votesERC20Address);
    deployedContracts.VotesERC20 = { address: votesERC20Address };

    // 12. Deploy VotesERC20Wrapper
    console.log("\n📦 Deploying VotesERC20Wrapper...");
    const VotesERC20Wrapper = await ethers.getContractFactory("VotesERC20Wrapper");
    const votesERC20Wrapper = await VotesERC20Wrapper.deploy();
    await votesERC20Wrapper.waitForDeployment();
    const wrapperAddress = await votesERC20Wrapper.getAddress();
    console.log("   ✅ VotesERC20Wrapper deployed to:", wrapperAddress);
    deployedContracts.VotesERC20Wrapper = { address: wrapperAddress };

    // 13. Deploy LinearERC721Voting
    console.log("\n📦 Deploying LinearERC721Voting...");
    const LinearERC721Voting = await ethers.getContractFactory("LinearERC721Voting");
    const linearERC721Voting = await LinearERC721Voting.deploy();
    await linearERC721Voting.waitForDeployment();
    const erc721VotingAddress = await linearERC721Voting.getAddress();
    console.log("   ✅ LinearERC721Voting deployed to:", erc721VotingAddress);
    deployedContracts.LinearERC721Voting = { address: erc721VotingAddress };

    // 14. Deploy ERC20Claim
    console.log("\n📦 Deploying ERC20Claim...");
    const ERC20Claim = await ethers.getContractFactory("ERC20Claim");
    const erc20Claim = await ERC20Claim.deploy();
    await erc20Claim.waitForDeployment();
    const claimAddress = await erc20Claim.getAddress();
    console.log("   ✅ ERC20Claim deployed to:", claimAddress);
    deployedContracts.ERC20Claim = { address: claimAddress };

  } catch (error) {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }

  // Save deployment addresses
  const deploymentPath = path.join(__dirname, "../deployments/localhost");
  if (!fs.existsSync(deploymentPath)) {
    fs.mkdirSync(deploymentPath, { recursive: true });
  }

  const deploymentFile = path.join(deploymentPath, "deployment.json");
  fs.writeFileSync(
    deploymentFile,
    JSON.stringify(deployedContracts, null, 2)
  );

  // Also update the publish directory for the app
  const publishPath = path.join(__dirname, "../publish/localhost.ts");
  const publishContent = `// Auto-generated deployment addresses for localhost
export const addresses = ${JSON.stringify(deployedContracts, null, 2)};

export default addresses;
`;
  fs.writeFileSync(publishPath, publishContent);

  console.log("\n✅ All contracts deployed successfully!");
  console.log("📄 Deployment addresses saved to:", deploymentFile);
  console.log("📄 Publish file updated at:", publishPath);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });