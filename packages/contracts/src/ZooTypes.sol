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

function getTypeByValue(Type t) pure returns (string memory) {
    // Error handling for input
    require(uint8(t) <= 4);

    // Loop through possible options
    if (Type.BASE_EGG == t) return "EGG";
    if (Type.BASE_ANIMAL == t) return "ANIMAL";
    if (Type.HYBRID_EGG == t) return "HYBRID_EGG";
    if (Type.HYBRID_ANIMAL == t) return "HYBRID_ANIMAL";

    return "";
}

struct Rarity {
    string  name;
    uint256 probability;
    uint256 yield;
    uint256 boost;
}

struct Egg {
    Type    kind;
    string  name;
    uint256 supply;
    uint256 price;
    uint256 timestamp;    // time created
    uint256 birthday;     // birth block
    Pair    parents;
    IMedia.MediaData data;
    IMarket.BidShares bidShares;
}

struct Pair {
    string  nameA;
    string  nameB;
    uint256 tokenA;
    uint256 tokenB;
}

struct Token {
    Rarity  rarity;
    Type    kind;
    uint256 id;
    uint256 dropID;
    string  name;
    uint256 timestamp;      // time created
    uint256 birthday;       // birth block
    uint256 eggID;          // optional
    uint256 breedCount;     // optional
    uint256 breedTimestamp; // optional
    string  customName;     // optional, paid feature
    Pair parents;
    IMedia.MediaData data;
    IMarket.BidShares bidShares;
}

struct Animal {
    Rarity rarity;
    string name;
    IMedia.MediaData data;
    IMarket.BidShares bidShares;
}

struct Hybrid {
    Rarity rarity;
    string name;
    Pair parents;
    IMedia.MediaData data;
    IMarket.BidShares bidShares;
}
