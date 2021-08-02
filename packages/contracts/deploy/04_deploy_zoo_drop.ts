// deploy/04_deploy_zoo_drop.ts

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

import rarities from '../utils/rarities.json';
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

  return; // Use deploy script

  const dropAddress = deployResult.address;
  const keeperAddress = (await deployments.get('ZooKeeper')).address
  const keeper = await hre.ethers.getContractAt('ZooKeeper', keeperAddress);
  const drop = await hre.ethers.getContractAt('ZooDrop', dropAddress);

  // Add Drop to ZooKeeper
  await keeper.setDrop(dropAddress)

  // Configure Drop
  await drop.configureKeeper(keeperAddress);


  // Add eggs
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

  eggs.map(async (v) => {
    console.log('Add Egg:', v.name)
    await drop.setEgg(v.name, v.price, v.supply, v.tokenURI, v.metadataURI)
  })

  await drop.configureEggs('Base Egg', 'Hybrid Egg')

  // Add rarities
  rarities.sort(function(a, b) { return a.probability - b.probability });
  rarities.map(async (v) => {
    console.log('Add Rarity:', v.name, v.probability, v.yield, v.boost)
    await drop.setRarity(v.name, v.probability, v.yield, v.boost)
  })

  // Add animals
  animals.map(async (v) => {
    console.log('Add Animal:', v.name)
    await drop.setAnimal(v.name, v.rarity, v.tokenURI, v.metadataURI)
  })

  // Add hybrids
  hybrids.map(async (v) => {
    console.log('Add Hybrid:', v.name)
    await drop.setHybrid(v.name, v.rarity, v.yield, v.parentA, v.parentB, v.tokenURI, v.metadataURI)
  })

  return hre.network.live;
}

export default func
func.id = 'deploy_zoo_drop'
func.tags = ['ZooDrop']
func.dependencies = ['ZooKeeper']
