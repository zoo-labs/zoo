const hre = require('hardhat')
const ethers = hre.ethers

const rarities = require('../utils/rarities.json')
const animals  = require('../utils/animals.json')
const hybrids  = require('../utils/hybrids.json')

async function main() {
  const [signer] = await ethers.getSigners()

  const dropAddress = '0x7E66108C67cAA4921b1DF371291cdE6dB8dc1945'
  const keeperAddress = '0x219ea7dBf37D592761b9B5220976c5A13370cB6c'

  const keeper = await (await ethers.getContractAt('ZooKeeper', keeperAddress)).connect(signer)
  const drop = await (await ethers.getContractAt('ZooDrop', dropAddress)).connect(signer)

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

  for (const v of eggs) {
    console.log('setEgg', v)
    const tx = await drop.setEgg(v.name, v.price, v.supply, v.tokenURI, v.metadataURI)
    await tx.wait();
  }

  await drop.configureEggs('Base Egg', 'Hybrid Egg')

  // Add rarities
  rarities.sort(function(a, b) { return a.probability - b.probability });

  for (const v of rarities) {
    console.log('setRarity', v)
    const tx = await drop.setRarity(v.name, v.probability, v.yield, v.boost)
    await tx.wait()
  }

  // Add animals
  for (const v of animals) {
    console.log('setAnimal', v)
    const tx = await drop.setAnimal(v.name, v.rarity, v.tokenURI, v.metadataURI)
    await tx.wait()
  }


  // Add hybrids
  for (const v of hybrids) {
    console.log('setHybrid', v)
    const tx = await drop.setHybrid(v.name, v.rarity, v.yield, v.parentA, v.parentB, v.tokenURI, v.metadataURI)
    await tx.wait()
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
