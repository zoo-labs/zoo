// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./CryptoAnimalBase.sol";
import "./Animal.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct Generation {
    string name;
    AnimalClass[] distribution;
    mapping(string => uint256) hybridDistribution;
    uint256 maxCap;
}

contract Animal is Ownable {
    string name;

    constructor(
        bool inBreedMarket,
        uint256 matronId,
        uint256 sireId,
        uint256 breedPrice,
        uint256 price,
        uint256 generation,
        uint256 breedCount,
        uint256 dna,
        string name,
        MarketStatus inMarket,
        AnimalTime time,
        uint256 probability
    ) {
        this.inBreedMarket = inBreedMarket;
        this.matronId = matronId;
        this.sireId = sireId;
    }
}

contract AnimalClass {
    AnimalSpecie[] species;
    string name;
    uint256 yield;
    uint256 boost;
    uint256 probability;

    mapping(string => address) nameToAnimalMapping;

    constructor(
        AnimalSpecie[] species,
        address[] speciesAddresses,
        string className,
        uint256 yield,
        uint256 boost,
        uint256 probability
    ) {
        require(
            animals.length == speciesAddresses.length,
            "The animals and the address must be the same length to create the distribution mapping"
        );
        this.species = animals;
        this.name = name;
        this.yield = yield;
        this.boost = boost;
        this.probability = probability;
    }

    function addSpecies(AnimalSpecie[] species) {
        for (uint256 i = 0; i < species.length; i++) {
            this.species.push(species[i]);
        }
    }

    function lookupSpecie(string name) {
        return nameToAnimalMapping[name];
    }
}

contract AnimalSpecie is Ownable {
    string name;
    string assetURI;
    string assetGatewayURI;
    string metadataURI;
    string metadataGatewayURI;
    string description;
    uint256 totalInExistence;

    constructor(
        string name,
        string assetURI,
        string assetGatewayURI,
        string metadataURI,
        string metadataGatewayURI,
        string description
    ) {
        this.name = name;
        this.assetURI = assetURI;
        this.assetGatewayURI = assetGatewayURI;
        this.metadataURI = metadataURI;
        this.metadataGatewayURI = metadataGatewayURI;
        this.description = description;
        this.totalInExistence = 0;
    }

    function increment() external onlyOwner() {
        this.totalInExistence = this.totalInExistence + 1;
    }

    function setAssetURI(string assetURI) external onlyOwner() {
        this.assetURI = assetURI;
    }

    function setAssetGatewayURI(string assetGatewayURI) external onlyOwner() {
        this.assetGatewayURI = assetGatewayURI;
    }

    function setMetadataURI(string metadataURI) external onlyOwner() {
        this.metadataURI = metadataURI;
    }

    function setMetadataGatewayURI(string metadataGatewayURI)
        external
        onlyOwner()
    {
        this.metadataGatewayURI = metadataGatewayURI;
    }
}

contract HybridSpecie is AnimalSpecie {
    uint256 parentOneId;
    uint256 parentTwoId;
    uint256 breedPrice;

    constructor(
        string name,
        string assetURI,
        string assetGatewayURI,
        string metadataURI,
        string metadataGatewayURI,
        string description,
        uint256 parentOneId,
        uint256 parentTwoId,
        uint256 breedPrice
    ) {
        this.name = name;
        this.assetURI = assetURI;
        this.assetGatewayURI = assetGatewayURI;
        this.metadataURI = metadataURI;
        this.metadataGatewayURI = metadataGatewayURI;
        this.description = description;
        this.totalInExistence = 0;
        this.parentOneId = parentOneId;
        this.parentTwoId = parentTwoId;
        this.breedPrice = breedPrice;
    }
}

contract AnimalLab is Ownable {
    uint256 studFee;
    mapping(string => string) breedResults;

    constructor(uint256 studFee) {
        this.studFee = studFee;
    }

    function addNewBreeds(mapping(string => string) breeds) {
        for (uint256 i = 0; i < breeds.length; i++) {}
    }
    // function createHybrid(Animal parentOne, Animal parentTwo)
    //     external
    //     onlyOwner()
    // {

    // }
}

contract AnimalGeneration is Ownable {
    Generation[] generations;

    constructor(
        AnimalClass[] distribution,
        string[] hybridNames,
        uint256[] yields,
        uint256 maxCap
    ) {
        require(
            hybridNames.length == yields.length,
            "The hybrids and the yields must be the same length to create the distribution mapping"
        );

        Generation memory generation;
        generation.distribution = distribution;

        mapping(string => uint256) hybrids;
        for (uint256 i = 0; i < hybridNames.length; i++) {
            hybrids[hybridNames[i]] = yields[i];
        }
        generation.hybridDistribution = hybrids;
        generation.maxCap = maxCap;

        this.generation = generation;
    }

    /**
      update distribution for any animal
    */
}
