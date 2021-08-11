// Global constants injected during build
const ZK = ZOOKEEPER
const CHAIN = 'CHAIN_ID'

// Get this enviroment's ZK contract
async function getZooKeeper() {
  const web3 = Moralis.web3ByChain(CHAIN)
  return new web3.eth.Contract(ZK.abi, ZK.address)
}

// Query for a specific Animal
async function getAnimal(tokenID) {
  const Animals = Moralis.Object.extend('Animals')
  const query = new Moralis.Query(Animals)
  query.equalTo('tokenID', tokenID)
  return (await query.find())[0]
}

// Query for a specific Egg
async function getEgg(eggID) {
  const Eggs = Moralis.Object.extend('Eggs')
  const query = new Moralis.Query(Eggs)
  query.equalTo('tokenID', eggID)
  return (await query.find())[0]
}

// Get latest token information from ZK
async function getToken(tokenID) {
  const zooKeeper = await getZooKeeper()
  return await zooKeeper.methods.tokens(tokenID).call()
}

// Is current request confirmed?
function confirmed(request) {
  return request.object.get('confirmed')
}

function setCommon(entity, { object }) {
  entity.set('owner', object.get('from'))
  entity.set('from', object.get('from'))
  entity.set('blockNumber', object.get('block_number'))
  entity.set('transactionHash', object.get('transaction_hash'))
  entity.set('timestamp', Date.now())
}

// Instantiate a new Animal
function newAnimal(request) {
  const Animals = Moralis.Object.extend('Animals')
  const animal = new Animals()
  setCommon(animal, request)
  return animal
}

// Instantiate a new Egg
function newEgg(request) {
  const Eggs = Moralis.Object.extend('Eggs')
  const egg = new Eggs()
  setCommon(egg, request)
  return egg
}

// Instantiate a new Transaction
function newTransaction(request) {
  const Transactions = Moralis.Object.extend('Transactions')
  const tx = new Transactions()
  setCommon(tx, request)
  return tx
}

// This is a convenience function to drop the tables
Moralis.Cloud.afterSave('AddDrop', async (request) => {
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

Moralis.Cloud.afterSave('BuyEgg', async (request) => {
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

Moralis.Cloud.afterSave('Hatch', async (request) => {
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

Moralis.Cloud.afterSave('Breed', async (request) => {
  const logger = Moralis.Cloud.getLogger()
  const eggID = parseInt(request.object.get('eggID')) // new Hybrid Egg
  const parentA = parseInt(request.object.get('parentA')) // parent A ID
  const parentB = parseInt(request.object.get('parentB')) // parent B ID
  const now = Date.now()

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
    pA.set('recentBreedTime', now)
    await pA.save()

    const pB = await getAnimal(parentB)
    pB.set('recentBreedTime', now)
    await pB.save()

    logger.info(`Hybrid Egg ${tokenID} hatched, pending confirmation`)
    return
  }

  // confirmed, set to interactive
  const egg = await getEgg(eggID)
  const tok = await getToken(eggID)
  egg.set('interactive', true)
  egg.set('tokenURI', tok.data.tokenURI)
  egg.set('metadataURI', tok.data.metadataURI)
  egg.set('rarity', tok.rarity.name)
  await egg.save()

  const tx = newTransaction(request)
  tx.set('action', 'Breed Animals')
  tx.set('parentA', tok.parentA)
  tx.set('parentB', tok.parentB)
  tx.set('tokenID', tokenID)
  await tx.save()

  logger.info(`Hybrid Egg ${tokenID} saved successfully`)
})

// Update token state after burn
Moralis.Cloud.afterSave('Burn', async (request) => {
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
Moralis.Cloud.afterSave('Free', async (request) => {
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

  logger.info(`Animal ${name} (${tokenID} released into Wild`)
})
