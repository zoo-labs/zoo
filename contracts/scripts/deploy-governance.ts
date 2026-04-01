import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy ZOO Token
  console.log("\n1. Deploying ZOO Token...");
  const ZooToken = await ethers.getContractFactory("ZooToken");
  const zooToken = await ZooToken.deploy();
  await zooToken.deployed();
  console.log("✅ ZOO Token deployed to:", zooToken.address);

  // Deploy Timelock (2 days minimum delay)
  console.log("\n2. Deploying Timelock...");
  const minDelay = 2 * 24 * 60 * 60; // 2 days
  const proposers: string[] = []; // Will add governor after deployment
  const executors: string[] = []; // Will add governor after deployment
  const Timelock = await ethers.getContractFactory("TimelockController");
  const timelock = await Timelock.deploy(minDelay, proposers, executors, deployer.address);
  await timelock.deployed();
  console.log("✅ Timelock deployed to:", timelock.address);

  // Deploy Governor
  console.log("\n3. Deploying Zoo Governor...");
  const ZooGovernor = await ethers.getContractFactory("ZooGovernor");
  const governor = await ZooGovernor.deploy(zooToken.address, timelock.address);
  await governor.deployed();
  console.log("✅ Zoo Governor deployed to:", governor.address);

  // Setup roles
  console.log("\n4. Setting up roles...");
  const proposerRole = await timelock.PROPOSER_ROLE();
  const executorRole = await timelock.EXECUTOR_ROLE();
  const adminRole = await timelock.TIMELOCK_ADMIN_ROLE();

  await timelock.grantRole(proposerRole, governor.address);
  console.log("✅ Granted PROPOSER_ROLE to Governor");

  await timelock.grantRole(executorRole, governor.address);
  console.log("✅ Granted EXECUTOR_ROLE to Governor");

  // Allow anyone to execute
  await timelock.grantRole(executorRole, ethers.constants.AddressZero);
  console.log("✅ Granted EXECUTOR_ROLE to everyone");

  // Renounce admin role
  await timelock.revokeRole(adminRole, deployer.address);
  console.log("✅ Revoked ADMIN_ROLE from deployer");

  // Distribute tokens to test accounts
  console.log("\n5. Distributing test tokens...");
  const accounts = await ethers.getSigners();
  for (let i = 1; i < Math.min(accounts.length, 10); i++) {
    const amount = ethers.utils.parseEther("1000000"); // 1M ZOO each
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
  console.log("ZOO Token:", zooToken.address);
  console.log("Timelock:", timelock.address);
  console.log("Governor:", governor.address);
  console.log("\n💰 Token Distribution:");
  console.log(`- Deployer: ${ethers.utils.formatEther(await zooToken.balanceOf(deployer.address))} ZOO`);
  console.log(`- Total Supply: ${ethers.utils.formatEther(await zooToken.totalSupply())} ZOO`);
  console.log("\n⚙️  Governance Settings:");
  console.log(`- Proposal Threshold: 1 ZOO`);
  console.log(`- Voting Delay: ${await governor.votingDelay()} blocks (~1 day)`);
  console.log(`- Voting Period: ${await governor.votingPeriod()} blocks (~3 days)`);
  console.log(`- Quorum: 4% of total supply`);
  console.log("===========================================\n");

  // Save deployment info
  const deploymentInfo = {
    network: (await ethers.provider.getNetwork()).name,
    chainId: (await ethers.provider.getNetwork()).chainId,
    deployer: deployer.address,
    contracts: {
      ZooToken: zooToken.address,
      Timelock: timelock.address,
      Governor: governor.address,
    },
    settings: {
      proposalThreshold: "1000000000000000000", // 1 ZOO in wei
      votingDelay: (await governor.votingDelay()).toString(),
      votingPeriod: (await governor.votingPeriod()).toString(),
      quorum: "4%",
    },
  };

  const fs = require("fs");
  const path = require("path");
  const outputPath = path.join(__dirname, "../deployments/localhost-governance.json");
  fs.writeFileSync(outputPath, JSON.stringify(deploymentInfo, null, 2));
  console.log(`📝 Deployment info saved to: ${outputPath}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
