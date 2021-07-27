import { ethers } from 'hardhat';

import { ZooDrop } from '../types/ZooDrop';

import { ZooMedia } from '../types/ZooMedia';
import { ZooMedia__factory } from '../types';

import { Market__factory } from '../types';

import { ZooToken } from '../types/ZooToken';

import { ZooFaucet } from '../types/ZooFaucet';

import { ZooMarket } from '../types/ZooMarket';

import { ZooKeeper } from '../types/ZooKeeper';

import chai, { expect } from "chai";

import { BigNumber } from 'ethers';

let zooToken: any;

let zooFaucet: any;

let zooMarket: any;

let zooDrop: any;

let zooMedia: any;

let zooKeeper: any;

let signers: any;

let mintAmt = 100000000;

let owner;

let auctionAddress: string;

let tokenAddress: string;

describe("Test Faucet", () => {

    beforeEach(async () => {

        signers = await ethers.getSigners();

        const zooTokenFactory = await ethers.getContractFactory(
            "ZooToken",
            signers[0]
        );

        zooToken = (await zooTokenFactory.deploy()) as ZooToken;
        await zooToken.deployed();

        const zooFaucetFactory = await ethers.getContractFactory(
            "ZooFaucet",
            signers[0]
        );

        zooFaucet = (await zooFaucetFactory.deploy(zooToken.address)) as ZooFaucet;
        await zooFaucet.deployed();

        owner = signers[0]
        
        zooMarket =  (await new Market__factory(owner).deploy()) as ZooMarket;
        await zooMarket.deployed();

        auctionAddress = zooMarket.address;

        zooMedia = (await new ZooMedia__factory(owner).deploy('ANML', 'CryptoZoo', auctionAddress)) as ZooMedia
        await zooMedia.deployed();
          
        tokenAddress = zooMedia.address;
      
        await zooMarket.configure(tokenAddress);

        const zooDropFactory = await ethers.getContractFactory(
            "ZooDrop",
            signers[0]
        );

        zooDrop = (await zooDropFactory.deploy(zooToken.address, zooMedia.address)) as ZooDrop
        await zooMedia.deployed();

        const zooKeeperFactory = await ethers.getContractFactory(
            "ZooKeeper",
            signers[0]
        );

        zooKeeper = (await zooKeeperFactory.deploy()) as ZooKeeper
        await zooKeeper.deployed();

    })

})