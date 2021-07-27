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

    // Mapping of token ID to Hybrids
    mapping (uint256 => Hybrid) public hybrids;

    // Mapping of token ID to Hybrid Eggs
    // mapping (uint256 => HybridEgg) public hybridEggs;

    // Mapping of drop id to ZooDrop address
    mapping (uint256 => address) public drops;

    // mapping of all hatched animals DOB (as blocknumbers)
    mapping (uint256 => uint256) public animalDOB;

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
        drops[dropID] = address(drop);

        emit AddDrop(dropID, address(drop));
        return (dropID, address(drop));
    }

    function setMetadataURI(uint256 dropID, string memory name, string memory _URI) public onlyOwner {
        ZooDrop drop = ZooDrop(drops[dropID]);

        drop.setMetadataURI(name, _URI);
    }

    function setTokenURI(uint256 dropID, string memory name, string memory _URI) public onlyOwner {
        ZooDrop drop = ZooDrop(drops[dropID]);

        drop.setTokenURI(name, _URI);
    }

    // Accept ZOO and return Egg NFT
    function buyEgg(uint256 dropId) public returns (uint256) {
        ZooDrop drop = ZooDrop(drops[dropId]);

        uint256 eggPrice = drop.getEggPrice();

        require(token.balanceOf(msg.sender) >= eggPrice, "Not Enough ZOO Tokens to purchase Egg");
        require(drop.getCurrentSupply() > 0, "There are no more Eggs that can be purchased");

        token.transferFrom(msg.sender, address(this), eggPrice);

        (string memory _tokenURI, string memory _metadataURI) = drop.buyEgg();
        Media.MediaData memory data;

        data.tokenURI=_tokenURI;
        data.metadataURI=_metadataURI;
        data.contentHash=keccak256(abi.encodePacked(_tokenURI,block.number,msg.sender));
        data.metadataHash=keccak256(abi.encodePacked(_metadataURI,block.number,msg.sender));

        IMarket.BidShares memory bidShare;

        // Get confirmation
        bidShare.prevOwner = Decimal.D256(0);
        bidShare.creator = Decimal.D256(10*(10**18));
        bidShare.owner =  Decimal.D256(90*(10**18));

        mint(data, bidShare);
        uint256 tokenId = getRecentToken(msg.sender);

        Egg memory egg;

        egg.eggCreationTime = block.timestamp;

        eggs[tokenId] = egg;

        types[tokenId] = TokenType.BASE_EGG;

        emit BuyEgg(msg.sender, tokenId);
        return 0;
    }

    // Burn egg and randomly return an animal NFT
    function hatchEgg(uint256 dropId, uint256 tokenID) public returns (uint256) {
         ZooDrop drop = ZooDrop(drops[dropId]);

        // need to check the hatch time delay

        //  grab egg struct
        Egg memory egg = eggs[tokenID];
        TokenType eggType = types[tokenID];
        burn(tokenID);

        //  burn the eggToken(it's hatching)
        emit Burn(msg.sender, tokenID);

        // get the rarity for an animal
        uint256 rarity = unsafeRandom();

        Media.MediaData memory data;

        ZooDrop.Animal memory _animal;
        string memory hatchedAnimal;

        // if not hybrid
        if (uint(TokenType.BASE_EGG) == uint(eggType)) {
            hatchedAnimal = pickAnimal(rarity);
        } else if (uint(TokenType.HYBRID_EGG) == uint(eggType)) {
        // if hybrid
            require(egg.eggCreationTime > egg.eggCreationTime.add(4 hours), "Must wait 4 hours for hybrid eggs to hatch.");
            // pick array index 0 or 1 depending on the rarity
            uint256 chosen = rarity % 2;
            // ZooDrop.Hybrid memory one;
            (string memory name1, uint256 yield1) = drop.hybrids(concatAnimalIds(egg.parent1, egg.parent2));
            (string memory name2, uint256 yield2) = drop.hybrids(concatAnimalIds(egg.parent2, egg.parent1));

            ZooDrop.Hybrid[2] memory possibleHybrids = [
                ZooDrop.Hybrid(name1, yield1),
                ZooDrop.Hybrid(name2, yield2)
            ];
            hatchedAnimal = possibleHybrids[chosen].name;
        }

        data.tokenURI = drop.tokenURI(hatchedAnimal);
        data.metadataURI = drop.metaDataURI(hatchedAnimal);
        data.contentHash = keccak256(abi.encodePacked(drop.tokenURI(hatchedAnimal), block.number, msg.sender));
        data.metadataHash = keccak256(abi.encodePacked(drop.metaDataURI(hatchedAnimal), block.number, msg.sender));


        IMarket.BidShares memory bidShare;
        bidShare.prevOwner = Decimal.D256(0);
        bidShare.creator = Decimal.D256(10*(10**18));
        bidShare.owner =  Decimal.D256(90*(10**18));

        mint(data, bidShare); // this time not an egg but an animal

        uint256 tokenId = getRecentToken(msg.sender);
        console.log(tokenId);

        // animal DOB
        animalDOB[tokenId] = block.number;
        // type of NFT
        types[tokenId] = TokenType.HYBRID_ANIMAL;
        emit Hatch(msg.sender, tokenId);
        return tokenId;
    }

    // Take two animals and create a new hybrid egg which can hatch into a
    // // hybrid animal
    // function breedAnimal(uint256 _tokenIDA, uint256 _tokenIDB) public returns (bool) {
    //     // require non hybrids
    //     string memory animal1 = existingHybrids[_tokenIDA];
    //     string memory animal2 = existingHybrids[_tokenIDB];
    //     require(bytes(animal1).length == 0 && bytes(animal2).length == 0, "Hybrid animals cannot breed.");

    //     // require both animals are drop animals
    //     require(bytes(existingAnimals[_tokenIDA]).length != 0 && bytes(existingAnimals[_tokenIDB]).length > 0);

    //     // need to figure out the delay
    //     // require(now.sub(checkBreedDelay()) <= 0)
    //     Egg memory hybridEgg;
    //     hybridEgg.parent1 = animal1;
    //     hybridEgg.parent2 = animal2;
    //     hybridEgg.eggCreationTime = block.timestamp;
    //     Media.MediaData memory data;
    //     data.tokenURI = "www.example.com";
    //     data.metadataURI = "www.example2.com";
    //     data.contentHash = bytes32("du");
    //     data.metadataHash = bytes32("dum");
    //     IMarket.BidShares memory bidShare;
    //     mintZoo(data, bidShare, hybrid_animal_type);
    //     _breedCount[msg.sender]++;

    //     return true;
    // }

    // Implemented prior to issue #30
    // // Should burn animal and return yield
    // function freeAnimal(uint256 _tokenID, address _zooMaster) public returns (bool) {
    //         require(bytes(existingHybrids[_tokenID]).length > 0 || bytes(existingAnimals[_tokenID]).length > 0, "Non-existing animal");


    //         //TODO: Transfer token back to the contract in order to burn it

    //         // get the creator/owner's address of token
    //         address _owner = tokenCreators[_tokenID];

    //         // burn the token
    //         burn(_tokenID);
    //         emit Burn(_owner, _tokenID);

    //         uint256 blocks = block.number - _animalDOB[_tokenID];
    //         uint256 avgBlocksDaily = 28800;
    //         uint256 age = blocks.div(avgBlocksDaily);
    //         uint256 dailyYield;

    //         if (bytes(existingHybrids[_tokenID]).length > 0) {
    //             // calculate daily yield
    //             uint256  percentage = hybridAnimals[existingHybrids[_tokenID]].yield;
    //             dailyYield = age.mul(percentage.div(100));
    //             // transfer yield
    //             token.transferFrom(_zooMaster, _owner, dailyYield);
    //             delete existingHybrids[_tokenID];
    //         } else {
    //             // calculate daily yield
    //             uint256 percentage = hatchableAnimals[existingAnimals[_tokenID]].yield;
    //             dailyYield = age.mul(percentage.div(100));
    //             // transfer yield
    //             token.transferFrom(_zooMaster, _owner, dailyYield);
    //             delete existingAnimals[_tokenID];
    //         }

    //         delete _animalDOB[_tokenID];
    //         emit FreeAnimal(_owner, _tokenID, dailyYield);

    //     return true;
    // }


     //   @Kimani will overwrite this
    // TEMP random function
    function unsafeRandom() private returns (uint256) {
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

/**
        Add animal for possibility of hatching for the drop
     */
    function addAnimal(uint256 dropID, string memory _animal, uint256 _yield, string memory _rarityName, uint256 _rarity, string memory _tokenURI, string memory _metaDataURI) public onlyOwner {
        ZooDrop drop = ZooDrop(drops[dropID]);
        drop.addAnimal(_animal, _yield, _rarityName, _rarity, _tokenURI, _metaDataURI);
    }

    /**
        Add animal for possibility of hatching for the drop
     */
    function addHybrid(uint256 dropID, string memory _animal, string memory _base, string memory _secondary, uint256 yield, string memory _tokenURI, string memory _metaDataURI) public onlyOwner {
        ZooDrop drop = ZooDrop(drops[dropID]);
        drop.addHybrid(_animal, _base, _secondary, yield, _tokenURI, _metaDataURI);
    }

    // function checkBreedDelay() public returns (uint256) {
    //     uint256 count = _breedCount[msg.sender];
    //     uint256 delay;
    //     if (count >= 5) {
    //         delay=coolDowns[coolDowns.length-1];
    //     } else if (count == 4) {
    //         delay=coolDowns[coolDowns.length-2];
    //     } else if (count == 3) {
    //         delay=coolDowns[coolDowns.length-3];
    //     } else if (count == 3) {
    //         delay=coolDowns[coolDowns.length-4];
    //     } else if (count == 1) {
    //         delay=coolDowns[coolDowns.length-5];
    //     } else {
    //         delay = 0;
    //     }
    //     return delay;

    // }

// Callback for when ERC721 is minted using this contract


    function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
        uint8 i = 0;
        while(i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }
 }
