pragma solidity 0.8.4;

import "./ZooMedia.sol";
import "./ZooToken.sol";
// import "./Random.sol";
import "./interfaces/IMarket.sol";
import {Decimal} from "./Decimal.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import 'hardhat/console.sol';


contract ZooDrop is Ownable, IERC721Receiver  {
    using SafeMath for uint256;
    // this should be the max eggs available for this drop
    uint256 public _totalSupply;
    uint256 public _currentSupply;
    uint256 private eggPrice;

    uint[] public coolDowns = [
        4 hours,
        1 days,
        3 days,
        7 days,
        30 days
    ];


    //Declare an Event
    event BuyEgg(address indexed _from);
    event Hatch(address indexed _from);
    event Burn(address indexed _from, uint256 indexed _animalTokenId);
    event FreeAnimal(address indexed _from, uint256 indexed _animalTokenId, uint256 indexed _yield);
    // event Breed(address indexed _from, uint256 _animalTokenId1, uint256 _animalTokenId2, uint256 _eggTokenId);



    struct Animal {
        string name;
        uint256 yield;
        Rarity rarity;
    }

    struct Rarity {
        string name;
        uint256 rarity;
        uint256 boost;
    }

    struct Hybrid{
        string name;
        uint256 yield;
    }

    struct Egg {
        // need this for hatching hybrid eggs
        uint256 id;
        string parent1;
        string parent2;
        uint256 eggCreationTime;
    }

    // mapping of token id to eggs
    mapping (uint256 => Egg) public eggs;

    // mapping of token id to minted base animals
    mapping (uint256 => string) public existingAnimals;

    // mapping of token id to minted hybrids animals
    mapping (uint256 => string) public existingHybrids;

    // mapping of animal name to available base animals introduced in this drop
    mapping (string => Animal) public hatchableAnimals;

    // mapping of animal name to available hybrid animals introduced in this drop
    mapping (string => Hybrid) public hybridAnimals;

    // mapping of animal key to animal tokenuri
    mapping (string => string) public tokenURI;
    
    // mapping of animal key to animal metadata
    mapping (string => string) public metaDataURI;

    // mapping of token id to animal date of birth : used to calculate yield for burn
    mapping (uint256 => uint256) public _animalDOB;

    // mapping of address and number of times address has bred animals
    mapping (address => uint256) public _breedCount;


    /**
        MODIFIERS
     */
    // modifer to ensure the max amount of egg supply for this drop does not exceed limit
    modifier enoughSupply {
        require(_currentSupply > 0);
        _;
    }

    modifier enoughFunds{
        require(token.balanceOf(msg.sender) >= eggPrice);
        _;
    }

    //Token address of the ZooToken
    ZooToken public token;
    
    ZooMedia public media;

    // Random public random;


    constructor(address _zooToken, address _zooMedia, uint256 _supply){
        //Initalize token with ZooToken address
        token = ZooToken(_zooToken);
        media = ZooMedia(_zooMedia);
        eggPrice = 200;
        _totalSupply = _supply;
        _currentSupply = _supply;

    }


    // owner can set egg cost
    function setEggPrice(uint256 _cost) public onlyOwner {
        require(_cost > 0, "Overflow or non positive price");

        eggPrice = _cost;
    }

    function getEggPrice() public returns (uint256) {
        return eggPrice;
    }

    /**
        Add animal for possibility of hatching for the drop
     */
    function addAnimal(string memory _animal, uint256 _yield, string memory _rarityName, uint256 _rarity, uint256 _boost, string memory _tokenURI, string memory _metaDataURI) public onlyOwner {
        Animal memory newAnimal;
        Rarity memory newRarity = Rarity({name: _rarityName, rarity: _rarity, boost: _boost});
        newAnimal.name = _animal;
        newAnimal.rarity = newRarity;
        newAnimal.yield = _yield;

        tokenURI[_animal] = _tokenURI;
        metaDataURI[_animal] = _metaDataURI;
        hatchableAnimals[_animal] = newAnimal;

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

        hybridAnimals[string(abi.encodePacked(_base, _secondary))] = newHybrid;
    }

    /**
        Getters for mappings
     */
     function getAnimal(string memory _animal) public view returns (Animal memory) {
         return hatchableAnimals[_animal];
     }

     function getHybrid(string memory _animal) public view returns (Hybrid memory) {
         return hybridAnimals[_animal];
     }

    function getTokenURI(string memory _animal) public view returns (string memory) {
         return tokenURI[_animal];
     }

    /**
        Setters for mappings
     */
    // possibly unnecessary
    function setAnimal(uint256 _tokenID, string memory _animal, uint256 _dob) public onlyOwner {
        existingAnimals[_tokenID] = _animal;
        _animalDOB[_tokenID] = _dob;
    }

    // possibly unnecessary
    function setHybrid(uint256 _tokenID, string memory _animal, uint256 _dob) public onlyOwner {
        existingHybrids[_tokenID] = _animal;
        _animalDOB[_tokenID] = _dob;
    }

    // add a tokenURI for an animal
    function setTokenURI(string memory _name, string memory _tokenURI) public onlyOwner {
        tokenURI[_name] = _tokenURI;
    }

    // add a metadataURI for an animal
    function setMetaDataURI(string memory _name, string memory _metaData) public onlyOwner {
        metaDataURI[_name] = _metaData;
    }


    // Accept ZOO and return Egg NFT
    function buyEgg(ZooMedia.MediaData memory _data, IMarket.BidShares memory _bidShares) public enoughSupply enoughFunds returns (uint256) {
        
        token.transferFrom(msg.sender, address(this), eggPrice);
        media.mint(_data, _bidShares);
        _currentSupply--;
        emit BuyEgg(msg.sender);
        return 0;
    }

    // Burn egg and randomly return an animal NFT 
    function hatchEgg(uint256 tokenID) public returns (bool) {
        // need to check the hatch time delay
        Egg memory egg = eggs[tokenID];      
        media.burn(tokenID);
        emit Burn(msg.sender, tokenID);

        // get the rarity for an animal    
        uint256 rarity = random(); 
        // uint256 rarity = 1;
        ZooMedia.MediaData memory data;
        // if not hybrid
        if (bytes(egg.parent1).length == 0) {
            string memory animal = pickAnimal(rarity);
            Animal memory hatched = hatchableAnimals[animal];
            data.tokenURI = tokenURI[animal];
            data.metadataURI = metaDataURI[animal];
            data.contentHash = keccak256(abi.encodePacked(data.tokenURI));
            data.metadataHash = keccak256(abi.encodePacked(data.metadataURI));
        } else {
        // if hybrid
            require(egg.eggCreationTime > egg.eggCreationTime.add(4 hours), "Must wait 4 hours for hybrid eggs to hatch.");
            uint256 oneOrTwo = rarity % 2;
            Hybrid[2] memory possibleAnimals = [ hybridAnimals[concatAnimalIds(egg.parent1, egg.parent2)], hybridAnimals[concatAnimalIds(egg.parent2, egg.parent1)]];
            string memory animal = possibleAnimals[oneOrTwo].name;
            data.tokenURI = tokenURI[animal];
            data.metadataURI = metaDataURI[animal];
            data.contentHash = keccak256(abi.encodePacked(data.tokenURI));
            data.metadataHash = keccak256(abi.encodePacked(data.metadataURI));
        }

        // mint by grabbing the animal 
        // pick an animal. create the data?? then mint using that data and the bidshare. animal data has yield info?

        //grab tokenURI for the animal
        //grab metadataURI for the animal      
        IMarket.BidShares memory bidShare;

        media.mint(data, bidShare); // this time not an egg but an animal

        emit Hatch(msg.sender);
        return true;
    }

    // Take two animals and create a new hybrid egg which can hatch into a
    // hybrid animal
    function breedAnimal(uint256 _tokenIDA, uint256 _tokenIDB) public returns (bool) {
        // require non hybrids
        string memory animal1 = existingHybrids[_tokenIDA];
        string memory animal2 = existingHybrids[_tokenIDB];
        require(bytes(animal1).length == 0 && bytes(animal2).length == 0, "Hybrid animals cannot breed.");

        // require both animals are drop animals
        require(bytes(existingAnimals[_tokenIDA]).length != 0 && bytes(existingAnimals[_tokenIDB]).length > 0);
        
        // need to figure out the delay
        // require(now.sub(checkBreedDelay()) <= 0)
        Egg memory hybridEgg;
        hybridEgg.parent1 = animal1;
        hybridEgg.parent2 = animal2; 
        hybridEgg.eggCreationTime = block.timestamp;
        ZooMedia.MediaData memory data;
        data.tokenURI = "www.example.com";
        data.metadataURI = "www.example2.com";
        data.contentHash = bytes32("du");
        data.metadataHash = bytes32("dum");
        IMarket.BidShares memory bidShare;
        media.mint(data, bidShare);
        _breedCount[msg.sender]++;

        return true;
    }

    // Implemented prior to issue #30
    // Should burn animal and return yield
    function freeAnimal(uint256 _tokenID, address _zooMaster) public returns (bool) {
            require(bytes(existingHybrids[_tokenID]).length > 0 || bytes(existingAnimals[_tokenID]).length > 0, "Non-existing animal");

            // get the creator/owner's address of token
            address _owner = media.tokenCreators(_tokenID);

            // burn the token
            media.burn(_tokenID);
            emit Burn(_owner, _tokenID);

            uint256 blocks = block.number - _animalDOB[_tokenID];
            uint256 avgBlocksDaily = 28800;
            uint256 age = blocks.div(avgBlocksDaily);
            uint256 dailyYield;

            if (bytes(existingHybrids[_tokenID]).length > 0) {
                // calculate daily yield
                uint256  percentage = hybridAnimals[existingHybrids[_tokenID]].yield;
                dailyYield = age.mul(percentage.div(100));
                // transfer yield
                token.transferFrom(_zooMaster, _owner, dailyYield);
                delete existingHybrids[_tokenID];
            } else {
                // calculate daily yield
                uint256 percentage = hatchableAnimals[existingAnimals[_tokenID]].yield;
                dailyYield = age.mul(percentage.div(100));
                // transfer yield
                token.transferFrom(_zooMaster, _owner, dailyYield);
                delete existingAnimals[_tokenID];
            }

            delete _animalDOB[_tokenID];
            emit FreeAnimal(_owner, _tokenID, dailyYield);
        
        return true;
    }  

    
     //   @Kimani will overwrite this
    // TEMP random function
    function random() private returns (uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.number, msg.sender, block.timestamp))) % 1000;
        return randomNumber;
    }

    function concatAnimalIds(string memory a1, string memory a2) internal returns (string memory) {
        return string(abi.encodePacked(a1, a2));
    }

    // Chooses animal based on random number generated from(0-999), replace strings with ENUMS / data that
    // represents animal instead 
    function pickAnimal(uint256 random) public view returns(string memory) {
        
        if(random < 550){
            uint choice = random % 4;
            if(choice == 0){
                return "Pug";
            }else if(choice == 1){
                return "Butterfly";
            }else if(choice == 2){
                return "Kitten";
            }else if(choice == 3){
                return "Turtle";
            }
        } else if(random > 550 && random < 860){
            uint choice = random % 4;
            if(choice == 0){
                return "Penguin";
            }else if(choice == 1){
                return "Duckling";
            }else if(choice == 2){
                return "Orca";
            }else if(choice == 3){
                return "Elk";
            }

        }else if(random > 860 && random < 985){
            uint choice = random % 4;
            if(choice == 0){
                return "Panda";
            }else if(choice == 1){
                return "Gorilla";
            }else if(choice == 2){
                return "Elephant";
            }else if(choice == 3){
                return "Lion";
            }

        }else if(random > 985 && random < 995){
            uint choice = random % 2;
            if(choice == 0){
                return "Bear";
            }else if(choice == 1){
                return "Shark";
            }
            
        }else if(random > 995 && random < 1000){
            uint choice = random % 2;
            if(choice == 0){
                return "Blobfish";
            }else if(choice == 1){
                return "Naked Mole Rat";
            }

        }
            return "";

    }

    function checkBreedDelay() public returns (uint256) {
        uint256 count = _breedCount[msg.sender];
        uint256 delay;
        if (count >= 5) {
            delay=coolDowns[coolDowns.length-1];
        } else if (count == 4) {
            delay=coolDowns[coolDowns.length-2];
        } else if (count == 3) {
            delay=coolDowns[coolDowns.length-3];
        } else if (count == 3) {
            delay=coolDowns[coolDowns.length-4];
        } else if (count == 1) {
            delay=coolDowns[coolDowns.length-5];
        } else {
            delay = 0;
        }
        return delay;
        
    }

// Callback for when ERC721 is minted using this contract

function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes memory _data) public override returns(bytes4) {
                
       return 0x150b7a02;
 }

}




