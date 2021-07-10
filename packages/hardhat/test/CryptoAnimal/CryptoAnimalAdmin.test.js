const chai = require("chai");
const { solidity } = require("ethereum-waffle");
const { makeAnimal, MarketStatus, Specie } = require("./utils");

const { expect } = chai;

chai.use(solidity);

describe("CryptoAnimal admin", function () {
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
  })

  it("should not work for non-owner", async function() {
    const withBob = await this.cryptoAnimal.connect(this.bob);
    
    await expect(withBob.setHatchReadyTime(1))
      .to.be.revertedWith("Ownable: caller is not the owner");
    
    await expect(withBob.setHatchPrice(1))
      .to.be.revertedWith("Ownable: caller is not the owner");

    await expect(withBob.setFeePercentage(1))
      .to.be.revertedWith("Ownable: caller is not the owner");
    
    await expect(withBob.setMktsqWallet(this.bob.address))
      .to.be.revertedWith("Ownable: caller is not the owner");

    await expect(withBob.mintToken(this.bob.address, this.animal1))
      .to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("can update hatchReadyTime", async function() {
    const withOwner = await this.cryptoAnimal.connect(this.alice);

    await expect(withOwner.setHatchReadyTime(1000))
      .to.emit(withOwner, 'hatchReadyTimeUpdated')
      .withArgs(this.alice.address);
    
    expect(await withOwner.hatchReadyTime()).to.equal(1000);
  });

  it("can update hatchPrice", async function() {
    const withOwner = await this.cryptoAnimal.connect(this.alice);

    await expect(withOwner.setHatchPrice(1000))
      .to.emit(withOwner, 'hatchPriceUpdated')
      .withArgs(this.alice.address);
    
    expect(await withOwner.hatchPrice()).to.equal(1000);
  });

  it("can update feePercentage", async function() {
    const withOwner = await this.cryptoAnimal.connect(this.alice);

    await expect(withOwner.setFeePercentage(6))
      .to.emit(withOwner, 'feePercentageUpdated')
      .withArgs(this.alice.address);
    
    expect(await withOwner.feePercentage()).to.equal(6);
  });

  it("can update mktsqWallet", async function() {
    const withOwner = await this.cryptoAnimal.connect(this.alice);

    await expect(withOwner.setMktsqWallet(this.bob.address))
      .to.emit(withOwner, 'mktsqWalletUpdated')
      .withArgs(this.alice.address);
    
    expect(await withOwner.mktsqWallet()).to.equal(this.bob.address);
  });

  it("can mint new token", async function() {
    const withOwner = await this.cryptoAnimal.connect(this.alice);

    await withOwner.mintToken(this.bob.address, this.animal1)
    expect(await withOwner.animals(0)).to.have.deep.members(this.animal1);
  });
});
