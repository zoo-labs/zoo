// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

struct AnimalTime {
  uint eggTime;
  uint hatchTime;
  uint lastBreedTime;
}

struct Animal {
  bool inBreedMarket;

  uint matronId;
  uint sireId;

  uint breedPrice;
  uint price;

  uint generation;
  uint breedCount;
  uint dna;

  MarketStatus inMarket;
  AnimalTime time;
  Specie specie;
}

struct Auction {
  address highestBidder;
  uint endTime;
  uint highestBid;
  bool ended;
  mapping(address => uint) pendingReturns;
}

enum MarketStatus {
  NONE,
  SALE,
  AUCTION
}

enum Specie {
  MUTANT,
  GORILLA,
  PUG,
  SHARK,
  LION,
  ELK,
  BLOBFISH,
  BUTTERFLY,
  NAKED_MOLE_RAT,
  ORCA,
  TURTLE,
  PENGUIN,
  KITTEN,
  ELEPHANT,
  DUCKLING,
  PANDA,
  BEAR
}
