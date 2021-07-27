<<<<<<< HEAD
<<<<<<< HEAD
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

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

    //Types to identify what type of
    // media was minted from the onERC721Received(...) callback
    bytes base_egg_type = "E";
    bytes base_animal_type = "A";
    bytes hybrid_egg_type = "H";
    bytes hybrid_animal_type = "G";

    //Declare an Event
    event BuyEgg(address indexed _from);
    event Hatch(address indexed _from);
    event Burn(address indexed _from, uint256 indexed _animalTokenId);
    event FreeAnimal(address indexed _from, uint256 indexed _animalTokenId, uint256 indexed _yield);
    // event Breed(address indexed _from, uint256 _animalTokenId1, uint256 _animalTokenId2, uint256 _eggTokenId);

contract ZooDrop is Ownable {
    using Counters for Counters.Counter;

    uint256 public totalSupply;
    uint256 private _eggPrice;
    Counters.Counter private _currentSupply;

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

    struct Egg {
        // need this for hatching hybrid eggs
        // uint256 id;
        string parent1;
        string parent2;
        uint256 eggCreationTime;
    }

    // mapping of address to tokenId of eggs
    mapping (address => uint256) public ownedEggs;

    // mapping of token id to eggs
    mapping (uint256 => Egg) public eggs;

    // mapping of token id to minted base animals
    mapping (uint256 => string) public existingAnimals;

    // mapping of token id to minted hybrids animals
    mapping (uint256 => string) public existingHybrids;

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


    constructor(uint256 _supply, uint256 eggPrice){
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
        media.mintZoo(_data, _bidShares, base_egg_type);
        _currentSupply--;
        emit BuyEgg(msg.sender);
        return 0;
    }

    // Burn egg and randomly return an animal NFT
    function hatchEgg(uint256 tokenID) public returns (bool) {


        //TODO: Transfer token back to the contract in order to burn it 


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
        media.mintZoo(data, bidShare);
        _breedCount[msg.sender]++;

        return true;
    }

<<<<<<< HEAD
=======
    // Implemented prior to issue #30
    // Should burn animal and return yield
    function freeAnimal(uint256 _tokenID, address _zooMaster) public returns (bool) {
            require(bytes(existingHybrids[_tokenID]).length > 0 || bytes(existingAnimals[_tokenID]).length > 0, "Non-existing animal");


            //TODO: Transfer token back to the contract in order to burn it 

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
=======
// pragma solidity 0.8.4;
=======
pragma solidity 0.8.4;
>>>>>>> 94ac518 (Rearranging ZooMedia and ZooDrop contracts)

import "@openzeppelin/contracts/access/Ownable.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";


contract ZooDrop is Ownable {
    using Counters for Counters.Counter;

    uint256 public totalSupply;
    uint256 private _eggPrice;
    Counters.Counter private _currentSupply;

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

    // mapping of animal name to available base animals introduced in this drop
    mapping (string => Animal) public animals;

    // mapping of animal name to available hybrid animals introduced in this drop
    mapping (string => Hybrid) public hybrids;

    // mapping of animal key to animal tokenuri
    mapping (string => string) public tokenURI;
    
    // mapping of animal key to animal metadata
    mapping (string => string) public metaDataURI;

    constructor(uint256 _supply, uint256 eggPrice){
        _eggPrice = eggPrice;
        _totalSupply = _supply;
    }

    // owner can set egg cost
    function setEggPrice(uint256 _cost) public onlyOwner {
        require(_cost > 0, "Overflow or non positive price");

        _eggPrice = _cost;
    }

    function getEggPrice() public view returns (uint256) {
        return _eggPrice;
    }


    function getCurrentSupply() internal onlyOwner {
        _currentSupply.current();
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

<<<<<<< HEAD
//         // get the rarity for an animal    
//         uint256 rarity = random(); 
//         // uint256 rarity = 1;
//         ZooMedia.MediaData memory data;
//         // if not hybrid
//         if (bytes(egg.parent1).length == 0) {
//             string memory animal = pickAnimal(rarity);
//             Animal memory hatched = hatchableAnimals[animal];
//             data.tokenURI = tokenURI[animal];
//             data.metadataURI = metaDataURI[animal];
//             data.contentHash = keccak256(abi.encodePacked(data.tokenURI));
//             data.metadataHash = keccak256(abi.encodePacked(data.metadataURI));
//         } else {
//         // if hybrid
//             require(egg.eggCreationTime > egg.eggCreationTime.add(4 hours), "Must wait 4 hours for hybrid eggs to hatch.");
//             uint256 oneOrTwo = rarity % 2;
//             Hybrid[2] memory possibleAnimals = [ hybridAnimals[concatAnimalIds(egg.parent1, egg.parent2)], hybridAnimals[concatAnimalIds(egg.parent2, egg.parent1)]];
//             string memory animal = possibleAnimals[oneOrTwo].name;
//             data.tokenURI = tokenURI[animal];
//             data.metadataURI = metaDataURI[animal];
//             data.contentHash = keccak256(abi.encodePacked(data.tokenURI));
//             data.metadataHash = keccak256(abi.encodePacked(data.metadataURI));
//         }

//         // mint by grabbing the animal 
//         // pick an animal. create the data?? then mint using that data and the bidshare. animal data has yield info?

//         //grab tokenURI for the animal
//         //grab metadataURI for the animal      
//         IMarket.BidShares memory bidShare;

//         media.mint(data, bidShare); // this time not an egg but an animal

//         emit Hatch(msg.sender);
//         return true;
//     }

//     // Take two animals and create a new hybrid egg which can hatch into a
//     // hybrid animal
//     function breedAnimal(uint256 _tokenIDA, uint256 _tokenIDB) public returns (bool) {
//         // require non hybrids
//         string memory animal1 = existingHybrids[_tokenIDA];
//         string memory animal2 = existingHybrids[_tokenIDB];
//         require(bytes(animal1).length == 0 && bytes(animal2).length == 0, "Hybrid animals cannot breed.");

//         // require both animals are drop animals
//         require(bytes(existingAnimals[_tokenIDA]).length != 0 && bytes(existingAnimals[_tokenIDB]).length > 0);
        
//         // need to figure out the delay
//         // require(now.sub(checkBreedDelay()) <= 0)
//         Egg memory hybridEgg;
//         hybridEgg.parent1 = animal1;
//         hybridEgg.parent2 = animal2; 
//         hybridEgg.eggCreationTime = block.timestamp;
//         ZooMedia.MediaData memory data;
//         data.tokenURI = "www.example.com";
//         data.metadataURI = "www.example2.com";
//         data.contentHash = bytes32("du");
//         data.metadataHash = bytes32("dum");
//         IMarket.BidShares memory bidShare;
//         media.mintZoo(data, bidShare, hybrid_animal_type);
//         _breedCount[msg.sender]++;

//         return true;
//     }

//     // Implemented prior to issue #30
//     // Should burn animal and return yield
//     function freeAnimal(uint256 _tokenID, address _zooMaster) public returns (bool) {
//             require(bytes(existingHybrids[_tokenID]).length > 0 || bytes(existingAnimals[_tokenID]).length > 0, "Non-existing animal");


//             //TODO: Transfer token back to the contract in order to burn it 

//             // get the creator/owner's address of token
//             address _owner = media.tokenCreators(_tokenID);

//             // burn the token
//             media.burn(_tokenID);
//             emit Burn(_owner, _tokenID);

//             uint256 blocks = block.number - _animalDOB[_tokenID];
//             uint256 avgBlocksDaily = 28800;
//             uint256 age = blocks.div(avgBlocksDaily);
//             uint256 dailyYield;

//             if (bytes(existingHybrids[_tokenID]).length > 0) {
//                 // calculate daily yield
//                 uint256  percentage = hybridAnimals[existingHybrids[_tokenID]].yield;
//                 dailyYield = age.mul(percentage.div(100));
//                 // transfer yield
//                 token.transferFrom(_zooMaster, _owner, dailyYield);
//                 delete existingHybrids[_tokenID];
//             } else {
//                 // calculate daily yield
//                 uint256 percentage = hatchableAnimals[existingAnimals[_tokenID]].yield;
//                 dailyYield = age.mul(percentage.div(100));
//                 // transfer yield
//                 token.transferFrom(_zooMaster, _owner, dailyYield);
//                 delete existingAnimals[_tokenID];
//             }

//             delete _animalDOB[_tokenID];
//             emit FreeAnimal(_owner, _tokenID, dailyYield);
>>>>>>> 4895130 (Moved ZooDrop to ZooMedia)
        
//         return true;
//     }  

    
<<<<<<< HEAD
     //   @Kimani will overwrite this
    // TEMP random function
    function random() private returns (uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.number, msg.sender, block.timestamp))) % 1000;
        return randomNumber;
    }
>>>>>>> 339adce (Added todos)

=======
    function setTokenURI(string memory _animal, string memory _tokenURI) public onlyOwner {
        tokenURI[_animal] = _tokenURI;
    }

    
>>>>>>> 94ac518 (Rearranging ZooMedia and ZooDrop contracts)
    function setMetadataURI(string memory _animal, string memory _metadataURI) public onlyOwner {
        metaDataURI[_animal] = _metadataURI;
    }

<<<<<<< HEAD
    function buyEgg() public onlyOwner returns (string memory, string memory) {
        // require(_currentSupply > 0, "Current: decrement overflow");
        // _currentSupply = _currentSupply - 1;
        _currentSupply.decrement();
        return (tokenURI["basicEgg"], metaDataURI["basicEgg"]);
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
=======
//      //   @Kimani will overwrite this
//     // TEMP random function
//     function random() private returns (uint256) {
//         uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.number, msg.sender, block.timestamp))) % 1000;
//         return randomNumber;
//     }

//     function concatAnimalIds(string memory a1, string memory a2) internal returns (string memory) {
//         return string(abi.encodePacked(a1, a2));
//     }

//     // Chooses animal based on random number generated from(0-999), replace strings with ENUMS / data that
//     // represents animal instead 
//     function pickAnimal(uint256 random) public view returns(string memory) {
        
//         if(random < 550){
//             uint choice = random % 4;
//             if(choice == 0){
//                 return "Pug";
//             }else if(choice == 1){
//                 return "Butterfly";
//             }else if(choice == 2){
//                 return "Kitten";
//             }else if(choice == 3){
//                 return "Turtle";
//             }
//         } else if(random > 550 && random < 860){
//             uint choice = random % 4;
//             if(choice == 0){
//                 return "Penguin";
//             }else if(choice == 1){
//                 return "Duckling";
//             }else if(choice == 2){
//                 return "Orca";
//             }else if(choice == 3){
//                 return "Elk";
//             }

//         }else if(random > 860 && random < 985){
//             uint choice = random % 4;
//             if(choice == 0){
//                 return "Panda";
//             }else if(choice == 1){
//                 return "Gorilla";
//             }else if(choice == 2){
//                 return "Elephant";
//             }else if(choice == 3){
//                 return "Lion";
//             }

//         }else if(random > 985 && random < 995){
//             uint choice = random % 2;
//             if(choice == 0){
//                 return "Bear";
//             }else if(choice == 1){
//                 return "Shark";
//             }
            
//         }else if(random > 995 && random < 1000){
//             uint choice = random % 2;
//             if(choice == 0){
//                 return "Blobfish";
//             }else if(choice == 1){
//                 return "Naked Mole Rat";
//             }

//         }
//             return "";

//     }

//     function checkBreedDelay() public returns (uint256) {
//         uint256 count = _breedCount[msg.sender];
//         uint256 delay;
//         if (count >= 5) {
//             delay=coolDowns[coolDowns.length-1];
//         } else if (count == 4) {
//             delay=coolDowns[coolDowns.length-2];
//         } else if (count == 3) {
//             delay=coolDowns[coolDowns.length-3];
//         } else if (count == 3) {
//             delay=coolDowns[coolDowns.length-4];
//         } else if (count == 1) {
//             delay=coolDowns[coolDowns.length-5];
//         } else {
//             delay = 0;
//         }
//         return delay;
        
//     }
>>>>>>> 4895130 (Moved ZooDrop to ZooMedia)

// // Callback for when ERC721 is minted using this contract

<<<<<<< HEAD
function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes memory _data) public override returns(bytes4) {
<<<<<<< HEAD
=======
    

        //TODO:   Transfer token to the address who bought it 
>>>>>>> 339adce (Added todos)
=======
// function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes memory _data) public override returns(bytes4) {
    

//         //TODO: Transfer token to the address who bought it 
>>>>>>> 4895130 (Moved ZooDrop to ZooMedia)

//     if(keccak256(_data) == keccak256(base_egg_type)){

        
        
//     }
//     else if(keccak256(_data) == keccak256(base_animal_type)){

//     }
//     else if(keccak256(_data) == keccak256(hybrid_egg_type)){

<<<<<<< HEAD
    }
    else if(keccak256(_data) == keccak256(hybrid_animal_type)){
=======
//     }    
//     else if(keccak256(_data) == keccak256(hybrid_animal_type)){
>>>>>>> 4895130 (Moved ZooDrop to ZooMedia)

//     }

<<<<<<< HEAD
    return 0x150b7a02;
 }
}
=======
//     return 0x150b7a02;
//  }

// }
>>>>>>> 4895130 (Moved ZooDrop to ZooMedia)
=======
    function buyEgg() public onlyOwner returns (string, string) {
        _currentSupply.decrement();
        return (tokenURI["basicEgg"], metaDataURI["basicEgg"]);
    }
}
>>>>>>> 94ac518 (Rearranging ZooMedia and ZooDrop contracts)




