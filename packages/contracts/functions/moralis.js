const ZK    = ZOOKEEPER  // Generated during build
const CHAIN = 'CHAIN_ID' // Generated during build

async function getZooKeeper() {
  	const web3 = Moralis.web3ByChain(CHAIN)
    return new web3.eth.Contract(ZK.abi, ZK.address)
}

// This is a convenience function to drop the tables
Moralis.Cloud.afterSave('AddDrop', async (request) => {
  const logger = Moralis.Cloud.getLogger();

  // Wipe out all data
  const classNames = ['User', 'Breed', 'Burn', 'BuyEgg', 'Free', 'Hatch', 'Mint', 'FinalEggs', 'FinalAnimals', 'Transactions']

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

Moralis.Cloud.afterSave("BuyEgg", async (request) => {
	const confirmed = request.object.get("confirmed");
  	const logger = Moralis.Cloud.getLogger();
  	if (confirmed) {
      const tokenID = request.object.get("tokenID")
      const currentClass = Moralis.Object.extend("FinalEggs");
      const query1 = new Moralis.Query(currentClass);
      query1.equalTo("EggID", parseInt(tokenID))
      const results = await query1.find()
      const current = results[0];

      const zooKeeper = await getZooKeeper()
      const eggInfo = await zooKeeper.methods.tokens(parseInt(tokenID)).call()
      current.set("EggID", parseInt(tokenID))
      current.set("Owner", request.object.get("from"))
      current.set("BlockNumber", request.object.get("block_number"))
      current.set("Type", "basic")
      current.set("Interactable", true)
      current.set("TokenURI", eggInfo.data.tokenURI)
      current.set("MetaURI", eggInfo.data.metadataURI)
      current.set("Kind", eggInfo.kind)
      await current.save()
      logger.info("Saved Egg:" + tokenID)
  	} else {
    	logger.info("Egg Bought pending confirmation")
      	const FinalEggs = Moralis.Object.extend("FinalEggs");
        const current = new FinalEggs();
        current.set("EggID", parseInt(request.object.get("tokenID")));
        current.set("Owner", request.object.get("from"))
        current.set("BlockNumber", request.object.get("block_number"))
        current.set("Type", "basic")
      	current.set("Interactable", false)
      	current.set("Hatched", false)
        current.save();
      	logger.info("Test Saved at " + Date.now())
    };
});

// Moralis.Cloud.afterSave("Burn", async (request) => {
// 	const confirmed = request.object.get("confirmed");
//   	const logger = Moralis.Cloud.getLogger();
//   	if (confirmed) {
//       const object = request.object
//       const existingEvent = Moralis.Object.extend("FinalEggs");
//       const search = new Moralis.Query(existingEvent);
//       search.equalTo("EggID", parseInt(object.get("tokenID")))
//       const res = await search.find();
//       const egg = res[0]
//       egg.set("Burned", true)
//       egg.save()
//     } else {
//     	logger.info("Egg Hatched pending confirmation")
//     }
// });

Moralis.Cloud.afterSave("Hatch", async (request) => {
	const confirmed = request.object.get("confirmed");
  	const logger = Moralis.Cloud.getLogger();

  	if (confirmed) {
      const tokenID = request.object.get("tokenID")
      const animal = Moralis.Object.extend("FinalAnimals");
      const current = new animal()
      const currentClass = Moralis.Object.extend("FinalEggs");
      const query1 = new Moralis.Query(currentClass);
      query1.equalTo("EggID", parseInt(request.object.get("eggID")))
      const results = await query1.find()

      const currentEgg = results[0];

      currentEgg.set("AnimalID", parseInt(tokenID))
      currentEgg.set("Hatched", true)
      currentEgg.set("Interactable", true)
      currentEgg.save()

      const zooKeeper = await getZooKeeper()
      const hatchedAnimal = await zooKeeper.methods.tokens(tokenID).call()
      logger.info('hatchedAnimal', hatchedAnimal)
      current.set("AnimalID", parseInt(tokenID))
      current.set("Owner", request.object.get("from"))
      current.set("BlockNumber", request.object.get("block_number"))
      current.set("TokenURI", hatchedAnimal.data.tokenURI)
      current.set("TokenURI", hatchedAnimal.data.tokenURI)
      current.set("Rarity", hatchedAnimal.rarity.name)
      current.set("Yield", hatchedAnimal.rarity.yield)
      current.set("Boost", hatchedAnimal.rarity.boost)
      current.set("Name", hatchedAnimal.name)
      current.set("Timestamp", hatchedAnimal.timestamp)
      current.set("Listed", false)
      current.set("Revealed", false)
      current.set("AnimalTypeID", hatchedAnimal.kind)
      current.save()
      logger.info("Saved Animal")
    } else {
    	logger.info("Hatched Animal pending confirmation")
        const currentClass = Moralis.Object.extend("FinalEggs");
        const query1 = new Moralis.Query(currentClass);
        query1.equalTo("EggID", parseInt(request.object.get("eggID")))
        const results = await query1.find()

        const currentEgg = results[0];

        currentEgg.set("Interactable", false)
      	currentEgg.set("Hatched", true)
        currentEgg.save()
    }
});


Moralis.Cloud.afterSave("Breed", async (request) => {
	const confirmed = request.object.get("confirmed");
  	const logger = Moralis.Cloud.getLogger();
  	if (confirmed) {

      const tokenID = request.object.get("tokenID")
      const currentClass = Moralis.Object.extend("FinalEggs");
      const query1 = new Moralis.Query(currentClass);
      query1.equalTo("EggID", parseInt(tokenID))
      const results = await query1.find()
      const current = results[0];
      current.set("Interactable", true)

      const zooKeeper = await getZooKeeper()
      const eggInfo = await zooKeeper.methods.tokens(parseInt(tokenID)).call()
      current.set("TokenURI", eggInfo.data.tokenURI)
      current.set("MetaURI", eggInfo.data.metadataURI)
      current.save()
      logger.info("saved successfully")

    } else {
      logger.info("Egg Hatched pending confirmation")

      const animal1 = request.object.get("parentA")
      const animal2 = request.object.get("parentB")
      const existingEvent = Moralis.Object.extend("FinalAnimals");
      const search1 = new Moralis.Query(existingEvent);
      search1.equalTo("AnimalID", parseInt(animal1))
      const res1 = await search1.find()
      const an1 = res1[0]
      an1.set("RecentBreedTime", request.object.get("block_number"))
      an1.save();

      const existingEvent2 = Moralis.Object.extend("FinalAnimals")
      const srch = new Moralis.Query(existingEvent2);
      srch.equalTo("AnimalID", parseInt(animal2))
      const res2 = await srch.find()
      const an2 = res2[0]
      an2.set("RecentBreedTime", request.object.get("block_number"))
      an2.save();

      const zooKeeper = await getZooKeeper()
      const ClassCurrent = Moralis.Object.extend("FinalEggs");
      const current = new ClassCurrent();
      const tokenID = request.object.get("tokenID")
      const eggInfo = await zooKeeper.methods.tokens(tokenID).call()
      current.set("EggID", parseInt(tokenID))
      current.set("ParentA", parseInt(eggInfo.parents.tokenA))
      current.set("ParentB", parseInt(eggInfo.parents.tokenB))
      current.set("Interactable", false)
      current.set("Owner", request.object.get("from"))
      current.set("BlockNumber", request.object.get("block_number"))
      current.set("Type", "hybrid")
      current.set("Hatched", false)
      await current.save()
    }
});

 Moralis.Cloud.afterSave("Free", async (request) => {
   	const confirmed = request.object.get("confirmed");
   	const logger = Moralis.Cloud.getLogger();
 	if (confirmed) {
       const animal = Moralis.Object.extend("FinalAnimals");
       const query = new Moralis.Query(animal)
       const parsedNum = parseInt(request.object.get("tokenID"))
       query.equalTo("AnimalID", parsedNum)
       const results = await query.find()
       const result = results[0]
       result.set("Freed", true)
       result.save()
       logger.info("Freed Animal into Wild")
     } else {
     	logger.info("Free animal is pending confirmation")
     }
 });

