// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import { IMarket } from "./interfaces/IMarket.sol";
import { IMedia } from "./interfaces/IMedia.sol";

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
    uint256 id;
    string  name;
    uint256 probability;
    uint256 yield;
    uint256 boost;
}

struct Egg {
    string  name;
    string  tokenURI;
    string  metadataURI;
    uint256 timestamp;    // time created
    uint256 birthday;     // birth block
}

struct Animal {
    Rarity rarity;
    string name;
    string tokenURI;
    string metadataURI;
    IMarket.BidShares bidShares;
    IMedia.MediaData mediaData;
    bool enabled;
}

struct Hybrid {
    Rarity rarity;
    string name;
    string parentA;
    string parentB;
    string tokenURI;
    string metadataURI;
    IMarket.BidShares bidShares;
    IMedia.MediaData mediaData;
    bool enabled;
}
