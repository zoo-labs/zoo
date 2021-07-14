// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

struct AnimalTime {
    uint256 eggTime;
    uint256 hatchTime;
    uint256 lastBreedTime;
}

struct Animal {
    bool inBreedMarket;
    uint256 matronId;
    uint256 sireId;
    uint256 breedPrice;
    uint256 price;
    uint256 generation;
    uint256 breedCount;
    uint256 dna;
    string name;
    MarketStatus inMarket;
    AnimalTime time;
    uint256 probability;
}

struct Auction {
    address highestBidder;
    uint256 endTime;
    uint256 highestBid;
    bool ended;
    mapping(address => uint256) pendingReturns;
}

enum MarketStatus {
    NONE,
    SALE,
    AUCTION
}
