import Moralis from './moralis'

// Should replace variables here to target different networks
import contracts from './contracts.json'

const ZK = (contracts as any)['97']['testnet']['ZooKeeper']
const CHAIN_ID = '97'

// Get this enviroment's ZK contract
<<<<<<< HEAD:packages/moralis/src/functions.js
async function getZooToken() {
  const web3 = Moralis.web3ByChain(CHAIN)
  return new web3.eth.Contract(ZK.abi, ZK.address)
}

// Get this enviroment's ZK contract
async function getZooKeeper() {
=======
async function getZooKeeper(): Promise<any> {
<<<<<<< HEAD
>>>>>>> c5f90c4 (Typescript cloud functions):packages/moralis/src/functions.ts
  const web3 = Moralis.web3ByChain(CHAIN)
=======
  const web3 = Moralis.web3ByChain(CHAIN_ID)
>>>>>>> f2ec3e4 (Wip)
  return new web3.eth.Contract(ZK.abi, ZK.address)
}

// Query for a specific Animal
async function getAnimal(tokenID: number): Promise<any> {
  const Animals = Moralis.Object.extend('Animals')
  const query = new Moralis.Query(Animals)
  query.equalTo('tokenID', tokenID)
  return (await query.find())[0]
}

// Query for a specific Egg
async function getEgg(eggID: number): Promise<any> {
  const Eggs = Moralis.Object.extend('Eggs')
  const query = new Moralis.Query(Eggs)
  query.equalTo('tokenID', eggID)
  return (await query.find())[0]
}

// Get latest token information from ZK
async function getToken(tokenID: number): Promise<any> {
  const zooKeeper = await getZooKeeper()
  return await zooKeeper.methods.tokens(tokenID).call()
}

// Is current request confirmed?
function confirmed(request: any) {
  return request.object.get('confirmed')
}

function setCommon(entity: any, { object }: any) {
  entity.set('owner', object.get('from'))
  entity.set('from', object.get('from'))
  entity.set('blockNumber', object.get('block_number'))
  entity.set('transactionHash', object.get('transaction_hash'))
  entity.set('timestamp', Date.now())
}

// Instantiate a new Animal
function newAnimal(request: any) {
  const Animals = Moralis.Object.extend('Animals')
  const animal = new Animals()
  setCommon(animal, request)
  return animal
}

// Instantiate a new Egg
function newEgg(request: any) {
  const Eggs = Moralis.Object.extend('Eggs')
  const egg = new Eggs()
  setCommon(egg, request)
  return egg
}

// Instantiate a new Transaction
function newTransaction(request: any) {
  const Transactions = Moralis.Object.extend('Transactions')
  const tx = new Transactions()
  setCommon(tx, request)
  return tx
}

Moralis.Cloud.afterSave('BuyEgg', async (request: any) => {
  const logger = Moralis.Cloud.getLogger()
  const eggID = parseInt(request.object.get('eggID')) // new Token ID

  if (!confirmed(request)) {
    const egg = newEgg(request)
    egg.set('tokenID', eggID)
    egg.set('kind', 0)
    egg.set('type', 'basic')
    egg.set('interactive', false)
    egg.set('hatched', false)
    await egg.save()
    logger.info(`Egg ${eggID} saved at ${Date.now()}`)
    return
  }

  const egg = await getEgg(eggID)
  const tok = await getToken(eggID)

  egg.set('interactive', true)
  egg.set('tokenURI', tok.data.tokenURI)
  egg.set('metadataURI', tok.data.metadataURI)
  egg.set('rarity', tok.rarity.name)
  await egg.save()

  const tx = newTransaction(request)
  tx.set('action', 'Bought Egg')
  tx.set('tokenID', eggID)
  await tx.save()

  logger.info(`Egg ${eggID} saved at ${Date.now()}`)
})

Moralis.Cloud.afterSave('Hatch', async (request: any) => {
  const logger = Moralis.Cloud.getLogger()
  const eggID = parseInt(request.object.get('eggID')) // Egg hatching will be burned
  const tokenID = parseInt(request.object.get('tokenID')) // New Animal minted

  const egg = await getEgg(eggID)

  if (!confirmed(request)) {
    // Update egg state
    egg.set('animalID', tokenID)
    egg.set('hatched', true)
    egg.set('interactive', false)
    await egg.save()

    // Set initial animal state
    const animal = newAnimal(request)
    animal.set('tokenID', tokenID)
    animal.set('eggID', eggID)
    await animal.save()

    logger.info(`Hatch Egg ${eggID} saved at ${Date.now()}`)
    return
  }

  // Update Egg
  egg.set('hatched', true)
  egg.set('interactive', true)
  await egg.save()

  // Update Animal with confirmed state
  const animal = await getAnimal(tokenID)
  const tok = await getToken(tokenID)
  animal.set('kind', parseInt(tok.kind))
  animal.set('tokenURI', tok.data.tokenURI)
  animal.set('metadataURI', tok.data.metadataURI)
  animal.set('rarity', tok.rarity.name)
  animal.set('yield', parseInt(tok.rarity.yield))
  animal.set('boost', parseInt(tok.rarity.boost))
  animal.set('name', tok.name)
  animal.set('listed', false)
  animal.set('revealed', false)
  await animal.save()

  const tx = newTransaction(request)
  tx.set('action', 'Hatched Egg')
  tx.set('eggID', eggID)
  tx.set('tokenID', tokenID)
  await tx.save()

  logger.info(`Hatched new ${tok.name} (${tokenID}) from ${eggID}`)
})

Moralis.Cloud.afterSave('Breed', async (request: any) => {
  const logger = Moralis.Cloud.getLogger()
  const eggID = parseInt(request.object.get('eggID')) // new Hybrid Egg
  const parentA = parseInt(request.object.get('parentA')) // parent A ID
  const parentB = parseInt(request.object.get('parentB')) // parent B ID
  const now = Date.now()

  logger.info(`Breed ${eggID}, ${parentA}, ${parentB}`)

  if (!confirmed(request)) {
    // Save new Hybrid Egg
    const egg = newEgg(request)
    egg.set('tokenID', eggID)
    egg.set('kind', 2)
    egg.set('type', 'hybrid')
    egg.set('interactive', false)
    egg.set('hatched', false)
    egg.set('parentA', parentA)
    egg.set('parentB', parentB)
    await egg.save()

    // Update breeding time on animals
    const pA = await getAnimal(parentA)
    pA.set('lastBred', now)

    if (pA['breedCount'] === undefined) {
      pA['breedCount'] = 0
    }

    pA.set('breedCount', pA['breedCount'] + 1)
    await pA.save()

    const pB = await getAnimal(parentB)
    pB.set('lastBred', now)

    if (pB['breedCount'] === undefined) {
      pB['breedCount'] = 0
    }

    pB.set('breedCount', pB['breedCount'] + 1)
    await pB.save()

    logger.info(`Hybrid Egg ${eggID} hatched, pending confirmation`)
    return
  }

  // confirmed, set to interactive
  const egg = await getEgg(eggID)
  // const tok = await getToken(eggID)
  egg.set('interactive', true)
  // egg.set('tokenURI', tok.data.tokenURI)
  // egg.set('metadataURI', tok.data.metadataURI)
  // egg.set('rarity', tok.rarity.name)
  await egg.save()

  const tx = newTransaction(request)
  tx.set('action', 'Breed Animals')
<<<<<<< HEAD:packages/moralis/src/functions.js
  tx.set('parentA', parentA)
  tx.set('parentB', parentB)
  tx.set('tokenID', eggID)
=======
  tx.set('parentA', tok.parentA)
  tx.set('parentB', tok.parentB)
  tx.set('tokenID', tok.tokenID)
>>>>>>> c5f90c4 (Typescript cloud functions):packages/moralis/src/functions.ts
  await tx.save()

  logger.info(`Hybrid Egg ${tok.tokenID} saved successfully`)
})

// Update token state after burn
Moralis.Cloud.afterSave('Burn', async (request: any) => {
  if (!confirmed(request)) return

  const logger = Moralis.Cloud.getLogger()
  const tokenID = parseInt(request.object.get('tokenID')) // Token burning

  const tx = newTransaction(request)
  tx.set('action', 'Burned Token')
  tx.set('tokenID', tokenID)
  await tx.save()

  logger.info(`Burned ${tokenID}`)
})

// Update animal state after Free
Moralis.Cloud.afterSave('Free', async (request: any) => {
  if (!confirmed(request)) return

  const logger = Moralis.Cloud.getLogger()
  const tokenID = parseInt(request.object.get('tokenID')) // Animal being freed

  const animal = await getAnimal(tokenID)
  animal.set('burned', true)
  animal.set('freed', true)
  await animal.save()

  const tx = newTransaction(request)
  tx.set('action', 'Free Animal')
  tx.set('tokenID', tokenID)
  await tx.save()

  logger.info(`Animal ${animal.name} (${tokenID} released into Wild`)
})

<<<<<<< HEAD:packages/moralis/src/functions.js
Moralis.Cloud.afterSave('Swap', async (request) => {
  if (!confirmed(request)) return

  if request.object.get()

  const logger  = Moralis.Cloud.getLogger()
  const chainID = parseInt(request.object.get('chainID'))
  const from    = request.object.get('from')
  const to      = request.object.get('to')
  const amount  = parseInt(request.object.get('amount'))

  if (chainID == CHAIN) {
    logger.info(`Minting ${amount} -> ${to}`)
  }

  logger.info(`Swap ${from} ${to} ${amount} ${chainID}`)
})

Moralis.Cloud.define('getAverageGasPrice', async function (request) {
=======
Moralis.Cloud.define('getAverageGasPrice', async function (request: any) {
>>>>>>> c5f90c4 (Typescript cloud functions):packages/moralis/src/functions.ts
  const query = new Moralis.Query('BscTransactions')
  const pipeline = [
    {
      group: {
        // group by "from_address"
        objectId: '$from_address',
        // add computed property avgGas
        // get average and convert wei to gwei
        avgGas: { $avg: { $divide: ['$gas_price', 1000000000] } },
      },
    },
    { sort: { avgGas: -1 } }, // sort by avgGas high to low
    { limit: 10 }, // only return top 10 results
  ]

  // the master key is required for aggregate queries
  return await query.aggregate(pipeline, { useMasterKey: true })
})

// This is a convenience function to drop the tables
Moralis.Cloud.define('dropTables', async (request: any) => {
  const logger = Moralis.Cloud.getLogger()

  // Wipe out all data
  const classNames = ['User', 'Breed', 'Burn', 'BuyEgg', 'Free', 'Hatch', 'Mint', 'Eggs', 'Animals', 'Transactions']

  for (const name of classNames) {
    const Class = Moralis.Object.extend(name)
    const query = new Moralis.Query(Class)
    const results = await query.limit(1000).find()

    logger.info(`Dropping table ${name}`)
    for (let i = 0; i < results.length; i++) {
      await results[i].destroy()
    }
  }
})
