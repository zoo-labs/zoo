import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  console.log('Deploying Zoo.fund DAO and Crowdfunding contracts...')

  // Get ZOO token address (assuming it's already deployed)
  const zooTokenAddress = process.env.ZOO_TOKEN_ADDRESS || '0x0000000000000000000000000000000000000000'

  // Deploy Timelock for DAO
  const delay = 2 * 24 * 60 * 60 // 2 days
  const timelock = await deploy('TimelockController', {
    from: deployer,
    args: [
      delay,
      [], // proposers - will be set to DAO
      [], // executors - will be set to DAO
      deployer, // admin - will be renounced after setup
    ],
    log: true,
    autoMine: true,
  })

  // Deploy KEEPER governance token
  const keeperToken = await deploy('KeeperToken', {
    from: deployer,
    args: [
      deployer, // treasury
      deployer, // team (for testing, would be multisig in production)
      deployer, // liquidity
      zooTokenAddress, // Original ZOO token for airdrop verification
    ],
    log: true,
    autoMine: true,
  })

  // Deploy ZooDAO
  const zooDAO = await deploy('ZooDAO', {
    from: deployer,
    args: [
      keeperToken.address,
      timelock.address,
    ],
    log: true,
    autoMine: true,
  })

  // Deploy DAOFactory
  const daoFactory = await deploy('DAOFactory', {
    from: deployer,
    args: [
      deployer, // treasury (would be DAO/multisig in production)
    ],
    log: true,
    autoMine: true,
  })

  console.log('Setting up permissions...')

  // Get contract instances
  const timelockContract = await ethers.getContractAt(
    'TimelockController',
    timelock.address
  )
  const tokenContract = await ethers.getContractAt(
    'KeeperToken',
    keeperToken.address
  )

  // Grant roles to DAO
  const PROPOSER_ROLE = await timelockContract.PROPOSER_ROLE()
  const EXECUTOR_ROLE = await timelockContract.EXECUTOR_ROLE()
  const TIMELOCK_ADMIN_ROLE = await timelockContract.TIMELOCK_ADMIN_ROLE()

  // Grant proposer and executor roles to DAO
  await timelockContract.grantRole(PROPOSER_ROLE, zooDAO.address)
  await timelockContract.grantRole(EXECUTOR_ROLE, zooDAO.address)

  // Renounce admin role (comment out for testing)
  // await timelockContract.renounceRole(TIMELOCK_ADMIN_ROLE, deployer)

  console.log('Deployment complete!')
  console.log('='.repeat(50))
  console.log('Contract Addresses:')
  console.log('='.repeat(50))
  console.log(`KeeperToken: ${keeperToken.address}`)
  console.log(`ZooDAO: ${zooDAO.address}`)
  console.log(`TimelockController: ${timelock.address}`)
  console.log(`DAOFactory: ${daoFactory.address}`)
  console.log('='.repeat(50))

  // Create sample projects for testing
  if (hre.network.name === 'localhost' || hre.network.name === 'hardhat') {
    console.log('Creating sample projects for testing...')
    
    const factory = await ethers.getContractAt(
      'DAOFactory',
      daoFactory.address
    )

    const sampleProjects = [
      {
        name: 'DeFi Yield Aggregator',
        slug: 'defi-yield-aggregator',
        description: 'Advanced yield farming strategies across multiple protocols',
        fundingGoal: ethers.utils.parseEther('50'),
        duration: 30, // days
      },
      {
        name: 'NFT Marketplace V2',
        slug: 'nft-marketplace-v2',
        description: 'Next-gen NFT marketplace with social features',
        fundingGoal: ethers.utils.parseEther('100'),
        duration: 45,
      },
      {
        name: 'Web3 Gaming Platform',
        slug: 'web3-gaming-platform',
        description: 'Play-to-earn gaming ecosystem',
        fundingGoal: ethers.utils.parseEther('75'),
        duration: 60,
      },
    ]

    for (const project of sampleProjects) {
      const deadline = Math.floor(Date.now() / 1000) + project.duration * 24 * 60 * 60
      
      const tx = await factory.createProject(
        project.name,
        project.slug,
        project.description,
        project.fundingGoal,
        deadline,
        '' // IPFS hash (empty for testing)
      )
      
      await tx.wait()
      console.log(`Created project: ${project.name}`)
    }
  }

  // Export contract addresses for frontend
  const addresses = {
    KeeperToken: keeperToken.address,
    ZooDAO: zooDAO.address,
    TimelockController: timelock.address,
    DAOFactory: daoFactory.address,
  }

  // Save addresses to file for frontend
  const fs = require('fs')
  const path = require('path')
  
  const addressesPath = path.join(
    __dirname,
    '..',
    '..',
    'app',
    'contracts',
    'addresses.json'
  )
  
  fs.mkdirSync(path.dirname(addressesPath), { recursive: true })
  fs.writeFileSync(addressesPath, JSON.stringify(addresses, null, 2))
  
  console.log(`Contract addresses saved to ${addressesPath}`)
}

export default func
func.tags = ['crowdfund', 'all']
func.dependencies = []