import { ethers } from 'hardhat';

import { ZooDrop } from '../types/ZooDrop';

import chai, { expect } from "chai";

import { BigNumber, Bytes, BytesLike, utils } from 'ethers';

let zooToken: any;

let zooFaucet: any;

let zooMarket: any;

// let zooDrop: any;

let zooMedia: any;

let signers: any;

let mintAmt = 100000000;

let owner;

let auctionAddress: string;

let tokenAddress: string;

describe("Test ZooDrop", () => {

    beforeEach(async () => {

        signers = await ethers.getSigners();
        owner = signers[0]

        const ZooDrop = await ethers.getContractFactory('ZooDrop', owner);

        zooDrop = await ZooDrop.deploy(16000, 210);

        zooMedia = (await new ZooMedia__factory(owner).deploy('ANML', 'CryptoZoo', auctionAddress, zooToken.address, 20)) as ZooMedia
        await zooMedia.deployed();

        tokenAddress = zooMedia.address;

        await zooMarket.configure(tokenAddress);

        // const zooDropFactory = await ethers.getContractFactory(
        //     "ZooDrop",
        //     signers[0]
        // );

        // zooDrop = (await zooDropFactory.deploy(zooToken.address, zooMedia.address, BigNumber.from(10))) as ZooDrop
        // await zooDrop.deployed();

    })

    /*
    Deploy Script
    */

    it("Should get the ZooDrop owner", async () => {

        const zooDropOwner: string = await zooMedia.owner();

        expect(zooDropOwner).to.equal(owner.address);

    });

    /*
        Adding Animals
    */
    it("Should add an Animal", async () => {
        await zooDrop.addAnimal("Pug", 100, "Common", 5500, 1, "test","test");

        const Animal = await zooDrop.animals("Pug");

        await zooMedia.addAnimal("Pug", 100, "Common", 5500, 1, "test","test");

        const Animal = await zooMedia.getAnimal("Pug");

        const tokenURI = await zooMedia.getTokenURI(Animal.name);

        expect(Animal.name).to.equal("Pug");
        expect(tokenURI).to.equal("test");

    });


    it("Should pick a pug", async () => {


        await zooMedia.addAnimal("Pug", 100, "Common", 5500, 1, "test","test");

        const pick = await zooMedia.pickAnimal(20);

        const Animal = await zooMedia.getAnimal(pick);

        expect(Animal.name).to.equal("Pug");

    });


    it("Should add an Hybrid", async () => {
        await zooDrop.addHybrid("Puggy", "Pug","Pug", 120 ,"test","test");

        await zooMedia.addHybrid("Puggy", "Pug","Pug", 120 ,"test","test");

        const Hybrid = await zooMedia.getHybrid("PugPug");
        const tokenURI = await zooMedia.getTokenURI("Puggy");

        expect(Hybrid.name).to.equal("Puggy");
        expect(tokenURI).to.equal("test");

    });

    it("Should revert when adding a animal not as owner", async() => {

        zooMedia = zooMedia.connect(signers[1]);
        try {
            const tx = await zooMedia.addAnimal("Pug", 100, "Common", 5500, 1, "test","test");
            // console.log("tx: ", tx.wait())
        } catch (e) {
            expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
        }

    });

    it("Should revert when adding a hybrid animal not as owner", async() => {
        // await expect(zooDrop.connect(signers[1]).addHybrid("Puggy", "Pug","Pug", 120 ,"test","test")).to.be.reverted
        zooMedia = zooMedia.connect(signers[1]);
        try {
            const tx = await zooMedia.addHybrid("Puggy", "Pug","Pug", 120 ,"test","test");
            // console.log("tx: ", tx.wait())
        } catch (e) {
            expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
        }
     });

    /**
     * EGG PRICE
     */
    it("Should set & get egg price", async() => {
        zooMedia = zooMedia.connect(signers[0]);
        let bigEggPrice = await zooMedia.getEggPrice();
        let eggPrice = bigEggPrice.toNumber();
        expect(eggPrice).to.equal(200); // default eggPrice

        await zooMedia.connect(signers[0]).setEggPrice(333); //set a new price

        bigEggPrice = await zooMedia.getEggPrice();
        eggPrice = bigEggPrice.toNumber();
        expect(eggPrice).to.equal(333); // gets the new eggPrice
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

            await zooToken.approve(zooMedia.address, 200)

            const buyEgg = await zooMedia.connect(owner).buyEgg({
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
     * TOKEN URI
     */
    it("Should set tokenURI for a pug", async() => {
        zooDrop = zooDrop.connect(signers[0]);
        await zooDrop.setTokenURI("pug", "TEST");
        let tokenURI = await zooDrop.tokenURI("pug");
        expect(tokenURI).to.equal("TEST");
    });

    it("Should revert when setting tokenURI as non owner", async() => {
        zooDrop = zooDrop.connect(signers[1]);
        try {
            const tx = await zooDrop.setTokenURI("pug", "TEST");
        } catch (e) {
            expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
        }
    });

    /**
     * METADATA URI
     */
     it("Should set metaDataURI for a pug", async() => {
        zooDrop = zooDrop.connect(signers[0]);
        await zooDrop.setMetadataURI("pug", "TEST");
        let tokenURI = await zooDrop.metaDataURI("pug");
        expect(tokenURI).to.equal("TEST");
    });

    it("Should revert when setting tokenURI as non owner", async() => {
        zooDrop = zooDrop.connect(signers[1]);
        try {
            const tx = await zooDrop.setMetadataURI("pug", "TEST");
        } catch (e) {
            expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
        }
    });
})
