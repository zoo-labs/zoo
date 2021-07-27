import { ethers } from 'hardhat';

import { ZooDrop } from '../types/ZooDrop';

import chai, { expect } from "chai";

import { BigNumber, Bytes, BytesLike, utils } from 'ethers';

let zooDrop

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

        await zooDrop.deployed();
    })

    /*
        Adding Animals
    */
    it("Should add an Animal", async () => {
        await zooDrop.addAnimal("Pug", 100, "Common", 5500, 1, "test","test");

        const Animal = await zooDrop.animals("Pug");

        const tokenURI = await zooDrop.tokenURI(Animal.name);

        expect(Animal.name).to.equal("Pug");
        expect(tokenURI).to.equal("test");

    });

    it("Should add an Hybrid", async () => {
        await zooDrop.addHybrid("Puggy", "Pug","Pug", 120 ,"test","test");

        const Hybrid = await zooDrop.hybrids("PugPug");
        const tokenURI = await zooDrop.tokenURI("Puggy");

        expect(Hybrid.name).to.equal("Puggy");
        expect(tokenURI).to.equal("test");

    });

    it("Should revert when adding a animal not as owner", async() => {
<<<<<<< HEAD

        zooMedia = zooMedia.connect(signers[1]);
=======
        zooDrop = zooDrop.connect(signers[1]);
>>>>>>> 94ac518 (Rearranging ZooMedia and ZooDrop contracts)
        try {
            const tx = await zooDrop.addAnimal("Pug", 100, "Common", 5500, 1, "test","test");
        } catch (e) {
            expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
        }

    });

    it("Should revert when adding a hybrid animal not as owner", async() => {
        zooDrop = zooDrop.connect(signers[1]);
        try {
            const tx = await zooDrop.addHybrid("Puggy", "Pug","Pug", 120 ,"test","test");
        } catch (e) {
            expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
        }
     });

    /**
     * EGG PRICE
     */
    it("Should set & get egg price", async() => {
        zooDrop = zooDrop.connect(signers[0]);
        let bigEggPrice = await zooDrop.getEggPrice();
        let eggPrice = bigEggPrice.toNumber();
<<<<<<< HEAD
        expect(eggPrice).to.equal(200); // default eggPrice

        await zooMedia.connect(signers[0]).setEggPrice(333); //set a new price

        bigEggPrice = await zooMedia.getEggPrice();
=======
        expect(eggPrice).to.equal(210); // default eggPrice

        await zooDrop.connect(signers[0]).setEggPrice(333); //set a new price

        bigEggPrice = await zooDrop.getEggPrice();
>>>>>>> 94ac518 (Rearranging ZooMedia and ZooDrop contracts)
        eggPrice = bigEggPrice.toNumber();
        expect(eggPrice).to.equal(333); // gets the new eggPrice
    });

    it("Should revert when setting egg price as non owner", async() => {
<<<<<<< HEAD
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

=======
        zooDrop = zooDrop.connect(signers[1]);
        try {
            const tx = await zooDrop.setEggPrice(333);
        } catch (e) {
            expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
        }
>>>>>>> 94ac518 (Rearranging ZooMedia and ZooDrop contracts)
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
<<<<<<< HEAD
            const tx = await zooDrop.setTokenURI("pug", "TEST");
=======
            const tx = await zooDrop.settokenURI("pug", "TEST");
>>>>>>> 94ac518 (Rearranging ZooMedia and ZooDrop contracts)
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
<<<<<<< HEAD
})
=======
})
>>>>>>> 94ac518 (Rearranging ZooMedia and ZooDrop contracts)
