const chai = require("chai");
const { solidity } = require("ethereum-waffle");
const { BigNumber } = require("ethers");
const { makeAnimal, MarketStatus, Specie } = require("./utils");

const { expect } = chai;

chai.use(solidity);

describe("CryptoAnimal user", function () {
  beforeEach(async function () {
    const CryptoAnimal = await ethers.getContractFactory("CryptoAnimal");
    this.cryptoAnimal = await CryptoAnimal.deploy("CryptoAnimal", "CRTA");
    await this.cryptoAnimal.deployed();

    this.users = await ethers.getSigners();
    this.alice = this.users[0]
    this.bob = this.users[1]

    this.animal1 = makeAnimal({
      inBreedMarket: false,
      matronId: 0,
      sireId: 0,
      breedPrice: 0,
      price: 0,
      generation: 0,
      breedCount: 0,
      dna: 0,
      inMarket: MarketStatus.NONE,
      eggTime: 0,
      hatchTime: 0,
      lastBreedTime: 0,
      specie: Specie.MUTANT
    })

    this.withTokenOwner = await this.cryptoAnimal.connect(this.alice);
    await this.withTokenOwner.mintToken(this.alice.address, this.animal1)
  })

  it("should not work for non token owner", async function() {
    const withBob = await this.cryptoAnimal.connect(this.bob);
    
    await expect(withBob.setBreedMarketStatus(0, true))
      .to.be.revertedWith("Animal: caller is not the token owner");

    await expect(withBob.setBreedPriceUpdated(0, 1))
      .to.be.revertedWith("Animal: caller is not the token owner");

    await expect(withBob.setMarketStatus(0, MarketStatus.NONE))
      .to.be.revertedWith("Animal: caller is not the token owner");

    await expect(withBob.setPrice(0, 1))
      .to.be.revertedWith("Animal: caller is not the token owner");
  });

  it("can update breedMarketStatus", async function() {
    await expect(this.withTokenOwner.setBreedMarketStatus(0, true))
      .to.emit(this.withTokenOwner, 'breedMarketStatusUpdated')
      .withArgs(this.alice.address);
    
    expect(await this.withTokenOwner.animals(0))
      .to.have.deep.property("inBreedMarket", true);
  });

  it("can update breedPrice", async function() {
    await expect(this.withTokenOwner.setBreedPriceUpdated(0, 123))
      .to.emit(this.withTokenOwner, 'breedPriceUpdated')
      .withArgs(this.alice.address);
    
    expect(await this.withTokenOwner.animals(0))
      .to.have.deep.property("breedPrice", BigNumber.from(123));
  });

  it("can update marketStatus", async function() {
    await expect(this.withTokenOwner.setMarketStatus(0, MarketStatus.SALE))
      .to.emit(this.withTokenOwner, 'marketStatusUpdated')
      .withArgs(this.alice.address);
    
    expect(await this.withTokenOwner.animals(0))
      .to.have.deep.property("inMarket", MarketStatus.SALE);
  });

  it("can update price", async function() {
    await expect(this.withTokenOwner.setPrice(0, 123))
      .to.emit(this.withTokenOwner, 'priceUpdated')
      .withArgs(this.alice.address);
    
    expect(await this.withTokenOwner.animals(0))
      .to.have.deep.property("price", BigNumber.from(123));
  });
});
