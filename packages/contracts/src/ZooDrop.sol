// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";
import { Animal, Egg, Hybrid, Rarity, Type } from "./ZooTypes.sol";

import "./console.sol";


contract ZooDrop is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _eggSupply;
    Counters.Counter private _hybridSupply;

    string public name;
    uint256 public eggPrice;
    uint256 public eggSupply;
    []string public raritySorted;

    // mapping of Rarity name to Rarity
    mapping (string => Rarity) public rarities;

    // mapping of Animal name to Animal
    mapping (string => Animal) public animals;

    // mapping of animal name to Hybrid
    mapping (string => Hybrid) public hybrids;

    // mapping of (parent + parent) to Hybrid
    mapping (string => Hybrid) public hybridParents;

    constructor(string memory _name, uint256 supply, uint256 price){
        name = _name;
        eggPrice = price;
        eggSupply = supply;
        _eggSupply._value = supply;
    }

    // Return currently available supply of Eggs
    function currentSupply() public view returns (uint256) {
        return _eggSupply.current();
    }

    // Control Egg / Name pricing
    function setEggPrice(uint256 price) public onlyOwner returns (bool) {
        require(price > 0, "Price must be over zero");
        eggPrice = price;
        return true;
    }

    // Add or configure a given rarity
    function setRarity(string memory _name, uint256 probability, uint256 yield, uint256 boost, bool enabled) public onlyOwner returns (bool) {
        require(probability > 0, "Rarity must be over zero");

        Rarity memory rarity = Rarity({
            name: _name,
            probability: probability,
            yield: yield,
            boost: boost,
            enabled: enabled
        });

        // Save rarity
        rarities[rarity.name] = rarity;

        // Assume we add in descending rarity
        raritySorted.push(rarity.name);

        return true;
    }

    function addAnimal(string memory rarity, string memory _name) returns ([]Animal) {
        []Animal memory animals = animalsByRarity[rarity];

        // Check if animal has been added to this rarity before
        for (i = 0; i < animals.length; i++) {
            string memory n = animals[i];
            if (n == _name) {
                return animals;
            }
        }

        // New animal lets add to rarity list
        animals.push(_name);
        return animals;
    }

    // Add or configure a given animal
    function setAnimal(string memory _name, string memory rarity, string memory tokenURI, string memory metadataURI, bool enabled) public onlyOwner returns (bool) {
        Animal memory animal = Animal({
            rarity: getRarity(rarity),
            name: _name,
            tokenURI: tokenURI,
            metadataURI: metadataURI,
            enabled: enabled
        });

        // Save animal by name
        animals[_name] = animal;

        // Try to add animal to rarity
        addAnimal(animal.rarity.name, animal.name);

        return true;
    }

    // Add or configure a given animal pairing and hybrid animal
    function setHybrid(string memory _name, string memory rarity, string memory parentA, string memory parentB, string memory tokenURI, string memory metadataURI, bool enabled) public onlyOwner {
        Hybrid memory hybrid = Hybrid({
            rarity: getRarity(rarity),
            name: _name,
            parentA: parentA,
            parentB: parentB,
            tokenURI: tokenURI,
            metadataURI: metadataURI,
            enabled: enabled
        });
        hybrids[_name] = hybrid;
        hybridParents[parentsKey(parentA, parentB)] = hybrid;
    }

    function animalExists(string memory _name) public view returns (bool) {
        Animal memory animal = animals[_name];
        Hybrid memory hybrid = hybrids[_name];

        // Is either an animal or hybrid
        if (animal.enabled || hybrid.enabled) {
            return true;
        }

        return false;
    }
    // Get next timestamp token can be bred
    function breedNext(uint256 tokenID) public view returns (uint256) {
        Token memory token = tokens[tokenID];
        return token.breedTimestamp + (token.breedCount * 1 days);
    }

    // Chooses animal based on random number generated from(0-999)
    function getRandomAnimal(uint256 random) public view returns (Animal) {
        Animal memory animal;

        // Find rarest animal choices
        for (uint256 i = 0; i < raritySorted.length; i++) {
            string memory name = raritySorted[i];
            Rarity memory rarity = rarities[name];

            // Choose random animal from choices
            if (random > rarity.probability) {
                []string choices = rarity.animals;
                animal = choices[random % rarity.animals.length];
            }
        }

        return animal;
    }

    function getRandomHybrid(uint256 random, string memory parentA, string memory parentB) public view returns (Hybrid) {
        Hybrid[2] memory possible = [
            drop.getHybridByParents(parentA, parentB),
            drop.getHybridByParents(parentB, parentA)
        ];

        // pick array index 0 or 1 depending on the rarity
        return possible[randomNumber % 2];
    }

    function getRarity(string memory name) public view returns (Rarity memory) {
        return rarities[name];
    }

    function getAnimal(string memory name) public view returns (Animal memory) {
        return animals[name];
    }

    function getHybrid(string memory name) public view returns (Hybrid memory) {
        return hybrids[name];
    }

    function parentsKey(string memory parentA, string memory parentB) public pure returns (string memory) {
        return string(abi.encodePacked(parentA, parentB));
    }

    function getHybridByParents(string memory parentA, string memory parentB) public view returns (Hybrid memory) {
        return hybridParents[parentsKey(parentA, parentB)];
    }

    function newEgg() public onlyOwner returns (Egg) {
        require(currentSupply() > 0, "Out of eggs");
        _eggSupply.decrement();
        Egg memory egg;
        egg.name = "Egg";
        egg.tokenURI = tokenURI;
        egg.metadataURI = metadataURI;
        egg.timestamp = block.timestamp;
        egg.birthday = block.birthday;
        return egg;
    }

    function newHybridEgg(uint256 parentA, uint256 parentB) public onlyOwner returns (HybridEgg) {
        _hybridSupply.increment();
        HybridEgg memory egg;
        egg.name = "Hybrid Egg";
        egg.tokenURI = tokenURI;
        egg.metadataURI = metadataURI;
        egg.timestamp = block.timestamp;
        egg.birthday = block.number;
        egg.parentA = parentA;
        egg.parentB = parentB;
        return egg;
    }

}
