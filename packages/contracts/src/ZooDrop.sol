// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";


contract ZooDrop is Ownable {
    using Counters for Counters.Counter;

    string public name;
    uint256 public eggPrice;
    uint256 public totalSupply;
    Counters.Counter public _currentSupply;

    struct Animal {
        string name;
        uint256 yield;
        Rarity rarity;
    }

    struct Rarity {
        string name;
        uint256 rarity;
    }

    struct Hybrid {
        string name;
        uint256 yield;
    }

    // mapping of animal name to available base animals introduced in this drop
    mapping (string => Animal) public animals;

    // mapping of animal name to available hybrid animals introduced in this drop
    mapping (string => Hybrid) public hybrids;

    // mapping of animal key to animal tokenuri
    mapping (string => string) public tokenURI;

    // mapping of animal key to animal metadata
    mapping (string => string) public metadataURI;

    constructor(string memory _name, uint256 _supply, uint256 _eggPrice){
        name = _name;
        eggPrice = _eggPrice;
        totalSupply = _supply;
        _currentSupply._value = _supply;
    }

    function setEggPrice(uint256 _price) public onlyOwner {
        require(_price > 0, "Price must be over zero");
        eggPrice = _price;
    }

    /**
        Add animal for possibility of hatching for the drop
     */
    function addAnimal(string memory _animal, uint256 _yield, string memory _rarityName, uint256 _rarity, string memory _tokenURI, string memory _metadataURI) public onlyOwner {
        Animal memory newAnimal;
        Rarity memory newRarity = Rarity({name: _rarityName, rarity: _rarity});
        newAnimal.name = _animal;
        newAnimal.rarity = newRarity;
        newAnimal.yield = _yield;

        tokenURI[_animal] = _tokenURI;
        metadataURI[_animal] = _metadataURI;
        animals[_animal] = newAnimal;
    }

    /**
        Add animal for possibility of hatching for the drop
     */
    function addHybrid(string memory _animal, string memory _base, string memory _secondary, uint256 yield, string memory _tokenURI, string memory _metadataURI) public onlyOwner {
        Hybrid memory newHybrid;
        newHybrid.name = _animal;
        newHybrid.yield = yield;

        tokenURI[_animal] = _tokenURI;
        metadataURI[_animal] = _metadataURI;

        hybrids[string(abi.encodePacked(_base, _secondary))] = newHybrid;
        tokenURI[string(abi.encodePacked(_base, _secondary))] = _tokenURI;
        metadataURI[string(abi.encodePacked(_base, _secondary))] = _metadataURI;

        hybrids[_animal] = newHybrid;

    }

    function setTokenURI(string memory _animal, string memory _tokenURI) public onlyOwner {
        tokenURI[_animal] = _tokenURI;
    }

    function getMetadataURI(string memory _animal) public view returns (string memory) {
        return metadataURI[_animal];
    }

    function setMetadataURI(string memory _animal, string memory _metadataURI) public onlyOwner {
        metadataURI[_animal] = _metadataURI;
    }

    function currentSupply() public view returns (uint256) {
        return _currentSupply.current();
    }

    function buyEgg() public onlyOwner returns (string memory, string memory) {
        require(_currentSupply.current() > 0, "Current: decrement overflow");
        _currentSupply.decrement();
        return (tokenURI["basicEgg"], metadataURI["basicEgg"]);
    }

    function getHybridEgg() public view onlyOwner returns (string memory, string memory) {
        return (tokenURI["hybridEgg"], metadataURI["hybridEgg"]);
    }
}




