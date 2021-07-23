pragma solidity 0.8.4;

import "./ZooMedia.sol";
import "./ZooToken.sol";
import {Decimal} from "./Decimal.sol";


contract ZooDrop {
    // this should be the max eggs available for this drop
    uint256 _totalSupply;
    uint256 _currentSupply;

    //Declare an Event
    event BuyEgg(address indexed _from);
    event Hatch(address indexed _from);
    event Burn(address indexed _from, uint256 _animalTokenId);
    event FreeAnimal(address indexed _from, uint256 _animalTokenId, uint256 _yield);
    // event Breed(address indexed _from, uint256 _animalTokenId1, uint256 _animalTokenId2, uint256 _eggTokenId);


    // temp Animal struct
    struct Animal {
        string name;
        string description;
        ZooMedia.MediaData data;
        uint256 yield ;
        uint256 boost;
        uint256 rarity;
        uint256 id;
    }

    struct Egg {
        // need this for hatching hybrid eggs
        uint256 id;
        uint256 parent1;
        uint256 parent2;
    }

    // mapping of token id to animals introduced in this drop
    mapping (uint256 => Animal) public _animals;

    // mapping of rarity to Animals 
    mapping (string => Animal[]) public _rarity;

    // mapping of rarity to daily yields : mapping key = rarity literal e.i. "uncommon"
    mapping (string => uint256) public _dailyYield;

    // mapping of rarity to yield boost : mapping key = rarity literal e.i. "uncommon"
    mapping (string => uint256) public _boost;

    // mapping of token id to animal date of birth : used to calculate yield for burn
    mapping (uint256 => uint256) public _animalDOB;

    // modifer to ensure the max amount of egg supply for this drop does not exceed limit
    modifier enoughSupply {
        require(_currentSupply < _totalSupply);
        _;
    }

    modifier enoughFunds{
        return token.balanceOf(msg.sender) >= 100;
        _;
    }

    //Token address of the ZooToken
    ZooToken public token;
    
    ZooMedia public media;

    constructor(address _zooToken, address _zooMedia){

        //Initalize token with ZooToken address
        token = ZooToken(_zooToken);

        media = ZooMedia(_zooMedia);
    }

    // Accept ZOO and return Egg NFT
    function buyEgg(media memory _data, IMarket.BidShares memory _bidShares) public enoughSupply enoughFunds pure returns (uint256) {
        token.approve(msg.sender, 100);
        token.transferFrom(msg.sender, address(this), 100);
        media.mint(_mediaData, _bidShares);
        emit BuyEgg(msg.sender);
        return 0;
    }

    // Burn egg and randomly return an animal NFT 
    function hatchEgg(uint256 tokenID) public pure returns (bool) {
        // need to grab the egg data to check if hybrid and if it has parents
        // how do i get the egg?
        // need to check the hatch time delay
                
        media.burn(tokenID);
        emit Burn(msg.sender, tokenId);

        // get the rarity for an animal    
        uint256 rarity = random(); 

        // if not hybrid
        if (egg.parent1 == "") {
            string animal = pickAnimal(rarity);
            MediaData memory data = MediaData({
                tokenURI: "www.tokenURI_for_picked_animal.com",
                metadataURI: "www.metadataURI_for_picked_animal.com",
                contentHash: "A SHA256 hash of the content pointed to by tokenURI",
                metadataHash: "dA SHA256 hash of the content pointed to by metadataURI"
            });
        } else {
        // if hybrid
            uint256 oneOrTwo = rarity % 2;
            media.Animal[2] possibleAnimals = media.hybrid_pair_map[media.concatAnimalIds(egg.parent1, egg.parent2)];
            string animal = possibleAnimals[oneOrTwo];
            MediaData memory data = MediaData({
                tokenURI: "www.tokenURI_for_picked_animal.com",
                metadataURI: "www.metadataURI_for_picked_animal.com",
                contentHash: "A SHA256 hash of the content pointed to by tokenURI",
                metadataHash: "dA SHA256 hash of the content pointed to by metadataURI"
            });
        }




        // mint by grabbing the animal 
        // pick an animal. create the data?? then mint using that data and the bidshare. animal data has yield info?

        //grab tokenURI for the animal
        //grab metadataURI for the animal      
        IMarket.BidShares bidShare = IMarket.BidShares({});

        media.mint(data, bidshare); // this time not an egg but an animal
        _animalDOB[tokenID] = now;

        emit hatch(msg.sender);
        return true;
    }

    // Take two animals and create a new hybrid egg which can hatch into a
    // hybrid animal
    function breedAnimal(uint256 _animal1, uint256 _animal2) public pure returns (uint256) {
        // don't we need to check and make sure both animals are base animals?
        Egg hybridEgg = Egg({parent1: _animal1, parent2: _animal2});
        MediaData data = MediaData({
            tokenURI: "www.example.com",
            metadataURI: "www.example2.com",
            contentHash: "dummy_data",
            metadataHash: "dummy_data"
        });
        IMarket.BidShares bidShare = IMarket.BidShares({});
        media.mint(data, bidShare);

        return true;
    }

    // Should burn animal and return yield
    function freeAnimal(uint256 _tokenID, address _zooMaster) public pure returns (bool) {
        // if the animal is a pure breed
            // get the creator/owner's address of token
            address _owner = media.tokenCreators[_tokenID];
            string rarity = animals[_tokenID].rarity;
            // burn the token
            media.burn(_tokenID);
            emit Burn(_owner, _tokenID);
            // calculate age of animal : probably dont have to use Decimal.sol because we need whole days 
            uint256 age = now-_animalDOB[_tokenID] / 60 / 60 / 24;
            // calculate daily yield
            uint256 dailyYield = Decimal.mul(age, Decimal.div(_dailyYield[rarity], 100));
            // add in boost
            uint256 yield = Decimal.mul(dailyYield, Decimal.div(_boost[_tokenID], 100));
            // transfer yield
            token.transferFrom(_zooMaster, _owner, yield);
            emit freeAnimal(_owner, _tokenId, yield);
        return true;
    }  

    // TEMP random function
    function random() private returns (uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.number, msg.sender, now))) % 1000;
        return randomNumber;
    }

    // Chooses animal based on random number generated, replace strings with ENUMS / data that
    // represents animal instead 
    function pickAnimal(uint random) internal returns(string) {
        
        if(random < 550){
            uint choice = random % 4;
            if(random == 0){
                return "Pug";
            }else if(random == 1){
                return "Butterfly";
            }else if(random == 2){
                return "Kitten";
            }else if(random == 3){
                return "Turtle";
            }
        } else if(random > 550 && random < 860){
            uint choice = random % 4;
            if(random == 0){
                return "Penguin";
            }else if(random == 1){
                return "Duckling";
            }else if(random == 2){
                return "Orca";
            }else if(random == 3){
                return "Elk";
            }

        }else if(random > 860 && random < 985){
            uint choice = random % 4;
            if(random == 0){
                return "Panda";
            }else if(random == 1){
                return "Gorilla";
            }else if(random == 2){
                return "Elephant";
            }else if(random == 3){
                return "Lion";
            }

        }else if(random > 985 && random < 995){
            uint choice = random % 2;
            if(random == 0){
                return "Bear";
            }else if(random == 1){
                return "Shark";
            }
            
        }else if(random > 995 && random < 1000){
            uint choice = random % 2;
            if(random == 0){
                return "Blobfish";
            }else if(random == 1){
                return "Naked Mole Rat";
            }
        }

    }
}




