// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";
import { Decimal } from "./Decimal.sol";
import { IMarket } from "./interfaces/IMarket.sol";
import { IMedia } from "./interfaces/IMedia.sol";
import { Animal, Egg, Hybrid, Rarity, Type, Token } from "./ZooTypes.sol";

import "./console.sol";

contract ZooDrop is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _eggSupply;
    Counters.Counter private _hybridSupply;

    string public name;
    uint256 public eggPrice;
    uint256 public eggSupply;

    // mapping of Rarity name to Rarity
    mapping (string => Rarity) public rarities;

    // mapping of Rarity name to []string of Animal names
    mapping (string => string[]) public rarityAnimals;

    // Rarity sorted by most rare -> least rare
    string[] public raritySorted;

    // mapping of Egg name to Egg
    mapping (string => Egg) public eggs;

    // mapping of Animal name to Animal
    mapping (string => Animal) public animals;

    // mapping of animal name to Hybrid
    mapping (string => Hybrid) public hybrids;

    // mapping of (parent + parent) to Hybrid
    mapping (string => Hybrid) public hybridParents;

    constructor(string memory _name, uint256 supply) {
        name = _name;
        eggPrice = price;
        eggSupply = supply;
        _eggSupply._value = supply;
    }

    // Return currently available supply of Eggs
    function currentSupply() public view returns (uint256) {
        return _eggSupply.current();
    }

    // Add or configure a given kind of egg
    function setEgg(string memory _name, uint256 supply, uint256 price, memory tokenURI, string memory metadataURI) returns (Egg memory) {
        Egg memory egg;
        egg.name = _name;
        egg.tokenURI = tokenURI;
        egg.metadataURI = metadataURI;
        egg.price = price;
        egg.supply = supply;
        eggs[name] = egg;
        return egg;
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
        raritySorted.push(rarity.name);

        return true;
    }

    // Add Animal to rarity set if it has not been seen before
    function addAnimal(string memory rarity, string memory _name) {
        string[] storage animals = rarityAnimals[rarity];

        // Check if animal has been added to this rarity before
        for (uint256 i = 0; i < animals.length; i++) {
            string memory known = animals[i];
            if (_name == known) {
                // Not a new Animal
                return;
            }
        }

        // New animal lets add to rarity list
        animals.push(_name);

        // Ensure stored
        rarityAnimals[rarity] = animals;
    }

    function getMediaData(string memory tokenURI, string memory metadataURI) returns (IMedia.MediaData memory) {
        return IMedia.MediaData({
            tokenURI: tokenURI,
            metadataURI: metadataURI
        });
    }

    function getBidShares() returns (IMarket.BidShares memory) {
        return IMedia.MediaData({
            creator: Decimal.D256(10),
            owner: Decimal.D256(90),
            prevOwner: Decimal.D256(0)
        });
    }

    // Add or configure a given animal
    function setAnimal(string memory _name, string memory rarity, string memory tokenURI, string memory metadataURI, bool enabled) public onlyOwner returns (bool) {
        Animal memory animal = Animal({
            name: _name,
            rarity: getRarity(rarity),
            data: getMediaData(tokenURI, metadataURI),
            bidShares: getBidShares(),
            enabled: enabled
        });

        // Save animal by name
        animals[_name] = animal;

        // Try to add animal to rarity
        addAnimal(animal.rarity.name, animal.name);

        return true;
    }

    // Add or configure a given hybrid
    function setHybrid(string memory _name, string memory rarity, string memory parentA, string memory parentB, string memory tokenURI, string memory metadataURI, bool enabled) public onlyOwner returns (bool) {
        Hybrid memory hybrid = Hybrid({
            name: _name,
            rarity: getRarity(rarity),
            parentA: parentA,
            parentB: parentB,
            data: getMediaData(tokenURI, metadataURI),
            bidShares: getBidShares(),
            enabled: enabled
        });

        hybrids[_name] = hybrid;
        hybridParents[parentsKey(parentA, parentB)] = hybrid;
        return true;
    }

    // Get Egg by name
    function getEgg(string memory name) public view returns (Egg memory) {
        return eggs[name];
    }

    // Get Rarity by name
    function getRarity(string memory name) public view returns (Rarity memory) {
        return rarities[name];
    }

    // Get Animal by name
    function getAnimal(string memory name) public view returns (Animal memory) {
        return animals[name];
    }

    // Get Hybrid by name
    function getHybrid(string memory name) public view returns (Hybrid memory) {
        return hybrids[name];
    }

    // Chooses animal based on random number generated from(0-999)
    function getRandomAnimal(uint256 random) public view returns (Token memory) {
        Animal memory animal;
        Token memory token;

        // Find rarest animal choices first
        for (uint256 i = 0; i < raritySorted.length; i++) {
            string memory name = raritySorted[i];
            Rarity memory rarity = rarities[name];

            // Choose random animal from choices
            if (rarity.probability > random) {
                string[] memory choices = rarityAnimals[name];
                name = choices[choices.length % random];
                animal = getAnimal(name);
            }
        }

        // Return Token
        token.kind = Type.BASE_ANIMAL;
        token.name = animal.name;
        token.data = animal.data;
        token.bidShares = animal.bidShares;
        token.timestamp = block.timestamp;
        token.birthday = block.number;
        return token;
    }

    function getRandomHybrid(uint256 random, string memory parentA, string memory parentB) public view returns (Token memory) {
        Token memory token;

        Hybrid[2] memory possible = [
            parentsToHybrid(parentA, parentB),
            parentsToHybrid(parentB, parentA)
        ];

        // pick array index 0 or 1 depending on the rarity
        Hybrid memory hybrid = possible[random % 2];

        // Return Token
        token.kind = Type.HYBRID_ANIMAL;
        token.name = hybrid.name;
        token.data = hybrid.data;
        token.bidShares = hybrid.bidShares;
        token.timestamp = block.timestamp;
        token.birthday = block.number;
        token.parentA = parentA;
        token.parentB = parentB;
        return token;
    }


    function parentsKey(string memory parentA, string memory parentB) public pure returns (string memory) {
        return string(abi.encodePacked(parentA, parentB));
    }

    // Get Hybrid from Parents
    function parentsToHybrid(string memory parentA, string memory parentB) public view returns (Hybrid memory) {
        return hybridParents[parentsKey(parentA, parentB)];
    }

    // Return true if name matches a real animal or hybrid
    function animalExists(string memory _name) public view returns (bool) {
        Animal memory animal = animals[_name];
        Hybrid memory hybrid = hybrids[_name];

        // Is either an animal or hybrid
        if (animal.enabled || hybrid.enabled) {
            return true;
        }

        return false;
    }

    // Return a new Egg Token
    function newEgg() public onlyOwner returns (Token memory) {
        require(currentSupply() > 0, "Out of eggs");
        _eggSupply.decrement();

        Egg memory egg = getEgg("baseEgg");

        // Convert egg into a token
        Token memory token;
        token.kind = egg.kind;
        token.name = egg.name;
        token.data = egg.data;
        token.bidShares = egg.bidShares;
        token.birthday = block.number;
        token.timestamp = block.timestamp;
        return token;
    }

    // Return a new Hybrid Egg Token
    function newHybridEgg(uint256 parentA, uint256 parentB) public onlyOwner returns (Token memory) {
        _hybridSupply.increment();

        Egg memory egg = getEgg("hybridEgg");

        // Convert egg into a token
        Token memory token;
        token.kind = egg.kind;
        token.name = egg.name;
        token.data = egg.data;
        token.bidShares = egg.bidShares;
        token.timestamp = block.timestamp;
        token.birthday = block.number;
        token.parentA = parentA;
        token.parentB = parentB;
        return token;
    }
}
