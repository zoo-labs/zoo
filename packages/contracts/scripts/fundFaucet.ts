#!/usr/bin/env node

import { ethers } from 'hardhat'
const { BigNumber } = ethers
const ZooToken = require('../deployments/testnet/ZOO.json')
const Drop = require('../deployments/testnet/Drop.json')
const Faucet = require('../deployments/testnet/Faucet.json')

async function main() {
  const signers = await ethers.getSigners()
  const token = await (await ethers.getContractAt('ZOO', ZooToken.address)).connect(signers[0])
  const faucet = await (await ethers.getContractAt('Faucet', Faucet.address)).connect(signers[0])
  // const drop = await (await ethers.getContractAt('Drop', ZooToken.address)).connect(signers[0])
  const fundAmount = BigNumber.from(100000000000)
  try {
    console.log('signer ->', signers[0].address)
    const tx1 = await token.mint(faucet.address, fundAmount.mul(10 * 18))
    const tx2 = await token.mint(signers[0].address, fundAmount.mul(10 * 18))
    console.log(tx2)
  } catch (e) {
    console.error('ERROR: ', e)
  }
}

main()
  .then(process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(-1)
  })
