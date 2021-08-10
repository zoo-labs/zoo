const ZK    = ZOOKEEPER  // Generated during build
const CHAIN = 'CHAIN_ID' // Generated during build

// Get this enviroment's ZK contract
async function getZooKeeper() {
  	const web3 = Moralis.web3ByChain(CHAIN)
    return new web3.eth.Contract(ZK.abi, ZK.address)
}

// Is request confirmed?
function confirmed(request) {
    return request.object.get('confirmed')
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
    query.equalTo('eggID', eggID)
    return (await query.find())[0]
}

// Get latest token information from ZK
async function getToken(tokenID) {
    const zooKeeper = await getZooKeeper()
    return (await zooKeeper.methods.tokens(tokenID).call())
}

// Instantiate a new Animal
function newAnimal({ object }) {
    const Animals = Moralis.Object.extend('Animals')
    const animal = new Animals()
    animal.set('owner', object.get('from'))
    animal.set('blockNumber', object.get('block_number'))
    animal.set('transactionHash', object.get('transaction_hash'))
    animal.set('timestamp', Date.now())
    return animal
}

// Instantiate a new Egg
function newEgg({ object }) {
    const Eggs = Moralis.Object.extend('Eggs')
    const egg = new Eggs()
    egg.set('owner', object.get('from'))
    egg.set('blockNumber', object.get('block_number'))
    egg.set('transactionHash', object.get('transaction_hash'))
    egg.set('timestamp', Date.now())
    return egg
}

// Instantiate a new Transaction
function newTransaction({ object }) {
    const Transactions = Moralis.Object.extend('Transactions')
    const tx = new Transactions()
    tx.set('owner', object.get('from'))
    tx.set('blockNumber', object.get('block_number'))
    tx.set('transactionHash', object.get('transaction_hash'))
    tx.set('timestamp', Date.now())
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
    const tokenID = parseInt(request.object.get('tokenID'))

  	if (!confirmed(request)) {
    	logger.info('Egg Bought pending confirmation')
        const egg = newEgg(request)
        egg.set('eggID', tokenID)
        egg.set('kind', 0)
        egg.set('type', 'basic')
      	egg.set('interactive', false)
      	egg.set('hatched', false)
        await egg.save()
      	logger.info('Egg', tokenID, 'saved at ' + Date.now())
        return
    }

    const egg = await getEgg(tokenID)
    const tok = await getToken(tokenID)

    egg.set('interactive', true)
    egg.set('tokenURI', tok.data.tokenURI)
    egg.set('metadataURI', tok.data.metadataURI)
    await egg.save()

    logger.info('Saved Egg:' + tokenID)

    const tx = newTransaction(request)
    tx.set('action', 'Bought Egg')
    tx.set('tokenID', tokenID)
    await tx.save()
})

Moralis.Cloud.afterSave('Burn', async (request) => {
    if (!confirmed(request)) return
    const tokenID = parseInt(request.object.get('tokenID'))
    const tx = newTransaction(request)
    tx.set('action', 'Burned Token')
    tx.set('tokenID', tokenID)
    await tx.save()
})

Moralis.Cloud.afterSave('Hatch', async (request) => {
  	const logger  = Moralis.Cloud.getLogger()
  	const eggID   = parseInt(request.object.get('eggID'))
    const tokenID = parseInt(request.object.get('tokenID'))

  	if (!confirmed(request)) {
  	    const egg = await getEgg(eggID)
        egg.set('interactive', false)
      	egg.set('hatched', true)
        await egg.save()
        return logger.info('Hatched Egg pending confirmation')
    }

    const egg = await getEgg(eggID)
    egg.set('animalID', tokenID)
    egg.set('hatched', true)
    egg.set('interactive', true)
    egg.save()

    const tok = await getToken(tokenID)
    const animal = newAnimal(request)

    animal.set('tokenID', tokenID)
    animal.set('eggID', eggID)
    animal.set('owner', request.object.get('from'))
    animal.set('blockNumber', request.object.get('block_number'))
    animal.set('tokenURI', tok.data.tokenURI)
    animal.set('metadataURI', tok.data.metadataURI)
    animal.set('rarity', tok.rarity.name)
    animal.set('yield', parseInt(tok.rarity.yield))
    animal.set('boost', parseInt(tok.rarity.boost))
    animal.set('name', tok.name)
    animal.set('timestamp', parseInt(tok.timestamp))
    animal.set('listed', false)
    animal.set('revealed', false)
    animal.set('kind', parseInt(tok.kind))
    await animal.save()
    logger.info('Saved ' + tok.name)

    const tx = newTransaction(request)
    tx.set('action', 'Hatched Egg')
    tx.set('tokenID', tokenID)
    await tx.save()
})

Moralis.Cloud.afterSave('Breed', async (request) => {
  	const logger = Moralis.Cloud.getLogger()
    const tokenID = parseInt(request.object.get('tokenID'))
    const parentA = parseInt(request.object.get('parentA'))
    const parentB = parseInt(request.object.get('parentB'))
    const now = Date.now()

	if (!confirmed(request)) {
      // Save new Hybrid Egg
      const egg = newEgg(request)
      egg.set('tokenID', tokenID)
      egg.set('kind', 2)
      egg.set('type', 'hybrid')
      egg.set('interactive', false)
      egg.set('owner', request.object.get('from'))
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

      return logger.info(`Hybrid Egg ${tokenID} hatched, pending confirmation`)
      }

    // confirmed, set to interactive
    const egg = await getEgg(tokenID)
    const tok = await getToken(tokenID)
    egg.set('interactive', true)
    egg.set('tokenURI', tok.data.tokenURI)
    egg.set('metadataURI', tok.data.metadataURI)
    await egg.save()

    logger.info(`Hybrid Egg ${tokenID} saved successfully`)

    const tx = newTransaction(request)
    tx.set('action', 'Breed Animals')
    tx.set('parentA', tok.parentA)
    tx.set('parentB', tok.parentB)
    tx.set('tokenID', tokenID)
    await tx.save()
})

Moralis.Cloud.afterSave('Free', async (request) => {
    const logger = Moralis.Cloud.getLogger()

    if (!confirmed(request)) return

    const animal = getAnimal(tokenID)
    animal.set('freed', true)
    await animal.save()
    logger.info('Animal released into Wild')

    const tx = newTransaction(request)
    tx.set('action', 'Free Animal')
    tx.set('tokenID', tokenID)
    await tx.save()
})
