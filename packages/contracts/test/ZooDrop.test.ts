import { ethers } from 'hardhat';

import { ZooDrop } from '../types/ZooDrop';

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

let zooDrop: any;

let zooMedia: any;

let signers: any;

let mintAmt = 100000000;

let owner;

let auctionAddress: string;

let tokenAddress: string;

describe("Test Faucet", () => {

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

        zooMedia = (await new ZooMedia__factory(owner).deploy('ANML', 'CryptoZoo', auctionAddress)) as ZooMedia
        await zooMedia.deployed();
          
        tokenAddress = zooMedia.address;
      
        await zooMarket.configure(tokenAddress);

        const zooDropFactory = await ethers.getContractFactory(
            "ZooDrop",
            signers[0]
        );

        zooDrop = (await zooDropFactory.deploy(zooToken.address, zooMedia.address, BigNumber.from(10))) as ZooDrop
        await zooDrop.deployed();

    })

    /*
    Deploy Script
    */

    it("Should get the ZooDrop owner", async () => {

        const zooDropOwner: string = await zooDrop.owner();

        expect(zooDropOwner).to.equal(owner.address);

    });

    /*
        Adding Animals
    */
   
    it("Should add an Animal", async () => {


        await zooDrop.addAnimal("Pug", 100, "Common", 5500, 1, "test","test");

        const Animal = await zooDrop.getAnimal("Pug");

        const tokenURI = await zooDrop.getTokenURI(Animal.name);

        expect(Animal.name).to.equal("Pug");
        expect(tokenURI).to.equal("test");


    });


    it("Should pick a pug", async () => {


        await zooDrop.addAnimal("Pug", 100, "Common", 5500, 1, "test","test");

        const pick = await zooDrop.pickAnimal(20);

        const Animal = await zooDrop.getAnimal(pick);

        expect(Animal.name).to.equal("Pug");

    });


    it("Should add an Hybrid", async () => {

        await zooDrop.addHybrid("Puggy", "Pug","Pug", 120 ,"test","test");

        const Hybrid = await zooDrop.getHybrid("PugPug");
        const tokenURI = await zooDrop.getTokenURI("Puggy");

        expect(Hybrid.name).to.equal("Puggy");
        expect(tokenURI).to.equal("test");

    });

    it("Should revert when adding a animal not as owner", async() => {
        // await expect(zooDrop.connect(signers[1]).addAnimal("Pug", 100, "Common", 5500, 1, "test","test")).to.be.reverted('Ownable: caller is not the owner');
        
        zooDrop = zooDrop.connect(signers[1]);
        try {
            const tx = await zooDrop.addAnimal("Pug", 100, "Common", 5500, 1, "test","test");
            // console.log("tx: ", tx.wait())
        } catch (e) {
            // console.log("message", e)
            // console.log("message", e.message)
            expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
        }
        
    });
    
    it("Should revert when adding a hybrid animal not as owner", async() => {
        // await expect(zooDrop.connect(signers[1]).addHybrid("Puggy", "Pug","Pug", 120 ,"test","test")).to.be.reverted
        zooDrop = zooDrop.connect(signers[1]);
        try {
            const tx = await zooDrop.addHybrid("Puggy", "Pug","Pug", 120 ,"test","test");
            // console.log("tx: ", tx.wait())
        } catch (e) {
            // console.log("message", e)
            // console.log("message", e.message)
            expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
        }
     });

    /**
     * EGG PRICE
     */
    it("Should set & get egg price", async() => {
        // zooDrop = zooDrop.connect(signers[0]);
        let eggPrice = await zooDrop.getEggPrice();
        // console.log("Eggprice: ", eggPrice)
        // expect(eggPrice).to.equal(200) // default eggPrice
        
        await zooDrop.connect(signers[0]).setEggPrice(333); //set a new price
        
        eggPrice = await zooDrop.getEggPrice();
        expect(eggPrice).to.equal(333) // gets the new eggPrice        
    });

    it("Should revert when setting egg price as non owner", async() => {
        // await expect(zooDrop.connect(signers[1]).addHybrid("Puggy", "Pug","Pug", 120 ,"test","test")).to.be.reverted
    });

    it("Should revert when setting egg price at negative price", async() => {

    });

    it("Should revert when seeting egg price at uint overflow", async() => {

    });

    /**
     * BUYING EGGS
     */
    it("Should buy a basic egg", async() => {

            await zooToken.approve(zooDrop.address, 200)

            const buyEgg = await zooDrop.connect(owner).buyEgg({
                "tokenURI": "test1",
                "metadataURI":"test2",
                "contentHash": utils.formatBytes32String("test3"),
                "metadataHash":utils.formatBytes32String("test4"),
            },
            //Big Shares need to add up to 100 * (10^18)
            {
                "prevOwner": {"value": `${30*(10**18)}`} ,
                "creator": {"value": `${40*(10**18)}`},
                "owner": {"value": `${30*(10**18)}`},
            });
    
            const buyEggReceipt = await buyEgg.wait();
            
            const sender = buyEggReceipt.events;

            let from_add

            sender.forEach(element => {
                if(element.event == "BuyEgg"){
                    from_add = element.args["_from"]
                }
            });
    
            expect(from_add).to.equal(owner.address);
        
        
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

    });
    
    it("Should hatch & burn hybrid egg", async() => {

    });

    it("Should revert when hatching egg with invalid tokenid", async() => {

    });

    it("Should revert when egg creation time restriction is not met", async() => {

    });

    /**
     * MINTING ANIMALS
     */
    it("Should catch a transfer event from minting", async() => {

    });

    it("Should set & get pug as an animal", async() => {

    });

    it("Should revert when set a non existing animal", async() => {

    });

    it("Should revert when set animal with a nonvalid tokenid", async() => {

    });

    it("Should set & get puggy hybrid", async() => {

    });
    
    it("Should revert when set a non existing hybrid", async() => {

    });

    it("Should revert when set hybrid with a nonvalid tokenid", async() => {

    });

    /**
     * BREEDING
     */
    it("Should breed a hybrid egg", async() => {

    });

    it("Should revert when breeding with a hybrid", async() => {

    });

    it("Should revert when breeding with two hybrids", async() => {

    });

    it("Should set an animal", async() => {

    });

    /**
     * FREEING
     */
})
