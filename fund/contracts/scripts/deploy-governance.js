const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Deploy ZOO Token
  console.log("\n1. Deploying ZOO Token...");
  const ZooToken = await hre.ethers.getContractFactory("ZooToken");
  const zooToken = await ZooToken.deploy();
  await zooToken.waitForDeployment();
  const zooTokenAddress = await zooToken.getAddress();
  console.log("✅ ZOO Token deployed to:", zooTokenAddress);

  // Deploy Timelock (2 days minimum delay)
  console.log("\n2. Deploying Timelock...");
  const minDelay = 2 * 24 * 60 * 60; // 2 days
  const proposers = []; // Will add governor after deployment
  const executors = []; // Will add governor after deployment
  const Timelock = await hre.ethers.getContractFactory("TimelockController");
  const timelock = await Timelock.deploy(minDelay, proposers, executors, deployer.address);
  await timelock.waitForDeployment();
  const timelockAddress = await timelock.getAddress();
  console.log("✅ Timelock deployed to:", timelockAddress);

  // Deploy Governor
  console.log("\n3. Deploying Zoo Governor...");
  const ZooGovernor = await hre.ethers.getContractFactory("ZooGovernor");
  const governor = await ZooGovernor.deploy(zooTokenAddress, timelockAddress);
  await governor.waitForDeployment();
  const governorAddress = await governor.getAddress();
  console.log("✅ Zoo Governor deployed to:", governorAddress);

  // Setup roles
  console.log("\n4. Setting up roles...");
  const proposerRole = await timelock.PROPOSER_ROLE();
  const executorRole = await timelock.EXECUTOR_ROLE();
  const adminRole = await timelock.DEFAULT_ADMIN_ROLE();

  await timelock.grantRole(proposerRole, governorAddress);
  console.log("✅ Granted PROPOSER_ROLE to Governor");

  await timelock.grantRole(executorRole, governorAddress);
  console.log("✅ Granted EXECUTOR_ROLE to Governor");

  // Allow anyone to execute
  await timelock.grantRole(executorRole, hre.ethers.ZeroAddress);
  console.log("✅ Granted EXECUTOR_ROLE to everyone");

  // Renounce admin role
  await timelock.revokeRole(adminRole, deployer.address);
  console.log("✅ Revoked ADMIN_ROLE from deployer");

  // Distribute tokens to test accounts
  console.log("\n5. Distributing test tokens...");
  const accounts = await hre.ethers.getSigners();
  for (let i = 1; i < Math.min(accounts.length, 10); i++) {
    const amount = hre.ethers.parseEther("1000000"); // 1M ZOO each
    await zooToken.transfer(accounts[i].address, amount);

    // Delegate voting power to self
    await zooToken.connect(accounts[i]).delegate(accounts[i].address);
    console.log(`✅ Sent 1M ZOO to ${accounts[i].address}`);
  }

  // Deployer delegates to self
  await zooToken.delegate(deployer.address);
  console.log(`✅ Deployer delegated voting power to self`);

  console.log("\n===========================================");
  console.log("📋 DEPLOYMENT SUMMARY");
  console.log("===========================================");
  console.log("ZOO Token:", zooTokenAddress);
  console.log("Timelock:", timelockAddress);
  console.log("Governor:", governorAddress);
  console.log("\n💰 Token Distribution:");
  console.log(`- Deployer: ${hre.ethers.formatEther(await zooToken.balanceOf(deployer.address))} ZOO`);
  console.log(`- Total Supply: ${hre.ethers.formatEther(await zooToken.totalSupply())} ZOO`);
  console.log("\n⚙️  Governance Settings:");
  console.log(`- Proposal Threshold: 1 ZOO`);
  console.log(`- Voting Delay: ${await governor.votingDelay()} blocks (~1 day)`);
  console.log(`- Voting Period: ${await governor.votingPeriod()} blocks (~3 days)`);
  console.log(`- Quorum: 4% of total supply`);
  console.log("===========================================\n");

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    deployer: deployer.address,
    contracts: {
      ZooToken: zooTokenAddress,
      Timelock: timelockAddress,
      Governor: governorAddress,
    },
    settings: {
      proposalThreshold: "1000000000000000000", // 1 ZOO in wei
      votingDelay: (await governor.votingDelay()).toString(),
      votingPeriod: (await governor.votingPeriod()).toString(),
      quorum: "4%",
    },
  };

  const outputPath = path.join(__dirname, "../deployments/localhost-governance.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(deploymentInfo, null, 2));
  console.log(`📝 Deployment info saved to: ${outputPath}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
