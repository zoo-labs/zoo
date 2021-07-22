import { ethers } from 'hardhat';

import { ZooToken } from '../types/ZooToken';

import { ZooFaucet } from '../types/ZooFaucet';

let zooToken: ZooToken;

let zooFaucet: ZooFaucet;

let signers: any;

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
        await zooFaucet.deployed()

    })

    it("Should commit hash", async () => {

    })
})
