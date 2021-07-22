pragma solidity 0.8.4;

import "./ZooMarket.sol";
import "./ZooMedia.sol";
import "./ZooToken.sol";
import {Decimal} from "./Decimal.sol";


contract ZooDrop {;
    // this should be the max eggs available for this drop
    uint256 _totalSupply;
    uint256 _currentSupply;

    // temp Animal struct
    struct Animal {
        string name;
        string rarity;
    }

    // mapping of token id to animals introduced in this drop
    mapping (uint256 => Animal) public _animals;

    // mapping of 

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
    
    ZooMedia public market;

    constructor(address _zooToken, address _zooMedia, address _zooMarket){

        //Initalize token with ZooToken address
        token = ZooToken(_zooToken)

        media = ZooMedia(_zooMedia);

        market = ZooMarket(_zooMarket);
    }

    // Accept ZOO and return Egg NFT
    function buyEgg() public enoughSupply enoughFunds pure returns (uint256) {

        token.approve(msg.sender, 100);
        token.transferFrom(msg.sender, address(this), 100);
        // bid for the media
        MediaData memory data;
     
            struct MediaData {
        // A valid URI of the content represented by this token
        data.tokenURI = "http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/Elephant/Baby%20Elephant.jpg";
        // A valid URI of the metadata associated with this token
        // A valid URI of the metadata associated with this token
        data.metadataURI = "google.com";
        // A SHA256 hash of the content pointed to by tokenURI
        data.contentHash = bytes32;
        // A SHA256 hash of the content pointed to by metadataURI
        data.metadataHash = bytes32;
        }

        Bidshares memory data;
        
        struct BidShares {
            // % of sale value that goes to the _previous_ owner of the nft
            Decimal.D256 prevOwner uint256() == 0;
            // % of sale value that goes to the original creator of the nft
            Decimal.D256 creator uint256() == 0.1;
            // % of sale value that goes to the seller (current owner) of the nft
            Decimal.D256 owner uint256() == 0;
            
        }

        media.mint(MediaData, BidShares);
        return 0;
    }

    // Actually mint egg NFT
    function mintEgg(MediaData memory _data, IMarket.BidShares memory _bidShares, address _zooMedia) public pure returns (address) {
        media.mint(_data, _bidShares);
        return true;
    }

    // Burn egg and randomly return an animal NFT 
    function hatchEgg(uint256 tokenID) public pure returns (bool) {

        // need to check if it's a regular or hybrid egg.
        //require user owns the egg
        media.burn(tokenId) // zoomedia.burnToken


        uint256 prob = random(); // get the probability for an animal
        // mint by grabbing the animal 
        // pick an animal create the data?? then mint using that data and the bidshare. animal data has yield info?
        string animal = pickAnimal(prob)

        media.mint(data, bidshare) // this time not an egg but an animal
        _animalDOB[tokenID] = now;
        return true;
    }

    // Take two animals and create a new hybrid egg which can hatch into a
    // hybrid animal
    function breedAnimal(uint256 animal1, uint256 animal2)) public pure returns (bool) {

        return true;
    }

    // Should burn animal and return yield
    function freeAnimal(uint256 _tokenID, address _zooMaster) public pure returns (bool) {
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
        uint256 randomnumber = uint256(keccak256(abi.encodePacked(block.number, msg.sender, now))) % 1000;
        return randomnumber;
    }

    // Chooses animal based on random number generated, replace strings with ENUMS / data that
    // represents animal instead 
    function pickAnimal(uint random){
  
        if(random < 550){
            uint choice = random % 4
            if(random == 0){
                return "Pug"
            }else if(random == 1){
                return "Butterfly"
            }else if(random == 2){
                return "Kitten"
            }else if(random == 3){
                return "Turtle"
            }
        } else if(random > 550 && random < 860){
            uint choice = random % 4
            if(random == 0){
                return "Penguin"
            }else if(random == 1){
                return "Duckling"
            }else if(random == 2){
                return "Orca"
            }else if(random == 3){
                return "Elk"
            }

        }else if(random > 860 && random < 985){
            uint choice = random % 4
            if(random == 0){
                return "Panda"
            }else if(random == 1){
                return "Gorilla"
            }else if(random == 2){
                return "Elephant"
            }else if(random == 3){
                return "Lion"
            }

        }else if(random > 985 && random < 995){
            uint choice = random % 2
            if(random == 0){
                return "Bear"
            }else if(random == 1){
                return "Shark"
            }
            
        }else if(random > 995 && random < 1000){
            uint choice = random % 2
            if(random == 0){
                return "Blobfish"
            }else if(random == 1){
                return "Naked Mole Rat"
            }
        }


    }
}
