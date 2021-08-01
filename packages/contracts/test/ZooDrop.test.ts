import { ethers } from 'hardhat';
import { ZooDrop } from '../types/ZooDrop';
import chai, { expect } from "chai";
import { BigNumber, Bytes, BytesLike, utils } from 'ethers';

let zooDrop : any;
let signers: any;
let mintAmt = 100000000;
let owner;

const TOKEN_URI = "idx.zoolabs.io/token/"
const META_URI = "idx.zoolabs.io/meta/"

describe("ZooDrop", () => {
    beforeEach(async () => {
        signers = await ethers.getSigners();
        owner = signers[0]

        // Deploy zoodrop
        const ZooDrop = await ethers.getContractFactory('ZooDrop', owner);
        zooDrop = await ZooDrop.deploy('Gen1');

        // Set default eggs on ZooDrop
        const eggs = [
          {
            name: "baseEgg",
            price: 210,
            supply: 16000,
            tokenURI: "https://db.zoolabs/egg.jpg",
            metadataURI: "https://db.zoolabs.org/egg.json"
          },
          {
            name: "hybridEgg",
            price: 0,
            supply: 0,
            tokenURI: "https://db.zoolabs/hybrid.jpg",
            metadataURI: "https://db.zoolabs.org/hybrid.json"
          }
        ]

        await Promise.all(eggs.map((v) => {
          zooDrop.setEgg(v.name, v.price, v.supply, v.tokenURI, v.metadataURI)
        }))

        // configure our eggs to be base / hybrid egg
        zooDrop.configureEggs("baseEgg", "hybridEgg")

  await Promise.all(eggs.map((v) => {
    console.log('Add Egg:', v.name)
    drop.setEgg(v.name, v.price, v.supply, v.tokenURI, v.metadataURI)
  }))

        zooDrop.setEgg("baseEgg")
        await zooDrop.deployed();
    })

    it("Should have current supply equal total supply", async () => {
        let currentSupply = await zooDrop.currentSupply();
        expect(currentSupply.toNumber()).to.equal((await zooDrop.totalSupply()).toNumber());
    });

    it("Should add Animal", async () => {
        await zooDrop.addAnimal("Pug", 100, "Common", 5500, TOKEN_URI, META_URI);

        const Animal = await zooDrop.animals("Pug");
        const tokenURI = await zooDrop.tokenURI(Animal.name);

        expect(Animal.name).to.equal("Pug");
        expect(tokenURI).to.equal(TOKEN_URI);
    });

    it("Should add an Hybrid", async () => {
        await zooDrop.addHybrid("Puggy", "Pug","Pug", 120, TOKEN_URI, META_URI);

        const Hybrid = await zooDrop.hybrids("PugPug");
        const tokenURI = await zooDrop.tokenURI("Puggy");

        expect(Hybrid.name).to.equal("Puggy");
        expect(tokenURI).to.equal(TOKEN_URI);
    });

    it("Should revert when adding a animal not as owner", async() => {
        zooDrop = zooDrop.connect(signers[1]);
        try {
            const tx = await zooDrop.addAnimal("Pug", 100, "Common", 5500, TOKEN_URI, META_URI);
        } catch (e) {
            expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
        }

    });

    it("Should revert when adding a hybrid animal not as owner", async() => {
        zooDrop = zooDrop.connect(signers[1]);
        try {
            const tx = await zooDrop.addHybrid("Puggy", "Pug","Pug", 120, TOKEN_URI, META_URI);
        } catch (e) {
            expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
        }
     });

    it("Should set & get egg price", async() => {
        zooDrop = zooDrop.connect(signers[0]);
        const eggPrice = (await zooDrop.eggPrice()).toNumber();
        expect(eggPrice).to.equal(210); // default eggPrice

        await zooDrop.connect(signers[0]).setEggPrice(333); //set a new price

        const newPrice = (await zooDrop.eggPrice()).toNumber();
        expect(newPrice).to.equal(333); // gets the new eggPrice
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
        await zooDrop.setTokenURI("pug", "pug.com");
        let tokenURI = await zooDrop.tokenURI("pug");
        expect(tokenURI).to.equal("pug.com");
    });

    it("Should revert when setting tokenURI as non owner", async() => {
        zooDrop = zooDrop.connect(signers[1]);
        try {
            const tx = await zooDrop.setTokenURI("pug", "pug.com");
        } catch (e) {
            expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
        }
    });

    it("Should set metadataURI for a pug", async() => {
        zooDrop = zooDrop.connect(signers[0]);
        const res = await zooDrop.setMetadataURI("pug", "pug.com/meta");
        const metadataURI = await zooDrop.getMetadataURI("pug");
        expect(metadataURI).to.equal("pug.com/meta");
    });

    it("Should revert when setting tokenURI as non owner", async() => {
      zooDrop = zooDrop.connect(signers[1]);
      try {
          const tx = await zooDrop.setMetadataURI("pug", "pug.com");
      } catch (e) {
          expect(e.message.includes('Ownable: caller is not the owner')).to.be.true;
      }
    });
})
