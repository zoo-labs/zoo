const chai = require("chai");
const { solidity } = require("ethereum-waffle");
const { BigNumber } = require("ethers");
const { makeAnimal, MarketStatus, Specie } = require("./utils");

const { expect } = chai;

chai.use(solidity);

describe("CryptoAnimal sell", function () {
  beforeEach(async function () {
    const CryptoAnimal = await ethers.getContractFactory("CryptoAnimal");
    this.cryptoAnimal = await CryptoAnimal.deploy("CryptoAnimal", "CRTA");
    await this.cryptoAnimal.deployed();

    this.users = await ethers.getSigners();
    this.alice = this.users[0]
    this.bob = this.users[1]
    this.carl = this.users[2]

    
    this.animal1 = makeAnimal({
      inBreedMarket: false,
      matronId: 0,
      sireId: 0,
      breedPrice: 0,
      price: 100,
      generation: 0,
      breedCount: 0,
      dna: 0,
      inMarket: MarketStatus.NONE,
      eggTime: 0,
      hatchTime: 0,
      lastBreedTime: 0,
      specie: Specie.MUTANT
    })

    const owner = await this.cryptoAnimal.connect(this.alice);
    await owner.mintToken(this.bob.address, this.animal1)
    this.withTokenOwner = await this.cryptoAnimal.connect(this.bob);
  })

  it("should not work for invalid token id", async function() {
    const withBob = await this.cryptoAnimal.connect(this.bob);

    await expect(withBob.buy(1))
      .to.be.revertedWith("Animal: invalid token id");
  });

  it("should not work if the animal is not in market", async function() {
    const withBob = await this.cryptoAnimal.connect(this.bob);

    await expect(withBob.buy(0))
      .to.be.revertedWith("Animal: not in sale now");
  });

  it("should not work if price doesn't match", async function() {
    await this.withTokenOwner.setMarketStatus(0, MarketStatus.SALE);
    const withBob = await this.cryptoAnimal.connect(this.bob);

    await expect(withBob.buy(0, { value: 99 }))
      .to.be.revertedWith("Animal: incorrect price");
  });

  it("should not work if Bob buys his animal", async function() {
    await this.withTokenOwner.setMarketStatus(0, MarketStatus.SALE);
    const withBob = await this.cryptoAnimal.connect(this.bob);

    await expect(withBob.buy(0, { value: 100 }))
      .to.be.revertedWith("Animal: can't buy oneself's animal");
  });

  it("should work if Carl buys Bob's animal", async function() {
    await this.withTokenOwner.setMarketStatus(0, MarketStatus.SALE);
    const withCarl = await this.cryptoAnimal.connect(this.carl);
    const aliceBalance = await ethers.provider.getBalance(this.alice.address)
    const bobBalance = await ethers.provider.getBalance(this.bob.address)

    await expect(withCarl.buy(0, { value: 100 }))
      .to.emit(withCarl, "tokenSold")
      .withArgs(this.bob.address, this.carl.address, 0);

    expect(await withCarl.ownerOf(0))
      .to.equal(this.carl.address);

    expect(await ethers.provider.getBalance(this.alice.address))
      .to.equal(aliceBalance.add(3));
    expect(await ethers.provider.getBalance(this.bob.address))
      .to.equal(bobBalance.add(97));
  });
});
