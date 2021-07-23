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

        let reveal = ethers.utils.id("" + Math.random())

        let commit = await commitReveal.getHash(reveal)

        console.log("Hash created from the reveal variable", commit)

        await commitReveal.commit(commit)

        const revealTx = await commitReveal.reveal(reveal)

        const revealReceipt = await revealTx.wait();

        console.log(revealReceipt.events[0].args.random)


    })



})