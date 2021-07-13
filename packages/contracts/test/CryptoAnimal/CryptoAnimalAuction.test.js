const chai = require("chai");
const { solidity } = require("ethereum-waffle");
const { BigNumber } = require("ethers");
const { makeAnimal, MarketStatus, Specie, time } = require("./utils");

const { expect } = chai;

chai.use(solidity);

describe("CryptoAnimal auction", function () {
  beforeEach(async function () {
    const CryptoAnimal = await ethers.getContractFactory("CryptoAnimal");
    this.cryptoAnimal = await CryptoAnimal.deploy("CryptoAnimal", "CRTA");
    await this.cryptoAnimal.deployed();

    this.users = await ethers.getSigners();
    this.alice = this.users[0]
    this.bob = this.users[1]
    this.carl = this.users[2]
    this.dave = this.users[3]
    this.eve = this.users[4]
    
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

  it("should start auction for token owner", async function() {
    const withBob = await this.cryptoAnimal.connect(this.bob);

    await withBob.startAuction(0, 200, 3600);
    const token = await withBob.animals(0);
    const auction = await withBob.auctions(0);

    expect(token).to.have.deep.property('inMarket', MarketStatus.AUCTION);
    expect(auction).to.have.deep.property('highestBid', BigNumber.from(200));
  });

  it("cannot bid if auction didn't start", async function() {
    const withCarl = await this.cryptoAnimal.connect(this.carl);

    await expect(withCarl.bid(0))
      .to.be.revertedWith("Animal: not in auction sale");
  });

  it("cannot bid with lower price than highest bid", async function() {
    const withBob = await this.cryptoAnimal.connect(this.bob);
    const withCarl = await this.cryptoAnimal.connect(this.carl);

    await withBob.startAuction(0, 200, 3600);
    await expect(withCarl.bid(0, { value: 150 }))
      .to.be.revertedWith("Animal: bid not high enough");
  });

  it("can bid", async function() {
    const withBob = await this.cryptoAnimal.connect(this.bob);
    const withCarl = await this.cryptoAnimal.connect(this.carl);
    const withDave = await this.cryptoAnimal.connect(this.dave);
    const withEve = await this.cryptoAnimal.connect(this.eve);

    const mktsqBalance = await ethers.provider.getBalance(this.alice.address)
    const bobBalance = await ethers.provider.getBalance(this.bob.address)
    const carlBalance = await ethers.provider.getBalance(this.carl.address)
    const daveBalance = await ethers.provider.getBalance(this.dave.address)
    const eveBalance = await ethers.provider.getBalance(this.eve.address)

    await withBob.startAuction(0, 200, 3600);
    
    await withCarl.bid(0, { value: 220 });
    await withDave.bid(0, { value: 230 });
    await withEve.bid(0, { value: 250 });
    await withDave.bid(0, { value: 280 });
    await withEve.bid(0, { value: 300 }); /* final bider */

    /* time flies */
    await time.increase(3601);

    await expect(withBob.endAuction(0))
      .to.emit(withBob, "AuctionEnded")
      .withArgs(0, this.bob.address, this.eve.address, 300);
    await expect(withBob.cancelAuction(0))
      .to.be.revertedWith("Animal: not in auction sale");

    // expect(await ethers.provider.getBalance(this.carl.address))
    //   .to.equal(carlBalance.sub(220));
    // expect(await ethers.provider.getBalance(this.dave.address))
    //   .to.equal(daveBalance.sub(230 + 280));
    // expect(await ethers.provider.getBalance(this.eve.address))
    //   .to.equal(eveBalance.sub(250 + 300));

    await withCarl.withdraw(0)
    await withDave.withdraw(0)
    await withEve.withdraw(0)

    // /* check balance after withdraw */
    // expect(await ethers.provider.getBalance(this.carl.address))
    //   .to.equal(carlBalance);
    // expect(await ethers.provider.getBalance(this.dave.address))
    //   .to.equal(daveBalance);
    // expect(await ethers.provider.getBalance(this.eve.address))
    //   .to.equal(eveBalance.sub(300));
    
    // /* check seller's balance */
    // expect(await ethers.provider.getBalance(this.bob.address))
    //   .to.equal(bobBalance.add(300 * 0.97));

    // /* check fee was added to mktsq's balance */
    // expect(await ethers.provider.getBalance(this.alice.address))
    //   .to.equal(mktsqBalance.add(300 * 0.03));

    /* check token was transfered to final bidder */
    expect(await withEve.ownerOf(0))
      .to.equal(this.eve.address);
  });
});
