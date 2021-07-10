// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Animal.sol";

contract CryptoAnimalBase is ERC721, Ownable {
  uint[] public coolDowns = [
    4 hours,
    1 days,
    3 days,
    7 days,
    30 days
  ];

  uint public hatchReadyTime = 36 hours;

  uint public hatchPrice = .1 ether;

  uint8 public feePercentage = 3; 

  address public mktsqWallet = address(0);

  Animal[] public animals;

  function getCount() public view returns(uint count) {
    return animals.length;
  }  

  mapping(uint => Auction) public auctions;

  constructor (string memory name_, string memory symbol_)
    Ownable()
    ERC721(name_, symbol_)
  {
    mktsqWallet = msg.sender;
  }

  receive () external payable { }
  
  function getFeeOf(uint price) view public returns (uint) {
    return price * feePercentage / 100;
  }

  modifier onlyTokenOwner(uint _tokenId) {
    require(ownerOf(_tokenId) == _msgSender(), "Animal: caller is not the token owner");
    _;
  }

  modifier onlyValidTokenId(uint _tokenId) {
    require(_exists(_tokenId), "Animal: invalid token id");
    require(_tokenId >= 0 && animals.length >= _tokenId + 1, "Animal: invalid token id");
    _;
  }

  function _mintToken(address _to, Animal memory _egg)
    internal
    returns (uint)
  {
    animals.push(_egg);

    uint childId = animals.length - 1;

    Auction storage auction = auctions[childId];
    auction.highestBidder = address(0);
    auction.endTime = 0;
    auction.highestBid = 0;
    auction.ended = true;

    _safeMint(_to, childId);

    return animals.length - 1;
  }
}
