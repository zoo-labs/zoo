// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./CryptoAnimalUser.sol";
import "./Animal.sol";

contract CryptoAnimalSell is CryptoAnimalUser {
  event tokenSold(address seller, address buyer, uint tokenId);

  constructor (string memory name_, string memory symbol_)
    CryptoAnimalUser(name_, symbol_)
  { }

  function _buy(uint _tokenId, address _seller, address _buyer, uint _price)
    internal
  {
    require(ownerOf(_tokenId) == _seller, "Token id is not seller's");

    _transfer(_seller, _buyer, _tokenId);

    uint fee = getFeeOf(_price);
    (bool sent,) = payable(_seller).call{value: _price - fee}("");
    require(sent, "Failed to send ether to seller");

    (bool sentMktsq,) = payable(mktsqWallet).call{value: fee}("");
    require(sentMktsq, "Failed to send ether to mktsq");

    animals[_tokenId].inMarket = MarketStatus.NONE;
  }

  function buy(uint _tokenId)
    external
    payable
    onlyValidTokenId(_tokenId)
    returns (bool)
  {
    Animal storage animal = animals[_tokenId];
    require(animal.inMarket == MarketStatus.SALE, "Animal: not in sale now");
    require(msg.value == animal.price, "Animal: incorrect price");
    require(msg.sender != ownerOf(_tokenId), "Animal: can't buy oneself's animal");

    address seller = ownerOf(_tokenId);
    address buyer = _msgSender();
    _buy(_tokenId, seller, buyer, msg.value);

    emit tokenSold(seller, buyer, _tokenId);
    return true;
  }

  /* buy a new egg from the contract */
  function buyEgg()
    external
    payable
    returns (bool)
  {

    uint etherReceived = msg.value;
    uint minPurchasePrice = 0.02 ether;
    require(etherReceived > minPurchasePrice);
    Animal memory newAnimal = Animal(
      false,
      0,
      0,
      0,
      0,
      0,
      0, 
      0,
      MarketStatus.NONE,
      AnimalTime(0,0,0),
      Specie.BEAR
    );
    uint tokenId = _mintToken(msg.sender, newAnimal);
    emit tokenSold(mktsqWallet, msg.sender, tokenId);
    return true;
  }
}
