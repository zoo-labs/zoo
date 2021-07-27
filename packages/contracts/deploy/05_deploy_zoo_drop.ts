// deploy/04_deploy_zoo_drop.ts
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { getDeployerAddress } from '../lib/deploy_helper'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const useProxy = !hre.network.live

  const tokenAddress = (await deployments.get('ZooToken')).address
  const zooMediaAddress = (await deployments.get('ZooMedia')).address

  await deployments.get('ZooMedia');
  const media = (await ethers.getContractAt('ZooMedia', zooMediaAddress));

  console.log('MEDIA', media);

  // Add first drop
  const [dropID, dropAddress] = await media.addDrop('Gen 0', 16000, 210);
  console.log('ZooDrop', dropID, dropAddress);

  await media.setTokenURI(dropID, "basicEgg", "basicEgg.tokenURI1");
  await media.setMetadataURI(dropID, "basicEgg", "basicEgg.metadataURI1");
  await media.setTokenURI(dropID, "hybridEgg", "hybridEgg.tokenURI1");
  await media.setMetadataURI(dropID, "hybridEgg", "hybridEgg.metadataURI1");

  await media.addAnimal(dropID, "Pug", 100, "Common", 5500, "test","test");
  await media.addAnimal(dropID, "Butterfly", 100, "Common", 5500, "test1","test1");
  await media.addAnimal(dropID, "Kitten", 100, "Common", 5500, "test2","test2");
  await media.addAnimal(dropID, "Turtle", 100, "Common", 5500, "test3","test3");

  await media.addAnimal(dropID, "Penguin", 100, "Common", 5500, "test4","test4");
  await media.addAnimal(dropID, "Duckling", 100, "Common", 5500, "test5","test5");
  await media.addAnimal(dropID, "Orca", 100, "Common", 5500, "test6","test6");
  await media.addAnimal(dropID, "Elk", 100, "Common", 5500, "test7","test7");

  await media.addAnimal(dropID, "Panda", 100, "Common", 5500, "test8","test8");
  await media.addAnimal(dropID, "Gorilla", 100, "Common", 5500, "test9","test9");
  await media.addAnimal(dropID, "Lion", 100, "Common", 5500, "test11","test11");
  await media.addAnimal(dropID, "Elephant", 100, "Common", 5500,"test12","test12");

  await media.addAnimal(dropID, "Bear", 100, "Common", 5500, "test13","test13");
  await media.addAnimal(dropID, "Shark", 100, "Common", 5500, "test14","test14");

  await media.addAnimal(dropID, "Blobfish", 100, "Common", 5500, "test15","test15");
  await media.addAnimal(dropID, "Naked Mole Rat", 100, "Common", 5500, "test16","test16");

  await media.addHybrid(dropID, "Baby Elephant", "Elephant", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Baby%20Elephant.jpg", "testElephant")
  await media.addHybrid(dropID, "Baby Elk", "Elk", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Baby%20Elk.jpg", "testElk")
  await media.addHybrid(dropID, "Baby Gorilla", "Gorilla", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Baby%20Gorilla.jpg", "testGorilla")
  await media.addHybrid(dropID, "Baby Orca", "Orca", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Baby%20Orca.jpg", "testOrca")
  await media.addHybrid(dropID, "Baby Shark", "Shark", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Baby%20Shark.jpg", "testShark")
  await media.addHybrid(dropID, "Banda", "Bear", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Banda.jpg", "testBear")
  await media.addHybrid(dropID, "Bearblob", "Bear", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearblob.jpg", "testBear")
  await media.addHybrid(dropID, "Bearca", "Bear", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearca.jpg", "testBear")
  await media.addHybrid(dropID, "Bear Cub", "Bear", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bear%20Cub.jpg", "testBear")
  await media.addHybrid(dropID, "Bearilla", "Bear", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearilla.jpg", "testBear")
  await media.addHybrid(dropID, "Bearling", "Bear", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearling.jpg", "testBear")
  await media.addHybrid(dropID, "Bearlion", "Bear", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearlion.jpg", "testBear")
  await media.addHybrid(dropID, "Bearpug", "Bear", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearpug.jpg", "testBear")
  await media.addHybrid(dropID, "Bearrat", "Bear", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearrat.jpg", "testBear")
  await media.addHybrid(dropID, "Bearshark", "Bear", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearshark.jpg", "testBear")
  await media.addHybrid(dropID, "Beartle", "Bear", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Beartle.jpg", "testBear")
  await media.addHybrid(dropID, "Beartten", "Bear", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Beartten.jpg", "testBear")
  await media.addHybrid(dropID, "Beartterfly", "Bear", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Beartterfly.jpg", "testBear")
  await media.addHybrid(dropID, "Belephant", "Bear", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Belephant.jpg", "testBear")
  await media.addHybrid(dropID, "Belk", "Bear", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Belk.jpg", "testBear")
  await media.addHybrid(dropID, "Benguin", "Bear", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Benguin.jpg", "testBear")
  await media.addHybrid(dropID, "Butterbear", "Butterfly", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterbear.jpg", "testButterfly")
  await media.addHybrid(dropID, "Butterblob", "Butterfly", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterblob.jpg", "testButterfly")
  await media.addHybrid(dropID, "Butterflanda", "Butterfly", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterflanda.jpg", "testButterfly")
  await media.addHybrid(dropID, "Butterflelk", "Butterfly", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterflelk.jpg", "testButterfly")
  await media.addHybrid(dropID, "Butterflenguin", "Butterfly", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterflenguin.jpg", "testButterfly")
  await media.addHybrid(dropID, "Butterfling", "Butterfly", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterfling.jpg", "testButterfly")
  await media.addHybrid(dropID, "Butterflion", "Butterfly", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterflion.jpg", "testButterfly")
  await media.addHybrid(dropID, "Butterflitten", "Butterfly", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterflitten.jpg", "testButterfly")
  await media.addHybrid(dropID, "Butterla", "Butterfly", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterla.jpg", "testButterfly")
  await media.addHybrid(dropID, "Butterphant", "Butterfly", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterphant.jpg", "testButterfly")
  await media.addHybrid(dropID, "Butterpug", "Butterfly", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterpug.jpg", "testButterfly")
  await media.addHybrid(dropID, "Butterrat", "Butterfly", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterrat.jpg", "testButterfly")
  await media.addHybrid(dropID, "Buttershark", "Butterfly", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Buttershark.jpg", "testButterfly")
  await media.addHybrid(dropID, "Buttorca", "Butterfly", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Buttorca.jpg", "testButterfly")
  await media.addHybrid(dropID, "Butturtle", "Butterfly", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butturtle.jpg", "testButterfly")
  await media.addHybrid(dropID, "Caterpillar", "Butterfly", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Caterpillar.jpg", "testButterfly")
  await media.addHybrid(dropID, "Dorca", "Duckling", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Dorca.jpg", "testDuckling")
  await media.addHybrid(dropID, "Duckbear", "Duckling", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckbear.jpg", "testDuckling")
  await media.addHybrid(dropID, "Duckblob", "Duckling", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckblob.jpg", "testDuckling")
  await media.addHybrid(dropID, "Duckda", "Duckling", "Pands", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckda.jpg", "testDuckling")
  await media.addHybrid(dropID, "Duckelk", "Duckling", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckelk.jpg", "testDuckling")
  await media.addHybrid(dropID, "Duckerfly", "Duckling", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckerfly.jpg", "testDuckling")
  await media.addHybrid(dropID, "Duckitten", "Duckling", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckitten.jpg", "testDuckling")
  await media.addHybrid(dropID, "Ducklephant", "Duckling", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Ducklephant.jpg", "testDuckling")
  await media.addHybrid(dropID, "Ducklinguin", "Duckling", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Ducklinguin.jpg", "testDuckling")
  await media.addHybrid(dropID, "Ducklion", "Duckling", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Ducklion.jpg", "testDuckling")
  await media.addHybrid(dropID, "Duckorilla", "Duckling", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckorilla.jpg", "testDuckling")
  await media.addHybrid(dropID, "DuckPug", "Duckling", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/DuckPug.jpg", "testDuckling")
  await media.addHybrid(dropID, "Duckrat", "Duckling", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckrat.jpg", "testDuckling")
  await media.addHybrid(dropID, "Duckshark", "Duckling", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckshark.jpg", "testDuckling")
  await media.addHybrid(dropID, "Durtle", "Duckling", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Durtle.jpg", "testDuckling")
  await media.addHybrid(dropID, "Elebear", "Elephant", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elebear.jpg", "testElephant")
  await media.addHybrid(dropID, "Eleblob", "Elephant", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Eleblob.jpg", "testElephant")
  await media.addHybrid(dropID, "Elepanda", "Elephant", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elepanda.jpg", "testElephant")
  await media.addHybrid(dropID, "Elepenguin", "Elephant", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elepenguin.jpg", "testElephant")
  await media.addHybrid(dropID, "Elephantilla", "Elephant", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephantilla.jpg", "testElephant")
  await media.addHybrid(dropID, "Elephantterfly", "Elephant", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephantterfly.jpg", "testElephant")
  await media.addHybrid(dropID, "Elephanturtle", "Elephant", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephanturtle.jpg", "testElephant")
  await media.addHybrid(dropID, "Elephelk", "Elephant", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephelk.jpg", "testElephant")
  await media.addHybrid(dropID, "Elephitten", "Elephant", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephitten.jpg", "testElephant")
  await media.addHybrid(dropID, "Elephling", "Elephant", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephling.jpg", "testElephant")
  await media.addHybrid(dropID, "Elephlion", "Elephant", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephlion.jpg", "testElephant")
  await media.addHybrid(dropID, "Elephorca", "Elephant", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephorca.jpg", "testElephant")
  await media.addHybrid(dropID, "Elephrat", "Elephant", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephrat.jpg", "testElephant")
  await media.addHybrid(dropID, "Elepug", "Elephant", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elepug.jpg", "testElephant")
  await media.addHybrid(dropID, "Eleshark", "Elephant", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Eleshark.jpg", "testElephant")
  await media.addHybrid(dropID, "Elka", "Elk", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elka.jpg", "testElk")
  await media.addHybrid(dropID, "Elkanda", "Elk", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkanda.jpg", "testElk")
  await media.addHybrid(dropID, "Elkbear", "Elk", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkbear.jpg", "testElk")
  await media.addHybrid(dropID, "Elkenguin", "Elk", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkenguin.jpg", "testElk")
  await media.addHybrid(dropID, "Elkephant", "Elk", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkephant.jpg", "testElk")
  await media.addHybrid(dropID, "Elkerfly", "Elk", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkerfly.jpg", "testElk")
  await media.addHybrid(dropID, "Elkfish", "Elk", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkfish.jpg", "testElk")
  await media.addHybrid(dropID, "Elkion", "Elk", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkion.jpg", "testElk")
  await media.addHybrid(dropID, "Elkitten", "Elk", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkitten.jpg", "testElk")
  await media.addHybrid(dropID, "Elkling", "Elk", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkling.jpg", "testElk")
  await media.addHybrid(dropID, "Elkorilla", "Elk", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkorilla.jpg", "testElk")
  await media.addHybrid(dropID, "Elkpug", "Elk", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkpug.jpg", "testElk")
  await media.addHybrid(dropID, "Elk Rat", "Elk", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elk%20Rat.jpg", "testElk")
  await media.addHybrid(dropID, "Elkshark", "Elk", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkshark.jpg", "testElk")
  await media.addHybrid(dropID, "Elkurtle", "Elk", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkurtle.jpg", "testElk")
  await media.addHybrid(dropID, "Goranda", "Gorilla", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Goranda.jpg", "testGorilla")
  await media.addHybrid(dropID, "Gorca", "Gorilla", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorca.jpg", "testGorilla")
  await media.addHybrid(dropID, "Gorillabear", "Gorilla", "Near", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillabear.jpg", "testGorilla")
  await media.addHybrid(dropID, "Gorillablob", "Gorilla", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillablob.jpg", "testGorilla")
  await media.addHybrid(dropID, "Gorillafly", "Gorilla", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillafly.jpg", "testGorilla")
  await media.addHybrid(dropID, "Gorillaguin", "Gorilla", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillaguin.jpg", "testGorilla")
  await media.addHybrid(dropID, "Gorillaphant", "Gorilla", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillaphant.jpg", "testGorilla")
  await media.addHybrid(dropID, "Gorilla Rat", "Gorilla", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorilla%20Rat.jpg", "testGorilla")
  await media.addHybrid(dropID, "Gorillark", "Gorilla", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillark.jpg", "testGorilla")
  await media.addHybrid(dropID, "Gorillelk", "Gorilla", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillelk.jpg", "testGorilla")
  await media.addHybrid(dropID, "Gorilling", "Gorilla", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorilling.jpg", "testGorilla")
  await media.addHybrid(dropID, "Gorillion", "Gorilla", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillion.jpg", "testGorilla")
  await media.addHybrid(dropID, "Gorkitten", "Gorilla", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorkitten.jpg", "testGorilla")
  await media.addHybrid(dropID, "Gorturtle", "Gorilla", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorturtle.jpg", "testGorilla")
  await media.addHybrid(dropID, "Gug", "Gorilla", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gug.jpg", "testGorilla")
  await media.addHybrid(dropID, "Kittelk", "Kitten", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittelk.jpg", "testKitten")
  await media.addHybrid(dropID, "Kitten", "Kitten", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kitten.jpg", "testKitten")
  await media.addHybrid(dropID, "Kitterfly", "Kitten", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kitterfly.jpg", "testKitten")
  await media.addHybrid(dropID, "Kittorca", "Kitten", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittorca.jpg", "testKitten")
  await media.addHybrid(dropID, "Kittorilla", "Kitten", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittorilla.jpg", "testKitten")
  await media.addHybrid(dropID, "Kitturtle", "Kitten", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kitturtle.jpg", "testKitten")
  await media.addHybrid(dropID, "Kittybear", "Kitten", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittybear.jpg", "testKitten")
  await media.addHybrid(dropID, "Kitty Blob", "Kitten", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kitty%20Blob.jpg", "testKitten")
  await media.addHybrid(dropID, "Kittyling", "Kitten", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittyling.jpg", "testKitten")
  await media.addHybrid(dropID, "Kittypan", "Kitten", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittypan.jpg", "testKitten")
  await media.addHybrid(dropID, "Kittypenguin", "Kitten", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittypenguin.jpg", "testKitten")
  await media.addHybrid(dropID, "Kittyphant", "Kitten", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittyphant.jpg", "testKitten")
  await media.addHybrid(dropID, "Kitty Pug", "Kitten", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kitty%20Pug.jpg", "testKitten")
  await media.addHybrid(dropID, "Kitty Rat", "Kitten", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kitty%20Rat.jpg", "testKitten")
  await media.addHybrid(dropID, "Lelephant", "Lion", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lelephant.jpg", "testLion")
  await media.addHybrid(dropID, "Lionbear", "Lion", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionbear.jpg", "testLion")
  await media.addHybrid(dropID, "Lion Cub", "Lion", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lion%20Cub.jpg", "testLion")
  await media.addHybrid(dropID, "Lionda", "Lion", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionda.jpg", "testLion")
  await media.addHybrid(dropID, "Lionelk", "Lion", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionelk.jpg", "testLion")
  await media.addHybrid(dropID, "Lionfish", "Lion", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionfish.jpg", "testLion")
  await media.addHybrid(dropID, "Lionfly", "Lion", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionfly.jpg", "testLion")
  await media.addHybrid(dropID, "Lionguin", "Lion", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionguin.jpg", "testLion")
  await media.addHybrid(dropID, "Lionilla", "Lion", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionilla.jpg", "testLion")
  await media.addHybrid(dropID, "Lion Kitty", "Kitten", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Lion%20Kitty.jpg", "testKitten")
  await media.addHybrid(dropID, "Lionling", "Lion", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionling.jpg", "testLion")
  await media.addHybrid(dropID, "Lionorca", "Lion", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionorca.jpg", "testLion")
  await media.addHybrid(dropID, "Lionpug", "Lion", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionpug.jpg", "testLion")
  await media.addHybrid(dropID, "Lion Rat", "Lion", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lion%20Rat.jpg", "testLion")
  await media.addHybrid(dropID, "Lionshark", "Lion", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionshark.jpg", "testLion")
  await media.addHybrid(dropID, "Lionturtle", "Lion", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionturtle.jpg", "testLion")
  await media.addHybrid(dropID, "Litten", "Lion", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Litten.jpg", "testLion")
  await media.addHybrid(dropID, "Naked Blobfish", "Naked Mole Rat", "Bloblfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Blobfish.jpg", "testNaked Mole Rat")
  await media.addHybrid(dropID, "Naked Butterfly", "Naked Mole Rat", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Butterfly.jpg", "testNaked Mole Rat")
  await media.addHybrid(dropID, "Naked Duckling", "Naked Mole Rat", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Duckling.jpg", "testNaked Mole Rat")
  await media.addHybrid(dropID, "Naked Elephant", "Naked Mole Rat", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Elephant.jpg", "testNaked Mole Rat")
  await media.addHybrid(dropID, "Naked Lion", "Naked Mole Rat", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Lion.jpg", "testNaked Mole Rat")
  await media.addHybrid(dropID, "Naked Mole Bear", "Naked Mole Rat", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Bear.jpg", "testNaked Mole Rat")
  await media.addHybrid(dropID, "Naked Mole Elk", "Naked Mole Rat", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Elk.jpg", "testNaked Mole Rat")
  await media.addHybrid(dropID, "Naked Mole Gorilla", "Naked Mole Rat", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Gorilla.jpg", "testNaked Mole Rat")
  await media.addHybrid(dropID, "Naked Mole Kitten", "Naked Mole Rat", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Kitten.jpg", "testNaked Mole Rat")
  await media.addHybrid(dropID, "Naked Mole Orca", "Naked Mole Rat", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Orca.jpg", "testNaked Mole Rat")
  await media.addHybrid(dropID, "Naked Mole Pug", "Naked Mole Rat", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Pug.jpg", "testNaked Mole Rat")
  await media.addHybrid(dropID, "Naked Mole Rat", "Naked Mole Rat", "Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Rat.jpg", "testNaked Mole Rat")
  await media.addHybrid(dropID, "Naked Mole Shark", "Naked Mole Rat", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Shark.jpg", "testNaked Mole Rat")
  await media.addHybrid(dropID, "Naked Panda", "Naked Mole Rat", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Panda.jpg", "testNaked Mole Rat")
  await media.addHybrid(dropID, "Naked Penguin", "Naked Mole Rat", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Penguin.jpg", "testNaked Mole Rat")
  await media.addHybrid(dropID, "Naked Rat Baby", "Naked Mole Rat", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Rat%20Baby.jpg", "testNaked Mole Rat")
  await media.addHybrid(dropID, "Naked Turtle", "Naked Mole Rat", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Turtle.jpg", "testNaked Mole Rat")
  await media.addHybrid(dropID, "Orca Bear", "Orca", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orca%20Bear.jpg", "testOrca")
  await media.addHybrid(dropID, "Orcablob", "Orca", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcablob.jpg", "testOrca")
  await media.addHybrid(dropID, "Orcafly", "Orca", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcafly.jpg", "testOrca")
  await media.addHybrid(dropID, "Orcanda", "Orca", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcanda.jpg", "testOrca")
  await media.addHybrid(dropID, "Orcapeng", "Orca", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcapeng.jpg", "testOrca")
  await media.addHybrid(dropID, "Orcaphant", "Orca", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcaphant.jpg", "testOrca")
  await media.addHybrid(dropID, "Orcapug", "Orca", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcapug.jpg", "testOrca")
  await media.addHybrid(dropID, "Orcarat", "Orca", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcarat.jpg", "testOrca")
  await media.addHybrid(dropID, "Orcashark", "Orca", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcashark.jpg", "testOrca")
  await media.addHybrid(dropID, "Orcaturtle", "Orca", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcaturtle.jpg", "testOrca")
  await media.addHybrid(dropID, "Orcelk", "Orca", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcelk.jpg", "testOrca")
  await media.addHybrid(dropID, "Orcilla", "Orca", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcilla.jpg", "testOrca")
  await media.addHybrid(dropID, "Orcling", "Orca", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcling.jpg", "testOrca")
  await media.addHybrid(dropID, "Orclion", "Orca", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orclion.jpg", "testOrca")
  await media.addHybrid(dropID, "Orkitten", "Orca", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orkitten.jpg", "testOrca")
  await media.addHybrid(dropID, "Pandablob", "Panda", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandablob.jpg", "testPanda")
  await media.addHybrid(dropID, "Pandacat", "Panda", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandacat.jpg", "testPanda")
  await media.addHybrid(dropID, "Panda Cub", "Panda", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Panda%20Cub.jpg", "testPanda")
  await media.addHybrid(dropID, "Pandafly", "Panda", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandafly.jpg", "testPanda")
  await media.addHybrid(dropID, "Pandaling", "Panda", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandaling.jpg", "testPanda")
  await media.addHybrid(dropID, "Pandalion", "Panda", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandalion.jpg", "testPanda")
  await media.addHybrid(dropID, "Pandalla", "Panda", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandalla.jpg", "testPanda")
  await media.addHybrid(dropID, "Pandaphant", "Panda", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandaphant.jpg", "testPanda")
  await media.addHybrid(dropID, "Pandapug", "Panda", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandapug.jpg", "testPanda")
  await media.addHybrid(dropID, "Pandarat", "Panda", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandarat.jpg", "testPanda")
  await media.addHybrid(dropID, "Pandashark", "Panda", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandashark.jpg", "testPanda")
  await media.addHybrid(dropID, "Pandaturtle", "Panda", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandaturtle.jpg", "testPanda")
  await media.addHybrid(dropID, "Pandelk", "Panda", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandelk.jpg", "testPanda")
  await media.addHybrid(dropID, "Pandorca", "Panda", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandorca.jpg", "testPanda")
  await media.addHybrid(dropID, "Panduin", "Panda", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Panduin.jpg", "testPanda")
  await media.addHybrid(dropID, "Pearda", "Panda", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pearda.jpg", "testPanda")
  await media.addHybrid(dropID, "Pelephant", "Penguin", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Pelephant.jpg", "testPenguin")
  await media.addHybrid(dropID, "Pelk", "Pug", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pelk.jpg", "testPug")
  await media.addHybrid(dropID, "Penda", "Penguin", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penda.jpg", "testPenguin")
  await media.addHybrid(dropID, "Pengbear", "Penguin", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Pengbear.jpg", "testPenguin")
  await media.addHybrid(dropID, "Penggerfly", "Penguin", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penggerfly.jpg", "testPenguin")
  await media.addHybrid(dropID, "Pengkitty", "Penguin", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Pengkitty.jpg", "testPenguin")
  await media.addHybrid(dropID, "Pengling", "Penguin", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Pengling.jpg", "testPenguin")
  await media.addHybrid(dropID, "Pengpug", "Penguin", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Pengpug.jpg", "testPenguin")
  await media.addHybrid(dropID, "Penguelk", "Penguin", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguelk.jpg", "testPenguin")
  await media.addHybrid(dropID, "Penguilion", "Penguin", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguilion.jpg", "testPenguin")
  await media.addHybrid(dropID, "Penguilla", "Penguin", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguilla.jpg", "testPenguin")
  await media.addHybrid(dropID, "Penguin Chick", "Penguin", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguin%20Chick.jpg", "testPenguin")
  await media.addHybrid(dropID, "Penguinfish", "Penguin", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguinfish.jpg", "testPenguin")
  await media.addHybrid(dropID, "Penguinrat", "Penguin", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguinrat.jpg", "testPenguin")
  await media.addHybrid(dropID, "Penguin Shark", "Penguin", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguin%20Shark.jpg", "testPenguin")
  await media.addHybrid(dropID, "Penguorca", "Penguin", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguorca.jpg", "testPenguin")
  await media.addHybrid(dropID, "Pengurtle", "Penguin", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Pengurtle.jpg", "testPenguin")
  await media.addHybrid(dropID, "Plobfish", "Pug", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Plobfish.jpg", "testPug")
  await media.addHybrid(dropID, "Pugbear", "Pug", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugbear.jpg", "testPug")
  await media.addHybrid(dropID, "Pugda", "Pug", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugda.jpg", "testPug")
  await media.addHybrid(dropID, "Puggerfly", "Pug", "Buttefly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Puggerfly.jpg", "testPug")
  await media.addHybrid(dropID, "Puggerphant", "Pug", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Puggerphant.jpg", "testPug")
  await media.addHybrid(dropID, "Pugguin", "Pug", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugguin.jpg", "testPug")
  await media.addHybrid(dropID, "Puggy", "Pug", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Puggy.jpg", "testPug")
  await media.addHybrid(dropID, "Pugitten", "Pug", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugitten.jpg", "testPug")
  await media.addHybrid(dropID, "Pugling", "Pug", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugling.jpg", "testPug")
  await media.addHybrid(dropID, "Puglion", "Pug", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Puglion.jpg", "testPug")
  await media.addHybrid(dropID, "Pugorca", "Pug", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugorca.jpg", "testPug")
  await media.addHybrid(dropID, "Pugorilla", "Pug", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugorilla.jpg", "testPug")
  await media.addHybrid(dropID, "Pugrat", "Pug", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugrat.jpg", "testPug")
  await media.addHybrid(dropID, "Pugshark", "Pug", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugshark.jpg", "testPug")
  await media.addHybrid(dropID, "Pugurtle", "Pug", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugurtle.jpg", "testPug")
  await media.addHybrid(dropID, "Shanguin", "Shark", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shanguin.jpg", "testShark")
  await media.addHybrid(dropID, "Sharkbear", "Shark", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharkbear.jpg", "testShark")
  await media.addHybrid(dropID, "Sharkephant", "Shark", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharkephant.jpg", "testShark")
  await media.addHybrid(dropID, "Sharkerfly", "Shark", "Buttefly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharkerfly.jpg", "testShark")
  await media.addHybrid(dropID, "Sharkitten", "Shark", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharkitten.jpg", "testShark")
  await media.addHybrid(dropID, "Shark Kitty", "Kitten", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Shark%20Kitty.jpg", "testKitten")
  await media.addHybrid(dropID, "Sharkling", "Shark", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharkling.jpg", "testShark")
  await media.addHybrid(dropID, "Sharkorilla", "Shark", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharkorilla.jpg", "testShark")
  await media.addHybrid(dropID, "Shark Rat", "Shark", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shark%20Rat.jpg", "testShark")
  await media.addHybrid(dropID, "Sharnda", "Shark", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharnda.jpg", "testShark")
  await media.addHybrid(dropID, "Shelk", "Shark", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shelk.jpg", "testShark")
  await media.addHybrid(dropID, "Shlion", "Shark", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shlion.jpg", "testShark")
  await media.addHybrid(dropID, "Shlobfish", "Shark", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shlobfish.jpg", "testShark")
  await media.addHybrid(dropID, "Shorca", "Shark", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shorca.jpg", "testShark")
  await media.addHybrid(dropID, "Shug", "Shark", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shug.jpg", "testShark")
  await media.addHybrid(dropID, "Shurtle", "Shark", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shurtle.jpg", "testShark")
  await media.addHybrid(dropID, "Turtpug", "Turtle", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtpug.jpg", "testTurtle")
  await media.addHybrid(dropID, "Turtterfly", "Turtle", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtterfly.jpg", "testTurtle")
  await media.addHybrid(dropID, "Turkitten", "Turtle", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turkitten.jpg", "testTurtle")
  await media.addHybrid(dropID, "Tiny Turtle", "Turtle", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Tiny%20Turtle.jpg", "testTurtle")
  await media.addHybrid(dropID, "Turtlepeng", "Turtle", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtlepeng.jpg", "testTurtle")
  await media.addHybrid(dropID, "Turtling", "Turtle", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtling.jpg", "testTurtle")
  await media.addHybrid(dropID, "Turtorca", "Turtle", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtorca.jpg", "testTurtle")
  await media.addHybrid(dropID, "Turtelk", "Turtle", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtelk.jpg", "testTurtle")
  await media.addHybrid(dropID, "Turtanda", "Turtle", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtanda.jpg", "testTurtle")
  await media.addHybrid(dropID, "Turtilla", "Turtle", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtilla.jpg", "testTurtle")
  await media.addHybrid(dropID, "Turtelephant", "Turtle", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtelephant.jpg", "testTurtle")
  await media.addHybrid(dropID, "Turtlion", "Turtle", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtlion.jpg", "testTurtle")
  await media.addHybrid(dropID, "Turtle Bear", "Turtle", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtle%20Bear.jpg", "testTurtle")
  await media.addHybrid(dropID, "Turtleshark", "Turtle", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtleshark.jpg", "testTurtle")
  await media.addHybrid(dropID, "Turtleblob", "Turtle", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtleblob.jpg", "testTurtle")
  await media.addHybrid(dropID, "Turtlerat", "Turtle", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtlerat.jpg", "testTurtle")

  const mediaAddress = await media.mediaAddress();

  // Proxy only in non-live network (localhost and hardhat network) enabling
  // HCR (Hot Contract Replacement) in live network, proxy is disabled and
  // constructor is invoked
  await deploy('ZooAuction', {
    from: deployer,
    args: [mediaAddress, tokenAddress],
    log: true,
    // proxy: useProxy && 'postUpgrade',
  })

  return !useProxy // When live network, record the script as executed to prevent rexecution
}

export default func
func.id = 'deploy_zoo_drop' // ID required to prevent reexecution
func.tags = ['ZooDrop']
