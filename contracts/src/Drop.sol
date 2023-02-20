// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Decimal } from "./Decimal.sol";
import { IMarket } from "./interfaces/IMarket.sol";
import { IMedia } from "./interfaces/IMedia.sol";
import { IZoo } from "./interfaces/IZoo.sol";
import { IDrop } from "./interfaces/IDrop.sol";
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";
import { IKeeper } from "./interfaces/IKeeper.sol";

contract Drop is IDrop, Ownable {
    using SafeMath for uint256;

    using Counters for Counters.Counter;

    Counters.Counter public eggId;

 struct  DropData {
    string image;
    string description;
  }

    // Title of drop
    string override public title;

    mapping(string => DropData) public dropInformation;

    string public rareAnimal;

    uint256 randomLimit;

    uint256 public override silverEgg;

    // Address of ZooKeeper contract
    address public keeperAddress;

    address public override EggDropAddress;

    // mapping of Rarity name to Rarity
    mapping (string => IZoo.Rarity) public rarities;

    mapping (string => string[]) public rarityAnimals;

    // Rarity sorted by most rare -> least rare
    string[] public raritySorted;

    // mapping of Egg name to Egg
    mapping (uint256 => Egg) public eggs;

    // mapping of Animal name to Animal
    mapping (string => Animal) public animals;

    // mapping of animal name to Hybrid
    mapping (string => Hybrid) public hybrids;

    // mapping of (parent + parent) to Hybrid
    mapping (string => Hybrid) public hybridParents;

    mapping (string => IZoo.URIs) public adultHoodURIs;

    mapping (string => IZoo.StageYields) public animalStageYields;


    // Ensure only ZK can call method
    modifier onlyZoo() {
        require(
            keeperAddress == msg.sender, "Only ZooKeeper can call this method"
        );
        _;
    }

    constructor(string memory _title, string memory description, string memory image) {
        title = _title;
        randomLimit = 3;
        rareAnimal = "Javan Rhino";
        dropInformation[_title] = DropData({description: description, image: image});
    }

    function modifyDrop (string memory description, string memory image) public onlyOwner {
        dropInformation[title] = DropData({description: description, image: image});
  }

    function getAdultHoodURIs(string memory name, IZoo.AdultHood stage) public view override returns(IMedia.MediaData memory){
        IZoo.URIs storage data = adultHoodURIs[name];
        if(stage == IZoo.AdultHood.BABY){
            return data.dataBaby;
        }
        else if(stage == IZoo.AdultHood.TEEN){
            return data.dataTeen;
        }
        else{
            return data.dataAdult;
        }
    }


    function totalSupply() public override view returns (uint256) {
        return eggId.current();
    }

    function getAllEggs() public view returns(Egg[] memory) {
        Egg[] memory availableEggs = new Egg[](eggId.current());
        
        for (uint256 i = 0; i < eggId.current(); i++) {
            if(eggs[i + 1].exist == true){
                availableEggs[i] = eggs[i + 1];
            }
        }

        return availableEggs;
    }

    // Set currentSupply base and hybrid egg
    function configureEggs(uint256 _silverEgg) public eggExists(_silverEgg) onlyOwner {
        silverEgg = _silverEgg;
    }

    function changeRareAnimal(string memory name) public onlyOwner {
        rareAnimal = name;
    }

    // Configure current ZooKeeper
    function configureKeeper(address zooKeeper) public onlyOwner {
        keeperAddress = zooKeeper;
    }

    function configureEggDropper(address eggdropper) public onlyOwner {
        EggDropAddress = eggdropper;
    }

    function changeRandomLimit(uint256 limit) override public {
        require(msg.sender == owner() || msg.sender == EggDropAddress || msg.sender == keeperAddress, "not allowed");
        randomLimit = limit;
    }

    function eggStatus(uint256 egg, bool status) public onlyOwner {
        eggs[egg].exist = status;
    }


    // Add or configure a given rarity
    function setRarity(string memory name, uint256 probability, uint256 yields, uint256 boost) public onlyOwner {
        require(probability > 0, "Rarity must be over zero");

        IZoo.Rarity memory rarity = IZoo.Rarity({
            name: name,
            probability: probability,
            yields: yields,
            boost: boost
        });

        // Save rarity
        rarities[rarity.name] = rarity;
        raritySorted.push(rarity.name);
    }

    // Add or configure a given kind of egg
    function setEgg(string memory name, uint256 price, uint256 supply, string memory tokenURI, string memory metadataURI) public onlyOwner {
        eggId.increment();
        uint256 id = eggId.current();
        Egg memory egg;
        egg.name = name;
        egg.id = id;
        egg.data = getMediaData(tokenURI, metadataURI);
        egg.bidShares = getBidShares();
        egg.price = price;
        egg.supply = supply;
        egg.exist = true;
        eggs[id] = egg;
    }

    function setEggPrice(uint256 id, uint256 price) public eggExists(id) onlyOwner {
       eggs[id].price = price;
    }

    function setEggURIs(uint256 id, string memory tokenURI, string memory metadataURI) public eggExists(id) onlyOwner{
       eggs[id].data = eggs[id].data = getMediaData(tokenURI, metadataURI);
    }

    function setAnimalURIs(string memory name, string memory adultTokenURI, string memory adultMetadataURI, string memory teenTokenURI, string memory teenMetadataURI, string memory babyTokenURI, string memory babyMetadataURI) public onlyOwner {
        adultHoodURIs[name] = IZoo.URIs({dataBaby: getMediaData(babyTokenURI, babyMetadataURI), dataTeen: getMediaData(teenTokenURI, teenMetadataURI), dataAdult: getMediaData(adultTokenURI, adultMetadataURI)});
    }

    function setStageYields(string memory name, uint256 yieldBaby, uint256 boostBaby, uint256 yieldTeen, uint256 boostTeen, uint256 yieldAdult, uint256 boostAdult) public onlyOwner {
        animalStageYields[name] = IZoo.StageYields({baby: IZoo.YieldsBoost({
            yields: yieldBaby,
            boost: boostBaby
        }), teen: IZoo.YieldsBoost({
            yields: yieldTeen,
            boost: boostTeen
        }), adult: IZoo.YieldsBoost({
            yields: yieldAdult,
            boost: boostAdult
        })});
    }

    // Add or configure a given animal
    function setAnimal(string memory name, string memory rarity, string memory adultTokenURI, string memory adultMetadataURI, string memory babyTokenURI, string memory babyMetadataURI, string memory teenTokenURI, string memory teenMetadataURI) public onlyOwner {
        Animal memory animal = Animal({
            kind: IZoo.Type.BASE_ANIMAL,
            stage: IZoo.AdultHood.BABY,
            rarity: getRarity(rarity),
            name: name,
            data: getMediaData(babyTokenURI, babyMetadataURI),
            bidShares: getBidShares()
        });

        // Save animal by name
        animals[name] = animal;

        setAnimalURIs(name, adultTokenURI, adultMetadataURI, teenTokenURI, teenMetadataURI, babyTokenURI, babyMetadataURI);
        // Try to add animal to rarity
        addAnimalToRarity(animal.rarity.name, animal.name);
    }

    // Add or configure a given hybrid
    function setHybrid(string memory name, string memory rarity, uint256 yields, string memory parentA, string memory parentB, string memory tokenURI, string memory metadataURI) public onlyOwner{
        Hybrid memory hybrid = Hybrid({
            kind: IZoo.Type.HYBRID_ANIMAL,
            name: name,
            rarity: getRarity(rarity),
            yields: yields,
            parentA: parentA,
            parentB: parentB,
            data: getMediaData(tokenURI, metadataURI),
            bidShares: getBidShares()
        });

        hybrids[name] = hybrid;
        hybridParents[parentsKey(parentA, parentB)] = hybrid;
    }



    // Add Animal to rarity set if it has not been seen before
    function addAnimalToRarity(string memory rarity, string memory name) private {
        string[] storage _animals = rarityAnimals[rarity];

        // Check if animal has been added to this rarity before
        for (uint256 i = 0; i < _animals.length; i++) {
            string storage known = _animals[i];
            if (keccak256(bytes(name)) == keccak256(bytes(known))) {
                // Not a new Animal
                return;
            }
        }

        // New animal lets add to rarity list
        _animals.push(name);

        // Ensure stored
        rarityAnimals[rarity] = _animals;
    }

    modifier eggExists (uint256 id){
        require(eggs[id].exist, "Egg does't exist");
        _;
    }

    // Return price for current EggDrop
    function eggPrice(uint256 id) public eggExists(id) override view returns (uint256) {
        return getEgg(id).price;
    }

    function eggSupply(uint256 id) public eggExists(id) override view returns (uint256) {
        return getEgg(id).supply;
    }

    // Return a new Egg Token
    function newEgg(uint256 id) override public eggExists(id) returns (IZoo.Token memory) {
        require(keeperAddress == msg.sender || EggDropAddress == msg.sender, "only authorized callers");
        Egg memory egg = getEgg(id);
        require(eggSupply(id) == 0 || egg.minted < eggSupply(id), "Out of eggs");

        egg.minted++;
        eggs[egg.id] = egg;

        // Convert egg into a token
        return IZoo.Token({
            rarity: getRarity('Endangered'),
            kind: IZoo.Type.BASE_EGG,
            dropEgg: id,
            name: egg.name,
            birthValues: IZoo.Birth({birthday: uint40(block.number), timestamp: uint40(block.timestamp), parents: IZoo.Parents("", "", 0, 0)}),
            data: egg.data,
            bidShares: egg.bidShares,
            customName: "",
            id: 0,
            breed: IZoo.Breed(0, 0),
            meta: IZoo.Meta(0, 0, false, false),
            stage: IZoo.AdultHood.BABY
        });
    }

    // Return a new Hybrid Egg Token
    function newHybridEgg(IZoo.Parents memory parents) override external view onlyZoo returns (IZoo.Token memory) {
        uint256 randomEgg = unsafeRandom();

        Egg memory egg = getEgg(randomEgg);
        require(eggSupply(randomEgg) == 0 || egg.minted < eggSupply(randomEgg), "Out of eggs");

        // Convert egg into a token
        return IZoo.Token({
            rarity: getRarity(animals[parents.animalA].rarity.name),
            kind: IZoo.Type.HYBRID_EGG,
            name: egg.name,
            birthValues: IZoo.Birth({birthday: uint40(block.number), timestamp: uint40(block.timestamp), parents: parents}),
            data: egg.data,
            bidShares: egg.bidShares,
            dropEgg: egg.id,
            id: 0,
            customName: "",
            breed: IZoo.Breed(0, 0),
            meta: IZoo.Meta(0, 0, false, false),
            stage: IZoo.AdultHood.BABY
        });
    }

    // Get Egg by id
    function getEgg(uint256 id) public eggExists(id) view override returns (Egg memory) {
        return eggs[id];
    }

    // Get Rarity by name
    function getRarity(string memory name) private view returns (IZoo.Rarity memory) {
        return rarities[name];
    }

    // Get Animal by name
    function getAnimal(string memory name) private view returns (Animal memory) {
        return animals[name];
    }

    // Get Hybrid by name
    function getHybrid(string memory name) private view returns (Hybrid memory) {
        return hybrids[name];
    }

    function getBredAnimal(string memory animal, IZoo.Parents memory parents) override public view returns(IZoo.Token memory token) {
        token.kind = IZoo.Type.HYBRID_ANIMAL;
        token.name = animals[animal].name;
        token.data = adultHoodURIs[animals[animal].name].dataBaby;
        token.rarity = animals[animal].rarity;
        token.bidShares = animals[animal].bidShares;
        token.birthValues.timestamp = uint40(block.timestamp);
        token.birthValues.birthday = uint40(block.number);
        token.birthValues.parents = parents;

        return token;
    }

    // Chooses animal based on random number generated from(0-999)
    function getRandomAnimal(uint256 random, uint256 dropEgg) override external view returns (IZoo.Token memory token) {
        Animal memory animal;

        if(dropEgg == silverEgg){
            animal = getAnimal(rareAnimal);
        }
        else{

            // Find rarest animal choices first
            for (uint256 i = 0; i < raritySorted.length; i++) {
                string memory name = raritySorted[i];
                IZoo.Rarity memory rarity = rarities[name];

                // Highest probability first, failing that use lowest rarity (common) animal
                if (rarity.probability > random || i == raritySorted.length - 1) {
                    string[] memory choices = rarityAnimals[name];
                    animal = getAnimal(choices[random % choices.length]);
                    break;
                }
            }

        }

        // Return Token
        token.kind = IZoo.Type.BASE_ANIMAL;
        token.name = animal.name;
        token.data = adultHoodURIs[animal.name].dataBaby;
        token.rarity = animal.rarity;
        token.bidShares = animal.bidShares;
        token.birthValues.timestamp = uint40(block.timestamp);
        token.birthValues.birthday = uint40(block.number);

        return token;
    }

    // Helper to construct IMarket.BidShares struct
    function getBidShares() private pure returns (IMarket.BidShares memory) {
        return IMarket.BidShares({
            creator: Decimal.D256(uint256(10).mul(Decimal.BASE)),
            owner: Decimal.D256(uint256(80).mul(Decimal.BASE)),
            prevOwner: Decimal.D256(uint256(10).mul(Decimal.BASE))
        });
    }

    // Helper to construct IMedia.MediaData struct
    function getMediaData(string memory tokenURI, string memory metadataURI) private pure returns (IMedia.MediaData memory) {
        return IMedia.MediaData({
            tokenURI: tokenURI,
            metadataURI: metadataURI,
            contentHash: bytes32(0),
            metadataHash: bytes32(0)
        });
    }

    // Get key for two parents
    function parentsKey(string memory animalA, string memory animalB) private pure returns (string memory) {
        return string(abi.encodePacked(animalA, animalB));
    }

    // Get Hybrid from Parents
    function parentsToHybrid(string memory nameA, string memory nameB) private view returns (Hybrid memory) {
        return hybridParents[parentsKey(nameA, nameB)];
    }

    // // Return the higher of two rarities
    function higher(IZoo.Rarity memory rarityA, IZoo.Rarity memory rarityB) private pure returns (IZoo.Rarity memory) {
        if (rarityA.probability < rarityB.probability) {
            return rarityA;
        }
        return rarityB;
    }

    function unsafeRandom() public view override returns (uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.number, msg.sender, block.timestamp))) % randomLimit;
        return randomNumber;
    }


}
