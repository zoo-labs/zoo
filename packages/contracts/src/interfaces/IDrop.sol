// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import { IZoo } from "./IZoo.sol";
import { IMedia } from "./IMedia.sol";
import { IMarket } from "./IMarket.sol";

interface IDrop {
    struct Egg {
        IZoo.Type kind;
        string  name;
        uint256 supply;
        uint256 price;
        uint256 timestamp;    // time created
        uint256 birthday;     // birth block
        uint256 minted;       // amount minted
        IMedia.MediaData data;
        IMarket.BidShares bidShares;
    }

    struct Animal {
        IZoo.Type kind;
        IZoo.Rarity rarity;
        string name;
        IMedia.MediaData data;
        IMarket.BidShares bidShares;
    }

    struct Hybrid {
        IZoo.Type kind;
        IZoo.Rarity rarity;
        string name;
        uint256 yields;
        string parentA;
        string parentB;
        IMedia.MediaData data;
        IMarket.BidShares bidShares;
    }

    function title() external view returns (string memory);
    function eggPrice() external view returns (uint256);
    function eggSupply() external view returns (uint256);
    function newEgg() external returns (IZoo.Token memory);
    function newHybridEgg(IZoo.Parents memory) external returns (IZoo.Token memory);
    function getRandomAnimal(uint256) external view returns (IZoo.Token memory);
    function getRandomHybrid(uint256, IZoo.Parents memory) external view returns (IZoo.Token memory);
}
