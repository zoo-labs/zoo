const { BigNumber } = require("ethers")
const { ethers } = require("hardhat")

module.exports.MarketStatus = {
  NONE: 0,
  SALE: 1,
  AUCTION: 2
}

module.exports.Specie = {
  MUTANT: 0,
  GORILLA: 1,
  PUG: 2,
  SHARK: 3,
  LION: 4,
  ELK: 5,
  BLOBFISH: 6,
  BUTTERFLY: 7,
  NAKED_MOLE_RAT: 8,
  ORCA: 9,
  TURTLE: 10,
  PENGUIN: 11,
  KITTEN: 12,
  ELEPHANT: 13,
  DUCKLING: 14,
  PANDA: 15,
  BEAR: 16
}

module.exports.makeAnimal = ({
  inBreedMarket,
  matronId,
  sireId,
  breedPrice,
  price,
  generation,
  breedCount,
  dna,
  inMarket,
  eggTime,
  hatchTime,
  lastBreedTime,
  specie
}) => ([
  inBreedMarket,
  BigNumber.from(matronId),
  BigNumber.from(sireId),
  BigNumber.from(breedPrice),
  BigNumber.from(price),
  BigNumber.from(generation),
  BigNumber.from(breedCount),
  BigNumber.from(dna),
  inMarket,
  [
    BigNumber.from(eggTime),
    BigNumber.from(hatchTime),
    BigNumber.from(lastBreedTime),
  ],
  specie
])

module.exports.time = {
  increase: async duration => {
    await ethers.provider.send("evm_increaseTime", [duration]);
    await ethers.provider.send("evm_mine");
  }
}
