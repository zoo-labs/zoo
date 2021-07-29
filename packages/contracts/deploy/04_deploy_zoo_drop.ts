// deploy/04_deploy_zoo_keeper.ts
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { getDeployerAddress } from '../lib/deploy_helper'
import fs from 'fs'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const useProxy = !hre.network.live

  const deployResult = await deploy('ZooDrop', {
    from: deployer,
    args: ['Gen 0', 16000, 210],
    log: true,
  })

  const dropAddress = deployResult.address;

  // Bail out if we've added all the animals before
  if (!deployResult.newlyDeployed) {
    return
  }

  const keeperAddress = (await deployments.get('ZooKeeper')).address
  const keeper = await hre.ethers.getContractAt('ZooKeeper', keeperAddress);
  const drop = await hre.ethers.getContractAt('ZooDrop', dropAddress);

  console.log('Add drop to ZooKeeper')
  await keeper.callStatic.addDrop(drop.address, 'Gen 0', 16000, 210)

  console.log('Configure drop')
  await drop.setTokenURI('egg', 'https://db.zoolabs.io/basic.jpg');
  await drop.setMetadataURI('egg', 'https://db.zoolabs.io/basic.json');
  await drop.setTokenURI('hybrid', 'https://db.zoolabs.io/hybrid.jpg');
  await drop.setMetadataURI('hybrid', 'https://db.zoolabs.io/hybrid.json');

  const url = 'https://db.zoolabs.io/'

  // function addAnimal(string _id, string _name, uint256 _yield, string _rarityName, uint256 _rarity, string _tokenURI, string _metadataURI)
  const animalsRaw = fs.readFileSync(__dirname + '/animals.txt')
  const hybridsRaw = fs.readFileSync(__dirname + '/hybrids.txt')
  console.log(animalsRaw.toString() + hybridsRaw.toString())
  // drop.addAnimal(id, name, v, 1500, 'Epic', 50, `https://${url}/${id}.json`, `https://${url}/${id}.jpg`)


  return !useProxy // When live network, record the script as executed to prevent rexecution
}

export default func
func.id = 'deploy_zoo_keeper' // ID required to prevent reexecution
func.tags = ['ZooKeeper']
