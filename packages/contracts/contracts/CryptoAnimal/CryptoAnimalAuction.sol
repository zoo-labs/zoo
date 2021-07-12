// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./CryptoAnimalSell.sol";
import "./Animal.sol";

contract CryptoAnimalAuction is CryptoAnimalSell {

  event HighestBidIncreased(uint tokenId, uint amount);

  event AuctionEnded(uint tokenId, address seller, address winner, uint amount);

  event AuctionCancelled(uint tokenId);

  modifier onlyAuctionSale(uint _tokenId) {
    require(animals[_tokenId].inMarket == MarketStatus.AUCTION, "Animal: not in auction sale");
    _;
  }

  modifier onlyWhenAuctionNotEnded(uint _tokenId) {
    require(auctions[_tokenId].ended == false, "Animal: auction already ended");
    _;
  }

  modifier onlyBeforeAuctionTime(uint _tokenId) {
    require(block.timestamp <= auctions[_tokenId].endTime, "Animal: auction already ended");
    _;
  }

  modifier onlyAfterAuctionTime(uint _tokenId) {
    require(block.timestamp > auctions[_tokenId].endTime, "Auction not yet ended");
    _;
  }

  constructor (string memory name_, string memory symbol_)
    CryptoAnimalSell(name_, symbol_)
  { }

  function startAuction(uint _tokenId, uint _initialPrice, uint _biddingTime)
    external
    onlyTokenOwner(_tokenId)
  {
    Animal storage animal = animals[_tokenId];
    Auction storage auction = auctions[_tokenId];

    require(animal.inMarket != MarketStatus.AUCTION, "Animal: already in auction");
    require(auction.ended == true, "Animal: not yet ended");
    require(_initialPrice > 0, "Animal: initial price should be greater than 0");

    animal.inMarket = MarketStatus.AUCTION;
    auction.highestBid = _initialPrice;
    auction.ended = false;
    auction.endTime = block.timestamp + _biddingTime;
  }

  function bid(uint _tokenId)
    external
    payable
    onlyValidTokenId(_tokenId)
    onlyAuctionSale(_tokenId)
    onlyWhenAuctionNotEnded(_tokenId)
    onlyBeforeAuctionTime(_tokenId)
  {
    require(msg.sender != ownerOf(_tokenId), "Animal: can't bid on oneself's animal");
    Auction storage auction = auctions[_tokenId];

    require(msg.value > auction.highestBid, "Animal: bid not high enough");

    auction.pendingReturns[msg.sender] += msg.value;
    auction.highestBidder = msg.sender;
    auction.highestBid = msg.value;
    
    emit HighestBidIncreased(_tokenId, msg.value);
  }

  function withdraw(uint _tokenId)
    external
    onlyValidTokenId(_tokenId)
    returns (bool)
  {
    Auction storage auction = auctions[_tokenId];

    uint amount = auction.pendingReturns[msg.sender];
    if (amount > 0) {
      (bool success,) = payable(msg.sender).call{value: amount}("");

      if (success) {
        auction.pendingReturns[msg.sender] = 0;
      } else {
        return false;
      }
    }
    return true;
  }

  function cancelAuction(uint _tokenId)
    external
    onlyAuctionSale(_tokenId)
    onlyTokenOwner(_tokenId)
    onlyWhenAuctionNotEnded(_tokenId)
    onlyBeforeAuctionTime(_tokenId)
  {
    Animal storage animal = animals[_tokenId];
    Auction storage auction = auctions[_tokenId];

    require(!auction.ended, "Auction already cancelled or ended");
    auction.ended = true;
    animal.inMarket = MarketStatus.NONE;

    emit AuctionCancelled(_tokenId);
  }
  
  function endAuction(uint _tokenId)
    external
    onlyAuctionSale(_tokenId)
    onlyTokenOwner(_tokenId)
    onlyWhenAuctionNotEnded(_tokenId)
    onlyAfterAuctionTime(_tokenId)
  {
    Auction storage auction = auctions[_tokenId];

    require(!auction.ended, "Auction already ended");

    address seller = ownerOf(_tokenId);
    address buyer = auction.highestBidder;
    uint price = auction.highestBid;
    
    auction.pendingReturns[buyer] -= price;
    _buy(_tokenId, seller, buyer, price);

    auction.ended = true;

    emit AuctionEnded(_tokenId, seller, buyer, price);
  }
}
