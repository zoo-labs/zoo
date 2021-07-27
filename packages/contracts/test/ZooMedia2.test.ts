import { ethers } from 'hardhat';

import { ZooMedia } from '../types/ZooMedia';

import { ZooMedia__factory } from '../types';

import { Market__factory } from '../types';

import { ZooToken } from '../types/ZooToken';

import { ZooFaucet } from '../types/ZooFaucet';

import { ZooMarket } from '../types/ZooMarket';

import chai, { expect } from "chai";

import { BigNumber, Bytes, BytesLike, utils } from 'ethers';

let zooToken: any;

let zooFaucet: any;

let zooMarket: any;

let zooMedia: any;

let signers: any;

let mintAmt = 100000000;

let owner;

let auctionAddress: string;

let tokenAddress: string;

describe("Test ZooMedia (2)", () => {

    beforeEach(async () => {

        signers = await ethers.getSigners();

        const zooTokenFactory = await ethers.getContractFactory(
            "ZooToken",
            signers[0]
        );

        zooToken = (await zooTokenFactory.deploy()) as ZooToken;
        await zooToken.deployed();

        const zooFaucetFactory = await ethers.getContractFactory(
            "ZooFaucet",
            signers[0]
        );

        zooFaucet = (await zooFaucetFactory.deploy(zooToken.address)) as ZooFaucet;
        await zooFaucet.deployed();

        owner = signers[0]

        await zooToken.mint(zooFaucet.address, 1000000);

        await zooFaucet.buyZoo(owner.address,1000);

        zooMarket =  (await new Market__factory(owner).deploy()) as ZooMarket;
        await zooMarket.deployed();

        auctionAddress = zooMarket.address;

        zooMedia = (await new ZooMedia__factory(owner).deploy('ANML', 'CryptoZoo', auctionAddress, zooToken.address)) as ZooMedia
        await zooMedia.deployed();

        tokenAddress = zooMedia.address;

        await zooMarket.configure(tokenAddress);

        // await addAnimals()


    })

    async function addAnimals(){

        // let results = await zooMedia.connect(owner).callStatic.addDrop("test", 16000, 210);

        // let dropId = results[0]

        await zooMedia.connect(owner).addDrop("test", 16000, 210);

        await zooMedia.setTokenURI(1, "basicEgg", "basicEgg.tokenURI1");
        await zooMedia.setMetadataURI(1, "basicEgg", "basicEgg.metadataURI1");
        await zooMedia.setTokenURI(1, "hybridEgg", "hybridEgg.tokenURI1");
        await zooMedia.setMetadataURI(1, "hybridEgg", "hybridEgg.metadataURI1");


        await zooMedia.addAnimal(1,"Pug", 100, "Common", 5500, "test","test");
        await zooMedia.addAnimal(1,"Butterfly", 100, "Common", 5500, "test1","test1");
        await zooMedia.addAnimal(1,"Kitten", 100, "Common", 5500, "test2","test2");
        await zooMedia.addAnimal(1,"Turtle", 100, "Common", 5500, "test3","test3");

        await zooMedia.addAnimal(1,"Penguin", 100, "Common", 5500, "test4","test4");
        await zooMedia.addAnimal(1,"Duckling", 100, "Common", 5500, "test5","test5");
        await zooMedia.addAnimal(1,"Orca", 100, "Common", 5500, "test6","test6");
        await zooMedia.addAnimal(1,"Elk", 100, "Common", 5500, "test7","test7");

        await zooMedia.addAnimal(1,"Panda", 100, "Common", 5500, "test8","test8");
        await zooMedia.addAnimal(1,"Gorilla", 100, "Common", 5500, "test9","test9");
        await zooMedia.addAnimal(1,"Lion", 100, "Common", 5500, "test11","test11");
        await zooMedia.addAnimal(1,"Elephant", 100, "Common", 5500,"test12","test12");

        await zooMedia.addAnimal(1,"Bear", 100, "Common", 5500, "test13","test13");
        await zooMedia.addAnimal(1,"Shark", 100, "Common", 5500, "test14","test14");

        await zooMedia.addAnimal(1,"Blobfish", 100, "Common", 5500, "test15","test15");
        await zooMedia.addAnimal(1,"Naked Mole Rat", 100, "Common", 5500, "test16","test16");
    }


    async function addHybrids() {
        await zooMedia.addHybrid(1,"Baby Elephant","Elephant","Elephant",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Baby%20Elephant.jpg","testElephant")
        await zooMedia.addHybrid(1,"Baby Elk","Elk","Elk",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Baby%20Elk.jpg","testElk")
        await zooMedia.addHybrid(1,"Baby Gorilla","Gorilla","Gorilla",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Baby%20Gorilla.jpg","testGorilla")
        await zooMedia.addHybrid(1,"Baby Orca","Orca","Orca",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Baby%20Orca.jpg","testOrca")
        await zooMedia.addHybrid(1,"Baby Shark","Shark","Shark",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Baby%20Shark.jpg","testShark")
        await zooMedia.addHybrid(1,"Banda","Bear","Panda",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Banda.jpg","testBear")
        await zooMedia.addHybrid(1,"Bearblob","Bear","Blobfish",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearblob.jpg","testBear")
        await zooMedia.addHybrid(1,"Bearca","Bear","Orca",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearca.jpg","testBear")
        await zooMedia.addHybrid(1,"Bear Cub","Bear","Bear",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bear%20Cub.jpg","testBear")
        await zooMedia.addHybrid(1,"Bearilla","Bear","Gorilla",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearilla.jpg","testBear")
        await zooMedia.addHybrid(1,"Bearling","Bear","Duckling",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearling.jpg","testBear")
        await zooMedia.addHybrid(1,"Bearlion","Bear","Lion",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearlion.jpg","testBear")
        await zooMedia.addHybrid(1,"Bearpug","Bear","Pug",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearpug.jpg","testBear")
        await zooMedia.addHybrid(1,"Bearrat","Bear","Naked Mole Rat",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearrat.jpg","testBear")
        await zooMedia.addHybrid(1,"Bearshark","Bear","Shark",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Bearshark.jpg","testBear")
        await zooMedia.addHybrid(1,"Beartle","Bear","Turtle",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Beartle.jpg","testBear")
        await zooMedia.addHybrid(1,"Beartten","Bear","Kitten",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Beartten.jpg","testBear")
        await zooMedia.addHybrid(1,"Beartterfly","Bear","Butterfly",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Beartterfly.jpg","testBear")
        await zooMedia.addHybrid(1,"Belephant","Bear","Elephant",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Belephant.jpg","testBear")
        await zooMedia.addHybrid(1,"Belk","Bear","Elk",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Belk.jpg","testBear")
        await zooMedia.addHybrid(1,"Benguin","Bear","Penguin",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Bear/Benguin.jpg","testBear")
        await zooMedia.addHybrid(1,"Butterbear","Butterfly","Bear",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterbear.jpg","testButterfly")
        await zooMedia.addHybrid(1,"Butterblob","Butterfly","Blobfish",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterblob.jpg","testButterfly")
        await zooMedia.addHybrid(1,"Butterflanda","Butterfly","Panda",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterflanda.jpg","testButterfly")
        await zooMedia.addHybrid(1,"Butterflelk","Butterfly","Elk",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterflelk.jpg","testButterfly")
        await zooMedia.addHybrid(1,"Butterflenguin","Butterfly","Penguin",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterflenguin.jpg","testButterfly")
        await zooMedia.addHybrid(1,"Butterfling","Butterfly","Duckling",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterfling.jpg","testButterfly")
        await zooMedia.addHybrid(1,"Butterflion","Butterfly","Lion",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterflion.jpg","testButterfly")
        await zooMedia.addHybrid(1,"Butterflitten","Butterfly","Kitten",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterflitten.jpg","testButterfly")
        await zooMedia.addHybrid(1,"Butterla","Butterfly","Panda",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterla.jpg","testButterfly")
        await zooMedia.addHybrid(1,"Butterphant","Butterfly","Elephant",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterphant.jpg","testButterfly")
        await zooMedia.addHybrid(1,"Butterpug","Butterfly","Pug",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterpug.jpg","testButterfly")
        await zooMedia.addHybrid(1,"Butterrat","Butterfly","Naked Mole Rat",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butterrat.jpg","testButterfly")
        await zooMedia.addHybrid(1,"Buttershark","Butterfly","Shark",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Buttershark.jpg","testButterfly")
        await zooMedia.addHybrid(1,"Buttorca","Butterfly","Orca",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Buttorca.jpg","testButterfly")
        await zooMedia.addHybrid(1,"Butturtle","Butterfly","Turtle",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Butturtle.jpg","testButterfly")
        await zooMedia.addHybrid(1,"Caterpillar","Butterfly","Butterfly",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Butterfly/Caterpillar.jpg","testButterfly")
        await zooMedia.addHybrid(1,"Dorca","Duckling","Orca",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Dorca.jpg","testDuckling")
        await zooMedia.addHybrid(1,"Duckbear","Duckling","Bear",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckbear.jpg","testDuckling")
        await zooMedia.addHybrid(1,"Duckblob","Duckling","Blobfish",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckblob.jpg","testDuckling")
        await zooMedia.addHybrid(1,"Duckda","Duckling","Pands",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckda.jpg","testDuckling")
        await zooMedia.addHybrid(1,"Duckelk","Duckling","Elk",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckelk.jpg","testDuckling")
        await zooMedia.addHybrid(1,"Duckerfly","Duckling","Butterfly",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckerfly.jpg","testDuckling")
        await zooMedia.addHybrid(1,"Duckitten","Duckling","Kitten",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckitten.jpg","testDuckling")
        await zooMedia.addHybrid(1,"Ducklephant","Duckling","Elephant",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Ducklephant.jpg","testDuckling")
        await zooMedia.addHybrid(1,"Ducklinguin","Duckling","Penguin",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Ducklinguin.jpg","testDuckling")
        await zooMedia.addHybrid(1,"Ducklion","Duckling","Lion",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Ducklion.jpg","testDuckling")
        await zooMedia.addHybrid(1,"Duckorilla","Duckling","Gorilla",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckorilla.jpg","testDuckling")
        await zooMedia.addHybrid(1,"DuckPug","Duckling","Pug",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/DuckPug.jpg","testDuckling")
        await zooMedia.addHybrid(1,"Duckrat","Duckling","Naked Mole Rat",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckrat.jpg","testDuckling")
        await zooMedia.addHybrid(1,"Duckshark","Duckling","Shark",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Duckshark.jpg","testDuckling")
        await zooMedia.addHybrid(1,"Durtle","Duckling","Turtle",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Duckling/Durtle.jpg","testDuckling")
        await zooMedia.addHybrid(1,"Elebear","Elephant","Bear",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elebear.jpg","testElephant")
        await zooMedia.addHybrid(1,"Eleblob","Elephant","Blobfish",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Eleblob.jpg","testElephant")
        await zooMedia.addHybrid(1,"Elepanda","Elephant","Panda",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elepanda.jpg","testElephant")
        await zooMedia.addHybrid(1,"Elepenguin","Elephant","Penguin",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elepenguin.jpg","testElephant")
        await zooMedia.addHybrid(1,"Elephantilla","Elephant","Gorilla",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephantilla.jpg","testElephant")
        await zooMedia.addHybrid(1,"Elephantterfly","Elephant","Butterfly",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephantterfly.jpg","testElephant")
        await zooMedia.addHybrid(1,"Elephanturtle","Elephant","Turtle",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephanturtle.jpg","testElephant")
        await zooMedia.addHybrid(1,"Elephelk","Elephant","Elk",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephelk.jpg","testElephant")
        await zooMedia.addHybrid(1,"Elephitten","Elephant","Kitten",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephitten.jpg","testElephant")
        await zooMedia.addHybrid(1,"Elephling","Elephant","Duckling",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephling.jpg","testElephant")
        await zooMedia.addHybrid(1,"Elephlion","Elephant","Lion",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephlion.jpg","testElephant")
        await zooMedia.addHybrid(1,"Elephorca","Elephant","Orca",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephorca.jpg","testElephant")
        await zooMedia.addHybrid(1,"Elephrat","Elephant","Naked Mole Rat",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elephrat.jpg","testElephant")
        await zooMedia.addHybrid(1,"Elepug","Elephant","Pug",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Elepug.jpg","testElephant")
        await zooMedia.addHybrid(1,"Eleshark","Elephant","Shark",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Eleshark.jpg","testElephant")
        await zooMedia.addHybrid(1,"Elka","Elk","Orca",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elka.jpg","testElk")
        await zooMedia.addHybrid(1,"Elkanda","Elk","Panda",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkanda.jpg","testElk")
        await zooMedia.addHybrid(1,"Elkbear","Elk","Bear",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkbear.jpg","testElk")
        await zooMedia.addHybrid(1,"Elkenguin","Elk","Penguin",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkenguin.jpg","testElk")
        await zooMedia.addHybrid(1,"Elkephant","Elk","Elephant",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkephant.jpg","testElk")
        await zooMedia.addHybrid(1,"Elkerfly","Elk","Butterfly",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkerfly.jpg","testElk")
        await zooMedia.addHybrid(1,"Elkfish","Elk","Blobfish",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkfish.jpg","testElk")
        await zooMedia.addHybrid(1,"Elkion","Elk","Lion",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkion.jpg","testElk")
        await zooMedia.addHybrid(1,"Elkitten","Elk","Kitten",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkitten.jpg","testElk")
        await zooMedia.addHybrid(1,"Elkling","Elk","Duckling",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkling.jpg","testElk")
        await zooMedia.addHybrid(1,"Elkorilla","Elk","Gorilla",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkorilla.jpg","testElk")
        await zooMedia.addHybrid(1,"Elkpug","Elk","Pug",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkpug.jpg","testElk")
        await zooMedia.addHybrid(1,"Elk Rat","Elk","Naked Mole Rat",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elk%20Rat.jpg","testElk")
        await zooMedia.addHybrid(1,"Elkshark","Elk","Shark",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkshark.jpg","testElk")
        await zooMedia.addHybrid(1,"Elkurtle","Elk","Turtle",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elk/Elkurtle.jpg","testElk")
        await zooMedia.addHybrid(1,"Goranda","Gorilla","Panda",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Goranda.jpg","testGorilla")
        await zooMedia.addHybrid(1,"Gorca","Gorilla","Orca",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorca.jpg","testGorilla")
        await zooMedia.addHybrid(1,"Gorillabear","Gorilla","Near",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillabear.jpg","testGorilla")
        await zooMedia.addHybrid(1,"Gorillablob","Gorilla","Blobfish",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillablob.jpg","testGorilla")
        await zooMedia.addHybrid(1,"Gorillafly","Gorilla","Butterfly",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillafly.jpg","testGorilla")
        await zooMedia.addHybrid(1,"Gorillaguin","Gorilla","Penguin",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillaguin.jpg","testGorilla")
        await zooMedia.addHybrid(1,"Gorillaphant","Gorilla","Elephant",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillaphant.jpg","testGorilla")
        await zooMedia.addHybrid(1,"Gorilla Rat","Gorilla","Naked Mole Rat",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorilla%20Rat.jpg","testGorilla")
        await zooMedia.addHybrid(1,"Gorillark","Gorilla","Shark",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillark.jpg","testGorilla")
        await zooMedia.addHybrid(1,"Gorillelk","Gorilla","Elk",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillelk.jpg","testGorilla")
        await zooMedia.addHybrid(1,"Gorilling","Gorilla","Duckling",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorilling.jpg","testGorilla")
        await zooMedia.addHybrid(1,"Gorillion","Gorilla","Lion",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorillion.jpg","testGorilla")
        await zooMedia.addHybrid(1,"Gorkitten","Gorilla","Kitten",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorkitten.jpg","testGorilla")
        await zooMedia.addHybrid(1,"Gorturtle","Gorilla","Turtle",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gorturtle.jpg","testGorilla")
        await zooMedia.addHybrid(1,"Gug","Gorilla","Pug",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Gorilla/Gug.jpg","testGorilla")
        await zooMedia.addHybrid(1,"Kittelk","Kitten","Elk",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittelk.jpg","testKitten")
        await zooMedia.addHybrid(1,"Kitten","Kitten","Kitten",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kitten.jpg","testKitten")
        await zooMedia.addHybrid(1,"Kitterfly","Kitten","Butterfly",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kitterfly.jpg","testKitten")
        await zooMedia.addHybrid(1,"Kittorca","Kitten","Orca",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittorca.jpg","testKitten")
        await zooMedia.addHybrid(1,"Kittorilla","Kitten","Gorilla",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittorilla.jpg","testKitten")
        await zooMedia.addHybrid(1,"Kitturtle","Kitten","Turtle",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kitturtle.jpg","testKitten")
        await zooMedia.addHybrid(1,"Kittybear","Kitten","Bear",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittybear.jpg","testKitten")
        await zooMedia.addHybrid(1,"Kitty Blob","Kitten","Blobfish",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kitty%20Blob.jpg","testKitten")
        await zooMedia.addHybrid(1,"Kittyling","Kitten","Duckling",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittyling.jpg","testKitten")
        await zooMedia.addHybrid(1,"Kittypan","Kitten","Panda",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittypan.jpg","testKitten")
        await zooMedia.addHybrid(1,"Kittypenguin","Kitten","Penguin",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittypenguin.jpg","testKitten")
        await zooMedia.addHybrid(1,"Kittyphant","Kitten","Elephant",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kittyphant.jpg","testKitten")
        await zooMedia.addHybrid(1,"Kitty Pug","Kitten","Pug",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kitty%20Pug.jpg","testKitten")
        await zooMedia.addHybrid(1,"Kitty Rat","Kitten","Naked Mole Rat",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Kitty%20Rat.jpg","testKitten")
        await zooMedia.addHybrid(1,"Lelephant","Lion","Elephant",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lelephant.jpg","testLion")
        await zooMedia.addHybrid(1,"Lionbear","Lion","Bear",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionbear.jpg","testLion")
        await zooMedia.addHybrid(1,"Lion Cub","Lion","Lion",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lion%20Cub.jpg","testLion")
        await zooMedia.addHybrid(1,"Lionda","Lion","Panda",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionda.jpg","testLion")
        await zooMedia.addHybrid(1,"Lionelk","Lion","Elk",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionelk.jpg","testLion")
        await zooMedia.addHybrid(1,"Lionfish","Lion","Blobfish",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionfish.jpg","testLion")
        await zooMedia.addHybrid(1,"Lionfly","Lion","Butterfly",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionfly.jpg","testLion")
        await zooMedia.addHybrid(1,"Lionguin","Lion","Penguin",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionguin.jpg","testLion")
        await zooMedia.addHybrid(1,"Lionilla","Lion","Gorilla",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionilla.jpg","testLion")
        await zooMedia.addHybrid(1,"Lion Kitty","Kitten","Lion",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Lion%20Kitty.jpg","testKitten")
        await zooMedia.addHybrid(1,"Lionling","Lion","Duckling",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionling.jpg","testLion")
        await zooMedia.addHybrid(1,"Lionorca","Lion","Orca",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionorca.jpg","testLion")
        await zooMedia.addHybrid(1,"Lionpug","Lion","Pug",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionpug.jpg","testLion")
        await zooMedia.addHybrid(1,"Lion Rat","Lion","Naked Mole Rat",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lion%20Rat.jpg","testLion")
        await zooMedia.addHybrid(1,"Lionshark","Lion","Shark",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionshark.jpg","testLion")
        await zooMedia.addHybrid(1,"Lionturtle","Lion","Turtle",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Lionturtle.jpg","testLion")
        await zooMedia.addHybrid(1,"Litten","Lion","Kitten",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Lion/Litten.jpg","testLion")
        await zooMedia.addHybrid(1,"Naked Blobfish","Naked Mole Rat","Bloblfish",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Blobfish.jpg","testNaked Mole Rat")
        await zooMedia.addHybrid(1,"Naked Butterfly","Naked Mole Rat","Butterfly",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Butterfly.jpg","testNaked Mole Rat")
        await zooMedia.addHybrid(1,"Naked Duckling","Naked Mole Rat","Duckling",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Duckling.jpg","testNaked Mole Rat")
        await zooMedia.addHybrid(1,"Naked Elephant","Naked Mole Rat","Elephant",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Elephant.jpg","testNaked Mole Rat")
        await zooMedia.addHybrid(1,"Naked Lion","Naked Mole Rat","Lion",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Lion.jpg","testNaked Mole Rat")
        await zooMedia.addHybrid(1,"Naked Mole Bear","Naked Mole Rat","Bear",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Bear.jpg","testNaked Mole Rat")
        await zooMedia.addHybrid(1,"Naked Mole Elk","Naked Mole Rat","Elk",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Elk.jpg","testNaked Mole Rat")
        await zooMedia.addHybrid(1,"Naked Mole Gorilla","Naked Mole Rat","Gorilla",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Gorilla.jpg","testNaked Mole Rat")
        await zooMedia.addHybrid(1,"Naked Mole Kitten","Naked Mole Rat","Kitten",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Kitten.jpg","testNaked Mole Rat")
        await zooMedia.addHybrid(1,"Naked Mole Orca","Naked Mole Rat","Orca",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Orca.jpg","testNaked Mole Rat")
        await zooMedia.addHybrid(1,"Naked Mole Pug","Naked Mole Rat","Pug",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Pug.jpg","testNaked Mole Rat")
        await zooMedia.addHybrid(1,"Naked Mole Rat","Naked Mole Rat","Rat",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Rat.jpg","testNaked Mole Rat")
        await zooMedia.addHybrid(1,"Naked Mole Shark","Naked Mole Rat","Shark",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Mole%20Shark.jpg","testNaked Mole Rat")
        await zooMedia.addHybrid(1,"Naked Panda","Naked Mole Rat","Panda",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Panda.jpg","testNaked Mole Rat")
        await zooMedia.addHybrid(1,"Naked Penguin","Naked Mole Rat","Penguin",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Penguin.jpg","testNaked Mole Rat")
        await zooMedia.addHybrid(1,"Naked Rat Baby","Naked Mole Rat","Naked Mole Rat",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Rat%20Baby.jpg","testNaked Mole Rat")
        await zooMedia.addHybrid(1,"Naked Turtle","Naked Mole Rat","Turtle",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Naked%20Mole%20Rat/Naked%20Turtle.jpg","testNaked Mole Rat")
        await zooMedia.addHybrid(1,"Orca Bear","Orca","Bear",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orca%20Bear.jpg","testOrca")
        await zooMedia.addHybrid(1,"Orcablob","Orca","Blobfish",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcablob.jpg","testOrca")
        await zooMedia.addHybrid(1,"Orcafly","Orca","Butterfly",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcafly.jpg","testOrca")
        await zooMedia.addHybrid(1,"Orcanda","Orca","Panda",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcanda.jpg","testOrca")
        await zooMedia.addHybrid(1,"Orcapeng","Orca","Penguin",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcapeng.jpg","testOrca")
        await zooMedia.addHybrid(1,"Orcaphant","Orca","Elephant",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcaphant.jpg","testOrca")
        await zooMedia.addHybrid(1,"Orcapug","Orca","Pug",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcapug.jpg","testOrca")
        await zooMedia.addHybrid(1,"Orcarat","Orca","Naked Mole Rat",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcarat.jpg","testOrca")
        await zooMedia.addHybrid(1,"Orcashark","Orca","Shark",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcashark.jpg","testOrca")
        await zooMedia.addHybrid(1,"Orcaturtle","Orca","Turtle",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcaturtle.jpg","testOrca")
        await zooMedia.addHybrid(1,"Orcelk","Orca","Elk",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcelk.jpg","testOrca")
        await zooMedia.addHybrid(1,"Orcilla","Orca","Gorilla",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcilla.jpg","testOrca")
        await zooMedia.addHybrid(1,"Orcling","Orca","Duckling",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orcling.jpg","testOrca")
        await zooMedia.addHybrid(1,"Orclion","Orca","Lion",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orclion.jpg","testOrca")
        await zooMedia.addHybrid(1,"Orkitten","Orca","Kitten",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Orca/Orkitten.jpg","testOrca")
        await zooMedia.addHybrid(1,"Pandablob","Panda","Blobfish",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandablob.jpg","testPanda")
        await zooMedia.addHybrid(1,"Pandacat","Panda","Kitten",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandacat.jpg","testPanda")
        await zooMedia.addHybrid(1,"Panda Cub","Panda","Panda",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Panda%20Cub.jpg","testPanda")
        await zooMedia.addHybrid(1,"Pandafly","Panda","Butterfly",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandafly.jpg","testPanda")
        await zooMedia.addHybrid(1,"Pandaling","Panda","Duckling",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandaling.jpg","testPanda")
        await zooMedia.addHybrid(1,"Pandalion","Panda","Lion",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandalion.jpg","testPanda")
        await zooMedia.addHybrid(1,"Pandalla","Panda","Gorilla",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandalla.jpg","testPanda")
        await zooMedia.addHybrid(1,"Pandaphant","Panda","Elephant",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandaphant.jpg","testPanda")
        await zooMedia.addHybrid(1,"Pandapug","Panda","Pug",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandapug.jpg","testPanda")
        await zooMedia.addHybrid(1,"Pandarat","Panda","Naked Mole Rat",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandarat.jpg","testPanda")
        await zooMedia.addHybrid(1,"Pandashark","Panda","Shark",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandashark.jpg","testPanda")
        await zooMedia.addHybrid(1,"Pandaturtle","Panda","Turtle",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandaturtle.jpg","testPanda")
        await zooMedia.addHybrid(1,"Pandelk","Panda","Elk",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandelk.jpg","testPanda")
        await zooMedia.addHybrid(1,"Pandorca","Panda","Orca",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pandorca.jpg","testPanda")
        await zooMedia.addHybrid(1,"Panduin","Panda","Penguin",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Panduin.jpg","testPanda")
        await zooMedia.addHybrid(1,"Pearda","Panda","Bear",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Panda/Pearda.jpg","testPanda")
        await zooMedia.addHybrid(1,"Pelephant","Penguin","Elephant",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Pelephant.jpg","testPenguin")
        await zooMedia.addHybrid(1,"Pelk","Pug","Elk",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pelk.jpg","testPug")
        await zooMedia.addHybrid(1,"Penda","Penguin","Panda",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penda.jpg","testPenguin")
        await zooMedia.addHybrid(1,"Pengbear","Penguin","Bear",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Pengbear.jpg","testPenguin")
        await zooMedia.addHybrid(1,"Penggerfly","Penguin","Butterfly",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penggerfly.jpg","testPenguin")
        await zooMedia.addHybrid(1,"Pengkitty","Penguin","Kitten",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Pengkitty.jpg","testPenguin")
        await zooMedia.addHybrid(1,"Pengling","Penguin","Duckling",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Pengling.jpg","testPenguin")
        await zooMedia.addHybrid(1,"Pengpug","Penguin","Pug",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Pengpug.jpg","testPenguin")
        await zooMedia.addHybrid(1,"Penguelk","Penguin","Elk",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguelk.jpg","testPenguin")
        await zooMedia.addHybrid(1,"Penguilion","Penguin","Lion",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguilion.jpg","testPenguin")
        await zooMedia.addHybrid(1,"Penguilla","Penguin","Gorilla",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguilla.jpg","testPenguin")
        await zooMedia.addHybrid(1,"Penguin Chick","Penguin","Penguin",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguin%20Chick.jpg","testPenguin")
        await zooMedia.addHybrid(1,"Penguinfish","Penguin","Blobfish",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguinfish.jpg","testPenguin")
        await zooMedia.addHybrid(1,"Penguinrat","Penguin","Naked Mole Rat",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguinrat.jpg","testPenguin")
        await zooMedia.addHybrid(1,"Penguin Shark","Penguin","Shark",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguin%20Shark.jpg","testPenguin")
        await zooMedia.addHybrid(1,"Penguorca","Penguin","Orca",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Penguorca.jpg","testPenguin")
        await zooMedia.addHybrid(1,"Pengurtle","Penguin","Turtle",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Penguin/Pengurtle.jpg","testPenguin")
        await zooMedia.addHybrid(1,"Plobfish","Pug","Blobfish",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Plobfish.jpg","testPug")
        await zooMedia.addHybrid(1,"Pugbear","Pug","Bear",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugbear.jpg","testPug")
        await zooMedia.addHybrid(1,"Pugda","Pug","Panda",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugda.jpg","testPug")
        await zooMedia.addHybrid(1,"Puggerfly","Pug","Buttefly",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Puggerfly.jpg","testPug")
        await zooMedia.addHybrid(1,"Puggerphant","Pug","Elephant",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Puggerphant.jpg","testPug")
        await zooMedia.addHybrid(1,"Pugguin","Pug","Penguin",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugguin.jpg","testPug")
        await zooMedia.addHybrid(1,"Puggy","Pug","Pug",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Puggy.jpg","testPug")
        await zooMedia.addHybrid(1,"Pugitten","Pug","Kitten",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugitten.jpg","testPug")
        await zooMedia.addHybrid(1,"Pugling","Pug","Duckling",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugling.jpg","testPug")
        await zooMedia.addHybrid(1,"Puglion","Pug","Lion",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Puglion.jpg","testPug")
        await zooMedia.addHybrid(1,"Pugorca","Pug","Orca",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugorca.jpg","testPug")
        await zooMedia.addHybrid(1,"Pugorilla","Pug","Gorilla",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugorilla.jpg","testPug")
        await zooMedia.addHybrid(1,"Pugrat","Pug","Naked Mole Rat",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugrat.jpg","testPug")
        await zooMedia.addHybrid(1,"Pugshark","Pug","Shark",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugshark.jpg","testPug")
        await zooMedia.addHybrid(1,"Pugurtle","Pug","Turtle",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Pug/Pugurtle.jpg","testPug")
        await zooMedia.addHybrid(1,"Shanguin","Shark","Penguin",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shanguin.jpg","testShark")
        await zooMedia.addHybrid(1,"Sharkbear","Shark","Bear",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharkbear.jpg","testShark")
        await zooMedia.addHybrid(1,"Sharkephant","Shark","Elephant",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharkephant.jpg","testShark")
        await zooMedia.addHybrid(1,"Sharkerfly","Shark","Buttefly",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharkerfly.jpg","testShark")
        await zooMedia.addHybrid(1,"Sharkitten","Shark","Kitten",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharkitten.jpg","testShark")
        await zooMedia.addHybrid(1,"Shark Kitty","Kitten","Shark",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Kitten/Shark%20Kitty.jpg","testKitten")
        await zooMedia.addHybrid(1,"Sharkling","Shark","Duckling",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharkling.jpg","testShark")
        await zooMedia.addHybrid(1,"Sharkorilla","Shark","Gorilla",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharkorilla.jpg","testShark")
        await zooMedia.addHybrid(1,"Shark Rat","Shark","Naked Mole Rat",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shark%20Rat.jpg","testShark")
        await zooMedia.addHybrid(1,"Sharnda","Shark","Panda",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Sharnda.jpg","testShark")
        await zooMedia.addHybrid(1,"Shelk","Shark","Elk",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shelk.jpg","testShark")
        await zooMedia.addHybrid(1,"Shlion","Shark","Lion",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shlion.jpg","testShark")
        await zooMedia.addHybrid(1,"Shlobfish","Shark","Blobfish",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shlobfish.jpg","testShark")
        await zooMedia.addHybrid(1,"Shorca","Shark","Orca",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shorca.jpg","testShark")
        await zooMedia.addHybrid(1,"Shug","Shark","Pug",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shug.jpg","testShark")
        await zooMedia.addHybrid(1,"Shurtle","Shark","Turtle",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Shark/Shurtle.jpg","testShark")
        await zooMedia.addHybrid(1,"Turtpug","Turtle","Pug",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtpug.jpg","testTurtle")
        await zooMedia.addHybrid(1,"Turtterfly","Turtle","Butterfly",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtterfly.jpg","testTurtle")
        await zooMedia.addHybrid(1,"Turkitten","Turtle","Kitten",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turkitten.jpg","testTurtle")
        await zooMedia.addHybrid(1,"Tiny Turtle","Turtle","Turtle",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Tiny%20Turtle.jpg","testTurtle")
        await zooMedia.addHybrid(1,"Turtlepeng","Turtle","Penguin",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtlepeng.jpg","testTurtle")
        await zooMedia.addHybrid(1,"Turtling","Turtle","Duckling",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtling.jpg","testTurtle")
        await zooMedia.addHybrid(1,"Turtorca","Turtle","Orca",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtorca.jpg","testTurtle")
        await zooMedia.addHybrid(1,"Turtelk","Turtle","Elk",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtelk.jpg","testTurtle")
        await zooMedia.addHybrid(1,"Turtanda","Turtle","Panda",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtanda.jpg","testTurtle")
        await zooMedia.addHybrid(1,"Turtilla","Turtle","Gorilla",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtilla.jpg","testTurtle")
        await zooMedia.addHybrid(1,"Turtelephant","Turtle","Elephant",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtelephant.jpg","testTurtle")
        await zooMedia.addHybrid(1,"Turtlion","Turtle","Lion",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtlion.jpg","testTurtle")
        await zooMedia.addHybrid(1,"Turtle Bear","Turtle","Bear",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtle%20Bear.jpg","testTurtle")
        await zooMedia.addHybrid(1,"Turtleshark","Turtle","Shark",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtleshark.jpg","testTurtle")
        await zooMedia.addHybrid(1,"Turtleblob","Turtle","Blobfish",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtleblob.jpg","testTurtle")
        await zooMedia.addHybrid(1,"Turtlerat","Turtle","Naked Mole Rat",100,"http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Turtle/Turtlerat.jpg","testTurtle")

    }

    async function addDrop() {
        await zooMedia.connect(owner).addDrop("test", 16000, 210);

        await zooMedia.setTokenURI(1, "basicEgg", "basicEgg.tokenURI1");
        await zooMedia.setMetadataURI(1, "basicEgg", "basicEgg.metadataURI1");
        await zooMedia.setTokenURI(1, "hybridEgg", "hybridEgg.tokenURI1");
        await zooMedia.setMetadataURI(1, "hybridEgg", "hybridEgg.metadataURI1");

    }


    async function breedHybrid(){

        await zooToken.approve(zooMedia.address, 2000)

        const buyFirstEgg = await zooMedia.connect(owner).buyEgg(1);
        const buyFirstEggReceipt = await buyFirstEgg.wait();

        let sender = buyFirstEggReceipt.events;

        let from_add
        let token_id_1

        sender.forEach(element => {
            if(element.event == "BuyEgg"){
                from_add = element.args["_from"]
                token_id_1 = element.args["_tokenID"]
            }
        });


        const buySecondEgg = await zooMedia.connect(owner).buyEgg(1);
        const buySecondEggReceipt = await buySecondEgg.wait();

        sender = buySecondEggReceipt.events;
        let token_id_2

        sender.forEach(element => {
            if(element.event == "BuyEgg"){
                from_add = element.args["_from"]
                token_id_2 = element.args["_tokenID"]
            }
        });


        const firstHatchedAnimal = await zooMedia.connect(owner).hatchEgg(1, token_id_1);
        const hatchFirstAnimalReceipt = await firstHatchedAnimal.wait();
        sender = hatchFirstAnimalReceipt.events;

        let token_id_Animal_1

        sender.forEach(element => {
            if(element.event == "Hatch"){
                from_add = element.args["_from"]
                token_id_Animal_1 = element.args["_tokenID"]
            }
        });

        let secondHatchedAnimal = await zooMedia.connect(owner).hatchEgg(1, token_id_2);
        const secondHatchedAnimalReceipt = await secondHatchedAnimal.wait();

        sender = secondHatchedAnimalReceipt.events;
        let token_id_Animal_2
        let token_id_hybridEgg

        sender.forEach(element => {
            if(element.event == "Hatch"){
                from_add = element.args["_from"]
                token_id_Animal_2 = element.args["_tokenID"]
            }
        });

        const breedTx = await zooMedia.connect(owner).breedAnimal(1, token_id_Animal_1, token_id_Animal_2);
        const breedReceipt = await breedTx.wait();
        sender = breedReceipt.events;
        sender.forEach(element => {
            if(element.event == "Breed"){
                token_id_hybridEgg = element.args["_eggTokenId"]
            }
        });

        return token_id_hybridEgg
    }

    /*
    Deploy Script
    */

    it("Should get the ZooDrop owner", async () => {

        const zooDropOwner: string = await zooMedia.owner();

        expect(zooDropOwner).to.equal(owner.address);

    });

    /**
     * DROP
     */
    it("Should create a new ZooDrop contract with AddDrop event", async () => {
        const block = await ethers.provider.getBlockNumber();
        let dropID = await zooMedia.connect(signers[0]).addDrop("test1", 16000, 210);
        let events = await zooMedia.queryFilter(zooMedia.filters.AddDrop(null,null), block);
        expect(events.length).eq(1);

        const log = zooMedia.interface.parseLog(events[0]);
        expect(log.name).to.equal("AddDrop");
        expect(log.args._dropID.toNumber()).to.equal(1);
    });

    /**
     * BUYING EGGS
     */
    it("Should buy a basic egg", async() => {
            await addDrop();

            await zooToken.approve(zooMedia.address, 210)

            const buyEgg = await zooMedia.connect(owner).buyEgg(1);

            const buyEggReceipt = await buyEgg.wait();

            const sender = buyEggReceipt.events;

            let from_add
            let token_id

            sender.forEach(element => {
                if(element.event == "BuyEgg"){
                    from_add = element.args["_from"]
                    token_id = element.args["_tokenID"]
                }
            });

            expect(from_add).to.equal(owner.address);
            expect(token_id.toNumber()).to.equal(0);

            // add check for types mapping
            expect(await zooMedia.types(token_id.toNumber())).to.equal(token_id.toNumber());

            // check eggs mapping for new egg
            let egg = await zooMedia.eggs(token_id.toNumber());
            expect(egg.eggCreationTime.toNumber()).to.greaterThan(0);
    });

    it("Should buy multiple basic eggs", async() => {

    });

    it("Should revert when totalSupply of eggs are reaching", async() => {

    });

    it("Should revert when not enough balance", async() => {

    });

    it("Should share bidshare from buy egg to contract owner", async() => {

    });

    /**
     * HATCHING EGGS
     */
    it("Should hatch & burn basic egg", async() => {
        await addAnimals();

        await zooToken.approve(zooMedia.address, 600)

        const buyEgg = await zooMedia.connect(owner).buyEgg(1);

        const buyEggReceipt = await buyEgg.wait();

        let sender = buyEggReceipt.events;

        let from_add
        let token_id

        sender.forEach(element => {
            if(element.event == "Hatch"){
                from_add = element.args["_from"]
                token_id = element.args["_tokenID"]
            }
        });

        const hatchEgg  = await zooMedia.hatchEgg(1,0)

        const hatchEggReceipt = await hatchEgg.wait();

        sender = hatchEggReceipt.events;

        let from_add2
        let token_id2

        sender.forEach(element => {
            if(element.event == "Hatch"){
                from_add2 = element.args["_from"]
                token_id2 = element.args["_tokenID"]
            }
        });

        expect(from_add2).to.equal(owner.address);
        expect(token_id2.toNumber()).to.equal(1);

        const newAnimal = await zooMedia.animals(1);
        expect(newAnimal.name).to.not.equal('');
    });

    it("Should hatch & burn hybrid egg", async() => {

        // this.timeout(500000000000000);
        await addAnimals();
        await addHybrids();
        const token = await breedHybrid()

        const hatchEgg  = await zooMedia.hatchEgg(1,4)

        const hatchEggReceipt = await hatchEgg.wait();

        let sender = hatchEggReceipt.events;

        let from_add2
        let token_id2

        sender.forEach(element => {
            if(element.event == "Hatch"){
                from_add2 = element.args["_from"]
                token_id2 = element.args["_tokenID"]
            }
        });

        expect(from_add2).to.equal(owner.address);
        expect(token_id2.toNumber()).to.equal(5);


    });

    it("Should revert when hatching egg with invalid tokenid", async() => {

    });

    it("Should revert when egg creation time restriction is not met", async() => {

    });

    /**
     * BREEDING
     */
    it("Should breed a hybrid egg", async() => {
        await addAnimals();

        await zooToken.approve(zooMedia.address, 600)

        const buyFirstEgg = await zooMedia.connect(owner).buyEgg(1);
        const buyFirstEggReceipt = await buyFirstEgg.wait();

        let sender = buyFirstEggReceipt.events;

        let from_add
        let token_id_1

        sender.forEach(element => {
            if(element.event == "BuyEgg"){
                from_add = element.args["_from"]
                token_id_1 = element.args["_tokenID"]
            }
        });


        const buySecondEgg = await zooMedia.connect(owner).buyEgg(1);
        const buySecondEggReceipt = await buySecondEgg.wait();

        sender = buySecondEggReceipt.events;
        let token_id_2

        sender.forEach(element => {
            if(element.event == "BuyEgg"){
                from_add = element.args["_from"]
                token_id_2 = element.args["_tokenID"]
            }
        });


        const firstHatchedAnimal = await zooMedia.connect(owner).hatchEgg(1, token_id_1);
        const hatchFirstAnimalReceipt = await firstHatchedAnimal.wait();
        sender = hatchFirstAnimalReceipt.events;

        let token_id_Animal_1

        sender.forEach(element => {
            if(element.event == "Hatch"){
                from_add = element.args["_from"]
                token_id_Animal_1 = element.args["_tokenID"]
            }
        });


        let secondHatchedAnimal = await zooMedia.connect(owner).hatchEgg(1, token_id_2);
        const secondHatchedAnimalReceipt = await secondHatchedAnimal.wait();

        sender = secondHatchedAnimalReceipt.events;
        let token_id_Animal_2
        let token_id_hybridEgg

        sender.forEach(element => {
            if(element.event == "Hatch"){
                from_add = element.args["_from"]
                token_id_Animal_2 = element.args["_tokenID"]
            }
        });

        const breedTx = await zooMedia.connect(owner).breedAnimal(1, token_id_Animal_1, token_id_Animal_2);
        const breedReceipt = await breedTx.wait();
        sender = breedReceipt.events;
        sender.forEach(element => {
            if(element.event == "Breed"){
                token_id_hybridEgg = element.args["_eggTokenId"]
            }
        });

        expect(token_id_hybridEgg.toNumber()).to.equal(4);

        const eggType = await zooMedia.connect(owner).types(token_id_hybridEgg);
        expect(eggType).to.equal(2);
    });
    it("Should revert when there is breedCooldown", async() => {
        await addAnimals();

        await zooToken.approve(zooMedia.address, 600);

        const buyFirstEgg = await zooMedia.connect(owner).buyEgg(1);
        const buyFirstEggReceipt = await buyFirstEgg.wait();

        let sender = buyFirstEggReceipt.events;

        let from_add;
        let token_id_1;

        sender.forEach((element) => {
            if (element.event == "BuyEgg") {
                from_add = element.args["_from"];
                token_id_1 = element.args["_tokenID"];
            }
        });

        const buySecondEgg = await zooMedia.connect(owner).buyEgg(1);
        const buySecondEggReceipt = await buySecondEgg.wait();

        sender = buySecondEggReceipt.events;
        let token_id_2;

        sender.forEach((element) => {
            if (element.event == "BuyEgg") {
                from_add = element.args["_from"];
                token_id_2 = element.args["_tokenID"];
            }
        });

        const firstHatchedAnimal = await zooMedia
            .connect(owner)
            .hatchEgg(1, token_id_1);
        const hatchFirstAnimalReceipt = await firstHatchedAnimal.wait();
        sender = hatchFirstAnimalReceipt.events;

        let token_id_Animal_1;

        sender.forEach((element) => {
            if (element.event == "Hatch") {
                from_add = element.args["_from"];
                token_id_Animal_1 = element.args["_tokenID"];
            }
        });

        let secondHatchedAnimal = await zooMedia
            .connect(owner)
            .hatchEgg(1, token_id_2);
        const secondHatchedAnimalReceipt = await secondHatchedAnimal.wait();

        sender = secondHatchedAnimalReceipt.events;
        let token_id_Animal_2;
        let token_id_hybridEgg;

        sender.forEach((element) => {
            if (element.event == "Hatch") {
                from_add = element.args["_from"];
                token_id_Animal_2 = element.args["_tokenID"];
            }
        });

        const breedTx = await zooMedia
            .connect(owner)
            .breedAnimal(1, token_id_Animal_1, token_id_Animal_2);
        try {
            const breedTx2 = await zooMedia
                .connect(owner)
                .breedAnimal(1, token_id_Animal_2, token_id_Animal_1);
        } catch (e) {
            expect(e.message.includes("Must wait for cooldown to finish.")).to
                .be.true;
        }
    })

    it("Should revert when breeding with a hybrid", async () => {
        await addAnimals();
        await addHybrids();

        await zooToken.approve(zooMedia.address, 800);

        const buyFirstEgg = await zooMedia.connect(owner).buyEgg(1);
        const buyFirstEggReceipt = await buyFirstEgg.wait();

        let sender = buyFirstEggReceipt.events;

        let from_add;
        let token_id_1;

        sender.forEach((element) => {
            if (element.event == "BuyEgg") {
                from_add = element.args["_from"];
                token_id_1 = element.args["_tokenID"];
            }
        });

        const buySecondEgg = await zooMedia.connect(owner).buyEgg(1);
        const buySecondEggReceipt = await buySecondEgg.wait();

        sender = buySecondEggReceipt.events;
        let token_id_2;

        sender.forEach((element) => {
            if (element.event == "BuyEgg") {
                from_add = element.args["_from"];
                token_id_2 = element.args["_tokenID"];
            }
        });

        const firstHatchedAnimal = await zooMedia
            .connect(owner)
            .hatchEgg(1, token_id_1);
        const hatchFirstAnimalReceipt = await firstHatchedAnimal.wait();
        sender = hatchFirstAnimalReceipt.events;

        let token_id_Animal_1;

        sender.forEach((element) => {
            if (element.event == "Hatch") {
                from_add = element.args["_from"];
                token_id_Animal_1 = element.args["_tokenID"];
            }
        });

        let secondHatchedAnimal = await zooMedia
            .connect(owner)
            .hatchEgg(1, token_id_2);
        const secondHatchedAnimalReceipt = await secondHatchedAnimal.wait();

        sender = secondHatchedAnimalReceipt.events;
        let token_id_Animal_2;
        let token_id_hybridEgg;

        sender.forEach((element) => {
            if (element.event == "Hatch") {
                from_add = element.args["_from"];
                token_id_Animal_2 = element.args["_tokenID"];
            }
        });

        const breedTx = await zooMedia
            .connect(owner)
            .breedAnimal(1, token_id_Animal_1, token_id_Animal_2);
        const breedReceipt = await breedTx.wait();
        sender = breedReceipt.events;
        sender.forEach((element) => {
            if (element.event == "Breed") {
                token_id_hybridEgg = element.args["_eggTokenId"];
            }
        });
        // console.log("hybrid egg id: ", token_id_hybridEgg) // id is 4

        const firstHatchedHybridAnimal = await zooMedia
            .connect(owner)
            .hatchEgg(1, token_id_hybridEgg);
        const firstHatchedHybridAnimalReceipt =
            await firstHatchedHybridAnimal.wait();
        sender = firstHatchedHybridAnimalReceipt.events;

        let token_id_Hybrid_Animal;

        sender.forEach((element) => {
            if (element.event == "Hatch") {
                from_add = element.args["_from"];
                token_id_Hybrid_Animal = element.args["_tokenID"];
            }
        });
        // console.log("hybrid animal id: ", token_id_Hybrid_Animal)

        expect(token_id_Hybrid_Animal.toNumber()).to.equal(5);

        // increase time by 7 days
        await ethers.provider.send("evm_increaseTime", [691200]);

        try {
            const breedTx2 = await zooMedia
                .connect(owner)
                .breedAnimal(1, token_id_Animal_1, token_id_Hybrid_Animal);
        } catch (e) {
            console.log(e.message)
            expect(e.message.includes("Hybrid animals cannot breed.")).to.be
                .true;
        }
    });

    it("Should revert when breeding with two hybrids", async() => {
        await addAnimals();
        await addHybrids();
        const token_1 = breedHybrid()
        const token_2 = breedHybrid()


        let sender

        let token_id_hybridEgg

        try{
            const breedTx = await zooMedia.connect(owner).breedAnimal(1, token_1, token_2);
            const breedReceipt = await breedTx.wait();
            sender = breedReceipt.events;
            sender.forEach(element => {
                if(element.event == "Breed"){
                    token_id_hybridEgg = element.args["_eggTokenId"]
                }
            });

        }catch(err){

            expect(err).to.exist

        }
    });


    /**
     * FREEING
     */

    it("Should free a basic animal", async () => {
        await addAnimals();

        await zooToken.approve(zooMedia.address, 600)

        const buyEgg = await zooMedia.connect(owner).buyEgg(1);

        const buyEggReceipt = await buyEgg.wait();

        let sender = buyEggReceipt.events;

        let from_add
        let token_id

        sender.forEach(element => {
            if(element.event == "BuyEgg"){
                from_add = element.args["_from"]
                token_id = element.args["_tokenID"]
            }
        });

        const hatchEgg  = await zooMedia.hatchEgg(1,token_id)

        const hatchEggReceipt = await hatchEgg.wait();

        sender = hatchEggReceipt.events;

        let from_add2
        let token_id2
        let _yield

        sender.forEach(element => {
            if(element.event == "Hatch"){
                from_add2 = element.args["_from"]
                token_id2 = element.args["_tokenID"]
            }
        });

        const prevBalance = await zooToken.balanceOf(owner.address);

        // TODO increase block number and test yield
        // await ethers.provider.send("evm_setNextBlockTimestamp", [9617249934]);

        const freed = await zooMedia.freeAnimal(1);

        const freedReceipt = await freed.wait();

        sender = freedReceipt.events;

        sender.forEach(element => {
            if(element.event == "Burn"){
                from_add2 = element.args["_from"]
                token_id2 = element.args["_tokenID"]
            } else if (element.event == "FreeAnimal"){
                from_add = element.args["_from"]
                token_id = element.args["_tokenID"]
                _yield = element.args["_yield"]
            }
        });

        expect(from_add2).to.equal(owner.address);
        expect(token_id2.toNumber()).to.equal(1);

        expect(from_add).to.equal(owner.address);
        expect(token_id.toNumber()).to.equal(1);
        expect(_yield.toNumber()).to.greaterThan(0);

        const newAnimal = await zooMedia.animals(token_id.toNumber());
        expect(newAnimal.name).to.equal('');

        const newBalance = await zooToken.balanceOf(owner.address);
        expect(newBalance.toNumber()).to.greaterThan(prevBalance.toNumber());
    });

    it("Should free a hybrid animal", async () => {
        await addAnimals();
        await addHybrids();
        await breedHybrid();

        const hatchEgg  = await zooMedia.hatchEgg(1,4)

        const hatchEggReceipt = await hatchEgg.wait();

        let sender = hatchEggReceipt.events;

        let from_add
        let token_id
        let from_add2
        let token_id2
        let _yield

        sender.forEach(element => {
            if(element.event == "Hatch"){
                from_add2 = element.args["_from"]
                token_id2 = element.args["_tokenID"]
            }
        });

        const prevBalance = await zooToken.balanceOf(owner.address);

        // TODO increase block number and test yield
        // await ethers.provider.send("evm_setNextBlockTimestamp", [9617249934]);

        const freed = await zooMedia.freeAnimal(5);

        const freedReceipt = await freed.wait();

        sender = freedReceipt.events;

        sender.forEach(element => {
            if(element.event == "Burn"){
                from_add2 = element.args["_from"]
                token_id2 = element.args["_tokenID"]
            } else if (element.event == "FreeAnimal"){
                from_add = element.args["_from"]
                token_id = element.args["_tokenID"]
                _yield = element.args["_yield"]
            }
        });

        expect(from_add2).to.equal(owner.address);
        expect(token_id2.toNumber()).to.equal(5);

        expect(from_add).to.equal(owner.address);
        expect(token_id.toNumber()).to.equal(5);
        expect(_yield.toNumber()).to.greaterThan(0);

        const newAnimal = await zooMedia.animals(token_id.toNumber());
        expect(newAnimal.name).to.equal('');

        const newBalance = await zooToken.balanceOf(owner.address);
        expect(newBalance.toNumber()).to.greaterThan(prevBalance.toNumber());
    });
})
