pragma solidity 0.8.4;

import "./ZooMedia.sol";
import "./ZooToken.sol";
import {Decimal} from "./Decimal.sol";


contract ZooDrop {;
    // this should be the max eggs available for this drop
    uint256 _totalSupply;
    uint256 _currentSupply;

    //Declare an Event
    event BuyEgg(address indexed _from, uint256 _eggTokenId);
    event Hatch(address indexed _from, uint256 _animalTokenId);
    event Burn(uint256 _animalTokenId);
    // event Breed(address indexed _from, uint256 _animalTokenId1, uint256 _animalTokenId2, uint256 _eggTokenId);

    //Emit an event
    emit Deposit(msg.sender, _id, msg.value);



    // temp Animal struct
    struct Animal {
        string name;
        string description;
        MediaData data;
        uint256 yield ;
        uint256 boost;
        uint256 rarity;
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
    
    ZooMarket public media;

    constructor(address _zooToken, address _zooMedia){

        //Initalize token with ZooToken address
        token = ZooToken(_zooToken)

        media = ZooMedia(_zooMedia);
    }

    // Accept ZOO and return Egg NFT
    function buyEgg(MediaData memory _data, IMarket.BidShares memory _bidShares) public enoughSupply enoughFunds pure returns (uint256) {
        token.approve(msg.sender, 100);
        token.transferFrom(msg.sender, address(this), 100);
        media.mint(_mediaData, _bidShares);
        return 0;
    }

    // Burn egg and randomly return an animal NFT 
    function hatchEgg(uint256 tokenID) public pure returns (bool) {
        // need to check the hatch time delay
        // need to check if it's a regular or hybrid egg
        
        // will require user owns the egg
        media.burn(tokenID) // zoomedia.burnToken
        emit burn(tokenId);

        // get the probability for an animal    
        uint256 rarity = random(); 

        // if not hybrid
        if (egg.parent1 == "") {
            string animal = pickAnimal(rarity)
            MediaData memory data = MediaData({
                tokenURI: "https://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/" + animal + "/" + animal + ".jpg",
                metadataURI: "www.example2.com",
                contentHash: this part  ,
                metadataHash this part,

            })
        }
        // if hybrid



        // mint by grabbing the animal 
        // pick an animal create the data?? then mint using that data and the bidshare. animal data has yield info?

        //grab tokenURI for the animal
        //grab metadataURI for the animal      

        media.mint(data, bidshare) // this time not an egg but an animal
        _animalDOB[tokenID] = now;

        emit hatch();
        return true;
    }

    // Take two animals and create a new hybrid egg which can hatch into a
    // hybrid animal
    function breedAnimal(uint256 _animal1, uint256 _animal2)) public pure returns (uint256) {
        Egg hybridEgg = Egg({parent1: _animal1, parent2: _animal2});
        MediaData data = MediaData({
            tokenURI: "https://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/" + animal + "/" + animal + ".jpg",
            metadataURI: "www.example2.com",
            contentHash: this part  ,
            metadataHash this part,

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
            // calculate age of animal : probably dont have to use Decimal.sol because we need whole days 
            uint256 age = now-_animalDOB[_tokenID] / 60 / 60 / 24;
            // calculate daily yield
            uint256 dailyYield = Decimal.mul(age, Decimal.div(_dailyYield[rarity], 100));
            // add in boost
            uint256 yield = Decimal.mul(dailyYield, Decimal.div(_boost[_tokenID], 100));
            // transfer yield
            token.transferFrom(_zooMaster, _owner, yield);
        return true;
    }  

    // TEMP random function
    function random() private returns (uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.number, msg.sender, now))) % 1000;
        return randomNumber;
    }

    // Chooses animal based on random number generated, replace strings with ENUMS / data that
    // represents animal instead 
    function pickAnimal(uint random) returns(string) {
        
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




