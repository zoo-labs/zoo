import { ethers } from 'hardhat';

import { ZooToken } from '../types/ZooToken';

import { ZooFaucet } from '../types/ZooFaucet';

import chai, { expect } from "chai";
import { BigNumber } from 'ethers';

let zooToken: any;

let zooFaucet: any;

let signers: any;

let mintAmt = 100000000;

let owner;

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

    })

    it("Should get the Faucet owner", async () => {

        const faucetOwner: string = await zooFaucet.owner();

        expect(faucetOwner).to.equal(owner.address);

    });

    it("Should mint 100,000,000 tokens from ZooToken to ZooFaucet", async () => {

        const faucetPreBal: BigNumber = await zooToken.balanceOf(zooFaucet.address);

        await zooToken.mint(zooFaucet.address, mintAmt);

        const faucetPostBal: BigNumber = await zooToken.balanceOf(zooFaucet.address);

        expect(parseInt(faucetPreBal._hex)).to.equal(0);

        expect(parseInt(faucetPostBal._hex)).to.equal(mintAmt);


    });
})
