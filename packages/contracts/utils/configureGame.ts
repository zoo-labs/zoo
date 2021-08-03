// Generated from Yield Matrix spreadsheet (see: `yarn matrix`)
import rarities from './rarities.json';
import animals from './animals.json';
import hybrids from './hybrids.json';


// Configure game for our Gen 0 drop
export default async function configureGame(keeper: any, drop: any) {
  // Add Drop to ZooKeeper
  await keeper.setDrop(drop.address)

  // Configure Drop
  await drop.configureKeeper(keeper.address);

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
