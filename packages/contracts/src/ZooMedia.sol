// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import { Media } from "./Media.sol";
import "./ZooToken.sol";
import "./ERC721Burnable.sol";


// a instance for every egg or animal
contract ZooMedia is Media, Ownable, ER721Burnable {

    enum Animal{
        PUG, BUTTERFLY, KITTEN, TURTLE, PENGUIN, DUCKLING, ORCA, ELK, PANDA, GORILLA, ELEPHANT, LION, BEAR, SHARK, BLOBFISH, NAKED_MOLE_RAT,
        PUGGY,BUTTERPUG,KITTY_PUG,TURTPUG,PENGPUG,DUCKPUG,ORCAPUG,ELKPUG,PANDAPUG,GUG,ELEPUG,LIONPUG,BEARPUG,SHUG,BLOBPUG,NAKED_MOLE_PUG,
        PUGGERFLY,CATERPILLAR,KITTERFLY,TURTTERFLY,PENGGERFLY,DUCKERFLY,ORCAFLY,ELKERFLY,PANDAFLY,GORILLAFLY,ELEPHANTTERFLY,LIONFLY,BEARTTERFLY,SHARKERFLY,BLOBBERFLY,NAKED_BUTTERFLY,
        PUGITTEN,BUTTERFLITTEN,BABY_KITTEN,TURKITTEN,PENGKITTY,DUCKITTEN,ORKITTEN,ELKITTEN,PANDACAT,GORKITTEN,ELEPHITTEN,LITTEN,BEARTTEN,SHARKITTEN,BLOB_KITTEN,NAKED_MOLE_KITTEN,
        PUGURTLE,BUTTURTLE,KITTURTLE,TINY_TURTLE,PENGURTLE,DURTLE,ORCATURTLE,ELKURTLE,PANDATURTLE,GORTURTLE,ELEPHANTURTLE,LIONTURTLE,BEARTLE,SHURTLE,BLOBURTLE,NAKED_TURTLE,
        PUGGUIN,BUTTERFLENGUIN,KITTYPENGUIN,TURTLEPENG,PENGUIN_CHICK,DUCKLINGUIN,ORCAPENG,ELKENGUIN,PANDUIN,GORILLAGUIN,ELEPENGUIN,LIONGUIN,BENGUIN,SHANGUIN,BLOB_PENGUIN,NAKED_PENGUIN,
        PUGLING,BUTTERFLING,KITTYLING,TURTLING,PENGLING,DUCKLING_CHICK,ORCLING,ELKLING,PANDALING,GORILLING,ELEPHLING,LIONLING,BEARLING,SHARKLING,BLOBLING,NAKED_DUCKLING,
        PUGORCA,BUTTORCA,KITTORCA,TURTORCA,PENGUORCA,DORCA,BABY_ORCA,ELKA,PANDORCA,GORCA,ELEPHORCA,LIONORCA,BEARCA,SHORCA,BLOBORCA,NAKED_MOLE_ORCA,
        PELK,BUTTERFLELK,KITTELK,TURTELK,PENGUELK,DUCKELK,ORCELK,BABY_ELK,PANDELK,GORILLELK,ELKEPHANT_1,LIONELK,BELK,SHELK,BLOBELK,NAKED_MOLE_ELK,
        PUGDA,BUTTERFLANDA,KITTYPAN,TURTANDA,PENDA,DUCKDA,ORCANDA,ELKANDA,PANDA_CUB,GORANDA,ELEPANDA,LIONDA,BANDA,SHARNDA,BLOBDA,NAKED_PANDA,
        PUGORILLA,BUTTERLA,KITTORILLA,TURTILLA,PENGUILLA,DUCKORILLA,ORCILLA,ELKORILLA,PANDALLA,BABY_GORILLA,ELEPHANTILLA,LIONILLA,BEARILLA,SHARKORILLA,BLOBILLA,NAKED_MOLE_GORILLA,
        PUGGERPHANT,BUTTERPHANT,KITTYPHANT,TURTELEPHANT,PELEPHANT,DUCKLEPHANT,ORCAPHANT,ELKEPHANT_2,PANDAPHANT,GORILLAPHANT,BABY_ELEPHANT,LELEPHANT,BELEPHANT,SHARKEPHANT,BLOBAPHANT,NAKED_ELEPHANT,
        PUGLION,BUTTERFLION,LION_KITTY,TURTLION,PENGUILION,DUCKLION,ORCLION,ELKION,PANDALION,GORILLION,ELEPHLION,LION_CUB,BEARLION,SHLION,BLOBLION,NAKED_LION,
        PUGBEAR,BUTTERBEAR,KITTYBEAR,TURTLE_BEAR,PENGBEAR,DUCKBEAR,ORCA_BEAR,ELKBEAR,PEARDA,GORILLABEAR,ELEBEAR,LIONBEAR,BEAR_CUB,SHARKBEAR,BLOB_BEAR,NAKED_MOLE_BEAR,
        PUGSHARK,BUTTERSHARK,SHARK_KITTY,TURTLESHARK,PENGUIN_SHARK,DUCKSHARK,ORCASHARK,ELKSHARK,PANDASHARK,GORILLARK,ELESHARK,LIONSHARK,BEARSHARK,BABY_SHARK,BLOBSHARK,NAKED_MOLE_SHARK,
        PLOBFISH,BUTTERBLOB,KITTY_BLOB,TURTLEBLOB,PENGUINFISH,DUCKBLOB,ORCABLOB,ELKFISH,PANDABLOB,GORILLABLOB,ELEBLOB,LIONFISH,BEARBLOB,SHLOBFISH,BABY_BLOB,NAKED_BLOBFISH,
        PUGRAT,BUTTERRAT,KITTY_RAT,TURTLERAT,PENGUINRAT,DUCKRAT,ORCARAT,ELK_RAT,PANDARAT,GORILLA_RAT,ELEPHRAT,LION_RAT,BEARRAT,SHARK_RAT,BLOBRAT,NAKED_RAT_BABY
    }

    mapping (string => uint[2]) public hybrid_pair_map;    

    constructor(string memory symbol, string memory name, address marketAddress) Media(symbol, name, marketAddress) {
        // populate hybrid_pair_map
        for (uint i=0; i < uint(Animal.NAKED_RAT_BABY) + 1; i++ ) {
            for (uint j=i; j < uint(Animal.NAKED_RAT_BABY) + 1; j++ ) {
                hybrid_pair_map[concatAnimalIds(i, j)] = [((j+1)*16)+i, ((i+1)*16)+j];
            }
        }

    }



    function concatAnimalIds(uint a1, uint a2) internal returns (string memory) {
        return string(abi.encodePacked(keccak256(a1), keccak256(a2)));
    }

  uint[] public coolDowns = [
    4 hours,
    1 days,
    3 days,
    7 days,
    30 days,
  ];

  uint public hybridHatchTime = 36 hours;

            //call burn function to burn the nft which returns to ZOO owner 
    function burn(uint256 tokenId) public override nonReentrant onlyExistingToken(tokenID){
       
        _burn(tokenID);
            returns tokenID
    }

            // redeems the token after burn then returns to _owner
    function redeem(address to, uint256 value) public pure returns (_tokenID) {
             
        block.number - _animalDOB[_tokenID]
        mapping(uint256 => _DailyYield

        returns _owner
    }


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


    // function addToHybridPair() {

    // }

    // function addToAnimalID(string[] _list) {
    //     for 
    //     animal_id_map
    // 

    // // Accept ZOO and return Egg NFT
    // function buyEgg() public pure returns (uint256) {
    //     // bid for the media
        
    //     return 0;
    // }

    // // Actually mint egg NFT
    // function mintEgg(MediaData memory data, IMarket.BidShares memory bidShares) public pure returns (bool) {
    //     mint(data, bidShare)
    //     return true;
    // }

    // // Burn egg and randomly return an animal NFT
    // function hatchEgg(uint256 tokenID) public pure returns (bool) {
    //     return true;
    // }

  
  
}


// // A given species of animal
// abstract contract Animal {
//     using Counters for Counters.Counter;

//     Counters.Counter private _animalIDs;

//     Data public data;
//     string public name;
//     string public description;

//     constructor(
//         string memory _name,
//         string memory _description,
//         Data memory _data
//     ) {
//         name = _name;
//         description = _description;
//         data = _data;
//     }
// }

// abstract contract Hybrid is Animal {
//     Animal public parent1;
//     Animal public parent2;

//     constructor(
//         string memory _name,
//         string memory _description,
//         Data memory _data,
//         Animal _parent1,
//         Animal _parent2
//     ) {
//         name = _name;
//         description = _description;
//         data = _data;
//         parent1 = _parent1;
//         parent2 = _parent2;
//     }
// }

// contract AnimalSet is Ownable {
//     using Counters for Counters.Counter;
//     Counters.Counter private _setIDs;

//     Data data;

//     Animal[] animals;
//     string name;
//     string description;
//     uint256 yield;
//     uint256 boost;
//     uint256 probability;

//     constructor(
//         string memory _name,
//         string memory _description,
//         Data memory _data,
//         uint256 _yield,
//         uint256 _boost,
//         uint256 _probability
//     ) {
//         name = _name;
//         description = _description;
//         data = _data;
//         yield = _yield;
//         boost = _boost;
//         probability = _probability;
//     }
// }

// // Each AnimalDrop introduces a new generation of breedable animals.
// contract AnimalDrop is Ownable {
//     // Should hash all images in a drop
//     string public zooHash = "xxxxxxx";
//     string name;
//     string description;
//     Data data;
//     AnimalSet[] sets;

//     constructor(
//         string memory _name,
//         string memory _description,
//         Data memory _data,
//         AnimalSet[] memory _sets
//     ) {
//         name = _name;
//         description = _description;
//         sets = _sets;
//         data = _data;
//     }
// }




 
    
    
     

 // // Take two animals and create a new hybrid egg which can hatch into a
    // // hybrid animal
    // function breedAnimal(uint256 animal1, uint256 animal2)) public pure returns (bool) {
    //     return true;
    // }

    // // Should burn animal and return yield
       
    
    // // [possible delete] Should take drop configuration and add animals to ZOO
    // function addDrop() public onlyOwner returns (bool) {
    //     // Enable new drop to mint it's set of animals

contract ZooTreasury is ZooMedia, ZooToken, SafeMath {
    address == 
    
    freeAnimal.call(uint256 _tokenID, address _zooMaster) returns (bool);
    //get the block number
    // NFT minted / 28800
    

    }
   
      