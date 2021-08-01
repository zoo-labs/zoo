// deploy/04_deploy_zoo_drop.ts

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

import rarities from '../utils/animals.json';
import animals from '../utils/animals.json';
import hybrids from '../utils/hybrids.json';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const deployResult = await deploy('ZooDrop', {
    from: deployer,
    args: ['Gen 0'],
    log: true,
  })

  const dropAddress = deployResult.address;

  // Bail out if we've added all the animals before
  if (!deployResult.newlyDeployed) {
    return
  }

  // Add Drop to ZooKeeper
  const keeperAddress = (await deployments.get('ZooKeeper')).address
  const keeper = await hre.ethers.getContractAt('ZooKeeper', keeperAddress);
  const id = await keeper.callStatic.setDrop(dropAddress)

  // Configure drop
  const drop = await hre.ethers.getContractAt('ZooDrop', dropAddress);

  const eggs = [
    {
      name: "Base Egg",
      price: 210,
      supply: 16000,
      tokenURI: "https://db.zoolabs/egg.jpg",
      metadataURI: "https://db.zoolabs.org/egg.json"
    },
    {
      name: "Hybrid Egg",
      price: 0,
      supply: 0,
      tokenURI: "https://db.zoolabs/hybrid.jpg",
      metadataURI: "https://db.zoolabs.org/hybrid.json"
    }
  ]

  await Promise.all(eggs.map((v) => {
    console.log('Add Egg:', v.name)
    drop.setEgg(v.name, v.price, v.supply, v.tokenURI, v.metadataURI)
  }))

  await drop.configureEggs("Base Egg", "Hybrid Egg")

  await Promise.all(animals.map((v) => {
    console.log('Add Animal:', v.name)
    drop.setAnimal(v.name, v.rarity, v.tokenURI, v.metadataURI)
  }))

  await Promise.all(hybrids.map((v) => {
    console.log('Add Hybrid:', v.name)
    drop.setHybrid(v.name, v.rarity, v.yield, v.parentA, v.parentB, v.tokenURI, v.metadataURI)
  }))

  return hre.network.live;
}

export default func
func.id = 'deploy_zoo_drop'
func.tags = ['ZooDrop']
func.dependencies = ['ZooKeeper']
