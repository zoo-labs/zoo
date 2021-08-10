const hre = require('hardhat')
const ethers = hre.ethers

const rarities = require('../utils/rarities.json')
const animals  = require('../utils/animals.json')
const hybrids  = require('../utils/hybrids.json')
const hybrids  = require('../utils/hybrids.json')

const ZooDrop   = require('../deployments/testnet/ZooDrop.json')
const ZooKeeper = require('../deployments/testnet/ZooKeeper.json')

// Split game data into deploy-sized chunks
function chunks(arr, size) {
    const res = []
    for (let i = 0; i < arr.length; i += size) {
        const chunk = arr.slice(i, i + size)
        res.push(chunk)
    }
    return res
}

async function main() {
  const [signer] = await ethers.getSigners()

  const keeper = await (await ethers.getContractAt('ZooKeeper', ZooKeeper.address)).connect(signer)
  const drop = await (await ethers.getContractAt('ZooDrop', ZooDrop.address)).connect(signer)

  // // Configure game for our Gen 0 drop
  // await keeper.setDrop(ZooDrop.address)

  // // Configure Drop
  // await drop.configureKeeper(ZooKeeper.address);
  //
  const exp = ethers.BigNumber.from('10').pow(18)
  const basePrice = ethers.BigNumber.from('1500000').mul(exp)

  // Configure Name price
  await keeper.setNamePrice(basePrice) // about $20 / name

  // Add eggs
  const eggs = [
    {
      name: "Base Egg",
      price: basePrice * 10), // about $200 / egg
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

  // await drop.configureEggs('Base Egg', 'Hybrid Egg')

  // // Add rarities
  // rarities.sort(function(a, b) { return a.probability - b.probability });

  // for (const v of rarities) {
  //   console.log('setRarity', v)
  //   const tx = await drop.setRarity(v.name, v.probability, v.yield, v.boost)
  //   await tx.wait()
  // }

  // // Add animals
  // for (const chunk of chunks(animals, 20)) {
  //   console.log('setAnimals', chunk)
  //   const tx = await drop.setAnimals(chunk)
  //   await tx.wait()
  // }

  // // Add hybrids
  // for (const chunk of chunks(hybrids, 20)) {
  //   console.log('setHybrids', chunk)
  //   const tx = await drop.setHybrids(chunk)
  //   await tx.wait()
  // }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
