import { ethers } from 'hardhat';

import { ZooToken } from '../types/ZooToken';

// import { ZooFaucet } from '../types/ZooFaucet';

import chai from 'chai';

let zooToken: ZooToken;

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

    })

    it("Should commit hash", async () => {

    })
})
