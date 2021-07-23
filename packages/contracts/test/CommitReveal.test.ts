import { ethers } from "hardhat";

import chai, { expect } from "chai";

import { CommitReveal } from "../types/CommitReveal";
import { isCommunityResourcable } from "@ethersproject/providers";


let commitReveal: CommitReveal;

let signers: any;

describe("Commit Reveal Test", async () => {

    beforeEach(async () => {

        signers = await ethers.getSigners();

        const commitRevealFactory = await ethers.getContractFactory("CommitReveal", signers[0]);

        commitReveal = (await commitRevealFactory.deploy()) as CommitReveal;
        await commitReveal.deployed();

    })

    it("Should be able to commit", async () => {

        // let reveal = this.state.web3.utils.sha3(""+Math.random())
        //let commit = await contracts.CommitReveal.getHash(reveal).call(

        const randomNum = Math.floor(Math.random() * 100);

        const numToHex = await ethers.utils.hexlify(randomNum);

        const reveal = ethers.utils.formatBytes32String(numToHex);

        const commit = await commitReveal.commit(reveal);

        // const commits = await commitReveal.commits(signers[0].address)

        // console.log(commits)

        // const getHash = await commitReveal.getHash(reveal)

        // console.log(getHash)

        // const revealHas = await commitReveal.reveal(reveal)





    })



})