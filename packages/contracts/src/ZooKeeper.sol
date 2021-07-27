// SPDX-License-Identifier: MIT

// pragma solidity >=0.8.4;

// import "./ZooDrop.sol";
// import "./ZooMedia.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract ZooKeeper is Ownable {
//     mapping (uint256 => ZooDrop) public drops;

//     constructor() {

//     }

//     // Should take drop configuration and add animals to ZOO
//     function addDrop(uint256 _key, address _dropContract) public onlyOwner returns (bool) {
//         // Enable new drop to mint it's set of animals
//         drops[_key] = ZooDrop(_dropContract);
//         return true;
//     }

//     function removeDrop(uint256 _key) public onlyOwner returns (bool) {
//         delete drops[_key];
//         return true;
//     }

//     /*
//         Wrapper Functions from ZooDrop
//     */

//     function buyEgg(uint256 _key) public returns (uint256) {
//         ZooMedia.MediaData memory data;
//         data.tokenURI= "www.tokenURI_for_picked_animal.com";
//         data.metadataURI= "www.metadataURI_for_picked_animal.com";
//         data.contentHash= bytes32("A");
//         data.metadataHash= bytes32("d");

//         IMarket.BidShares memory shares;
//         drops[_key].buyEgg(data, shares);

//         return drops[_key].ownedEggs(msg.sender);
//     }

//     function hatchEgg(uint256 _key, uint256 _tokenID) public returns (bool) {
//         return drops[_key].hatchEgg(_tokenID);
//     }

//     function breedAnimal(uint256 _key, uint256 _animal1, uint256 _animal2) public returns (bool) {
//         return drops[_key].breedAnimal(_animal1, _animal2);
//     }

//     function freeAnimal(uint256 _key, uint256 _tokenID) public returns (bool) {
//         return drops[_key].freeAnimal(_tokenID, address(this));
//     }
// }
