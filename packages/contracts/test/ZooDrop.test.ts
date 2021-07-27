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

    /**
     * CurrentSupply
     */
    it("Should have current supply equal total supply", async () => {
        let currentSupply = await zooDrop.getCurrentSupply();
        expect(currentSupply.toNumber()).to.equal((await zooDrop.totalSupply()).toNumber());
    });

    /*
        Adding Animals
    */
    it("Should add an Animal", async () => {
        await zooDrop.addAnimal("Pug", 100, "Common", 5500, 1, "test","test");

        const Animal = await zooDrop.animals("Pug");

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

        await zooDrop.addHybrid("Puggy", "Pug","Pug", 120 ,"test","test");

        const Hybrid = await zooDrop.getHybrid("PugPug");
        const tokenURI = await zooDrop.getTokenURI("Puggy");

        expect(Hybrid.name).to.equal("Puggy");
        expect(tokenURI).to.equal("test");

    });

    it("Should revert when adding a animal not as owner", async() => {
        zooDrop = zooDrop.connect(signers[1]);
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
        // zooDrop = zooDrop.connect(signers[0]);
        let eggPrice = await zooDrop.getEggPrice();
        // console.log("Eggprice: ", eggPrice)
        // expect(eggPrice).to.equal(200) // default eggPrice

        await zooDrop.connect(signers[0]).setEggPrice(333); //set a new price

        eggPrice = await zooDrop.getEggPrice();
        expect(eggPrice).to.equal(333) // gets the new eggPrice
    });

    it("Should revert when setting egg price as non owner", async() => {
        zooDrop = zooDrop.connect(signers[1]);
        try {
            const tx = await zooDrop.setEggPrice(333);
        } catch (e) {
            expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
        }
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
