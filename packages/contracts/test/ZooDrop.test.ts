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

describe.only("ZooDrop", () => {
    beforeEach(async () => {
        signers = await ethers.getSigners();
        owner = signers[0]
        const ZooDrop = await ethers.getContractFactory('ZooDrop', owner);
        zooDrop = await ZooDrop.deploy('Gen1', 16000, 210);
        await zooDrop.deployed();
    })

    it("Should have current supply equal total supply", async () => {
        let currentSupply = await zooDrop.getCurrentSupply();
        expect(currentSupply.toNumber()).to.equal((await zooDrop.totalSupply()).toNumber());
    });

    it("Should add Animal", async () => {
        await zooDrop.addAnimal("Pug", 100, "Common", 5500, 1, "TOKENURI");

        const Animal = await zooDrop.animals("Pug");
        const tokenURI = await zooDrop.tokenURI(Animal.name);

        expect(Animal.name).to.equal("Pug");
        expect(tokenURI).to.equal("URI");
    });

    it("Should add an Hybrid", async () => {
        await zooDrop.addHybrid("Puggy", "Pug","Pug", 120 ,"URI");

        const Hybrid = await zooDrop.hybrids("PugPug");
        const tokenURI = await zooDrop.tokenURI("Puggy");

        expect(Hybrid.name).to.equal("Puggy");
        expect(tokenURI).to.equal("URI");
    });

    it("Should revert when adding a animal not as owner", async() => {
        zooDrop = zooDrop.connect(signers[1]);
        try {
            const tx = await zooDrop.addAnimal("Pug", 100, "Common", 5500, 1, "URI");
        } catch (e) {
            expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
        }

    });

    it("Should revert when adding a hybrid animal not as owner", async() => {
        zooDrop = zooDrop.connect(signers[1]);
        try {
            const tx = await zooDrop.addHybrid("Puggy", "Pug","Pug", 120 ,"URI");
        } catch (e) {
            expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
        }
     });

    it("Should set & get egg price", async() => {
        zooDrop = zooDrop.connect(signers[0]);
        let bigEggPrice = await zooDrop.getEggPrice();
        let eggPrice = bigEggPrice.toNumber();
        expect(eggPrice).to.equal(210); // default eggPrice

        await zooDrop.connect(signers[0]).setEggPrice(333); //set a new price

        bigEggPrice = await zooDrop.getEggPrice();
        eggPrice = bigEggPrice.toNumber();
        expect(eggPrice).to.equal(333); // gets the new eggPrice
    });

    it("Should revert when setting egg price as non owner", async() => {
        zooDrop = zooDrop.connect(signers[1]);
        try {
            const tx = await zooDrop.setEggPrice(333);
        } catch (e) {
            expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
        }
    });

    it("Should set tokenURI for Animal", async() => {
        zooDrop = zooDrop.connect(signers[0]);
        await zooDrop.setTokenURI("pug", "URI");
        let tokenURI = await zooDrop.tokenURI("pug");
        expect(tokenURI).to.equal("URI");
    });

    it("Should revert when setting tokenURI as non owner", async() => {
        zooDrop = zooDrop.connect(signers[1]);
        try {
            const tx = await zooDrop.setTokenURI("pug", "URI");
        } catch (e) {
            expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
        }
    });

    it("Should set metaDataURI for a pug", async() => {
        zooDrop = zooDrop.connect(signers[0]);
        await zooDrop.setMetadataURI("pug", "URI");
        let tokenURI = await zooDrop.metaDataURI("pug");
        expect(tokenURI).to.equal("URI");
    });

    it("Should revert when setting tokenURI as non owner", async() => {
      zooDrop = zooDrop.connect(signers[1]);
      try {
          const tx = await zooDrop.setMetadataURI("pug", "URI");
      } catch (e) {
          expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
      }
    });
})
