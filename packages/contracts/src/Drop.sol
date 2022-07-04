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

import "./console.sol";

contract Drop is IDrop, Ownable {
    using SafeMath for uint256;

    using Counters for Counters.Counter;

    Counters.Counter public eggId;

    // Title of drop
    string override public title;

    // id of default base egg
    uint256 public baseEgg;

    uint256 randomLimit;

    // id of configured hybrid egg
    uint256 public hybridEgg;

    // Address of ZooKeeper contract
    address public keeperAddress;

    address public override EggDropAddress;

    // mapping of Rarity name to Rarity
    mapping (string => IZoo.Rarity) public rarities;

    // mapping of Rarity name to []string of Animal names
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


    // Ensure only ZK can call method
    modifier onlyZoo() {
        require(
            keeperAddress == msg.sender, "ZooDrop: Only ZooKeeper can call this method"
        );
        _;
    }

    constructor(string memory _title) {
        title = _title;
        randomLimit = 3;
    }

    function totalSupply() public override view returns (uint256) {

        return eggId.current();
    }

    function getAllEggs() public view returns(Egg[] memory) {
        Egg[] memory availableEggs = new Egg[](eggId.current());
        
        for (uint256 i = 0; i < eggId.current(); i++) {
                availableEggs[i] = eggs[i + 1];
        }

        return availableEggs;
    }

    // Set currentSupply base and hybrid egg
    function configureEggs(uint256 _baseEgg,uint256 _hybridEgg) public eggExists(_baseEgg) eggExists(_hybridEgg) onlyOwner {
        baseEgg = _baseEgg;
        hybridEgg = _hybridEgg;
    }

    // Configure current ZooKeeper
    function configureKeeper(address zooKeeper) public onlyOwner {
        keeperAddress = zooKeeper;
    }

    function configureEggDropper(address eggdropper) public onlyOwner {
        EggDropAddress = eggdropper;
    }

    function changeRandomLimit(uint256 limit) override public {
        require(msg.sender == owner() || msg.sender == EggDropAddress, "not allowed to change");
        randomLimit = limit;
    }


    // Add or configure a given rarity
    function setRarity(string memory name, uint256 probability, uint256 yields, uint256 boost) public onlyOwner returns (bool) {
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

        return true;
    }

    // Add or configure a given kind of egg
    function setEgg(string memory name, uint256 price, uint256 supply, string memory tokenURI, string memory metadataURI) public onlyOwner returns (Egg memory) {
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
        return egg;
    }

    function setEggPrice(uint256 id, uint256 price) public eggExists(id) onlyOwner returns (Egg memory) {
       Egg memory egg;
       eggs[id].price = price;
       return egg;
    }

    function setUris(string memory name, string memory tokenURI, string memory metadataURIs) public onlyOwner returns (Animal memory) {
        Animal memory animal;
        animal.data = getMediaData(tokenURI, metadataURIs);
        animals[name] = animal;
        return animal;
    }

    // Add or configure a given animal
    function setAnimal(string memory name, string memory rarity, string memory tokenURI, string memory metadataURI) public onlyOwner returns (bool) {
        Animal memory animal = Animal({
            kind: IZoo.Type.BASE_ANIMAL,
            stage: IZoo.AdultHood.BABY,
            rarity: getRarity(rarity),
            name: name,
            data: getMediaData(tokenURI, metadataURI),
            bidShares: getBidShares()
        });

        // Save animal by name
        animals[name] = animal;

        // Try to add animal to rarity
        addAnimalToRarity(animal.rarity.name, animal.name);

        return true;
    }

    // Add or configure a given hybrid
    function setHybrid(string memory name, string memory rarity, uint256 yields, string memory parentA, string memory parentB, string memory tokenURI, string memory metadataURI) public onlyOwner returns (bool) {
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
        return true;
    }

    struct _Animal {
        string rarity;
        string name;
        string tokenURI;
        string metadataURI;
    }

    // Helper to set many Animal at once
    function setAnimals(_Animal[] calldata _animals) public onlyOwner {
        for (uint256 i = 0; i < _animals.length; i++) {
            _Animal calldata animal = _animals[i];
            setAnimal(animal.name, animal.rarity, animal.tokenURI, animal.metadataURI);
        }
    }

    struct _Hybrid {
        string rarity;
        string name;
        uint256 yields;
        string parentA;
        string parentB;
        string tokenURI;
        string metadataURI;
    }


    // Helper to set many Animal at once
    function setHybrids(_Hybrid[] calldata _hybrids) public onlyOwner {
        for (uint256 i = 0; i < _hybrids.length; i++) {
            _Hybrid calldata hybrid = _hybrids[i];
            setHybrid(hybrid.name, hybrid.rarity, hybrid.yields, hybrid.parentA, hybrid.parentB, hybrid.tokenURI, hybrid.metadataURI);
        }
    }


    // Add Animal to rarity set if it has not been seen before
    function addAnimalToRarity(string memory rarity, string memory name) private {
        string[] storage _animals = rarityAnimals[rarity];

        // Check if animal has been added to this rarity before
        for (uint256 i = 0; i < _animals.length; i++) {
            string memory known = _animals[i];
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

    function hybridSupply() public view returns (uint256) {
        return getEgg(hybridEgg).supply;
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
            rarity: getRarity('Common'),
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
        Egg memory egg = getEgg(hybridEgg);
        require(hybridSupply() == 0 || egg.minted < hybridSupply(), "Out of hybrid eggs");

        // Convert egg into a token
        return IZoo.Token({
            rarity: getRarity('Common'),
            kind: IZoo.Type.HYBRID_EGG,
            name: egg.name,
            birthValues: IZoo.Birth({birthday: uint40(block.number), timestamp: uint40(block.timestamp), parents: parents}),
            data: egg.data,
            bidShares: egg.bidShares,
            dropEgg: hybridEgg,
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

    // Chooses animal based on random number generated from(0-999)
    function getRandomAnimal(uint256 random) override external view returns (IZoo.Token memory token) {
        Animal memory animal;

        console.log('getRandomAnimal', random);
        console.log('raritySorted.length', raritySorted.length);

        // Find rarest animal choices first
        for (uint256 i = 0; i < raritySorted.length; i++) {
            string memory name = raritySorted[i];
            IZoo.Rarity memory rarity = rarities[name];

            console.log('rarity.name', name);
            console.log('rarity.probability', rarity.probability);
            console.log('rarityAnimals', rarityAnimals[name][0], rarityAnimals[name][1]);

            // Highest probability first, failing that use lowest rarity (common) animal
            if (rarity.probability > random || i == raritySorted.length - 1) {
                string[] memory choices = rarityAnimals[name];
                animal = getAnimal(choices[random % choices.length]);
                break;
            }
        }

        // Return Token
        token.kind = IZoo.Type.BASE_ANIMAL;
        token.name = animal.name;
        token.data = animal.data;
        token.rarity = animal.rarity;
        token.bidShares = animal.bidShares;
        token.birthValues.timestamp = uint40(block.timestamp);
        token.birthValues.birthday = uint40(block.number);

        console.log('randomAnimal', animal.name, animal.rarity.name, animal.rarity.yields);
        console.log('randomAnimal.data.tokenURI', animal.data.tokenURI);
        console.log('randomAnimal.data.metadataURI', animal.data.metadataURI);
        return token;
    }

    function getRandomHybrid(uint256 random, IZoo.Parents memory parents) override external view returns (IZoo.Token memory token) {
        Hybrid[2] memory possible = [
            parentsToHybrid(parents.animalA, parents.animalB),
            parentsToHybrid(parents.animalB, parents.animalA)
        ];

        // pick array index 0 or 1 depending on the rarity
        Hybrid memory hybrid = possible[random % 2];

        // Return Token
        token.kind = IZoo.Type.HYBRID_ANIMAL;
        token.name = hybrid.name;
        token.data = hybrid.data;
        token.rarity = hybrid.rarity;
        token.rarity.yields = hybrid.yields; // Hybrid rarity overrides default
        token.bidShares = hybrid.bidShares;
        token.birthValues.timestamp = uint40(block.timestamp);
        token.birthValues.birthday = uint40(block.number);
        token.birthValues.parents = parents;
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

    // Return the higher of two rarities
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
