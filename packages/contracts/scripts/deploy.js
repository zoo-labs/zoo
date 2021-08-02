const hre = require('hardhat');
const ethers = hre.ethers

const rarities = require('../utils/animals.json');
const animals  = require('../utils/animals.json');
const hybrids  = require('../utils/hybrids.json');

async function main() {
  const [signer] = await ethers.getSigners()

  const dropAddress = '0x7E66108C67cAA4921b1DF371291cdE6dB8dc1945';
  const keeperAddress = '0x219ea7dBf37D592761b9B5220976c5A13370cB6c';

  const keeper = await ethers.getContractAt('ZooKeeper', keeperAddress);
  const drop = await ethers.getContractAt('ZooDrop', dropAddress);

  // Add Drop to ZooKeeper
  await keeper.setDrop(dropAddress)

  // Configure drop
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

  // eggs.map(async (v) => {
  //   console.log('Add Egg:', v.name)
  //   await drop.setEgg(v.name, v.price, v.supply, v.tokenURI, v.metadataURI)
  // })

  let v = eggs[0]
  await drop.setEgg(v.name, v.price, v.supply, v.tokenURI, v.metadataURI)
  v = eggs[1]
  await drop.setEgg(v.name, v.price, v.supply, v.tokenURI, v.metadataURI)

  await drop.configureEggs("Base Egg", "Hybrid Egg")

  animals.map(async (v) => {
    console.log('Add Animal:', v.name)
    await drop.setAnimal(v.name, v.rarity, v.tokenURI, v.metadataURI)
  })

  hybrids.map(async (v) => {
    console.log('Add Hybrid:', v.name)
    await drop.setHybrid(v.name, v.rarity, v.yield, v.parentA, v.parentB, v.tokenURI, v.metadataURI)
  })

  // // Deploy mock LP tokens for testing
  // const MockERC20 = await ethers.getContractFactory('MockERC20')
  // const lp  = await MockERC20.deploy('ZOO-BNB', 'LP', '10000000000')
  // console.log('BNB-ZOO LP address', lp.address)

  // // Add LP pools to farm contract
  // console.log('Adding BNB-ZOO LP to ZooToken')
  // await farm.add('100', lp.address, false)

  // // Transfer LP tokens and test deposit / withdrawal
  // await lp.transfer(signer.address, '1000')

  // console.log('Approve LP token for transfer')
  // await lp.approve(farm.address, '1000')

  // console.log('Deposit LP tokens')
  // await farm.deposit(0, '100')

  // console.log('Withdraw LP tokens')
  // await farm.withdraw(0, '10')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
