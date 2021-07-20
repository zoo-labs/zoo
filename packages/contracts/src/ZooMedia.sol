// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import {Media} from "./Media.sol";


contract ZooMedia is Media, Ownable {
    constructor(string memory symbol, string memory name, address marketAddress) Media(symbol, name, marketAddress) {
        marketContract = marketAddress;
    }

    function addDrop() public onlyOwner returns (bool) {

    }

    function buyEgg() public pure returns (uint256) {
        return 0;
    }

    function hatchEgg() public pure returns (bool) {
        return true;
    }
}

// // A given species of animal
// abstract contract Animal {
//     using Counters for Counters.Counter;

//     Counters.Counter private _animalIDs;

//     Data public data;
//     string public name;
//     string public description;

//     constructor(
//         string memory _name,
//         string memory _description,
//         Data memory _data
//     ) {
//         name = _name;
//         description = _description;
//         data = _data;
//     }
// }

// abstract contract Hybrid is Animal {
//     Animal public parent1;
//     Animal public parent2;

//     constructor(
//         string memory _name,
//         string memory _description,
//         Data memory _data,
//         Animal _parent1,
//         Animal _parent2
//     ) {
//         name = _name;
//         description = _description;
//         data = _data;
//         parent1 = _parent1;
//         parent2 = _parent2;
//     }
// }

// contract AnimalSet is Ownable {
//     using Counters for Counters.Counter;
//     Counters.Counter private _setIDs;

//     Data data;

//     Animal[] animals;
//     string name;
//     string description;
//     uint256 yield;
//     uint256 boost;
//     uint256 probability;

//     constructor(
//         string memory _name,
//         string memory _description,
//         Data memory _data,
//         uint256 _yield,
//         uint256 _boost,
//         uint256 _probability
//     ) {
//         name = _name;
//         description = _description;
//         data = _data;
//         yield = _yield;
//         boost = _boost;
//         probability = _probability;
//     }
// }

// // Each AnimalDrop introduces a new generation of breedable animals.
// contract AnimalDrop is Ownable {
//     // Should hash all images in a drop
//     string public zooHash = "xxxxxxx";
//     string name;
//     string description;
//     Data data;
//     AnimalSet[] sets;

//     constructor(
//         string memory _name,
//         string memory _description,
//         Data memory _data,
//         AnimalSet[] memory _sets
//     ) {
//         name = _name;
//         description = _description;
//         sets = _sets;
//         data = _data;
//     }
// }
