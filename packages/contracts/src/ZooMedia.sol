// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import { Media } from "./Media.sol";
import "./ZooToken.sol";
import "./ERC721Burnable.sol"

// a instance for every egg or animal
contract ZooMedia is Media, Ownable {

    constructor(string memory symbol, string memory name, address marketAddress) Media(symbol, name, marketAddress) { }


  uint[] public coolDowns = [
    4 hours,
    1 days,
    3 days,
    7 days,
    30 days
  ];

  uint public hybridHatchTime = 36 hours;


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
 



 contract ZooTreasury is ZooToken {
    
    
    
    function freeAnimal() public pure returns (bool) {

        // Animal and Hybrid Animal

        // daily zoo accumulate by owner nft

        

        // blocks per day is 28,800 modulo by nft mint
        
        // returns the share of zoo based on dail yield metric

            Block %  == 


    }  

 
    function burn(uint256 tokenId) public virtual {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721Burnable: caller is not owner nor approved");
        _burn(tokenId);
    }

        //NFT is burned, ZOO is given to user based on number of blocks / daily yield

        function redeem(address to, uint256 value) public virtual {
            
        }
 
 }

 // // Take two animals and create a new hybrid egg which can hatch into a
    // // hybrid animal
    // function breedAnimal(uint256 animal1, uint256 animal2)) public pure returns (bool) {
    //     return true;
    // }

    // // Should burn animal and return yield
    // function freeAnimal() public pure returns (bool) {
    //     return true;
    // }  
    
    // // [possible delete] Should take drop configuration and add animals to ZOO
    // function addDrop() public onlyOwner returns (bool) {
    //     // Enable new drop to mint it's set of animals
        
            