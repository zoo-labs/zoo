// deploy/04_deploy_zoo_drop.ts

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const deployResult = await deploy('ZooDrop', {
    from: deployer,
    args: ['Gen 0', 16000],
    log: true,
  })

  const dropAddress = deployResult.address;

  // Bail out if we've added all the animals before
  if (!deployResult.newlyDeployed) {
    return
  }

  // Get instance of keeper
  const keeperAddress = (await deployments.get('ZooKeeper')).address
  const keeper = await hre.ethers.getContractAt('ZooKeeper', keeperAddress);

  // Add first Drop
  console.log('Add Gen 0 drop')
  const id = await keeper.callStatic.setDrop(dropAddress, 'Gen 0', 16000)

  const drop = await hre.ethers.getContractAt('ZooDrop', dropAddress);

  console.log('Configure Gen 0 drop')
  await drop.setEgg("egg", 210, 16000, "https://db.zoolabs/egg.jpg", "https://db.zoolabs.org/egg.json");
  await drop.setEgg("hybridEgg", 0, 0, "https://db.zoolabs/hybridegg.jpg", "https://db.zoolabs.org/hybridEgg.json");

  console.log('Adding Common animals')
  // await drop.addAnimal("Pug", 100, "Common", 5500, "test","test");
  // await drop.addAnimal("Butterfly", 100, "Common", 5500, "test1","test1");
  // await drop.addAnimal("Kitten", 100, "Common", 5500, "test2","test2");
  // await drop.addAnimal("Turtle", 100, "Common", 5500, "test3","test3");

  // await drop.addAnimal("Penguin", 200, "Common", 3100, "test4","test4");
  // await drop.addAnimal("Duckling", 200, "Common", 3100, "test5","test5");
  // await drop.addAnimal("Orca", 200, "Common", 3100, "test6","test6");
  // await drop.addAnimal("Elk", 200, "Common", 3100, "test7","test7");

  // await drop.addAnimal("Panda", 500, "Common", 1250, "test8","test8");
  // await drop.addAnimal("Gorilla", 500, "Common", 1250, "test9","test9");
  // await drop.addAnimal("Lion", 500, "Common", 1250, "test11","test11");
  // await drop.addAnimal("Elephant", 500, "Common", 1250,"test12","test12");

  // await drop.addAnimal("Bear", 1000, "Common", 100, "test13","test13");
  // await drop.addAnimal("Shark", 1500, "Common", 100, "test14","test14");

  // await drop.addAnimal("Blobfish", 100, "Common", 50, "test15","test15");
  // await drop.addAnimal("Naked Mole Rat", 100, "Common", 50, "test16","test16");

  // console.log('Adding Hybrid Animals')
  // await drop.addHybrid("Baby Elephant", "Elephant", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Baby%20Elephant.jpg", "testElephant")
  // await drop.addHybrid("Baby Elk", "Elk", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Baby%20Elk.jpg", "testElk")
  // await drop.addHybrid("Baby Gorilla", "Gorilla", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Baby%20Gorilla.jpg", "testGorilla")
  // await drop.addHybrid("Baby Orca", "Orca", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Baby%20Orca.jpg", "testOrca")
  // await drop.addHybrid("Baby Shark", "Shark", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Baby%20Shark.jpg", "testShark")
  // await drop.addHybrid("Banda", "Bear", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Banda.jpg", "testBear")
  // await drop.addHybrid("Bearblob", "Bear", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearblob.jpg", "testBear")
  // await drop.addHybrid("Bearca", "Bear", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearca.jpg", "testBear")
  // await drop.addHybrid("Bear Cub", "Bear", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bear%20Cub.jpg", "testBear")
  // await drop.addHybrid("Bearilla", "Bear", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearilla.jpg", "testBear")
  // await drop.addHybrid("Bearling", "Bear", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearling.jpg", "testBear")
  // await drop.addHybrid("Bearlion", "Bear", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearlion.jpg", "testBear")
  // await drop.addHybrid("Bearpug", "Bear", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearpug.jpg", "testBear")
  // await drop.addHybrid("Bearrat", "Bear", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearrat.jpg", "testBear")
  // await drop.addHybrid("Bearshark", "Bear", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearshark.jpg", "testBear")
  // await drop.addHybrid("Beartle", "Bear", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Beartle.jpg", "testBear")
  // await drop.addHybrid("Beartten", "Bear", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Beartten.jpg", "testBear")
  // await drop.addHybrid("Beartterfly", "Bear", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Beartterfly.jpg", "testBear")
  // await drop.addHybrid("Belephant", "Bear", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Belephant.jpg", "testBear")
  // await drop.addHybrid("Belk", "Bear", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Belk.jpg", "testBear")
  // await drop.addHybrid("Benguin", "Bear", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Benguin.jpg", "testBear")
  // await drop.addHybrid("Butterbear", "Butterfly", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterbear.jpg", "testButterfly")
  // await drop.addHybrid("Butterblob", "Butterfly", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterblob.jpg", "testButterfly")
  // await drop.addHybrid("Butterflanda", "Butterfly", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterflanda.jpg", "testButterfly")
  // await drop.addHybrid("Butterflelk", "Butterfly", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterflelk.jpg", "testButterfly")
  // await drop.addHybrid("Butterflenguin", "Butterfly", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterflenguin.jpg", "testButterfly")
  // await drop.addHybrid("Butterfling", "Butterfly", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterfling.jpg", "testButterfly")
  // await drop.addHybrid("Butterflion", "Butterfly", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterflion.jpg", "testButterfly")
  // await drop.addHybrid("Butterflitten", "Butterfly", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterflitten.jpg", "testButterfly")
  // await drop.addHybrid("Butterla", "Butterfly", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterla.jpg", "testButterfly")
  // await drop.addHybrid("Butterphant", "Butterfly", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterphant.jpg", "testButterfly")
  // await drop.addHybrid("Butterpug", "Butterfly", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterpug.jpg", "testButterfly")
  // await drop.addHybrid("Butterrat", "Butterfly", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterrat.jpg", "testButterfly")
  // await drop.addHybrid("Buttershark", "Butterfly", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Buttershark.jpg", "testButterfly")
  // await drop.addHybrid("Buttorca", "Butterfly", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Buttorca.jpg", "testButterfly")
  // await drop.addHybrid("Butturtle", "Butterfly", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butturtle.jpg", "testButterfly")
  // await drop.addHybrid("Caterpillar", "Butterfly", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Caterpillar.jpg", "testButterfly")
  // await drop.addHybrid("Dorca", "Duckling", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Dorca.jpg", "testDuckling")
  // await drop.addHybrid("Duckbear", "Duckling", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckbear.jpg", "testDuckling")
  // await drop.addHybrid("Duckblob", "Duckling", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckblob.jpg", "testDuckling")
  // await drop.addHybrid("Duckda", "Duckling", "Pands", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckda.jpg", "testDuckling")
  // await drop.addHybrid("Duckelk", "Duckling", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckelk.jpg", "testDuckling")
  // await drop.addHybrid("Duckerfly", "Duckling", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckerfly.jpg", "testDuckling")
  // await drop.addHybrid("Duckitten", "Duckling", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckitten.jpg", "testDuckling")
  // await drop.addHybrid("Ducklephant", "Duckling", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Ducklephant.jpg", "testDuckling")
  // await drop.addHybrid("Ducklinguin", "Duckling", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Ducklinguin.jpg", "testDuckling")
  // await drop.addHybrid("Ducklion", "Duckling", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Ducklion.jpg", "testDuckling")
  // await drop.addHybrid("Duckorilla", "Duckling", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckorilla.jpg", "testDuckling")
  // await drop.addHybrid("DuckPug", "Duckling", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/DuckPug.jpg", "testDuckling")
  // await drop.addHybrid("Duckrat", "Duckling", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckrat.jpg", "testDuckling")
  // await drop.addHybrid("Duckshark", "Duckling", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckshark.jpg", "testDuckling")
  // await drop.addHybrid("Durtle", "Duckling", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Durtle.jpg", "testDuckling")
  // await drop.addHybrid("Elebear", "Elephant", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elebear.jpg", "testElephant")
  // await drop.addHybrid("Eleblob", "Elephant", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Eleblob.jpg", "testElephant")
  // await drop.addHybrid("Elepanda", "Elephant", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elepanda.jpg", "testElephant")
  // await drop.addHybrid("Elepenguin", "Elephant", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elepenguin.jpg", "testElephant")
  // await drop.addHybrid("Elephantilla", "Elephant", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephantilla.jpg", "testElephant")
  // await drop.addHybrid("Elephantterfly", "Elephant", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephantterfly.jpg", "testElephant")
  // await drop.addHybrid("Elephanturtle", "Elephant", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephanturtle.jpg", "testElephant")
  // await drop.addHybrid("Elephelk", "Elephant", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephelk.jpg", "testElephant")
  // await drop.addHybrid("Elephitten", "Elephant", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephitten.jpg", "testElephant")
  // await drop.addHybrid("Elephling", "Elephant", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephling.jpg", "testElephant")
  // await drop.addHybrid("Elephlion", "Elephant", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephlion.jpg", "testElephant")
  // await drop.addHybrid("Elephorca", "Elephant", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephorca.jpg", "testElephant")
  // await drop.addHybrid("Elephrat", "Elephant", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephrat.jpg", "testElephant")
  // await drop.addHybrid("Elepug", "Elephant", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elepug.jpg", "testElephant")
  // await drop.addHybrid("Eleshark", "Elephant", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Eleshark.jpg", "testElephant")
  // await drop.addHybrid("Elka", "Elk", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elka.jpg", "testElk")
  // await drop.addHybrid("Elkanda", "Elk", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkanda.jpg", "testElk")
  // await drop.addHybrid("Elkbear", "Elk", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkbear.jpg", "testElk")
  // await drop.addHybrid("Elkenguin", "Elk", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkenguin.jpg", "testElk")
  // await drop.addHybrid("Elkephant", "Elk", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkephant.jpg", "testElk")
  // await drop.addHybrid("Elkerfly", "Elk", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkerfly.jpg", "testElk")
  // await drop.addHybrid("Elkfish", "Elk", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkfish.jpg", "testElk")
  // await drop.addHybrid("Elkion", "Elk", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkion.jpg", "testElk")
  // await drop.addHybrid("Elkitten", "Elk", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkitten.jpg", "testElk")
  // await drop.addHybrid("Elkling", "Elk", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkling.jpg", "testElk")
  // await drop.addHybrid("Elkorilla", "Elk", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkorilla.jpg", "testElk")
  // await drop.addHybrid("Elkpug", "Elk", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkpug.jpg", "testElk")
  // await drop.addHybrid("Elk Rat", "Elk", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elk%20Rat.jpg", "testElk")
  // await drop.addHybrid("Elkshark", "Elk", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkshark.jpg", "testElk")
  // await drop.addHybrid("Elkurtle", "Elk", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkurtle.jpg", "testElk")
  // await drop.addHybrid("Goranda", "Gorilla", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Goranda.jpg", "testGorilla")
  // await drop.addHybrid("Gorca", "Gorilla", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorca.jpg", "testGorilla")
  // await drop.addHybrid("Gorillabear", "Gorilla", "Near", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillabear.jpg", "testGorilla")
  // await drop.addHybrid("Gorillablob", "Gorilla", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillablob.jpg", "testGorilla")
  // await drop.addHybrid("Gorillafly", "Gorilla", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillafly.jpg", "testGorilla")
  // await drop.addHybrid("Gorillaguin", "Gorilla", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillaguin.jpg", "testGorilla")
  // await drop.addHybrid("Gorillaphant", "Gorilla", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillaphant.jpg", "testGorilla")
  // await drop.addHybrid("Gorilla Rat", "Gorilla", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorilla%20Rat.jpg", "testGorilla")
  // await drop.addHybrid("Gorillark", "Gorilla", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillark.jpg", "testGorilla")
  // await drop.addHybrid("Gorillelk", "Gorilla", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillelk.jpg", "testGorilla")
  // await drop.addHybrid("Gorilling", "Gorilla", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorilling.jpg", "testGorilla")
  // await drop.addHybrid("Gorillion", "Gorilla", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillion.jpg", "testGorilla")
  // await drop.addHybrid("Gorkitten", "Gorilla", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorkitten.jpg", "testGorilla")
  // await drop.addHybrid("Gorturtle", "Gorilla", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorturtle.jpg", "testGorilla")
  // await drop.addHybrid("Gug", "Gorilla", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gug.jpg", "testGorilla")
  // await drop.addHybrid("Kittelk", "Kitten", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittelk.jpg", "testKitten")
  // await drop.addHybrid("Kitten", "Kitten", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kitten.jpg", "testKitten")
  // await drop.addHybrid("Kitterfly", "Kitten", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kitterfly.jpg", "testKitten")
  // await drop.addHybrid("Kittorca", "Kitten", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittorca.jpg", "testKitten")
  // await drop.addHybrid("Kittorilla", "Kitten", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittorilla.jpg", "testKitten")
  // await drop.addHybrid("Kitturtle", "Kitten", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kitturtle.jpg", "testKitten")
  // await drop.addHybrid("Kittybear", "Kitten", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittybear.jpg", "testKitten")
  // await drop.addHybrid("Kitty Blob", "Kitten", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kitty%20Blob.jpg", "testKitten")
  // await drop.addHybrid("Kittyling", "Kitten", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittyling.jpg", "testKitten")
  // await drop.addHybrid("Kittypan", "Kitten", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittypan.jpg", "testKitten")
  // await drop.addHybrid("Kittypenguin", "Kitten", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittypenguin.jpg", "testKitten")
  // await drop.addHybrid("Kittyphant", "Kitten", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittyphant.jpg", "testKitten")
  // await drop.addHybrid("Kitty Pug", "Kitten", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kitty%20Pug.jpg", "testKitten")
  // await drop.addHybrid("Kitty Rat", "Kitten", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kitty%20Rat.jpg", "testKitten")
  // await drop.addHybrid("Lelephant", "Lion", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lelephant.jpg", "testLion")
  // await drop.addHybrid("Lionbear", "Lion", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionbear.jpg", "testLion")
  // await drop.addHybrid("Lion Cub", "Lion", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lion%20Cub.jpg", "testLion")
  // await drop.addHybrid("Lionda", "Lion", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionda.jpg", "testLion")
  // await drop.addHybrid("Lionelk", "Lion", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionelk.jpg", "testLion")
  // await drop.addHybrid("Lionfish", "Lion", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionfish.jpg", "testLion")
  // await drop.addHybrid("Lionfly", "Lion", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionfly.jpg", "testLion")
  // await drop.addHybrid("Lionguin", "Lion", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionguin.jpg", "testLion")
  // await drop.addHybrid("Lionilla", "Lion", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionilla.jpg", "testLion")
  // await drop.addHybrid("Lion Kitty", "Kitten", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Lion%20Kitty.jpg", "testKitten")
  // await drop.addHybrid("Lionling", "Lion", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionling.jpg", "testLion")
  // await drop.addHybrid("Lionorca", "Lion", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionorca.jpg", "testLion")
  // await drop.addHybrid("Lionpug", "Lion", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionpug.jpg", "testLion")
  // await drop.addHybrid("Lion Rat", "Lion", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lion%20Rat.jpg", "testLion")
  // await drop.addHybrid("Lionshark", "Lion", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionshark.jpg", "testLion")
  // await drop.addHybrid("Lionturtle", "Lion", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionturtle.jpg", "testLion")
  // await drop.addHybrid("Litten", "Lion", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Litten.jpg", "testLion")
  // await drop.addHybrid("Naked Blobfish", "Naked Mole Rat", "Bloblfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Blobfish.jpg", "testNaked Mole Rat")
  // await drop.addHybrid("Naked Butterfly", "Naked Mole Rat", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Butterfly.jpg", "testNaked Mole Rat")
  // await drop.addHybrid("Naked Duckling", "Naked Mole Rat", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Duckling.jpg", "testNaked Mole Rat")
  // await drop.addHybrid("Naked Elephant", "Naked Mole Rat", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Elephant.jpg", "testNaked Mole Rat")
  // await drop.addHybrid("Naked Lion", "Naked Mole Rat", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Lion.jpg", "testNaked Mole Rat")
  // await drop.addHybrid("Naked Mole Bear", "Naked Mole Rat", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Bear.jpg", "testNaked Mole Rat")
  // await drop.addHybrid("Naked Mole Elk", "Naked Mole Rat", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Elk.jpg", "testNaked Mole Rat")
  // await drop.addHybrid("Naked Mole Gorilla", "Naked Mole Rat", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Gorilla.jpg", "testNaked Mole Rat")
  // await drop.addHybrid("Naked Mole Kitten", "Naked Mole Rat", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Kitten.jpg", "testNaked Mole Rat")
  // await drop.addHybrid("Naked Mole Orca", "Naked Mole Rat", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Orca.jpg", "testNaked Mole Rat")
  // await drop.addHybrid("Naked Mole Pug", "Naked Mole Rat", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Pug.jpg", "testNaked Mole Rat")
  // await drop.addHybrid("Naked Mole Rat", "Naked Mole Rat", "Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Rat.jpg", "testNaked Mole Rat")
  // await drop.addHybrid("Naked Mole Shark", "Naked Mole Rat", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Shark.jpg", "testNaked Mole Rat")
  // await drop.addHybrid("Naked Panda", "Naked Mole Rat", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Panda.jpg", "testNaked Mole Rat")
  // await drop.addHybrid("Naked Penguin", "Naked Mole Rat", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Penguin.jpg", "testNaked Mole Rat")
  // await drop.addHybrid("Naked Rat Baby", "Naked Mole Rat", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Rat%20Baby.jpg", "testNaked Mole Rat")
  // await drop.addHybrid("Naked Turtle", "Naked Mole Rat", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Turtle.jpg", "testNaked Mole Rat")
  // await drop.addHybrid("Orca Bear", "Orca", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orca%20Bear.jpg", "testOrca")
  // await drop.addHybrid("Orcablob", "Orca", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcablob.jpg", "testOrca")
  // await drop.addHybrid("Orcafly", "Orca", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcafly.jpg", "testOrca")
  // await drop.addHybrid("Orcanda", "Orca", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcanda.jpg", "testOrca")
  // await drop.addHybrid("Orcapeng", "Orca", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcapeng.jpg", "testOrca")
  // await drop.addHybrid("Orcaphant", "Orca", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcaphant.jpg", "testOrca")
  // await drop.addHybrid("Orcapug", "Orca", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcapug.jpg", "testOrca")
  // await drop.addHybrid("Orcarat", "Orca", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcarat.jpg", "testOrca")
  // await drop.addHybrid("Orcashark", "Orca", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcashark.jpg", "testOrca")
  // await drop.addHybrid("Orcaturtle", "Orca", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcaturtle.jpg", "testOrca")
  // await drop.addHybrid("Orcelk", "Orca", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcelk.jpg", "testOrca")
  // await drop.addHybrid("Orcilla", "Orca", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcilla.jpg", "testOrca")
  // await drop.addHybrid("Orcling", "Orca", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcling.jpg", "testOrca")
  // await drop.addHybrid("Orclion", "Orca", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orclion.jpg", "testOrca")
  // await drop.addHybrid("Orkitten", "Orca", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orkitten.jpg", "testOrca")
  // await drop.addHybrid("Pandablob", "Panda", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandablob.jpg", "testPanda")
  // await drop.addHybrid("Pandacat", "Panda", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandacat.jpg", "testPanda")
  // await drop.addHybrid("Panda Cub", "Panda", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Panda%20Cub.jpg", "testPanda")
  // await drop.addHybrid("Pandafly", "Panda", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandafly.jpg", "testPanda")
  // await drop.addHybrid("Pandaling", "Panda", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandaling.jpg", "testPanda")
  // await drop.addHybrid("Pandalion", "Panda", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandalion.jpg", "testPanda")
  // await drop.addHybrid("Pandalla", "Panda", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandalla.jpg", "testPanda")
  // await drop.addHybrid("Pandaphant", "Panda", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandaphant.jpg", "testPanda")
  // await drop.addHybrid("Pandapug", "Panda", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandapug.jpg", "testPanda")
  // await drop.addHybrid("Pandarat", "Panda", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandarat.jpg", "testPanda")
  // await drop.addHybrid("Pandashark", "Panda", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandashark.jpg", "testPanda")
  // await drop.addHybrid("Pandaturtle", "Panda", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandaturtle.jpg", "testPanda")
  // await drop.addHybrid("Pandelk", "Panda", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandelk.jpg", "testPanda")
  // await drop.addHybrid("Pandorca", "Panda", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandorca.jpg", "testPanda")
  // await drop.addHybrid("Panduin", "Panda", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Panduin.jpg", "testPanda")
  // await drop.addHybrid("Pearda", "Panda", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pearda.jpg", "testPanda")
  // await drop.addHybrid("Pelephant", "Penguin", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Pelephant.jpg", "testPenguin")
  // await drop.addHybrid("Pelk", "Pug", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pelk.jpg", "testPug")
  // await drop.addHybrid("Penda", "Penguin", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penda.jpg", "testPenguin")
  // await drop.addHybrid("Pengbear", "Penguin", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Pengbear.jpg", "testPenguin")
  // await drop.addHybrid("Penggerfly", "Penguin", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penggerfly.jpg", "testPenguin")
  // await drop.addHybrid("Pengkitty", "Penguin", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Pengkitty.jpg", "testPenguin")
  // await drop.addHybrid("Pengling", "Penguin", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Pengling.jpg", "testPenguin")
  // await drop.addHybrid("Pengpug", "Penguin", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Pengpug.jpg", "testPenguin")
  // await drop.addHybrid("Penguelk", "Penguin", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguelk.jpg", "testPenguin")
  // await drop.addHybrid("Penguilion", "Penguin", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguilion.jpg", "testPenguin")
  // await drop.addHybrid("Penguilla", "Penguin", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguilla.jpg", "testPenguin")
  // await drop.addHybrid("Penguin Chick", "Penguin", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguin%20Chick.jpg", "testPenguin")
  // await drop.addHybrid("Penguinfish", "Penguin", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguinfish.jpg", "testPenguin")
  // await drop.addHybrid("Penguinrat", "Penguin", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguinrat.jpg", "testPenguin")
  // await drop.addHybrid("Penguin Shark", "Penguin", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguin%20Shark.jpg", "testPenguin")
  // await drop.addHybrid("Penguorca", "Penguin", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguorca.jpg", "testPenguin")
  // await drop.addHybrid("Pengurtle", "Penguin", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Pengurtle.jpg", "testPenguin")
  // await drop.addHybrid("Plobfish", "Pug", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Plobfish.jpg", "testPug")
  // await drop.addHybrid("Pugbear", "Pug", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugbear.jpg", "testPug")
  // await drop.addHybrid("Pugda", "Pug", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugda.jpg", "testPug")
  // await drop.addHybrid("Puggerfly", "Pug", "Buttefly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Puggerfly.jpg", "testPug")
  // await drop.addHybrid("Puggerphant", "Pug", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Puggerphant.jpg", "testPug")
  // await drop.addHybrid("Pugguin", "Pug", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugguin.jpg", "testPug")
  // await drop.addHybrid("Puggy", "Pug", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Puggy.jpg", "testPug")
  // await drop.addHybrid("Pugitten", "Pug", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugitten.jpg", "testPug")
  // await drop.addHybrid("Pugling", "Pug", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugling.jpg", "testPug")
  // await drop.addHybrid("Puglion", "Pug", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Puglion.jpg", "testPug")
  // await drop.addHybrid("Pugorca", "Pug", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugorca.jpg", "testPug")
  // await drop.addHybrid("Pugorilla", "Pug", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugorilla.jpg", "testPug")
  // await drop.addHybrid("Pugrat", "Pug", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugrat.jpg", "testPug")
  // await drop.addHybrid("Pugshark", "Pug", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugshark.jpg", "testPug")
  // await drop.addHybrid("Pugurtle", "Pug", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugurtle.jpg", "testPug")
  // await drop.addHybrid("Shanguin", "Shark", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shanguin.jpg", "testShark")
  // await drop.addHybrid("Sharkbear", "Shark", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharkbear.jpg", "testShark")
  // await drop.addHybrid("Sharkephant", "Shark", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharkephant.jpg", "testShark")
  // await drop.addHybrid("Sharkerfly", "Shark", "Buttefly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharkerfly.jpg", "testShark")
  // await drop.addHybrid("Sharkitten", "Shark", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharkitten.jpg", "testShark")
  // await drop.addHybrid("Shark Kitty", "Kitten", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Shark%20Kitty.jpg", "testKitten")
  // await drop.addHybrid("Sharkling", "Shark", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharkling.jpg", "testShark")
  // await drop.addHybrid("Sharkorilla", "Shark", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharkorilla.jpg", "testShark")
  // await drop.addHybrid("Shark Rat", "Shark", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shark%20Rat.jpg", "testShark")
  // await drop.addHybrid("Sharnda", "Shark", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharnda.jpg", "testShark")
  // await drop.addHybrid("Shelk", "Shark", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shelk.jpg", "testShark")
  // await drop.addHybrid("Shlion", "Shark", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shlion.jpg", "testShark")
  // await drop.addHybrid("Shlobfish", "Shark", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shlobfish.jpg", "testShark")
  // await drop.addHybrid("Shorca", "Shark", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shorca.jpg", "testShark")
  // await drop.addHybrid("Shug", "Shark", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shug.jpg", "testShark")
  // await drop.addHybrid("Shurtle", "Shark", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shurtle.jpg", "testShark")
  // await drop.addHybrid("Turtpug", "Turtle", "Pug", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtpug.jpg", "testTurtle")
  // await drop.addHybrid("Turtterfly", "Turtle", "Butterfly", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtterfly.jpg", "testTurtle")
  // await drop.addHybrid("Turkitten", "Turtle", "Kitten", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turkitten.jpg", "testTurtle")
  // await drop.addHybrid("Tiny Turtle", "Turtle", "Turtle", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Tiny%20Turtle.jpg", "testTurtle")
  // await drop.addHybrid("Turtlepeng", "Turtle", "Penguin", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtlepeng.jpg", "testTurtle")
  // await drop.addHybrid("Turtling", "Turtle", "Duckling", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtling.jpg", "testTurtle")
  // await drop.addHybrid("Turtorca", "Turtle", "Orca", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtorca.jpg", "testTurtle")
  // await drop.addHybrid("Turtelk", "Turtle", "Elk", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtelk.jpg", "testTurtle")
  // await drop.addHybrid("Turtanda", "Turtle", "Panda", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtanda.jpg", "testTurtle")
  // await drop.addHybrid("Turtilla", "Turtle", "Gorilla", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtilla.jpg", "testTurtle")
  // await drop.addHybrid("Turtelephant", "Turtle", "Elephant", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtelephant.jpg", "testTurtle")
  // await drop.addHybrid("Turtlion", "Turtle", "Lion", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtlion.jpg", "testTurtle")
  // await drop.addHybrid("Turtle Bear", "Turtle", "Bear", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtle%20Bear.jpg", "testTurtle")
  // await drop.addHybrid("Turtleshark", "Turtle", "Shark", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtleshark.jpg", "testTurtle")
  // await drop.addHybrid("Turtleblob", "Turtle", "Blobfish", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtleblob.jpg", "testTurtle")
  // await drop.addHybrid("Turtlerat", "Turtle", "Naked Mole Rat", 100, "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtlerat.jpg", "testTurtle")

  return hre.network.live;
}

export default func
func.id = 'deploy_zoo_drop'
func.tags = ['ZooDrop']
func.dependencies = ['ZooKeeper']
