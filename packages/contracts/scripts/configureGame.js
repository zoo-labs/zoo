const hre = require('hardhat');
const ethers = hre.ethers

const rarities = require('../utils/animals.json')
const animals  = require('../utils/animals.json');
const hybrids  = require('../utils/hybrids.json');

async function main() {
  const [signer] = await ethers.getSigners()

  const dropAddress = '0x7E66108C67cAA4921b1DF371291cdE6dB8dc1945';
  const keeperAddress = '0x219ea7dBf37D592761b9B5220976c5A13370cB6c';

  const keeper = await ethers.getContractAt('ZooKeeper', keeperAddress);
  const drop = await ethers.getContractAt('ZooDrop', dropAddress);

  // Configure game for our Gen 0 drop
  await keeper.setDrop(dropAddress)

  // Configure Drop
  await drop.configureKeeper(keeperAddress);

  // Add eggs
  const eggs = [
    {
      name: "Base Egg",
      price: 15405200*18, // about $210 / egg
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
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
