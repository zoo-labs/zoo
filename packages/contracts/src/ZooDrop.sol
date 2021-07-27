// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";


contract ZooDrop is Ownable {
    using Counters for Counters.Counter;

    uint256 public totalSupply;
    uint256 private _eggPrice;
    Counters.Counter private _currentSupply;

    string public name;

    struct Animal {
        string name;
        uint256 yield;
        Rarity rarity;
    }

    struct Rarity {
        string name;
        uint256 rarity;
    }

    struct Hybrid{
        string name;
        uint256 yield;
    }


    // mapping of animal name to available base animals introduced in this drop
    mapping (string => Animal) public animals;

    // mapping of animal name to available hybrid animals introduced in this drop
    mapping (string => Hybrid) public hybrids;

    // mapping of base animal pairs to possible hybrid animal pairs
    mapping (bytes32 => Hybrid) public possiblePairs;

    // mapping of animal key to animal tokenuri
    mapping (string => string) public tokenURI;

    // mapping of animal key to animal metadata
    mapping (string => string) public metaDataURI;


    constructor(string memory _name, uint256 _supply, uint256 eggPrice){
        name = _name;
        _eggPrice = eggPrice;
        totalSupply = _supply;
        _currentSupply._value = _supply;
    }

    // owner can set egg cost
    function setEggPrice(uint256 _cost) public onlyOwner {
        require(_cost > 0, "Overflow or non positive price");

        _eggPrice = _cost;
    }

    function getEggPrice() public view returns (uint256) {
        return _eggPrice;
    }


    function getCurrentSupply() public view returns (uint256) {
        return _currentSupply.current();
    }


    /**
        Add animal for possibility of hatching for the drop
     */
    function addAnimal(string memory _animal, uint256 _yield, string memory _rarityName, uint256 _rarity, string memory _tokenURI, string memory _metaDataURI) public onlyOwner {
        Animal memory newAnimal;
        Rarity memory newRarity = Rarity({name: _rarityName, rarity: _rarity});
        newAnimal.name = _animal;
        newAnimal.rarity = newRarity;
        newAnimal.yield = _yield;

        tokenURI[_animal] = _tokenURI;
        metaDataURI[_animal] = _metaDataURI;
        animals[_animal] = newAnimal;
    }

    /**
        Add animal for possibility of hatching for the drop
     */
    function addHybrid(string memory _animal, string memory _base, string memory _secondary, uint256 yield, string memory _tokenURI, string memory _metaDataURI) public onlyOwner {
        Hybrid memory newHybrid;
        newHybrid.name = _animal;
        newHybrid.yield = yield;

        tokenURI[_animal] = _tokenURI;
        metaDataURI[_animal] = _metaDataURI;

        hybrids[string(abi.encodePacked(_base, _secondary))] = newHybrid;
    }

    function setTokenURI(string memory _animal, string memory _tokenURI) public onlyOwner {
        tokenURI[_animal] = _tokenURI;
    }


    function setMetadataURI(string memory _animal, string memory _metadataURI) public onlyOwner {
        metaDataURI[_animal] = _metadataURI;
    }

    function buyEgg() public onlyOwner returns (string memory, string memory) {
        // require(_currentSupply > 0, "Current: decrement overflow");
        // _currentSupply = _currentSupply - 1;
        _currentSupply.decrement();
        return (tokenURI["basicEgg"], metaDataURI["basicEgg"]);
    }
}




