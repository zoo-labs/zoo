import { deployments, ethers, getNamedAccounts } from 'hardhat'

// import { ZooKeeper__factory, ZooMedia__factory, ZooMarket__factory, Token, ZooDrop } from '../types';

// import { ZooMedia } from '../types/ZooMedia';
// import { ZooToken } from '../types/ZooToken';
// import { ZooFaucet } from '../types/ZooFaucet';
// import { ZooMarket } from '../types/ZooMarket';
// import { ZooKeeper } from '../types/ZooKeeper';
import chai, { expect } from 'chai'
// import configureGame from '../utils/configureGame';
import { Contract, BigNumber, Bytes, BytesLike, utils } from 'ethers'

import { solidity } from 'ethereum-waffle'
import '@nomiclabs/hardhat-ethers'
import { hex } from 'chalk'

chai.use(solidity)

let zooToken: any
let zooDrop: any
let zooMarket: any
let zooKeeper: any
let zooMedia: any
let signers: any
let mintAmt = 100000000
let owner
let mediaAddress: string
let marketAddress: string
let eggPrice: any

class Helper {
  private zooToken: Contract;
  private zooDrop: Contract;
  private owner: any;
  private zooMarket: Contract;
  private zooMedia: Contract;
  private zooKeeper: Contract;
  private eggPrice: BigNumber;
  private signers: any;

  constructor() {}

  public static async setup() {
    const inst = new Helper()
    await (deployments.createFixture(async ({ deployments, getNamedAccounts, ethers}, options) => {
    const contracts = await deployments.fixture() // ensure you start from a fresh deployments

    const signers = inst.signers = await ethers.getSigners()
    inst.zooToken = await ethers.getContractAt('ZooToken', contracts.ZooToken.address, signers[0])
    inst.zooMarket = await ethers.getContractAt('ZooMarket', contracts.ZooMarket.address, signers[0])
    inst.zooMedia = await ethers.getContractAt('ZooMedia', contracts.ZooMedia.address, signers[0])
    inst.zooKeeper = await ethers.getContractAt('ZooKeeper', contracts.ZooKeeper.address, signers[0])
    inst.zooDrop = await ethers.getContractAt('ZooDrop', contracts.ZooDrop.address, signers[0])

    // this mint is executed once and then createFixture will ensure it is snapshotted
    // await zooToken.mint(tokenOwner.deployer, 100000).then(tx => tx.wait());

    const getDeployer = await getNamedAccounts()

    inst.owner = getDeployer.deployer
    inst.eggPrice = await inst.zooDrop.eggPrice()
    }))()


    return inst;
  }

  async getEventData(tx: any, eventName: String) {
    const {events} = await tx.wait();
    let args: any[] = [];
    for(let i = events.length - 1; i >= 0; i--) {
      let evt = events[i];
      if (evt.event === eventName) {
	args = evt.args;
	break;
      }
    }
    return args
  }

  async breedAnimals() {}
  async freeAnimal(id: Number) {}
  async hatchEgg() {}

  async buyEgg(priorEggId: number = 1) {
    await this.zooToken.approve(this.zooKeeper.address, this.eggPrice)
    const tx = await this.zooKeeper.buyEgg(1);
    const args = await this.getEventData(tx, 'BuyEgg')
    return {from_evt: args['from'], eggID: args['eggID']};
  }

  async hatchAnimal(token_id: String) {
    const tx = await this.zooKeeper.hatchEgg(1, token_id)
    const args = await this.getEventData(tx, 'Hatch');
    return {animalID: args['animalID']}
  }

  async breedHybrid() {
    const {eggID: egg_id_1} = await this.buyEgg();
    const {eggID: egg_id_2} = await this.buyEgg();

    const {animalID: animal_id_1} = await this.hatchAnimal(egg_id_1);
    const {animalID: animal_id_2} = await this.hatchAnimal(egg_id_2);

    const hybridEgg = await zooKeeper.breedAnimals(1, parseInt(animal_id_1), parseInt(animal_id_2))

    return hybridEgg.id;
  }


}

describe('ZooKeeper', () =>   {
  it.only('Should configure a playable game', async () => {
    const zooKeeper = await Helper.setup();

    await expect(async () => {
      await zooKeeper.buyEgg(1)
      await zooKeeper.buyEgg(1)

      await zooKeeper.hatchAnimal(
    }).not.to.throw();

    // // Hatch eggs into animals
    // await zooKeeper.methods.hatchEgg(1, 1).send({ from: account }).then((res) => {
    //   console.log('hatchEgg', res);
    // })

    // await zooKeeper.methods.hatchEgg(1, 2).send({ from: account }).then((res) => {
    //   console.log('hatchEgg', res);
    // })

//    await zooKeeper.hatchEgg(1, 1)

 //   await zooKeeper.hatchEgg(1, 2)

    // Breed animals into hybrid egg
    // await zooKeeper.methods.breedAnimals(1, 3, 4).send({ from: account }).then((res) => {
    //   console.log('breedAnimals', res)
    // })

  //  await zooKeeper.breedAnimals(1, 3, 4)

    // Hatch hybrid egg into hybrid animal
    // await zooKeeper.methods.hatchEgg(1, 5).send({ from: account }).then((res) => {
    //   console.log('hatchEgg', res);
    // })

   // await zooKeeper.hatchEgg(1, 5)

    // Free animal and collect yield
    // await zooKeeper.methods.freeAnimal(6).send({ from: account }).then((res) => {
    //     console.log('freeAnimal', res);
    //  })

    await zooKeeper.freeAnimal(6)

    // if (tokenBalance > 1) {
    //    const tokenID = await zooMedia.methods
    //       .tokenOfOwnerByIndex(account, 1)
    //       .call();
    //    console.log("tokenID", tokenID);
    //    const tokenURI = await zooMedia.methods.tokenURI(tokenID).call();
    //    console.log("tokenURI", tokenURI);
    //    const token = await zooKeeper.methods.tokens(tokenID).call();
    //    console.log("token", token);
    // }

    // TOTAL EGGS AFTER THIS TEST = 2
  })
})
