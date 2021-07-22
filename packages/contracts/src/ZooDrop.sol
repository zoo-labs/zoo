// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

struct Animal {
    string name;
    uint bonus;
    uint yield;
}

struct AnimalSet {
    string className;
    uint probability;
    Animal[] animals;
}

contract ZooDrop is Ownable {
    // Accept ZOO and return Egg NFT
    function buyEgg() public pure returns (uint256) {
        return 0;
    }

    // Actually mint egg NFT
    function mintEgg() public pure returns (bool) {
        // ZooMedia.mint();
        return true;
    }

    // Burn egg and randomly return an animal NFT
    function hatchEgg(uint256 tokenID) public pure returns (bool) {
        if (tokenID == 0) {
            return false;
        }
        return true;

        // ZooMedia.burnToken(tokenID)
        // blockhash % 1000
        // ZooMedia.mint()
    }

    // Take two animals and create a new hybrid egg which can hatch into a
    // hybrid animal
    function breedAnimal(uint256 animal1, uint256 animal2) public pure returns (bool) {
        if (animal1 == 0 && animal2 == 0) {
            return false;
        }
        return true;
    }

    // Should burn animal and return yield
    function freeAnimal() public pure returns (bool) {
        return true;
    }
}

