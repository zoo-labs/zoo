const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying ZK Governance System with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // 1. Deploy ZOO Token
  console.log("\n1. Deploying ZOO Token...");
  const ZOO = await hre.ethers.getContractFactory("ZOO");
  const zooToken = await ZOO.deploy();
  await zooToken.waitForDeployment();
  const zooTokenAddress = await zooToken.getAddress();
  console.log("✅ ZOO Token deployed to:", zooTokenAddress);

  // 2. Deploy KEEPER Token (existing governance token)
  console.log("\n2. Deploying KEEPER Token...");
  const ZooToken = await hre.ethers.getContractFactory("ZooToken");
  const keeperToken = await ZooToken.deploy();
  await keeperToken.waitForDeployment();
  const keeperTokenAddress = await keeperToken.getAddress();
  console.log("✅ KEEPER Token deployed to:", keeperTokenAddress);

  // 3. Deploy ZK Staking Contract
  console.log("\n3. Deploying ZK Staking Contract...");
  const ZKStaking = await hre.ethers.getContractFactory("ZKStaking");
  const zkStaking = await ZKStaking.deploy(zooTokenAddress, keeperTokenAddress);
  await zkStaking.waitForDeployment();
  const zkStakingAddress = await zkStaking.getAddress();
  console.log("✅ ZK Staking Contract deployed to:", zkStakingAddress);

  // 4. Deploy Timelock (2 days minimum delay)
  console.log("\n4. Deploying Timelock...");
  const minDelay = 2 * 24 * 60 * 60; // 2 days
  const proposers = [];
  const executors = [];
  const Timelock = await hre.ethers.getContractFactory("TimelockController");
  const timelock = await Timelock.deploy(minDelay, proposers, executors, deployer.address);
  await timelock.waitForDeployment();
  const timelockAddress = await timelock.getAddress();
  console.log("✅ Timelock deployed to:", timelockAddress);

  // 5. Deploy Governor (now uses ZK token instead of KEEPER)
  console.log("\n5. Deploying Zoo Governor...");
  const ZooGovernor = await hre.ethers.getContractFactory("ZooGovernor");
  const governor = await ZooGovernor.deploy(zkStakingAddress, timelockAddress);
  await governor.waitForDeployment();
  const governorAddress = await governor.getAddress();
  console.log("✅ Zoo Governor deployed to:", governorAddress);

  // 6. Setup roles
  console.log("\n6. Setting up roles...");
  const proposerRole = await timelock.PROPOSER_ROLE();
  const executorRole = await timelock.EXECUTOR_ROLE();

  await timelock.grantRole(proposerRole, governorAddress);
  console.log("✅ Granted PROPOSER_ROLE to Governor");

  await timelock.grantRole(executorRole, governorAddress);
  console.log("✅ Granted EXECUTOR_ROLE to Governor");

  await timelock.grantRole(executorRole, hre.ethers.ZeroAddress);
  console.log("✅ Granted EXECUTOR_ROLE to everyone");

  console.log("⚠️  Keeping ADMIN_ROLE for local testing");

  // 7. Distribute tokens to test accounts
  console.log("\n7. Distributing test tokens...");
  const accounts = await hre.ethers.getSigners();

  for (let i = 1; i < Math.min(accounts.length, 10); i++) {
    const amount = hre.ethers.parseEther("1000000"); // 1M each

    // Give ZOO tokens
    await zooToken.transfer(accounts[i].address, amount);

    // Give KEEPER tokens
    await keeperToken.transfer(accounts[i].address, amount);

    console.log(`✅ Sent 1M ZOO + 1M KEEPER to ${accounts[i].address}`);

    // Approve ZK staking contract to spend tokens
    await zooToken.connect(accounts[i]).approve(zkStakingAddress, hre.ethers.MaxUint256);
    await keeperToken.connect(accounts[i]).approve(zkStakingAddress, hre.ethers.MaxUint256);

    // Stake some tokens (100K ZOO + 100K KEEPER for 1 year)
    const stakeAmount = hre.ethers.parseEther("100000");
    const lockDuration = 365 * 24 * 60 * 60; // 1 year
    await zkStaking.connect(accounts[i]).stake(stakeAmount, lockDuration);

    console.log(`   → Staked 100K ZOO + 100K KEEPER (1 year lock)`);
  }

  // Deployer also approves and stakes
  await zooToken.approve(zkStakingAddress, hre.ethers.MaxUint256);
  await keeperToken.approve(zkStakingAddress, hre.ethers.MaxUint256);

  const deployerStake = hre.ethers.parseEther("1000000"); // 1M
  const deployerLock = 2 * 365 * 24 * 60 * 60; // 2 years
  await zkStaking.stake(deployerStake, deployerLock);
  console.log(`✅ Deployer staked 1M ZOO + 1M KEEPER (2 years lock)`);

  console.log("\n===========================================");
  console.log("📋 DEPLOYMENT SUMMARY");
  console.log("===========================================");
  console.log("ZOO Token:", zooTokenAddress);
  console.log("KEEPER Token:", keeperTokenAddress);
  console.log("ZK Staking:", zkStakingAddress);
  console.log("Timelock:", timelockAddress);
  console.log("Governor:", governorAddress);

  console.log("\n💰 Token Distribution:");
  console.log(`- ZOO Supply: ${hre.ethers.formatEther(await zooToken.totalSupply())} ZOO`);
  console.log(`- KEEPER Supply: ${hre.ethers.formatEther(await keeperToken.totalSupply())} KEEPER`);
  console.log(`- ZK Minted: ${hre.ethers.formatEther(await zkStaking.totalSupply())} ZK`);

  console.log("\n⚙️  Governance Settings:");
  console.log(`- Proposal Threshold: 1 ZK token`);
  console.log(`- Voting Delay: ${await governor.votingDelay()} blocks`);
  console.log(`- Voting Period: ${await governor.votingPeriod()} blocks`);
  console.log(`- Quorum: 4% of total supply`);

  console.log("\n🔒 Staking Info:");
  console.log(`- Min Stake: 1 ZOO + 1 KEEPER`);
  console.log(`- Max Lock: 10 years`);
  console.log(`- Time Bonus: 1x to 10x (based on lock duration)`);
  console.log(`- ZK Economics: Deflationary (burned when unstaking)`);
  console.log(`- Rewards: From DAO treasury (not in staking contract)`);
  console.log("===========================================\n");

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    deployer: deployer.address,
    contracts: {
      ZOO: zooTokenAddress,
      KEEPER: keeperTokenAddress,
      ZKStaking: zkStakingAddress,
      Timelock: timelockAddress,
      Governor: governorAddress,
    },
    settings: {
      proposalThreshold: "1000000000000000000", // 1 ZK in wei
      votingDelay: (await governor.votingDelay()).toString(),
      votingPeriod: (await governor.votingPeriod()).toString(),
      quorum: "4%",
      minStake: "1000000000000000000", // 1 ZOO + 1 KEEPER
      maxLockDuration: "315360000", // 10 years in seconds
      rewardRate: "100", // 1% APR
    },
  };

  const outputPath = path.join(__dirname, "../deployments/localhost-zk-governance.json");
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
