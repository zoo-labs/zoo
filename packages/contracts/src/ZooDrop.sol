// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";
import { Animal, Egg, Hybrid, Rarity, Type } from "./ZooTypes.sol";

import "./console.sol";


contract ZooDrop is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _eggSupply;

    string public name;
    uint256 public eggPrice;
    uint256 public eggSupply;

    // mapping of rarities to animal rarity
    mapping (string => Rarity) public rarities;

    // mapping of animal name to available base animals introduced in this drop
    mapping (string => Animal) public animals;

    // mapping of animal name to available hybrid animals introduced in this drop
    mapping (string => Hybrid) public hybrids;

    // mapping of parent + parent to hybrid animal
    mapping (string => Hybrid) public hybridParents;

    // mapping of animal key to animal tokenuri
    mapping (string => string) public tokenURIs;

    // mapping of animal key to animal metadata
    mapping (string => string) public metadataURIs;

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
    function setEggPrice(uint256 price) public onlyOwner {
        require(price > 0, "Price must be over zero");
        eggPrice = price;
    }

    // Add or configure a given rarity
    function setRarity(string memory _name, uint256 probability, uint256 yield, uint256 boost, bool enabled) public onlyOwner {
        require(probability > 0, "Rarity must be over zero");
        Rarity memory rarity = Rarity({
            name: _name,
            probability: probability,
            yield: yield,
            boost: boost,
            enabled: enabled
        });
        rarities[_name] = rarity;
    }

    // Add or configure a given animal
    function setAnimal(string memory _name, string memory rarity, string memory tokenURI, string memory metadataURI, bool enabled) public onlyOwner {
        Animal memory animal = Animal({
            rarity: getRarity(rarity),
            name: _name,
            tokenURI: tokenURI,
            metadataURI: metadataURI,
            enabled: enabled
        });
        tokenURIs[_name] = tokenURI;
        metadataURIs[_name] = metadataURI;
        animals[_name] = animal;
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
        tokenURIs[_name] = tokenURI;
        metadataURIs[_name] = metadataURI;
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

    function setTokenURI(string memory _name, string memory tokenURI) public onlyOwner {
        tokenURIs[_name] = tokenURI;
    }

    function setMetadataURI(string memory _name, string memory metadataURI) public onlyOwner {
        metadataURIs[_name] = metadataURI;
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

    function getHybridEgg() public view onlyOwner returns (string memory, string memory) {
        return (tokenURIs["hybridEgg"], metadataURIs["hybridEgg"]);
    }

    function buyEgg() public onlyOwner returns (string memory, string memory) {
        require(currentSupply() > 0, "Out of eggs");
        _eggSupply.decrement();
        return (tokenURIs["baseEgg"], metadataURIs["baseEgg"]);
    }
}
