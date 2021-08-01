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
    args: ['Gen 0', 16000],
    log: true,
  })

  const dropAddress = deployResult.address;

  // Bail out if we've added all the animals before
  if (!deployResult.newlyDeployed) {
    return
  }

  // Get instance of keeper
  const keeperAddress = (await deployments.get('ZooKeeper')).address
  const keeper = await hre.ethers.getContractAt('ZooKeeper', keeperAddress);

  // Add first Drop
  console.log('Add Gen 0 drop')
  const id = await keeper.callStatic.setDrop(dropAddress, 'Gen 0', 16000)

  const drop = await hre.ethers.getContractAt('ZooDrop', dropAddress);

  console.log('Configure Gen 0 drop')
  await drop.setEgg("egg", 210, 16000, "https://db.zoolabs/egg.jpg", "https://db.zoolabs.org/egg.json");
  await drop.setEgg("hybridEgg", 0, 0, "https://db.zoolabs/hybridegg.jpg", "https://db.zoolabs.org/hybridEgg.json");

  console.log('Adding Common animals')
  await Promise.all(animals.map((v) => {
    drop.setAnimal(v.name, v.rarity, v.tokenURI, v.metadataURI)
  }))

  console.log('Adding Hybrid animals')
  await Promise.all(hybrids.map((v) => {
    drop.setHybrid(v.name, v.rarity, Math.round(v.yield), v.parentA, v.parentB, v.tokenURI, v.metadataURI)
  }))

  return hre.network.live;
}

export default func
func.id = 'deploy_zoo_drop'
func.tags = ['ZooDrop']
func.dependencies = ['ZooKeeper']
