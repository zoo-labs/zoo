// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import { IMedia } from "./IMedia.sol";
import { IMarket } from "./IMarket.sol";

interface IZoo {


  // Declare an Event
  event AddDrop(address indexed dropAddress, string title, uint256 eggSupply);
  event BreedAnimal(address indexed from, uint256 parentA, uint256 parentB, uint256 indexed eggID);
  event Burn(address indexed from, uint256 indexed tokenID);
  event BuyEgg(address indexed from, uint256 indexed eggID);
  event Free(address indexed from, uint256 indexed tokenID, uint256 indexed yields);
  event Hatch(address indexed from, uint256 eggID, uint256 indexed tokenID);
  event Mint(address indexed from, uint256 indexed tokenID);
  event Swap(address indexed owner, uint256 indexed tokenID, uint256 indexed chainId);

    enum Type {
        BASE_EGG,
        BASE_ANIMAL,
        HYBRID_EGG,
        HYBRID_ANIMAL
    }

    enum AdultHood {
        BABY,
        TEEN,
        ADULT
    }

    struct Rarity {
        string  name;
        uint256 probability;
        uint256 yields;
        uint256 boost;
    }

    struct Breed {
        uint256 count;
        uint256 timestamp;
    }

    struct Parents {
        string  animalA;
        string  animalB;
        uint256 tokenA;
        uint256 tokenB;
    }

    struct Meta {
        uint256 eggID;       // originating egg
        uint256 dropID;      // originating drop
        bool burned;         // token has been burned
        bool swapped;        // token has been swapped
    }

    struct Birth {
        Parents parents;
        uint40 timestamp;    // time created
        uint40 birthday;     // birth block
    }

    struct Token {
        Rarity  rarity;
        Type  kind;
        string  name;
        uint256 id;           // unique ID
        string  customName;   // optional, paid feature
        Breed   breed;
        Meta meta;
        IMedia.MediaData data;
        Birth birthValues;
        IMarket.BidShares bidShares;
        uint256 dropEgg;
        AdultHood stage;
    }
}
