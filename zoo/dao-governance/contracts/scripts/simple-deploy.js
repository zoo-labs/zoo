import hre from "hardhat";

async function main() {
  console.log("🚀 Simple contract deployment...");
  
  try {
    // Get ethers from HRE
    const ethers = hre.ethers;
    if (!ethers) {
      console.error("❌ Ethers not available in HRE");
      return;
    }

    const [deployer] = await ethers.getSigners();
    console.log("📍 Deploying with account:", deployer.address);
    
    const balance = await deployer.provider.getBalance(deployer.address);
    console.log("💰 Account balance:", ethers.formatEther(balance), "ETH");
    
    // Deploy KeyValuePairs contract
    console.log("\n📦 Deploying KeyValuePairs...");
    const KeyValuePairs = await ethers.getContractFactory("KeyValuePairs");
    const keyValuePairs = await KeyValuePairs.deploy();
    await keyValuePairs.waitForDeployment();
    const kvAddress = await keyValuePairs.getAddress();
    console.log("   ✅ KeyValuePairs deployed to:", kvAddress);
    
    console.log("\n✅ Deployment complete!");
    
  } catch (error) {
    console.error("❌ Deployment error:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });