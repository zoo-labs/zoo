const chainID = '0x539' // Localhost
// const chainID = '0x61'   // Testnet
// const chainID = '0x38'   // Mainnet

async function getZooKeeper() {
    const Contract = Moralis.Object.extend("Contracts");
    const query = new Moralis.Query(Contract)
    query.equalTo("Name", "ZooKeeper")
    const resultArray = await query.find()
    const abiObj = resultArray[0].get("ABI")
    return new web3.eth.Contract(abiObj.abi, abiObj.address)
}

Moralis.Cloud.afterSave("BuyEgg", async (request) => {
	const confirmed = request.object.get("confirmed");
  	const web3 = Moralis.web3ByChain("0x61"); // testnet
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
//   	const web3 = Moralis.web3ByChain("0x61"); // testnet
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
  	const web3 = Moralis.web3ByChain(chainID); // testnet
  	const logger = Moralis.Cloud.getLogger();
  	if (confirmed) {
      const object = request.object
      const tokenID = object.get("tokenID")
      const animal = Moralis.Object.extend("FinalAnimals");
      const current = new animal()
      const currentClass = Moralis.Object.extend("FinalEggs");
      const query1 = new Moralis.Query(currentClass);
      query1.equalTo("EggID", parseInt(object.get("eggID")))
      const results = await query1.find()

      const currentEgg = results[0];

      currentEgg.set("AnimalID", parseInt(tokenID))
      currentEgg.set("Hatched", true)
      currentEgg.set("Interactable", true)
      currentEgg.save()

      const zooKeeper = await getZooKeeper()
      const hatchedAnimal = await zooKeeper.methods.tokens(tokenID).call()
      current.set("AnimalID", parseInt(tokenID))
      current.set("Owner", object.get("from"))
      current.set("BlockNumber", request.object.get("block_number"))
      current.set("TokenURI", hatchedAnimal.data.tokenURI)
      current.set("Rarity", hatchedAnimal.rarity.name)
      current.set("Yield", hatchedAnimal.rarity.yield)
      current.set("Boost", hatchedAnimal.rarity.boost)
      current.set("Name", hatchedAnimal.name)
      current.set("Listed", false)
      current.set("Revealed", false)
      current.set("AnimalTypeID", hatchedAnimal.kind)
      current.save()
      logger.info("Saved Animal")
    } else {
    	logger.info("Hatched Animal pending confirmation")
        const currentClass = Moralis.Object.extend("FinalEggs");
        const query1 = new Moralis.Query(currentClass);
        query1.equalTo("EggID", parseInt(object.get("eggID")))
        const results = await query1.find()

        const currentEgg = results[0];

        currentEgg.set("Interactable", false)
      	currentEgg.set("Hatched", true)
        currentEgg.save()
    }
});


Moralis.Cloud.afterSave("Breed", async (request) => {
	const confirmed = request.object.get("confirmed");
  	const web3 = Moralis.web3ByChain(chainID); // testnet
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
      const object = request.object

      const animal1 = object.get("parentA")
      const animal2 = object.get("parentB")
      const existingEvent = Moralis.Object.extend("FinalAnimals");
      const search1 = new Moralis.Query(existingEvent);
      search1.equalTo("AnimalID", parseInt(animal1))
      const res1 = await search1.find()
      const an1 = res1[0]
      an1.set("RecentBreedTime", object.get("block_number"))
      an1.save();

      const existingEvent2 = Moralis.Object.extend("FinalAnimals")
      const srch = new Moralis.Query(existingEvent2);
      srch.equalTo("AnimalID", parseInt(animal2))
      const res2 = await srch.find()
      const an2 = res2[0]
      an2.set("RecentBreedTime", object.get("block_number"))
      an2.save();

      const zooKeeper = await getZooKeeper()
      const ClassCurrent = Moralis.Object.extend("FinalEggs");
      const current = new ClassCurrent();
      const tokenID = object.get("tokenID")
      const eggInfo = await zooKeeper.methods.tokens(tokenID).call()
      current.set("EggID", parseInt(tokenID))
      current.set("ParentA", parseInt(eggInfo.parents.tokenA))
      current.set("ParentB", parseInt(eggInfo.parents.tokenB))
      current.set("Interactable", false)
      current.set("Owner", object.get("from"))
      current.set("BlockNumber", object.get("block_number"))
      current.set("Type", "hybrid")
      current.set("Hatched", false)
      await current.save()
    }
});

 Moralis.Cloud.afterSave("Free", async (request) => {
   	const confirmed = request.object.get("confirmed");
   	const web3 = Moralis.web3ByChain(chainID);
   	const logger = Moralis.Cloud.getLogger();
 	if (confirmed) {
       const object = request.object
       const animal = Moralis.Object.extend("FinalAnimals");
       const query = new Moralis.Query(animal)
       const parsedNum = parseInt(object.get("tokenID"))
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

