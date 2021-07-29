// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import { IMarket } from "./interfaces/IMarket.sol";

enum Type {
    BASE_EGG,
    BASE_ANIMAL,
    HYBRID_EGG,
    HYBRID_ANIMAL
}

struct Token {
    Rarity  rarity;
    Type    kind;
    uint256 id;
    uint256 dropID;
    string  name;
    string  tokenURI;
    string  metadataURI;
    uint256 timestamp;      // time created
    uint256 birthday;       // birth block
    uint256 eggID;          // optional
    string  parentA;        // optional
    string  parentB;        // optional
    uint256 parentIDA;      // optional
    uint256 parentIDB;      // optional
    uint256 breedCount;     // optional
    uint256 breedTimestamp; // optional
}

struct Rarity {
    string  name;
    uint256 probability;
    uint256 yield;
    uint256 boost;
    bool enabled;
}

struct Egg {
    Rarity  rarity;
    string  name;
    string  tokenURI;
    string  metadataURI;
    bool enabled;
    IMarket.BidShares bidShares;
}

struct Animal {
    Rarity rarity;
    string name;
    string tokenURI;
    string metadataURI;
    bool enabled;
    IMarket.BidShares bidShares;
}

struct Hybrid {
    Rarity rarity;
    string name;
    string parentA;
    string parentB;
    string tokenURI;
    string metadataURI;
    bool enabled;
    IMarket.BidShares bidShares;
}
