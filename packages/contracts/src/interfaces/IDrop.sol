// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import { IZoo } from "./IZoo.sol";
import { IMedia } from "./IMedia.sol";
import { IMarket } from "./IMarket.sol";

interface IDrop {
    struct Egg {
        uint256 id;
        bool exist;
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
        IZoo.AdultHood stage;
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
    function eggPrice(uint256 id) external view returns (uint256);
    function totalSupply() external view returns (uint256);
    function eggSupply(uint256 id) external view returns (uint256);
    function newEgg(uint256 id) external returns (IZoo.Token memory);
    function newHybridEgg(IZoo.Parents memory) external returns (IZoo.Token memory);
    function getRandomAnimal(uint256, uint256) external view returns (IZoo.Token memory);
    function getRandomHybrid(uint256, IZoo.Parents memory) external view returns (IZoo.Token memory);
    function unsafeRandom() external view returns(uint256);
    function changeRandomLimit(uint256 limit) external;
    function getEgg(uint256 id) external view returns(Egg memory);
    function EggDropAddress() external returns(address);
    function getAdultHoodURIs(string memory name, IZoo.AdultHood stage) external returns (IMedia.MediaData memory);
    function silverEgg() external view returns(uint256);
}
