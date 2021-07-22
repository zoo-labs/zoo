import { ethers } from 'hardhat';

import { ZooToken } from '../types/ZooToken';

import { ZooFaucet } from '../types/ZooFaucet';

import chai, { expect } from "chai";
import { BigNumber } from 'ethers';
import { mint } from './utils';

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


    it("Should be able buy 10k ZOO from ZooFaucet to Zoo", async () => {

        await zooToken.mint(zooFaucet.address, mintAmt);

        const faucetPreBal: BigNumber = await zooToken.balanceOf(zooFaucet.address);

        for (var i = 0; i < signers.length; i++) {

            await zooFaucet.buyZoo(
                signers[i].address,
                10
            );

            const signerBalances = await zooToken.balanceOf(signers[i].address);

            expect(parseInt(signerBalances)).to.equal(10000);
        }

    })

})
