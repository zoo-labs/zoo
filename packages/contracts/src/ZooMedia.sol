// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import { Media } from "./Media.sol";
import "./ZooToken.sol";
import "./ZooDrop.sol";
import "./ERC721Burnable.sol";
import {IMarket} from "./interfaces/IMarket.sol";
import {Decimal} from "./Decimal.sol";
import 'hardhat/console.sol';


// a instance for every egg or animal
contract ZooMedia is Media, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    uint public hybridHatchTime = 36 hours;

    uint[] public coolDowns = [
        4 hours,
        1 days,
        3 days,
        7 days,
        30 days
    ];

    enum TokenType {BASE_EGG, BASE_ANIMAL, HYBRID_EGG, HYBRID_ANIMAL}

    Counters.Counter private _dropIDs;

    //Declare an Event
    event AddDrop(uint256 indexed _dropID, address indexed _dropAddress);
    event BuyEgg(address indexed _from, uint256 indexed _tokenID);
    event Hatch(address indexed _from, uint256 indexed _tokenID);
    event Burn(address indexed _from, uint256 indexed _tokenID);
    event FreeAnimal(address indexed _from, uint256 indexed _tokenID, uint256 indexed _yield);
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
        string parent1;
        string parent2;
        uint256 eggCreationTime;
    }

     // Mapping of token ID to NFT type
    mapping (uint256 => TokenType) public types;

    // Mapping of token ID to Egg
    mapping (uint256 => Egg) public eggs;

    // Mapping of token ID to Animal
    mapping (uint256 => Animal) public animals;


    // Mapping of drop id to ZooDrop address
    mapping (uint256 => address) public drops;

    // mapping of all hatched animals DOB (as blocknumbers)
    mapping (uint256 => uint256) public animalDOB;

    // Mapping of drop id to ZooDrop address
    mapping (uint256 => address) public drops;

    /**
        MODIFIERS
     */
    // modifer to ensure the max amount of egg supply for this drop does not exceed limit
    // modifier enoughSupply {
    //     require(_currentSupply > 0);
    //     _;
    // }

    modifier enoughFunds{
        require(token.balanceOf(msg.sender) >= 200);
        _;
    }

    //Token address of the ZooToken
    ZooToken public token;
   constructor(string memory symbol, string memory name, address marketAddress, address _zooToken) Media(symbol, name, marketAddress) {
      token = ZooToken(_zooToken);
   }

    function addDrop(string memory name, uint256 _totalSupply, uint256 _eggPrice) public onlyOwner returns (uint256, address) {
        _dropIDs.increment();
        uint256 dropID = _dropIDs.current();

        ZooDrop drop = new ZooDrop(_totalSupply, _eggPrice);
        drops[dropID] = drop;

        return (dropID, drop.address);
    }

    // Accept ZOO and return Egg NFT
    function buyEgg(uint256 dropId) public returns (uint256) {

        ZooDrop memory drop = ZooDrop(drops[dropId]);

        uint256 eggPrice = drop.getEggPrice();

        require(token.balanceOf(msg.sender) >= eggPrice, "Not Enough ZOO Tokens to purchase Egg");
        require(drop.getCurrentSupply() > 0, "There are no more Eggs that can be purchased");

        token.transferFrom(msg.sender, address(this), eggPrice);


        var (_tokenURI, _metadataURI) = drop.buyEgg();
        Media.MediaData memory data;


        data.tokenURI=_tokenURI;
        data.metadataURI=_metadataURI;
        data.contentHash=keccak256(abi.encodePacked((_tokenURI,block.number,msg.sender));
        data.metadataHash=keccak256(abi.encodePacked((_metadataURI,block.number,msg.sender));


        IMarket.BidShares memory bidShare;

        bidShare.prevOwner = 0;
        bidShare.creator = 10*Decimal.BASE;
        bidShare.owner = 90*Decimal.BASE;

        mint(_data, _bidShares);
        uint256 tokenId = getRecentToken(msg.sender);
        console.log(tokenId);

        emit BuyEgg(msg.sender);
        return 0;
    }

    // Burn egg and randomly return an animal NFT
    // function hatchEgg(uint dropId, uint256 tokenID) public returns (bool) {
    //     // need to check the hatch time delay
    //     Egg memory egg = eggs[tokenID];
    //     burn(tokenID);
    //     emit Burn(msg.sender, tokenID);

    //     // get the rarity for an animal
    //     uint256 rarity = random();
    //     // uint256 rarity = 1;
    //     Media.MediaData memory data;
    //     // if not hybrid
    //     if (bytes(egg.parent1).length == 0) {
    //         string memory animal = pickAnimal(rarity);
    //         Animal memory hatched = hatchableAnimals[animal];
    //         data.tokenURI = tokenURI[animal];
    //         data.metadataURI = metaDataURI[animal];
    //         data.contentHash = keccak256(abi.encodePacked(data.tokenURI));
    //         data.metadataHash = keccak256(abi.encodePacked(data.metadataURI));
    //     } else {
    //     // if hybrid
    //         require(egg.eggCreationTime > egg.eggCreationTime.add(4 hours), "Must wait 4 hours for hybrid eggs to hatch.");
    //         uint256 oneOrTwo = rarity % 2;
    //         Hybrid[2] memory possibleAnimals = [ hybridAnimals[concatAnimalIds(egg.parent1, egg.parent2)], hybridAnimals[concatAnimalIds(egg.parent2, egg.parent1)]];
    //         string memory animal = possibleAnimals[oneOrTwo].name;
    //         data.tokenURI = tokenURI[animal];
    //         data.metadataURI = metaDataURI[animal];
    //         data.contentHash = keccak256(abi.encodePacked(data.tokenURI));
    //         data.metadataHash = keccak256(abi.encodePacked(data.metadataURI));
    //     }

    //     // mint by grabbing the animal
    //     // pick an animal. create the data?? then mint using that data and the bidshare. animal data has yield info?

    //     //grab tokenURI for the animal
    //     //grab metadataURI for the animal
    //     IMarket.BidShares memory bidShare;

    //     mint(data, bidShare); // this time not an egg but an animal

    //     emit Hatch(msg.sender);
    //     return true;
    // }


    //     hybridEgg.parent2 = animal2;

     //   @Kimani will overwrite this
    // TEMP random function
    function random() private returns (uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.number, msg.sender, block.timestamp))) % 1000;
        return randomNumber;
    }
    // take two animals and returns a bytes32 string of their names
    // to be used with ZooMedia.possib;ePairs to get the two possible hybrid pairs coming from the two base animals
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

 }
