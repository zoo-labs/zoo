const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("CoinToken", function () {
  let token;

  it('should deploy CoinToken contract', async function () {
    const CoinToken = await ethers.getContractFactory('CoinToken');
    token = await contract.deploy();
  });

  it('should have correct name and symbol and decimal', async () => {
    const CoinToken = await ethers.getContractFactory('CoinToken')
    const token = await upgrades.deployProxy(CoinToken, {})
    const name = await token.name()
    const symbol = await token.symbol()
    const decimals = await token.decimals()
    assert.equal(name.valueOf(), 'CoinToken')
    assert.equal(symbol.valueOf(), 'token')
    assert.equal(decimals.valueOf(), 18)
  })
});
