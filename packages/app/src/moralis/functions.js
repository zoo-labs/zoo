Moralis.Cloud.afterSave("BuyEgg", async (request) => {
	const confirmed = request.object.get("confirmed");
  	const web3 = Moralis.web3ByChain("0x61"); // testnet
  	const logger = Moralis.Cloud.getLogger();
  	if (confirmed) {
      const tokenID = request.object.get("tokenID")
      const currentClass = Moralis.Object.extend("FinalEggs");
      const query1 = new Moralis.Query(currentClass);
      query1.equalTo("EggID", tokenID)
      const results1 = await query1.find()
      const current = results1[0];
      const ABI = Moralis.Object.extend("ABIs");
      const query = new Moralis.Query(ABI)
      query.equalTo("Name", "ZooKeeper")
      const resultArray = await query.find()
      const abiObj = resultArray[0].get("Abi")
      const abi = abiObj.abi
      const zooKeeper = new web3.eth.Contract(abi, "0x5eb16EA9e6e855061F0EC306CF18c78d2C43e20d")
      const eggInfo = await zooKeeper.methods.tokens(tokenID).call()
      current.set("EggID", parseInt(tokenID))
      current.set("Owner", request.object.get("from"))
      current.set("BlockNumber", request.object.get("block_number"))
      current.set("Type", "basic")
      current.set("Interactable", true)
      current.set("TokenURI", eggInfo.data.tokenURI)
      current.set("MetaURI", eggInfo.data.metadataURI)
      await current.save()
      logger.info("Saved Egg:" + tokenID)
  	} else {
    	logger.info("Egg Bought pending confirmation")
      	const TestClass = Moralis.Object.extend("FinalEggs");
        const currentTest = new TestClass();
        currentTest.set("EggID", parseInt(request.object.get("tokenID")));
        currentTest.set("Owner", request.object.get("from"))
        currentTest.set("BlockNumber", request.object.get("block_number"))
        currentTest.set("Type", "basic")
      	currentTest.set("Interactable", false)
        currentTest.save();
      	logger.info("Test Saved at " + Date.now())
    };
});

Moralis.Cloud.afterSave("Burn", async (request) => {
	const confirmed = request.object.get("confirmed");
  	const web3 = Moralis.web3ByChain("0x61"); // testnet
  	const logger = Moralis.Cloud.getLogger();
  	if (confirmed) {
      const object = request.object
      const existingEvent = Moralis.Object.extend("FinalEggs");
      const search = new Moralis.Query(existingEvent);
      search.equalTo("EggID", parseInt(object.get("tokenID")))
      const res = await search.find();
      const egg = res[0]
      egg.set("Burned", true)
      egg.save()
    } else {
    	logger.info("Egg Burn pending confirmation")
    }
});

Moralis.Cloud.afterSave("Hatch", async (request) => {
	const confirmed = request.object.get("confirmed");
  	const web3 = Moralis.web3ByChain("0x61"); // testnet
  	const logger = Moralis.Cloud.getLogger();
  	if (confirmed) {
      const object = request.object
      const animal = Moralis.Object.extend("FinalAnimals");
      const current = new animal()
      const tokenID = object.get("tokenID")
      const ABI = Moralis.Object.extend("ABIs");
      const query = new Moralis.Query(ABI)
      query.equalTo("Name", "ZooKeeper")
      const resultArray = await query.find()
      const abiObj = resultArray[0].get("Abi")
      const abi = abiObj.abi
      const zooKeeper = new web3.eth.Contract(abi, "0x5eb16EA9e6e855061F0EC306CF18c78d2C43e20d")
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
      current.set("AnimalTypeID", hatchedAnimal.kind)
      current.save()
      logger.info("Saved Animal")
    } else {
    	logger.info("Hatched Animal pending confirmation")
    }
});


Moralis.Cloud.afterSave("Breed", async (request) => {
	const confirmed = request.object.get("confirmed");
  	const web3 = Moralis.web3ByChain("0x61"); // testnet
  	const logger = Moralis.Cloud.getLogger();
  	if (confirmed) {
      const object = request.object
      /*
      const animal1 = object.get("_animalTokenId1")
      const animal2 = object.get("_animalTokenId2")
      const existingEvent = Moralis.Object.extend("FinalAnimals");
      const search1 = new Moralis.Query(existingEvent);
      search1.equalTo("AnimalID", animal1)
      const res1 = await search1.find()
      const an1 = res1[0]
      an1.set("RecentBreedTime", object.get("block_number"))
      an1.save();

      const existingEvent2 = Moralis.Object.extend("FinalAnimals")
      const srch = new Moralis.Query(existingEvent2);
      srch.equalTo("AnimalID", animal2)
      const res2 = await srch.find()
      const an2 = res2[0]
      an2.set("RecentBreedTime", object.get("block_number"))
      an2.save();
      */
      const ABI = Moralis.Object.extend("ABIs");
      const query = new Moralis.Query(ABI)
      query.equalTo("Name", "ZooKeeper")
      const resultArray = await query.find()
      const abiObj = resultArray[0].get("Abi")
      const abi = abiObj.abi
      const eggInfo = await zooKeeper.methods.tokens(tokenID).call()
      const zooKeeper = new web3.eth.Contract(abi, "0x5eb16EA9e6e855061F0EC306CF18c78d2C43e20d")
      const ClassCurrent = Moralis.Object.extend("FinalEggs");
      const current = new ClassCurrent();
      const tokenID = object.get("tokenID")
      const eggInfo = await zooKeeper.methods.tokens(tokenID).call()
      current.set("EggID", parseInt(tokenID))
      current.set("ParentA", parseInt(eggInfo.parents.tokenA))
      current.set("ParentB", parseInt(eggInfo.parents.tokenB))
      current.set("Owner", object.get("from"))
      current.set("BlockNumber", object.get("block_number"))
      current.set("Type", "hybrid")
      await current.save()
      logger.info("saved successfully")

    } else {
    	logger.info("Egg Hatched pending confirmation")
    }
});

Moralis.Cloud.afterSave("Free", async (request) => {
  	const confirmed = request.object.get("confirmed");
  	const web3 = Moralis.web3ByChain("0x61");
  	const logger = Moralis.Cloud.getLogger();
	if (confirmed) {
      const object = request.object
      const animal = Moralis.Object.extend("FinalAnimals");
      const query = new Moralis.Query(animal)
      query.equalTo("AnimalID", parseInt(object.get("tokenID")))
      const results = await query.find()
      const result = results[0]
      result.set("Freed", true)
      result.save()
      logger.info("Freed Animal into Wild")
    } else {
    	logger.info("Free animal is pending confirmation")
    }
});
